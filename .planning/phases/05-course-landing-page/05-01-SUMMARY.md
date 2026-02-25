---
phase: 05-course-landing-page
plan: "01"
subsystem: data-layer
tags: [data, assets, accordion, typescript, course-landing-page]
dependency_graph:
  requires: []
  provides:
    - courseStats (CourseStat[6])
    - courseDates (CourseDate[3])
    - courseTestimonials (Testimonial[3])
    - Accordion component
    - /images/course/ image assets
  affects:
    - src/components/course/research-stats-section.tsx
    - src/components/course/testimonials-section.tsx
    - src/components/course/course-dates-section.tsx
    - src/components/course/faq-section.tsx
tech_stack:
  added:
    - "@radix-ui/react-accordion (via shadcn)"
  patterns:
    - "Named export typed data modules (type + array)"
    - "Testimonial type reuse via import from shared module"
key_files:
  created:
    - src/lib/data/course-stats.ts
    - src/lib/data/course-dates.ts
    - src/lib/data/course-testimonials.ts
    - src/components/ui/accordion.tsx
    - public/images/course/break-free.webp
    - public/images/course/sudarshan-kriya.webp
    - public/images/course/about-art-of-living.webp
    - public/images/course/testimonials/charlotte-puls.webp
    - public/images/course/testimonials/glenn-haig.webp
    - public/images/course/testimonials/philip-mertz.webp
    - public/images/course/cnn.svg
    - public/images/course/harvard.webp
    - public/images/course/yoga-journal.webp
    - public/images/course/washington-post.webp
  modified: []
decisions:
  - "Reused Testimonial type import from testimonials.ts rather than duplicating — single source of truth for type"
  - "Task 3 produced no new git files — build artifacts go to .next (gitignored), so no separate commit needed"
metrics:
  duration: "~2 minutes"
  completed: "2026-02-25"
  tasks_completed: 3
  files_created: 14
---

# Phase 5 Plan 01: Data Layer and Asset Foundation Summary

**One-liner:** Typed data modules for 6 research stats, 3 course dates, and 3 testimonials — plus shadcn Accordion and 10 image assets — providing a complete importable foundation for all Wave 2 course section components.

## What Was Built

Three TypeScript data modules following the project's established named-export pattern, the shadcn Accordion component, and all image assets needed by the course landing page sections.

### Data Modules

**course-stats.ts** — `CourseStat` type + `courseStats` array (6 items):
- Direction values: calm=up (37%), social connection=up (25%), anxiety=down (23%), insomnia=down (31%), cortisol=down (60%), depression=down (34%)
- Matches exactly the research stats from the AoL UK reference page and CONTEXT.md

**course-dates.ts** — `CourseDate` type + `courseDates` array (3 items):
- 3 placeholder Devon/Southwest courses: April 2026 Exeter (in-person), May 2026 Online (Zoom), June 2026 Exeter (in-person)
- All `registrationUrl` values point to `https://www.artofliving.org/gb-en/courses/art-of-living-part-one`
- Prominent TODO comment: "Update with confirmed Devon/Southwest course dates before go-live"
- First entry has `badge: "Next Available"` for visual differentiation

**course-testimonials.ts** — `courseTestimonials` array (3 items):
- Imports `Testimonial` type from `./testimonials` (shared type, fresh data)
- Glenn-Douglas Haig (CEO): "From anxiousness to peace" — transformation outcome
- Charlotte Puls (Lawyer): "15 years of seeking — answered" — long-term search resolved
- Philip Mertz (Investment Manager): "Happy for no reason" — lasting wellbeing shift
- All image paths under `/images/course/testimonials/`

### Accordion Component

Installed via `npx shadcn@latest add accordion --yes`. Provides `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` — ready for the FAQ section in Wave 2.

### Image Assets

All copied from `Logos/` directory (untracked source):

| File | Purpose |
|------|---------|
| `public/images/course/break-free.webp` | Hero section image |
| `public/images/course/sudarshan-kriya.webp` | Course content section |
| `public/images/course/about-art-of-living.webp` | About/founder section |
| `public/images/course/testimonials/glenn-haig.webp` | Testimonial photo |
| `public/images/course/testimonials/charlotte-puls.webp` | Testimonial photo |
| `public/images/course/testimonials/philip-mertz.webp` | Testimonial photo |
| `public/images/course/cnn.svg` | Media logos strip |
| `public/images/course/harvard.webp` | Media logos strip |
| `public/images/course/yoga-journal.webp` | Media logos strip |
| `public/images/course/washington-post.webp` | Media logos strip |

## Commits

| Hash | Message |
|------|---------|
| 277d0c1 | feat(05-01): add course data modules — stats, dates, testimonials |
| 62005f9 | feat(05-01): install accordion + copy course image assets |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `src/lib/data/course-stats.ts` — exists, 6 items, directions correct
- [x] `src/lib/data/course-dates.ts` — exists, 3 items, all pointing to AoL GB URL
- [x] `src/lib/data/course-testimonials.ts` — exists, 3 items with /images/course/testimonials/ paths
- [x] `src/components/ui/accordion.tsx` — exists (shadcn installed)
- [x] `public/images/course/` — 5 files + testimonials/ subdirectory
- [x] `public/images/course/testimonials/` — 3 testimonial photos
- [x] `npm run build` — exits 0, no errors
- [x] Commits 277d0c1 and 62005f9 exist
