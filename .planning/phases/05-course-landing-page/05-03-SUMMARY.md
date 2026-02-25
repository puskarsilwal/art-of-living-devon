---
phase: 05-course-landing-page
plan: "03"
subsystem: course-landing-page
tags: [components, server-components, course-content, upcoming-dates, founder]
dependency_graph:
  requires: ["05-01"]
  provides: ["course-content-section", "upcoming-dates-section", "founder-section"]
  affects: ["happiness-program page assembly"]
tech_stack:
  added: []
  patterns: ["data-driven cards from course-dates.ts", "shadcn Card/Badge/Button composition", "external CTA pattern with target=_blank rel=noopener"]
key_files:
  created:
    - src/components/course/course-content-section.tsx
    - src/components/course/upcoming-dates-section.tsx
    - src/components/course/founder-section.tsx
  modified: []
decisions:
  - "UpcomingDatesSection uses course.registrationUrl from data module — no hardcoded URLs in component (COURSE-04 satisfied)"
  - "FounderSection uses about-art-of-living.webp as ambient crowd/event image (no Gurudev portrait available — per RESEARCH.md pitfall note)"
  - "CourseContentSection CTA uses inline anchor styled as Button to avoid client-component overhead for a simple link"
  - "FounderSection blockquote uses border-l-4 border-primary with italic text and cite element for semantic attribution"
metrics:
  duration: "~2min"
  completed: 2026-02-25
  tasks_completed: 2
  files_created: 3
---

# Phase 5 Plan 03: Course Content, Upcoming Dates, and Founder Sections Summary

Three Server Component files implementing the middle sections of the Happiness Program landing page: a 4-module learning cards section, a data-driven upcoming dates grid with external Register Now CTAs, and a founder bio section featuring the Gurudev blockquote.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Course content section + Founder section | 663f6dc | course-content-section.tsx, founder-section.tsx |
| 2 | Upcoming dates section | 1d9ba7f | upcoming-dates-section.tsx |

## What Was Built

### CourseContentSection (`src/components/course/course-content-section.tsx`)
- Section header: "What You'll Learn in 3 Days" with "3 sessions x 3 hours" sub-header
- 4 learning module cards in 1-col mobile / 2-col md+ grid using shadcn Card
- Modules: Sudarshan Kriya (Waves icon), Pranayama (Heart icon), Yoga & Meditation (Sun icon), Wisdom for Daily Life (BookOpen icon)
- Icon badges use bg-primary/10 rounded-lg container for visual polish
- External Register Now CTA centered below grid linking to AoL GB registration URL

### FounderSection (`src/components/course/founder-section.tsx`)
- TODO comment at top: replace about-art-of-living.webp with Gurudev portrait when available
- 2-column layout on lg+ (stacked on mobile): ambient image left, bio right
- next/image with width=600 height=400 for the about-art-of-living.webp crowd photo
- Sri Sri Ravi Shankar bio (founding 1982, Sudarshan Kriya, 800M+ people, 180 countries)
- Gurudev blockquote: "The quality of our lives depends on the quality of our minds."
- Blockquote styled with border-l-4 border-primary, italic, cite element for semantic attribution

### UpcomingDatesSection (`src/components/course/upcoming-dates-section.tsx`)
- Section has `id="upcoming-dates"` for scroll targeting from ProgramOverviewSection CTA
- Imports `courseDates` and `CourseDate` type from `@/lib/data/course-dates`
- 3-column card grid (1-col mobile / sm:grid-cols-2 / lg:grid-cols-3) with hover:shadow-md transition
- Each card: date range, location, time + timezone, format Badge, optional badge label
- All Register Now CTAs use `course.registrationUrl` — data-driven, no hardcoded URLs
- Fallback note below grid links to artofliving.org/gb-en for unlisted dates

## Verification Results

- `npx tsc --noEmit` — exits 0, no errors in any of the 3 new files
- `grep "upcoming-dates"` — id="upcoming-dates" confirmed on section element
- `grep "registrationUrl"` — data-driven CTA confirmed, no hardcoded registration URL
- `npm run build` — exits 0, all 7 pages/routes build successfully

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check

- [x] src/components/course/course-content-section.tsx exists
- [x] src/components/course/upcoming-dates-section.tsx exists
- [x] src/components/course/founder-section.tsx exists
- [x] Commits 663f6dc and 1d9ba7f exist in git log
- [x] npm run build exits 0
