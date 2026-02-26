---
phase: quick-1
plan: 1
subsystem: course-landing-page
tags: [visual-design, ui, tailwind, components]
dependency_graph:
  requires: []
  provides: [visually-elevated-course-page]
  affects: [src/app/art-of-living-part-1]
tech_stack:
  added: []
  patterns:
    - 3-layer gradient overlay for cinematic hero backgrounds
    - Decorative oversized background numbers for step cards
    - Dark editorial section pattern (gray-950 with image overlay)
    - hover:-translate-y-* lift effect on interactive cards
    - mix-blend-overlay for image layering over color gradients
key_files:
  created: []
  modified:
    - src/components/course/hero-section.tsx
    - src/components/course/program-overview-section.tsx
    - src/components/course/research-stats-section.tsx
    - src/components/course/course-content-section.tsx
    - src/components/course/testimonials-section.tsx
    - src/components/course/founder-section.tsx
    - src/components/course/numbers-section.tsx
    - src/components/course/media-logos-section.tsx
    - src/components/course/upcoming-dates-section.tsx
    - src/components/course/footer-cta.tsx
decisions:
  - "3-layer gradient hero: from-black/80 bottom-left + from-black/60 top vignette + radial orange highlight at 60%/40% for cinematic depth"
  - "Research stats section uses gray-950 dark background to create strong alternating rhythm with adjacent white sections"
  - "Founder section goes dark (gray-950) to avoid 3 consecutive white sections and add editorial gravitas"
  - "Footer CTA uses mix-blend-overlay for image layering so orange gradient remains dominant with subtle texture"
  - "Upcoming dates eyebrow copy changed to 'Limited Seats Available' (urgency) from generic 'Upcoming Courses'"
metrics:
  duration: ~12min
  completed_date: "2026-02-26"
  tasks_completed: 3
  tasks_total: 4
  files_modified: 10
---

# Quick Task 1: Enhance Overall Visual Quality of Course — Summary

**One-liner:** All 10 course landing page sections redesigned with cinematic hero gradients, dark editorial panels, hover-lift cards, and a layered-gradient footer CTA.

## What Was Built

Full visual redesign of the Art of Living Part 1 course page (`/art-of-living-part-1`), transforming every section from functional-but-flat to visually premium without adding any new dependencies.

### Section-by-Section Changes

**Hero Section** (`hero-section.tsx`)
- Changed `min-h-[70vh]` to `min-h-screen` for full-viewport cinematic impact
- Replaced single overlay with 3-layer gradient system: bottom-left darkness + top vignette + radial orange highlight
- Scaled headline to `text-4xl sm:text-6xl md:text-7xl` with `leading-[1.05]`
- Added decorative primary accent bar above h1
- Added trust signals row with Check icons: "100+ peer-reviewed studies", "800M+ people taught", "44 years of teaching"
- Explicit `bg-primary` on button with `shadow-2xl shadow-primary/40`

**Program Overview Section** (`program-overview-section.tsx`)
- Warm gradient background: `from-background via-muted/20 to-background`
- Decorative 600px blurred radial circle behind content (`bg-primary/5 blur-3xl`)
- Step cards redesigned: `bg-background border border-border/60 rounded-2xl` with `text-6xl font-black text-primary/15` decorative background numbers
- Section heading scaled to `text-4xl sm:text-5xl`

**Research Stats Section** (`research-stats-section.tsx`)
- Dark `bg-gray-950` background with image overlay (`opacity-10`)
- Gradient overlay on image for depth control
- Each stat in card container: `border border-white/10 rounded-xl p-5 bg-white/5 backdrop-blur-sm`
- Stat numbers: `text-5xl sm:text-6xl font-black text-primary`
- Source attribution footer added

**Course Content Section** (`course-content-section.tsx`)
- Clean white `bg-background` (contrast after dark stats)
- Cards: `bg-gradient-to-br from-background to-muted/30 shadow-md hover:shadow-xl hover:-translate-y-0.5`
- Icon containers: gradient + ring-1 that responds to group-hover
- Icons scaled to `h-7 w-7`, padding to `p-7`, title to `font-bold`
- Section heading: `text-3xl sm:text-4xl md:text-5xl`

**Testimonials Section** (`testimonials-section.tsx`)
- Atmospheric gradient background: `from-muted/40 via-background to-primary/5`
- Giant decorative `text-[200px]` quote mark behind content
- Cards: `border border-primary/10 shadow-lg hover:shadow-xl hover:-translate-y-1 bg-background`
- Profile photos with `ring-2 ring-primary/20 ring-offset-2`
- Pull-quote: `text-base font-bold text-primary`

**Founder Section** (`founder-section.tsx`)
- Dark editorial: `bg-gradient-to-br from-gray-950 to-gray-900`
- Image wrapper: `ring-1 ring-white/10 shadow-black/50`
- All text to white/gray-300
- Blockquote: `border-l-4 border-primary pl-6 py-3 bg-white/5 rounded-r-lg`
- Quote text: `text-xl sm:text-2xl text-white`

**Numbers Section** (`numbers-section.tsx`)
- Image opacity reduced `0.50 -> 0.40` (less distraction)
- Stat numbers: `text-4xl sm:text-5xl font-black` (black weight)
- Border accent: `border-l-2 -> border-l-4` (thicker, stronger)
- Heading: `text-3xl sm:text-4xl`

**Media Logos Section** (`media-logos-section.tsx`)
- Section bg: `bg-muted/20`
- Content wrapped in `border border-border/40 rounded-2xl px-8 py-10 bg-background shadow-sm`
- Header text: `text-xs font-bold uppercase tracking-[0.2em]`
- Horizontal separator below header
- Gap increased: `gap-10 md:gap-16`

**Upcoming Dates Section** (`upcoming-dates-section.tsx`)
- Clean white `bg-background`
- Urgency eyebrow: "Limited Seats Available" in `text-xs font-bold text-primary uppercase tracking-widest`
- Section heading: `text-3xl sm:text-4xl md:text-5xl`
- Cards: `border-2 border-border/50 hover:border-primary/40 shadow-sm hover:shadow-lg`
- Date text: `font-bold text-lg`
- Badge: `bg-primary/10 text-primary border-primary/20`
- Course badge: pill style `bg-primary/10 rounded-full px-3 py-1`
- Divider between date info and register button

**Footer CTA** (`footer-cta.tsx`)
- Layered background: gradient `from-primary to oklch(0.65 0.20 45)` + image overlay with `mix-blend-overlay opacity-15` + radial highlight
- Heading: `text-3xl sm:text-4xl md:text-5xl font-black`
- Button: `shadow-2xl shadow-black/20 hover:scale-[1.02]`
- Trust signals row with Check icons below fine print

## Visual Rhythm Achieved

Light (Hero w/ image) → Light (Program Overview) → **Dark** (Research Stats) → Light (Course Content) → Light-gradient (Testimonials) → **Dark** (Founder) → **Dark** (Numbers) → Light (Media Logos) → Light (Upcoming Dates) → **Orange-rich** (Footer CTA)

## Deviations from Plan

None — plan executed exactly as written. All changes used existing Tailwind classes, OKLCH brand palette, and existing next/image imports.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | 4269e5c | Hero, program overview, research stats |
| Task 2 | 2a6a002 | Course content, testimonials, founder, media logos, numbers |
| Task 3 | 28f5fbd | Upcoming dates, footer CTA |

## Status

Tasks 1-3 complete. Task 4 (checkpoint:human-verify) awaits visual review at http://localhost:3000/art-of-living-part-1.

## Self-Check: PASSED

Files verified present:
- src/components/course/hero-section.tsx — FOUND
- src/components/course/program-overview-section.tsx — FOUND
- src/components/course/research-stats-section.tsx — FOUND
- src/components/course/course-content-section.tsx — FOUND
- src/components/course/testimonials-section.tsx — FOUND
- src/components/course/founder-section.tsx — FOUND
- src/components/course/numbers-section.tsx — FOUND
- src/components/course/media-logos-section.tsx — FOUND
- src/components/course/upcoming-dates-section.tsx — FOUND
- src/components/course/footer-cta.tsx — FOUND

Commits verified: 4269e5c, 2a6a002, 28f5fbd — all present in git log.
