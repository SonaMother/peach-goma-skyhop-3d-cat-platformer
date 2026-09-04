/**
 * POSE / MOTION-STATE SYSTEM
 * --------------------------
 * A "pose" is a set of body targets. The rig springs toward the active pose
 * each frame and layers procedural motion (velocity reactions, breathing,
 * flailing, wagging...) on top.
 *
 * To add a new motion state: add an entry to POSES (and, optionally, a
 * default expression in POSE_EXPRESSION).
 */
import type { ExpressionName } from "./expressions";

export interface PoseParams {
  stretch: number; // vertical stretch factor (1 = neutral)
  crouch: number; // lowers the whole body (world units)
  lean: number; // extra body lean (radians, z)
  headTilt: number; // z
  headPitch: number; // x, + = looking down
  armRaiseL: number; // outward/up rotation
  armRaiseR: number;
  armForwardL: number; // toward camera
  armForwardR: number;
  armWiggle: number; // sinus flail amplitude
  wave: number; // right-arm wave amplitude
  legL: number; // leg forward rotation
  legR: number;
  earFold: number; // - = flat back, + = perked
  tailLift: number;
  tailWag: number; // wag amplitude
  bob: number; // idle bob amplitude
}

export type MotionState =
  | "idle"
  | "walk"
  | "rise"
  | "apex"
  | "fall"
  | "plummet"
  | "land"
  | "superJump"
  | "sit"
  | "sitSad"
  | "hug"
  | "wave"
  | "celebrate"
  | "dizzy"
  | "lieDown";

const BASE: PoseParams = {
  stretch: 1,
  crouch: 0,
  lean: 0,
  headTilt: 0,
  headPitch: 0,
  armRaiseL: 0.35,
  armRaiseR: 0.35,
  armForwardL: 0.25,
  armForwardR: 0.25,
  armWiggle: 0,
  wave: 0,
  legL: 0,
  legR: 0,
  earFold: 0,
  tailLift: 0,
  tailWag: 0.25,
  bob: 0.02,
};

const p = (o: Partial<PoseParams>): PoseParams => ({ ...BASE, ...o });

export const POSES: Record<MotionState, PoseParams> = {
  idle: p({}),
  walk: p({ armWiggle: 0.3, bob: 0.04 }),
  rise: p({ stretch: 1.12, armRaiseL: 2.5, armRaiseR: 2.5, armForwardL: 0.2, armForwardR: 0.2, earFold: -0.6, legL: -0.4, legR: -0.4, tailLift: -0.5, tailWag: 0.1 }),
  apex: p({ stretch: 1.0, armRaiseL: 1.6, armRaiseR: 1.6, armForwardL: 0.5, armForwardR: 0.5, earFold: 0.1, legL: 0.2, legR: -0.2 }),
  fall: p({ stretch: 0.98, armRaiseL: 1.2, armRaiseR: 1.2, armForwardL: 0.6, armForwardR: 0.6, armWiggle: 0.35, earFold: 0.55, legL: 0.6, legR: 0.3, tailLift: 0.6, tailWag: 0.5 }),
  plummet: p({ stretch: 1.06, armRaiseL: 2.2, armRaiseR: 2.2, armWiggle: 0.8, earFold: 0.9, legL: 0.8, legR: 0.6, tailLift: 1.0, tailWag: 0.9, headPitch: -0.15 }),
  land: p({ stretch: 0.8, crouch: 0.1, armRaiseL: 0.9, armRaiseR: 0.9, armForwardL: -0.3, armForwardR: -0.3, earFold: -0.3, headPitch: 0.2 }),
  superJump: p({ stretch: 1.25, armRaiseL: 2.8, armRaiseR: 2.8, earFold: -0.9, legL: -0.6, legR: -0.6, tailLift: -0.8, headPitch: -0.2 }),
  sit: p({ crouch: 0.28, legL: 1.5, legR: 1.5, armRaiseL: 0.25, armRaiseR: 0.25, armForwardL: 0.55, armForwardR: 0.55, headTilt: 0.05, tailLift: 0.4, tailWag: 0.35 }),
  sitSad: p({ crouch: 0.32, stretch: 0.96, legL: 1.5, legR: 1.5, armRaiseL: 0.1, armRaiseR: 0.1, armForwardL: 0.9, armForwardR: 0.9, headPitch: 0.25, earFold: -0.5, tailLift: -0.2, tailWag: 0.05, bob: 0.01 }),
  hug: p({ armRaiseL: 0.5, armRaiseR: 0.5, armForwardL: 1.5, armForwardR: 1.5, headTilt: 0.2, headPitch: 0.1, earFold: -0.15, tailWag: 0.6, bob: 0.03 }),
  wave: p({ armRaiseR: 2.6, wave: 0.45, headTilt: -0.1, earFold: 0.2, tailWag: 0.5 }),
  celebrate: p({ stretch: 1.05, armRaiseL: 2.6, armRaiseR: 2.6, armWiggle: 0.5, bob: 0.08, earFold: 0.3, tailWag: 0.9, tailLift: 0.3 }),
  dizzy: p({ headTilt: 0.3, armRaiseL: 0.9, armRaiseR: 0.2, armForwardL: 0.4, armForwardR: 0.5, earFold: -0.6, lean: 0.12 }),
  lieDown: p({ crouch: 0.35, legL: 1.4, legR: 1.4, armRaiseL: 0.15, armRaiseR: 0.15, armForwardL: 1.2, armForwardR: 1.2, headPitch: -0.2, tailLift: 0.5 }),
};

/** Expression that plays by default with a motion state (can be overridden). */
export const POSE_EXPRESSION: Record<MotionState, ExpressionName> = {
  idle: "content",
  walk: "content",
  rise: "excited",
  apex: "happy",
  fall: "worried",
  plummet: "scared",
  land: "squint",
  superJump: "joy",
  sit: "content",
  sitSad: "cry",
  hug: "love",
  wave: "happy",
  celebrate: "joy",
  dizzy: "dizzy",
  lieDown: "sleepy",
};

/** Per-parameter spring tuning (stiffness, damping). Anything missing uses the default. */
export const POSE_SPRING_TUNING: Partial<Record<keyof PoseParams, [number, number]>> = {
  stretch: [260, 12],
  crouch: [140, 14],
  armRaiseL: [110, 11],
  armRaiseR: [110, 11],
  armForwardL: [110, 11],
  armForwardR: [110, 11],
  legL: [140, 12],
  legR: [140, 12],
  earFold: [180, 9],
  tailLift: [90, 8],
  headTilt: [120, 12],
  headPitch: [120, 12],
};

export const POSE_KEYS = Object.keys(BASE) as (keyof PoseParams)[];
