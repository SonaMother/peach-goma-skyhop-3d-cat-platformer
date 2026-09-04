import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Cat, createDriver } from "../character/Cat";
import { PALETTES, otherCat } from "../character/palettes";
import { Part } from "../character/Part";
import { toon } from "../character/materials";
import { useGame } from "../game/store";
import { C } from "../game/world";
import { Backdrop } from "../world/Backdrop";
import { fx } from "../world/Particles";
import { CameraRig } from "./GameScene";
import { catSound } from "./MenuScene";

const STAGE = new RoundedBoxGeometry(6.4, 0.6, 2.6, 5, 0.28);
const STAGE_TOP = new RoundedBoxGeometry(5.6, 0.25, 1.8, 4, 0.1);
const BOX = new RoundedBoxGeometry(0.9, 0.42, 0.55, 4, 0.08);
const SLOT = new RoundedBoxGeometry(0.5, 0.04, 0.12, 2, 0.02);
const TISSUE = new THREE.PlaneGeometry(0.34, 0.42, 4, 6);
const TISSUE_MAT = toon("#FFFFFF", { side: THREE.DoubleSide });
const PAW = new THREE.CircleGeometry(0.05, 12);

function TissueBox({ position }: { position: [number, number, number] }) {
  const tissue = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (tissue.current) tissue.current.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.08;
  });
  return (
    <group position={position}>
      <Part geometry={BOX} color="#F6B8CB" position={[0, 0.21, 0]} outlineWidth={0.05} />
      <mesh geometry={SLOT} material={toon("#3B3231")} position={[0, 0.43, 0]} />
      <mesh ref={tissue} geometry={TISSUE} material={TISSUE_MAT} position={[0.02, 0.62, 0]} rotation={[0, 0, 0.1]} />
      {[
        [-0.28, 0.2],
        [0.28, 0.2],
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, 0.28]}>
          <mesh geometry={PAW} material={toon("#E58AA8")} scale={[1.3, 1.1, 1]} />
          {[-0.06, -0.02, 0.02, 0.06].map((dx, j) => (
            <mesh key={j} geometry={PAW} material={toon("#E58AA8")} position={[dx * 1.1, 0.08 - Math.abs(dx) * 0.4, 0]} scale={0.45} />
          ))}
        </group>
      ))}
    </group>
  );
}

export function GameOverScene() {
  const character = useGame((s) => s.character);
  const pal = PALETTES[character];
  const comp = PALETTES[otherCat(character)];
  const camY = useRef(0.25);
  const camX = useRef(0);
  const me = useRef(createDriver({ state: "sitSad", expression: "sob", fidgets: false }));
  const buddy = useRef(createDriver({ state: "run", expression: "worried", fidgets: false }));
  const buddyG = useRef<THREE.Group | null>(null);
  const mem = useMemo(() => ({ t: 0, hugged: false, heartTimer: 0, phase: 0 }), []);

  useFrame((_, dt) => {
    mem.t += dt;
    const t = mem.t;
    const b = buddy.current;
    const m = me.current;
    // buddy runs in from the side, then hugs from behind
    if (buddyG.current) {
      const targetX = t < 1.4 ? THREE.MathUtils.lerp(3.8, 0.55, Math.min(1, t / 1.4)) : 0.55;
      buddyG.current.position.x = targetX;
      b.vx = t < 1.4 ? -2.6 : 0;
      b.look = t < 1.4 ? -1 : -0.4;
    }
    if (t < 1.4) b.state = "run";
    else if (!mem.hugged) {
      mem.hugged = true;
      b.state = "hug";
      b.expression = "love";
      b.events.push("hugged");
      m.events.push("hugged");
      fx.burst("hearts", 0.2, 1.8, 0.8, 10);
    }
    if (t > 1.6) {
      // the sad cat slowly cheers up: sob → sad → shy → love → content, with a comforting pat
      if (t < 3.2) {
        m.state = "sitSad";
        m.expression = "sad";
      } else if (t < 5.2) {
        m.state = "sit";
        m.expression = "shy";
      } else if (t < 7.5) {
        m.state = "sit";
        m.expression = "love";
      } else {
        m.state = "sit";
        m.expression = null;
      }
      m.look = 0.5;
      m.lookY = 0.2;
      if (t > 4.5) {
        b.state = t % 6 < 3 ? "hug" : "wave";
        b.expression = t % 6 < 3 ? "love" : "happy";
      }
    }
    mem.heartTimer -= dt;
    if (mem.hugged && mem.heartTimer <= 0) {
      mem.heartTimer = 1.6;
      fx.burst("hearts", 0.3, 2.0, 0.6, 3);
    }
  });

  return (
    <>
      <CameraRig camY={camY} camX={camX} lookDown={1.3} zoom={2.3} />
      <group position={[0, -0.02, 0]}>
        <Part geometry={STAGE} color="#C9E9C0" position={[0, -0.3, 0]} outlineWidth={0.07} />
        <Part geometry={STAGE_TOP} color="#EAF8E4" position={[0, 0.05, 0]} outlineWidth={0} />
      </group>
      <Cat palette={pal} driver={me} position={[-0.3, 0, 0.5]} scale={C.catScale * 1.15} interactive onEvent={catSound} />
      <TissueBox position={[-0.3, 0.02, 1.25]} />
      <group ref={buddyG} position={[3.8, 0, -0.35]}>
        <Cat palette={comp} driver={buddy} scale={C.catScale * 1.1} />
      </group>
      <Backdrop camYRef={camY} count={8} spread={8} />
    </>
  );
}
