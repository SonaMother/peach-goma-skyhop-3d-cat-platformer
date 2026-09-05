import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Cat, createDriver, type Accessory } from "../character/Cat";
import { PALETTES, otherCat } from "../character/palettes";
import { clamp, damp, rand } from "../character/springs";
import { bubble, flat } from "../character/materials";
import { useGame } from "../game/store";
import { C, createWorld, cullBelow, initWorld, spawnUpTo, ITEM_INFO, type PlatformData } from "../game/world";
import type { InputState } from "../game/useInput";
import { sfx } from "../game/sfx";
import { Platform } from "../world/Platform";
import { Backdrop } from "../world/Backdrop";
import { Grump, Item } from "../world/Items";
import { celebrate, fx } from "../world/Particles";

const topOffset = (p: PlatformData) => (p.type === "pillow" ? 0.2 : p.type === "cloud" ? 0.28 : p.type === "ground" ? 0.2 : p.type === "spring" ? 0.15 : 0.02);
const SHIELD_GEO = new THREE.SphereGeometry(1.05, 32, 20);

export function CameraRig({ camY, camX, lookDown = 0, zoom = 1, shake }: { camY: MutableRefObject<number>; camX: MutableRefObject<number>; lookDown?: number; zoom?: number; shake?: MutableRefObject<number> }) {
  const { camera, size } = useThree();
  useFrame(({ clock }) => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(C.fov / 2));
    const dist = clamp((C.halfW * 1.08) / (halfTan * aspect), 8, 40) / zoom;
    // impact shake: fast decaying noise, never random jitter (reads as weight, not glitch)
    const sh = shake?.current ?? 0;
    const tt = clock.elapsedTime;
    const sx = sh * 0.22 * Math.sin(tt * 61) + sh * 0.1 * Math.sin(tt * 97 + 1.3);
    const sy = sh * 0.18 * Math.sin(tt * 53 + 0.7) + sh * 0.08 * Math.sin(tt * 89);
    cam.position.set(camX.current * 0.1 + sx, camY.current + lookDown + sy, dist);
    cam.lookAt(camX.current * 0.1 + sx * 0.5, camY.current + sy * 0.5, 0);
    cam.rotation.z += sh * 0.012 * Math.sin(tt * 47);
  });
  return null;
}

interface CompanionMem {
  woke: boolean;
  wakeT: number;
}

export function GameScene({ input }: { input: MutableRefObject<InputState> }) {
  const character = useGame((s) => s.character);
  const runId = useGame((s) => s.runId);
  const palette = PALETTES[character];
  const companionId = otherCat(character);

  const driver = useRef(createDriver({ state: "idle", fidgets: false }));
  const world = useMemo(() => createWorld(), []);
  const [, setVersion] = useState(0);
  const camY = useRef(4);
  const camX = useRef(0);
  const catRef = useRef<THREE.Group | null>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const shadowMat = useMemo(() => flat("#3B3231", { opacity: 0.16, depthWrite: false }), []);
  const shieldMat = useMemo(() => bubble("#9FD8FF", 0.3), []);
  const compMem = useMemo(() => new Map<number, CompanionMem>(), []);
  const shakeRef = useRef(0);

  const P = useMemo(
    () => ({
      x: 0,
      y: 0.2,
      vx: 0,
      vy: 0,
      maxY: 0,
      hearts: 0,
      hugs: 0,
      stars: 0,
      fish: 0,
      bonus: 0,
      combo: 0,
      bestCombo: 0,
      landTimer: 0,
      superTimer: 0,
      springTimer: 0,
      slipTimer: 0,
      stunTimer: 0,
      hurtTimer: 0,
      fishTimer: 0,
      power: null as null | "rocket" | "balloon" | "magnet",
      powerT: 0,
      powerTotal: 1,
      shield: false,
      shieldT: 0,
      dead: false,
      deadTimer: 0,
      lastScore: -1,
      nextMilestone: 100,
      recordShown: false,
      wrapCd: 0,
      nearMissCd: 0,
      shieldWarned: false,
      t: 0,
      hitStop: 0,
      shake: 0,
      groundDist: 99,
      prevState: "idle" as string,
    }),
    [],
  );

  // (re)initialise on new run
  useEffect(() => {
    initWorld(world);
    spawnUpTo(world, 30);
    compMem.clear();
    Object.assign(P, {
      x: 0, y: 0.2, vx: 0, vy: C.jumpV, maxY: 0, hearts: 0, hugs: 0, stars: 0, fish: 0, bonus: 0, combo: 0, bestCombo: 0,
      landTimer: 0, superTimer: 0, springTimer: 0, slipTimer: 0, stunTimer: 0, hurtTimer: 0, fishTimer: 0,
      power: null, powerT: 0, powerTotal: 1, shield: false, shieldT: 0, dead: false, deadTimer: 0, lastScore: -1,
      nextMilestone: 100, recordShown: false, wrapCd: 0, nearMissCd: 0, shieldWarned: false, t: 0,
      hitStop: 0, shake: 0, groundDist: 99, prevState: "idle",
    });
    camY.current = 5;
    driver.current = createDriver({ state: "rise", fidgets: false });
    driver.current.events.push("jump");
    setVersion((v) => v + 1);
  }, [runId, world, P, compMem]);

  useFrame(({ size }, rawDt) => {
    let dt = Math.min(rawDt, 1 / 30);
    const d = driver.current;
    const store = useGame.getState();
    if (store.phase !== "playing" || store.paused) return;
    // hit-stop: a few frames of slow-motion on big impacts sells weight
    if (P.hitStop > 0) {
      P.hitStop -= rawDt;
      dt *= 0.22;
    }
    P.shake = Math.max(0, P.shake - rawDt * 3.2);
    shakeRef.current = P.shake * P.shake;
    P.t += dt;
    const aspect = size.width / size.height;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(C.fov / 2));
    const dist = clamp((C.halfW * 1.08) / (halfTan * aspect), 8, 40);
    const H = dist * halfTan;

    const controllable = !P.dead && P.stunTimer <= 0;
    const rocket = P.power === "rocket";
    const balloon = P.power === "balloon";

    /* ---------- horizontal control ---------- */
    const axis = controllable ? input.current.axis : 0;
    const accel = balloon ? C.moveAccel * 0.6 : C.moveAccel;
    if (axis !== 0) P.vx += axis * accel * dt;
    else P.vx *= Math.exp(-(P.slipTimer > 0 ? 1.2 : C.drag) * dt);
    P.vx = clamp(P.vx, -C.maxVx, C.maxVx);
    P.x += P.vx * dt;
    P.wrapCd -= dt;
    if (P.x > C.halfW + 0.6 || P.x < -C.halfW - 0.6) {
      P.x = P.x > 0 ? -C.halfW - 0.6 : C.halfW + 0.6;
      if (P.wrapCd <= 0) {
        P.wrapCd = 0.5;
        d.events.push("wrap");
        sfx.wrap();
      }
    }

    /* ---------- vertical physics ---------- */
    const prevY = P.y;
    if (rocket) {
      P.vy = damp(P.vy, C.rocketV, 6, dt);
      if (Math.random() < 0.9) fx.burst("flame", P.x + rand(-0.08, 0.08), P.y + 0.25, -0.35, 1, 0.6);
      if (Math.random() < 0.15) fx.burst("sparkle", P.x, P.y + 0.2, -0.3, 1, 0.5);
    } else if (balloon) {
      P.vy = damp(P.vy, C.balloonV + Math.sin(P.t * 2) * 0.6, 3, dt);
    } else {
      // softer gravity around the apex = readable hang-time (classic platformer feel)
      const hang = Math.abs(P.vy) < 3.5 ? 0.78 : 1;
      P.vy -= C.gravity * hang * dt;
    }
    P.y += P.vy * dt;
    // speed streaks past the camera when climbing very fast
    if (P.vy > 18 && Math.random() < (P.vy - 16) * 0.06) fx.burst("streak", camX.current + rand(-C.halfW, C.halfW), camY.current + H + 1, rand(-3, 1.5), 1, 1);

    let landed: PlatformData | null = null;
    if (P.vy < 0 && !P.dead && !rocket) {
      for (const p of world.platforms) {
        if (!p.alive) continue;
        const top = p.y + topOffset(p);
        const dx = Math.abs(P.x - p.x);
        if (prevY >= top - 0.02 && P.y <= top) {
          if (dx < p.w / 2 + C.catHalfW * 0.8) {
            landed = p;
            P.y = top;
            break;
          } else if (P.vy < -6 && dx < p.w / 2 + 1.1 && P.nearMissCd <= 0) {
            P.nearMissCd = 1.5;
            d.events.push("nearMiss");
          }
        }
      }
    }
    P.nearMissCd -= dt;

    if (landed) {
      const p = landed;
      p.landedCount++;
      const center = Math.abs(P.x - p.x);
      const impact = Math.max(0, -P.vy);
      const onCactus = p.spiky !== 0 && (P.x - p.x) * p.spiky > p.w / 2 - 0.95;
      if (onCactus) {
        if (P.shield) {
          P.shield = false;
          d.events.push("shieldPop");
          fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 14);
          sfx.pop();
          P.vy = C.jumpV;
          store.pushToast("SHIELD BROKE!", "#9FD8FF");
        } else {
          P.vy = C.hurtV;
          P.hurtTimer = 0.7;
          P.combo = 0;
          P.hitStop = 0.08;
          P.shake = 0.9;
          d.events.push("hurt");
          fx.burst("stars", P.x, P.y + 0.8, 0.4, 4);
          sfx.hurt();
          store.flashHurt();
          store.pushToast("OUCH!", "#E9455D");
        }
        p.wobble.impulse(-4);
      } else if (p.type === "pillow") {
        P.vy = C.pillowV;
        P.superTimer = 0.7;
        P.hitStop = 0.05;
        P.shake = 0.5;
        p.wobble.impulse(-9);
        d.events.push("superJump");
        fx.burst("stars", P.x, P.y + 0.3, 0.4);
        sfx.pillow();
        store.pushToast("BOING!", "#7FB8FF");
      } else if (p.type === "spring") {
        P.vy = C.springV;
        P.springTimer = 0.62;
        P.shake = 0.4;
        p.wobble.impulse(-12);
        d.events.push("spring");
        fx.burst("sparkle", P.x, P.y + 0.3, 0.4, 8);
        sfx.spring();
        store.pushToast("FLIP!", "#F28CA0");
      } else if (p.type === "ice") {
        P.vy = C.iceV;
        P.slipTimer = 0.45;
        P.vx += (Math.random() < 0.5 ? -1 : 1) * rand(3, 5);
        P.combo = 0;
        p.wobble.impulse(-2);
        d.events.push("slip");
        fx.burst("shards", P.x, P.y + 0.1, 0.4, 8);
        sfx.ice();
        store.pushToast("SLIPPERY!", "#7FD0F0");
      } else {
        P.vy = C.jumpV;
        P.landTimer = 0.09;
        if (p.type === "moving") P.vx += p.vxNow * 0.7; // carry the platform's momentum into the hop
        p.wobble.impulse(p.type === "cloud" ? -2 : -(2.5 + Math.min(6, impact * 0.22)));
        d.events.push("land", "jump");
        fx.burst("dust", P.x, P.y + 0.05, 0.5, Math.round(3 + Math.min(8, impact * 0.3)), 0.8 + Math.min(1, impact * 0.04));
        if (impact > 17) P.shake = Math.min(0.5, (impact - 17) * 0.05);
        if (p.type === "cloud") {
          p.alive = false;
          fx.burst("puff", p.x, p.y, 0.3);
          sfx.cloud();
        } else if (p.type === "crumble") {
          if (p.crumbleTimer <= 0) p.crumbleTimer = 0.5;
          fx.burst("smoke", P.x, P.y, 0.3, 4);
          sfx.crack();
        } else sfx.jump();
        // perfect landing combo
        if (p.type !== "ground" && center < p.w * 0.17) {
          P.combo++;
          P.bestCombo = Math.max(P.bestCombo, P.combo);
          if (P.combo >= 2) {
            P.bonus += P.combo * 10;
            if (P.combo >= 3) P.hitStop = 0.045;
            d.events.push("perfect");
            sfx.perfect(P.combo);
            store.pushToast(`PERFECT x${P.combo}`, "#FFD35C");
            fx.burst("sparkle", P.x, P.y + 0.2, 0.4, Math.min(12, 3 + P.combo));
          }
        } else if (p.type !== "ground") P.combo = 0;
      }
      // companion hug
      if (p.companion && !p.hugged && p.companionDriver) {
        p.hugged = true;
        P.hugs++;
        p.companionDriver.state = "hug";
        p.companionDriver.expression = "love";
        p.companionDriver.emote = null;
        p.companionDriver.accessory = "none";
        p.companionDriver.events.push("hugged");
        p.cheerTimer = 2.5;
        d.events.push("hugged");
        fx.burst("hearts", P.x, P.y + 1.2, 0.6, 12);
        celebrate(p.x, p.y + 1.5, 0.4);
        sfx.hug();
        store.pushToast("HUG! +300", "#FF6F91");
      }
    }

    /* ---------- crumble timers ---------- */
    for (const p of world.platforms) {
      if (p.type === "crumble" && p.crumbleTimer > 0) {
        p.crumbleTimer -= dt;
        if (p.crumbleTimer <= 0) {
          p.alive = false;
          fx.burst("smoke", p.x, p.y, 0.3, 8);
          sfx.crumble();
        }
      }
    }

    /* ---------- items ---------- */
    const catCy = P.y + 0.6;
    for (const it of world.items) {
      if (it.taken) continue;
      const collectible = it.kind === "heart" || it.kind === "fish" || it.kind === "star";
      if (P.power === "magnet" && collectible) {
        const ddx = P.x - it.x;
        const ddy = catCy - it.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < 4.5) {
          const k = Math.min(1, dt * (14 / Math.max(0.6, dist)));
          it.x += ddx * k;
          it.y += ddy * k;
        }
      }
      if (Math.abs(P.x - it.x) < 0.8 && Math.abs(catCy - it.y) < 0.9) {
        it.taken = true;
        it.takenT = 0;
        const info = ITEM_INFO[it.kind];
        switch (it.kind) {
          case "heart":
            P.hearts++;
            d.events.push("collect");
            fx.burst("hearts", it.x, it.y, 0.4, 7);
            fx.burst("sparkle", it.x, it.y, 0.4, 6);
            sfx.heart();
            break;
          case "fish":
            P.fish++;
            P.fishTimer = 1.0;
            d.events.push("yum");
            fx.burst("hearts", it.x, it.y, 0.4, 4);
            sfx.fish();
            break;
          case "star":
            P.stars++;
            d.events.push("star");
            celebrate(it.x, it.y, 0.4);
            sfx.star();
            break;
          case "rocket":
            P.power = "rocket";
            P.powerT = P.powerTotal = C.rocketTime;
            P.vy = Math.max(P.vy, 8);
            d.events.push("rocketOn");
            fx.burst("flame", P.x, P.y, 0.2, 10, 1.5);
            sfx.rocket();
            break;
          case "balloon":
            P.power = "balloon";
            P.powerT = P.powerTotal = C.balloonTime;
            P.vy = Math.max(P.vy, 4);
            d.events.push("balloonOn");
            fx.burst("hearts", P.x, P.y + 1, 0.4, 5);
            sfx.balloon();
            break;
          case "shield":
            P.shield = true;
            P.shieldT = C.shieldTime;
            P.shieldWarned = false;
            d.events.push("shieldOn");
            fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 12);
            sfx.shield();
            break;
          case "magnet":
            P.power = "magnet";
            P.powerT = P.powerTotal = C.magnetTime;
            d.events.push("magnet");
            fx.burst("zap", P.x, P.y + 0.6, 0.4, 8);
            sfx.magnet();
            break;
        }
        P.bonus += info.points;
        store.pushToast(info.label, info.color);
      }
    }

    /* ---------- power timers ---------- */
    if (P.power) {
      P.powerT -= dt;
      if (P.powerT <= 0) {
        if (P.power === "balloon") {
          d.events.push("balloonPop");
          fx.burst("confetti", P.x + 0.4, P.y + 2.2, 0.4, 8);
          sfx.pop();
        } else if (P.power === "rocket") {
          P.vy = Math.min(P.vy, C.jumpV * 0.9);
          fx.burst("smoke", P.x, P.y, 0.2, 6);
        }
        P.power = null;
      }
    }
    store.setPower(P.power, P.power ? P.powerT / P.powerTotal : 0);
    if (P.shield) {
      P.shieldT -= dt;
      if (P.shieldT < 2.5 && !P.shieldWarned) {
        P.shieldWarned = true;
        sfx.tick();
      }
      if (P.shieldT <= 0) {
        P.shield = false;
        fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 8);
        sfx.pop();
      }
    }
    store.setShield(P.shield);
    P.fishTimer -= dt;

    /* ---------- enemies ---------- */
    for (const e of world.enemies) {
      if (!e.alive) continue;
      const ddx = P.x - e.x;
      const ddy = catCy - e.y;
      const dist = Math.hypot(ddx, ddy);
      e.angry = damp(e.angry, dist < 3.2 ? 1 : 0, 4, dt);
      if (Math.abs(ddx) < 0.95 && Math.abs(ddy) < 0.8) {
        if (rocket || P.shield) {
          e.alive = false;
          e.popT = 0;
          fx.burst("zap", e.x, e.y, 0.4, 10);
          fx.burst("smoke", e.x, e.y, 0.4, 8);
          sfx.pop();
          P.bonus += 150;
          if (!rocket) {
            P.shield = false;
            d.events.push("shieldPop");
            fx.burst("bubbles", P.x, P.y + 0.6, 0.4, 12);
            store.pushToast("POOF! +150", "#9FD8FF");
          } else store.pushToast("ZAP! +150", "#FFE45C");
        } else if (P.stunTimer <= 0) {
          P.stunTimer = 0.95;
          P.combo = 0;
          P.hitStop = 0.1;
          P.shake = 1;
          P.vy = Math.min(P.vy, -2);
          P.vx = (ddx >= 0 ? 1 : -1) * 6;
          d.events.push("stun");
          fx.burst("stars", P.x, P.y + 1.2, 0.5, 5);
          sfx.stun();
          sfx.grumble();
          store.flashHurt();
          store.pushToast("BONK!", "#8E8AA6");
        }
      }
    }

    /* ---------- companions ---------- */
    for (const p of world.platforms) {
      if (!p.companion || !p.companionDriver) continue;
      const cd = p.companionDriver;
      const dy = p.y - P.y;
      const near = dy > -1 && dy < 9;
      let mem = compMem.get(p.id);
      if (!mem) {
        mem = { woke: false, wakeT: 0 };
        compMem.set(p.id, mem);
      }
      cd.look = clamp((P.x - p.x) * 0.5, -1, 1);
      cd.lookY = clamp(-dy * 0.15, -1, 1);
      if (!p.hugged && dy < -2.5 && (p.companionMood !== "sleep" || mem.woke)) {
        // missed the hug… the little one deflates as you fly past (still hoping you come back)
        cd.state = "sitSad";
        cd.expression = dy < -6 ? "sad" : "worried";
        cd.emote = null;
        continue;
      }
      if (p.hugged) {
        p.cheerTimer -= dt;
        if (p.cheerTimer > 0) cd.state = p.cheerTimer > 1.6 ? "hug" : "celebrate";
        else {
          cd.state = "sit";
          cd.expression = "love";
        }
        continue;
      }
      if (p.companionMood === "sleep") {
        if (near && !mem.woke) {
          mem.woke = true;
          mem.wakeT = 1.1;
          cd.events.push("wakeUp");
          cd.emote = null;
          cd.state = "sit";
          cd.expression = "confused";
        }
        if (mem.woke) {
          mem.wakeT -= dt;
          if (mem.wakeT <= 0) {
            cd.state = near ? "wave" : "sit";
            cd.expression = near ? null : "content";
          }
        }
      } else if (p.companionMood === "read") {
        if (near && dy < 5) {
          cd.state = "wave";
          cd.expression = null;
        } else {
          cd.state = "sit";
          cd.expression = near ? "surprised" : "focus";
          cd.lookY = near ? cd.lookY : -0.8;
        }
      } else if (p.companionMood === "wave") {
        cd.state = near ? "wave" : "sit";
        cd.expression = near ? "excited" : "content";
      } else {
        cd.state = near ? "wave" : "sit";
        cd.expression = near ? null : "content";
      }
    }

    /* ---------- state machine for the rig ---------- */
    P.landTimer -= dt;
    P.superTimer -= dt;
    P.springTimer -= dt;
    P.slipTimer -= dt;
    P.stunTimer -= dt;
    P.hurtTimer -= dt;
    if (P.dead) d.state = "plummet";
    else if (P.stunTimer > 0) d.state = "stunned";
    else if (P.hurtTimer > 0) d.state = "hurt";
    else if (rocket) d.state = "rocket";
    else if (balloon) d.state = "float";
    else if (P.slipTimer > 0) d.state = "slip";
    else if (P.springTimer > 0) d.state = "spin";
    else if (P.landTimer > 0) d.state = "land";
    else if (P.superTimer > 0) d.state = "superJump";
    else if (P.vy > 5) d.state = "rise";
    else if (P.vy > -2.5) d.state = "apex";
    else if (P.groundDist < 1.3 + Math.abs(P.vy) * 0.06) d.state = "brace"; // platform coming up: reach for it
    else if (P.vy > -16) d.state = "fall";
    else d.state = "plummet";
    // danger awareness: the lower the cat sinks toward the screen edge, the more scared it looks
    const dangerK = clamp((camY.current - H * 0.35 - P.y) / (H * 0.55), 0, 1);
    const danger = !P.dead && P.vy < -4 && P.groundDist > 2.5 && dangerK > 0.2 ? (dangerK > 0.7 ? "terrified" : "scared") : null;
    d.expression = P.dead ? "terrified" : danger ?? (P.combo >= 6 && d.state === "rise" ? "smug" : P.combo >= 3 && d.state === "rise" ? "determined" : null);
    d.vx = P.vx;
    d.vy = P.vy;
    // smart gaze: glance at the closest goodie / friend / threat, otherwise follow the motion
    let gx = P.vx / 5;
    let gy = (P.vy / 22) * 0.6;
    let gBest = 5.5;
    for (const it of world.items) {
      if (it.taken) continue;
      const dx = it.x - P.x;
      const dy = it.y - catCy;
      const dd = Math.hypot(dx, dy);
      if (dd < gBest) {
        gBest = dd;
        gx = dx / 3;
        gy = dy / 3;
      }
    }
    for (const p of world.platforms) {
      if (!p.companion || p.hugged) continue;
      const dx = p.x - P.x;
      const dy = p.y + 0.6 - catCy;
      const dd = Math.hypot(dx, dy);
      if (dd < gBest) {
        gBest = dd;
        gx = dx / 3;
        gy = dy / 3;
      }
    }
    for (const e of world.enemies) {
      if (!e.alive) continue;
      const dx = e.x - P.x;
      const dy = e.y - catCy;
      const dd = Math.hypot(dx, dy);
      if (dd < Math.min(gBest, 3.5)) {
        gBest = dd;
        gx = dx / 2;
        gy = dy / 2;
      }
    }
    if (P.vy < -2 && P.groundDist > 4) {
      // nothing under the paws: scan for the most reachable platform below and lean toward it
      let bestScore = 99;
      for (const p of world.platforms) {
        if (!p.alive || p.y > P.y - 0.2 || p.y < camY.current - H) continue;
        const dx = p.x - P.x;
        const score = Math.abs(dx) + (P.y - p.y) * 0.5;
        if (score < bestScore) {
          bestScore = score;
          gx = dx / 2.5;
          gy = -0.7;
        }
      }
    }
    if (d.state === "brace") {
      gy = -0.8; // eyes on the landing
      if (P.prevState !== "brace" && P.vy < -9) sfx.whoosh();
    }
    P.prevState = d.state;
    d.look = clamp(gx, -1, 1);
    d.lookY = clamp(gy, -1, 1);
    let acc: Accessory = "none";
    if (rocket) acc = "rocket";
    else if (balloon) acc = "balloon";
    else if (P.fishTimer > 0) acc = "fish";
    d.accessory = acc;

    if (catRef.current) catRef.current.position.set(P.x, P.y, 0);

    /* ---------- shield bubble ---------- */
    if (shieldRef.current) {
      shieldRef.current.visible = P.shield;
      if (P.shield) {
        const blink = P.shieldT < 2.5 ? (Math.sin(P.t * 18) > 0 ? 1 : 0.35) : 1;
        shieldRef.current.position.set(P.x, P.y + 0.72, 0);
        shieldRef.current.scale.setScalar((1 + Math.sin(P.t * 3) * 0.03) * blink);
        shieldRef.current.rotation.y = P.t * 0.5;
      }
    }

    /* ---------- contact shadow ---------- */
    if (shadowRef.current) {
      let bestTop = -Infinity;
      for (const p of world.platforms) {
        if (!p.alive) continue;
        const top = p.y + topOffset(p);
        if (top <= P.y + 0.05 && top > bestTop && Math.abs(P.x - p.x) < p.w / 2 + 0.25) bestTop = top;
      }
      const dist = P.y - bestTop;
      P.groundDist = bestTop > -Infinity ? dist : 99;
      if (bestTop > -Infinity && dist < 7) {
        const k = 1 - dist / 7;
        shadowRef.current.visible = true;
        shadowRef.current.position.set(P.x, bestTop + 0.03, 0.15);
        shadowRef.current.scale.set(0.35 + 0.65 * k, 0.6 * (0.35 + 0.65 * k), 1);
        shadowMat.opacity = 0.05 + 0.2 * k * k;
      } else shadowRef.current.visible = false;
    }

    /* ---------- camera ---------- */
    const wanted = Math.max(camY.current, P.y + H * (rocket ? 0.15 : 0.3));
    camY.current = damp(camY.current, wanted, rocket ? 12 : 7, dt);
    camX.current = damp(camX.current, P.x, 3, dt);

    /* ---------- world streaming ---------- */
    let changed = false;
    if (spawnUpTo(world, camY.current + H + 6)) changed = true;
    if (cullBelow(world, camY.current - H - 6)) changed = true;
    if (changed) setVersion((v) => v + 1);

    /* ---------- scoring ---------- */
    P.maxY = Math.max(P.maxY, P.y);
    if (P.maxY >= P.nextMilestone) {
      store.pushToast(`${P.nextMilestone}m!`, "#FFFFFF");
      P.nextMilestone += 100;
      d.events.push("milestone");
      celebrate(P.x, P.y + 1.4, 0.4);
      sfx.milestone();
    }
    const score = Math.floor(P.maxY * 10) + P.hearts * 50 + P.hugs * 300 + P.bonus;
    if (score !== P.lastScore) {
      P.lastScore = score;
      store.updateRun({ score, altitude: Math.floor(P.maxY), hearts: P.hearts, hugs: P.hugs, combo: P.combo, bestCombo: P.bestCombo, stars: P.stars, fish: P.fish });
      const tier = P.maxY < 45 ? 0 : P.maxY < 110 ? 1 : P.maxY < 190 ? 2 : P.maxY < 300 ? 3 : 4;
      if (tier !== store.skyTier && tier > 0) {
        store.pushToast(["", "BLUE SKIES ☁️", "GOLDEN DUSK 🌇", "STARRY NIGHT ✨", "OUTER SPACE 🪐"][tier], "#FFFFFF");
        d.events.push("milestone");
      }
      store.setSkyTier(tier);
      const best = store.best[character];
      if (!P.recordShown && best > 0 && score > best) {
        P.recordShown = true;
        d.events.push("record");
        store.pushToast("NEW BEST!", "#FFD35C");
        celebrate(P.x, P.y + 1.4, 0.4);
        sfx.milestone();
      }
    }

    /* ---------- death ---------- */
    if (!P.dead && P.y < camY.current - H - 1.2) {
      P.dead = true;
      P.deadTimer = 0.9;
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
      <CameraRig camY={camY} camX={camX} shake={shakeRef} />
      <Backdrop camYRef={camY} />
      {world.platforms.map((p) => (
        <Platform key={p.id} p={p} companionId={companionId} />
      ))}
      {world.items.map((it) => (
        <Item key={it.id} it={it} />
      ))}
      {world.enemies.map((e) => (
        <Grump key={e.id} e={e} />
      ))}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} material={shadowMat}>
        <circleGeometry args={[0.6, 28]} />
      </mesh>
      <mesh ref={shieldRef} geometry={SHIELD_GEO} material={shieldMat} visible={false} />
      <Cat palette={palette} driver={driver} groupRef={catRef} scale={C.catScale} position={[0, 0.2, 0]} />
    </>
  );
}
