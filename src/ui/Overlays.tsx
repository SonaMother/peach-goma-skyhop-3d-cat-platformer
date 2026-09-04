import { useEffect, useState } from "react";
import { useGame } from "../game/store";
import { PALETTES, type CatId } from "../character/palettes";
import { sfx } from "../game/sfx";
import { requestTilt } from "../game/useInput";

/* ------------------------------------------------------------------ */
const Btn = ({
  children,
  onClick,
  color = "#FF8FAF",
  className = "",
  small = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  className?: string;
  small?: boolean;
}) => (
  <button
    data-ui
    onClick={(e) => {
      e.stopPropagation();
      sfx.unlock();
      sfx.click();
      onClick();
    }}
    className={`sticker-btn select-none rounded-full font-black tracking-wide text-white transition-transform active:scale-95 hover:scale-105 ${small ? "px-4 py-2 text-sm" : "px-9 py-4 text-xl"} ${className}`}
    style={{ background: color, boxShadow: `0 6px 0 rgba(0,0,0,0.18), 0 10px 24px ${color}66` }}
  >
    {children}
  </button>
);

const Title = () => (
  <div className="text-center">
    <div className="sticker-text text-[13px] font-black uppercase tracking-[0.45em] text-white/95">Peach & Goma</div>
    <h1 className="sticker-text mt-1 text-5xl font-black leading-none text-white sm:text-6xl">
      Sky<span className="text-[#FFD3E0]">Hop</span>
    </h1>
  </div>
);

/* ------------------------------------------------------------------ */
export function MenuOverlay() {
  const character = useGame((s) => s.character);
  const setCharacter = useGame((s) => s.setCharacter);
  const best = useGame((s) => s.best);
  const start = useGame((s) => s.start);
  const isTouch = typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-6">
      <div className="pointer-events-auto mt-2">
        <Title />
      </div>
      <div className="pointer-events-auto flex w-full max-w-sm flex-col items-center gap-4 px-6">
        <div className="grid w-full grid-cols-2 gap-3">
          {(["peach", "goma"] as CatId[]).map((id) => {
            const p = PALETTES[id];
            const sel = character === id;
            return (
              <button
                data-ui
                key={id}
                onClick={() => {
                  sfx.unlock();
                  sfx.select();
                  setCharacter(id);
                }}
                className={`rounded-3xl border-4 px-3 py-3 text-left transition-all ${sel ? "scale-[1.03] border-white bg-white/90 shadow-xl" : "border-white/40 bg-white/45 hover:bg-white/60"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block h-5 w-5 rounded-full border-[3px] border-[#3B3231]" style={{ background: p.fur }} />
                  <span className="text-lg font-black text-[#3B3231]">{p.name}</span>
                  {sel && <span className="ml-auto rounded-full bg-[#FF8FAF] px-2 py-0.5 text-[10px] font-black text-white">PICKED</span>}
                </div>
                <div className="mt-1 text-[11px] font-semibold leading-tight text-[#6b5e5c]">{p.tagline}</div>
                <div className="mt-1 text-[11px] font-bold text-[#a0898a]">Best: {best[id].toLocaleString()}</div>
              </button>
            );
          })}
        </div>
        <Btn
          onClick={() => {
            if (isTouch) requestTilt();
            start();
          }}
          className="w-full"
        >
          ▶ &nbsp;Play as {PALETTES[character].name}
        </Btn>
        <p className="text-center text-[12px] font-bold leading-snug text-[#3B3231]/70">
          {isTouch ? "Tilt your phone or tap left / right to steer." : "← → or A / D to steer. Tap a cat to say hi!"}
          <br />
          Bounce on clouds, boing off pillows, collect hearts & hug your friend!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function HUD() {
  const score = useGame((s) => s.score);
  const hearts = useGame((s) => s.hearts);
  const hugs = useGame((s) => s.hugs);
  const altitude = useGame((s) => s.altitude);
  const muted = useGame((s) => s.muted);
  const paused = useGame((s) => s.paused);
  const toggleMute = useGame((s) => s.toggleMute);
  const togglePause = useGame((s) => s.togglePause);
  const backToMenu = useGame((s) => s.backToMenu);
  const toasts = useGame((s) => s.toasts);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (hearts === 0 && hugs === 0) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 220);
    return () => clearTimeout(t);
  }, [hearts, hugs]);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 right-0 top-3 flex items-start justify-between px-4">
        <div className="flex flex-col gap-1">
          <div className={`sticker-text text-4xl font-black text-white transition-transform ${pop ? "scale-110" : ""}`}>{score.toLocaleString()}</div>
          <div className="flex gap-2 text-[12px] font-black text-white">
            <span className="rounded-full bg-black/15 px-2 py-0.5">⬆ {altitude}m</span>
            <span className="rounded-full bg-black/15 px-2 py-0.5">♥ {hearts}</span>
            {hugs > 0 && <span className="rounded-full bg-black/15 px-2 py-0.5">🤗 {hugs}</span>}
          </div>
        </div>
        <div className="pointer-events-auto flex gap-2">
          <Btn small color="#8FB8FF" onClick={toggleMute}>
            {muted ? "🔇" : "🔊"}
          </Btn>
          <Btn small color="#FFB380" onClick={togglePause}>
            {paused ? "▶" : "❚❚"}
          </Btn>
        </div>
      </div>
      <div className="absolute left-0 right-0 top-[28%] flex flex-col items-center gap-1">
        {toasts.map((t) => (
          <div key={t.id} className="toast sticker-text text-3xl font-black" style={{ color: t.color }}>
            {t.text}
          </div>
        ))}
      </div>
      {paused && (
        <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/30 backdrop-blur-[2px]">
          <div className="sticker-text text-5xl font-black text-white">Paused</div>
          <Btn onClick={togglePause}>Resume</Btn>
          <Btn small color="#B9A7A4" onClick={backToMenu}>
            Quit to menu
          </Btn>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function GameOverOverlay() {
  const score = useGame((s) => s.score);
  const altitude = useGame((s) => s.altitude);
  const hearts = useGame((s) => s.hearts);
  const hugs = useGame((s) => s.hugs);
  const best = useGame((s) => s.best);
  const character = useGame((s) => s.character);
  const start = useGame((s) => s.start);
  const backToMenu = useGame((s) => s.backToMenu);
  const record = score > 0 && score >= best[character];
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-6">
      <div className="mt-2 text-center">
        <div className="sticker-text text-5xl font-black text-white">Oh no…</div>
        <div className="sticker-text mt-1 text-sm font-black tracking-widest text-white/90">{PALETTES[character].name.toUpperCase()} FELL DOWN</div>
      </div>
      <div className={`pointer-events-auto w-full max-w-sm px-6 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <div className="rounded-3xl border-4 border-white bg-white/90 p-5 text-center shadow-2xl">
          {record && <div className="mb-1 inline-block rounded-full bg-[#FFD35C] px-3 py-0.5 text-[11px] font-black text-[#3B3231]">★ NEW BEST ★</div>}
          <div className="text-[12px] font-black tracking-widest text-[#a0898a]">SCORE</div>
          <div className="text-5xl font-black text-[#3B3231]">{score.toLocaleString()}</div>
          <div className="mt-2 flex justify-center gap-2 text-[12px] font-black text-[#6b5e5c]">
            <span className="rounded-full bg-[#F3E8EA] px-2 py-0.5">⬆ {altitude}m</span>
            <span className="rounded-full bg-[#F3E8EA] px-2 py-0.5">♥ {hearts}</span>
            <span className="rounded-full bg-[#F3E8EA] px-2 py-0.5">🤗 {hugs}</span>
            <span className="rounded-full bg-[#F3E8EA] px-2 py-0.5">Best {best[character].toLocaleString()}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Btn onClick={start} className="flex-1 !px-4 !text-lg">
              Try again
            </Btn>
            <Btn onClick={backToMenu} color="#B9A7A4" className="!px-4 !text-lg">
              Menu
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
