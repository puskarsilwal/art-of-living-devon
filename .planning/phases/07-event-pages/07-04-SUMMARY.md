---
phase: 07-event-pages
plan: "04"
subsystem: ui
tags: [nextjs, routing, ssg, events, ssr]

# Dependency graph
requires:
  - phase: 07-01
    provides: EventConfig type, events data module, getAllEvents(), getEventBySlug()
  - phase: 07-02
    provides: EventHeroSection, EventDetailsBar, EventExperienceSection, EventExplainerSection
  - phase: 07-03
    provides: EventVideoSection, EventSocialProof, EventEmailOptin, EventFooterCta
provides:
  - Dynamic /events/[slug] route (landing group, SSG, no header/footer)
  - Static /events index route (main group, with SiteHeader/SiteFooter)
  - generateStaticParams for satsang-2026-march at build time
  - generateMetadata for per-event SEO
affects: [phase-08, phase-09, seo, navigation]

# Tech tracking
tech-stack:
  added: []
  patterns: [page-assembler, ssg-generateStaticParams, conditional-section-render]

key-files:
  created:
    - src/app/(landing)/events/[slug]/page.tsx
    - src/app/(main)/events/page.tsx
  modified: []

key-decisions:
  - "Event detail page lives in (landing) route group — no header/footer, conversion funnel layout"
  - "Events index lives in (main) route group — SiteHeader/SiteFooter inherited via layout.tsx"
  - "generateStaticParams returns one entry per event from getAllEvents() — all events prerendered at build time"
  - "Conditional video section: {event.videoUrl && <EventVideoSection videoUrl={event.videoUrl} />}"
  - "Card hover effects: scale-105 image + text-primary title via group class"

patterns-established:
  - "Page assembler pattern: async server component, no logic, pure JSX composition"
  - "params is a Promise in Next.js 16 — always await params before destructuring"
  - "notFound() for invalid slugs renders Next.js 404 page, not a crash"

requirements-completed: [EVENT-01, EVENT-02, EVENT-03]

# Metrics
duration: 4min
completed: 2026-02-26
---

# Phase 7 Plan 04: Route Assembly Summary

**Two working Next.js routes wiring all event components and data: /events/satsang-2026-march (SSG landing page, 8 sections) and /events (static index with card grid)**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-26T15:22:57Z
- **Completed:** 2026-02-26T15:26:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- `/events/[slug]` dynamic page assembled in (landing) route group with all 8 sections in conversion funnel order
- `/events` index page assembled in (main) route group with event card grid, hover effects, and empty state
- Full production build passes with zero errors — satsang-2026-march prerendered as SSG

## Task Commits

Each task was committed atomically:

1. **Task 1: Dynamic event page /events/[slug]** - `65fc252` (feat)
2. **Task 2: Events index page /events** - `48b7f1b` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified
- `src/app/(landing)/events/[slug]/page.tsx` - Async server component; generateStaticParams, generateMetadata, notFound() for invalid slugs; 8 sections composed in funnel order; lives in (landing) group (no nav)
- `src/app/(main)/events/page.tsx` - Server component; event card grid with Image, Badge, Calendar/MapPin icons; links to /events/[slug]; inherits SiteHeader/SiteFooter from (main) layout

## Decisions Made
- Event detail page stays in `(landing)` route group for conversion funnel (no distraction from nav)
- Events index in `(main)` route group so users can navigate back to homepage/other pages
- `params` awaited as a Promise — required for Next.js 16 compatibility
- VideoSection rendered conditionally: `{event.videoUrl && <EventVideoSection .../>}` — graceful degradation when no video

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None — build succeeded first attempt with zero TypeScript errors.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- Both event routes are fully functional and statically generated
- `/events/satsang-2026-march` and `/events` resolve correctly in production
- Homepage `/events` link (wired in Phase 6) now resolves to a real page
- Phase 8 (if any) or Phase 9 (Brevo email wiring) can proceed — EventEmailOptin stub action is ready for Brevo API integration
- Hero image `/images/events/satsang-hero.jpg` is a placeholder — real photo needed before go-live

---
*Phase: 07-event-pages*
*Completed: 2026-02-26*
