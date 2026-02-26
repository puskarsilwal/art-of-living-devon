---
phase: quick-1
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/course/hero-section.tsx
  - src/components/course/program-overview-section.tsx
  - src/components/course/research-stats-section.tsx
  - src/components/course/course-content-section.tsx
  - src/components/course/testimonials-section.tsx
  - src/components/course/founder-section.tsx
  - src/components/course/numbers-section.tsx
  - src/components/course/upcoming-dates-section.tsx
  - src/components/course/media-logos-section.tsx
  - src/components/course/footer-cta.tsx
  - src/app/globals.css
autonomous: false
requirements: []

must_haves:
  truths:
    - "Course page hero feels premium and full-bleed with strong typographic hierarchy"
    - "Section backgrounds alternate with clear visual rhythm — not all flat white"
    - "Research stats read as powerful data, not floating numbers"
    - "Course content cards feel elevated with depth and color"
    - "Footer CTA is visually commanding, not a plain orange box"
  artifacts:
    - path: "src/components/course/hero-section.tsx"
      provides: "Full-viewport hero with layered gradient, large type, trust signals"
    - path: "src/components/course/research-stats-section.tsx"
      provides: "Dark dramatic stats section with bold numbers and context"
    - path: "src/components/course/footer-cta.tsx"
      provides: "Rich CTA with background texture and visual depth"
  key_links:
    - from: "globals.css"
      to: "all section components"
      via: "new utility classes used in component className props"
      pattern: "section-|text-gradient|card-glass"
---

<objective>
Elevate the Art of Living Part 1 course landing page from functional-but-flat to visually premium.

Purpose: The page converts visitors from Facebook ads. Visual quality signals trust and seriousness. Every section should feel like it belongs on a top-tier wellness brand website.

Output: All 10 course components redesigned with richer backgrounds, stronger typography, better visual hierarchy, and more compelling layouts.
</objective>

<execution_context>
@/Users/mac/.claude/get-shit-done/workflows/execute-plan.md
@/Users/mac/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/Users/mac/Documents/Art of Living Landing Page/.planning/STATE.md

Key decisions already in place:
- OKLCH color system, --primary is brand orange oklch(0.75 0.18 55)
- Inter font via next/font/google
- Tailwind v4 (no config file — uses @theme inline in globals.css)
- shadcn/ui components (Card, Button, Badge)
- next/image for all images
- No animation libraries — use Tailwind transitions only
- Images available: /images/course/break-free.webp, /images/course/sudarshan-kriya.webp, /images/course/about-art-of-living.webp
</context>

<tasks>

<task type="auto">
  <name>Task 1: Elevate hero, program overview, and research stats — the above-the-fold experience</name>
  <files>
    src/components/course/hero-section.tsx
    src/components/course/program-overview-section.tsx
    src/components/course/research-stats-section.tsx
  </files>
  <action>
    **hero-section.tsx** — Make it full-viewport and cinematically layered:
    - Change `min-h-[70vh]` to `min-h-screen` for full-viewport impact
    - Replace the single gradient overlay with a 3-layer system: (1) `bg-gradient-to-br from-black/80 via-black/50 to-transparent` bottom-left darkness, (2) a second absolute div with `bg-gradient-to-t from-black/60 via-transparent to-black/20` for top vignette, (3) a subtle radial highlight: `bg-[radial-gradient(ellipse_at_60%_40%,oklch(0.75_0.18_55/0.15),transparent_60%)]`
    - Scale up headline: `text-4xl sm:text-6xl md:text-7xl` with `leading-[1.05]`
    - Add a decorative accent bar above the h1: `<div className="w-16 h-1 rounded-full bg-primary mx-auto mb-6" />`
    - Add trust signals row below CTA: 3 inline items with checkmark icons (import `Check` from lucide-react) — "100+ peer-reviewed studies", "800M+ people taught", "44 years of teaching" — displayed as `flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-white/70`
    - CTA button: add `bg-primary hover:bg-primary/90` explicitly and increase shadow to `shadow-2xl shadow-primary/40`

    **program-overview-section.tsx** — Transform the plain white section:
    - Change background to a warm gradient: `className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background py-24 px-4 sm:px-6"`
    - Add a decorative blurred circle behind the content: `<div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden><div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" /></div>`
    - Replace the numbered circles with more dramatic step cards: each step gets a `div` with `bg-background border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow` and the number becomes a large `text-6xl font-black text-primary/15 leading-none mb-2` decorative background number, with the title as `text-xl font-bold` and description as `text-muted-foreground text-sm leading-relaxed`
    - Section heading: increase to `text-4xl sm:text-5xl font-bold`

    **research-stats-section.tsx** — Make it dramatic and dark:
    - Change to a dark section with a rich background: `className="relative overflow-hidden bg-gray-950 py-20 px-4 sm:px-6"`
    - Add image background from sudarshan-kriya.webp using next/image with `fill`, `className="object-cover opacity-10"`, inside `<div className="absolute inset-0 z-0">`
    - Add gradient overlay on top of image: `<div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950/90" />`
    - All content gets `relative z-20`
    - Change heading color to `text-white`
    - Change subheading to `text-gray-400`
    - Each stat: instead of plain div, use a card-like container: `border border-white/10 rounded-xl p-5 bg-white/5 backdrop-blur-sm` flex column, centered
    - Stat numbers: `text-5xl sm:text-6xl font-black text-primary` (larger and bolder)
    - Labels: `text-sm font-medium text-gray-300`
    - Timeframes: `text-xs text-gray-500`
    - Grid: `grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6`
    - Add a bottom CTA link: `<p className="text-center mt-10 text-sm text-gray-500">Source: peer-reviewed journals including NIMHANS, Yale, AIIMS</p>`
  </action>
  <verify>
    Run `cd "/Users/mac/Documents/Art of Living Landing Page" && npm run build 2>&1 | tail -20`
  </verify>
  <done>Build passes with zero TypeScript or JSX errors. Hero is full-viewport. Research stats section is dark/dramatic. Program steps use decorative large numbers.</done>
</task>

<task type="auto">
  <name>Task 2: Elevate course content cards, testimonials, founder section, and media logos</name>
  <files>
    src/components/course/course-content-section.tsx
    src/components/course/testimonials-section.tsx
    src/components/course/founder-section.tsx
    src/components/course/media-logos-section.tsx
    src/components/course/numbers-section.tsx
  </files>
  <action>
    **course-content-section.tsx** — Make cards feel premium:
    - Section background: `bg-background py-20 px-4 sm:px-6` (white, clean contrast after dark stats)
    - Each card: replace `border border-border/50 bg-background shadow-sm` with `group border border-border/60 bg-gradient-to-br from-background to-muted/30 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200`
    - Icon container: replace `bg-primary/10 p-3` with `bg-gradient-to-br from-primary/20 to-primary/5 p-3.5 ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all` — adds a subtle ring that responds to hover
    - Icon: increase to `h-7 w-7`
    - Module title: `font-bold text-base` (bold not semibold)
    - CardContent padding: `p-7` (more breathing room)
    - Section heading: `text-3xl sm:text-4xl md:text-5xl font-bold`

    **testimonials-section.tsx** — Create atmosphere:
    - Section background: `relative overflow-hidden bg-gradient-to-br from-muted/40 via-background to-primary/5 py-20 px-4 sm:px-6`
    - Add decorative large quote mark as background: inside section before the content div, add `<div className="absolute top-10 left-1/2 -translate-x-1/2 text-[200px] font-serif text-primary/5 leading-none select-none pointer-events-none" aria-hidden>&ldquo;</div>`
    - Cards: change `border-0 shadow-md` to `border border-primary/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 bg-background`
    - Photo: keep `h-20 w-20 rounded-full` but add `ring-2 ring-primary/20 ring-offset-2`
    - Pull-quote highlight: make slightly larger `text-base font-bold text-primary`
    - Name: `font-bold text-sm`
    - Section heading: `text-3xl sm:text-4xl font-bold`

    **founder-section.tsx** — Make it more editorial:
    - Section: `className="relative overflow-hidden bg-gradient-to-br from-gray-950 to-gray-900 text-white py-20 px-4 sm:px-6 lg:py-28"`  — dark background for contrast and gravitas
    - Image wrapper: add `ring-1 ring-white/10` to the rounded-xl div, keep `shadow-xl` but add `shadow-black/50`
    - Eyebrow label: change to `text-primary` (already primary color, but add `text-base` and `font-bold`)
    - Heading: `text-white text-3xl sm:text-4xl md:text-5xl`
    - Paragraphs: `text-gray-300`
    - Blockquote: replace `border-l-4 border-primary pl-5 py-2` with `border-l-4 border-primary pl-6 py-3 bg-white/5 rounded-r-lg`
    - Quote text: `italic text-xl sm:text-2xl text-white leading-relaxed`
    - Cite: `text-primary font-bold`

    **media-logos-section.tsx** — Give it a contained, editorial feel:
    - Section background: `bg-muted/20 py-14 px-4 sm:px-6`
    - Wrap the grid in a `max-w-5xl mx-auto border border-border/40 rounded-2xl px-8 py-10 bg-background shadow-sm`
    - Header text: `text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-8`
    - Add a horizontal separator below header: `<div className="w-12 h-px bg-border mx-auto mb-8" />`
    - Keep logos as-is but increase gap to `gap-10 md:gap-16`

    **numbers-section.tsx** — Refine the dark stats panel (already good, minor polish):
    - Image opacity: increase from `opacity-50` to `opacity-40` for less distraction
    - Add gradient to left panel: the existing gradient `lg:bg-gradient-to-r lg:from-transparent lg:to-gray-950` is good, no change needed there
    - Stats numbers: increase to `text-4xl sm:text-5xl font-black` (black weight for maximum impact)
    - Border accent: change `border-l-2 border-primary` to `border-l-4 border-primary` for stronger visual marker
    - Heading: `text-3xl sm:text-4xl font-bold`
  </action>
  <verify>
    Run `cd "/Users/mac/Documents/Art of Living Landing Page" && npm run build 2>&1 | tail -20`
  </verify>
  <done>Build passes. Course content cards have hover lift. Testimonials section has atmospheric background. Founder section is dark and editorial. Numbers section stats use font-black weight.</done>
</task>

<task type="auto">
  <name>Task 3: Elevate upcoming dates cards and footer CTA, then verify full page visually</name>
  <files>
    src/components/course/upcoming-dates-section.tsx
    src/components/course/footer-cta.tsx
  </files>
  <action>
    **upcoming-dates-section.tsx** — This is the primary conversion section, must feel premium:
    - Section: `bg-background py-20 px-4 sm:px-6` (clean white, maximum focus on cards)
    - Add an urgency eyebrow above section heading: `<p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Limited Seats Available</p>`
    - Section heading: `text-3xl sm:text-4xl md:text-5xl font-bold`
    - CourseDateCard redesign: wrap the entire Card in a `group` className on a wrapper div, or add `group` to Card itself
      - Card: `group border-2 border-border/50 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-200`
      - CardContent: `p-6`
      - Date text: `font-bold text-lg` (larger, bolder)
      - Location/time: `text-sm text-muted-foreground mt-1`
      - Badge: change `variant="secondary"` to a custom class `bg-primary/10 text-primary border-primary/20 font-semibold text-xs` using the Badge's className prop
      - Course badge (e.g. "Most Popular"): `text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1 inline-block` instead of plain text
      - Register button: `w-full group-hover:bg-primary/90 transition-colors`
      - Add a divider between date info and button: `<div className="border-t border-border/40 my-4" />`

    **footer-cta.tsx** — Transform from flat orange box to visually commanding finale:
    - Change section to `relative overflow-hidden` with a layered background:
      - Main background: `bg-gradient-to-br from-primary via-[oklch(0.72_0.19_50)] to-[oklch(0.65_0.20_45)]` for depth in the orange
      - Add a full-bleed image layer using sudarshan-kriya.webp: `<div className="absolute inset-0 z-0"><Image src="/images/course/sudarshan-kriya.webp" alt="" fill className="object-cover opacity-15 mix-blend-overlay" /></div>`
      - Add a radial gradient highlight: `<div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.18_55/0.3),transparent_70%)]" aria-hidden />`
      - All content gets `relative z-20`
    - Heading: `text-3xl sm:text-4xl md:text-5xl font-black` (maximum weight, this is the closer)
    - Subtext: `text-lg text-primary-foreground/85`
    - Button: keep `variant="secondary"` but add `shadow-2xl shadow-black/20 hover:scale-[1.02] transition-transform`
    - Add a row of 3 trust signals below the fine print (same pattern as hero):
      `<div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-6 text-sm text-primary-foreground/60">` with Check icons (import Image from next/image already imported — import Check from lucide-react instead): "No prior experience needed", "Online and In-Person options", "44 years, 180 countries"
    - Fine print: increase to `mt-6` spacing

    Import `Image` from `next/image` and `Check` from `lucide-react` in footer-cta.tsx.
  </action>
  <verify>
    Run `cd "/Users/mac/Documents/Art of Living Landing Page" && npm run build 2>&1 | tail -20`
  </verify>
  <done>Build passes with zero errors. Footer CTA has image overlay and gradient depth. Upcoming dates section has border-highlight hover on cards. Page has strong visual rhythm: light → dark (research) → light → dark (founder) → light (dates) → orange-rich (footer).</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Full visual redesign of the Art of Living Part 1 course landing page. All 10 sections updated:
    - Hero: full-viewport, 3-layer gradient, larger type, trust signal row
    - Program Overview: warm gradient bg, oversized decorative step numbers
    - Research Stats: dark dramatic section with image overlay and card-style stat blocks
    - Course Content: premium hover cards with gradient fill and ring accents
    - Testimonials: atmospheric gradient bg with giant decorative quote mark, hover-lift cards
    - Founder: dark editorial section (gray-950 bg) with elevated quote styling
    - Numbers: font-black stat numbers, thicker border accents
    - Media Logos: contained editorial panel with border
    - Upcoming Dates: conversion-focused cards with border-highlight hover and urgency eyebrow
    - Footer CTA: image-layered gradient with radial highlight, trust signals
  </what-built>
  <how-to-verify>
    1. Run the dev server: `cd "/Users/mac/Documents/Art of Living Landing Page" && npm run dev`
    2. Open http://localhost:3000/art-of-living-part-1 in browser
    3. Scroll top to bottom and check each section:
       - Hero fills full viewport with cinematic overlay? Large bold headline?
       - Program steps show oversized faded number behind each card?
       - Research stats section is dark/dramatic with card-style blocks?
       - Course content cards lift on hover with gradient fill?
       - Testimonials have the atmospheric background and big decorative quote mark?
       - Founder section is dark (gray-950) and editorial?
       - Upcoming dates cards highlight border on hover?
       - Footer CTA has depth and texture (not flat orange)?
    4. Check mobile (resize to ~390px width): all sections stack cleanly, text readable
  </how-to-verify>
  <resume-signal>Type "approved" if visuals look premium, or describe specific sections that need adjustment</resume-signal>
</task>

</tasks>

<verification>
- `npm run build` passes with zero errors after each task
- No new external dependencies introduced (all changes are Tailwind classes, CSS, and existing imports)
- next/image used correctly for all image additions (fill prop requires positioned parent)
- All OKLCH color values use the established brand palette
</verification>

<success_criteria>
Page feels visually premium from top to bottom. Strong section rhythm: alternating light/dark backgrounds create contrast. Hero commands attention. Research stats are dramatic. Footer CTA is a compelling close. No section looks like a generic Tailwind template.
</success_criteria>

<output>
After completion, create `.planning/quick/1-enhance-overall-visual-quality-of-course/1-SUMMARY.md`
</output>
