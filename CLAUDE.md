# CLAUDE.md

Instructions for Claude Code when working in this repository. Read this first, every session.

## Project context

This repo is an animation-focused workspace: prototypes, experiments, and components built around motion. Deliverables are usually self-contained React components or pages that demonstrate or refine an animation idea.

These are not production apps. State, error handling, and persistence should stay minimal unless the brief explicitly asks for them.

## Tech stack

- **React + JSX** (TSX only when asked); single-file components where possible
- **Framer Motion / Motion** for component-level animation, gestures, layout, and exit transitions
- **@gsap/react** for timelines, scroll-driven sequences, SVG and text effects, and anything imperative
- **Tailwind** for layout where useful, plain CSS where it reads better

## Animation reference

`animation-libraries.md` is the source of truth for both libraries: when to pick which, install commands, hook patterns, common gotchas. Read it before writing animation code, even on familiar APIs.

## Animation defaults

- UI feedback motion: 150 - 300ms
- Set-piece motion: 400 - 800ms
- Animate transforms (`x`, `y`, `scale`, `rotate`, `opacity`); avoid `top`, `left`, `width`, `height`
- Respect `prefers-reduced-motion`: `useReducedMotion()` in Motion, `gsap.matchMedia()` in GSAP
- For Next.js app router, add `"use client"` to any file using either library
- Each animated child inside `AnimatePresence` needs a unique, stable `key`
- After writing JSX, validate with `@babel/parser` before saving

## Writing style

- Direct and concise; no fluff
- **Never use em dashes (—).** Use commas, semicolons, or spaced hyphens ` - ` instead
- State assumptions inline rather than asking clarifying questions for low-stakes decisions

## What not to do

- Do not animate layout properties when a transform will do
- Do not skip cleanup; for GSAP, that means using `useGSAP()`, not raw `useEffect` with `gsap.to`
- Do not nest `layout` animations inside `layout` animations unless the effect genuinely requires it
- Do not introduce a third animation library unless the brief explicitly asks
- Do not narrate the work step-by-step; build it and surface the result

## Default deliverable shape

- A single runnable `.jsx` file in the relevant folder
- A short summary (3 - 5 lines) of what was built, what was assumed, and any open questions
