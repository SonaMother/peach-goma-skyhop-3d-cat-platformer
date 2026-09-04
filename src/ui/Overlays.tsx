import { useEffect, useState } from "react";
import { useGame } from "../game/store";
import { PALETTES, type CatId } from "../character/palettes";
import { sfx } from "../game/sfx";
import { requestTilt } from "../game/useInput";
import { EXPRESSION_NAMES } from "../character/expressions";
import { POSE_NAMES } from "../character/poses";
import { ALL_ACCESSORIES, ALL_EMOTES, ALL_EVENTS } from "../character/Cat";
import { labBus } from "../scenes/LabScene";

/* ------------------------------------------------------------------ */
const Btn = ({ children, onClick, color = "#FF8FAF", className = "", small = false }: { children: React.ReactNode; onClick: () => void; color?: string; className?: string; small?: boolean }) => (
  <button
    data-ui
    onClick={(e) => {
      e.stopPropagation();
      sfx.unlock();
      sfx.click();
      onClick();
    }}
    className={`sticker-btn select-none rounded-full font-black tracking-wide text-white transition-transform hover:scale-105 active:scale-95 ${small ? "px-4 py-2 text-sm" : "px-9 py-4 text-xl"} ${className}`}
    style={{ background: color, boxShadow: `0 6px 0 rgba(0,0,0,0.18), 0 10px 24px ${color}66` }}
  >
    {children}
  </button>
);

const Title = () => (
  <div className="text-center">
    <div className="sticker-text-sm text-[13px] font-black uppercase tracking-[0.45em] text-white/95">Peach & Goma</div>
    <h1 className="sticker-text mt-1 text-5xl font-black leading-none text-white sm:text-6xl">
      Sky<span className="text-[#FFD3E0]">Hop</span>
    </h1>
  </div>
);

const LEGEND = [
  { icon: "☁️", text: "Clouds vanish" },
  { icon: "🛏️", text: "Pillows launch" },
  { icon: "🪀", text: "Trampolines flip" },
  { icon: "🧊", text: "Ice slips" },
  { icon: "🪨", text: "Crumble breaks" },
  { icon: "🌵", text: "Cactus hurts" },
  { icon: "⛈️", text: "Grumps bonk" },
  { icon: "🚀🎈🛡️🧲", text: "Power-ups!" },
];

/* ------------------------------------------------------------------ */
export function MenuOverlay() {
  const character = useGame((s) => s.character);
  const setCharacter = useGame((s) => s.setCharacter);
  const best = useGame((s) => s.best);
  const start = useGame((s) => s.start);
  const openLab = useGame((s) => s.openLab);
  const isTouch = typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;
  const [legend, setLegend] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-5">
      <div className="pointer-events-auto mt-1 floaty">
        <Title />
      </div>
      <div className="pointer-events-auto flex w-full max-w-sm flex-col items-center gap-3 px-5">
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
        <div className="flex w-full gap-2">
          <Btn small color="#B08BEA" className="flex-1" onClick={openLab}>
            🔬 Cat Lab
          </Btn>
          <Btn small color="#8FB8FF" className="flex-1" onClick={() => setLegend((v) => !v)}>
            {legend ? "Hide" : "📖 How to play"}
          </Btn>
        </div>
        {legend ? (
          <div className="pop-in grid w-full grid-cols-2 gap-x-3 gap-y-1 rounded-2xl border-4 border-white/70 bg-white/80 px-3 py-2 text-[11px] font-bold text-[#3B3231]">
            {LEGEND.map((l) => (
              <div key={l.text} className="flex items-center gap-1.5">
                <span>{l.icon}</span>
                <span>{l.text}</span>
              </div>
            ))}
            <div className="col-span-2 mt-1 text-center text-[10px] text-[#6b5e5c]">Land dead-center for PERFECT combos ✨ Hug friends 🤗</div>
          </div>
        ) : (
          <p className="text-center text-[12px] font-bold leading-snug text-[#3B3231]/70">
            {isTouch ? "Tilt or tap left / right to steer." : "← → or A / D to steer."} Poke, pet & tickle the cats!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const POWER_INFO = { rocket: { label: "🚀 ROCKET", color: "#FF6B7A" }, balloon: { label: "🎈 BALLOON", color: "#FFD35C" }, magnet: { label: "🧲 MAGNET", color: "#E9455D" } };

export function HUD() {
  const score = useGame((s) => s.score);
  const hearts = useGame((s) => s.hearts);
  const hugs = useGame((s) => s.hugs);
  const stars = useGame((s) => s.stars);
  const fish = useGame((s) => s.fish);
  const combo = useGame((s) => s.combo);
  const altitude = useGame((s) => s.altitude);
  const muted = useGame((s) => s.muted);
  const paused = useGame((s) => s.paused);
  const power = useGame((s) => s.power);
  const powerLeft = useGame((s) => s.powerLeft);
  const shield = useGame((s) => s.shield);
  const hurtFlash = useGame((s) => s.hurtFlash);
  const toggleMute = useGame((s) => s.toggleMute);
  const togglePause = useGame((s) => s.togglePause);
  const backToMenu = useGame((s) => s.backToMenu);
  const toasts = useGame((s) => s.toasts);
  const [pop, setPop] = useState(false);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (hearts === 0 && hugs === 0 && stars === 0 && fish === 0) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 220);
    return () => clearTimeout(t);
  }, [hearts, hugs, stars, fish]);
  useEffect(() => {
    if (hurtFlash > 0) setFlashKey((k) => k + 1);
  }, [hurtFlash]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.code === "KeyP" || e.code === "Escape") togglePause();
      if (e.code === "KeyM") toggleMute();
    };
    window.addEventListener("keydown", kd);
    return () => window.removeEventListener("keydown", kd);
  }, [togglePause, toggleMute]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {flashKey > 0 && <div key={flashKey} className="flash-hurt absolute inset-0 bg-[#FF6B7A]" />}
      <div className="absolute left-0 right-0 top-3 flex items-start justify-between px-4">
        <div className="flex flex-col gap-1">
          <div className={`sticker-text text-4xl font-black text-white transition-transform ${pop ? "scale-110" : ""}`}>{score.toLocaleString()}</div>
          <div className="flex flex-wrap gap-1.5 text-[12px] font-black text-white">
            <span className="rounded-full bg-black/15 px-2 py-0.5">⬆ {altitude}m</span>
            <span className="rounded-full bg-black/15 px-2 py-0.5">♥ {hearts}</span>
            {stars > 0 && <span className="rounded-full bg-black/15 px-2 py-0.5">★ {stars}</span>}
            {fish > 0 && <span className="rounded-full bg-black/15 px-2 py-0.5">🐟 {fish}</span>}
            {hugs > 0 && <span className="rounded-full bg-black/15 px-2 py-0.5">🤗 {hugs}</span>}
          </div>
          {shield && <div className="mt-1 w-fit rounded-full border-2 border-white/80 bg-[#9FD8FF]/80 px-2 py-0.5 text-[11px] font-black text-white">🛡️ SHIELD</div>}
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
      {power && (
        <div className="absolute left-1/2 top-[17%] w-44 -translate-x-1/2">
          <div className="sticker-text-sm mb-1 text-center text-sm font-black text-white">{POWER_INFO[power].label}</div>
          <div className="h-3 w-full overflow-hidden rounded-full border-2 border-[#3B3231] bg-white/60">
            <div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${Math.max(0, powerLeft * 100)}%`, background: POWER_INFO[power].color }} />
          </div>
        </div>
      )}
      {combo >= 2 && (
        <div key={combo} className="pop-in absolute right-4 top-[24%] rotate-6 text-right">
          <div className="sticker-text text-3xl font-black text-[#FFD35C]">x{combo}</div>
          <div className="sticker-text-sm text-[11px] font-black tracking-widest text-white">COMBO</div>
        </div>
      )}
      <div className="absolute left-0 right-0 top-[30%] flex flex-col items-center gap-1">
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
  const stars = useGame((s) => s.stars);
  const fish = useGame((s) => s.fish);
  const bestCombo = useGame((s) => s.bestCombo);
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

  const Stat = ({ v, l }: { v: React.ReactNode; l: string }) => (
    <div className="rounded-2xl bg-[#FFF0F4] px-2 py-1.5">
      <div className="text-xl font-black text-[#3B3231]">{v}</div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#a0898a]">{l}</div>
    </div>
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-6">
      <div className="mt-2 text-center">
        <div className="sticker-text text-5xl font-black text-white">Oh no…</div>
        <div className="sticker-text-sm mt-1 text-sm font-black tracking-widest text-white/90">{PALETTES[character].name.toUpperCase()} FELL DOWN</div>
      </div>
      <div className={`pointer-events-auto w-full max-w-sm px-6 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <div className="rounded-3xl border-4 border-white bg-white/90 p-4 text-center shadow-2xl">
          {record && <div className="wiggle mb-1 inline-block rounded-full bg-[#FFD35C] px-3 py-0.5 text-[11px] font-black text-[#3B3231]">★ NEW BEST ★</div>}
          <div className="text-[11px] font-black uppercase tracking-widest text-[#a0898a]">Score</div>
          <div className="text-5xl font-black text-[#3B3231]">{score.toLocaleString()}</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat v={`${altitude}m`} l="height" />
            <Stat v={`♥ ${hearts}`} l="hearts" />
            <Stat v={`🤗 ${hugs}`} l="hugs" />
            <Stat v={`★ ${stars}`} l="stars" />
            <Stat v={`🐟 ${fish}`} l="snacks" />
            <Stat v={`x${bestCombo}`} l="best combo" />
          </div>
          <div className="mt-2 text-[11px] font-bold text-[#a0898a]">Best: {best[character].toLocaleString()}</div>
          <div className="mt-3 flex flex-col gap-2">
            <Btn onClick={start} className="w-full">
              ↻ &nbsp;Try again
            </Btn>
            <Btn small color="#B9A7A4" onClick={backToMenu}>
              Menu
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
type LabTab = "faces" | "poses" | "events" | "extras";
const chip = (active: boolean) =>
  `chip rounded-full px-2.5 py-1 text-[11px] font-black transition-all ${active ? "text-white scale-105" : "bg-white/85 text-[#3B3231] hover:bg-white"}`;

export function LabOverlay() {
  const lab = useGame((s) => s.lab);
  const setLab = useGame((s) => s.setLab);
  const backToMenu = useGame((s) => s.backToMenu);
  const character = useGame((s) => s.character);
  const setCharacter = useGame((s) => s.setCharacter);
  const [tab, setTab] = useState<LabTab>("faces");
  const pal = PALETTES[character];

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
      <div className="pointer-events-auto flex items-start justify-between px-4 pt-3">
        <div>
          <div className="sticker-text text-3xl font-black text-white">Cat Lab</div>
          <div className="sticker-text-sm text-[11px] font-black tracking-widest text-white/90">POKE · PET · TICKLE · POSE</div>
        </div>
        <div className="flex gap-2">
          <Btn
            small
            color={pal.accent}
            onClick={() => {
              setCharacter(character === "peach" ? "goma" : "peach");
              sfx.select();
            }}
          >
            {character === "peach" ? "→ Goma" : "→ Peach"}
          </Btn>
          <Btn small color="#B9A7A4" onClick={backToMenu}>
            ✕
          </Btn>
        </div>
      </div>

      <div className="pointer-events-auto mx-3 mb-3 rounded-3xl border-4 border-white/80 bg-white/70 p-2 backdrop-blur-sm">
        <div className="mb-2 flex gap-1.5">
          {(["faces", "poses", "events", "extras"] as LabTab[]).map((t) => (
            <button key={t} data-ui onClick={() => setTab(t)} className={`flex-1 rounded-full py-1.5 text-[12px] font-black capitalize ${tab === t ? "bg-[#3B3231] text-white" : "bg-white text-[#3B3231]"}`}>
              {t}
            </button>
          ))}
          <button data-ui onClick={() => setLab({ autoTour: !lab.autoTour })} className={`rounded-full px-3 py-1.5 text-[12px] font-black ${lab.autoTour ? "bg-[#FFD35C] text-[#3B3231]" : "bg-white text-[#3B3231]"}`}>
            {lab.autoTour ? "■ Tour" : "▶ Tour"}
          </button>
        </div>
        <div className="scrollbar-none flex max-h-[26vh] flex-wrap gap-1.5 overflow-y-auto">
          {tab === "faces" && (
            <>
              <button data-ui className={chip(lab.expression === null)} style={lab.expression === null ? { background: "#3B3231" } : {}} onClick={() => setLab({ expression: null, autoTour: false })}>
                auto
              </button>
              {EXPRESSION_NAMES.map((n) => (
                <button key={n} data-ui className={chip(lab.expression === n)} style={lab.expression === n ? { background: pal.accent } : {}} onClick={() => setLab({ expression: n, autoTour: false })}>
                  {n}
                </button>
              ))}
            </>
          )}
          {tab === "poses" && (
            <>
              {POSE_NAMES.map((n) => (
                <button key={n} data-ui className={chip(lab.pose === n)} style={lab.pose === n ? { background: "#B08BEA" } : {}} onClick={() => setLab({ pose: n, autoTour: false })}>
                  {n}
                </button>
              ))}
              <div className="mt-1 flex w-full items-center gap-2 px-1 text-[11px] font-black text-[#3B3231]">
                <span>vx</span>
                <input data-ui type="range" min={-9} max={9} step={0.5} value={lab.vx} onChange={(e) => setLab({ vx: +e.target.value })} className="flex-1 accent-[#FF8FAF]" />
                <span>vy</span>
                <input data-ui type="range" min={-25} max={25} step={1} value={lab.vy} onChange={(e) => setLab({ vy: +e.target.value })} className="flex-1 accent-[#8FB8FF]" />
                <button data-ui className="chip rounded-full bg-white px-2 py-0.5" onClick={() => setLab({ vx: 0, vy: 0 })}>
                  0
                </button>
              </div>
            </>
          )}
          {tab === "events" &&
            ALL_EVENTS.map((n) => (
              <button
                key={n}
                data-ui
                className={chip(false)}
                onClick={() => {
                  sfx.click();
                  labBus.fire(n);
                }}
              >
                ⚡ {n}
              </button>
            ))}
          {tab === "extras" && (
            <>
              <div className="w-full px-1 text-[10px] font-black uppercase tracking-widest text-[#a0898a]">Accessory</div>
              {ALL_ACCESSORIES.map((n) => (
                <button key={n} data-ui className={chip(lab.accessory === n)} style={lab.accessory === n ? { background: "#7FB8FF" } : {}} onClick={() => setLab({ accessory: n })}>
                  {n}
                </button>
              ))}
              <div className="mt-1 w-full px-1 text-[10px] font-black uppercase tracking-widest text-[#a0898a]">Emote</div>
              <button data-ui className={chip(lab.emote === null)} style={lab.emote === null ? { background: "#3B3231" } : {}} onClick={() => setLab({ emote: null })}>
                none
              </button>
              {ALL_EMOTES.map((n) => (
                <button key={n} data-ui className={chip(lab.emote === n)} style={lab.emote === n ? { background: "#FFB380" } : {}} onClick={() => setLab({ emote: n })}>
                  {n}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
