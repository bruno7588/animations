# Confetti rain

Depth-tiered confetti rain, extracted from the 5Mins.ai program launch success
screen (the "Success! Your program is now live" celebration). GSAP-driven.

## What's in here

- `../demos/confetti-animation.html` - self-contained, runnable demo. Open it in
  a browser (or run the sandbox: `npm run dev`, then the "Confetti rain" link on
  the index). Dark canvas + a Replay button. GSAP loads from a CDN. This is the
  quickest way to see the animation.
- `Confetti.jsx` + `Confetti.css` - the drop-in React component, ready to
  integrate. Same logic as the demo, using `@gsap/react`'s `useGSAP` and
  `gsap.matchMedia` for reduced motion.

## How it works

- **60 pieces, 3 depth tiers.** Far pieces are smaller, slower, and dimmer; near
  ones are bigger and faster. This parallax is what keeps a flat 2D rain from
  looking flat.
- **Three GSAP tweens per piece:**
  1. **Fall** - `y` from `-10vh` to `110vh`, fading in at 8% and out at 90%.
  2. **Spin + 3D tumble** - `rotation` (2D) plus `rotationX` / `rotationY`
     (with `transformPerspective: 600`), synced to the fall.
  3. **Sway** - a continuous side-to-side `x` yoyo, deliberately unsynced from
     the fall so pieces don't move in lockstep.
- **Spawn window.** New pieces keep starting for `RAIN_S` (3s); each piece's
  `plays` (repeat count) is computed so nothing respawns after the window, and
  in-flight pieces finish their fall naturally.
- **Deterministic.** A sine-hash (`rand`) replaces `Math.random`, so every mount
  produces the identical burst - handy for design review and screenshots.
- **Safe zone.** A radial mask on the layer fades pieces out over the centre so
  they never cross the tick / copy / CTA. Tune the ellipse in `Confetti.css`.

## Integration notes

1. Deps: `gsap` and `@gsap/react`.
2. Render `<Confetti />` inside any `position: relative` (or `absolute`)
   container - it fills the parent and is `pointer-events: none`.
3. The fall uses viewport units (`vh`), so it's built for a full-screen overlay.
   For a smaller bounded container, the parent's `overflow: hidden` clips the
   overshoot (the rain reads fine); or swap `vh` for a fixed pixel fall matched
   to the container height.
4. To unmount the layer once the rain is done, use the exported
   `CONFETTI_DURATION_MS` (time of the last landing) as a timeout, optionally
   with a Framer Motion / CSS fade on exit.
5. Reduced motion: the component renders nothing animated under
   `prefers-reduced-motion: reduce` (the CSS also hides the layer).

## Tuning

All knobs live at the top of `Confetti.jsx`: `COLORS`, `RAIN_S`, piece count
(the `Array.from({ length: 60 })`), and the `TIERS` (scale / opacity / duration
per depth). Piece shape/size is in `Confetti.css` (`.confetti__piece`).
