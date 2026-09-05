import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BUBBLE_GEO, CONFETTI_GEO, HEART_GEO_SMALL, PUFF_GEO, SHARD_GEO, SPARK_GEO, STAR_GEO, STREAK_GEO } from "./geometries";
import { toon, outline } from "../character/materials";
import { rand } from "../character/springs";

export type FxKind = "hearts" | "puff" | "sparkle" | "dust" | "stars" | "flame" | "shards" | "bubbles" | "confetti" | "confetti2" | "smoke" | "zap" | "streak";

interface Particle {
  alive: boolean;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rot: number;
  vrot: number;
  life: number;
  maxLife: number;
  size: number;
  gravity: number;
  drag: number;
}

interface KindCfg {
  geo: THREE.BufferGeometry;
  color: string;
  emissive?: string;
  outline: number;
  count: number;
  life: [number, number];
  speed: number;
  gravity: number;
  up: number;
  size: [number, number];
  drag: number;
  pool?: number;
  grow?: boolean;
}

const KIND_CFG: Record<FxKind, KindCfg> = {
  hearts: { geo: HEART_GEO_SMALL, color: "#FF7A9C", outline: 0.025, count: 8, life: [0.9, 1.4], speed: 1.6, gravity: 2.5, up: 4, size: [0.7, 1.3], drag: 1.5 },
  puff: { geo: PUFF_GEO, color: "#FFFFFF", outline: 0.03, count: 9, life: [0.5, 0.8], speed: 2.5, gravity: -1.5, up: 0.5, size: [0.6, 1.3], drag: 3, grow: true },
  sparkle: { geo: SPARK_GEO, color: "#FFE07A", emissive: "#FFC93C", outline: 0.02, count: 12, life: [0.5, 0.9], speed: 4.5, gravity: 4, up: 3, size: [0.6, 1.4], drag: 2 },
  dust: { geo: PUFF_GEO, color: "#FFF6EC", outline: 0.02, count: 6, life: [0.3, 0.5], speed: 2, gravity: -0.5, up: 0.5, size: [0.3, 0.6], drag: 4, grow: true },
  stars: { geo: STAR_GEO, color: "#FFD86B", outline: 0.025, count: 10, life: [0.8, 1.3], speed: 5, gravity: 6, up: 5, size: [0.6, 1.2], drag: 1.5 },
  flame: { geo: PUFF_GEO, color: "#FFB347", emissive: "#FF6A00", outline: 0.02, count: 3, life: [0.25, 0.45], speed: 1.2, gravity: -3, up: -6, size: [0.5, 1.1], drag: 2, pool: 60, grow: true },
  shards: { geo: SHARD_GEO, color: "#CFF1FF", outline: 0.02, count: 10, life: [0.5, 0.9], speed: 4, gravity: 9, up: 3, size: [0.6, 1.3], drag: 1 },
  bubbles: { geo: BUBBLE_GEO, color: "#BFE6FF", outline: 0.02, count: 14, life: [0.6, 1.1], speed: 4, gravity: -1, up: 2, size: [0.5, 1.4], drag: 2.5 },
  confetti: { geo: CONFETTI_GEO, color: "#FF8FAF", outline: 0.015, count: 10, life: [1.2, 1.8], speed: 4, gravity: 3, up: 6, size: [0.8, 1.3], drag: 1.6 },
  confetti2: { geo: CONFETTI_GEO, color: "#7FB8FF", outline: 0.015, count: 10, life: [1.2, 1.8], speed: 4, gravity: 3, up: 6, size: [0.8, 1.3], drag: 1.6 },
  smoke: { geo: PUFF_GEO, color: "#B9AFA8", outline: 0.02, count: 8, life: [0.5, 0.9], speed: 2, gravity: -1, up: 1, size: [0.7, 1.4], drag: 3, grow: true },
  zap: { geo: SPARK_GEO, color: "#FFF4A3", emissive: "#FFE45C", outline: 0.02, count: 8, life: [0.25, 0.45], speed: 6, gravity: 0, up: 0, size: [0.5, 1], drag: 4 },
  // wind streaks that rush downward past the camera during rocket / super-jump ascents
  streak: { geo: STREAK_GEO, color: "#FFFFFF", outline: 0, count: 2, life: [0.35, 0.55], speed: 0.2, gravity: 0, up: -34, size: [0.6, 1.4], drag: 0, pool: 50 },
};

type BurstFn = (kind: FxKind, x: number, y: number, z?: number, count?: number, spread?: number) => void;
export const fx: { burst: BurstFn } = { burst: () => {} };

function Pool({ kind }: { kind: FxKind }) {
  const cfg = KIND_CFG[kind];
  const POOL = cfg.pool ?? 40;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const outl = useRef<THREE.InstancedMesh>(null);
  const parts = useMemo<Particle[]>(
    () => Array.from({ length: POOL }, () => ({ alive: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, rot: 0, vrot: 0, life: 0, maxLife: 1, size: 1, gravity: 0, drag: 0 })),
    [POOL],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    const prev = fx.burst;
    fx.burst = (k, x, y, z = 0, count, spread = 1) => {
      if (k !== kind) return prev(k, x, y, z, count, spread);
      let n = count ?? cfg.count;
      for (const p of parts) {
        if (n <= 0) break;
        if (p.alive) continue;
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.4, 1) * cfg.speed * spread;
        p.alive = true;
        p.x = x + rand(-0.15, 0.15) * spread;
        p.y = y + rand(-0.1, 0.1);
        p.z = z + rand(-0.2, 0.2);
        p.vx = Math.cos(a) * sp;
        p.vy = Math.abs(Math.sin(a)) * sp * 0.5 + cfg.up * rand(0.5, 1);
        p.vz = rand(-0.5, 0.5);
        p.rot = rand(0, Math.PI * 2);
        p.vrot = rand(-4, 4);
        p.maxLife = rand(cfg.life[0], cfg.life[1]);
        p.life = p.maxLife;
        p.size = rand(cfg.size[0], cfg.size[1]);
        p.gravity = cfg.gravity;
        p.drag = cfg.drag;
        n--;
      }
    };
    return null;
  }, [kind, cfg, parts]);

  useFrame((_, dt) => {
    const m = mesh.current;
    const o = outl.current;
    if (!m || !o) return;
    parts.forEach((p, i) => {
      if (p.alive) {
        p.life -= dt;
        if (p.life <= 0) p.alive = false;
        p.vy -= p.gravity * dt;
        const dr = Math.exp(-p.drag * dt);
        p.vx *= dr;
        p.vz *= dr;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.rot += p.vrot * dt;
        const k = p.life / p.maxLife;
        const s = p.size * (cfg.grow ? 0.5 + (1 - k) * 0.9 : Math.min(1, k * 4)) * (k < 0.3 ? k / 0.3 : 1);
        dummy.position.set(p.x, p.y, p.z);
        if (kind === "hearts") dummy.rotation.set(0, Math.sin(p.rot) * 0.6, 0);
        else if (kind === "confetti" || kind === "confetti2") dummy.rotation.set(p.rot * 1.3, p.rot, p.rot * 0.7);
        else dummy.rotation.set(0, 0, p.rot);
        dummy.scale.setScalar(Math.max(0.0001, s));
      } else {
        dummy.position.set(0, -9999, 0);
        dummy.scale.setScalar(0.0001);
      }
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      o.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    o.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[cfg.geo, toon(cfg.color, cfg.emissive ? { emissive: cfg.emissive, emissiveIntensity: 0.6 } : {}), POOL]} frustumCulled={false} />
      <instancedMesh ref={outl} args={[cfg.geo, outline(cfg.outline), POOL]} frustumCulled={false} />
    </>
  );
}

export function Particles() {
  return (
    <>
      {(Object.keys(KIND_CFG) as FxKind[]).map((k) => (
        <Pool key={k} kind={k} />
      ))}
    </>
  );
}

/** Celebration helper: confetti + stars + sparkles in one call. */
export function celebrate(x: number, y: number, z = 0.5) {
  fx.burst("confetti", x, y, z, 10, 1.4);
  fx.burst("confetti2", x, y, z, 10, 1.4);
  fx.burst("stars", x, y, z, 6, 1.2);
  fx.burst("sparkle", x, y + 0.3, z, 8, 1.2);
}
