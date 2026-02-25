---
phase: 03-intro-talk-landing-page-trust-content
plan: "08"
subsystem: intro-landing-page
tags: [visual-overhaul, photo-cards, dark-section, about-section, gap-closure]
dependency_graph:
  requires: ["03-07"]
  provides: ["gap-14-closed", "gap-16-closed", "gap-17-closed"]
  affects: ["src/components/intro/benefits-section.tsx", "src/components/intro/credibility-section.tsx", "src/components/intro/about-section.tsx", "src/app/(landing)/intro/page.tsx"]
tech_stack:
  added: []
  patterns: ["next/image fill with circular overflow-hidden", "dark full-bleed 2-column section", "bg-gray-950 near-black section"]
key_files:
  created:
    - src/components/intro/about-section.tsx
  modified:
    - src/components/intro/benefits-section.tsx
    - src/components/intro/credibility-section.tsx
    - src/app/(landing)/intro/page.tsx
decisions:
  - "Circular photo cards using rounded-full + overflow-hidden with next/image fill — no CSS border-radius on img tag needed"
  - "CredibilitySection uses bg-gray-950 (Tailwind built-in) — no custom CSS required for near-black"
  - "AboutSection background bg-muted/30 for subtle distinction from benefits bg-muted/50 without introducing new colors"
  - "AboutSection image uses order-first lg:order-last to show image above text on mobile, right of text on desktop"
metrics:
  duration: "~2min"
  completed: "2026-02-25"
  tasks_completed: 3
  files_modified: 4
---

# Phase 03 Plan 08: Visual Overhaul — Photo Cards, Dark Credibility, About Section Summary

Closed gaps 14, 16, 17 from human review: replaced abstract icon cards with 3 circular photo cards in benefits, rewrote credibility section as a dark dramatic 2-column layout (bg-gray-950), and created a new AboutSection with Gurudev founding narrative and 4-stat organization tiles.

## What Was Built

### Task 1: BenefitsSection — 3 Circular Photo Cards (Gap 14)

Completely rewrote `benefits-section.tsx`. Replaced the 4-icon card grid with 3 circular photo cards using existing lifestyle images from disk.

- `breathing-session.jpg` — SKY Breath Meditation card
- `meditation-group.jpg` — Deep Rest & Better Sleep card
- `teacher-guiding.jpg` — Expert Guidance, Warm Community card

Each card uses `rounded-full overflow-hidden` with `next/image fill` for proper circular crop. Added `ring-4 ring-primary/20` for a subtle brand-colored ring. Section heading updated to eyebrow + main headline pattern: "Real Techniques. Real Results. Real People."

Removed: `Wind`, `Moon`, `Users`, `GraduationCap` from lucide-react; `Card`, `CardContent` from shadcn/ui.

### Task 2: CredibilitySection — Dark Dramatic 2-Column (Gap 16)

Completely rewrote `credibility-section.tsx`. Transformed from a light `bg-muted/50` card-grid into a dark full-bleed `bg-gray-950` 2-column section.

- Left column: `meditation-group.jpg` at `opacity-60` with dual gradient overlays (horizontal + vertical) for legibility, bold headline overlaid at the bottom
- Right column: `credibilityStats` 2x2 grid with large primary-colored numbers, divider, then `researchHighlights` narrative list with `▸` bullet markers

Retained `credibilityStats` and `researchHighlights` data imports unchanged. Removed: all lucide-react icon imports, `iconMap` object, `Badge`, `Button` from shadcn/ui.

### Task 3: AboutSection — Organization Backstory + Page Wiring (Gap 17)

Created new `src/components/intro/about-section.tsx` with:

- "About the Art of Living" eyebrow + "40 Years of Bringing Peace to the World" heading
- Two narrative paragraphs: founding by Gurudev Sri Sri Ravi Shankar in 1981, volunteer non-profit growth to 180 countries / 500M+ lives
- 4-fact tile grid: 40+ years, 180 countries, 500M+ lives, 10,000+ volunteer teachers
- `teacher-guiding.jpg` as lifestyle image in right column (4:3 aspect ratio, rounded-2xl)
- Mobile: image appears above text (`order-first`); desktop: image on right (`lg:order-last`)

Updated `page.tsx` to import and render `<AboutSection />` between `<TeacherSection />` and `<ObjectionsSection />`. Updated inline comment to 12-step funnel order.

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit` passes with zero errors after each task
- `npm run build` completes successfully after Task 3 with all 4 routes static
- Section order confirmed: Hero → SessionIntro → Benefits → Credibility → MediaLogos → Testimonials → WhatToExpect → Teacher → About → Objections → Form → FooterCTA

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 7c3c19a | feat(03-08): rewrite BenefitsSection — 3 circular photo cards replacing icon cards |
| 2 | da1ac5c | feat(03-08): rewrite CredibilitySection — dark dramatic 2-column layout |
| 3 | 973c408 | feat(03-08): create AboutSection and wire into page.tsx |

## Self-Check: PASSED

- `src/components/intro/benefits-section.tsx` — modified, contains `rounded-full`
- `src/components/intro/credibility-section.tsx` — modified, contains `bg-gray-950`
- `src/components/intro/about-section.tsx` — created, exports `AboutSection`
- `src/app/(landing)/intro/page.tsx` — modified, contains `AboutSection`
- All 3 commits confirmed in git log
