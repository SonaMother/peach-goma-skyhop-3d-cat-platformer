import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import { Part, OUTLINE_W } from "./Part";
import { flat, toon } from "./materials";
import { Spring, damp, clamp, rand } from "./springs";
import { EXPRESSIONS, EXPRESSION_KEYS, type ExpressionName, type ExpressionParams } from "./expressions";
import { POSES, POSE_EXPRESSION, POSE_KEYS, POSE_SPRING_TUNING, type MotionState, type PoseParams } from "./poses";
import type { CatPalette } from "./palettes";

/* ------------------------------------------------------------------ */
/*  Driver: the tiny mutable contract between game logic and the rig   */
/* ------------------------------------------------------------------ */
export type CatEvent = "land" | "jump" | "superJump" | "collect" | "hurt" | "hugged" | "bump" | "cheer";

export interface CatDriver {
  vx: number;
  vy: number;
  state: MotionState;
  /** Optional base expression override (otherwise derived from the motion state) */
  expression: ExpressionName | null;
  /** -1..1 where the cat looks / turns */
  look: number;
  /** One-shot events consumed by the rig every frame */
  events: CatEvent[];
  /** Freeze autonomous behaviours (blink, look-around) */
  autonomous: boolean;
}

export const createDriver = (o: Partial<CatDriver> = {}): CatDriver => ({
  vx: 0,
  vy: 0,
  state: "idle",
  expression: null,
  look: 0,
  events: [],
  autonomous: true,
  ...o,
});

/* Timed expression flashes triggered by events (name, seconds) */
const EVENT_FLASH: Partial<Record<CatEvent, [ExpressionName, number]>> = {
  land: ["squint", 0.13],
  superJump: ["joy", 0.9],
  collect: ["love", 0.7],
  hurt: ["cry", 1.6],
  hugged: ["love", 1.8],
  bump: ["surprised", 0.35],
  cheer: ["joy", 1.2],
};

/* ------------------------------------------------------------------ */
/*  Shared geometry                                                     */
/* ------------------------------------------------------------------ */
function earProfile() {
  const pts: THREE.Vector2[] = [];
  const N = 14;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    // rounded-triangle profile: convex sides, soft tip
    const x = 0.36 * Math.pow(1 - t, 0.82) * (1 - 0.25 * Math.pow(t, 6)) + 0.002;
    pts.push(new THREE.Vector2(x, t * 0.55));
  }
  return pts;
}

const G = {
  head: new THREE.SphereGeometry(1, 56, 40),
  body: new THREE.SphereGeometry(0.72, 44, 32),
  ear: new THREE.LatheGeometry(earProfile(), 28),
  stripe: new THREE.CapsuleGeometry(0.045, 0.26, 4, 12),
  arm: new THREE.CapsuleGeometry(0.17, 0.4, 8, 18),
  leg: new THREE.CapsuleGeometry(0.2, 0.22, 8, 18),
  tail: (() => {
    const g = new THREE.TorusGeometry(0.4, 0.11, 14, 28, Math.PI * 0.9);
    g.translate(-0.4, 0, 0);
    return g;
  })(),
  eyeDot: new THREE.CircleGeometry(0.105, 24),
  highlight: new THREE.CircleGeometry(0.032, 12),
  happyArc: new THREE.TorusGeometry(0.1, 0.03, 8, 20, Math.PI),
  chevron: new THREE.BoxGeometry(0.14, 0.045, 0.01),
  brow: new THREE.CapsuleGeometry(0.022, 0.13, 4, 10),
  blush: new THREE.CircleGeometry(0.19, 28),
  smallArc: new THREE.TorusGeometry(0.06, 0.02, 8, 16, Math.PI),
  smileArc: new THREE.TorusGeometry(0.1, 0.022, 8, 20, Math.PI),
  tinyArc: new THREE.TorusGeometry(0.035, 0.018, 8, 12, Math.PI),
  mouthOpen: new THREE.CircleGeometry(0.11, 24),
  mouthOpenRim: new THREE.CircleGeometry(0.135, 24),
  tongue: new THREE.CircleGeometry(0.065, 16),
  oMouth: new THREE.CircleGeometry(0.055, 18),
  drop: new THREE.SphereGeometry(0.065, 14, 12),
};

const INK = "#3B3231";
const M = {
  ink: flat(INK),
  white: flat("#ffffff"),
  mouthIn: flat("#8E3A4A"),
  tongue: flat("#F28CA0"),
  tear: toon("#A9DDF7"),
};

/* ------------------------------------------------------------------ */
/*  Rig                                                                 */
/* ------------------------------------------------------------------ */
export interface CatProps {
  palette: CatPalette;
  driver: MutableRefObject<CatDriver>;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  /** Optional callback to receive the root group */
  groupRef?: MutableRefObject<THREE.Group | null>;
  children?: React.ReactNode;
}

type Refs = Record<string, THREE.Object3D>;

export function Cat({ palette, driver, position, rotation, scale = 1, groupRef, children }: CatProps) {
  const R = useRef<Refs>({});
  const r = (name: string) => (o: THREE.Object3D | null) => {
    if (o) R.current[name] = o;
  };

  const blushMat = useMemo(() => flat(palette.blush, { transparent: true, opacity: 0.95 }), [palette.blush]);

  /* mutable animation memory */
  const S = useMemo(() => {
    const springs = {} as Record<keyof PoseParams, Spring>;
    for (const k of POSE_KEYS) {
      const [st, dm] = POSE_SPRING_TUNING[k] ?? [90, 12];
      springs[k] = new Spring(POSES.idle[k], st, dm);
    }
    return {
      t: rand(0, 100),
      springs,
      expr: { ...EXPRESSIONS.content } as ExpressionParams,
      flash: null as null | { name: ExpressionName; until: number },
      earL: new Spring(0, 220, 9),
      earR: new Spring(0, 220, 9),
      tail: new Spring(0, 60, 6),
      headFollow: new Spring(0, 160, 10),
      lean: 0,
      turn: 0,
      look: 0,
      autoLook: 0,
      autoLookTimer: rand(1, 3),
      blink: 1,
      blinkTimer: rand(1, 3),
      blinkPhase: -1,
      earTwitchTimer: rand(2, 6),
      lastState: "idle" as MotionState,
    };
  }, []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    S.t += dt;
    const t = S.t;
    const d = driver.current;
    const o = R.current;
    if (!o.root) return;

    /* ---- events ---- */
    for (const e of d.events) {
      const f = EVENT_FLASH[e];
      if (f) S.flash = { name: f[0], until: t + f[1] };
      switch (e) {
        case "land":
          S.springs.stretch.impulse(-7);
          S.earL.impulse(-9);
          S.earR.impulse(-9);
          S.headFollow.impulse(4);
          break;
        case "jump":
          S.springs.stretch.impulse(4.5);
          S.headFollow.impulse(-2.5);
          break;
        case "superJump":
          S.springs.stretch.impulse(10);
          S.earL.impulse(-14);
          S.earR.impulse(-14);
          S.headFollow.impulse(-5);
          break;
        case "collect":
          S.springs.headTilt.impulse(3);
          S.springs.stretch.impulse(2.5);
          break;
        case "hurt":
          S.springs.stretch.impulse(-5);
          S.tail.impulse(6);
          break;
        case "hugged":
          S.springs.stretch.impulse(-3);
          S.earL.impulse(-6);
          S.earR.impulse(-6);
          break;
        case "bump":
          S.springs.headTilt.impulse(-4);
          S.earL.impulse(8);
          break;
        case "cheer":
          S.springs.stretch.impulse(6);
          break;
      }
    }
    d.events.length = 0;

    /* ---- pose springs ---- */
    const pose = POSES[d.state];
    if (d.state !== S.lastState) {
      // subtle anticipation when switching poses
      S.springs.stretch.impulse(d.state === "rise" || d.state === "superJump" ? 2 : -1);
      S.lastState = d.state;
    }
    const P = {} as Record<keyof PoseParams, number>;
    for (const k of POSE_KEYS) {
      S.springs[k].target = pose[k];
      P[k] = S.springs[k].update(dt);
    }

    /* ---- expression blend ---- */
    if (S.flash && S.flash.until < t) S.flash = null;
    const exprName: ExpressionName = S.flash ? S.flash.name : (d.expression ?? POSE_EXPRESSION[d.state]);
    const target = EXPRESSIONS[exprName];
    const E = S.expr;
    for (const k of EXPRESSION_KEYS) E[k] = damp(E[k], target[k], S.flash ? 26 : 14, dt);

    /* ---- autonomous life ---- */
    if (d.autonomous) {
      S.blinkTimer -= dt;
      if (S.blinkTimer <= 0 && S.blinkPhase < 0) {
        S.blinkPhase = 0;
        S.blinkTimer = Math.random() < 0.2 ? 0.25 : rand(1.6, 4.5);
      }
      if (S.blinkPhase >= 0) {
        S.blinkPhase += dt / 0.14;
        S.blink = 1 - Math.sin(Math.min(S.blinkPhase, 1) * Math.PI);
        if (S.blinkPhase >= 1) {
          S.blinkPhase = -1;
          S.blink = 1;
        }
      }
      S.autoLookTimer -= dt;
      const calm = d.state === "idle" || d.state === "sit" || d.state === "wave" || d.state === "lieDown";
      if (S.autoLookTimer <= 0) {
        S.autoLookTimer = rand(1.2, 3.5);
        S.autoLook = calm && Math.random() < 0.6 ? rand(-0.6, 0.6) : 0;
      }
      S.earTwitchTimer -= dt;
      if (S.earTwitchTimer <= 0) {
        S.earTwitchTimer = rand(2.5, 7);
        (Math.random() < 0.5 ? S.earL : S.earR).impulse(rand(6, 10));
      }
    } else {
      S.blink = 1;
    }

    /* ---- velocity-driven body ---- */
    const vx = d.vx;
    const vy = d.vy;
    const wantLook = clamp(d.look + S.autoLook, -1, 1);
    S.look = damp(S.look, wantLook, 8, dt);
    S.lean = damp(S.lean, -vx * 0.045 + P.lean, 9, dt);
    S.turn = damp(S.turn, S.look * 0.42, 6, dt);

    const velStretch = 1 + clamp(vy * 0.011, -0.03, 0.14) + Math.abs(vx) * 0.004;
    const breath = Math.sin(t * 2.1) * 0.012;
    const s = Math.max(0.45, P.stretch * velStretch + breath);
    o.squash.scale.set(1 / Math.sqrt(s), s, 1 / Math.sqrt(s));
    o.crouch.position.y = -P.crouch + Math.sin(t * 2.2) * P.bob;
    o.lean.rotation.z = S.lean;
    o.lean.rotation.y = S.turn;

    /* head follow-through */
    S.headFollow.target = 0;
    const hf = S.headFollow.update(dt);
    o.head.rotation.z = P.headTilt + E.headTilt - S.lean * 0.45 + Math.sin(t * 1.3) * 0.02;
    o.head.rotation.x = P.headPitch + clamp(-vy * 0.012, -0.22, 0.25) + hf * 0.05;
    o.head.rotation.y = S.look * 0.28;

    /* ears: pose + vertical velocity + spring twitch */
    const earVel = clamp(-vy * 0.035, -0.45, 0.6);
    S.earL.target = -(P.earFold * 0.55 + earVel);
    S.earR.target = P.earFold * 0.55 + earVel;
    const eL = S.earL.update(dt);
    const eR = S.earR.update(dt);
    o.earL.rotation.z = 0.32 + eL;
    o.earR.rotation.z = -0.32 + eR;
    o.earL.rotation.x = -eL * 0.4;
    o.earR.rotation.x = eR * 0.4;

    /* arms */
    const wig = Math.sin(t * 15) * P.armWiggle;
    const wig2 = Math.sin(t * 15 + 1.2) * P.armWiggle;
    o.armL.rotation.z = -(P.armRaiseL + wig) - S.lean * 0.6;
    o.armR.rotation.z = P.armRaiseR + wig2 + Math.sin(t * 11) * P.wave - S.lean * 0.6;
    o.armL.rotation.x = -P.armForwardL;
    o.armR.rotation.x = -P.armForwardR;

    /* legs */
    const walk = d.state === "walk" ? Math.sin(t * 12) * 0.5 : 0;
    o.legL.rotation.x = -P.legL + walk + Math.sin(t * 15) * P.armWiggle * 0.5;
    o.legR.rotation.x = -P.legR - walk + Math.sin(t * 15 + 2) * P.armWiggle * 0.5;

    /* tail: wag + inertia against horizontal motion */
    S.tail.target = vx * 0.12;
    const tl = S.tail.update(dt);
    o.tail.rotation.z = -0.4 - P.tailLift * 0.7 + Math.sin(t * 4.5) * P.tailWag + tl;
    o.tail.rotation.y = Math.sin(t * 3.1) * 0.25;

    /* ---- face ---- */
    const open = E.eyeOpen * S.blink;
    const dot = (1 - E.eyeHappy) * (1 - E.eyeCry);
    const lookX = S.look * 0.045;
    for (const side of ["L", "R"] as const) {
      const eye = o["eye" + side];
      eye.position.x = (side === "L" ? -0.4 : 0.4) + lookX;
      eye.position.y = -0.04 + E.eyeOffsetY;
      const sx = Math.max(0.0001, E.eyeScale * dot);
      const sy = Math.max(0.0001, Math.max(0.09, open) * E.eyeScale * dot);
      o["dot" + side].scale.set(sx * 0.95, sy * 1.05, 1);
      const hl = E.eyeSparkle * clamp((open - 0.35) / 0.3, 0, 1) * dot;
      o["hl" + side].scale.setScalar(Math.max(0.0001, hl));
      o["happy" + side].scale.setScalar(Math.max(0.0001, E.eyeHappy * E.eyeScale));
      o["cry" + side].scale.setScalar(Math.max(0.0001, E.eyeCry));
      const brow = o["brow" + side];
      brow.scale.setScalar(Math.max(0.0001, E.browLift));
      brow.rotation.z = (side === "L" ? 1 : -1) * E.browAngle;
      brow.position.y = 0.3 + E.browLift * 0.03 + E.eyeOffsetY;
      o["blush" + side].scale.set(0.35 + 0.65 * E.blush, (0.35 + 0.65 * E.blush) * 0.75, 1);
      // tears
      for (let i = 0; i < 2; i++) {
        const tear = o[`tear${side}${i}`];
        const ph = (t * 1.3 + i * 0.5 + (side === "L" ? 0.25 : 0)) % 1;
        tear.position.y = -0.18 - ph * 0.4;
        const sc = E.tears * (1 - ph * 0.6) * (ph < 0.08 ? ph / 0.08 : 1);
        tear.scale.set(0.75 * sc, 1.1 * sc, 0.75 * sc);
      }
    }
    o.mouth.position.x = lookX * 0.5;
    o.mouthCat.scale.setScalar(Math.max(0.0001, E.mouthCat));
    o.mouthSmile.scale.setScalar(Math.max(0.0001, E.mouthSmile));
    o.mouthFrown.scale.setScalar(Math.max(0.0001, E.mouthFrown));
    o.mouthWobble.scale.setScalar(Math.max(0.0001, E.mouthWobble));
    o.mouthO.scale.setScalar(Math.max(0.0001, E.mouthO));
    const mo = E.mouthOpen;
    o.mouthOpen.scale.set(Math.max(0.0001, 0.55 + 0.45 * mo), Math.max(0.0001, mo * (1 + Math.sin(t * 9) * 0.06)), 1);
    const sw = E.sweat;
    o.sweat.scale.set(0.75 * sw, 1.15 * sw, 0.75 * sw);
    o.sweat.position.y = 0.55 - ((t * 0.7) % 1) * 0.12 * sw;
  });

  const fur = palette.fur;
  const stripe = palette.stripe;
  const faceZ = (x: number, y: number) => 0.98 * Math.sqrt(Math.max(0.05, 1 - (x / 1.08) ** 2 - (y / 0.95) ** 2));

  return (
    <group
      ref={(g) => {
        if (g) {
          R.current.root = g;
          if (groupRef) groupRef.current = g;
        }
      }}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group ref={r("crouch")}>
        <group ref={r("squash")}>
          <group ref={r("lean")}>
            {/* legs */}
            <group ref={r("legL")} position={[-0.3, 0.55, 0.05]}>
              <Part geometry={G.leg} color={fur} position={[0, -0.22, 0]} />
            </group>
            <group ref={r("legR")} position={[0.3, 0.55, 0.05]}>
              <Part geometry={G.leg} color={fur} position={[0, -0.22, 0]} />
            </group>
            {/* tail */}
            <group ref={r("tail")} position={[0.5, 0.35, -0.3]} rotation={[0, 0, -0.4]}>
              <Part geometry={G.tail} color={fur} outlineWidth={OUTLINE_W * 0.9} />
            </group>
            {/* body */}
            <Part geometry={G.body} color={fur} position={[0, 0.85, 0]} scale={[1, 0.95, 0.88]} />
            {/* arms */}
            <group ref={r("armL")} position={[-0.56, 1.14, 0.14]}>
              <Part geometry={G.arm} color={fur} position={[0, -0.3, 0]} />
            </group>
            <group ref={r("armR")} position={[0.56, 1.14, 0.14]}>
              <Part geometry={G.arm} color={fur} position={[0, -0.3, 0]} />
            </group>

            {/* head */}
            <group ref={r("head")} position={[0, 1.88, 0]}>
              <Part geometry={G.head} color={fur} scale={[1.08, 0.95, 0.98]} outlineWidth={OUTLINE_W * 1.1} />
              {/* stripes */}
              <mesh geometry={G.stripe} material={toon(stripe)} position={[0, 0.875, 0.36]} rotation={[Math.PI / 2 + 0.42, 0, 0]} />
              <mesh geometry={G.stripe} material={toon(stripe)} position={[-0.25, 0.845, 0.34]} rotation={[Math.PI / 2 + 0.42, 0, 0.22]} />
              <mesh geometry={G.stripe} material={toon(stripe)} position={[0.25, 0.845, 0.34]} rotation={[Math.PI / 2 + 0.42, 0, -0.22]} />
              {/* ears */}
              <group ref={r("earL")} position={[-0.66, 0.62, -0.05]} rotation={[0, 0, 0.32]}>
                <Part geometry={G.ear} color={fur} scale={[1, 1, 0.62]} outlineWidth={OUTLINE_W * 1.05} />
                <mesh geometry={G.ear} material={toon(palette.innerEar)} position={[0, 0.07, 0.11]} scale={[0.55, 0.6, 0.55]} />
              </group>
              <group ref={r("earR")} position={[0.66, 0.62, -0.05]} rotation={[0, 0, -0.32]}>
                <Part geometry={G.ear} color={fur} scale={[1, 1, 0.62]} outlineWidth={OUTLINE_W * 1.05} />
                <mesh geometry={G.ear} material={toon(palette.innerEar)} position={[0, 0.07, 0.11]} scale={[0.55, 0.6, 0.55]} />
              </group>

              {/* ---- FACE ---- */}
              {(["L", "R"] as const).map((side) => {
                const sgn = side === "L" ? -1 : 1;
                const ex = sgn * 0.4;
                const ey = -0.04;
                const dir = -sgn; // chevron tip points inward
                return (
                  <group key={side}>
                    <group ref={r("eye" + side)} position={[ex, ey, faceZ(ex, ey) + 0.02]} rotation={[0, sgn * 0.36, 0]}>
                      <mesh ref={r("dot" + side)} geometry={G.eyeDot} material={M.ink} />
                      <mesh ref={r("hl" + side)} geometry={G.highlight} material={M.white} position={[-0.035, 0.04, 0.003]} />
                      <mesh ref={r("happy" + side)} geometry={G.happyArc} material={M.ink} position={[0, -0.03, 0]} />
                      <group ref={r("cry" + side)}>
                        <mesh geometry={G.chevron} material={M.ink} position={[dir * 0.06 - dir * 0.065, 0.05, 0]} rotation={[0, 0, -dir * 0.7]} />
                        <mesh geometry={G.chevron} material={M.ink} position={[dir * 0.06 - dir * 0.065, -0.05, 0]} rotation={[0, 0, dir * 0.7]} />
                      </group>
                    </group>
                    <group position={[ex, 0.3, faceZ(ex, 0.3) + 0.02]} rotation={[0, sgn * 0.36, 0]}>
                      <group ref={r("brow" + side)}>
                        <mesh geometry={G.brow} material={M.ink} rotation={[0, 0, Math.PI / 2]} />
                      </group>
                    </group>
                    <mesh
                      ref={r("blush" + side)}
                      geometry={G.blush}
                      material={blushMat}
                      position={[sgn * 0.66, -0.27, faceZ(sgn * 0.66, -0.27) + 0.015]}
                      rotation={[0, sgn * 0.68, 0]}
                    />
                    {[0, 1].map((i) => (
                      <Part
                        key={i}
                        ref={r(`tear${side}${i}`) as never}
                        geometry={G.drop}
                        material={M.tear}
                        outlineWidth={0.03}
                        position={[sgn * (0.5 + i * 0.06), -0.2, faceZ(sgn * 0.52, -0.25) + 0.03]}
                      />
                    ))}
                  </group>
                );
              })}
              {/* mouth cluster */}
              <group ref={r("mouth")} position={[0, -0.3, faceZ(0, -0.3) + 0.02]}>
                <group ref={r("mouthCat")}>
                  <mesh geometry={G.smallArc} material={M.ink} position={[-0.058, 0.02, 0]} rotation={[0, 0, Math.PI]} />
                  <mesh geometry={G.smallArc} material={M.ink} position={[0.058, 0.02, 0]} rotation={[0, 0, Math.PI]} />
                </group>
                <group ref={r("mouthSmile")}>
                  <mesh geometry={G.smileArc} material={M.ink} position={[0, 0.03, 0]} rotation={[0, 0, Math.PI]} />
                </group>
                <group ref={r("mouthFrown")}>
                  <mesh geometry={G.smallArc} material={M.ink} position={[0, -0.05, 0]} />
                </group>
                <group ref={r("mouthWobble")}>
                  <mesh geometry={G.tinyArc} material={M.ink} position={[-0.034, -0.01, 0]} />
                  <mesh geometry={G.tinyArc} material={M.ink} position={[0.034, -0.01, 0]} rotation={[0, 0, Math.PI]} />
                </group>
                <group ref={r("mouthO")}>
                  <mesh geometry={G.oMouth} material={M.ink} />
                  <mesh geometry={G.oMouth} material={M.mouthIn} position={[0, 0, 0.002]} scale={0.62} />
                </group>
                <group ref={r("mouthOpen")} position={[0, -0.04, 0]}>
                  <mesh geometry={G.mouthOpenRim} material={M.ink} scale={[0.95, 1.1, 1]} />
                  <mesh geometry={G.mouthOpen} material={M.mouthIn} position={[0, 0, 0.002]} scale={[0.95, 1.1, 1]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.05, 0.004]} />
                </group>
              </group>
              {/* sweat drop */}
              <Part ref={r("sweat") as never} geometry={G.drop} material={M.tear} outlineWidth={0.03} position={[0.82, 0.55, 0.45]} />
            </group>
            {children}
          </group>
        </group>
      </group>
    </group>
  );
}
