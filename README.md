# 🍑 Peach & Goma: SkyHop 🐾

A cozy **3D vertical hopping platformer** starring two procedurally-rigged cats — **Peach** (the pink one) and **Goma** (the grey one). Hop forever upward across springy platforms, dissolve-through clouds, bounce pillows, collect hearts, and hug cat companions along the way. Fall off the screen and it's game over!

Built as a single-page web app with **React Three Fiber** and a fully **procedural, data-driven cat rig** — no 3D model files anywhere: every whisker, ear flop, and tail wobble is math.

---

## ✨ Features

- 🐱 **Two playable cats** — Peach & Goma, each with their own palette (add more by adding a palette entry)
- 🧩 **Procedural character rig** — spring-driven poses, facial expressions, blinking, look-around, ear twitches, velocity-based lean & stretch, and one-shot reaction events (land squash, ear flop, squint…)
- 🗺️ **Procedural platform generation** with a difficulty curve:
  - `normal` platforms
  - `moving` platforms that drift side to side
  - `cloud` platforms that dissolve after you land
  - `pillow` platforms that launch you sky-high (super jump)
  - helper platforms appear when the gap gets scary
- 💗 **Hearts & hugs** — collect hearts, and every ~40–60 units of altitude a companion cat sits waiting for a hug (with cheering!)
- 🎈 **Squash & stretch physics** — gravity, drag, springy landings, pillow launches
- 🌈 **Sky tiers** — the backdrop changes as you climb
- 🔊 **WebAudio SFX** — all synthesized, no audio files
- 📱 **Mobile-friendly** — touch input, device tilt support, portrait layout, PWA-ish meta tags
- 🏆 **Best scores** per character saved in `localStorage`

## 🎮 Controls

| Action | Keyboard | Touch / Mobile |
| --- | --- | --- |
| Move left / right | `←` `→` or `A` `D` | touch & hold left / right half of screen |
| Move (optional) | — | device tilt |
| Start / restart | click / tap | click / tap |
| Pause | `P` (in-game UI) | pause button |
| Mute | mute button | mute button |

Debug deep-links: open `#play` to jump straight into a run, `#gameover` for the game-over screen.

## 🛠️ Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://drei.docs.pmnd.rs/)
- [Zustand](https://zustand.docs.pmnd.rs/) for game state
- [Vite](https://vite.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) (+ `vite-plugin-singlefile` for a single-file production build)
- Toon shading + inverted-hull ink outlines, custom spring physics — all hand-rolled

## 🚀 Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

## 📁 Project structure

```
src/
├── App.tsx              # Canvas, lights, phase routing, layout shell
├── character/           # 🐱 THE CAT RIG (data-driven, see src/character/README.md)
│   ├── Cat.tsx          #   procedural rig: springs, poses, expressions, reactions
│   ├── poses.ts         #   body motion states (arms, legs, ears, tail, squash…)
│   ├── expressions.ts   #   facial presets (eyes, brows, mouth, blush, tears…)
│   ├── palettes.ts      #   colors per character (add a cat here!)
│   ├── materials.ts     #   toon shading + ink outline materials
│   ├── Part.tsx         #   shared rig part primitive
│   └── springs.ts       #   spring math helpers
├── game/
│   ├── world.ts         # platform types, procedural generation, difficulty curve
│   ├── store.ts         # zustand game store (phase, score, hearts, hugs, best…)
│   ├── useInput.ts      # keyboard / pointer / tilt input
│   └── sfx.ts           # synthesized WebAudio sound effects
├── scenes/              # MenuScene, GameScene, GameOverScene
├── world/               # Backdrop, Particles, Platform rendering, geometries
├── ui/                  # HUD, menus, overlays, sky gradient
└── utils/               # cn() class helper
```

## 🧪 Extending the cats

Everything about the cats is **data-driven** — add a pose to `poses.ts`, an expression to `expressions.ts`, or a whole new cat to `palettes.ts`, and it instantly works everywhere. Full guide in [`src/character/README.md`](src/character/README.md).

```ts
const driver = useRef(createDriver());
<Cat palette={PALETTES.peach} driver={driver} />

driver.current.state = "fall";        // any MotionState
driver.current.events.push("land");   // one-shot squash / ear flop / squint
```

---

Made with 🧶, springs, and a lot of ear twitches.
