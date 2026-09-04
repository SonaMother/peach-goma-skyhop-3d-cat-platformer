# 🍑 Peach & Goma: SkyHop 🐾

A cozy **3D vertical hopping platformer** starring two procedurally-rigged cats — **Peach** (the pink one) and
**Goma** (the grey one). Hop forever upward across springy platforms, dissolve-through clouds, bounce pillows,
trampolines, slippery ice and crumbling ledges, dodge grumpy storm clouds, grab power-ups, collect hearts, fish &
stars, and hug cat companions along the way. Fall off the screen and it's game over!

Built as a single-page web app with **React Three Fiber** and a fully **procedural, data-driven cat rig** — no 3D
model files anywhere: every whisker, ear flop, toe bean and tail whip is math.

---

## ✨ Features

### 🐱 The cats (living character engine)
- **Two playable cats** — Peach & Goma, each with a palette *and a personality* (energy, shyness, floppiness) that changes how they move
- **39 expressions** blended over ~35 continuous facial channels: heart eyes, star eyes, dizzy spirals, shocked pin-pupils, half-lidded smug, winks, toothy grins, screams, bleh tongue, pouts, anger marks, tears, sweat, cheek puffs, shivers…
- **39 motion states** — idle, walk, run, rise, apex, fall, plummet, land, super-jump, trampoline spin, rocket, balloon float, glide, stunned, hurt, slip, balance, sit, hug, wave, celebrate, dance, sleep, yawn, stretch, groom, peek, shiver, pounce, think, bow, yum, laugh, proud…
- **Secondary motion everywhere** — squash & stretch, belly & cheek jiggle, 2-D head follow-through driven by acceleration, seam-free ears with tip-lag dynamics that flap in the wind, whiskers, a 6-link whip tail, two-bone arms with paw pads & toe beans
- **Autonomous life** — blinking (with double blinks), 2-D look-around, ear/whisker/tail twitches, and an **idle-fidget library**: stretch, groom, think (?), peek, yawn, wave, dance, and eventually **dozing off with zzz** — startle them awake!
- **Emote bubbles** — ! ? ♥ ♥♥♥ zzz ♪ 💦 ✨ 💢 and orbiting dizzy stars
- **Accessories** — balloon, rocket pack (with flame), shield bubble, umbrella, fish snack
- **Interactive** — poke the head (meow!), tickle the belly (giggle!), pull the tail (grumble!), pet them (purr ♥)
- **🔬 Cat Lab** — a showcase mode to preview every expression / pose / event / emote / accessory, with simulated velocity sliders and an auto-tour

### 🗺️ The game
- Procedural platforms with a difficulty curve: `normal`, `moving`, `cloud` (dissolves), `pillow` (super jump), `spring` trampoline (flip!), `ice` (slippery), `crumble` (shakes then falls), plus 🌵 cactus hazards
- **Power-ups**: 🚀 rocket (blast off, zaps enemies), 🎈 balloon (gentle float), 🛡️ shield (one free hit), 🧲 magnet (pulls collectibles)
- **Collectibles**: hearts, fish snacks (yum!), stars
- ⛈️ **Grump** storm clouds that get angrier when you're near and bonk you dizzy
- **Perfect-landing combos** — land dead-center for PERFECT x2, x3… (the cat gets determined, then smug 😏)
- **Companions** waiting for a hug — sitting, reading, waving or sleeping (they wake up startled when you get close)
- Milestones every 100 m, new-best celebrations, near-miss reactions, world-edge wrap
- 5 sky tiers (dawn → day → dusk → night → outer space with a ringed planet), drifting clouds, birds, sun/moon
- Synthesized WebAudio SFX (meows, purrs, giggles, boings…) — no audio files
- Mobile-friendly: touch, device tilt, portrait layout

## 🎮 Controls

| Action | Keyboard | Touch / Mobile |
| --- | --- | --- |
| Move left / right | `←` `→` or `A` `D` | touch & hold left / right half of screen, or tilt |
| Pause | `P` / `Esc` | pause button |
| Mute | `M` | mute button |

Deep-links: `#play`, `#gameover`, `#lab`.

## 🛠️ Tech stack

React 19 + TypeScript · Three.js via @react-three/fiber · Zustand · Vite + Tailwind CSS 4 (+ single-file build) ·
hand-rolled toon shading, inverted-hull outlines and spring physics.

## 🚀 Getting started

```bash
npm install
npm run dev
npm run build
```

## 📁 Project structure

```
src/
├── App.tsx                 # Canvas, lights, phase routing
├── character/              # 🐱 THE CAT RIG (see src/character/README.md)
│   ├── Cat.tsx             # procedural rig: springs, poses, expressions, emotes, accessories, fidgets, poke zones
│   ├── poses.ts            # 39 motion states
│   ├── expressions.ts      # 39 facial presets
│   ├── palettes.ts         # colours + personality per cat
│   ├── springs.ts          # Spring / Spring2 / Chain + easing
│   └── materials.ts, Part.tsx
├── game/
│   ├── world.ts            # platform / item / enemy generation & difficulty curve
│   ├── store.ts            # zustand game store (phase, run stats, power-ups, lab state)
│   ├── useInput.ts         # keyboard / pointer / tilt
│   └── sfx.ts              # synthesized sounds
├── scenes/                 # MenuScene, GameScene, GameOverScene, LabScene
├── world/                  # Backdrop, Particles (12 fx kinds), Platform, Items (+ Grump), geometries
└── ui/                     # HUD, menus, Cat Lab panel, sky gradient
```

## 🧪 Extending the cats

Everything is data — add a pose to `poses.ts`, an expression to `expressions.ts`, a fidget to `FIDGETS`, an
event reaction to `EVENT_FLASH` / `EVENT_EMOTE`, or a whole new cat to `palettes.ts`, and it instantly works
everywhere (including the Cat Lab). Full guide in [`src/character/README.md`](src/character/README.md).

---

## 🤖 For AI agents & programmatic access

**Start here:** [`AGENT_PROMPT.txt`](AGENT_PROMPT.txt) — a 5.7 KB, tag-proof, plain-text
instruction sheet an agent can follow verbatim: channel decision tree, anti-hallucination
rules, assembly steps, and sanity anchors. Point your agent at its raw URL and it needs
nothing else:
`https://raw.githubusercontent.com/SonaMother/peach-goma-skyhop-3d-cat-platformer/main/AGENT_PROMPT.txt`

Pick the first channel your toolset supports:

1. **Shell** → `git clone https://github.com/SonaMother/peach-goma-skyhop-3d-cat-platformer.git`
2. **Can download + unzip** → [`gameproject.zip`](gameproject.zip) (byte-exact archive of all sources)
3. **Code execution, no unzip** → GitHub contents API returns JSON with **base64** content — tag-proof by construction:
   `https://api.github.com/repos/SonaMother/peach-goma-skyhop-3d-cat-platformer/contents/<path>?ref=main`
   (decode `.content` with `atob` / `base64 -d`; works for `gameproject.zip` itself too)
4. **Fetch-only agent (no shell)** → use **[`bundle/INDEX.json`](bundle/INDEX.json)** + the listed `bundle/shard-NN.json`.
   Built for the worst observed fetchers: they HTML-strip tags **even inside JSON**, collapse newlines, and
   truncate large responses. Every bundle file is **single-line JSON ≤ 8 KB containing zero raw `< > &`**
   (escaped as `\u003c` etc.) — there is literally nothing for such converters to alter. Files bigger than one
   shard are split into ordered parts: group shard entries by `path`, sort by `seq`, concatenate `text`, and
   verify every per-part and per-file `sha256` (quote real hash strings, never summarize). `package-lock.json`
   is regenerable via `npm install` if you want to skip its 9 parts.
   Mirror (serves proper `application/json`): `https://cdn.jsdelivr.net/gh/SonaMother/peach-goma-skyhop-3d-cat-platformer@main/bundle/INDEX.json`
5. **Humans / normal markdown readers** → [`RECREATE_PROJECT.md`](RECREATE_PROJECT.md) (single-file bundle with
   the same data in marked text blocks — avoid this one if your fetcher strips tags).

⚠️ Do **not** reconstruct this project from memory or partial fetches — the cat rig is ~2,600 lines of dense
procedural code that hallucinated rewrites will not reproduce. Always verify against the `sha256` manifest.

---

Made with 🧶, springs, and a lot of ear twitches.
