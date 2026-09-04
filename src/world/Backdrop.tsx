import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import { rand } from "../character/springs";
import { toon, outline, flat } from "../character/materials";
import { useGame } from "../game/store";

const PUFF = new THREE.SphereGeometry(1, 18, 12);
const cloudMat = toon("#F6FAFF");
const cloudOutline = outline(0.08, "#D9E6F6");
const SUN = new THREE.CircleGeometry(2.2, 40);
const RING = new THREE.RingGeometry(2.4, 3.2, 48);
const PLANET = new THREE.SphereGeometry(1, 24, 16);
const PLANET_RING = new THREE.TorusGeometry(1.6, 0.12, 8, 40);
const BIRD = new THREE.TorusGeometry(0.22, 0.035, 6, 12, Math.PI);

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

function Birds({ camYRef }: { camYRef: MutableRefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  const mem = useMemo(() => ({ x: -20, y: 0, dir: 1, t: rand(0, 10), wait: rand(4, 10), active: false }), []);
  useFrame(({ clock }, dt) => {
    const o = g.current;
    if (!o) return;
    mem.t += dt;
    if (!mem.active) {
      mem.wait -= dt;
      if (mem.wait <= 0 && camYRef.current < 95) {
        mem.active = true;
        mem.dir = Math.random() < 0.5 ? 1 : -1;
        mem.x = -mem.dir * 18;
        mem.y = camYRef.current + rand(2, 7);
      }
      o.visible = false;
      return;
    }
    o.visible = true;
    mem.x += mem.dir * 3.2 * dt;
    mem.y += Math.sin(mem.t * 2) * 0.01;
    if (Math.abs(mem.x) > 19) {
      mem.active = false;
      mem.wait = rand(8, 18);
    }
    o.position.set(mem.x, mem.y, -12);
    o.scale.x = mem.dir;
    const flap = Math.sin(clock.elapsedTime * 9) * 0.5;
    o.children.forEach((c, i) => {
      c.rotation.z = (i === 0 ? -1 : 1) * (0.4 + flap);
    });
  });
  return (
    <group ref={g} visible={false}>
      <mesh geometry={BIRD} material={flat("#6b5e5c")} position={[-0.2, 0, 0]} />
      <mesh geometry={BIRD} material={flat("#6b5e5c")} position={[0.2, 0, 0]} />
    </group>
  );
}

export function Backdrop({ camYRef, count = 14, spread = 26 }: { camYRef: MutableRefObject<number>; count?: number; spread?: number }) {
  const clouds = useMemo(() => Array.from({ length: count }, () => makeCloud(camYRef.current, spread)), [count, spread, camYRef]);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const stars = useMemo(() => {
    const N = 220;
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
  const sunRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Group>(null);
  const sunMat = useMemo(() => flat("#FFF1B8", { opacity: 0.9 }), []);
  const ringMat = useMemo(() => flat("#FFF7DA", { opacity: 0.25, depthWrite: false }), []);

  useFrame(({ clock }, dt) => {
    const camY = camYRef.current;
    const tier = useGame.getState().skyTier;
    clouds.forEach((c, i) => {
      c.x += c.speed * dt;
      if (c.x > 16) c.x = -16;
      if (c.x < -16) c.x = 16;
      if (c.y < camY - spread) Object.assign(c, makeCloud(camY, spread), { y: camY + spread * rand(0.7, 1) });
      const g = refs.current[i];
      if (g) {
        g.position.set(c.x, c.y + Math.sin(clock.elapsedTime * 0.4 + i) * 0.15, c.z);
        // clouds thin out in space
        const k = tier >= 4 ? 0.35 : 1;
        g.scale.setScalar(c.s * k);
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
      const target = camY > 95 ? Math.min(1, (camY - 95) / 60) : 0;
      starMat.opacity += (target - starMat.opacity) * Math.min(1, dt * 2);
      starMat.size = 0.14 + Math.sin(clock.elapsedTime * 3) * 0.03;
    }
    if (sunRef.current) {
      // the sun slowly sinks as you climb into dusk, then becomes the moon
      const k = Math.min(1, camY / 190);
      sunRef.current.position.set(6 - k * 3, camY + 9 - k * 6, -26);
      const isMoon = tier >= 3;
      sunMat.color.set(isMoon ? "#F4F1FF" : "#FFF1B8");
      ringMat.color.set(isMoon ? "#DCD6FF" : "#FFF7DA");
      sunRef.current.rotation.z = clock.elapsedTime * 0.05;
    }
    if (planetRef.current) {
      planetRef.current.visible = tier >= 4;
      planetRef.current.position.set(-7, camY + 5 + Math.sin(clock.elapsedTime * 0.3) * 0.3, -24);
      planetRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      <group ref={sunRef} position={[6, 9, -26]}>
        <mesh geometry={SUN} material={sunMat} />
        <mesh geometry={RING} material={ringMat} />
      </group>
      <group ref={planetRef} visible={false}>
        <mesh geometry={PLANET} material={toon("#C7B3FF")} scale={1.6} />
        <mesh geometry={PLANET} material={outline(0.1, "#8E77D6")} scale={1.6} />
        <mesh geometry={PLANET_RING} material={toon("#FFD7EB")} rotation={[1.2, 0.3, 0]} scale={1.4} />
      </group>
      {clouds.map((c, i) => (
        <group key={i} ref={(g) => (refs.current[i] = g)} position={[c.x, c.y, c.z]} scale={c.s}>
          <Cloud d={c} />
        </group>
      ))}
      <points ref={starsRef} geometry={stars} material={starMat} frustumCulled={false} />
      <Birds camYRef={camYRef} />
    </group>
  );
}
