# Phase 6: Homepage - Research

**Researched:** 2026-02-25
**Domain:** Next.js App Router homepage — server component page within existing (main) route group, reusing established design system and images
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All implementation decisions are at Claude's discretion. The user asked Claude to go ahead with the best approach for all areas. Decisions represent optimal implementation choices for this homepage:

**Hero & Above-Fold**
- Full-width hero with a high-quality peaceful/meditation background image (Art of Living brand feel)
- Headline communicates community identity: Devon/Southwest Art of Living, serving local communities
- Primary CTA: "Register for a Free Intro Talk" — drives to the main conversion page (the highest-value action)
- Secondary CTA: "Explore Our Courses" — secondary option for visitors ready for more
- Navigation bar at top with logo and links to all key pages

**Navigation Hub Layout**
- Three offering cards below the hero: Intro Talk, SKY Breathing & Meditation Course, Community Events
- Each card: icon or small image, short 1–2 line description, a clear CTA button
- Card layout conveys equal weight to all three offerings while giving each its own moment
- No dense nav-link lists — cards are more visually engaging and scannable

**Local Identity & Imagery**
- Blend Art of Living brand colors (white, orange) with warm, human photography
- Include teacher/host section with photo, name, and a brief "Your local guides" framing
- Copy references Devon & Southwest communities to feel local and personal, not generic
- Peaceful, nature-adjacent imagery (not corporate) — consistent with existing pages

**About Section**
- Medium depth: key credibility stats as a visual strip (500M+ people, 180 countries, 40+ years, Yale/Harvard research backing)
- One-sentence mission statement
- Brief Gurudev mention with name and title (photo optional)
- Kept concise — this is a hub page, visitors can learn more elsewhere

### Specific Ideas
- White and orange Art of Living brand palette, consistent with existing pages already built
- Teacher/host photo from the existing intro talk page can be reused for the "local guides" section
- Cards for the three offerings should feel scannable and action-oriented, not just descriptive

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Art of Living Devon/Southwest branded homepage serves as community hub | (main)/page.tsx already lives at root URL — replace placeholder content with full branded homepage |
| HOME-02 | Homepage links to intro talk page, course page, and upcoming events | Internal Next.js `<Link>` to `/intro`, `/art-of-living-part-1`, and events (placeholder until Phase 7 builds event pages) |
| HOME-03 | Brief "About Art of Living" section with foundation credibility facts | Reuse/adapt credibilityStats data module and AboutSection pattern already established |
| HOME-04 | Blended branding — Art of Living official look (white, orange, peaceful imagery) with Devon/Southwest local warmth | All brand tokens already in globals.css; images already downloaded; pattern verified across phases 2–5 |
</phase_requirements>

---

## Summary

Phase 6 is a low-risk, design-heavy page-build task. The homepage already has a route (`src/app/(main)/page.tsx`) and layout (`src/app/(main)/layout.tsx`) that wraps it in `SiteHeader` + `SiteFooter`. The placeholder content is 26 lines of unstyled HTML. The entire task is replacing that placeholder with a set of purpose-built section components — the same component-per-section pattern used for all previous pages.

All critical infrastructure already exists: the OKLCH brand color system (`--primary` = orange `oklch(0.75 0.18 55)`), Inter font via `next/font/google`, Tailwind v4, shadcn/ui components (Button, Badge, Card), lucide-react icons, and `next/image` for optimised images. Images already downloaded for intro and course pages are directly reusable on the homepage without any new downloads. The data modules for credibility stats and organisation facts already exist and can be imported.

The `SiteHeader` component needs upgrading from its current minimal state (logo only, no nav links) to a full navigation bar that links to all key pages — this is required by HOME-02 and the CONTEXT.md decision for a nav bar. The `SiteFooter` similarly needs nav links added to it. The homepage page.tsx is then a pure server-component assembler with no client state.

**Primary recommendation:** Build 5 components for the homepage (HeroSection, OfferingsSection, AboutSection, LocalGuidesSection, FooterCta), upgrade SiteHeader and SiteFooter with nav links, then assemble in (main)/page.tsx. No new dependencies needed.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, server components, page routing | Already installed; homepage at `(main)/page.tsx` |
| React | 19.2.3 | Component model | Already installed |
| Tailwind CSS | v4 | Utility styling with OKLCH brand tokens | Already configured in globals.css |
| shadcn/ui | 3.8.5 (shadcn CLI) | Button, Badge, Card primitives | Already installed — consistent with all other pages |
| lucide-react | 0.575.0 | Icons for offering cards | Already installed; used throughout intro/course pages |
| next/image | (Next.js built-in) | Optimised image rendering with fill prop | Established pattern from Phase 3+ |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/link | (Next.js built-in) | Internal navigation links | All CTAs and nav links to internal pages |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static section components | Dynamic CMS-driven content | Over-engineering for a hub page; static is correct |
| Dedicated nav component library | Custom SiteHeader upgrade | SiteHeader already exists; extend it, don't replace it |

**Installation:** No new packages needed.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/(main)/
│   └── page.tsx                    # Upgraded from placeholder to full assembled homepage
├── components/
│   ├── home/                       # NEW: homepage-specific section components
│   │   ├── hero-section.tsx
│   │   ├── offerings-section.tsx
│   │   ├── about-section.tsx
│   │   ├── local-guides-section.tsx
│   │   └── footer-cta.tsx
│   └── layout/
│       ├── site-header.tsx         # UPGRADED: add nav links
│       └── site-footer.tsx         # UPGRADED: add nav links
└── lib/data/
    └── credibility-stats.ts        # REUSE: already has the 4 stats needed for About section
```

### Pattern 1: Pure Server Component Assembler (page.tsx)
**What:** The page.tsx file imports and renders section components in order with no client logic.
**When to use:** Always for Next.js App Router pages where no client state is needed in the shell.
**Example:**
```typescript
// src/app/(main)/page.tsx
// Mirrors: src/app/(landing)/art-of-living-part-1/page.tsx pattern
import { HeroSection } from "@/components/home/hero-section"
import { OfferingsSection } from "@/components/home/offerings-section"
import { AboutSection } from "@/components/home/about-section"
import { LocalGuidesSection } from "@/components/home/local-guides-section"
import { FooterCta } from "@/components/home/footer-cta"

export const metadata = {
  title: "Art of Living Devon & Southwest",
  description: "...",
  robots: { index: true, follow: true },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OfferingsSection />
      <AboutSection />
      <LocalGuidesSection />
      <FooterCta />
    </>
  )
}
```

### Pattern 2: Hero with next/image fill + gradient overlay
**What:** Full-width section with absolute-positioned background image, dark gradient overlay div, and content z-stacked on top.
**When to use:** Any full-bleed hero with photo background — established and proven across HeroSection (intro) and HeroSection (course).
**Example:**
```typescript
// Source: matches src/components/intro/hero-section.tsx (Phase 3)
<section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
  <div className="absolute inset-0 z-0">
    <Image src="/images/intro/meditation-group.jpg" alt="" fill className="object-cover" priority />
  </div>
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
  <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center w-full">
    {/* headline, CTAs */}
  </div>
</section>
```

### Pattern 3: Offering Cards (three-column grid)
**What:** Three equal-weight cards using shadcn Card component, each with an icon, short description, and CTA button.
**When to use:** Navigation hub layout — presents three routes equally without hierarchy.
**Example:**
```typescript
// Uses Card from @/components/ui/card, Link from next/link, icons from lucide-react
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wind, BookOpen, CalendarDays } from "lucide-react"
import Link from "next/link"

const offerings = [
  {
    icon: Wind,
    title: "Free Intro Talk",
    description: "Experience SKY Breath Meditation for free. 60 minutes that could change your life.",
    cta: "Register Free",
    href: "/intro",
  },
  {
    icon: BookOpen,
    title: "Part 1 Course",
    description: "Three days to learn Sudarshan Kriya, pranayama, and yoga. Science-backed. Life-changing.",
    cta: "Explore the Course",
    href: "/art-of-living-part-1",
  },
  {
    icon: CalendarDays,
    title: "Community Events",
    description: "Satsang, kirtan, and meditation gatherings for the Devon & Southwest community.",
    cta: "See Events",
    href: "/events",   // Phase 7 will create this — link is forward-compatible
  },
]
```

### Pattern 4: SiteHeader with nav links
**What:** Extend the existing sticky header to include navigation links alongside the logo.
**When to use:** HOME-02 requires links to intro talk, course page, and upcoming events. The header is the primary nav for the (main) route group.
**Example:**
```typescript
// src/components/layout/site-header.tsx — upgrade
<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container mx-auto flex h-14 items-center justify-between px-4">
    <Link href="/" className="flex items-center gap-2">
      {/* existing logo */}
    </Link>
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      <Link href="/intro" className="text-muted-foreground hover:text-foreground transition-colors">Intro Talk</Link>
      <Link href="/art-of-living-part-1" className="text-muted-foreground hover:text-foreground transition-colors">Part 1 Course</Link>
      <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">Events</Link>
    </nav>
    <Link href="/intro">
      <Button size="sm">Register Free</Button>
    </Link>
  </div>
</header>
```

### Pattern 5: Credibility stats strip
**What:** A horizontal strip of large number stats reused from the existing `credibilityStats` data module.
**When to use:** HOME-03 requires the About section to show foundation credibility facts. The data already exists.
**Example:**
```typescript
// src/lib/data/credibility-stats.ts already exports:
// { number: "500M+", label: "Lives touched worldwide" }
// { number: "180+", label: "Countries" }
// { number: "100+", label: "Peer-reviewed studies" }
// { number: "Yale & Harvard", label: "Research-backed", isText: true }
import { credibilityStats } from "@/lib/data/credibility-stats"
```

### Anti-Patterns to Avoid
- **Duplicating credibility data:** Do not copy-paste stats into the homepage component — import from `credibility-stats.ts` directly.
- **Landing layout for homepage:** The homepage is in `(main)` route group which has SiteHeader/SiteFooter. Do not use `(landing)` layout (no header/footer) for the homepage.
- **Client component for the whole page:** No client state is needed at the page level. Keep page.tsx a server component. Only individual interactive sub-components (if any) need `"use client"`.
- **Hardcoding the events route as a dead link:** Link to `/events` — it will return 404 until Phase 7, which is acceptable. Do not omit the events link or point it to an anchor.
- **Adding new image downloads:** All required images already exist in `/public/images/intro/` and `/public/images/course/`. Use them.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom `<img>` tags | `next/image` with `fill` prop | Automatic WebP conversion, lazy loading, CLS prevention |
| Navigation active state | Custom route-matching | next/link is sufficient | Homepage nav is simple — no complex active state needed |
| Stats data | Inline arrays in component | Import `credibilityStats` from existing data module | Single source of truth already exists |
| Button variants | Custom styled `<a>` tags | shadcn `Button` component | Consistent with all other pages; hover/focus states built in |
| Card layout | Raw divs | shadcn `Card`, `CardHeader`, `CardContent` | Visual consistency, accessible structure |

**Key insight:** This phase reuses ~80% of the patterns already established in Phases 2–5. The planner should treat it as assembly work with targeted new components, not greenfield design work.

---

## Common Pitfalls

### Pitfall 1: Events link 404
**What goes wrong:** The `/events` route does not exist until Phase 7. If the events card CTA is tested, it returns a 404.
**Why it happens:** Phase 6 is implemented before Phase 7 (events pages).
**How to avoid:** This is expected and acceptable — include the link anyway so Phase 7 can slot in without modifying the homepage. Add a code comment: `{/* /events route created in Phase 7 */}`.
**Warning signs:** Do not interpret a 404 during Phase 6 verification as a bug.

### Pitfall 2: SiteHeader changes affect all (main) pages
**What goes wrong:** Upgrading SiteHeader with nav links affects every page in the `(main)` route group — currently homepage and privacy-policy.
**Why it happens:** SiteHeader is shared layout for the route group.
**How to avoid:** Privacy policy link already exists in SiteFooter. The nav links (Intro Talk, Course, Events) are appropriate on all (main) pages. No conditional logic needed.
**Warning signs:** If header nav causes visual clutter on privacy-policy, reduce nav to mobile-hidden only.

### Pitfall 3: Gurudev photo not available
**What goes wrong:** Attempting to use a Gurudev portrait photo that isn't in the image assets.
**Why it happens:** No Gurudev portrait is in `/public/images/` — the course page FounderSection already notes this with a TODO comment and uses `about-art-of-living.webp` as a substitute.
**How to avoid:** CONTEXT.md says "photo optional" for Gurudev. Use the existing `about-art-of-living.webp` ambient crowd image (already used by FounderSection) or use a text-only presentation. Do not attempt to download external images.
**Warning signs:** Any code referencing a non-existent `/images/gurudev.jpg` or similar.

### Pitfall 4: Mobile nav missing
**What goes wrong:** The SiteHeader desktop nav is hidden on mobile (`hidden md:flex`) but no mobile menu is provided, leaving mobile users with logo-only navigation.
**Why it happens:** Implementing a mobile hamburger menu adds significant complexity (client component, state, sheet/drawer).
**How to avoid:** For Phase 6 scope, this is acceptable — the hero section has a prominent CTA, and the three offering cards are visible immediately below. Mobile users can reach pages through in-page CTAs. A mobile nav hamburger is a Phase 7+ enhancement. Add a TODO comment.
**Warning signs:** Do not add a mobile hamburger drawer without user confirmation — it's out of scope.

### Pitfall 5: page.tsx metadata conflict
**What goes wrong:** The root layout (`src/app/layout.tsx`) already defines `metadata.title.default = "Art of Living Devon & Southwest"`. If the homepage page.tsx also exports metadata with the same title, the template format (`%s | Art of Living Devon & Southwest`) will produce "Art of Living Devon & Southwest | Art of Living Devon & Southwest".
**Why it happens:** Next.js metadata merging — page-level metadata uses the template from root layout.
**How to avoid:** Either omit the `title` from homepage metadata (root layout default applies), or set an explicit title that works with the template. The simplest fix: omit the title field in homepage metadata so root layout's `default` is used directly.

---

## Code Examples

Verified patterns from codebase inspection:

### Existing image paths (confirmed present in /public/images/)
```
/images/intro/breathing-session.jpg      — meditation group, hero quality
/images/intro/meditation-group.jpg       — group meditation session
/images/intro/teacher-guiding.jpg        — teacher with students (reusable for local guides)
/images/intro/about-art-of-living.webp   — ambient community event (Gurudev substitute)
/images/intro/sudarshan-kriya.webp       — practice scene
/images/course/break-free.webp           — inspiring lifestyle shot
/images/course/about-art-of-living.webp  — community gathering (same as intro version)
```

**Hero image recommendation:** `/images/intro/breathing-session.jpg` or `/images/intro/meditation-group.jpg` — these are the most evocative for a homepage.

**Local guides section:** `/images/intro/teacher-guiding.jpg` — already used in intro AboutSection for teacher image, appropriate reuse.

### Reusable data modules (import directly)
```typescript
// Already exports: 500M+, 180+, 100+, Yale & Harvard
import { credibilityStats } from "@/lib/data/credibility-stats"

// Already exports: 1981, 40+ years, 1M+ volunteers, 10,000+ teachers
// (these are inline in src/components/intro/about-section.tsx — extract to data module or inline again)
```

### Section background rhythm (from globals.css)
```typescript
// Established utility classes for section alternation:
className="section-warm-gradient"   // white to warm cream
className="section-cool-gradient"   // cool gray to white
className="section-primary-wash"    // subtle orange tint
// Or use Tailwind directly:
className="bg-muted/30"             // used by AboutSection (intro)
className="bg-background"           // white, default
className="bg-gray-950 text-white"  // dark, used by CredibilitySection
```

### Metadata pattern for homepage (avoids title duplication)
```typescript
// src/app/(main)/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  // Omit title — root layout default "Art of Living Devon & Southwest" applies
  description:
    "Join free intro talks and meditation courses in Devon and Southwest England. Discover SKY Breath Meditation, pranayama, and yoga.",
  robots: { index: true, follow: true },
}
```

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| CSS background-image for heroes | `next/image` with `fill` prop | Established since Phase 3 |
| Hex color values | OKLCH in globals.css | Set in Phase 1 — `--primary: oklch(0.75 0.18 55)` |
| Separate color files | CSS custom properties via `@theme inline` | Tailwind v4 native |
| Named exports with default | Named exports only for components | All components in this project use named exports |

**Deprecated/outdated:**
- The current `(main)/page.tsx` is a 26-line unstyled placeholder — it is the thing being replaced, not a reference.
- `SiteHeader` currently has no nav links — it is intentionally minimal until this phase.

---

## Open Questions

1. **Events route for cards and header nav**
   - What we know: `/events` will not exist until Phase 7
   - What's unclear: Whether to link to `/events` (404 now) or omit/disable the link
   - Recommendation: Link to `/events` with a TODO comment — cleaner than conditional logic and Phase 7 will complete it

2. **Teacher/host identity for Local Guides section**
   - What we know: CONTEXT.md says "teacher/host photo from the existing intro talk page can be reused"
   - What's unclear: Whether there is a named teacher for Devon/Southwest (the intro page AboutSection removed the teacher name in Phase 3-11)
   - Recommendation: Use `/images/intro/teacher-guiding.jpg`, generic "Your local guides" framing without a specific name — consistent with Phase 3-11 decision to remove TeacherSection

3. **Mobile navigation**
   - What we know: SiteHeader desktop nav will be `hidden md:flex`; no mobile hamburger in scope
   - What's unclear: Whether user expects a mobile nav drawer
   - Recommendation: Accept mobile-nav gap for Phase 6; hero CTAs and offering cards provide navigation on mobile; add TODO comment

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection — `src/app/(main)/page.tsx`, `src/app/(main)/layout.tsx`, `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx`, `src/app/globals.css`, `src/components/intro/hero-section.tsx`, `src/components/intro/credibility-section.tsx`, `src/components/intro/about-section.tsx`, `src/components/course/founder-section.tsx`, `src/lib/data/credibility-stats.ts`, `package.json`
- `.planning/phases/06-homepage/06-CONTEXT.md` — locked implementation decisions
- `.planning/REQUIREMENTS.md` — HOME-01 through HOME-04 definitions
- `.planning/STATE.md` — accumulated project decisions across Phases 1–5

### Secondary (MEDIUM confidence)
- Image asset inventory via filesystem inspection — all paths verified present

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — everything is already installed; no new deps
- Architecture: HIGH — directly mirrors established patterns from phases 2–5 in the same codebase
- Pitfalls: HIGH — identified from actual codebase state (no Gurudev photo, events route gap, metadata merging)

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (stable stack — extend if phase delayed)
