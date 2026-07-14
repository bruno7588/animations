# Handoff: Confetti Success Celebration

## Overview
A full-screen success/celebration moment shown after a user completes an action (e.g. publishing a learning program). A green tick badge pops in, a headline + description fade up shortly after, a CTA button follows, and a burst of multi-colored confetti falls from the top of the screen behind everything. Built to the 5Mins design system.

## About the Design Files
The file in this bundle (`Confetti Celebration.dc.html`) is a **design reference created in HTML** — a working prototype showing the intended look, timing, and behavior. It is **not** production code to copy directly. The task is to **recreate this animation in the target codebase's existing environment** (React, Vue, SwiftUI, native, etc.) using its established animation and styling patterns. The prototype drives the animation with **GSAP**; use whatever animation primitive the target app already standardizes on (GSAP, Motion/Framer Motion, CSS keyframes, Lottie, etc.) as long as the timing and easing below are matched.

> The floating **DialKit** control panel in the prototype is a design-time tuning tool only. Do **not** ship it — the values it exposes are already baked in as the defaults documented below.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, sizing, timing, and easing. Recreate pixel- and timing-accurately using the codebase's existing libraries.

## Screen: Celebration
- **Purpose**: Confirm to the user that an action succeeded and celebrate it.
- **Layout**: A single full-bleed container (`100%` × `100vh`, min-height `640px`), `overflow: hidden`, background `#F9F9FA`. Contents centered both axes via flex (column, `align-items: center`, `justify-content: center`).
  - Content column: `display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; padding:24px;` — sits at `z-index:2`.
  - Confetti layer: absolutely positioned `inset:0`, `pointer-events:none`, `z-index:1` (behind the content).

### Components (top to bottom)

**1. Tick badge**
- Wrapper: `72 × 72px`, `position:relative`. Starts at `opacity:0`.
- Pulse ring: absolutely positioned `inset:0`, `border-radius:50%`, `border:3px solid rgba(24,169,87,.4)`. Animates out on entrance (see Interactions).
- SVG (`72×72`, viewBox `0 0 72 72`) — a filled green circle check. Exact paths:
  - Outer/back circle fill `#11763D`
  - Front circle fill `#18A957`
  - Top-left highlight arc fill `#A3DDBC`
  - Check mark stroke `#F9F9FA`, `stroke-width:4`, round caps/joins, path `M23.25 36.0056L31.74 44.4956L48.75 27.5156`
- SVG source is in the design file; copy it verbatim.

**2. Headline**
- Text: **"Success!"**
- Font: Poppins, `font-size:20px`, `font-weight:700`, `line-height:150%`, color `#20222A`.
- Enters `opacity:0 → 1`, `translateY(24px → 0)`.

**3. Description**
- Text: **"Your program is now live."**
- Font: Poppins, `font-size:16px`, `font-weight:400`, `line-height:150%`, color `#6B6F7B`, `max-width:420px`.
- Title + description are wrapped in an 8px-gap column.

**4. CTA button**
- Text: **"Track Progress"**
- Font: Poppins, `font-size:14px`, `font-weight:700`, `line-height:150%`, color `#FFFFFF`.
- Background `#00AFC4`; hover `#00A5B8`; active/pressed `#00838F`. `transition: background 160ms cubic-bezier(.2,0,0,1)`.
- `padding:10px 20px`, `border-radius:16px`, no border, `cursor:pointer`, `margin-top:8px`.
- In the prototype the button replays the animation; in production wire it to its real action (e.g. navigate to progress view).

## Interactions & Behavior

Sequence (all times in seconds from animation start). Easing names are GSAP; equivalents given.

**Phase 1 — Tick (starts at t=0)**
- Tick wrapper: `opacity` set to 1, `scale 0 → 1`, `duration 0.55`, ease `back.out(2.2)` (spring overshoot, ~overshoot 2.2). transform-origin center.
- Check stroke draw-on: stroke-dashoffset `full → 0`, `duration 0.4`, ease `power2.out`, starting `0.2s before` the tick pop finishes (overlaps).
- Pulse ring: `scale 1 → 1.35`, `opacity 1 → 0`, `duration 0.7`, ease `power1.out`, starting `0.35s before` prior step ends.

**Phase 2 — Text & button (small delay after tick)**
- Start delay: **0.55s** from t=0.
- Stagger between the three: **0.18s**.
- Headline: at `0.55s`, `opacity 0→1`, `translateY 24→0`, `duration 0.5`, ease `power3.out`.
- Description: at `0.73s` (0.55 + 0.18), same tween/ease as headline.
- Button: at `0.91s` (0.55 + 0.36), `opacity 0→1`, `translateY 24→0`, `duration 0.5`, ease `back.out(1.7)`.

**Phase 3 — Confetti (starts effectively immediately, behind content)**
- Confetti launches when the animation starts. Each piece has a random start delay of **0 – 0.35s**.
- **Count: 220** pieces (per replay).
- Colors, chosen at random per piece (5Mins gamification palette):
  `#00CEE6, #33E2F7, #8158EC, #9B55C9, #6368DB, #FA715F, #2A90D8, #FFBB38, #18A957, #DF1642`
- Shape mix (random): ~45% rectangle strips, ~30% circles, ~25% thin ribbons.
- Size: random in **6 – 18px** (base dimension). Per shape:
  - Strip: `w = size`, `h = size * 0.45`, `border-radius:2px`
  - Circle: `w = h = size * 0.7`, `border-radius:50%`
  - Ribbon: `w = size * 0.35`, `h = size * 1.6`, `border-radius:999px`
- Spawn: `left` random across full width; start `y = -30 - random(0 .. 30% of height)` (above the top edge), random initial `rotation 0–360°`, initial `scale 0.7–1.4`.
- Fall: `y → containerHeight + 60`, **duration random 2 - 6s per piece**, ease `power1.in` (gravity-like acceleration). Piece is removed from the DOM on completion.
- Horizontal sway: `x → ±(random 0..220px)`, duration = piece fall duration, ease `sine.inOut`.
- Spin: `rotation += (360 + random 0..720)°`, random direction, duration = piece fall duration, linear.
- Tumble: `rotationX → random 0..720°`, duration = piece fall duration, linear (needs 3D — `transform-style:preserve-3d` / GSAP handles via `rotationX`).

**Reset on replay**: check dasharray/offset reset to full, tick `scale:0 opacity:0`, ring `scale:1 opacity:1`, text/button `opacity:0 translateY(24)`, confetti layer cleared (`innerHTML=""`) before re-launch.

## State Management
- Minimal. A single imperative "play" trigger (on mount, and on CTA in the prototype). No persisted state.
- If reused as a reusable component, expose props for the copy (`title`, `subtitle`, `buttonLabel`) and an `onCtaClick` callback.

## Design Tokens
**Colors**
- Page background: `#F9F9FA`
- Ink / headline: `#20222A`
- Muted text: `#6B6F7B`
- Button: base `#00AFC4`, hover `#00A5B8`, active `#00838F`
- Tick greens: `#11763D`, `#18A957`, `#A3DDBC`; check stroke `#F9F9FA`; ring `rgba(24,169,87,.4)`
- Confetti palette: `#00CEE6, #33E2F7, #8158EC, #9B55C9, #6368DB, #FA715F, #2A90D8, #FFBB38, #18A957, #DF1642`

**Typography** — Poppins (400 / 700)
- Headline: 20px / 700 / 150%
- Description: 16px / 400 / 150%
- Button: 14px / 700 / 150%

**Spacing** — content column gap `24px`; title/description gap `8px`; button `margin-top 8px`; container padding `24px`.

**Radii** — button `16px`; tick ring `50%`; confetti `2px` / `50%` / `999px`.

**Motion**
- Tick pop: 0.55s `back.out(2.2)`
- Check draw: 0.4s `power2.out`
- Pulse ring: 0.7s `power1.out`
- Text/button: 0.5s `power3.out` (button `back.out(1.7)`), start 0.55s, stagger 0.18s
- Confetti fall: random 2–6s per piece `power1.in`; sway/spin/tumble = same duration; per-piece start delay 0–0.35s
- Button color transition: 160ms `cubic-bezier(.2,0,0,1)`

## Assets
- Tick SVG: inline in the design file (paths listed above). No external image.
- Font: Poppins (Google Fonts) — or the app's existing Poppins.
- No raster assets.

## Files
- `Confetti Celebration.dc.html` — the full prototype (markup + GSAP logic). The `<helmet>` loads GSAP and Poppins; the logic class holds the timeline in `play()` and the confetti in `launchConfetti()`.

## Notes for implementers
- Confetti sits **behind** the tick/text/button (`z-index`), so it reads as a backdrop, not an overlay.
- Respect `prefers-reduced-motion`: consider showing the end state (tick + text + button visible, no confetti) when the user opts out of motion.
- Confetti pieces are created/destroyed per run — pool or cap them if the celebration can fire rapidly.
