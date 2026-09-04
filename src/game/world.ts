import { Spring, rand, clamp } from "../character/springs";
import { createDriver, type CatDriver } from "../character/Cat";

export const C = {
  halfW: 4.6,
  gravity: 34,
  jumpV: 15,
  pillowV: 27,
  springV: 21,
  iceV: 12.5,
  hurtV: 9,
  rocketV: 26,
  rocketTime: 2.0,
  balloonV: 5.5,
  balloonTime: 3.6,
  shieldTime: 14,
  magnetTime: 8,
  moveAccel: 75,
  maxVx: 8.5,
  drag: 7,
  catScale: 0.56,
  catHalfW: 0.46,
  platformH: 0.36,
  platformD: 1.1,
  fov: 42,
};

export type PlatformType = "ground" | "normal" | "moving" | "cloud" | "pillow" | "spring" | "ice" | "crumble";
export type ItemKind = "heart" | "fish" | "star" | "rocket" | "balloon" | "shield" | "magnet";
export type CompanionMood = "sit" | "sleep" | "wave" | "read";

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
  fade: number; // cloud dissolve / crumble fall 0→1
  crumbleTimer: number; // >0 = shaking, counts down to break
  spiky: number; // 0 = none, -1/1 = side of the cactus
  companion: boolean;
  companionMood: CompanionMood;
  hugged: boolean;
  companionDriver: CatDriver | null;
  companionSide: number;
  cheerTimer: number;
  wobble: Spring;
  landedCount: number;
}

export interface ItemData {
  id: number;
  kind: ItemKind;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  taken: boolean;
  takenT: number;
  magnetPull: number;
}

export interface EnemyData {
  id: number;
  x: number;
  y: number;
  baseX: number;
  range: number;
  speed: number;
  phase: number;
  alive: boolean;
  popT: number;
  angry: number; // 0..1 rises when player is near
}

export interface World {
  platforms: PlatformData[];
  items: ItemData[];
  enemies: EnemyData[];
  nextId: number;
  topY: number;
  lastCompanionY: number;
  lastPillowY: number;
  lastPowerY: number;
  lastEnemyY: number;
  version: number;
}

export const createWorld = (): World => ({ platforms: [], items: [], enemies: [], nextId: 1, topY: 0, lastCompanionY: -40, lastPillowY: -20, lastPowerY: -10, lastEnemyY: 0, version: 0 });

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
    crumbleTimer: 0,
    spiky: 0,
    companion: false,
    companionMood: "sit",
    hugged: false,
    companionDriver: null,
    companionSide: Math.random() < 0.5 ? -1 : 1,
    cheerTimer: 0,
    wobble: new Spring(1, 320, 12),
    landedCount: 0,
  };
}

function makeItem(w: World, kind: ItemKind, x: number, y: number): ItemData {
  return { id: w.nextId++, kind, x, y, baseX: x, baseY: y, phase: rand(0, 10), taken: false, takenT: 0, magnetPull: 0 };
}

function makeEnemy(w: World, x: number, y: number): EnemyData {
  const range = rand(1.4, 2.6);
  return { id: w.nextId++, x, y, baseX: clamp(x, -C.halfW + range + 0.4, C.halfW - range - 0.4), range, speed: rand(0.6, 1.3), phase: rand(0, Math.PI * 2), alive: true, popT: 0, angry: 0 };
}

export function initWorld(w: World) {
  w.platforms.length = 0;
  w.items.length = 0;
  w.enemies.length = 0;
  w.nextId = 1;
  w.topY = 0;
  w.lastCompanionY = -40;
  w.lastPillowY = -20;
  w.lastPowerY = -10;
  w.lastEnemyY = 0;
  const ground = makePlatform(w, "ground", 0, 0, C.halfW * 2 + 2);
  w.platforms.push(ground);
  let y = 1.6;
  for (let i = 0; i < 6; i++) {
    const p = makePlatform(w, "normal", rand(-3, 3), y, 2.1);
    w.platforms.push(p);
    if (i === 2) w.items.push(makeItem(w, "heart", p.x, y + 1.15));
    y += rand(1.2, 1.7);
  }
  w.topY = y;
  w.version++;
}

/** Generate platforms/items/enemies up to a given altitude, following a difficulty curve. */
export function spawnUpTo(w: World, limitY: number) {
  let added = false;
  while (w.topY < limitY) {
    const alt = w.topY;
    const diff = clamp(alt / 240, 0, 1);
    const gap = rand(0.9 + diff * 0.5, 1.6 + diff * 1.25);
    const y = w.topY + gap;
    const width = 2.1 - diff * 0.55;

    let type: PlatformType = "normal";
    const roll = Math.random();
    const pPillow = y - w.lastPillowY > 14 ? 0.07 : 0;
    const pSpring = alt > 10 ? 0.05 + diff * 0.04 : 0;
    const pMoving = 0.05 + diff * 0.28;
    const pCloud = alt > 20 ? 0.04 + diff * 0.2 : 0;
    const pIce = alt > 60 ? 0.03 + diff * 0.12 : 0;
    const pCrumble = alt > 35 ? 0.04 + diff * 0.14 : 0;
    let acc = 0;
    if (roll < (acc += pPillow)) {
      type = "pillow";
      w.lastPillowY = y;
    } else if (roll < (acc += pSpring)) type = "spring";
    else if (roll < (acc += pMoving)) type = "moving";
    else if (roll < (acc += pCloud)) type = "cloud";
    else if (roll < (acc += pIce)) type = "ice";
    else if (roll < (acc += pCrumble)) type = "crumble";

    const x = rand(-C.halfW + width / 2 + 0.2, C.halfW - width / 2 - 0.2);
    const p = makePlatform(w, type, x, y, width);

    // helper platform when the gap is scary
    if (gap > 2.4 && Math.random() < 0.55) {
      const hx = x > 0 ? rand(-C.halfW + 1.2, -0.5) : rand(0.5, C.halfW - 1.2);
      w.platforms.push(makePlatform(w, Math.random() < 0.5 ? "cloud" : "normal", hx, y - rand(0.4, 1.0), width * 0.85));
    }

    // cactus hazard on wide normal platforms
    if (type === "normal" && alt > 45 && Math.random() < 0.08 + diff * 0.1) {
      p.w = Math.max(p.w, 2.4);
      p.spiky = Math.random() < 0.5 ? -1 : 1;
    }

    // collectibles
    if ((type === "normal" || type === "moving" || type === "ice") && !p.spiky) {
      const r = Math.random();
      if (r < 0.15) w.items.push(makeItem(w, "heart", x, y + 1.15));
      else if (r < 0.2) w.items.push(makeItem(w, "fish", x + rand(-0.4, 0.4), y + 1.2));
      else if (r < 0.225 && alt > 30) w.items.push(makeItem(w, "star", x, y + 1.4));
    }
    // power-ups (spaced out)
    if (y - w.lastPowerY > rand(22, 40) && alt > 15) {
      const kinds: ItemKind[] = alt > 80 ? ["rocket", "balloon", "shield", "magnet"] : ["balloon", "shield", "magnet", "rocket"];
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      w.items.push(makeItem(w, kind, x, y + 1.3));
      w.lastPowerY = y;
    }
    // grumpy storm clouds
    if (alt > 55 && y - w.lastEnemyY > rand(16, 30) - diff * 8) {
      const ex = x > 0 ? rand(-C.halfW + 1.5, -1) : rand(1, C.halfW - 1.5);
      w.enemies.push(makeEnemy(w, ex, y + rand(2.2, 3.4)));
      w.lastEnemyY = y;
    }
    // companion cats waiting for a hug
    if (type === "normal" && !p.spiky && y - w.lastCompanionY > rand(38, 60) && alt > 12) {
      p.companion = true;
      p.w = Math.max(p.w, 2.3);
      const moods: CompanionMood[] = ["sit", "sleep", "wave", "read"];
      p.companionMood = moods[Math.floor(Math.random() * moods.length)];
      p.companionDriver = createDriver({ state: p.companionMood === "sleep" ? "sleep" : "sit", expression: p.companionMood === "sleep" ? "asleep" : "content", fidgets: false });
      if (p.companionMood === "sleep") p.companionDriver.emote = "zzz";
      w.lastCompanionY = y;
    }
    w.platforms.push(p);
    w.topY = y;
    added = true;
  }
  return added;
}

export function cullBelow(w: World, y: number) {
  let changed = false;
  for (let i = w.platforms.length - 1; i >= 0; i--) if (w.platforms[i].y < y) (w.platforms.splice(i, 1), (changed = true));
  for (let i = w.items.length - 1; i >= 0; i--) if (w.items[i].y < y || (w.items[i].taken && w.items[i].takenT > 1)) (w.items.splice(i, 1), (changed = true));
  for (let i = w.enemies.length - 1; i >= 0; i--) if (w.enemies[i].y < y || (!w.enemies[i].alive && w.enemies[i].popT > 1.2)) (w.enemies.splice(i, 1), (changed = true));
  return changed;
}

export const ITEM_INFO: Record<ItemKind, { label: string; color: string; points: number }> = {
  heart: { label: "♥ +50", color: "#FF8FAF", points: 50 },
  fish: { label: "YUM! +80", color: "#7FB8FF", points: 80 },
  star: { label: "★ +200", color: "#FFD35C", points: 200 },
  rocket: { label: "ROCKET!", color: "#FF6B7A", points: 100 },
  balloon: { label: "BALLOON~", color: "#FF8FAF", points: 60 },
  shield: { label: "SHIELD!", color: "#9FD8FF", points: 60 },
  magnet: { label: "MAGNET!", color: "#E9455D", points: 60 },
};
