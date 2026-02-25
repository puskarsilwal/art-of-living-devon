---
phase: 06-homepage
plan: 03
subsystem: ui
tags: [nextjs, react, tailwind, server-components]

# Dependency graph
requires:
  - phase: 06-homepage
    provides: HeroSection and OfferingsSection (plan 02)
  - phase: 03-intro-talk-landing-page-trust-content
    provides: credibility-stats.ts data module and teacher-guiding.jpg image
provides:
  - AboutSection with credibility stats grid and mission statement
  - LocalGuidesSection with Devon/SW local framing and teacher photo
  - FooterCta full-bleed orange section with /intro CTA
affects: [06-04-assembler, homepage-page-tsx]

# Tech tracking
tech-stack:
  added: []
  patterns: [pure server components, next/image fill prop for responsive imagery, bg-primary full-bleed CTA section]

key-files:
  created:
    - src/components/home/about-section.tsx
    - src/components/home/local-guides-section.tsx
    - src/components/home/footer-cta.tsx
  modified: []

key-decisions:
  - "AboutSection renders stats from credibilityStats data module (not inlined) — single source of truth for 500M+, 180+, 100+, Yale & Harvard"
  - "LocalGuidesSection reuses /images/intro/teacher-guiding.jpg consistent with intro page teacher imagery"
  - "FooterCta uses bg-primary with Button variant=secondary — matches Phase 05-04 course page footer pattern"

patterns-established:
  - "Full-bleed footer CTA: bg-primary section + white text + secondary variant Button links to /intro"
  - "Local identity framing: eyebrow 'Your Local Guides' + Devon/Southwest England copy in teacher section"

requirements-completed: [HOME-03, HOME-04]

# Metrics
duration: 2min
completed: 2026-02-25
---

# Phase 6 Plan 03: AboutSection, LocalGuidesSection, and FooterCta Summary

**Three lower-page homepage components: credibility stats strip with mission statement, Devon/SW local teacher section reusing intro imagery, and full-bleed orange footer CTA to /intro**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-25T22:19:50Z
- **Completed:** 2026-02-25T22:20:37Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- AboutSection with 4-stat responsive grid (500M+, 180+, 100+, Yale & Harvard) imported from data module, mission statement, and Gurudev mention
- LocalGuidesSection with 2-column layout, teacher-guiding.jpg via next/image fill, Devon/Southwest England copy, and outline CTA to /intro
- FooterCta full-bleed bg-primary section with white text and secondary variant Button linking to /intro

## Task Commits

Each task was committed atomically:

1. **Task 1: Build AboutSection component** - `bac85b0` (feat)
2. **Task 2: Build LocalGuidesSection and FooterCta components** - `5a9ef34` (feat)

## Files Created/Modified
- `src/components/home/about-section.tsx` - Credibility stats strip (from data module) + mission statement + Gurudev mention
- `src/components/home/local-guides-section.tsx` - 2-column teacher photo layout with Devon/SW local copy
- `src/components/home/footer-cta.tsx` - Full-bleed orange footer with Register for a Free Intro Talk CTA

## Decisions Made
- AboutSection renders stats from the existing `credibilityStats` data module (not inlined) for single source of truth
- LocalGuidesSection reuses `/images/intro/teacher-guiding.jpg` consistent with intro page imagery (no named teacher per Phase 03-11 decision)
- FooterCta uses `bg-primary` with `Button variant="secondary"` — matches Phase 05-04 course page footer CTA pattern for visual consistency

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All three components ready for 06-04 assembler to import and compose into the homepage page.tsx
- Named exports match expected imports: `AboutSection`, `LocalGuidesSection`, `FooterCta`
- All compile cleanly as pure server components with zero TypeScript errors

---
*Phase: 06-homepage*
*Completed: 2026-02-25*
