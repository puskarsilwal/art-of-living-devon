---
phase: 07-event-pages
plan: "01"
subsystem: data
tags: [typescript, zod, server-actions, data-module]

# Dependency graph
requires:
  - phase: 02-intro-talk-landing-page-core
    provides: Server action pattern (FormData -> safeParse -> structured state response)
provides:
  - EventConfig type and EventTestimonial type for all event page components
  - events array with sample Satsang event (satsang-2026-march)
  - getAllEvents() and getEventBySlug() helper functions
  - subscribeToEventUpdates stub server action with Zod v4 GDPR consent validation
  - OptinState type for useActionState binding
affects: [07-02, 07-03, 07-04, 07-05, 09-email-automation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - EventConfig data module follows same pattern as intro-talks.ts and course-dates.ts
    - Stub server action with TODO comment reserves Phase 9 Brevo integration slot
    - Zod v4 z.literal("on", { message }) for GDPR consent checkbox validation

key-files:
  created:
    - src/lib/data/events/index.ts
    - src/actions/event-optin.ts
  modified: []

key-decisions:
  - "EventConfig.registrationUrl is external link (not Next.js route) — event registration handled by artofliving.org"
  - "brevoListId field defined but undefined in Phase 7 — slot reserved for Phase 9 Brevo per-event list wiring"
  - "EventTestimonial defined separately from testimonials.ts Testimonial type — event testimonials have different shape (highlight field)"
  - "price field typed as string | null — null means contact us, string covers Free/paid/donation variants"

patterns-established:
  - "Event data module in src/lib/data/events/index.ts — all event page components import EventConfig from here"
  - "Stub server action pattern: validate with Zod, log to console, TODO comment for Phase 9 integration"

requirements-completed: [EVENT-01, EVENT-02, EVENT-03]

# Metrics
duration: 3min
completed: 2026-02-26
---

# Phase 7 Plan 01: Event Data Foundation Summary

**EventConfig data module with Zod-validated email opt-in stub action — typed foundation for all Phase 7 event page components**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-26T14:55:30Z
- **Completed:** 2026-02-26T14:58:30Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- EventConfig and EventTestimonial types capturing all EVENT-02 required display fields
- Sample Satsang event (satsang-2026-march) with 3 realistic testimonials and full field set
- Email opt-in stub server action with Zod v4 GDPR consent validation — Phase 9 Brevo slot reserved

## Task Commits

Each task was committed atomically:

1. **Task 1: EventConfig data module with sample Satsang event** - `ce8b7d6` (feat)
2. **Task 2: Email opt-in stub server action** - `16c8dac` (feat)

## Files Created/Modified

- `src/lib/data/events/index.ts` - EventConfig type, EventTestimonial type, events array, getAllEvents() and getEventBySlug() helpers
- `src/actions/event-optin.ts` - OptinState type, Zod v4 optinSchema, subscribeToEventUpdates stub action with "use server" directive

## Decisions Made

- EventConfig.registrationUrl typed as external URL (not Next.js route) — event sign-ups go to artofliving.org
- brevoListId field included but left undefined in Phase 7 — clean slot for Phase 9 Brevo per-event list wiring
- EventTestimonial is a separate type from the existing Testimonial type in testimonials.ts — includes a `highlight` field for pull-quote display that the base type lacks
- price typed as `string | null` — null signals "contact us" while strings cover Free, paid, and donation variants

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- EventConfig type ready for import in all Phase 7 section components (07-02 onwards)
- subscribeToEventUpdates and OptinState ready for useActionState binding in event-email-optin.tsx
- Placeholder image path /images/events/satsang-hero.jpg requires real image — see Plan 07-02 Task for image sourcing

---
*Phase: 07-event-pages*
*Completed: 2026-02-26*
