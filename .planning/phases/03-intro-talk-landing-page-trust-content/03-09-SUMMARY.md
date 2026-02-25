---
phase: 03-intro-talk-landing-page-trust-content
plan: 09
subsystem: intro-landing-page
tags: [copy, em-dash, gradient, image-swap, polish]
dependency_graph:
  requires: []
  provides: [em-dash-free-hero, em-dash-free-session-intro, em-dash-free-benefits, smooth-hero-gradient, distinct-session-image]
  affects: [hero-section, session-intro-section, benefits-section]
tech_stack:
  added: []
  patterns: [em-dash-elimination, gradient-smoothing, image-variety]
key_files:
  modified:
    - src/components/intro/hero-section.tsx
    - src/components/intro/session-intro-section.tsx
    - src/components/intro/benefits-section.tsx
decisions:
  - em-dashes replaced with colons, commas, periods, or parentheses depending on context
  - Button text changed to "Save My Seat (It's Free)" for both hero and benefits CTA
  - session-intro image swapped from breathing-session.jpg to meditation-group.jpg for visual variety
  - Hero gradient raised from via-black/40 to via-black/50 to eliminate center light band
metrics:
  duration: ~2min
  completed: 2026-02-25
  tasks_completed: 3
  files_modified: 3
---

# Phase 03 Plan 09: Em-dash Removal and Visual Polish Summary

Eliminated every em-dash from the three highest-visibility sections (hero, session-intro, benefits), fixed hero gradient banding, and swapped the session-intro image to create visual variety with the hero background.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Fix hero-section.tsx — remove em-dashes and smooth gradient | 88ac254 | src/components/intro/hero-section.tsx |
| 2 | Fix session-intro-section.tsx — remove em-dashes, swap image, tighten copy | cc12ddb | src/components/intro/session-intro-section.tsx |
| 3 | Fix benefits-section.tsx — remove em-dashes from descriptions and CTA button | a2d3b66 | src/components/intro/benefits-section.tsx |

## Changes Made

### hero-section.tsx
- Bullet 1: `SKY Breath Meditation — science-backed` → `SKY Breath Meditation: science-backed`
- Bullet 3: `Effortless meditation — zero experience needed` → `Effortless meditation, even if you have never meditated before`
- CTA button: `Save My Seat — It's Free` → `Save My Seat (It's Free)`
- Gradient overlay: `from-black/60 via-black/40 to-black/70` → `from-black/70 via-black/50 to-black/60` (removes center light band)

### session-intro-section.tsx
- sessionPoints[0]: `SKY Breath Meditation — the technique` → `SKY Breath Meditation, the technique`
- sessionPoints[1]: `calm your nervous system instantly — no experience needed` → `instantly. No experience needed.`
- Paragraph body: `no prior experience — just a breathing technique` → `no prior experience. Just a breathing technique`
- Image: `breathing-session.jpg` → `meditation-group.jpg` (visual variety from hero)

### benefits-section.tsx
- benefits[0].description: `Yale & Harvard — feel the shift` → `Yale and Harvard. Feel the shift in a single session.`
- benefits[1].description: `restores natural energy — no years of training` → `restores natural energy. No years of training required.`
- CTA button: `Save My Seat — It's Free` → `Save My Seat (It's Free)`

## Verification

- Zero em-dash characters across all three modified files
- TypeScript compiles with zero errors
- Hero gradient reads `from-black/70 via-black/50 to-black/60`
- session-intro-section.tsx references `meditation-group.jpg`

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- src/components/intro/hero-section.tsx: FOUND
- src/components/intro/session-intro-section.tsx: FOUND
- src/components/intro/benefits-section.tsx: FOUND
- Commit 88ac254: FOUND
- Commit cc12ddb: FOUND
- Commit a2d3b66: FOUND
