# 5mins Design System

> A reconstruction of the 5mins.ai product design system, built from the Figma **Library.fig** attached to this project.

## What is 5mins?

**5mins.ai** is an AI-powered skills learning platform. Content is organised around **5-minute skills**: short, gamified lessons employees can complete in the flow of work. The product has three surfaces visible in the design library:

- **Admin** — dark-chrome dashboard where L&D teams build pathways, run reports, and manage people.
- **Web App** — the learner's desktop experience (For You, My Team, Knowledge Hub, Feed, Profile, Admin).
- **Mobile App** — native-style learner experience with bottom tab bar (Home, Search, Progress, Feed, Profile).

The brand leans into gamification: quizzes (Blaze, Flash Poll, Certificate, Case Study), streaks, badges, progress rings, skill tags and certificates.

## Sources

- **Figma file:** `Library.fig` (mounted virtually in this project). Top-level pages include Cover, Logo, Typography, Colour, Icons (65 frames, Vuesax set), Spacing, Shadow, Utilities, and per-component pages (Alert, Buttons, Cards, Gamification, Navigation, Dialog-Modal-Sheet, Table, etc).
- **Brand marks:** the `5Mins.ai` wordmark is set in **Harabara Mais Demo**; the logomark is a cyan (#00D3BF / #33E2F7) rounded-triangle with a "5M" ligature in Poppins Bold.
- **Assets extracted:** `assets/logomark-path.svg` (the M-path from the Figma logo symbol). Other icons and illustrations are referenced via Vuesax-style linear/bold sets (see Iconography).

---

## CONTENT FUNDAMENTALS

**Voice**
- Warm, direct, active. Second person ("**you** finished", "**your** quiz resets").
- Never corporate. Copy sounds like a coach, not a compliance doc.
- Short: titles are verbs or outcomes ("Give feedback that lands", "Designing with AI").
- Time is a flex — "5 mins", "25 mins", "today", "this week" — reinforcing the micro-learning promise.

**Casing**
- **Sentence case** everywhere (titles, buttons, nav items). Never Title Case.
- Brand is always written **5Mins.ai** (capital M, lowercase ".ai").

**Tone by surface**
- Admin: neutral, functional ("Breadcrumb › Breadcrumb", "Title of this page", "Supporting text"). Less personality, more clarity.
- Learner (Web + Mobile): motivating, playful. Streaks, celebration toasts ("Nice work!"), "🔥 12 day streak".

**Emoji** — used sparingly for gamification only (🔥 streak, ✓ completed, ★ skill). Never in Admin / system UI.

**Examples**
- `"You earned the "Feedback Pro" skill badge."`
- `"7 of 10 mins today"`
- `"3 skills are due this week."`

---

## VISUAL FOUNDATIONS

**Colors**
- **Primary:** cyan/teal ramp — `#CCF8FD` → `#00CEE6` (500) → `#002C31`. The iconic brand cyan is `#33E2F7` (logomark bg) / `#00D3BF` (cover). Used for accents, progress bars, primary CTAs on dark, links on light.
- **Neutral:** cool slate — `#F9F9FA` (page), `#EFF0F2` (muted), `#20222A` (canonical dark surface used in Admin / mobile). Text ink is `#20222A` / `#262933`.
- **Semantic:** full 9-stop ramps for Success (green `#18A957`), Warning (orange `#FFA538`), Danger (crimson `#DF1642`), Secondary (amber `#FFBB38`).
- **Gamification:** each activity type owns a dedicated hue — Blaze `#8158EC`, Flash Poll `#9B55C9`, Certificate `#6368DB`, Lesson `#FA715F`, Case Study `#2A90D8`. AI-generated content gets a **cyan→purple radial gradient**.

**Type**
- **Poppins** for everything (Regular 400, Medium 500, Bold 700). H1 32 / H2 24 / H3 20 / H4 16 / H5 14 / H6 12, all at 150% line-height (H6 at 140%). Body L/M/S at 16/14/12.
- **Harabara Mais Demo** is the display face — used only for the wordmark ("5Mins"). Substituted with **Anton** from Google Fonts until real files are provided.
- Display headings live at 48px / 150% bold.

**Backgrounds**
- Light mode: flat `#F9F9FA` page with `#FFFFFF` cards. No gradients on page surfaces.
- Dark mode (chrome, modals, toast, cover): flat `#20222A`.
- The only gradients in the system are the **AI radial** (cyan → purple) and the cyan-to-teal thumb gradient on learning cards. No bluish-purple page washes.
- Cover and section headers in the Figma library use `#CCF8FD` (pale cyan) as a section-start band.

**Borders, dividers, cards**
- Card: `16px` radius, white, **Shadow S** (`-1 -1 4 rgba(32,34,42,.06), 1 1 4 rgba(32,34,42,.06)` — a soft double-edge). No borders.
- Input / row dividers: 1px `#DFE1E6` (neutral-100).
- Focus ring: `3px` of `rgba(0,206,230,.18)` + `#00CEE6` border.

**Corner radii** — 4 / 8 / 12 / 16 / 20 / ∞ (pill). Buttons use `8px`. Cards use `16px`. Pill radius is reserved for status chips, filter chips, avatars, and the streak chip.

**Shadow system** (from Figma, 3 tiers):
- `S` — card / row surface.
- `L` — popover / dropdown / menu.
- `XL` — modal / sheet / toast.

**Spacing** — 4px base; canonical stops 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 72 · 80 · 96 · 160. Section padding is almost always `56px` in the Figma library.

**Animation & motion**
- Fast, subtle. Transitions use `120–320ms cubic-bezier(.2,0,0,1)`.
- Fades and color transitions dominate. Gamification moments (streaks, badges) get a brief bounce/scale. No aggressive parallax or slide-up sheets on desktop.

**Hover / press states**
- Hover: primary goes one step darker (500 → 600). Outlined/ghost get a `neutral-50` wash.
- Press: a further step darker (600 → 700). No shrink/scale by default; gamification celebration buttons may scale `.98`.
- Focus: 3px cyan ring (alpha .18) + border becomes `primary-500`.

**Transparency & blur** — blur is **not** used in the system. Transparency appears only in overlays (modal scrim ~ `rgba(32,34,42,.5)`) and shadow alphas.

**Imagery vibe** — warm, human, vibrant but not oversaturated. Smiling faces, real workplaces. Avatars are crisp round crops. No B&W, no heavy grain, no AI-surrealism.

**Layout rules**
- Admin + Web app: fixed 240px left sidebar, 70px top bar, 1296px content column at L breakpoint (1536px total).
- Mobile: 375×812 (iPhone mental model), 90px top nav, 66px bottom tab bar.
- Content uses 24px page padding on desktop, 16px on mobile.

---

## ICONOGRAPHY

5mins uses the **Vuesax icon set** as its primary system — both the `linear` and `bold` variants are embedded in the Figma library under `/Icons`. Common glyphs: `arrow-right`, `arrow-down`, `add`, `tick-circle`, `more-horizontal`, `spinner`, `CollectionPlay`, plus category systems (Business, Users, School-Learning, Security, etc.).

- **Style:** outlined `linear` for navigation, filled `bold` for selected / emphatic states.
- **Sizes:** 16, 20, 24, 32 px. 24px is the default in navigation.
- **Stroke weight:** 1.5–2px for linear.
- **Skill category icons:** a dedicated set (`Icons/Skill Icon/Learning Program Design & Delivery`, etc.) — colored tiles used on skill cards.
- **Emoji:** used in gamification/celebration only (🔥 ✓ ★). Never in system UI.
- **Unicode as icons:** `✓ × ! i` appear inside small circle chips for inline alerts.

Because the Vuesax Figma set isn't licensed for CDN redistribution, this skill **substitutes [Lucide](https://lucide.dev) via CDN** as the nearest open match (same stroke weight, same linear feel). Flag any mismatch back to the user and swap in real Vuesax exports when available.

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

---

## Repository index

| Path | What's in it |
|---|---|
| `README.md` | This file. |
| `SKILL.md` | Entry point for Claude Code / Agent Skills. |
| `colors_and_type.css` | All design tokens — color, type, spacing, radii, shadow, motion — as CSS vars. |
| `assets/` | Extracted SVGs (logomark path) and brand visual assets. |
| `preview/` | Design-system cards rendered in the project's Design System tab (type, colors, spacing, components, brand). |
| `ui_kits/learner-web/` | Learner Web App UI kit (see its own README). |

---

## Caveats

- **Harabara Mais Demo** font files were not available; we've substituted **Anton** (Google Fonts) as the nearest geometric display sans. Please drop the real `.ttf`/`.woff2` into `assets/fonts/` to restore brand accuracy.
- The **Vuesax icon set** can't be redistributed via CDN; we fall back to Lucide. For production, export the in-Figma SVGs into `assets/icons/` and switch the skill's icon base.
- Illustrations and marketing imagery referenced in Figma were pixel-blobs in the library and not copied out (low resolution). Provide hi-res originals when you have them.
