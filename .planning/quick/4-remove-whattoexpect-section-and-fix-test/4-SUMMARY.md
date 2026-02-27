---
phase: quick-4
plan: 01
subsystem: intro-page
tags: [cleanup, typography, page-composition]
dependency_graph:
  requires: []
  provides: [leaner-intro-page, consistent-testimonials-header]
  affects: [src/app/(landing)/intro/page.tsx, src/components/intro/testimonials-section.tsx]
tech_stack:
  added: []
  patterns: [eyebrow-heading pattern (text-sm font-semibold text-primary uppercase tracking-wider)]
key_files:
  modified:
    - src/app/(landing)/intro/page.tsx
    - src/components/intro/testimonials-section.tsx
decisions:
  - WhatToExpectSection removed from intro page — SessionIntroSection already covers the same content, keeping section is redundant
  - TestimonialsSection eyebrow pattern follows BenefitsSection (light bg treatment), not CredibilitySection (dark bg with text-white)
  - Decorative bar (inline-block w-12 h-1 rounded-full bg-primary) removed — one-off pattern not used anywhere else on the page
metrics:
  duration: 3min
  completed: "2026-02-27"
  tasks: 2
  files: 2
---

# Quick Task 4: Remove WhatToExpectSection and Fix TestimonialsSection Typography Summary

**One-liner:** Removed redundant WhatToExpectSection from intro page and replaced TestimonialsSection's one-off decorative bar header with the shared eyebrow + bold h2 pattern used by BenefitsSection and CredibilitySection.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Remove WhatToExpectSection from intro page | 4a1d214 | src/app/(landing)/intro/page.tsx |
| 2 | Fix TestimonialsSection typography to match page eyebrow pattern | b6da1f4 | src/components/intro/testimonials-section.tsx |

## Changes Made

### Task 1: Remove WhatToExpectSection

- Deleted import: `import { WhatToExpectSection } from "@/components/intro/what-to-expect-section"`
- Removed `<WhatToExpectSection />` render call from between TestimonialsSection and AboutSection
- Updated section comment block: removed item 7 (What-to-Expect), renumbered 8/9/10 to 7/8/9
- File itself (what-to-expect-section.tsx) preserved — only removed from page composition

### Task 2: Fix TestimonialsSection Typography

**Before:**
```tsx
<div className="inline-block w-12 h-1 rounded-full bg-primary mb-4" />
<h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-2">
  What People Are Saying
</h2>
<p className="text-muted-foreground text-base sm:text-lg">
  Real experiences from people just like you
</p>
```

**After:**
```tsx
<p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
  Real Experiences
</p>
<h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
  What People Are Saying
</h2>
```

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] src/app/(landing)/intro/page.tsx: WhatToExpectSection import and render removed
- [x] src/components/intro/testimonials-section.tsx: eyebrow pattern applied, decorative bar removed
- [x] Commit 4a1d214 exists
- [x] Commit b6da1f4 exists
- [x] TypeScript build: no errors
