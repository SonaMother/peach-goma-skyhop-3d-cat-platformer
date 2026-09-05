import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { memo, useCallback, useMemo, useRef, type MutableRefObject } from "react";
import { Part, OUTLINE_W } from "./Part";
import { bubble, flat, toon } from "./materials";
import { Spring, Spring2, Chain, damp, clamp, rand, noise1 } from "./springs";
import { EXPRESSIONS, EXPRESSION_KEYS, type ExpressionName, type ExpressionParams } from "./expressions";
import { POSES, POSE_EXPRESSION, POSE_KEYS, POSE_SPRING_TUNING, type MotionState, type PoseParams } from "./poses";
import type { CatPalette } from "./palettes";
import { HEART_FLAT, STAR_FLAT, STAR_GEO } from "../world/geometries";

/* ------------------------------------------------------------------ */
/*  Driver: the tiny mutable contract between game logic and the rig   */
/* ------------------------------------------------------------------ */
export type CatEvent =
  | "land"
  | "jump"
  | "superJump"
  | "spring"
  | "collect"
  | "star"
  | "yum"
  | "hurt"
  | "hugged"
  | "bump"
  | "cheer"
  | "slip"
  | "stun"
  | "shieldOn"
  | "shieldPop"
  | "rocketOn"
  | "balloonOn"
  | "balloonPop"
  | "magnet"
  | "wrap"
  | "perfect"
  | "milestone"
  | "record"
  | "poke"
  | "pokeBelly"
  | "pokeTail"
  | "pet"
  | "nearMiss"
  | "startle"
  | "wakeUp";

export type EmoteName = "exclaim" | "question" | "heart" | "zzz" | "note" | "sweat" | "sparkles" | "anger" | "hearts3";
export type Accessory = "none" | "balloon" | "rocket" | "shield" | "umbrella" | "fish";
export type PokeZone = "head" | "belly" | "tail";

export interface CatDriver {
  vx: number;
  vy: number;
  state: MotionState;
  /** Optional base expression override (otherwise derived from the motion state) */
  expression: ExpressionName | null;
  /** -1..1 where the cat looks / turns */
  look: number;
  /** -1..1 vertical gaze */
  lookY: number;
  /** Persistent emote bubble (null = only event-driven emotes) */
  emote: EmoteName | null;
  accessory: Accessory;
  /** One-shot events consumed by the rig every frame */
  events: CatEvent[];
  /** Freeze autonomous behaviours (blink, look-around) */
  autonomous: boolean;
  /** Allow idle fidgets (yawn, stretch, groom, doze off…) when idle for a while */
  fidgets: boolean;
}

export const createDriver = (o: Partial<CatDriver> = {}): CatDriver => ({
  vx: 0,
  vy: 0,
  state: "idle",
  expression: null,
  look: 0,
  lookY: 0,
  emote: null,
  accessory: "none",
  events: [],
  autonomous: true,
  fidgets: true,
  ...o,
});

/* Timed expression flashes triggered by events (name, seconds) */
const EVENT_FLASH: Partial<Record<CatEvent, [ExpressionName, number]>> = {
  land: ["squint", 0.13],
  superJump: ["joy", 0.9],
  spring: ["wow", 0.7],
  collect: ["love", 0.7],
  star: ["starEyes", 1.0],
  yum: ["yum", 1.2],
  hurt: ["ouch", 1.3],
  hugged: ["love", 1.8],
  bump: ["surprised", 0.35],
  cheer: ["joy", 1.2],
  slip: ["shocked", 0.6],
  stun: ["dizzy", 1.4],
  shieldOn: ["proud", 1.0],
  shieldPop: ["shocked", 0.6],
  rocketOn: ["starEyes", 1.5],
  balloonOn: ["happy", 1.0],
  balloonPop: ["surprised", 0.6],
  magnet: ["excited", 0.9],
  perfect: ["determined", 0.5],
  milestone: ["wow", 1.2],
  record: ["starEyes", 1.6],
  poke: ["surprised", 0.5],
  pokeBelly: ["laugh", 1.1],
  pokeTail: ["angry", 1.1],
  pet: ["love", 1.4],
  nearMiss: ["relieved", 0.9],
  startle: ["shocked", 0.6],
  wakeUp: ["confused", 1.0],
};

/* Emote bubbles triggered by events (name, seconds) */
const EVENT_EMOTE: Partial<Record<CatEvent, [EmoteName, number]>> = {
  collect: ["heart", 0.7],
  hugged: ["hearts3", 1.6],
  bump: ["exclaim", 0.5],
  stun: ["exclaim", 0.4],
  star: ["sparkles", 1.0],
  yum: ["heart", 0.8],
  slip: ["exclaim", 0.5],
  shieldPop: ["exclaim", 0.5],
  balloonPop: ["exclaim", 0.5],
  record: ["sparkles", 1.5],
  perfect: ["sparkles", 0.5],
  milestone: ["note", 1.0],
  poke: ["exclaim", 0.5],
  pokeTail: ["anger", 1.0],
  pet: ["hearts3", 1.4],
  nearMiss: ["sweat", 0.9],
  startle: ["exclaim", 0.6],
  wakeUp: ["question", 1.0],
  pokeBelly: ["note", 0.9],
  cheer: ["note", 1.0],
  magnet: ["exclaim", 0.4],
};

/* ------------------------------------------------------------------ */
/*  Shared geometry                                                     */
/* ------------------------------------------------------------------ */
function earProfile() {
  const pts: THREE.Vector2[] = [];
  const N = 14;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = 0.36 * Math.pow(1 - t, 0.82) * (1 - 0.25 * Math.pow(t, 6)) + 0.002;
    pts.push(new THREE.Vector2(x, t * 0.55));
  }
  return pts;
}
class SpiralCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number) {
    const a = t * Math.PI * 2 * 2.25;
    const r = 0.015 + t * 0.085;
    return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
  }
}

const G = {
  head: new THREE.SphereGeometry(1, 56, 40),
  body: new THREE.SphereGeometry(0.72, 44, 32),
  belly: new THREE.CircleGeometry(0.42, 32),
  ear: new THREE.LatheGeometry(earProfile(), 28),
  stripe: new THREE.CapsuleGeometry(0.045, 0.26, 4, 12),
  armUpper: new THREE.CapsuleGeometry(0.165, 0.2, 8, 18),
  armFore: new THREE.CapsuleGeometry(0.17, 0.18, 8, 18),
  leg: new THREE.CapsuleGeometry(0.2, 0.22, 8, 18),
  tailSeg: new THREE.SphereGeometry(0.11, 14, 10),
  padBig: new THREE.CircleGeometry(0.075, 18),
  padToe: new THREE.CircleGeometry(0.034, 12),
  whisker: new THREE.CapsuleGeometry(0.012, 0.36, 3, 6),
  eyeDot: new THREE.CircleGeometry(0.105, 24),
  eyeRing: new THREE.CircleGeometry(0.15, 24),
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
  scream: new THREE.CircleGeometry(0.19, 28),
  screamRim: new THREE.CircleGeometry(0.215, 28),
  tongue: new THREE.CircleGeometry(0.065, 16),
  oMouth: new THREE.CircleGeometry(0.055, 18),
  line: new THREE.BoxGeometry(0.16, 0.03, 0.01),
  teeth: new THREE.BoxGeometry(0.22, 0.05, 0.01),
  drop: new THREE.SphereGeometry(0.065, 14, 12),
  spiral: new THREE.TubeGeometry(new SpiralCurve(), 48, 0.014, 6, false),
  angerBar: new THREE.BoxGeometry(0.16, 0.035, 0.01),
  exclaimBar: new THREE.CapsuleGeometry(0.06, 0.26, 4, 12),
  exclaimDot: new THREE.SphereGeometry(0.07, 12, 10),
  qArc: new THREE.TorusGeometry(0.13, 0.05, 8, 20, Math.PI * 1.45),
  qStem: new THREE.CapsuleGeometry(0.05, 0.1, 4, 10),
  zBar: new THREE.BoxGeometry(0.16, 0.04, 0.04),
  zDiag: new THREE.BoxGeometry(0.2, 0.04, 0.04),
  noteHead: new THREE.SphereGeometry(0.085, 14, 10),
  noteStem: new THREE.BoxGeometry(0.035, 0.32, 0.035),
  noteFlag: new THREE.BoxGeometry(0.11, 0.05, 0.035),
  sparkle: new THREE.OctahedronGeometry(0.06, 0),
  balloon: new THREE.SphereGeometry(0.5, 28, 20),
  balloonKnot: new THREE.ConeGeometry(0.07, 0.1, 8),
  string: new THREE.CylinderGeometry(0.012, 0.012, 1, 6),
  rocketBody: new THREE.CapsuleGeometry(0.22, 0.5, 8, 18),
  rocketTip: new THREE.ConeGeometry(0.2, 0.3, 18),
  fin: new THREE.BoxGeometry(0.08, 0.28, 0.24),
  flame: new THREE.ConeGeometry(0.16, 0.5, 12),
  shield: new THREE.SphereGeometry(1.75, 36, 24),
  shieldGloss: new THREE.SphereGeometry(0.28, 12, 8),
  umbrellaTop: new THREE.SphereGeometry(1.1, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2),
  umbrellaStick: new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8),
  umbrellaHandle: new THREE.TorusGeometry(0.12, 0.03, 8, 12, Math.PI),
  fishBody: new THREE.SphereGeometry(0.22, 16, 12),
  fishTail: new THREE.ConeGeometry(0.14, 0.2, 3),
};

const INK = "#3B3231";
const M = {
  ink: flat(INK),
  white: flat("#ffffff"),
  mouthIn: flat("#8E3A4A"),
  tongue: flat("#F28CA0"),
  tear: toon("#A9DDF7"),
  anger: flat("#E9455D"),
  emoteRed: toon("#FF5E7E"),
  emoteBlue: toon("#7FB8FF"),
  emoteGold: toon("#FFD35C"),
  heart: toon("#FF6F91"),
  spark: toon("#FFF1A8", { emissive: "#FFD35C", emissiveIntensity: 0.6 }),
  rocketRed: toon("#FF6B7A"),
  rocketWhite: toon("#FFFFFF"),
  flame: toon("#FFB347", { emissive: "#FF7A00", emissiveIntensity: 0.8 }),
  flameIn: toon("#FFF3B0", { emissive: "#FFE27A", emissiveIntensity: 0.8 }),
  shield: bubble("#9FD8FF", 0.28),
  shieldGloss: flat("#ffffff", { opacity: 0.7 }),
  umbrella: toon("#FF8FAF"),
  umbrellaAlt: toon("#FFFFFF"),
  stick: toon("#8A6F5A"),
  fish: toon("#9FD0FF"),
  fishDark: toon("#6FA8E6"),
};

/* ------------------------------------------------------------------ */
/*  Idle fidget library — plays when the driver leaves the cat idle     */
/* ------------------------------------------------------------------ */
interface Fidget {
  state: MotionState;
  expression?: ExpressionName;
  emote?: EmoteName;
  dur: [number, number];
  weight: number;
}
const FIDGETS: Fidget[] = [
  { state: "stretchUp", expression: "relieved", dur: [1.3, 1.8], weight: 1 },
  { state: "groom", expression: "focus", dur: [1.8, 2.6], weight: 1.2 },
  { state: "think", expression: "confused", emote: "question", dur: [1.5, 2.2], weight: 0.8 },
  { state: "peek", expression: "confused", dur: [1.2, 1.8], weight: 0.6 },
  { state: "yawn", expression: "sleepy", dur: [1.4, 1.8], weight: 1 },
  { state: "wave", expression: "happy", dur: [1.2, 1.8], weight: 0.8 },
  { state: "dance", expression: "sing", emote: "note", dur: [2, 3], weight: 0.5 },
  { state: "sit", expression: "content", dur: [2.5, 4], weight: 0.8 },
  { state: "proud", expression: "proud", dur: [1.5, 2.2], weight: 0.5 },
  { state: "pounce", expression: "focus", dur: [1.1, 1.6], weight: 0.45 },
  { state: "lieDown", expression: "sleepy", dur: [2.6, 4], weight: 0.45 },
  { state: "bow", expression: "content", emote: "heart", dur: [1.2, 1.6], weight: 0.35 },
];

/* ------------------------------------------------------------------ */
/*  Rig                                                                 */
/* ------------------------------------------------------------------ */
export interface CatProps {
  palette: CatPalette;
  driver: MutableRefObject<CatDriver>;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  groupRef?: MutableRefObject<THREE.Group | null>;
  /** Enable poke / pet hit zones */
  interactive?: boolean;
  onPoke?: (zone: PokeZone) => void;
  onEvent?: (e: CatEvent) => void;
  children?: React.ReactNode;
}

type Refs = Record<string, THREE.Object3D>;
type RefFn = (name: string) => (o: THREE.Object3D | null) => void;
const TAIL_N = 6;

/* ---- static sub-parts (module-level so re-renders never remount them) ---- */
const PawPad = ({ position, rotation, scale = 1, mat }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number; mat: THREE.Material }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh geometry={G.padBig} material={mat} position={[0, -0.03, 0]} scale={[1.1, 0.95, 1]} />
    {[-0.07, 0, 0.07].map((dx, i) => (
      <mesh key={i} geometry={G.padToe} material={mat} position={[dx, 0.075 - Math.abs(dx) * 0.35, 0]} />
    ))}
  </group>
);

const Arm = ({ side, fur, pawMat, r }: { side: "L" | "R"; fur: string; pawMat: THREE.Material; r: RefFn }) => {
  const sgn = side === "L" ? -1 : 1;
  return (
    <group ref={r("arm" + side)} position={[sgn * 0.56, 1.14, 0.14]}>
      <Part geometry={G.armUpper} color={fur} position={[0, -0.17, 0]} />
      <group ref={r("fore" + side)} position={[0, -0.34, 0]}>
        <Part geometry={G.armFore} color={fur} position={[0, -0.12, 0]} />
        <PawPad position={[0, -0.27, 0.168]} rotation={[-0.3, 0, 0]} mat={pawMat} />
      </group>
    </group>
  );
};

const TailChain = ({ i, fur, tip, r }: { i: number; fur: string; tip: string; r: RefFn }): React.ReactElement => {
  const rad = 0.13 - i * 0.011;
  return (
    <group ref={r("tail" + i)} position={[i === 0 ? 0 : 0.19, 0, 0]}>
      <Part geometry={G.tailSeg} color={i === TAIL_N - 1 ? tip : fur} scale={rad / 0.11} outlineWidth={OUTLINE_W * 0.85} />
      {i < TAIL_N - 1 && <TailChain i={i + 1} fur={fur} tip={tip} r={r} />}
    </group>
  );
};

const ZLetter = ({ idx, r }: { idx: number; r: RefFn }) => (
  <group ref={r("zzz" + idx)}>
    <mesh geometry={G.zBar} material={M.emoteBlue} position={[0, 0.08, 0]} />
    <mesh geometry={G.zDiag} material={M.emoteBlue} rotation={[0, 0, 0.9]} />
    <mesh geometry={G.zBar} material={M.emoteBlue} position={[0, -0.08, 0]} />
  </group>
);

export const Cat = memo(CatRig);

function CatRig({ palette, driver, position, rotation, scale = 1, groupRef, interactive, onPoke, onEvent, children }: CatProps) {
  const R = useRef<Refs>({});
  const r = useCallback<RefFn>(
    (name: string) => (o: THREE.Object3D | null) => {
      if (o) R.current[name] = o;
    },
    [],
  );
  const per = palette.personality;

  const blushMat = useMemo(() => flat(palette.blush, { transparent: true, opacity: 0.95 }), [palette.blush]);

  /* mutable animation memory */
  const S = useMemo(() => {
    const springs = {} as Record<keyof PoseParams, Spring>;
    for (const k of POSE_KEYS) {
      const [st, dm] = POSE_SPRING_TUNING[k] ?? [90, 12];
      springs[k] = new Spring(POSES.idle[k], st, dm);
    }
    const soft = 1 - per.floppiness * 0.35;
    return {
      t: rand(0, 100),
      springs,
      expr: { ...EXPRESSIONS.content } as ExpressionParams,
      flash: null as null | { name: ExpressionName; until: number },
      emote: null as null | { name: EmoteName; until: number },
      emoteS: new Spring(0, 240, 11),
      emoteCur: null as EmoteName | null,
      earL: new Spring(0, 220 * soft, 9 * soft),
      earR: new Spring(0, 220 * soft, 9 * soft),
      earTipL: new Spring(0, 260 * soft, 8 * soft),
      earTipR: new Spring(0, 260 * soft, 8 * soft),
      whiskerL: new Spring(0, 300, 10),
      whiskerR: new Spring(0, 300, 10),
      tail: new Chain(TAIL_N, 120 * soft, 9),
      tailRoot: new Spring(0, 70, 7),
      head: new Spring2(170, 11),
      jiggle: new Spring(0, 240, 9),
      cheek: new Spring(0, 260, 9),
      armLag: new Spring(0, 140, 12),
      balloon: new Spring2(40, 5),
      twist: new Spring(0, 45, 6),
      puff: new Spring(0, 60, 6),
      roll: 0,
      lean: 0,
      turn: 0,
      look: 0,
      lookY: 0,
      autoLook: 0,
      autoLookY: 0,
      autoLookTimer: rand(1, 3),
      blink: 1,
      blinkTimer: rand(1, 3),
      blinkPhase: -1,
      doubleBlink: false,
      earTwitchTimer: rand(2, 6),
      tailFlickTimer: rand(3, 8),
      whiskerTimer: rand(2, 5),
      lastState: "idle" as MotionState,
      prevVx: 0,
      prevVy: 0,
      idleFor: 0,
      fidget: null as null | { state: MotionState; expression?: ExpressionName; emote?: EmoteName; until: number },
      fidgetTimer: rand(4, 8) / (0.5 + per.energy),
      asleep: false,
      dizzy: 0,
      sparkle: 0,
      shieldPulse: 0,
      flameFlicker: 0,
      petAmount: 0,
      petCooldown: 0,
    };
  }, [per.energy, per.floppiness]);

  const fire = (e: CatEvent) => {
    driver.current.events.push(e);
    onEvent?.(e);
  };

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    S.t += dt;
    const t = S.t;
    const d = driver.current;
    const o = R.current;
    if (!o.root) return;

    /* ---- events ---- */
    if (d.events.length) {
      for (const e of d.events) {
        const f = EVENT_FLASH[e];
        if (f) S.flash = { name: f[0], until: t + f[1] };
        const em = EVENT_EMOTE[e];
        if (em) S.emote = { name: em[0], until: t + em[1] };
        if (S.asleep && e !== "wakeUp") {
          S.asleep = false;
          S.fidget = null;
          S.flash = { name: "shocked", until: t + 0.6 };
          S.emote = { name: "exclaim", until: t + 0.6 };
        }
        S.fidget = null;
        S.idleFor = 0;
        switch (e) {
          case "land": {
            // squash scales with how hard we hit (prevVy still holds the impact velocity)
            const impact = Math.min(1.6, 0.6 + Math.abs(Math.min(0, S.prevVy)) * 0.045);
            S.springs.stretch.impulse(-7 * impact);
            S.earL.impulse(-9 * impact);
            S.earR.impulse(-9 * impact);
            S.earTipL.impulse(-6);
            S.earTipR.impulse(-6);
            S.head.impulse(0, 5 * impact);
            S.jiggle.impulse(6 * impact);
            S.cheek.impulse(5 * impact);
            S.tail.impulse(3 * impact);
            break;
          }
          case "jump":
            S.springs.stretch.impulse(4.5);
            S.head.impulse(0, -3);
            S.tail.impulse(-3);
            break;
          case "superJump":
          case "rocketOn":
            S.springs.stretch.impulse(10);
            S.earL.impulse(-14);
            S.earR.impulse(-14);
            S.head.impulse(0, -6);
            S.tail.impulse(-6);
            S.jiggle.impulse(-3);
            break;
          case "spring":
            S.springs.stretch.impulse(8);
            S.head.impulse(0, -5);
            S.roll = 0.0001;
            break;
          case "collect":
          case "yum":
            S.springs.headTilt.impulse(3);
            S.springs.stretch.impulse(2.5);
            S.cheek.impulse(3);
            break;
          case "star":
          case "record":
          case "milestone":
            S.springs.stretch.impulse(4);
            S.earL.impulse(10);
            S.earR.impulse(10);
            S.sparkle = 1;
            S.tail.impulse(5);
            break;
          case "hurt":
            S.springs.stretch.impulse(-5);
            S.tailRoot.impulse(6);
            S.head.impulse(4, 2);
            S.jiggle.impulse(4);
            break;
          case "hugged":
          case "pet":
            S.springs.stretch.impulse(-3);
            S.earL.impulse(-6);
            S.earR.impulse(-6);
            S.cheek.impulse(3);
            S.tail.impulse(4);
            break;
          case "bump":
          case "wrap":
            S.springs.headTilt.impulse(-4);
            S.earL.impulse(8);
            S.head.impulse(-6, 0);
            // whip-twist the whole body around the vertical axis as the cat wraps the screen edge
            S.twist.impulse(d.vx >= 0 ? -14 : 14);
            S.tail.impulse(d.vx >= 0 ? 8 : -8, 0.9);
            break;
          case "cheer":
          case "perfect":
            S.springs.stretch.impulse(6);
            S.tail.impulse(6);
            break;
          case "slip":
            S.springs.lean.impulse(6);
            S.armLag.impulse(8);
            S.head.impulse(-5, 2);
            break;
          case "stun":
            S.head.impulse(rand(-8, 8), 4);
            S.earL.impulse(-12);
            S.earR.impulse(12);
            S.jiggle.impulse(5);
            S.puff.impulse(7);
            break;
          case "shieldOn":
            S.shieldPulse = 1;
            S.springs.stretch.impulse(3);
            break;
          case "shieldPop":
          case "balloonPop":
            S.springs.stretch.impulse(-4);
            S.earL.impulse(-10);
            S.earR.impulse(-10);
            S.head.impulse(0, 3);
            break;
          case "balloonOn":
            S.springs.stretch.impulse(3);
            S.balloon.impulse(0, 6);
            break;
          case "magnet":
            S.earL.impulse(9);
            S.earR.impulse(9);
            break;
          case "poke":
            S.head.impulse(0, 6);
            S.earL.impulse(-12);
            S.earR.impulse(-12);
            S.springs.stretch.impulse(-3);
            break;
          case "pokeBelly":
            S.jiggle.impulse(10);
            S.springs.stretch.impulse(-4);
            S.cheek.impulse(6);
            break;
          case "pokeTail":
            S.tail.impulse(18, 0.9);
            S.tailRoot.impulse(10);
            S.puff.impulse(9);
            S.head.impulse(6, 0);
            S.earL.impulse(-12);
            S.earR.impulse(-12);
            break;
          case "nearMiss":
            S.head.impulse(0, -3);
            S.whiskerL.impulse(6);
            S.whiskerR.impulse(6);
            break;
          case "startle":
            S.springs.stretch.impulse(8);
            S.earL.impulse(14);
            S.earR.impulse(14);
            S.tail.impulse(-12, 0.9);
            S.puff.impulse(10);
            S.whiskerL.impulse(10);
            S.whiskerR.impulse(10);
            break;
          case "wakeUp":
            S.asleep = false;
            S.springs.stretch.impulse(3);
            S.earL.impulse(8);
            S.earR.impulse(8);
            break;
        }
      }
      d.events.length = 0;
    }

    /* ---- fidgets / dozing ---- */
    const calmState = d.state === "idle" || d.state === "sit";
    if (d.fidgets && d.autonomous && calmState) {
      S.idleFor += dt;
      if (S.fidget && S.fidget.until < t) {
        S.fidget = null;
        S.fidgetTimer = rand(3.5, 8) / (0.4 + per.energy);
      }
      if (!S.fidget) {
        S.fidgetTimer -= dt;
        if (S.asleep) {
          S.fidget = { state: "sleep", expression: "asleep", emote: "zzz", until: t + 999 };
        } else if (S.idleFor > 26 && Math.random() < 0.02) {
          S.asleep = true;
          S.fidget = { state: "sleep", expression: "asleep", emote: "zzz", until: t + 999 };
        } else if (S.fidgetTimer <= 0) {
          const total = FIDGETS.reduce((a, f) => a + f.weight, 0);
          let roll = Math.random() * total;
          let f = FIDGETS[0];
          for (const c of FIDGETS) {
            roll -= c.weight;
            if (roll <= 0) {
              f = c;
              break;
            }
          }
          if (S.idleFor > 14 && Math.random() < 0.5) f = FIDGETS[4]; // yawn when bored
          S.fidget = { state: f.state, expression: f.expression, emote: f.emote, until: t + rand(f.dur[0], f.dur[1]) };
        }
      }
    } else {
      S.idleFor = 0;
      if (S.fidget) S.fidget = null;
      S.asleep = false;
    }
    const state: MotionState = S.fidget ? S.fidget.state : d.state;

    /* ---- pose springs ---- */
    const pose = POSES[state];
    if (state !== S.lastState) {
      S.springs.stretch.impulse(state === "rise" || state === "superJump" || state === "spin" ? 2 : -1);
      S.lastState = state;
    }
    const P = {} as Record<keyof PoseParams, number>;
    for (const k of POSE_KEYS) {
      S.springs[k].target = pose[k];
      P[k] = S.springs[k].update(dt);
    }

    /* ---- expression blend ---- */
    if (S.flash && S.flash.until < t) S.flash = null;
    const baseExpr: ExpressionName = S.fidget?.expression ?? d.expression ?? POSE_EXPRESSION[state];
    const exprName: ExpressionName = S.flash ? S.flash.name : baseExpr;
    const target = EXPRESSIONS[exprName];
    const E = S.expr;
    const blendRate = S.flash ? 26 : 14;
    for (const k of EXPRESSION_KEYS) E[k] = damp(E[k], target[k], blendRate, dt);

    /* ---- autonomous life ---- */
    if (d.autonomous) {
      S.blinkTimer -= dt;
      if (S.blinkTimer <= 0 && S.blinkPhase < 0) {
        S.blinkPhase = 0;
        S.doubleBlink = Math.random() < 0.22;
        S.blinkTimer = S.doubleBlink ? 0.22 : rand(1.6, 4.5) * (E.eyeScale > 1.2 ? 0.6 : 1);
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
      const calm = calmState || state === "wave" || state === "lieDown" || state === "float";
      if (S.autoLookTimer <= 0) {
        S.autoLookTimer = rand(1.2, 3.5);
        const shy = per.shyness > 0.5 && Math.random() < per.shyness * 0.4;
        S.autoLook = calm && Math.random() < 0.65 ? rand(-0.7, 0.7) : 0;
        S.autoLookY = calm && Math.random() < 0.4 ? rand(-0.4, 0.5) : 0;
        if (shy) S.autoLookY = -0.5;
      }
      S.earTwitchTimer -= dt;
      if (S.earTwitchTimer <= 0) {
        S.earTwitchTimer = rand(2.5, 7);
        const s = Math.random() < 0.5 ? [S.earL, S.earTipL] : [S.earR, S.earTipR];
        s[0].impulse(rand(6, 10));
        s[1].impulse(rand(8, 14));
      }
      S.tailFlickTimer -= dt;
      if (S.tailFlickTimer <= 0) {
        S.tailFlickTimer = rand(3, 9);
        S.tail.impulse(rand(6, 12) * (Math.random() < 0.5 ? -1 : 1), 0.85);
      }
      S.whiskerTimer -= dt;
      if (S.whiskerTimer <= 0) {
        S.whiskerTimer = rand(2, 6);
        (Math.random() < 0.5 ? S.whiskerL : S.whiskerR).impulse(rand(4, 8));
      }
    } else {
      S.blink = 1;
    }

    /* ---- velocity & acceleration ---- */
    const vx = d.vx;
    const vy = d.vy;
    const ax = dt > 0 ? (vx - S.prevVx) / dt : 0;
    const ay = dt > 0 ? (vy - S.prevVy) / dt : 0;
    S.prevVx = vx;
    S.prevVy = vy;
    if (Math.abs(ax) > 30) S.head.x.impulse(clamp(-ax * 0.015, -3, 3));
    if (Math.abs(ay) > 60) S.head.y.impulse(clamp(-ay * 0.006, -3, 3));
    S.armLag.target = clamp(-ax * 0.004, -0.4, 0.4);
    const armLag = S.armLag.update(dt);

    const wantLook = clamp(d.look + S.autoLook, -1, 1);
    const wantLookY = clamp(d.lookY + S.autoLookY, -1, 1);
    S.look = damp(S.look, wantLook, 8, dt);
    S.lookY = damp(S.lookY, wantLookY, 8, dt);
    S.lean = damp(S.lean, -vx * 0.045 + P.lean, 9, dt);
    S.turn = damp(S.turn, S.look * 0.42 + P.headYaw * 0.5, 6, dt);

    /* ---- whole-body ---- */
    const jig = S.jiggle.update(dt);
    const cheek = S.cheek.update(dt);
    const velStretch = 1 + clamp(vy * 0.011, -0.03, 0.14) + Math.abs(vx) * 0.004;
    const breath = Math.sin(t * 2.1) * 0.012;
    const s = Math.max(0.45, P.stretch * velStretch + breath - jig * 0.02);
    o.squash.scale.set((1 / Math.sqrt(s)) * (1 + jig * 0.03), s, (1 / Math.sqrt(s)) * (1 + jig * 0.03));
    const shiver = Math.max(P.shiver, E.shiver);
    const shakeX = shiver * 0.02 * Math.sin(t * 58) + shiver * 0.012 * Math.sin(t * 91 + 1);
    o.crouch.position.set(shakeX, -P.crouch + Math.sin(t * P.bobSpeed) * P.bob * (0.6 + per.energy * 0.6), 0);
    o.lean.rotation.z = S.lean;
    o.lean.rotation.y = S.turn + S.twist.update(dt);
    // spin (trampoline flips): accumulate roll, then settle back to upright
    if (P.bodyRoll > 0.5) S.roll += P.bodyRoll * dt;
    else {
      S.roll = S.roll % (Math.PI * 2);
      if (S.roll > Math.PI) S.roll -= Math.PI * 2;
      S.roll = damp(S.roll, 0, 10, dt);
    }
    o.lean.rotation.x = P.bodyPitch + S.roll;

    /* ---- head follow-through ---- */
    S.head.setTarget(0, 0);
    S.head.update(dt);
    const hx = S.head.x.value;
    const hy = S.head.y.value;
    o.head.rotation.z = P.headTilt + E.headTilt - S.lean * 0.45 + Math.sin(t * 1.3) * 0.02 + hx * 0.06;
    o.head.rotation.x = P.headPitch + clamp(-vy * 0.012, -0.22, 0.25) + hy * 0.05 - S.lookY * 0.18;
    o.head.rotation.y = S.look * 0.28 + P.headYaw;
    o.head.position.x = hx * 0.02 + shakeX * 0.5;
    o.head.position.y = 1.88 + hy * 0.012;

    /* ---- belly jiggle (cheek puff is expressed via the blush, not geometry) ---- */
    // chest breathing: quicker & deeper after exertion (speed), slow & gentle when calm / asleep
    const effort = Math.min(1, (Math.abs(vx) + Math.abs(vy) * 0.6) / 14);
    const breathRate = S.asleep ? 1.1 : 2.1 + effort * 3 + per.energy * 0.6;
    const br = Math.sin(t * breathRate) * (0.012 + effort * 0.014);
    o.bodyJiggle.scale.set(1 + jig * 0.05 + br * 0.8, 1 - jig * 0.04 + br * 0.5, 1 + jig * 0.05 + br * 1.4);

    /* ---- ears: pose + mood + vertical velocity + wind flap + spring twitch ---- */
    const earVel = clamp(-vy * 0.035, -0.45, 0.6);
    const wind = Math.min(1, Math.abs(vy) / 20);
    const flap = Math.sin(t * (10 + wind * 20)) * wind * 0.18 * per.floppiness;
    const mood = E.earMood;
    S.earL.target = -(P.earFold * 0.55 + earVel) - mood * 0.35 + (mood < 0 ? mood * 0.4 : 0);
    S.earR.target = P.earFold * 0.55 + earVel + mood * 0.35 - (mood < 0 ? mood * 0.4 : 0);
    const eL = S.earL.update(dt);
    const eR = S.earR.update(dt);
    // soft "tip lag" springs fold into the single-piece ear (no separate tip mesh → no visible seam)
    const tipTarget = -P.earTipFlop * 0.5 * (0.5 + per.floppiness) - wind * 0.5 + (mood < 0 ? mood * 0.3 : 0);
    S.earTipL.target = tipTarget;
    S.earTipR.target = tipTarget;
    const tL = S.earTipL.update(dt);
    const tR = S.earTipR.update(dt);
    o.earL.rotation.z = 0.38 + eL + flap + tL * 0.12;
    o.earR.rotation.z = -0.38 + eR - flap + tR * 0.12;
    o.earL.rotation.x = -eL * 0.4 + (mood < 0 ? -mood * 0.5 : 0) + tL * 0.16;
    o.earR.rotation.x = eR * 0.4 + (mood < 0 ? -mood * 0.5 : 0) + tR * 0.16;

    /* ---- whiskers ---- */
    S.whiskerL.target = E.whiskerLift * 0.2 + P.whiskerFlare * 0.25;
    S.whiskerR.target = E.whiskerLift * 0.2 + P.whiskerFlare * 0.25;
    const wL = S.whiskerL.update(dt);
    const wR = S.whiskerR.update(dt);
    o.whiskerL.rotation.z = wL + Math.sin(t * 3.7) * 0.015 + shiver * Math.sin(t * 70) * 0.05;
    o.whiskerR.rotation.z = -wR - Math.sin(t * 3.1) * 0.015 - shiver * Math.sin(t * 70 + 1) * 0.05;

    /* ---- arms (2-bone) ---- */
    const wig = Math.sin(t * P.armWiggleSpeed) * P.armWiggle;
    const wig2 = Math.sin(t * P.armWiggleSpeed + 1.2) * P.armWiggle;
    o.armL.rotation.z = -(P.armRaiseL + wig) - S.lean * 0.6 - armLag;
    o.armR.rotation.z = P.armRaiseR + wig2 + Math.sin(t * 11) * P.wave - S.lean * 0.6 - armLag;
    o.armL.rotation.x = -P.armForwardL + shiver * Math.sin(t * 55) * 0.08;
    o.armR.rotation.x = -P.armForwardR + shiver * Math.sin(t * 55 + 2) * 0.08;
    o.foreL.rotation.x = -P.pawUpL * 1.5 - Math.max(0, wig) * 0.5;
    o.foreR.rotation.x = -P.pawUpR * 1.5 - Math.max(0, wig2) * 0.5 - Math.abs(Math.sin(t * 11)) * P.wave * 0.8;

    /* ---- legs ---- */
    const walk = Math.sin(t * P.walkSpeed) * 0.5 * P.walkCycle;
    o.legL.rotation.x = -P.legL + walk + Math.sin(t * P.armWiggleSpeed) * P.armWiggle * 0.5;
    o.legR.rotation.x = -P.legR - walk + Math.sin(t * P.armWiggleSpeed + 2) * P.armWiggle * 0.5;
    o.legL.rotation.z = P.legSpread;
    o.legR.rotation.z = -P.legSpread;

    /* ---- tail: whip chain, wag, inertia against horizontal motion ---- */
    S.tailRoot.target = vx * 0.12 - ay * 0.002;
    const tr = S.tailRoot.update(dt);
    const wag = Math.sin(t * P.tailWagSpeed) * P.tailWag;
    const rootAngle = -0.4 - P.tailLift * 0.7 + wag + tr;
    const links = S.tail.update(rootAngle, dt);
    o.tail.rotation.z = rootAngle;
    o.tail.rotation.y = Math.sin(t * 3.1) * 0.25;
    // fright puff: each link scales a little, compounding toward the tip → bottle-brush tail
    const puffK = 1 + Math.max(0, S.puff.update(dt)) * 0.11;
    for (let i = 0; i < TAIL_N; i++) {
      const seg = o["tail" + i];
      const follow = links[i].value - (i === 0 ? rootAngle : links[i - 1].value);
      seg.rotation.z = follow * 1.6 + 0.28 + P.tailCurl * 0.34 + Math.sin(t * P.tailWagSpeed + i * 0.6) * P.tailWag * 0.25;
      seg.rotation.y = Math.sin(t * 2.3 + i * 0.5) * 0.08 * (i + 1);
      seg.scale.setScalar(puffK);
    }

    /* ---- face ---- */
    const dot = (1 - E.eyeHappy) * (1 - E.eyeCry) * (1 - E.eyeHeart) * (1 - E.eyeStar) * (1 - E.eyeSpiral);
    const lookX = S.look * 0.045;
    const lookYo = S.lookY * 0.03;
    for (const side of ["L", "R"] as const) {
      const isR = side === "R";
      const wink = isR ? E.winkR : 0;
      const open = E.eyeOpen * S.blink * (1 - wink);
      const eye = o["eye" + side];
      eye.position.x = (isR ? 0.4 : -0.4) + lookX;
      eye.position.y = -0.04 + E.eyeOffsetY + lookYo;
      const shock = E.eyeShock;
      const lidK = E.eyeLid * open;
      const sx = Math.max(0.0001, E.eyeScale * dot * (1 - shock * 0.5) * (1 + E.eyeSquash * 0.5));
      const sy = Math.max(0.0001, Math.max(0.09, open) * E.eyeScale * dot * (1 - shock * 0.5) * (1 - E.eyeSquash * 0.6 * (1 - open)) * (1 - lidK * 0.5));
      const dotY = lookYo * 0.3 - lidK * 0.045;
      o["dot" + side].scale.set(sx * 0.95, sy * 1.05, 1);
      o["dot" + side].position.set(lookX * 0.4 * shock, dotY, 0.002 + shock * 0.003);
      // half-lidded look: an ink line along the flattened top edge of the eye
      const lid = o["lid" + side];
      const lidOn = lidK > 0.03 && dot > 0.5;
      lid.scale.set(lidOn ? 1.35 * sx : 0.0001, lidOn ? 1 : 0.0001, 1);
      lid.position.set(lookX * 0.4 * shock, dotY + sy * 1.05 * 0.105 - 0.012, 0.006);
      const ring = shock * dot * Math.max(0.2, open);
      o["ring" + side].scale.set(Math.max(0.0001, ring * E.eyeScale), Math.max(0.0001, ring * E.eyeScale * Math.max(0.3, open)), 1);
      const hl = E.eyeSparkle * clamp((open - 0.35) / 0.3, 0, 1) * dot * (1 - shock * 0.6);
      o["hl" + side].scale.setScalar(Math.max(0.0001, hl));
      o["hl" + side].position.set(-0.035 + lookX * 0.3, 0.04 + lookYo * 0.2, 0.004);
      // secondary glossy catch-light (smaller, opposite corner) — gives the eye depth
      o["hl2" + side].scale.setScalar(Math.max(0.0001, hl * 0.5));
      o["hl2" + side].position.set(0.042 + lookX * 0.3, -0.045 + lookYo * 0.2, 0.004);
      // happy arcs also serve as the closed eye for a wink
      o["happy" + side].scale.setScalar(Math.max(0.0001, Math.max(E.eyeHappy, wink * (1 - E.eyeSquash)) * E.eyeScale));
      o["cry" + side].scale.setScalar(Math.max(0.0001, E.eyeCry));
      const beat = 1 + Math.sin(t * 8) * 0.08;
      o["heart" + side].scale.setScalar(Math.max(0.0001, E.eyeHeart * beat));
      o["heart" + side].rotation.z = Math.sin(t * 4 + (isR ? 1 : 0)) * 0.1;
      o["star" + side].scale.setScalar(Math.max(0.0001, E.eyeStar * (1 + Math.sin(t * 10 + (isR ? 2 : 0)) * 0.1)));
      o["star" + side].rotation.z = t * 1.5 * (isR ? -1 : 1);
      o["spiral" + side].scale.setScalar(Math.max(0.0001, E.eyeSpiral));
      o["spiral" + side].rotation.z = t * 5 * (isR ? -1 : 1);
      const brow = o["brow" + side];
      brow.scale.setScalar(Math.max(0.0001, E.browLift));
      brow.rotation.z = (isR ? -1 : 1) * E.browAngle;
      brow.position.y = 0.3 + E.browLift * 0.03 + E.eyeOffsetY + E.browHeight * 0.06 + (isR && E.winkR > 0.5 ? -0.03 : 0);
      const bl = clamp(E.blush * (0.85 + per.shyness * 0.3), 0, 1.6);
      // puffed / jiggle-reactive cheeks read as a wider, plumper blush
      const puff = 1 + E.cheekPuff * 0.35 + cheek * 0.06;
      o["blush" + side].scale.set((0.35 + 0.65 * bl) * puff, (0.35 + 0.65 * bl) * 0.75 * puff, 1);
      for (let i = 0; i < 2; i++) {
        const tear = o[`tear${side}${i}`];
        const ph = (t * 1.3 + i * 0.5 + (isR ? 0.25 : 0)) % 1;
        tear.position.y = -0.18 - ph * 0.4;
        const sc = Math.min(1.4, E.tears) * (1 - ph * 0.6) * (ph < 0.08 ? ph / 0.08 : 1);
        tear.scale.set(0.75 * sc, 1.1 * sc, 0.75 * sc);
      }
    }
    const m = o.mouth;
    m.position.x = lookX * 0.5;
    m.position.y = -0.3 + lookYo * 0.4;
    o.mouthCat.scale.setScalar(Math.max(0.0001, E.mouthCat));
    o.mouthSmile.scale.setScalar(Math.max(0.0001, E.mouthSmile));
    o.mouthFrown.scale.setScalar(Math.max(0.0001, E.mouthFrown));
    o.mouthWobble.scale.setScalar(Math.max(0.0001, E.mouthWobble));
    o.mouthWobble.rotation.z = shiver * Math.sin(t * 40) * 0.2;
    o.mouthO.scale.setScalar(Math.max(0.0001, E.mouthO * (1 + Math.sin(t * 6) * 0.06)));
    o.mouthLine.scale.setScalar(Math.max(0.0001, E.mouthLine));
    o.mouthPout.scale.setScalar(Math.max(0.0001, E.mouthPout));
    const mo = E.mouthOpen;
    o.mouthOpen.scale.set(Math.max(0.0001, 0.55 + 0.45 * mo), Math.max(0.0001, mo * (1 + Math.sin(t * 9) * 0.06)), 1);
    const sc = E.mouthScream;
    o.mouthScream.scale.set(Math.max(0.0001, 0.6 + 0.4 * sc), Math.max(0.0001, sc * (1 + Math.sin(t * 14) * 0.08)), 1);
    const gr = E.mouthGrin;
    o.mouthGrin.scale.set(Math.max(0.0001, gr), Math.max(0.0001, gr * (0.85 + Math.abs(Math.sin(t * 12)) * 0.25)), 1);
    o.mouthTongue.scale.set(Math.max(0.0001, E.mouthTongue), Math.max(0.0001, E.mouthTongue * (1 + Math.sin(t * 7) * 0.1)), 1);
    const sw = E.sweat;
    o.sweat.scale.set(0.75 * sw, 1.15 * sw, 0.75 * sw);
    o.sweat.position.y = 0.55 - ((t * 0.7) % 1) * 0.12 * sw;
    const ang = E.angerMark;
    o.anger.scale.setScalar(Math.max(0.0001, ang * (1 + Math.sin(t * 12) * 0.12)));

    /* ---- emotes ---- */
    if (S.emote && S.emote.until < t) S.emote = null;
    const wantEmote: EmoteName | null = S.emote ? S.emote.name : S.fidget?.emote ?? d.emote;
    if (wantEmote !== S.emoteCur) {
      if (S.emoteCur === null && wantEmote !== null) {
        S.emoteS.set(0);
        S.emoteS.impulse(14);
      }
      S.emoteCur = wantEmote;
    }
    S.emoteS.target = wantEmote ? 1 : 0;
    const es = Math.max(0, S.emoteS.update(dt));
    for (const name of EMOTE_NAMES) {
      const g = o["emote_" + name];
      const on = wantEmote === name;
      g.scale.setScalar(on ? Math.max(0.0001, es) : 0.0001);
      g.visible = on;
    }
    o.emotes.position.y = 1.25 + Math.sin(t * 3) * 0.05;
    o.emotes.rotation.z = Math.sin(t * 2.2) * 0.08 - S.lean;
    if (wantEmote === "zzz") {
      for (let i = 0; i < 3; i++) {
        const z = o["zzz" + i];
        const ph = (t * 0.45 + i * 0.33) % 1;
        z.position.set(0.1 + ph * 0.5, ph * 0.9, 0);
        const sz = (0.5 + ph * 0.8) * (ph > 0.8 ? (1 - ph) / 0.2 : 1) * (ph < 0.1 ? ph / 0.1 : 1);
        z.scale.setScalar(Math.max(0.0001, sz));
        z.rotation.z = Math.sin(t * 2 + i) * 0.2;
      }
    }
    if (wantEmote === "hearts3") {
      for (let i = 0; i < 3; i++) {
        const h = o["h3_" + i];
        const ph = (t * 0.7 + i * 0.33) % 1;
        h.position.set(Math.sin(ph * 6 + i) * 0.35, ph * 1.1 - 0.1, 0);
        h.scale.setScalar(Math.max(0.0001, 0.8 * Math.sin(ph * Math.PI)));
      }
    }
    if (wantEmote === "sparkles" || S.sparkle > 0) {
      for (let i = 0; i < 4; i++) {
        const sp = o["spark" + i];
        const tw = Math.max(0, Math.sin(t * 9 + i * 1.7));
        sp.scale.setScalar(Math.max(0.0001, tw * (wantEmote === "sparkles" ? 1 : S.sparkle)));
        sp.rotation.z = t * 3 + i;
      }
    }
    S.sparkle = Math.max(0, S.sparkle - dt * 0.9);
    o.sparkles.visible = S.sparkle > 0 && wantEmote !== "sparkles";
    // dizzy stars orbit
    const dizzyOn = E.eyeSpiral > 0.4 || state === "stunned" || state === "dizzy";
    S.dizzy = damp(S.dizzy, dizzyOn ? 1 : 0, 8, dt);
    o.dizzy.visible = S.dizzy > 0.02;
    o.dizzy.scale.setScalar(Math.max(0.0001, S.dizzy));
    for (let i = 0; i < 3; i++) {
      const st = o["dz" + i];
      const a = t * 4 + (i * Math.PI * 2) / 3;
      st.position.set(Math.cos(a) * 0.75, Math.sin(a * 2) * 0.08, Math.sin(a) * 0.45);
      st.rotation.z = t * 6;
    }

    /* ---- accessories ---- */
    const acc = d.accessory;
    o.shield.visible = acc === "shield";
    if (acc === "shield") {
      S.shieldPulse = Math.max(0, S.shieldPulse - dt * 2);
      const ps = 1 + Math.sin(t * 3) * 0.02 + S.shieldPulse * 0.15;
      o.shield.scale.setScalar(ps);
      o.shield.rotation.y = t * 0.4;
    }
    o.rocket.visible = acc === "rocket";
    if (acc === "rocket") {
      S.flameFlicker = rand(0.8, 1.25);
      o.flame.scale.set(S.flameFlicker, 1 + rand(0, 0.6) + clamp(vy, 0, 30) * 0.03, S.flameFlicker);
      o.rocket.rotation.z = Math.sin(t * 40) * 0.01;
    }
    o.balloon.visible = acc === "balloon";
    if (acc === "balloon") {
      S.balloon.setTarget(-vx * 0.06, 0);
      S.balloon.x.impulse(noise1(t * 0.5, 3) * 0.05);
      S.balloon.update(dt);
      o.balloon.rotation.z = clamp(S.balloon.x.value, -0.8, 0.8) + Math.sin(t * 1.5) * 0.05;
      o.balloon.rotation.x = Math.sin(t * 1.1) * 0.06;
    }
    o.umbrella.visible = acc === "umbrella";
    if (acc === "umbrella") {
      o.umbrella.rotation.z = -vx * 0.05 + Math.sin(t * 2) * 0.04;
      o.umbrella.rotation.x = clamp(vy * 0.01, -0.2, 0.1);
    }
    o.fish.visible = acc === "fish";
    if (acc === "fish") o.fish.rotation.z = Math.sin(t * 6) * 0.15;

    /* ---- petting ---- */
    S.petCooldown = Math.max(0, S.petCooldown - dt);
    S.petAmount = Math.max(0, S.petAmount - dt * 1.5);
  });

  const fur = palette.fur;
  const stripe = palette.stripe;
  const faceZ = (x: number, y: number) => 0.98 * Math.sqrt(Math.max(0.05, 1 - (x / 1.08) ** 2 - (y / 0.95) ** 2));
  const stripeMat = toon(stripe);
  const pawMat = flat(palette.paw);
  const shadeMat = toon(palette.furShade);

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
            {(["L", "R"] as const).map((side) => {
              const sgn = side === "L" ? -1 : 1;
              return (
                <group key={side} ref={r("leg" + side)} position={[sgn * 0.3, 0.55, 0.05]}>
                  <Part geometry={G.leg} color={fur} position={[0, -0.22, 0]} />
                  <PawPad position={[0, -0.44, 0.178]} rotation={[-0.56, 0, 0]} scale={1.05} mat={pawMat} />
                </group>
              );
            })}
            {/* tail (whip chain) */}
            <group ref={r("tail")} position={[0.5, 0.35, -0.3]} rotation={[0, 0, -0.4]}>
              <TailChain i={0} fur={fur} tip={palette.furShade} r={r} />
            </group>
            {/* body + belly patch (a second sphere poking through the front) */}
            <group ref={r("bodyJiggle")} position={[0, 0.85, 0]}>
              <Part geometry={G.body} color={fur} scale={[1, 0.95, 0.88]} />
              <mesh geometry={G.body} material={shadeMat} position={[0, -0.06, 0.21]} scale={[0.64, 0.6, 0.6]} />
            </group>
            {/* arms */}
            <Arm side="L" fur={fur} pawMat={pawMat} r={r} />
            <Arm side="R" fur={fur} pawMat={pawMat} r={r} />

            {/* head */}
            <group ref={r("head")} position={[0, 1.88, 0]}>
              <Part geometry={G.head} color={fur} scale={[1.08, 0.95, 0.98]} outlineWidth={OUTLINE_W * 1.1} />
              {/* stripes */}
              <mesh geometry={G.stripe} material={stripeMat} position={[0, 0.875, 0.36]} rotation={[Math.PI / 2 + 0.42, 0, 0]} />
              <mesh geometry={G.stripe} material={stripeMat} position={[-0.25, 0.845, 0.34]} rotation={[Math.PI / 2 + 0.42, 0, 0.22]} />
              <mesh geometry={G.stripe} material={stripeMat} position={[0.25, 0.845, 0.34]} rotation={[Math.PI / 2 + 0.42, 0, -0.22]} />
              {/* ears: base + floppy tip */}
              {(["L", "R"] as const).map((side) => {
                const sgn = side === "L" ? -1 : 1;
                return (
                  <group key={side} ref={r("ear" + side)} position={[sgn * 0.62, 0.5, -0.04]} rotation={[0, 0, sgn * 0.38]}>
                    {/* fur root ball (outline-less) buried at the pivot — keeps the ear visually fused to the skull when it flops */}
                    <mesh geometry={G.head} material={toon(fur)} scale={[0.34, 0.26, 0.26]} position={[0, -0.03, -0.05]} />
                    <Part geometry={G.ear} color={fur} scale={[1, 1, 0.62]} outlineWidth={OUTLINE_W * 1.05} />
                    <mesh geometry={G.ear} material={toon(palette.innerEar)} position={[0, 0.07, 0.11]} scale={[0.55, 0.6, 0.55]} />
                  </group>
                );
              })}
              {/* whiskers */}
              {(["L", "R"] as const).map((side) => {
                const sgn = side === "L" ? -1 : 1;
                return (
                  <group key={side} ref={r("whisker" + side)} position={[sgn * 0.95, -0.2, 0.5]}>
                    {[-0.22, 0, 0.22].map((a, i) => (
                      <mesh key={i} geometry={G.whisker} material={M.ink} position={[sgn * 0.17, a * 0.55, 0]} rotation={[0, 0, sgn * (Math.PI / 2 - a * 0.9)]} scale={[0.8, 0.9 - Math.abs(a) * 0.5, 0.8]} />
                    ))}
                  </group>
                );
              })}

              {/* ---- FACE ---- */}
              {(["L", "R"] as const).map((side) => {
                const sgn = side === "L" ? -1 : 1;
                const ex = sgn * 0.4;
                const ey = -0.04;
                const dir = -sgn;
                return (
                  <group key={side}>
                    <group ref={r("eye" + side)} position={[ex, ey, faceZ(ex, ey) + 0.02]} rotation={[0, sgn * 0.36, 0]}>
                      <mesh ref={r("ring" + side)} geometry={G.eyeRing} material={M.white} position={[0, 0, -0.002]} />
                      <mesh ref={r("dot" + side)} geometry={G.eyeDot} material={M.ink} />
                      <mesh ref={r("hl" + side)} geometry={G.highlight} material={M.white} position={[-0.035, 0.04, 0.004]} />
                      <mesh ref={r("hl2" + side)} geometry={G.highlight} material={M.white} position={[0.042, -0.045, 0.004]} scale={0.5} />
                      <mesh ref={r("happy" + side)} geometry={G.happyArc} material={M.ink} position={[0, -0.03, 0]} />
                      <group ref={r("cry" + side)}>
                        <mesh geometry={G.chevron} material={M.ink} position={[dir * 0.06 - dir * 0.065, 0.05, 0]} rotation={[0, 0, -dir * 0.7]} />
                        <mesh geometry={G.chevron} material={M.ink} position={[dir * 0.06 - dir * 0.065, -0.05, 0]} rotation={[0, 0, dir * 0.7]} />
                      </group>
                      <mesh ref={r("heart" + side)} geometry={HEART_FLAT} material={M.heart} scale={0.0001} position={[0, 0.02, 0.003]} />
                      <mesh ref={r("star" + side)} geometry={STAR_FLAT} material={M.emoteGold} scale={0.0001} position={[0, 0, 0.003]} />
                      <mesh ref={r("spiral" + side)} geometry={G.spiral} material={M.ink} scale={0.0001} position={[0, 0, 0.003]} />
                      <mesh ref={r("lid" + side)} geometry={G.line} material={M.ink} position={[0, 0.1, 0.006]} scale={0.0001} />
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
                      <Part key={i} ref={r(`tear${side}${i}`)} geometry={G.drop} material={M.tear} outlineWidth={0.03} position={[sgn * (0.5 + i * 0.06), -0.2, faceZ(sgn * 0.52, -0.25) + 0.03]} />
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
                <group ref={r("mouthLine")}>
                  <mesh geometry={G.line} material={M.ink} position={[0, -0.01, 0]} />
                </group>
                <group ref={r("mouthPout")}>
                  <mesh geometry={G.tinyArc} material={M.ink} position={[0.005, 0.03, 0]} rotation={[0, 0, -Math.PI / 2]} />
                  <mesh geometry={G.tinyArc} material={M.ink} position={[0.005, -0.04, 0]} rotation={[0, 0, -Math.PI / 2]} />
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
                <group ref={r("mouthScream")} position={[0, -0.1, 0]}>
                  <mesh geometry={G.screamRim} material={M.ink} scale={[0.9, 1.15, 1]} />
                  <mesh geometry={G.scream} material={M.mouthIn} position={[0, 0, 0.002]} scale={[0.9, 1.15, 1]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.1, 0.004]} scale={1.2} />
                </group>
                <group ref={r("mouthGrin")} position={[0, -0.02, 0]}>
                  <mesh geometry={G.mouthOpenRim} material={M.ink} scale={[1.7, 0.95, 1]} />
                  <mesh geometry={G.mouthOpen} material={M.mouthIn} position={[0, 0, 0.002]} scale={[1.7, 0.95, 1]} />
                  <mesh geometry={G.teeth} material={M.white} position={[0, 0.06, 0.004]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.06, 0.004]} scale={[1.3, 0.9, 1]} />
                </group>
                <group ref={r("mouthTongue")} position={[0, -0.06, 0]}>
                  <mesh geometry={G.tongue} material={M.ink} position={[0, 0, 0]} scale={[0.85, 1.25, 1]} />
                  <mesh geometry={G.tongue} material={M.tongue} position={[0, -0.005, 0.003]} scale={[0.68, 1.1, 1]} />
                </group>
              </group>
              {/* sweat drop + anger mark */}
              <Part ref={r("sweat")} geometry={G.drop} material={M.tear} outlineWidth={0.03} position={[0.82, 0.55, 0.45]} />
              <group ref={r("anger")} position={[0.6, 0.62, faceZ(0.6, 0.62) + 0.02]} rotation={[0, 0.5, 0]}>
                {[0, 1, 2, 3].map((i) => (
                  <mesh key={i} geometry={G.angerBar} material={M.anger} rotation={[0, 0, (i * Math.PI) / 4 + 0.4]} position={[Math.cos(i * 1.57) * 0.03, Math.sin(i * 1.57) * 0.03, 0]} />
                ))}
              </group>

              {/* ---- emote bubbles ---- */}
              <group ref={r("emotes")} position={[0.7, 1.25, 0.1]}>
                <group ref={r("emote_exclaim")}>
                  <Part geometry={G.exclaimBar} material={M.emoteRed} position={[0, 0.25, 0]} outlineWidth={0.035} />
                  <Part geometry={G.exclaimDot} material={M.emoteRed} position={[0, -0.05, 0]} outlineWidth={0.035} />
                </group>
                <group ref={r("emote_question")}>
                  <Part geometry={G.qArc} material={M.emoteBlue} position={[0, 0.28, 0]} rotation={[0, 0, -0.6]} outlineWidth={0.035} />
                  <Part geometry={G.qStem} material={M.emoteBlue} position={[0.02, 0.06, 0]} outlineWidth={0.035} />
                  <Part geometry={G.exclaimDot} material={M.emoteBlue} position={[0.02, -0.14, 0]} outlineWidth={0.035} />
                </group>
                <group ref={r("emote_heart")}>
                  <Part geometry={HEART_FLAT} material={M.heart} scale={2.2} outlineWidth={0.03} />
                </group>
                <group ref={r("emote_hearts3")}>
                  {[0, 1, 2].map((i) => (
                    <group key={i} ref={r("h3_" + i)}>
                      <Part geometry={HEART_FLAT} material={M.heart} scale={1.6} outlineWidth={0.03} />
                    </group>
                  ))}
                </group>
                <group ref={r("emote_zzz")}>
                  {[0, 1, 2].map((i) => (
                    <ZLetter key={i} idx={i} r={r} />
                  ))}
                </group>
                <group ref={r("emote_note")}>
                  <Part geometry={G.noteHead} material={M.emoteRed} position={[-0.06, -0.1, 0]} scale={[1.2, 0.85, 1]} rotation={[0, 0, -0.4]} outlineWidth={0.03} />
                  <Part geometry={G.noteStem} material={M.emoteRed} position={[0.03, 0.05, 0]} outlineWidth={0.03} />
                  <Part geometry={G.noteFlag} material={M.emoteRed} position={[0.085, 0.16, 0]} rotation={[0, 0, -0.5]} outlineWidth={0.03} />
                </group>
                <group ref={r("emote_sweat")}>
                  <Part geometry={G.drop} material={M.tear} scale={1.8} outlineWidth={0.03} />
                </group>
                <group ref={r("emote_anger")} position={[-0.15, -0.3, 0]}>
                  {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} geometry={G.angerBar} material={M.anger} rotation={[0, 0, (i * Math.PI) / 4 + 0.4]} position={[Math.cos(i * 1.57) * 0.03, Math.sin(i * 1.57) * 0.03, 0]} scale={1.6} />
                  ))}
                </group>
                <group ref={r("emote_sparkles")}>
                  {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} ref={r("spark" + i)} geometry={G.sparkle} material={M.spark} position={[Math.cos(i * 1.6) * 0.4 - 0.5, Math.sin(i * 1.6) * 0.35, 0]} scale={[1, 1.6, 1]} />
                  ))}
                </group>
              </group>
              {/* ambient sparkles (record / star) shares the spark refs */}
              <group ref={r("sparkles")} visible={false} />
              {/* dizzy stars orbiting */}
              <group ref={r("dizzy")} position={[0, 0.95, 0]}>
                {[0, 1, 2].map((i) => (
                  <Part key={i} ref={r("dz" + i)} geometry={STAR_GEO} material={M.emoteGold} scale={0.9} outlineWidth={0.025} />
                ))}
              </group>
            </group>

            {/* ---- accessories ---- */}
            <group ref={r("shield")} position={[0, 1.35, 0]} visible={false}>
              <mesh geometry={G.shield} material={M.shield} />
              <mesh geometry={G.shieldGloss} material={M.shieldGloss} position={[-0.9, 1.05, 1.0]} scale={[1, 0.5, 0.3]} rotation={[0, 0, 0.6]} />
            </group>
            <group ref={r("rocket")} position={[0, 1.0, -0.72]} visible={false}>
              <Part geometry={G.rocketBody} material={M.rocketRed} outlineWidth={0.05} />
              <Part geometry={G.rocketTip} material={M.rocketWhite} position={[0, 0.58, 0]} outlineWidth={0.04} />
              <mesh geometry={G.rocketBody} material={M.rocketWhite} scale={[1.02, 0.3, 1.02]} position={[0, -0.05, 0]} />
              <Part geometry={G.fin} material={M.rocketWhite} position={[-0.28, -0.35, 0]} outlineWidth={0.03} />
              <Part geometry={G.fin} material={M.rocketWhite} position={[0.28, -0.35, 0]} outlineWidth={0.03} />
              <group ref={r("flame")} position={[0, -0.55, 0]}>
                <mesh geometry={G.flame} material={M.flame} rotation={[Math.PI, 0, 0]} position={[0, -0.25, 0]} />
                <mesh geometry={G.flame} material={M.flameIn} rotation={[Math.PI, 0, 0]} position={[0, -0.15, 0]} scale={0.55} />
              </group>
            </group>
            <group ref={r("balloon")} position={[0.75, 2.05, 0.35]} visible={false}>
              <mesh geometry={G.string} material={M.ink} position={[0, 0.75, 0]} scale={[1, 1.5, 1]} />
              <Part geometry={G.balloonKnot} material={M.emoteRed} position={[0, 1.5, 0]} rotation={[Math.PI, 0, 0]} outlineWidth={0.03} />
              <Part geometry={G.balloon} material={M.emoteRed} position={[0, 2.05, 0]} scale={[1, 1.15, 1]} outlineWidth={0.05}>
                <mesh geometry={G.shieldGloss} material={M.shieldGloss} position={[-0.2, 0.25, 0.4]} scale={[0.6, 0.35, 0.2]} rotation={[0, 0, 0.6]} />
              </Part>
            </group>
            <group ref={r("umbrella")} position={[0.6, 2.2, 0.2]} visible={false}>
              <mesh geometry={G.umbrellaStick} material={M.stick} position={[0, 0.75, 0]} />
              <mesh geometry={G.umbrellaHandle} material={M.stick} position={[0.12, 0.02, 0]} rotation={[0, 0, Math.PI]} />
              <Part geometry={G.umbrellaTop} material={M.umbrella} position={[0, 1.4, 0]} scale={[1, 0.55, 1]} outlineWidth={0.05} />
              <mesh geometry={G.umbrellaTop} material={M.umbrellaAlt} position={[0, 1.41, 0]} scale={[0.35, 0.56, 1.01]} />
              <Part geometry={G.exclaimDot} material={M.emoteGold} position={[0, 2.02, 0]} outlineWidth={0.03} />
            </group>
            <group ref={r("fish")} position={[0, 1.15, 0.6]} rotation={[0, 0, 0.3]} visible={false}>
              <Part geometry={G.fishBody} material={M.fish} scale={[1.5, 0.9, 0.7]} outlineWidth={0.04} />
              <Part geometry={G.fishTail} material={M.fishDark} position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.5]} outlineWidth={0.035} />
              <mesh geometry={G.highlight} material={M.ink} position={[0.18, 0.05, 0.16]} scale={1.3} />
            </group>

            {/* ---- interactive hit zones ---- */}
            {interactive && (
              <>
                <mesh
                  position={[0, 1.9, 0]}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    fire("poke");
                    onPoke?.("head");
                  }}
                  onPointerMove={(e) => {
                    if (e.buttons === 0 && e.pointerType !== "touch") return;
                    S.petAmount += 0.12;
                    if (S.petAmount > 2.2 && S.petCooldown <= 0) {
                      S.petAmount = 0;
                      S.petCooldown = 2.5;
                      fire("pet");
                    }
                  }}
                >
                  <sphereGeometry args={[1.15, 12, 8]} />
                  <meshBasicMaterial visible={false} />
                </mesh>
                <mesh
                  position={[0, 0.8, 0.2]}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    fire("pokeBelly");
                    onPoke?.("belly");
                  }}
                >
                  <sphereGeometry args={[0.8, 12, 8]} />
                  <meshBasicMaterial visible={false} />
                </mesh>
                <mesh
                  position={[1.05, 0.45, -0.3]}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    fire("pokeTail");
                    onPoke?.("tail");
                  }}
                >
                  <sphereGeometry args={[0.5, 10, 8]} />
                  <meshBasicMaterial visible={false} />
                </mesh>
              </>
            )}
            {children}
          </group>
        </group>
      </group>
    </group>
  );
}

const EMOTE_NAMES: EmoteName[] = ["exclaim", "question", "heart", "zzz", "note", "sweat", "sparkles", "anger", "hearts3"];
export const ALL_EMOTES = EMOTE_NAMES;
export const ALL_ACCESSORIES: Accessory[] = ["none", "balloon", "rocket", "shield", "umbrella", "fish"];
export const ALL_EVENTS: CatEvent[] = Object.keys(EVENT_FLASH) as CatEvent[];
