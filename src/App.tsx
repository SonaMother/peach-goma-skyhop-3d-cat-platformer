import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { useGame } from "./game/store";
import { useInput } from "./game/useInput";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { Particles } from "./world/Particles";
import { Sky } from "./ui/Sky";
import { GameOverOverlay, HUD, MenuOverlay } from "./ui/Overlays";
import { C } from "./game/world";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.95} />
      <hemisphereLight args={["#ffffff", "#f7d9e3", 0.55]} />
      <directionalLight position={[4, 9, 7]} intensity={1.15} />
      <directionalLight position={[-6, 2, 4]} intensity={0.25} color="#dbe9ff" />
    </>
  );
}

export default function App() {
  const phase = useGame((s) => s.phase);
  const input = useInput(phase === "playing");
  useEffect(() => {
    // debug deep-links: #gameover / #play
    if (location.hash === "#gameover") useGame.setState({ phase: "gameover" });
    if (location.hash === "#play") useGame.getState().start();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F4DDE5] font-[Baloo_2,ui-rounded,system-ui,sans-serif]">
      {/* decorative desktop backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 20% 20%, #ffe4ec 0, transparent 40%), radial-gradient(circle at 80% 80%, #dbe9ff 0, transparent 40%)" }} />
      <div className="relative h-full w-full max-w-[min(100vw,calc(100dvh*0.62))] overflow-hidden bg-[#dcebff] shadow-[0_0_80px_rgba(120,60,90,0.25)]" style={{ touchAction: "none" }}>
        <Sky />
        <Canvas
          flat
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ fov: C.fov, near: 0.1, far: 120, position: [0, 4, 20] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Lights />
          <Suspense fallback={null}>
            <Particles />
            {phase === "menu" && <MenuScene />}
            {phase === "playing" && <GameScene input={input} />}
            {phase === "gameover" && <GameOverScene />}
          </Suspense>
        </Canvas>
        {phase === "menu" && <MenuOverlay />}
        {phase === "playing" && <HUD />}
        {phase === "gameover" && <GameOverOverlay />}
      </div>
    </div>
  );
}
