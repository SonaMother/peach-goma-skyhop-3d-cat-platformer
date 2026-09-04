import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import { rand } from "../character/springs";
import { toon, outline } from "../character/materials";

const PUFF = new THREE.SphereGeometry(1, 18, 12);
const cloudMat = toon("#E3EEFB");
const cloudOutline = outline(0.08, "#C9D9EE");

interface CloudData {
  x: number;
  y: number;
  z: number;
  s: number;
  speed: number;
  parts: { x: number; y: number; r: number; sy: number }[];
}

function makeCloud(camY: number, spread: number): CloudData {
  const n = 3 + Math.floor(Math.random() * 3);
  const parts = [] as CloudData["parts"];
  for (let i = 0; i < n; i++) {
    parts.push({ x: (i - (n - 1) / 2) * 0.75 + rand(-0.15, 0.15), y: rand(-0.1, 0.25) - Math.abs(i - (n - 1) / 2) * 0.15, r: rand(0.55, 0.9), sy: rand(0.6, 0.8) });
  }
  return { x: rand(-14, 14), y: camY + rand(-spread, spread), z: rand(-24, -9), s: rand(0.7, 1.6), speed: rand(0.15, 0.45) * (Math.random() < 0.5 ? -1 : 1), parts };
}

function Cloud({ d }: { d: CloudData }) {
  return (
    <>
      {d.parts.map((p, i) => (
        <group key={i} position={[p.x, p.y, 0]} scale={[p.r, p.r * p.sy, p.r * 0.7]}>
          <mesh geometry={PUFF} material={cloudMat} />
          <mesh geometry={PUFF} material={cloudOutline} />
        </group>
      ))}
    </>
  );
}

export function Backdrop({ camYRef, count = 14, spread = 26 }: { camYRef: MutableRefObject<number>; count?: number; spread?: number }) {
  const clouds = useMemo(() => Array.from({ length: count }, () => makeCloud(camYRef.current, spread)), [count, spread, camYRef]);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const stars = useMemo(() => {
    const N = 160;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = rand(-16, 16);
      pos[i * 3 + 1] = rand(-spread, spread);
      pos[i * 3 + 2] = rand(-22, -10);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [spread]);
  const starMat = useMemo(() => new THREE.PointsMaterial({ color: "#FFF6D6", size: 0.16, transparent: true, opacity: 0, sizeAttenuation: true, depthWrite: false }), []);
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }, dt) => {
    const camY = camYRef.current;
    clouds.forEach((c, i) => {
      c.x += c.speed * dt;
      if (c.x > 16) c.x = -16;
      if (c.x < -16) c.x = 16;
      if (c.y < camY - spread) {
        Object.assign(c, makeCloud(camY, spread), { y: camY + spread * rand(0.7, 1) });
      }
      const g = refs.current[i];
      if (g) {
        g.position.set(c.x, c.y + Math.sin(clock.elapsedTime * 0.4 + i) * 0.15, c.z);
        g.scale.setScalar(c.s);
      }
    });
    if (starsRef.current) {
      const pos = stars.attributes.position as THREE.BufferAttribute;
      let dirty = false;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        if (y < camY - spread) {
          pos.setY(i, camY + spread * rand(0.5, 1));
          pos.setX(i, rand(-16, 16));
          dirty = true;
        }
      }
      if (dirty) pos.needsUpdate = true;
      // stars only shine high up
      const target = camY > 95 ? Math.min(1, (camY - 95) / 60) : 0;
      starMat.opacity += (target - starMat.opacity) * Math.min(1, dt * 2);
      starMat.size = 0.14 + Math.sin(clock.elapsedTime * 3) * 0.03;
    }
  });

  return (
    <group>
      {clouds.map((c, i) => (
        <group key={i} ref={(g) => (refs.current[i] = g)} position={[c.x, c.y, c.z]} scale={c.s}>
          <Cloud d={c} />
        </group>
      ))}
      <points ref={starsRef} geometry={stars} material={starMat} frustumCulled={false} />
    </group>
  );
}
