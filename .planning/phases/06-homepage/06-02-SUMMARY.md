---
phase: 06-homepage
plan: 02
subsystem: homepage-components
tags: [hero, offerings, server-component, next-image, lucide-icons]
dependency_graph:
  requires: []
  provides: [HeroSection, OfferingsSection]
  affects: [homepage-assembler-06-04]
tech_stack:
  added: []
  patterns: [full-bleed-hero-with-next-image, three-column-card-grid, pure-server-component]
key_files:
  created:
    - src/components/home/hero-section.tsx
    - src/components/home/offerings-section.tsx
  modified: []
decisions:
  - Home hero reuses breathing-session.jpg from intro talk hero — same high-quality meditation imagery
  - Offerings data inlined in component (3 static items, no separate data module needed)
  - CalendarDays icon for Community Events card; Phase 7 comment on /events href for forward compatibility
  - Card default includes gap-6 in flex-col — icon and title flow naturally without extra mt utilities needed
metrics:
  duration: 1min
  completed: 2026-02-25
---

# Phase 6 Plan 02: HeroSection and OfferingsSection Summary

**One-liner:** Full-bleed homepage hero with Devon/Southwest identity and dual CTAs, plus three-column offering cards routing visitors to intro, course, and events.

## What Was Built

### Task 1: HeroSection (feat(06-02): add HeroSection component for homepage)
**Commit:** eb8702c

Built `src/components/home/hero-section.tsx` — a full-bleed homepage hero section matching the intro talk page hero pattern. Uses next/image with `breathing-session.jpg` as the background, dark gradient overlay for readability, an eyebrow badge ("Devon & Southwest"), headline "Breathe. Meditate. Transform.", a subheadline referencing the local community, and two CTAs stacked on mobile / inline on desktop: primary "Register for a Free Intro Talk" → /intro, secondary "Explore Our Courses" → /happiness-program (outline variant with white border).

### Task 2: OfferingsSection (feat(06-02): add OfferingsSection component for homepage)
**Commit:** 7b0014a

Built `src/components/home/offerings-section.tsx` — three-column offering card grid. Static offerings array inline in the component for the three offerings: Intro Talk (Wind icon, /intro), Part 1 Course (BookOpen icon, /happiness-program), Community Events (CalendarDays icon, /events with Phase 7 comment). Each card uses shadcn Card with icon in a primary/10 rounded circle, title, description paragraph, and a full-width CTA button. hover:shadow-lg transition on cards for subtle interactivity.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] src/components/home/hero-section.tsx exists
- [x] src/components/home/offerings-section.tsx exists
- [x] Commit eb8702c exists (Task 1)
- [x] Commit 7b0014a exists (Task 2)
- [x] TypeScript compiles cleanly (npx tsc --noEmit — zero errors)
- [x] HeroSection: breathing-session.jpg background, Devon & Southwest badge, two CTAs to /intro and /happiness-program
- [x] OfferingsSection: three cards with /intro, /happiness-program, /events hrefs; Phase 7 comment on /events

## Self-Check: PASSED
