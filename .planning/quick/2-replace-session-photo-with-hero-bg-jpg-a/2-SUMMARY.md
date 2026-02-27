---
phase: quick-2
plan: 01
subsystem: intro-talk-landing-page
tags: [copy, images, intro-talk]
dependency_graph:
  requires: []
  provides: [updated-session-intro-photo, differentiated-technique-descriptions]
  affects: [src/components/intro/session-intro-section.tsx, src/components/intro/benefits-section.tsx]
tech_stack:
  added: []
  patterns: [next/image fill prop, static data array]
key_files:
  created: []
  modified:
    - src/components/intro/session-intro-section.tsx
    - src/components/intro/benefits-section.tsx
decisions:
  - Kept overlay div and all Tailwind classes unchanged when swapping photo — only src and alt modified
  - Used em-dash in Guided Meditation description for natural reading rhythm (consistent with project copy style)
metrics:
  duration: ~1min
  completed: 2026-02-27
  tasks_completed: 2
  files_modified: 2
---

# Quick Task 2: Replace Session Photo with hero-bg.jpg + Differentiate Technique Descriptions

**One-liner:** Swapped session-intro photo from session-community.jpg to hero-bg.jpg and renamed the first technique circle to "Introduction to SKY Breathing Technique" with clearly distinct copy for items 1 and 2.

## What Was Done

### Task 1 — Swap session-intro photo to hero-bg.jpg

**File:** `src/components/intro/session-intro-section.tsx`

Changed `Image` src from `/images/intro/session-community.jpg` to `/images/home/hero-bg.jpg` and updated alt text to match the calming landscape scene. All other JSX, overlay, and Tailwind classes left unchanged.

**Commit:** 8579e53

### Task 2 — Rename first technique and differentiate descriptions

**File:** `src/components/intro/benefits-section.tsx`

- Item 1 caption: "SKY Breath Meditation" → "Introduction to SKY Breathing Technique"
- Item 1 description: now references "first taste" and intro nature of the session
- Item 2 (Guided Meditation) description: now explicitly says "different from SKY Breath" so readers understand these are two distinct experiences
- Items 3 and 4 unchanged

**Commit:** 6fccd30

## Verification

- `grep -n "hero-bg.jpg"` confirmed in session-intro-section.tsx line 19
- `grep -n "Introduction to SKY Breathing Technique|first taste"` confirmed in benefits-section.tsx lines 8-9
- `npx tsc --noEmit` passed with zero errors

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- src/components/intro/session-intro-section.tsx — FOUND, contains hero-bg.jpg
- src/components/intro/benefits-section.tsx — FOUND, contains "Introduction to SKY Breathing Technique"
- Commit 8579e53 — FOUND
- Commit 6fccd30 — FOUND
