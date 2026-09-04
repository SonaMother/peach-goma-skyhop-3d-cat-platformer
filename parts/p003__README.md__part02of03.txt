[PART 2 of 3 | README.md]
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

**Start here:** [`AGENT_PROMPT.txt`](AGENT_PROMPT.txt) — a 3.4 KB, tag-proof, plain-text
instruction sheet an agent can follow verbatim: two one-fetch calibration probes, then a
channel decision tree, anti-hallucination rules, and sanity anchors. Point your agent at
its raw URL and it needs nothing else:
`https://raw.githubusercontent.com/SonaMother/peach-goma-skyhop-3d-cat-platformer/main/AGENT_PROMPT.txt`

Pick the first channel your toolset supports:

1. **Shell** → `git clone https://github.com/SonaMother/peach-goma-skyhop-3d-cat-platformer.git`
2. **Can download + unzip** → [`gameproject.zip`](gameproject.zip) (byte-exact archive of all sources)
3. **Code execution, no unzip** → GitHub contents API returns JSON with **base64** content — tag-proof by construction:
   `https://api.github.com/repos/SonaMother/peach-goma-skyhop-3d-cat-platformer/contents/<path>?ref=main`
   (decode `.content` with `atob` / `base64 -d`; works for `gameproject.zip` itself too)
4. **Fetch-only agent (no shell)** → **simple parts walk** (easiest): fetch
   [`PARTS_INDEX.md`](PARTS_INDEX.md) and follow *THE LOOP*. The repo's 34 source files are
   pre-split into [`parts/`](parts/) — tiny plain-text `p001…p081` files, each ≤ 100 lines and
   ≤ 4,000 bytes (caps chosen from measured 38.7 B/line average, safely under every observed
   truncation cap). Each part's first line is a header `[PART k of n | path]`; the agent
   creates/appends the target file as it reads — write-as-you-read, no JSON, no decoding.
   If the agent's fetcher strips tag-like text (a known failure mode), the identical
   [`parts-esc/`](parts-esc/) set stores angle brackets and ampersands as backslash-u
   escape sequences to be replace-all'd back after each file.
5. **Fetch-only, hardest fetchers** → JSON bundle: [`bundle/INDEX.json`](bundle/INDEX.json) +
   `bundle/shard-NN.json`. Single-line JSON ≤ 8 KB with zero raw `< > &`, for agents that
   strip tags even inside JSON and collapse newlines. Parts table, per-part and per-file
   `sha256` inside; `package-lock.json` is regenerable via `npm install`.
   Mirror (serves proper `application/json`): `https://cdn.jsdelivr.net/gh/SonaMother/peach-goma-skyhop-3d-cat-platformer@main/bundle/INDEX.json`
