/**
 * EXPRESSION SYSTEM
 * -----------------
 * Every facial feature is a continuous channel. An "expression" is a preset.
 * The rig cross-fades between presets every frame, so any two expressions blend
 * naturally, and event "flashes" can interrupt for a moment and melt back.
 *
 * To add a new expression: add an entry to EXPRESSIONS. That's it.
 */
export interface ExpressionParams {
  /* ---- eyes ---- */
  eyeOpen: number; // 0 = closed line, 1 = fully open dot
  eyeScale: number; // 1 = normal, >1 = wide, <1 = tiny
  eyeHappy: number; // ^ ^ arcs
  eyeCry: number; // > <  squeezed
  eyeHeart: number; // ♥ ♥
  eyeStar: number; // ★ ★
  eyeSpiral: number; // @ @ dizzy
  eyeShock: number; // tiny pupil in a white ring
  eyeLid: number; // upper lid coverage 0..1 (smug / sleepy / unimpressed)
  eyeSparkle: number; // highlight size
  eyeOffsetY: number; // vertical shift
  eyeSquash: number; // horizontal squash of the dot (0..1) for a "flat" line look
  winkR: number; // right eye closes independently
  /* ---- brows ---- */
  browLift: number; // visibility
  browAngle: number; // + worried (inner up), - angry
  browHeight: number; // extra raise
  /* ---- mouth ---- */
  mouthCat: number; // ω
  mouthSmile: number; // ◡
  mouthOpen: number; // open happy mouth w/ tongue
  mouthO: number; // small o
  mouthFrown: number; // ︿
  mouthWobble: number; // ~ (about to cry)
  mouthScream: number; // big D: shape
  mouthGrin: number; // wide toothy grin
  mouthTongue: number; // :P bleh
  mouthLine: number; // flat —
  mouthPout: number; // 3 / kiss
  /* ---- extras ---- */
  blush: number;
  tears: number;
  sweat: number;
  angerMark: number; // 💢
  cheekPuff: number; // puffed cheeks
  whiskerLift: number; // -1 droop .. +1 perk
  earMood: number; // -1 flat back .. +1 perked (blends into ears)
  headTilt: number; // additive radians
  shiver: number; // face jitter amplitude
}

export type ExpressionName =
  | "neutral"
  | "content"
  | "happy"
  | "joy"
  | "laugh"
  | "excited"
  | "surprised"
  | "shocked"
  | "worried"
  | "scared"
  | "terrified"
  | "squint"
  | "love"
  | "heartEyes"
  | "starEyes"
  | "sad"
  | "cry"
  | "sob"
  | "sleepy"
  | "asleep"
  | "smug"
  | "determined"
  | "dizzy"
  | "shy"
  | "angry"
  | "pout"
  | "bleh"
  | "yum"
  | "cold"
  | "confused"
  | "proud"
  | "kiss"
  | "sing"
  | "unimpressed"
  | "wink"
  | "ouch"
  | "relieved"
  | "focus"
  | "wow";

const BASE: ExpressionParams = {
  eyeOpen: 1,
  eyeScale: 1,
  eyeHappy: 0,
  eyeCry: 0,
  eyeHeart: 0,
  eyeStar: 0,
  eyeSpiral: 0,
  eyeShock: 0,
  eyeLid: 0,
  eyeSparkle: 0.6,
  eyeOffsetY: 0,
  eyeSquash: 0,
  winkR: 0,
  browLift: 0,
  browAngle: 0,
  browHeight: 0,
  mouthCat: 1,
  mouthSmile: 0,
  mouthOpen: 0,
  mouthO: 0,
  mouthFrown: 0,
  mouthWobble: 0,
  mouthScream: 0,
  mouthGrin: 0,
  mouthTongue: 0,
  mouthLine: 0,
  mouthPout: 0,
  blush: 0.7,
  tears: 0,
  sweat: 0,
  angerMark: 0,
  cheekPuff: 0,
  whiskerLift: 0,
  earMood: 0,
  headTilt: 0,
  shiver: 0,
};

const ex = (p: Partial<ExpressionParams>): ExpressionParams => ({ ...BASE, mouthCat: 0, ...p });

export const EXPRESSIONS: Record<ExpressionName, ExpressionParams> = {
  neutral: ex({ mouthCat: 1 }),
  content: ex({ mouthCat: 1, blush: 0.8, headTilt: 0.06, whiskerLift: 0.1 }),
  happy: ex({ mouthSmile: 1, blush: 0.9, eyeSparkle: 0.8, whiskerLift: 0.3, earMood: 0.3 }),
  joy: ex({ eyeOpen: 0, eyeHappy: 1, mouthOpen: 1, blush: 1, whiskerLift: 0.6, earMood: 0.5 }),
  laugh: ex({ eyeOpen: 0, eyeHappy: 1, mouthGrin: 1, blush: 1.1, whiskerLift: 0.7, earMood: 0.4, headTilt: -0.08 }),
  excited: ex({ eyeScale: 1.15, eyeSparkle: 1, mouthOpen: 1, blush: 1, whiskerLift: 0.8, earMood: 1 }),
  surprised: ex({ eyeScale: 1.35, eyeSparkle: 0.9, mouthO: 1, blush: 0.5, browLift: 0.6, browAngle: -0.1, browHeight: 0.6, whiskerLift: 0.5, earMood: 1 }),
  shocked: ex({ eyeScale: 1.4, eyeShock: 1, eyeSparkle: 0, mouthScream: 0.7, blush: 0.2, browLift: 1, browHeight: 1, sweat: 0.7, whiskerLift: 0.9, earMood: 1 }),
  worried: ex({ eyeScale: 0.95, browLift: 1, browAngle: 0.45, mouthFrown: 0.6, mouthWobble: 0.4, blush: 0.6, sweat: 0.6, whiskerLift: -0.3, earMood: -0.3 }),
  scared: ex({ eyeScale: 1.3, eyeSparkle: 0.3, browLift: 1, browAngle: 0.6, mouthO: 1, blush: 0.3, sweat: 1, whiskerLift: -0.4, earMood: -0.8 }),
  terrified: ex({ eyeScale: 1.3, eyeShock: 1, browLift: 1, browAngle: 0.7, mouthScream: 1, blush: 0.2, sweat: 1, tears: 0.4, whiskerLift: -0.6, earMood: -1, shiver: 1 }),
  squint: ex({ eyeOpen: 0, eyeCry: 1, mouthFrown: 0.6, blush: 0.8, whiskerLift: -0.2 }),
  love: ex({ eyeOpen: 0, eyeHappy: 1, mouthCat: 1, blush: 1.4, headTilt: 0.14, whiskerLift: 0.4, earMood: 0.2 }),
  heartEyes: ex({ eyeHeart: 1, mouthOpen: 0.8, blush: 1.3, headTilt: 0.1, whiskerLift: 0.8, earMood: 0.8 }),
  starEyes: ex({ eyeStar: 1, mouthOpen: 1, blush: 1, whiskerLift: 1, earMood: 1 }),
  sad: ex({ eyeOffsetY: -0.02, browLift: 1, browAngle: 0.55, mouthFrown: 1, blush: 0.7, tears: 0.35, whiskerLift: -0.6, earMood: -0.6 }),
  cry: ex({ eyeOpen: 0, eyeCry: 1, browLift: 1, browAngle: 0.7, mouthWobble: 1, blush: 1, tears: 1, whiskerLift: -0.7, earMood: -0.7 }),
  sob: ex({ eyeOpen: 0, eyeCry: 1, browLift: 1, browAngle: 0.8, mouthScream: 0.8, blush: 1, tears: 1.4, whiskerLift: -0.8, earMood: -0.9, shiver: 0.6 }),
  sleepy: ex({ eyeOpen: 0.35, eyeLid: 0.55, eyeSparkle: 0, mouthO: 0.5, blush: 0.6, headTilt: 0.18, whiskerLift: -0.3, earMood: -0.2 }),
  asleep: ex({ eyeOpen: 0, eyeSquash: 1, eyeSparkle: 0, mouthCat: 0.6, blush: 0.7, headTilt: 0.22, whiskerLift: -0.4, earMood: -0.4 }),
  smug: ex({ eyeOpen: 0.6, eyeLid: 0.5, mouthSmile: 1, blush: 0.8, headTilt: -0.1, whiskerLift: 0.3, earMood: 0.2 }),
  determined: ex({ eyeOpen: 0.9, browLift: 1, browAngle: -0.35, mouthSmile: 0.7, blush: 0.7, whiskerLift: 0.5, earMood: 0.6 }),
  focus: ex({ eyeOpen: 0.85, eyeScale: 0.95, browLift: 0.8, browAngle: -0.2, mouthLine: 1, blush: 0.6, whiskerLift: 0.2, earMood: 0.8 }),
  dizzy: ex({ eyeSpiral: 1, mouthWobble: 1, blush: 0.6, sweat: 0.8, headTilt: 0.25, whiskerLift: -0.3, earMood: -0.4 }),
  shy: ex({ eyeOpen: 0.7, eyeOffsetY: -0.03, mouthWobble: 0.6, blush: 1.6, headTilt: 0.2, whiskerLift: -0.2, earMood: -0.3 }),
  angry: ex({ eyeOpen: 0.75, eyeLid: 0.3, browLift: 1, browAngle: -0.6, mouthFrown: 1, blush: 0.6, angerMark: 1, whiskerLift: 0.4, earMood: -1 }),
  pout: ex({ eyeOpen: 0.8, eyeOffsetY: -0.02, browLift: 0.6, browAngle: 0.2, mouthPout: 1, cheekPuff: 1, blush: 1, headTilt: -0.12, whiskerLift: -0.4, earMood: -0.5 }),
  bleh: ex({ eyeOpen: 0, eyeSquash: 1, winkR: 1, mouthTongue: 1, blush: 0.9, headTilt: 0.12, whiskerLift: 0.2 }),
  yum: ex({ eyeOpen: 0, eyeHappy: 1, mouthTongue: 1, blush: 1.2, cheekPuff: 0.5, whiskerLift: 0.6, earMood: 0.5 }),
  cold: ex({ eyeOpen: 0.7, eyeScale: 0.9, browLift: 1, browAngle: 0.4, mouthWobble: 1, blush: 1.2, whiskerLift: -0.5, earMood: -0.6, shiver: 1 }),
  confused: ex({ eyeScale: 1.05, browLift: 1, browAngle: 0.15, browHeight: 0.4, winkR: 0.4, mouthLine: 0.6, mouthO: 0.3, blush: 0.6, headTilt: 0.3, whiskerLift: 0.1, earMood: 0.3 }),
  proud: ex({ eyeOpen: 0.4, eyeLid: 0.6, mouthSmile: 1, blush: 0.9, headTilt: -0.08, browLift: 0.5, browAngle: -0.15, whiskerLift: 0.5, earMood: 0.6 }),
  kiss: ex({ eyeOpen: 0, eyeSquash: 1, mouthPout: 1, blush: 1.5, headTilt: 0.18, whiskerLift: 0.4, earMood: 0.3 }),
  sing: ex({ eyeOpen: 0, eyeHappy: 1, mouthO: 1, blush: 1, headTilt: 0.15, whiskerLift: 0.5, earMood: 0.5 }),
  unimpressed: ex({ eyeOpen: 0.6, eyeLid: 0.6, mouthLine: 1, blush: 0.5, whiskerLift: -0.2, earMood: -0.3 }),
  wink: ex({ mouthSmile: 1, winkR: 1, blush: 1, eyeSparkle: 1, headTilt: -0.1, whiskerLift: 0.4, earMood: 0.5 }),
  ouch: ex({ eyeOpen: 0, eyeCry: 1, browLift: 1, browAngle: 0.5, mouthScream: 0.6, blush: 0.9, tears: 0.6, sweat: 0.5, whiskerLift: -0.5, earMood: -0.7 }),
  relieved: ex({ eyeOpen: 0, eyeHappy: 0.7, eyeSquash: 0.4, mouthSmile: 0.8, blush: 0.8, sweat: 0.7, headTilt: 0.1, whiskerLift: 0.1, earMood: -0.1 }),
  wow: ex({ eyeScale: 1.25, eyeSparkle: 1.2, mouthO: 1, blush: 0.9, browLift: 0.5, browHeight: 0.6, whiskerLift: 0.9, earMood: 1 }),
};

export const EXPRESSION_KEYS = Object.keys(BASE) as (keyof ExpressionParams)[];
export const EXPRESSION_NAMES = Object.keys(EXPRESSIONS) as ExpressionName[];
