[PART 1 of 3 | README.md]
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

