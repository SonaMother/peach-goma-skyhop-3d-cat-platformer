import { Spring, rand, clamp } from "../character/springs";
import { createDriver, type CatDriver } from "../character/Cat";

export const C = {
  halfW: 4.6,
  gravity: 34,
  jumpV: 15,
  pillowV: 27,
  moveAccel: 75,
  maxVx: 8.5,
  drag: 7,
  catScale: 0.56,
  catHalfW: 0.46,
  platformH: 0.36,
  platformD: 1.1,
  fov: 42,
};

export type PlatformType = "ground" | "normal" | "moving" | "cloud" | "pillow";

export interface PlatformData {
  id: number;
  type: PlatformType;
  x: number;
  y: number;
  w: number;
  baseX: number;
  speed: number;
  phase: number;
  range: number;
  alive: boolean;
  fade: number; // cloud dissolve 0→1
  heart: boolean;
  heartTaken: boolean;
  heartPhase: number;
  companion: boolean;
  hugged: boolean;
  companionDriver: CatDriver | null;
  companionSide: number;
  cheerTimer: number;
  wobble: Spring;
}

export interface World {
  platforms: PlatformData[];
  nextId: number;
  topY: number;
  lastCompanionY: number;
  lastPillowY: number;
  version: number;
}

export const createWorld = (): World => ({ platforms: [], nextId: 1, topY: 0, lastCompanionY: -40, lastPillowY: -20, version: 0 });

function makePlatform(w: World, type: PlatformType, x: number, y: number, width: number): PlatformData {
  return {
    id: w.nextId++,
    type,
    x,
    y,
    w: width,
    baseX: x,
    speed: type === "moving" ? rand(1.2, 2.4) * (Math.random() < 0.5 ? -1 : 1) : 0,
    phase: rand(0, Math.PI * 2),
    range: type === "moving" ? rand(1.2, C.halfW - width / 2 - 0.3) : 0,
    alive: true,
    fade: 0,
    heart: false,
    heartTaken: false,
    heartPhase: rand(0, 10),
    companion: false,
    hugged: false,
    companionDriver: null,
    companionSide: Math.random() < 0.5 ? -1 : 1,
    cheerTimer: 0,
    wobble: new Spring(1, 320, 12),
  };
}

export function initWorld(w: World) {
  w.platforms.length = 0;
  w.nextId = 1;
  w.topY = 0;
  w.lastCompanionY = -40;
  w.lastPillowY = -20;
  const ground = makePlatform(w, "ground", 0, 0, C.halfW * 2 + 2);
  w.platforms.push(ground);
  // gentle intro platforms
  let y = 1.6;
  for (let i = 0; i < 6; i++) {
    w.platforms.push(makePlatform(w, "normal", rand(-3, 3), y, 2.1));
    y += rand(1.2, 1.7);
  }
  w.topY = y;
  w.version++;
}

/** Generate platforms up to a given altitude, following a difficulty curve. */
export function spawnUpTo(w: World, limitY: number) {
  let added = false;
  while (w.topY < limitY) {
    const alt = w.topY;
    const diff = clamp(alt / 220, 0, 1); // 0..1 over the first ~220 units
    const gap = rand(0.9 + diff * 0.5, 1.6 + diff * 1.25);
    const y = w.topY + gap;
    const width = 2.1 - diff * 0.55;

    let type: PlatformType = "normal";
    const roll = Math.random();
    const pMoving = 0.05 + diff * 0.3;
    const pCloud = alt > 20 ? 0.04 + diff * 0.22 : 0;
    const pPillow = y - w.lastPillowY > 14 ? 0.08 : 0;
    if (roll < pPillow) {
      type = "pillow";
      w.lastPillowY = y;
    } else if (roll < pPillow + pMoving) type = "moving";
    else if (roll < pPillow + pMoving + pCloud) type = "cloud";

    const x = rand(-C.halfW + width / 2 + 0.2, C.halfW - width / 2 - 0.2);
    const p = makePlatform(w, type, x, y, width);

    // sometimes a second helper platform on the same level when the gap is scary
    if (gap > 2.4 && Math.random() < 0.5) {
      const hx = x > 0 ? rand(-C.halfW + 1.2, -0.5) : rand(0.5, C.halfW - 1.2);
      w.platforms.push(makePlatform(w, Math.random() < 0.5 ? "cloud" : "normal", hx, y - rand(0.4, 1.0), width * 0.85));
    }

    if (type === "normal" || type === "moving") {
      if (Math.random() < 0.16) p.heart = true;
    }
    if (type === "normal" && y - w.lastCompanionY > rand(38, 60) && alt > 12) {
      p.companion = true;
      p.w = Math.max(p.w, 2.3);
      p.companionDriver = createDriver({ state: "sit", expression: "content" });
      w.lastCompanionY = y;
    }
    w.platforms.push(p);
    w.topY = y;
    added = true;
  }
  return added;
}

export function cullBelow(w: World, y: number) {
  const before = w.platforms.length;
  for (let i = w.platforms.length - 1; i >= 0; i--) {
    if (w.platforms[i].y < y) w.platforms.splice(i, 1);
  }
  return w.platforms.length !== before;
}
