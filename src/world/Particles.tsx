import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { HEART_GEO_SMALL, PUFF_GEO, SPARK_GEO, STAR_GEO } from "./geometries";
import { toon, outline } from "../character/materials";
import { rand } from "../character/springs";

export type FxKind = "hearts" | "puff" | "sparkle" | "dust" | "stars";

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

const POOL = 40;
const KIND_CFG: Record<FxKind, { geo: THREE.BufferGeometry; color: string; outline: number; count: number; life: [number, number]; speed: number; gravity: number; up: number; size: [number, number]; drag: number }> = {
  hearts: { geo: HEART_GEO_SMALL, color: "#FF7A9C", outline: 0.025, count: 8, life: [0.9, 1.4], speed: 1.6, gravity: 2.5, up: 4, size: [0.7, 1.3], drag: 1.5 },
  puff: { geo: PUFF_GEO, color: "#FFFFFF", outline: 0.03, count: 9, life: [0.5, 0.8], speed: 2.5, gravity: -1.5, up: 0.5, size: [0.6, 1.3], drag: 3 },
  sparkle: { geo: SPARK_GEO, color: "#FFE07A", outline: 0.02, count: 12, life: [0.5, 0.9], speed: 4.5, gravity: 4, up: 3, size: [0.6, 1.4], drag: 2 },
  dust: { geo: PUFF_GEO, color: "#FFF6EC", outline: 0.02, count: 6, life: [0.3, 0.5], speed: 2, gravity: -0.5, up: 0.5, size: [0.3, 0.6], drag: 4 },
  stars: { geo: STAR_GEO, color: "#FFD86B", outline: 0.025, count: 10, life: [0.8, 1.3], speed: 5, gravity: 6, up: 5, size: [0.6, 1.2], drag: 1.5 },
};

type BurstFn = (kind: FxKind, x: number, y: number, z?: number, count?: number) => void;
export const fx: { burst: BurstFn } = { burst: () => {} };

function Pool({ kind }: { kind: FxKind }) {
  const cfg = KIND_CFG[kind];
  const mesh = useRef<THREE.InstancedMesh>(null);
  const outl = useRef<THREE.InstancedMesh>(null);
  const parts = useMemo<Particle[]>(
    () =>
      Array.from({ length: POOL }, () => ({ alive: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, rot: 0, vrot: 0, life: 0, maxLife: 1, size: 1, gravity: 0, drag: 0 })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // register in global
  useMemo(() => {
    const prev = fx.burst;
    fx.burst = (k, x, y, z = 0, count) => {
      if (k !== kind) return prev(k, x, y, z, count);
      let n = count ?? cfg.count;
      for (const p of parts) {
        if (n <= 0) break;
        if (p.alive) continue;
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.4, 1) * cfg.speed;
        p.alive = true;
        p.x = x + rand(-0.15, 0.15);
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
        const s = p.size * (kind === "puff" || kind === "dust" ? 0.5 + (1 - k) * 0.9 : Math.min(1, k * 4)) * (k < 0.3 ? k / 0.3 : 1);
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(0, kind === "hearts" ? Math.sin(p.rot) * 0.6 : 0, kind === "hearts" ? 0 : p.rot);
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
      <instancedMesh ref={mesh} args={[cfg.geo, toon(cfg.color), POOL]} frustumCulled={false} />
      <instancedMesh ref={outl} args={[cfg.geo, outline(cfg.outline), POOL]} frustumCulled={false} />
    </>
  );
}

export function Particles() {
  return (
    <>
      <Pool kind="hearts" />
      <Pool kind="puff" />
      <Pool kind="sparkle" />
      <Pool kind="dust" />
      <Pool kind="stars" />
    </>
  );
}
