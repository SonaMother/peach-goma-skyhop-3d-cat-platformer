import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Cat, createDriver } from "../character/Cat";
import { PALETTES, otherCat } from "../character/palettes";
import { clamp, damp } from "../character/springs";
import { useGame } from "../game/store";
import { C, createWorld, cullBelow, initWorld, spawnUpTo, type PlatformData } from "../game/world";
import type { InputState } from "../game/useInput";
import { sfx } from "../game/sfx";
import { Platform } from "../world/Platform";
import { Backdrop } from "../world/Backdrop";
import { fx } from "../world/Particles";

const topOffset = (p: PlatformData) => (p.type === "pillow" ? 0.2 : p.type === "cloud" ? 0.28 : p.type === "ground" ? 0.2 : 0.02);

export function CameraRig({
  camY,
  camX,
  lookDown = 0,
  zoom = 1,
}: {
  camY: MutableRefObject<number>;
  camX: MutableRefObject<number>;
  lookDown?: number;
  zoom?: number;
}) {
  const { camera, size } = useThree();
  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(C.fov / 2));
    const dist = clamp((C.halfW * 1.08) / (halfTan * aspect), 8, 40) / zoom;
    cam.position.set(camX.current * 0.1, camY.current + lookDown, dist);
    cam.lookAt(camX.current * 0.1, camY.current, 0);
  });
  return null;
}

export function GameScene({ input }: { input: MutableRefObject<InputState> }) {
  const character = useGame((s) => s.character);
  const runId = useGame((s) => s.runId);
  const palette = PALETTES[character];
  const companionId = otherCat(character);

  const driver = useRef(createDriver({ state: "idle" }));
  const world = useMemo(() => createWorld(), []);
  const [, setVersion] = useState(0);
  const camY = useRef(4);
  const camX = useRef(0);
  const catRef = useRef<THREE.Group | null>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shadowMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#3B3231", transparent: true, opacity: 0.16, depthWrite: false }), []);

  const P = useMemo(
    () => ({
      x: 0,
      y: 0.2,
      vx: 0,
      vy: 0,
      maxY: 0,
      hearts: 0,
      hugs: 0,
      landTimer: 0,
      superTimer: 0,
      dead: false,
      deadTimer: 0,
      fellSfx: false,
      lastScore: -1,
      started: false,
    }),
    [],
  );

  // (re)initialise on new run
  useEffect(() => {
    initWorld(world);
    spawnUpTo(world, 30);
    Object.assign(P, { x: 0, y: 0.2, vx: 0, vy: C.jumpV, maxY: 0, hearts: 0, hugs: 0, landTimer: 0, superTimer: 0, dead: false, deadTimer: 0, fellSfx: false, lastScore: -1 });
    camY.current = 5;
    driver.current = createDriver({ state: "rise" });
    driver.current.events.push("jump");
    setVersion((v) => v + 1);
  }, [runId, world, P]);

  useFrame(({ size }, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const d = driver.current;
    const store = useGame.getState();
    if (store.phase !== "playing" || store.paused) return;

    /* ---------- horizontal control ---------- */
    const axis = P.dead ? 0 : input.current.axis;
    if (axis !== 0) P.vx += axis * C.moveAccel * dt;
    else P.vx *= Math.exp(-C.drag * dt);
    P.vx = clamp(P.vx, -C.maxVx, C.maxVx);
    P.x += P.vx * dt;
    // wrap around the world edges
    if (P.x > C.halfW + 0.6) P.x = -C.halfW - 0.6;
    if (P.x < -C.halfW - 0.6) P.x = C.halfW + 0.6;

    /* ---------- vertical physics ---------- */
    const prevY = P.y;
    P.vy -= C.gravity * dt;
    P.y += P.vy * dt;

    let landed: PlatformData | null = null;
    if (P.vy < 0 && !P.dead) {
      for (const p of world.platforms) {
        if (!p.alive) continue;
        const top = p.y + topOffset(p);
        if (prevY >= top - 0.02 && P.y <= top && Math.abs(P.x - p.x) < p.w / 2 + C.catHalfW * 0.8) {
          landed = p;
          P.y = top;
          break;
        }
      }
    }

    if (landed) {
      const p = landed;
      if (p.type === "pillow") {
        P.vy = C.pillowV;
        P.superTimer = 0.7;
        p.wobble.impulse(-9);
        d.events.push("superJump");
        fx.burst("stars", P.x, P.y + 0.3, 0.4);
        sfx.pillow();
        store.pushToast("BOING!", "#7FB8FF");
      } else {
        P.vy = C.jumpV;
        P.landTimer = 0.09;
        p.wobble.impulse(p.type === "cloud" ? -2 : -4);
        d.events.push("land", "jump");
        fx.burst("dust", P.x, P.y + 0.05, 0.5, 4);
        if (p.type === "cloud") {
          p.alive = false;
          fx.burst("puff", p.x, p.y, 0.3);
          sfx.cloud();
        } else sfx.jump();
      }
      // companion hug
      if (p.companion && !p.hugged && p.companionDriver) {
        p.hugged = true;
        P.hugs++;
        p.companionDriver.state = "hug";
        p.companionDriver.expression = "love";
        p.companionDriver.events.push("hugged");
        p.cheerTimer = 2.5;
        d.events.push("hugged");
        fx.burst("hearts", P.x, P.y + 1.2, 0.6, 12);
        sfx.hug();
        store.pushToast("HUG! +300", "#FF6F91");
      }
    }

    /* ---------- hearts & companions ---------- */
    for (const p of world.platforms) {
      if (p.heart && !p.heartTaken) {
        const hy = p.y + 1.15;
        if (Math.abs(P.x - p.x) < 0.75 && Math.abs(P.y + 0.6 - hy) < 0.85) {
          p.heartTaken = true;
          P.hearts++;
          d.events.push("collect");
          fx.burst("hearts", p.x, hy, 0.4, 7);
          fx.burst("sparkle", p.x, hy, 0.4, 6);
          sfx.heart();
          store.pushToast("♥ +50");
        }
      }
      if (p.companion && p.companionDriver) {
        const cd = p.companionDriver;
        const dy = p.y - P.y;
        cd.look = clamp((P.x - p.x) * 0.5, -1, 1);
        if (p.hugged) {
          p.cheerTimer -= dt;
          if (p.cheerTimer > 0) {
            cd.state = p.cheerTimer > 1.6 ? "hug" : "celebrate";
          } else {
            cd.state = "sit";
            cd.expression = "love";
          }
        } else if (dy > -1 && dy < 9) {
          cd.state = "wave";
          cd.expression = null;
        } else {
          cd.state = "sit";
          cd.expression = "content";
        }
      }
    }

    /* ---------- state machine for the rig ---------- */
    P.landTimer -= dt;
    P.superTimer -= dt;
    if (P.dead) d.state = "plummet";
    else if (P.landTimer > 0) d.state = "land";
    else if (P.superTimer > 0) d.state = "superJump";
    else if (P.vy > 5) d.state = "rise";
    else if (P.vy > -2.5) d.state = "apex";
    else if (P.vy > -16) d.state = "fall";
    else d.state = "plummet";
    d.vx = P.vx;
    d.vy = P.vy;
    d.look = clamp(P.vx / 5, -1, 1);

    if (catRef.current) catRef.current.position.set(P.x, P.y, 0);

    /* ---------- contact shadow on the platform below ---------- */
    if (shadowRef.current) {
      let bestTop = -Infinity;
      for (const p of world.platforms) {
        if (!p.alive) continue;
        const top = p.y + topOffset(p);
        if (top <= P.y + 0.05 && top > bestTop && Math.abs(P.x - p.x) < p.w / 2 + 0.25) bestTop = top;
      }
      const dist = P.y - bestTop;
      if (bestTop > -Infinity && dist < 7) {
        const k = 1 - dist / 7;
        shadowRef.current.visible = true;
        shadowRef.current.position.set(P.x, bestTop + 0.03, 0.15);
        shadowRef.current.scale.set(0.35 + 0.65 * k, 0.6 * (0.35 + 0.65 * k), 1);
        shadowMat.opacity = 0.05 + 0.2 * k * k;
      } else shadowRef.current.visible = false;
    }

    /* ---------- camera ---------- */
    const aspect = size.width / size.height;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(C.fov / 2));
    const dist = clamp((C.halfW * 1.08) / (halfTan * aspect), 8, 40);
    const H = dist * halfTan;
    const wanted = Math.max(camY.current, P.y + H * 0.3);
    camY.current = damp(camY.current, wanted, 7, dt);
    camX.current = damp(camX.current, P.x, 3, dt);

    /* ---------- world streaming ---------- */
    let changed = false;
    if (spawnUpTo(world, camY.current + H + 6)) changed = true;
    if (cullBelow(world, camY.current - H - 6)) changed = true;
    if (changed) setVersion((v) => v + 1);

    /* ---------- scoring ---------- */
    P.maxY = Math.max(P.maxY, P.y);
    const score = Math.floor(P.maxY * 10) + P.hearts * 50 + P.hugs * 300;
    if (score !== P.lastScore) {
      P.lastScore = score;
      store.updateRun({ score, altitude: Math.floor(P.maxY), hearts: P.hearts, hugs: P.hugs });
      const tier = P.maxY < 45 ? 0 : P.maxY < 110 ? 1 : P.maxY < 190 ? 2 : 3;
      store.setSkyTier(tier);
    }

    /* ---------- death ---------- */
    if (!P.dead && P.y < camY.current - H - 1.2) {
      P.dead = true;
      P.deadTimer = 0.9;
      d.expression = "scared";
      sfx.fall();
    }
    if (P.dead) {
      P.deadTimer -= dt;
      if (P.deadTimer <= 0) {
        store.endRun();
        sfx.sad();
      }
    }
  });

  return (
    <>
      <CameraRig camY={camY} camX={camX} />
      <Backdrop camYRef={camY} />
      {world.platforms.map((p) => (
        <Platform key={p.id} p={p} companionId={companionId} />
      ))}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} material={shadowMat}>
        <circleGeometry args={[0.6, 28]} />
      </mesh>
      <Cat palette={palette} driver={driver} groupRef={catRef} scale={C.catScale} position={[0, 0.2, 0]} />
    </>
  );
}
