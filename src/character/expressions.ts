/**
 * EXPRESSION SYSTEM
 * -----------------
 * Every facial feature is driven by a continuous parameter in [0..1] (or radians).
 * An "expression" is just a preset of these parameters. The rig smoothly blends
 * between presets every frame, so any two expressions cross-fade naturally.
 *
 * To add a new expression: add an entry to EXPRESSIONS. That's it.
 */
export interface ExpressionParams {
  eyeOpen: number; // 0 = closed line, 1 = fully open dot
  eyeScale: number; // 1 = normal, >1 = wide/surprised, <1 = tiny
  eyeHappy: number; // 0..1  ^ ^ arcs
  eyeCry: number; // 0..1  > <  squeezed
  eyeSparkle: number; // 0..1 highlight size
  eyeOffsetY: number; // vertical eye shift (look up / down)
  browLift: number; // 0..1 brow visibility
  browAngle: number; // radians, + = worried (inner ends up), - = angry
  mouthCat: number; // ω
  mouthSmile: number; // ◡
  mouthOpen: number; // open happy mouth with tongue
  mouthO: number; // small o
  mouthFrown: number; // ︿
  mouthWobble: number; // ~ (about to cry)
  blush: number; // 0..1
  tears: number; // 0..1
  sweat: number; // 0..1
  headTilt: number; // additive head tilt (radians)
}

export type ExpressionName =
  | "neutral"
  | "content"
  | "happy"
  | "joy"
  | "excited"
  | "surprised"
  | "worried"
  | "scared"
  | "squint"
  | "love"
  | "sad"
  | "cry"
  | "sleepy"
  | "smug"
  | "determined"
  | "dizzy"
  | "shy";

const BASE: ExpressionParams = {
  eyeOpen: 1,
  eyeScale: 1,
  eyeHappy: 0,
  eyeCry: 0,
  eyeSparkle: 0.6,
  eyeOffsetY: 0,
  browLift: 0,
  browAngle: 0,
  mouthCat: 1,
  mouthSmile: 0,
  mouthOpen: 0,
  mouthO: 0,
  mouthFrown: 0,
  mouthWobble: 0,
  blush: 0.7,
  tears: 0,
  sweat: 0,
  headTilt: 0,
};

const ex = (p: Partial<ExpressionParams>): ExpressionParams => ({ ...BASE, ...p });

export const EXPRESSIONS: Record<ExpressionName, ExpressionParams> = {
  neutral: ex({}),
  content: ex({ mouthCat: 1, blush: 0.8, headTilt: 0.06 }),
  happy: ex({ mouthCat: 0, mouthSmile: 1, blush: 0.9, eyeSparkle: 0.8 }),
  joy: ex({ eyeOpen: 0, eyeHappy: 1, mouthCat: 0, mouthOpen: 1, blush: 1 }),
  excited: ex({ eyeScale: 1.15, eyeSparkle: 1, mouthCat: 0, mouthOpen: 1, blush: 1 }),
  surprised: ex({ eyeScale: 1.35, eyeSparkle: 0.9, mouthCat: 0, mouthO: 1, blush: 0.5, browLift: 0.6, browAngle: -0.1 }),
  worried: ex({ eyeScale: 0.95, browLift: 1, browAngle: 0.45, mouthCat: 0, mouthFrown: 0.6, mouthWobble: 0.4, blush: 0.6, sweat: 0.6 }),
  scared: ex({ eyeScale: 1.3, eyeSparkle: 0.3, browLift: 1, browAngle: 0.6, mouthCat: 0, mouthO: 1, blush: 0.3, sweat: 1 }),
  squint: ex({ eyeOpen: 0, eyeCry: 1, mouthCat: 0, mouthFrown: 0.6, blush: 0.8 }),
  love: ex({ eyeOpen: 0, eyeHappy: 1, mouthCat: 1, blush: 1.4, headTilt: 0.14 }),
  sad: ex({ eyeOffsetY: -0.02, browLift: 1, browAngle: 0.55, mouthCat: 0, mouthFrown: 1, blush: 0.7, tears: 0.35 }),
  cry: ex({ eyeOpen: 0, eyeCry: 1, browLift: 1, browAngle: 0.7, mouthCat: 0, mouthWobble: 1, blush: 1, tears: 1 }),
  sleepy: ex({ eyeOpen: 0.15, eyeSparkle: 0, mouthCat: 0, mouthO: 0.5, blush: 0.6, headTilt: 0.18 }),
  smug: ex({ eyeOpen: 0.55, mouthCat: 0, mouthSmile: 1, blush: 0.8, headTilt: -0.1 }),
  determined: ex({ eyeOpen: 0.85, browLift: 1, browAngle: -0.35, mouthCat: 0, mouthSmile: 0.7, blush: 0.7 }),
  dizzy: ex({ eyeOpen: 0.3, eyeScale: 0.9, mouthCat: 0, mouthWobble: 1, blush: 0.6, sweat: 0.8, headTilt: 0.25 }),
  shy: ex({ eyeOpen: 0.7, eyeOffsetY: -0.03, mouthCat: 0, mouthWobble: 0.6, blush: 1.5, headTilt: 0.2 }),
};

export const EXPRESSION_KEYS = Object.keys(BASE) as (keyof ExpressionParams)[];
