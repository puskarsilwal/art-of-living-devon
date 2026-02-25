---
phase: 05-course-landing-page
plan: "02"
subsystem: ui-sections
tags: [hero, program-overview, research-stats, media-logos, next-image, server-components]
dependency_graph:
  requires:
    - src/lib/data/course-stats.ts (from 05-01)
    - public/images/course/break-free.webp (from 05-01)
    - public/images/course/cnn.svg (from 05-01)
    - public/images/course/harvard.webp (from 05-01)
    - public/images/course/yoga-journal.webp (from 05-01)
    - public/images/course/washington-post.webp (from 05-01)
  provides:
    - HeroSection component
    - ProgramOverviewSection component
    - ResearchStatsSection component
    - MediaLogosSection component
  affects:
    - src/app/(landing)/happiness-program/page.tsx (assembly in 05-03)
tech_stack:
  added: []
  patterns:
    - "next/image fill prop for full-bleed hero (Phase 3 established pattern)"
    - "TrendingUp/TrendingDown from lucide-react keyed on direction field"
    - "Static data inline for program overview steps (no data import needed)"
    - "External CTA anchor wrapping shadcn Button with target=_blank"
key_files:
  created:
    - src/components/course/hero-section.tsx
    - src/components/course/program-overview-section.tsx
    - src/components/course/research-stats-section.tsx
    - src/components/course/media-logos-section.tsx
  modified: []
decisions:
  - "Hero eyebrow badge uses bg-white/20 with backdrop-blur-sm (same glass style as intro hero)"
  - "Program overview inline copy (no data module) — 3-step static flow fits directly in component"
  - "ResearchStatsSection uses bg-muted/30 to visually distinguish from adjacent white bg sections"
  - "MediaLogos opacity-70 hover:opacity-100 for subtle interactive quality without animation library"
metrics:
  duration: "~2 minutes"
  completed: "2026-02-25"
  tasks_completed: 2
  files_created: 4
---

# Phase 5 Plan 02: Top Four Sections Summary

**One-liner:** Four Server Component files for the hero, program overview, research stats, and media logos sections — the above-the-fold and first-impression credibility blocks of the Happiness Program course page.

## What Was Built

### Task 1: Hero Section + Program Overview Section

**src/components/course/hero-section.tsx**

Full-bleed hero following the exact next/image fill + gradient overlay pattern established in Phase 3 (intro hero). Structure matches specification precisely:
- `relative overflow-hidden min-h-[70vh] flex items-center` outer section
- Absolute `div` containing `Image` with `fill` prop and `object-cover` class
- Absolute `bg-gradient-to-b from-black/70 via-black/50 to-black/60` overlay
- Relative z-20 content with Badge, H1 headline, subheadline, and Register Now CTA
- Headline: "Breathe Out Stress From Day One" (exact copy from CONTEXT.md)
- CTA links to `https://www.artofliving.org/gb-en/courses/art-of-living-part-one` with `target="_blank" rel="noopener noreferrer"`
- Below CTA: "Free to register • Devon & Southwest • Online & In-Person"

**src/components/course/program-overview-section.tsx**

"What is the Happiness Program?" section with:
- 2-paragraph overview covering 3 days, 3 hours/day, Sudarshan Kriya, pranayama, yoga, meditation, and Art of Living Foundation founding history (Sri Sri Ravi Shankar, 1982)
- 3-step flow with numbered primary-colored badges: (1) Clear Stress, (2) Experience Meditation, (3) Connect to Inner Peace
- Secondary CTA: "View Upcoming Dates" as anchor href="#upcoming-dates" using outline Button variant

### Task 2: Research Stats Section + Media Logos Section

**src/components/course/research-stats-section.tsx**

Credibility centrepiece importing `courseStats` from `@/lib/data/course-stats`:
- `bg-muted/30` section background for visual distinction
- Section header: "Backed by 100+ Independent Studies"
- Sub-header citing Yale, Harvard, AIIMS
- `grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8` layout (6 stats in 2 rows)
- Each card: large `text-4xl sm:text-5xl font-bold text-primary` percentage + TrendingUp (calm=up, social connection=up) or TrendingDown (anxiety, insomnia, cortisol, depression) icon inline
- Label and optional timeframe below — no Card wrappers (clean unboxed stats)

**src/components/course/media-logos-section.tsx**

Press credibility bar with actual quotes:
- `bg-background` section, "As Featured In" eyebrow label
- 2-column mobile / 4-column md+ grid
- All 4 logos use next/image (not img): CNN (80x32 .svg), Yoga Journal (120x40 .webp), Harvard Health Publishing (120x40 .webp), The Washington Post (140x40 .webp)
- Each logo has quote below in `text-xs italic text-muted-foreground`
- opacity-70 with hover:opacity-100 transition for subtle interactivity

## Commits

| Hash | Message |
|------|---------|
| f4689a6 | feat(05-02): add hero section and program overview section |
| 8b6f1fd | feat(05-02): add research stats section and media logos section |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] `src/components/course/hero-section.tsx` — exists, uses `fill` prop on Image
- [x] `src/components/course/program-overview-section.tsx` — exists, 3-step flow, href="#upcoming-dates"
- [x] `src/components/course/research-stats-section.tsx` — exists, imports courseStats, TrendingUp/TrendingDown mapped by direction
- [x] `src/components/course/media-logos-section.tsx` — exists, 4 logos with quotes via next/image
- [x] All Register Now CTAs link to artofliving.org/gb-en with target=_blank
- [x] `npx tsc --noEmit` — exit 0, no errors
- [x] `npm run build` — exits 0 cleanly
- [x] Commits f4689a6 and 8b6f1fd exist
