/**
 * POSE / MOTION-STATE SYSTEM
 * --------------------------
 * A "pose" is a set of body targets. The rig springs toward the active pose
 * each frame and layers procedural motion (velocity reactions, breathing,
 * flailing, wagging, shivering...) on top.
 *
 * To add a new motion state: add an entry to POSES (and, optionally, a
 * default expression in POSE_EXPRESSION).
 */
import type { ExpressionName } from "./expressions";

export interface PoseParams {
  stretch: number; // vertical stretch factor (1 = neutral)
  crouch: number; // lowers the whole body (world units)
  lean: number; // extra body lean (radians, z)
  bodyPitch: number; // whole body pitch (x), + = leaning forward
  bodyRoll: number; // continuous spin speed (rad/s) around x — trampoline flips
  headTilt: number; // z
  headPitch: number; // x, + = looking down
  headYaw: number; // y
  armRaiseL: number; // outward/up rotation
  armRaiseR: number;
  armForwardL: number; // toward camera
  armForwardR: number;
  armWiggle: number; // sinus flail amplitude
  armWiggleSpeed: number;
  wave: number; // right-arm wave amplitude
  pawUpL: number; // paw pad shown / forearm curl
  pawUpR: number;
  legL: number; // leg forward rotation
  legR: number;
  legSpread: number; // legs apart (z rot)
  walkCycle: number; // 0..1 leg cycle amplitude
  walkSpeed: number;
  earFold: number; // - = flat back, + = perked
  earTipFlop: number; // - = tips droop
  tailLift: number;
  tailWag: number; // wag amplitude
  tailWagSpeed: number;
  tailCurl: number; // curl tightness
  bob: number; // idle bob amplitude
  bobSpeed: number;
  shiver: number; // body jitter amplitude
  whiskerFlare: number;
}

export type MotionState =
  | "idle"
  | "walk"
  | "run"
  | "rise"
  | "apex"
  | "fall"
  | "plummet"
  | "land"
  | "superJump"
  | "spin"
  | "rocket"
  | "float"
  | "glide"
  | "stunned"
  | "hurt"
  | "slip"
  | "balance"
  | "sit"
  | "sitSad"
  | "hug"
  | "wave"
  | "celebrate"
  | "dance"
  | "dizzy"
  | "lieDown"
  | "sleep"
  | "yawn"
  | "stretchUp"
  | "groom"
  | "peek"
  | "shiver"
  | "pounce"
  | "think"
  | "bow"
  | "yum"
  | "laugh"
  | "scaredBack"
  | "proud"
  | "brace";

const BASE: PoseParams = {
  stretch: 1,
  crouch: 0,
  lean: 0,
  bodyPitch: 0,
  bodyRoll: 0,
  headTilt: 0,
  headPitch: 0,
  headYaw: 0,
  armRaiseL: 0.35,
  armRaiseR: 0.35,
  armForwardL: 0.25,
  armForwardR: 0.25,
  armWiggle: 0,
  armWiggleSpeed: 15,
  wave: 0,
  pawUpL: 0,
  pawUpR: 0,
  legL: 0,
  legR: 0,
  legSpread: 0,
  walkCycle: 0,
  walkSpeed: 12,
  earFold: 0,
  earTipFlop: 0,
  tailLift: 0,
  tailWag: 0.25,
  tailWagSpeed: 4.5,
  tailCurl: 0,
  bob: 0.02,
  bobSpeed: 2.2,
  shiver: 0,
  whiskerFlare: 0,
};

const p = (o: Partial<PoseParams>): PoseParams => ({ ...BASE, ...o });

export const POSES: Record<MotionState, PoseParams> = {
  idle: p({}),
  walk: p({ armWiggle: 0.25, walkCycle: 1, bob: 0.04, bobSpeed: 6, tailWag: 0.35 }),
  run: p({ armWiggle: 0.5, armWiggleSpeed: 22, walkCycle: 1.3, walkSpeed: 18, bob: 0.06, bobSpeed: 9, bodyPitch: 0.2, earFold: -0.4, tailLift: 0.4, tailWag: 0.2 }),
  rise: p({ stretch: 1.12, armRaiseL: 2.5, armRaiseR: 2.5, armForwardL: 0.2, armForwardR: 0.2, earFold: -0.6, earTipFlop: -0.5, legL: -0.4, legR: -0.4, tailLift: -0.5, tailWag: 0.1, tailCurl: 0.3 }),
  apex: p({ stretch: 1.0, armRaiseL: 1.6, armRaiseR: 1.6, armForwardL: 0.5, armForwardR: 0.5, earFold: 0.1, legL: 0.2, legR: -0.2, whiskerFlare: 0.3 }),
  fall: p({ stretch: 0.98, armRaiseL: 1.2, armRaiseR: 1.2, armForwardL: 0.6, armForwardR: 0.6, armWiggle: 0.35, earFold: 0.55, earTipFlop: 0.6, legL: 0.6, legR: 0.3, tailLift: 0.6, tailWag: 0.5, tailWagSpeed: 7 }),
  plummet: p({ stretch: 1.06, armRaiseL: 2.2, armRaiseR: 2.2, armWiggle: 0.8, armWiggleSpeed: 24, earFold: 0.9, earTipFlop: 1, legL: 0.8, legR: 0.6, legSpread: 0.3, tailLift: 1.0, tailWag: 0.9, tailWagSpeed: 10, headPitch: -0.15, whiskerFlare: 1 }),
  land: p({ stretch: 0.8, crouch: 0.1, armRaiseL: 0.9, armRaiseR: 0.9, armForwardL: -0.3, armForwardR: -0.3, earFold: -0.3, earTipFlop: -0.6, headPitch: 0.2, legSpread: 0.2 }),
  superJump: p({ stretch: 1.25, armRaiseL: 2.8, armRaiseR: 2.8, earFold: -0.9, earTipFlop: -0.8, legL: -0.6, legR: -0.6, tailLift: -0.8, tailCurl: 0.5, headPitch: -0.2, whiskerFlare: 0.6 }),
  spin: p({ stretch: 0.92, bodyRoll: 11, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 1.2, armForwardR: 1.2, legL: 1.2, legR: 1.2, earFold: -0.6, tailCurl: 1, tailLift: 0.6 }),
  rocket: p({ stretch: 1.18, bodyPitch: -0.15, armRaiseL: 0.1, armRaiseR: 0.1, armForwardL: -0.6, armForwardR: -0.6, legL: -0.3, legR: -0.3, earFold: -1, earTipFlop: -1, tailLift: -0.9, tailCurl: 0.4, headPitch: -0.25, whiskerFlare: 1 }),
  float: p({ stretch: 1.02, armRaiseL: 0.4, armRaiseR: 2.9, armForwardL: 0.6, pawUpR: 1, legL: 0.5, legR: 0.3, legSpread: 0.15, earFold: 0.3, tailLift: 0.5, tailWag: 0.3, tailWagSpeed: 2.5, bob: 0.05, bobSpeed: 1.6, headTilt: 0.1 }),
  glide: p({ stretch: 1.0, bodyPitch: 0.35, armRaiseL: 2.6, armRaiseR: 2.6, armForwardL: -0.3, armForwardR: -0.3, legL: 0.9, legR: 0.9, legSpread: 0.4, earFold: 0.8, earTipFlop: 0.8, tailLift: 0.8, tailWag: 0.2, whiskerFlare: 0.7 }),
  stunned: p({ stretch: 0.95, headTilt: 0.35, headPitch: 0.1, armRaiseL: 1.0, armRaiseR: 0.3, armForwardL: 0.5, armForwardR: 0.7, earFold: -0.7, earTipFlop: 0.8, lean: 0.12, legSpread: 0.3, tailLift: -0.3, tailWag: 0.05 }),
  hurt: p({ stretch: 0.9, crouch: 0.05, headPitch: 0.15, armRaiseL: 0.6, armRaiseR: 0.6, armForwardL: 1.2, armForwardR: 1.2, pawUpL: 0.6, pawUpR: 0.6, earFold: -0.9, earTipFlop: 0.4, tailLift: -0.6, tailWag: 0.1, shiver: 0.4 }),
  slip: p({ stretch: 0.95, lean: 0.25, armRaiseL: 2.0, armRaiseR: 1.5, armWiggle: 0.6, armWiggleSpeed: 20, legL: -0.6, legR: 0.7, legSpread: 0.5, earFold: 0.4, earTipFlop: 0.6, tailLift: 0.7, tailWag: 0.8, tailWagSpeed: 12 }),
  balance: p({ armRaiseL: 1.5, armRaiseR: 1.5, armWiggle: 0.3, armWiggleSpeed: 9, lean: 0.08, legSpread: 0.25, earFold: 0.3, tailLift: 0.6, tailWag: 0.7, tailWagSpeed: 8 }),
  sit: p({ crouch: 0.28, legL: 1.5, legR: 1.5, legSpread: 0.2, armRaiseL: 0.25, armRaiseR: 0.25, armForwardL: 0.55, armForwardR: 0.55, headTilt: 0.05, tailLift: 0.4, tailWag: 0.35, tailCurl: 0.6 }),
  sitSad: p({ crouch: 0.32, stretch: 0.96, legL: 1.5, legR: 1.5, armRaiseL: 0.1, armRaiseR: 0.1, armForwardL: 0.9, armForwardR: 0.9, headPitch: 0.25, earFold: -0.5, earTipFlop: 0.7, tailLift: -0.2, tailWag: 0.05, bob: 0.01 }),
  hug: p({ armRaiseL: 0.5, armRaiseR: 0.5, armForwardL: 1.5, armForwardR: 1.5, headTilt: 0.2, headPitch: 0.1, earFold: -0.15, tailWag: 0.6, tailWagSpeed: 6, bob: 0.03 }),
  wave: p({ armRaiseR: 2.6, wave: 0.45, pawUpR: 1, headTilt: -0.1, earFold: 0.2, tailWag: 0.5 }),
  celebrate: p({ stretch: 1.05, armRaiseL: 2.6, armRaiseR: 2.6, armWiggle: 0.5, pawUpL: 1, pawUpR: 1, bob: 0.08, bobSpeed: 7, earFold: 0.3, tailWag: 0.9, tailWagSpeed: 9, tailLift: 0.3 }),
  dance: p({ armRaiseL: 1.2, armRaiseR: 1.2, armWiggle: 0.9, armWiggleSpeed: 9, pawUpL: 1, pawUpR: 1, walkCycle: 0.6, walkSpeed: 9, bob: 0.07, bobSpeed: 4.5, headTilt: 0.15, earFold: 0.4, tailWag: 0.8, tailWagSpeed: 9, lean: 0.1 }),
  dizzy: p({ headTilt: 0.3, armRaiseL: 0.9, armRaiseR: 0.2, armForwardL: 0.4, armForwardR: 0.5, earFold: -0.6, earTipFlop: 0.7, lean: 0.12, bob: 0.03, bobSpeed: 1.4 }),
  lieDown: p({ crouch: 0.35, legL: 1.4, legR: 1.4, legSpread: 0.3, armRaiseL: 0.15, armRaiseR: 0.15, armForwardL: 1.2, armForwardR: 1.2, headPitch: -0.2, tailLift: 0.5, tailCurl: 0.8, tailWagSpeed: 2 }),
  sleep: p({ crouch: 0.4, stretch: 0.97, legL: 1.4, legR: 1.4, legSpread: 0.3, armRaiseL: 0.1, armRaiseR: 0.1, armForwardL: 1.3, armForwardR: 1.3, headPitch: 0.25, headTilt: 0.2, earFold: -0.4, earTipFlop: 0.6, tailLift: 0.2, tailCurl: 1, tailWag: 0.05, tailWagSpeed: 1, bob: 0.03, bobSpeed: 1.1 }),
  yawn: p({ crouch: 0.05, stretch: 1.04, armRaiseL: 1.0, armRaiseR: 1.0, armForwardL: 0.9, armForwardR: 0.9, pawUpR: 0.8, headPitch: -0.25, earFold: -0.6, earTipFlop: 0.3, tailLift: 0.2 }),
  stretchUp: p({ stretch: 1.2, armRaiseL: 2.9, armRaiseR: 2.9, headPitch: -0.2, earFold: -0.4, tailLift: 0.7, tailCurl: 0.3, legL: -0.2, legR: -0.2 }),
  groom: p({ crouch: 0.2, legL: 1.3, legR: 1.3, armRaiseR: 1.4, armForwardR: 1.6, pawUpR: 1, armWiggle: 0.12, armWiggleSpeed: 11, headTilt: -0.25, headPitch: 0.15, earFold: -0.3, tailCurl: 0.5 }),
  peek: p({ crouch: 0.15, headPitch: 0.1, headYaw: 0.4, armRaiseL: 0.6, armRaiseR: 0.6, armForwardL: 1.1, armForwardR: 1.1, earFold: 0.8, legSpread: 0.1, tailLift: 0.3, tailWag: 0.15 }),
  shiver: p({ crouch: 0.08, stretch: 0.96, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 1.1, armForwardR: 1.1, pawUpL: 0.5, pawUpR: 0.5, earFold: -0.6, earTipFlop: 0.4, tailLift: -0.4, tailCurl: 0.9, tailWag: 0.05, shiver: 1 }),
  pounce: p({ crouch: 0.22, stretch: 0.85, bodyPitch: 0.25, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 1.0, armForwardR: 1.0, legL: 0.3, legR: 0.3, earFold: 0.6, tailLift: 0.9, tailWag: 0.9, tailWagSpeed: 13, headPitch: -0.1 }),
  think: p({ armRaiseR: 1.1, armForwardR: 1.4, pawUpR: 1, headTilt: 0.22, headPitch: -0.1, earFold: 0.2, tailWag: 0.4, tailWagSpeed: 3 }),
  bow: p({ crouch: 0.1, bodyPitch: 0.55, headPitch: 0.35, armRaiseL: 0.2, armRaiseR: 0.2, armForwardL: 0.9, armForwardR: 0.9, earFold: -0.2, tailLift: 0.4 }),
  yum: p({ crouch: 0.05, armRaiseL: 0.9, armRaiseR: 0.9, armForwardL: 1.5, armForwardR: 1.5, pawUpL: 1, pawUpR: 1, headTilt: 0.1, bob: 0.04, bobSpeed: 5, earFold: 0.3, tailWag: 0.7, tailWagSpeed: 8 }),
  laugh: p({ stretch: 1.03, headPitch: -0.2, armRaiseL: 0.6, armRaiseR: 0.6, armForwardL: 1.2, armForwardR: 1.2, pawUpL: 0.8, pawUpR: 0.8, bob: 0.06, bobSpeed: 11, earFold: 0.3, tailWag: 0.8, tailWagSpeed: 10 }),
  scaredBack: p({ crouch: 0.1, stretch: 0.92, bodyPitch: -0.2, lean: 0.05, armRaiseL: 1.6, armRaiseR: 1.6, armForwardL: 0.9, armForwardR: 0.9, pawUpL: 1, pawUpR: 1, earFold: -1, earTipFlop: 0.6, tailLift: 0.9, tailCurl: 0.2, tailWag: 0.2, shiver: 0.5 }),
  proud: p({ stretch: 1.04, bodyPitch: -0.1, armRaiseL: 0.15, armRaiseR: 0.15, armForwardL: 0.9, armForwardR: 0.9, headPitch: -0.15, earFold: 0.6, tailLift: 0.9, tailCurl: 0.4, tailWag: 0.3 }),
  // anticipation just before touchdown: paws reach for the platform, legs drop, tail up for balance
  brace: p({ stretch: 0.95, crouch: 0.03, armRaiseL: 1.9, armRaiseR: 1.9, armForwardL: 0.45, armForwardR: 0.45, pawUpL: 0.7, pawUpR: 0.7, legL: 0.95, legR: 0.95, legSpread: 0.35, earFold: 0.45, earTipFlop: 0.35, tailLift: 0.75, tailWag: 0.45, tailWagSpeed: 9, headPitch: 0.28, whiskerFlare: 0.6 }),
};

/** Expression that plays by default with a motion state (can be overridden). */
export const POSE_EXPRESSION: Record<MotionState, ExpressionName> = {
  idle: "content",
  walk: "content",
  run: "determined",
  rise: "excited",
  apex: "happy",
  fall: "worried",
  plummet: "terrified",
  land: "squint",
  superJump: "joy",
  spin: "wow",
  rocket: "starEyes",
  float: "happy",
  glide: "focus",
  stunned: "dizzy",
  hurt: "ouch",
  slip: "shocked",
  balance: "worried",
  sit: "content",
  sitSad: "cry",
  hug: "love",
  wave: "happy",
  celebrate: "joy",
  dance: "sing",
  dizzy: "dizzy",
  lieDown: "sleepy",
  sleep: "asleep",
  yawn: "sleepy",
  stretchUp: "relieved",
  groom: "focus",
  peek: "confused",
  shiver: "cold",
  pounce: "determined",
  think: "confused",
  bow: "content",
  yum: "yum",
  laugh: "laugh",
  scaredBack: "scared",
  proud: "proud",
  brace: "focus",
};

/** Per-parameter spring tuning (stiffness, damping). Anything missing uses the default. */
export const POSE_SPRING_TUNING: Partial<Record<keyof PoseParams, [number, number]>> = {
  stretch: [260, 12],
  crouch: [140, 14],
  bodyPitch: [110, 12],
  armRaiseL: [110, 11],
  armRaiseR: [110, 11],
  armForwardL: [110, 11],
  armForwardR: [110, 11],
  pawUpL: [140, 12],
  pawUpR: [140, 12],
  legL: [140, 12],
  legR: [140, 12],
  legSpread: [140, 12],
  earFold: [180, 9],
  earTipFlop: [160, 8],
  tailLift: [90, 8],
  tailCurl: [80, 9],
  headTilt: [120, 12],
  headPitch: [120, 12],
  headYaw: [120, 12],
  whiskerFlare: [160, 10],
};

export const POSE_KEYS = Object.keys(BASE) as (keyof PoseParams)[];
export const POSE_NAMES = Object.keys(POSES) as MotionState[];
