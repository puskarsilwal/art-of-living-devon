---
phase: quick-1
plan: 1
subsystem: course-landing-page
tags: [visual-design, ui, tailwind, components, photography]
dependency_graph:
  requires: []
  provides: [visually-elevated-course-page]
  affects: [src/app/art-of-living-part-1]
tech_stack:
  added: []
  patterns:
    - 3-layer gradient overlay for cinematic hero backgrounds
    - Decorative oversized background numbers for step cards
    - Warm amber/orange gradient for science/stats sections (light, inviting)
    - Photo strip (2-up grid) for visual breathing room between content blocks
    - Full-width atmospheric photo with subtle bottom vignette
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
  - "All dark backgrounds removed per user feedback — page stays bright and inviting throughout"
  - "Research Stats uses warm amber-50/orange-50 gradient instead of dark — matches brand warmth without going dark"
  - "Founder section uses from-slate-50 to-amber-50/40 — cool-to-warm subtle gradient keeps it light but distinctive"
  - "Numbers section: image at full opacity with warm amber bg on right panel — image does the visual heavy lifting"
  - "Program Overview: breathing-session.jpg strip between text and cards — breaks up text, adds humanity"
  - "Course Content: teacher-guiding.jpg + meditation-group.jpg 2-up strip — shows the actual experience before describing it"
  - "Footer CTA retains orange gradient as the one dark-adjacent section — acceptable as the closing call to action"
metrics:
  duration: ~20min
  completed_date: "2026-02-26"
  tasks_completed: 4
  tasks_total: 4
  files_modified: 10
---

# Quick Task 1: Enhance Overall Visual Quality of Course — Summary

**One-liner:** All 10 course landing page sections redesigned to feel premium and bright — cinematic hero, warm stat sections, real photography throughout, elevated hover-lift cards, and a layered footer CTA.

## What Was Built

Full visual redesign of the Art of Living Part 1 course page (`/art-of-living-part-1`), executed in two passes: initial elevation (Tasks 1-3) then a user-directed revision to remove all dark backgrounds and add real photography.

### Final Section-by-Section State

**Hero Section** (`hero-section.tsx`)
- Full-viewport `min-h-screen` for cinematic impact
- 3-layer gradient: bottom-left darkness + top vignette + radial orange highlight
- Headline scaled to `text-4xl sm:text-6xl md:text-7xl` with `leading-[1.05]`
- Decorative primary orange accent bar above h1
- Trust signals row with Check icons: "100+ peer-reviewed studies", "800M+ people taught", "44 years of teaching"

**Program Overview Section** (`program-overview-section.tsx`)
- Warm gradient background with blurred radial glow
- Full-width `breathing-session.jpg` atmospheric photo strip between text and step cards
- Step cards with `text-6xl font-black text-primary/15` decorative background numbers

**Research Stats Section** (`research-stats-section.tsx`)
- Warm light gradient `from-amber-50 via-orange-50/50 to-white`
- Subtle radial glow instead of image overlay
- Each stat in `bg-white shadow-sm border-orange-100` light card
- Stat numbers remain `text-5xl sm:text-6xl font-black text-primary`

**Course Content Section** (`course-content-section.tsx`)
- 2-up photo strip: `teacher-guiding.jpg` + `meditation-group.jpg` before module cards
- Cards: gradient fill + hover lift + icon ring accents

**Testimonials Section** (`testimonials-section.tsx`)
- Atmospheric gradient bg: `from-muted/40 via-background to-primary/5`
- Giant decorative 200px quote mark behind content
- Cards: hover lift + primary/10 border + photo rings

**Founder Section** (`founder-section.tsx`)
- Light warm `from-slate-50 to-amber-50/40` (no dark)
- `about-art-of-living.webp` community photo
- Blockquote: `bg-primary/5 rounded-r-lg` warm pill styling
- Standard foreground text throughout

**Numbers Section** (`numbers-section.tsx`)
- Light `bg-amber-50/40` split layout
- `sudarshan-kriya.webp` at full opacity on the left
- `font-black` stat weights, `border-l-4` accent lines

**Media Logos Section** (`media-logos-section.tsx`)
- Contained editorial panel: `border border-border/40 rounded-2xl bg-background shadow-sm`
- Separator line below "As Featured In" header

**Upcoming Dates Section** (`upcoming-dates-section.tsx`)
- Urgency eyebrow: "Limited Seats Available"
- Cards: `border-2 hover:border-primary/40` highlight on hover
- Pill-style course badge; divider before button

**Footer CTA** (`footer-cta.tsx`)
- Layered orange gradient + `sudarshan-kriya.webp` with `mix-blend-overlay`
- Radial highlight + `font-black` heading + hover-scale button
- Trust signals row with Check icons

### Visual Rhythm (Final)

Light (Hero) → Light-gradient (Program + photo) → Warm-amber (Stats) → Light (Content + photos) → Light-gradient (Testimonials) → Warm-cream (Founder) → Warm-amber (Numbers + photo) → Light (Media) → Light (Dates) → Orange-rich (Footer)

## Deviations from Plan

### User Feedback Revision

**Issue:** Initial design used `bg-gray-950` dark backgrounds on Research Stats, Founder, and Numbers sections.

**User request:** Remove all dark backgrounds. Page should feel bright and inviting. Also add real photography to text-heavy sections.

**Changes made in revision commit (0facad5):**
1. Research Stats: dark gray-950 → warm amber gradient; frosted dark cards → white cards
2. Founder: dark gray-950 → slate-50/amber-50 light gradient; white text → standard foreground
3. Numbers: dark gray-950 → amber-50/40 warm bg; image at full opacity
4. Program Overview: added `breathing-session.jpg` atmospheric photo strip
5. Course Content: added `teacher-guiding.jpg` + `meditation-group.jpg` two-up photo strip

## Commits

| Pass | Commit | Description |
|------|--------|-------------|
| Task 1 | 4269e5c | Hero, program overview, research stats (initial) |
| Task 2 | 2a6a002 | Course content, testimonials, founder, media logos, numbers (initial) |
| Task 3 | 28f5fbd | Upcoming dates, footer CTA |
| Revision | 0facad5 | Remove dark backgrounds, add photos to text-heavy sections |

## Self-Check: PASSED

All 10 modified files verified present. All 4 commits verified in git log.
Build: `npm run build` passes with zero TypeScript/JSX errors after each commit.
