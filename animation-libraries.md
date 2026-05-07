# Animation Libraries: Instructions for Claude Code

Reference guide for using **@gsap/react** and **Framer Motion** (now **Motion**) when building React prototypes and components. Read this before adding animations to any React work.

## Library overview

| Library | Package | Repo | Current version |
|---|---|---|---|
| GSAP for React | `@gsap/react` (peer: `gsap`) | https://github.com/greensock/react | 2.1.2 |
| Framer Motion / Motion | `motion` (or legacy `framer-motion`) | https://github.com/motiondivision/motion | 12.x |

**Important note on Framer Motion:** Framer Motion has been renamed to **Motion**. The `framer-motion` package still works as a compatibility shim, but for new code prefer `import { motion } from "motion/react"`. Both come from the same repo at `motiondivision/motion`.

## When to use which

Pick based on the job, not loyalty. Both can coexist in the same project.

- **Reach for Framer Motion / Motion when:** building UI with declarative state-driven motion, layout transitions (`layout`, `layoutId`), gesture handling (drag, hover, tap), exit animations on unmount (`AnimatePresence`), shared element transitions, or simple variants. It is React-native, low ceremony, and reads well in JSX.
- **Reach for @gsap/react when:** building complex timelines, scroll-driven sequences (ScrollTrigger), SVG path morphs, text splitting and word/char animation (SplitText), physics-y fine control, or anything where you need deep imperative control over many tweens. GSAP is also framework-agnostic, so the same skills carry across vanilla JS, Vue, etc.
- **Both at once is fine.** Use Framer Motion for component-level interactions and GSAP for orchestrated sequences and scroll work in the same page.

## Installation

```bash
# Framer Motion (new name)
npm install motion

# Framer Motion (legacy name, still maintained)
npm install framer-motion

# GSAP + React hook
npm install gsap @gsap/react
```

For server components in Next.js app router, files using either library need `"use client"` at the top.

## @gsap/react: core patterns

The whole point of `@gsap/react` is the `useGSAP()` hook. It is a drop-in replacement for `useEffect` / `useLayoutEffect` that auto-cleans up via `gsap.context()`. Forgetting cleanup is the #1 GSAP-in-React mistake; this hook removes that footgun.

### Basic usage

```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP); // register once to avoid React version mismatches

function Box() {
  const container = useRef(null);

  useGSAP(() => {
    // selector text is auto-scoped to `container`
    gsap.to(".box", { x: 200, rotation: 360, duration: 1 });
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="box">animate me</div>
    </div>
  );
}
```

### Config object (preferred over a bare deps array)

```jsx
useGSAP(() => {
  gsap.to(".box", { x: endX });
}, {
  dependencies: [endX],
  scope: container,
  revertOnUpdate: true, // cleanly revert on dep change
});
```

### Event handlers: use `contextSafe`

If you attach a handler that fires GSAP code outside the hook body, wrap it with `contextSafe` so cleanup still works.

```jsx
const container = useRef(null);

const { contextSafe } = useGSAP({ scope: container });

const onClick = contextSafe(() => {
  gsap.to(".box", { rotation: 180 });
});

return <div ref={container}><button onClick={onClick}>spin</button></div>;
```

### Plugins

```jsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
```

All bonus plugins (SplitText, MorphSVG, etc.) are now free thanks to Webflow's acquisition of GreenSock; no Club GSAP login required.

### GSAP gotchas

- Always register `useGSAP` and any plugins before first use.
- Do not put GSAP code inline in render; wrap it in `useGSAP`.
- If you forget to scope, selector text searches the whole document, which is rarely what you want.
- Default deps array is `[]`; if you need state-reactive animation, pass `dependencies` explicitly.

## Framer Motion / Motion: core patterns

### Basic motion component

```jsx
import { motion } from "motion/react"; // or "framer-motion" on legacy

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
/>
```

### Variants for orchestrated state

```jsx
const list = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

<motion.ul variants={list} initial="hidden" animate="visible">
  {items.map(i => <motion.li key={i} variants={item}>{i}</motion.li>)}
</motion.ul>
```

### Exit animations

`AnimatePresence` is required for any component that animates on unmount. Children must have a stable `key` prop.

```jsx
import { AnimatePresence, motion } from "motion/react";

<AnimatePresence mode="wait">
  {open && (
    <motion.div
      key="drawer"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  )}
</AnimatePresence>
```

`mode="wait"` runs exit before enter; default `"sync"` overlaps them.

### Layout animations

Add `layout` to auto-animate position and size changes. Add `layoutId` for shared element transitions across components.

```jsx
<motion.div layout className="card" />

// Shared element
<motion.div layoutId="hero-image" />
```

### Gestures

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
/>
```

### Framer Motion gotchas

- `AnimatePresence` only animates direct children that conditionally render; wrapping a parent that always exists will not trigger exit.
- Each animated child inside `AnimatePresence` needs a unique, stable `key`.
- `layout` animations can be expensive on large lists; combine with `LayoutGroup` and avoid nesting `layout` inside `layout` unless needed.
- Prefer transform-based properties (`x`, `y`, `scale`, `rotate`) over `top` / `left` / `width` for performance.
- For Next.js app router, add `"use client"` to any file using `motion`.

## Decision shortcut

> Animating a single component reacting to state or props? Framer Motion.
> Animating a sequence, a scroll-driven story, or fine-grained timeline? GSAP.
> Animating list reorder, modal enter/exit, or drag? Framer Motion.
> Animating SVG paths, text splits, or anything across many elements with precise offsets? GSAP.

## Quick links

- GSAP React guide: https://gsap.com/resources/React/
- @gsap/react repo: https://github.com/greensock/react
- GSAP main repo: https://github.com/greensock/GSAP
- Motion docs: https://motion.dev
- Motion repo: https://github.com/motiondivision/motion
- Motion examples: https://examples.motion.dev

## House rules for prototypes

- Default to Framer Motion for component-level work; reach for GSAP only when the timeline gets non-trivial.
- Keep `transition` durations short (150 - 300ms) for UI feedback, longer (400 - 800ms) for set-piece motion.
- Respect `prefers-reduced-motion`; both libraries support it (`useReducedMotion` in Motion, `gsap.matchMedia()` in GSAP).
- Do not animate layout properties when a transform will do.
