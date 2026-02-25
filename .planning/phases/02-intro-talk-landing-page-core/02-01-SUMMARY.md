---
phase: 02-intro-talk-landing-page-core
plan: 01
subsystem: ui
tags: [next.js, route-groups, zod, react-hook-form, server-actions, shadcn-ui]

# Dependency graph
requires:
  - phase: 01-project-scaffolding-deploy
    provides: Next.js project with homepage and privacy-policy pages
provides:
  - Route group architecture separating (main) and (landing) layouts
  - Registration Zod schema shared between client and server
  - Server action for form submission with structured error responses
  - Intro talk session data constants
  - shadcn/ui form components (button, input, checkbox, label, card, badge, separator)
affects: [02-02-PLAN, phase-09-brevo-integration]

# Tech tracking
tech-stack:
  added: [react-hook-form, zod, "@hookform/resolvers"]
  patterns: [route-group-layout-separation, server-action-form-handling, zod-schema-sharing]

key-files:
  created:
    - src/app/(main)/layout.tsx
    - src/app/(landing)/layout.tsx
    - src/lib/schemas/registration.ts
    - src/actions/register.ts
    - src/lib/data/intro-talks.ts
    - src/components/ui/button.tsx
    - src/components/ui/input.tsx
    - src/components/ui/checkbox.tsx
    - src/components/ui/label.tsx
    - src/components/ui/card.tsx
    - src/components/ui/badge.tsx
    - src/components/ui/separator.tsx
  modified:
    - src/app/layout.tsx
    - package.json

key-decisions:
  - "Used z.literal(true) with message param for consent validation (Zod v4 API)"
  - "Root layout stripped to html/body shell; each route group owns its own chrome"

patterns-established:
  - "Route group separation: (main) has header/footer, (landing) has none"
  - "Server action pattern: FormData input, safeParse validation, structured {success, message, errors} response"
  - "Schema sharing: single Zod schema imported by both client form and server action"

requirements-completed: [INTRO-03, INTRO-09]

# Metrics
duration: 2min
completed: 2026-02-25
---

# Phase 2 Plan 1: Route Groups & Form Infrastructure Summary

**Route group architecture with (main)/(landing) separation, Zod registration schema, server action, and shadcn/ui form components**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-25T00:21:00Z
- **Completed:** 2026-02-25T00:22:56Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Migrated existing homepage and privacy-policy into (main) route group with SiteHeader/SiteFooter
- Created (landing) route group with minimal layout (no navigation distractions)
- Built registration schema with Zod validation for name, email, phone, consent
- Created server action with FormData parsing and structured error/success responses
- Added typed intro talk session data constants
- Installed 7 shadcn/ui components for form building

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, add shadcn/ui components, and create route groups** - `97d45af` (feat)
2. **Task 2: Create registration schema, server action, and intro talk data** - `4376e01` (feat)

## Files Created/Modified
- `src/app/layout.tsx` - Root layout stripped to html/body shell (no header/footer)
- `src/app/(main)/layout.tsx` - Main group layout with SiteHeader and SiteFooter
- `src/app/(main)/page.tsx` - Homepage migrated from root
- `src/app/(main)/privacy-policy/page.tsx` - Privacy policy migrated from root
- `src/app/(landing)/layout.tsx` - Landing group layout with no navigation
- `src/lib/schemas/registration.ts` - Zod schema for registration form validation
- `src/actions/register.ts` - Server action for form submission
- `src/lib/data/intro-talks.ts` - Typed intro talk session constants
- `src/components/ui/*.tsx` - 7 shadcn/ui components (button, input, checkbox, label, card, badge, separator)

## Decisions Made
- Used `z.literal(true)` with `message` param for consent validation (Zod v4 API differs from v3 errorMap approach)
- Root layout stripped to pure html/body shell; each route group owns its own layout chrome

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Zod v4 literal API for consent field**
- **Found during:** Task 2 (Registration schema creation)
- **Issue:** Plan specified `errorMap` callback for `z.literal(true)` which is not valid in Zod v4; TypeScript compilation failed
- **Fix:** Changed to `{ message: "..." }` parameter which is the Zod v4 API
- **Files modified:** src/lib/schemas/registration.ts
- **Verification:** `npx tsc --noEmit` passes cleanly
- **Committed in:** 4376e01 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor API adaptation for Zod v4 compatibility. No scope creep.

## Issues Encountered
None beyond the Zod v4 API deviation noted above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Route group architecture ready for landing page components in Plan 02
- Registration schema, server action, and intro talk data ready for import
- All shadcn/ui form components available for the registration form UI

## Self-Check: PASSED

- All 7 key files exist
- Both task commits verified (97d45af, 4376e01)
- Root layout confirmed free of SiteHeader/SiteFooter imports

---
*Phase: 02-intro-talk-landing-page-core*
*Completed: 2026-02-25*
