---
phase: 03-intro-talk-landing-page-trust-content
plan: 05
subsystem: ui
tags: [nextjs, tailwind, lucide-react, shadcn-ui, next-image, landing-page]

# Dependency graph
requires:
  - phase: 03-intro-talk-landing-page-trust-content
    provides: Hero and Benefits section components with plain white styling

provides:
  - Hero section with full-width breathing-session.jpg background image and dark gradient overlay
  - Benefits section with 4 icon cards using Wind/Moon/Users/GraduationCap icons
  - Urgency sub-text ("Free • No credit card • Spots limited") below hero CTA
  - Visually distinct CTAs — hero (solid primary) vs benefits (outline variant)

affects: [phase-04-homepage, any future intro page redesigns]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "next/image with fill prop for CSS-controlled background images inside relative containers"
    - "Dark gradient overlay pattern: absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
    - "Icon card pattern: Card + CardContent + icon container div with bg-primary/10 rounded-xl"
    - "Dual CTA differentiation: solid primary (hero) vs outline with border-primary (benefits)"

key-files:
  created: []
  modified:
    - src/components/intro/hero-section.tsx
    - src/components/intro/benefits-section.tsx

key-decisions:
  - "next/image with fill used for hero background (not CSS background-image) for Next.js optimization"
  - "Benefits restructured from flat string array to objects with icon/title/description for card rendering"
  - "Benefits CTA uses outline variant (border-primary) to visually differentiate from hero solid CTA"
  - "Urgency sub-text placed below hero CTA rather than inside button to preserve button clarity"

patterns-established:
  - "Background image pattern: relative overflow-hidden section > absolute z-0 image > absolute z-10 overlay > relative z-20 content"
  - "Icon card pattern: Card border-0 shadow-sm + gradient bg + icon container bg-primary/10 + h3 title + p description"

requirements-completed: [INTRO-06, INTRO-07, INTRO-08, INTRO-13, INTRO-14]

# Metrics
duration: 2min
completed: 2026-02-25
---

# Phase 03 Plan 05: Hero & Benefits Visual Overhaul Summary

**Hero transformed to full-width breathing-session.jpg with dark gradient overlay and urgency CTA; benefits rebuilt as 4 icon cards (Wind/Moon/Users/GraduationCap) with gradient card backgrounds and outline CTA**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-25T02:21:04Z
- **Completed:** 2026-02-25T02:22:56Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Hero section now shows breathing-session.jpg as a full-width background image via next/image fill, with a layered dark gradient overlay (from-black/60 via-black/40 to-black/70) — all text white and readable
- Added urgency sub-text "Free • No credit card • Spots limited" below hero CTA for conversion reinforcement
- Benefits section rebuilt from plain CheckCircle+string list to 4 rich icon cards with meaningful lucide-react icons, short titles, and descriptions on gradient card backgrounds
- Hero CTA (solid primary) and Benefits CTA (outline with border-primary) are now visually distinct, preventing confusion between the two registration triggers

## Task Commits

Each task was committed atomically:

1. **Task 1: Hero section — full-width background image with gradient overlay** - `f5fddfa` (feat)
2. **Task 2: Benefits section — icon cards with visual richness** - `451e632` (feat)

## Files Created/Modified

- `src/components/intro/hero-section.tsx` - Rebuilt with next/image fill background, dark gradient overlay, white text, urgency sub-text
- `src/components/intro/benefits-section.tsx` - Rebuilt with structured benefit objects, Card components, icon containers, outline CTA

## Decisions Made

- Used next/image with fill prop (not CSS background-image) to maintain Next.js image optimization
- Benefits CTA uses `variant="outline"` with `border-primary text-primary` for clear visual distinction from hero
- Urgency sub-text placed as a `<p>` below the button anchor rather than inside the Button component to keep button label clean

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - TypeScript compiled cleanly and npm run build succeeded on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Hero and Benefits sections are now visually arresting premium experiences
- Gaps 6, 7, and 9 (hero background, benefits icons, CTA differentiation) are closed
- Ready for Phase 4 (homepage) or any remaining gap closure work

---
*Phase: 03-intro-talk-landing-page-trust-content*
*Completed: 2026-02-25*
