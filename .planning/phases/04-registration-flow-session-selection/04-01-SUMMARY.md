---
phase: 04-registration-flow-session-selection
plan: "01"
subsystem: ui
tags: [react, nextjs, countdown-timer, client-component, session-data]

# Dependency graph
requires:
  - phase: 03-intro-talk-landing-page-trust-content
    provides: hero-section.tsx that this plan extends with countdown timer
provides:
  - IntroTalkSession type extended with id, dateISO, zoomUrl, badge fields
  - introTalkSessions array with 3 March 2026 sessions
  - CountdownTimer client component (SSR-safe null-init pattern)
  - Hero section renders live countdown between date line and CTA
affects:
  - 04-02 session picker (uses introTalkSessions array)
  - 04-03 confirmation page (uses introTalkSessions, zoomUrl field)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "null-init useState for SSR-safe client timers (useState<Type>(null))"
    - "setInterval in useEffect with cleanup return for live countdown"
    - "Server component imports client component — Next.js handles boundary at client component"

key-files:
  created:
    - src/components/intro/countdown-timer.tsx
  modified:
    - src/lib/data/intro-talks.ts
    - src/components/intro/hero-section.tsx

key-decisions:
  - "null-init pattern (useState<TimeLeft>(null)) prevents SSR hydration mismatch — pre-hydration renders null, client fills in after mount"
  - "getNextSession() uses Array.find with dateISO > now for auto-advance when session passes"
  - "nextIntroTalk backward-compat export preserved as introTalkSessions[0]"
  - "TODO comment added above zoomUrl field — real Zoom meeting IDs needed before go-live"

patterns-established:
  - "CountdownTimer: null-init SSR pattern — initialize state as null, return null before hydration to suppress flash"
  - "Session data model: id (slug), dateISO (ISO 8601 UTC), zoomUrl, badge optional field"

requirements-completed: [INTRO-11]

# Metrics
duration: 10min
completed: 2026-02-25
---

# Phase 4 Plan 01: Session Data Model and Countdown Timer Summary

**Extended intro-talks data model with 3-session array plus live SSR-safe countdown timer embedded in hero section**

## Performance

- **Duration:** 10 min
- **Started:** 2026-02-25T14:48:20Z
- **Completed:** 2026-02-25T14:58:00Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Extended IntroTalkSession type with id, dateISO, zoomUrl, badge fields; added 3 March 2026 sessions array
- Built CountdownTimer client component using null-init SSR-safe pattern with auto-advance when session expires
- Integrated CountdownTimer into hero section between static date line and CTA button; build passes clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend session data model** - `adfbb2a` (feat)
2. **Task 2: Build countdown timer component** - `2b05eef` (feat)
3. **Task 3: Integrate countdown timer into hero** - `aff83d3` (feat)

## Files Created/Modified
- `src/lib/data/intro-talks.ts` - Extended type + 3-session array + nextIntroTalk backward-compat export
- `src/components/intro/countdown-timer.tsx` - Client countdown timer with null-init SSR pattern, auto-advance, fallback text
- `src/components/intro/hero-section.tsx` - Imports and renders CountdownTimer below date line, above CTA

## Decisions Made
- null-init useState pattern chosen for SSR safety — timer renders nothing until client hydration, preventing mismatch
- Auto-advance implemented in tick() using getNextSession() when calcTimeLeft returns null (session expired)
- Hero remains a Server Component — client boundary is at CountdownTimer component level per Next.js pattern

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Zoom meeting IDs need manual replacement before go-live.** All three sessions in `src/lib/data/intro-talks.ts` use `https://zoom.us/j/PLACEHOLDER` with a TODO comment marking the locations.

## Next Phase Readiness
- introTalkSessions array is ready for 04-02 session picker to consume
- zoomUrl fields are populated (placeholder) for 04-03 confirmation page to render Zoom join links
- CountdownTimer is live in hero section fulfilling INTRO-11

---
*Phase: 04-registration-flow-session-selection*
*Completed: 2026-02-25*
