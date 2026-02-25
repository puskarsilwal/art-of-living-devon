---
phase: 03-intro-talk-landing-page-trust-content
plan: 10
subsystem: landing-page/intro
tags: [em-dash-removal, layout-polish, quote-attribution, registration-form, what-to-expect]
dependency_graph:
  requires: []
  provides: [clean-registration-form-heading, clean-what-to-expect-header, em-dash-free-intro-components]
  affects: [teacher-section, testimonials-section, objections-section, registration-form, about-section, what-to-expect-section]
tech_stack:
  added: []
  patterns: [decorative-accent-bar-heading, single-section-heading, semantic-cite-element]
key_files:
  created: []
  modified:
    - src/components/intro/teacher-section.tsx
    - src/components/intro/testimonials-section.tsx
    - src/components/intro/objections-section.tsx
    - src/components/intro/registration-form.tsx
    - src/components/intro/about-section.tsx
    - src/components/intro/what-to-expect-section.tsx
decisions:
  - cite element needs no dash prefix — semantic HTML signals attribution
  - registration form uses single CardTitle heading, outer h2 removed for clarity
  - what-to-expect accent bar header matches TestimonialsSection/TeacherSection visual pattern
metrics:
  duration: ~2min
  completed: 2026-02-25
  tasks_completed: 3
  files_modified: 6
---

# Phase 03 Plan 10: Em-Dash Removal and Layout Polish Summary

**One-liner:** Final em-dash removal pass with registration dual-heading fix and WhatToExpect image banner replaced by clean accent bar heading.

## What Was Built

Six intro landing page components updated: teacher quote attribution cleaned up, two CTA buttons converted from em-dash to parentheses, registration form outer redundant heading removed, about-section prose rewritten without em-dash, and WhatToExpect section image banner replaced with a decorative accent bar + h2 matching the visual style of other sections.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix teacher attribution and CTA em-dashes | 7baf6bf | teacher-section.tsx, testimonials-section.tsx, objections-section.tsx |
| 2 | Fix registration dual heading and about-section em-dash | 99bbe26 | registration-form.tsx, about-section.tsx |
| 3 | Replace WhatToExpect image banner with accent bar header | 7f0eedb | what-to-expect-section.tsx |

## Decisions Made

- **cite element attribution:** `<cite>` is semantically sufficient to mark attribution; no dash prefix needed. Removed `--` from Gurudev's name.
- **Registration single heading:** The outer `<h2>Ready to Experience It?</h2>` section was redundant with the `CardTitle`. Removed outer block; `CardTitle "Reserve Your Free Seat"` is the sole heading.
- **WhatToExpect header:** Cramped image banner (`h-40 sm:h-48`) with dark gradient overlay replaced by `inline-block w-12 h-1 rounded-full bg-primary` accent bar + clean `h2`, consistent with TestimonialsSection and TeacherSection patterns. Unused `Image` import also removed.

## Deviations from Plan

None — plan executed exactly as written.

**Note on footer-cta.tsx:** Two em-dashes found in code comments (`{/* ... */}`) in footer-cta.tsx — not visible user-facing text. Outside the scope of this plan (which targets rendered text content only). Left in place.

## Verification Results

- Zero em-dashes in all six modified files (rendered text)
- `teacher-section.tsx`: no `--` prefix before Gurudev's name
- `registration-form.tsx`: "Ready to Experience It?" removed; "Reserve Your Free Seat" appears once (CardTitle)
- `what-to-expect-section.tsx`: no `h-40`, `h-48`, or `breathing-session.jpg` reference; decorative accent bar present
- `about-section.tsx`: no em-dash in body text
- TypeScript: zero errors

## Self-Check: PASSED
