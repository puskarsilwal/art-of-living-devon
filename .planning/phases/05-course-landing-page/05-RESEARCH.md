# Phase 5: Course Landing Page - Research

**Researched:** 2026-02-25
**Domain:** Next.js 16 static landing page, React Server Components, Tailwind CSS v4, shadcn/ui
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page structure & section order:**
1. Hero — Full-width nature/meditation image, headline ("Breathe Out Stress From Day One" or similar), 1-line description, Register Now CTA
2. What is the Happiness Program? — Brief paragraph explanation, secondary CTA button
3. Research stats block — Big percentage numbers (37% increased calm, 23% reduced anxiety, 31% reduced insomnia, 60% cortisol reduction, 25% social connection, 34% reduced depression) with up/down arrow icons, citing peer-reviewed studies
4. Media logos strip — CNN, Yoga Journal, Harvard Health Publishing, The Washington Post
5. Course content — What you'll learn: Sudarshan Kriya, pranayama, yoga, meditation sessions breakdown
6. Upcoming dates — Local Devon/Southwest course listings with Register Now buttons linking to official Art of Living registration page
7. About the founder — Brief section on Sri Sri Ravi Shankar with photo
8. Testimonials — 3 participant quotes with photos, sourced from public Art of Living reviews
9. Art of Living in numbers — 44 years, 180 countries, 40,000+ teachers, 800M+ people reached
10. FAQ — 4-6 common questions (duration, cost, online vs in-person, age limit, rescheduling)
11. Footer CTA — Final Register Now button

**Research credibility section:**
- Lead with: "Backed by 100+ independent studies in peer-reviewed journals"
- Show 6 stat cards with large percentage numbers and directional arrows (use reference sample 2 layout exactly)
- Stats: 37% increased calm (4 weeks), 23% reduced anxiety (4 weeks), 31% reduction in insomnia, 60% reduction in stress hormone cortisol (3 months), 25% increase in social connection (4 weeks), 34% reduced depression (4 weeks)
- Below stats: media logo strip (CNN, Yoga, Harvard Health Publishing, Washington Post) with their actual quotes from the reference

**CTA & enrollment flow:**
- Multiple CTAs throughout the page (hero, after course content, after testimonials, footer)
- Button label: "Register Now" (consistent with reference pages)
- All CTAs link to official Art of Living registration page (external link, opens in new tab)
- Upcoming dates section shows Devon/Southwest courses — static list that can be updated, or direct link to filtered results on artofliving.org
- No urgency countdown on this page — upcoming dates grid is the natural urgency mechanism

**Testimonials:**
- 3 testimonials from Part 1 course participants
- Use photos + name + brief credentials/role where available
- Source from public Art of Living reviews (Google, official site testimonials)
- Testimonials should focus on life transformation outcomes (stress relief, sleep, relationships)
- Section header: "How is Art of Living Changing Lives?"

**Visual design:**
- Follow Art of Living official aesthetic: white/cream backgrounds, orange accent (#FF6B35 or AoL gold), peaceful nature photography
- Match the Devon intro talk page brand for consistency (same font, same CTA button style)
- Hero should use a full-bleed nature/meditation photo (meadow, sunlight, peaceful setting)

### Claude's Discretion
- Exact FAQ questions and answers
- Specific photo choices from the assets available
- Exact founder bio copy
- Internal section spacing and padding
- Whether to use accordion or static layout for course content sessions

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COURSE-01 | Visitor sees detailed Happiness Program / Part 1 course information and overview | Section 2 (What is HP?) + Section 5 (Course content) cover full course overview; data module pattern from intro-talks.ts applies |
| COURSE-02 | Visitor sees course benefits, format (3 days, 3hrs/day), and what they'll learn (Sudarshan Kriya, pranayama, yoga) | Course content section with session breakdown; reuse circular photo card pattern from BenefitsSection |
| COURSE-03 | Visitor sees SKY Breath Meditation research data and credibility (Yale, Harvard, 100+ studies) | Research stats block (6 stat cards with arrows) + MediaLogosSection pattern; data from credibility-stats.ts can be extended |
| COURSE-04 | CTA links to official Art of Living registration page for course enrollment | External `<a target="_blank" rel="noopener noreferrer">` wrapping shadcn Button; AoL course finder URL pattern documented below |
| COURSE-05 | Page includes testimonials from Part 1 course participants (sourced from public reviews) | Reuse TestimonialsSection pattern exactly; new data module for course testimonials; existing testimonial photos in Logos/ folder |
</phase_requirements>

---

## Summary

Phase 5 is a pure Next.js React Server Component landing page — no forms, no Server Actions, no client-side state beyond what already exists. It is structurally parallel to the intro talk page (`src/app/(landing)/intro/page.tsx`) and lives at `src/app/(landing)/happiness-program/page.tsx` (or `/part-1`). The route sits inside the existing `(landing)` route group which already has no header/footer, making it trivially cheap to add.

All required stack is already installed: Next.js 16.1.6, React 19, Tailwind CSS v4, shadcn/ui, lucide-react, next/image. No new dependencies are needed. The visual system — OKLCH color tokens, `--brand-orange`, `--primary`, section utility classes, Inter font — is already established in `globals.css`. Every UI component needed (Button, Card, Badge, Image, Accordion) either exists or is a one-line shadcn add.

The core implementation work is: (1) 11 new section components under `src/components/course/`, (2) 2-3 new data modules under `src/lib/data/`, (3) a page assembler at `src/app/(landing)/happiness-program/page.tsx`, (4) copying image assets from `Logos/` into `public/images/course/`. The FAQ accordion is the only interactive element (client component); everything else is pure server-rendered HTML.

**Primary recommendation:** Build section-by-section following the intro page pattern exactly. One data module per data concern (course stats, course dates, course testimonials). All sections are Server Components; only FAQ needs `"use client"`. Ship the Accordion from shadcn rather than hand-rolling.

---

## Standard Stack

### Core (all already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router, Server Components, Image optimization | Already deployed to Vercel |
| react | 19.2.3 | UI rendering | Project baseline |
| tailwindcss | ^4 | Utility styling with OKLCH tokens | Already configured |
| lucide-react | ^0.575.0 | Icons (TrendingUp, TrendingDown, CheckCircle, etc.) | Already in use across intro page |
| shadcn/ui | via components.json | Button, Card, Badge, Accordion | Already wired |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn Accordion | one-line add | FAQ section | Client component, collapsible Q&A |
| next/image | built-in | All photos (hero, founder, testimonials) | Required for LCP optimization |
| radix-ui | ^1.4.3 | Already installed via shadcn | Underlying Accordion primitive |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn Accordion | `<details>/<summary>` HTML | Native HTML needs no JS but loses animation; shadcn matches existing component style |
| Static date list | Link to artofliving.org course finder | Static list is editable and local; link is lower maintenance — both are valid, decision is Claude's discretion |

**Installation (only if Accordion not yet added):**
```bash
npx shadcn@latest add accordion
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── (landing)/
│       └── happiness-program/     # new route (or /part-1)
│           └── page.tsx           # page assembler, all Server Components
├── components/
│   ├── course/                    # new — mirrors src/components/intro/
│   │   ├── hero-section.tsx
│   │   ├── program-overview-section.tsx
│   │   ├── research-stats-section.tsx
│   │   ├── media-logos-section.tsx
│   │   ├── course-content-section.tsx
│   │   ├── upcoming-dates-section.tsx
│   │   ├── founder-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── numbers-section.tsx
│   │   ├── faq-section.tsx        # "use client" — only client component
│   │   └── footer-cta.tsx
│   └── intro/                     # existing — do not modify
└── lib/
    └── data/
        ├── course-stats.ts        # new — 6 research percentage stats
        ├── course-dates.ts        # new — Devon/Southwest upcoming courses
        ├── course-testimonials.ts # new — Part 1 participant testimonials
        └── testimonials.ts        # existing — intro talk testimonials (do not touch)
```

### Pattern 1: Server Component Page Assembly (mirrors intro/page.tsx)
**What:** Page file imports and composes all section components. No logic, no state.
**When to use:** Always for the page root — keeps data loading and rendering co-located in each section.
**Example:**
```typescript
// src/app/(landing)/happiness-program/page.tsx
import type { Metadata } from "next"
import { HeroSection } from "@/components/course/hero-section"
import { ProgramOverviewSection } from "@/components/course/program-overview-section"
// ... all 11 sections

export const metadata: Metadata = {
  title: "Happiness Program | Art of Living Devon & Southwest",
  description: "Transform stress into calm in 3 days. Learn Sudarshan Kriya (SKY Breath Meditation), pranayama, and yoga — backed by 100+ peer-reviewed studies.",
}

export default function HappinessProgramPage() {
  return (
    <>
      <HeroSection />
      <ProgramOverviewSection />
      <ResearchStatsSection />
      <MediaLogosSection />
      <CourseContentSection />
      <UpcomingDatesSection />
      <FounderSection />
      <TestimonialsSection />
      <NumbersSection />
      <FaqSection />
      <FooterCTA />
    </>
  )
}
```

### Pattern 2: Data Module (mirrors intro-talks.ts / testimonials.ts)
**What:** Typed data arrays in `src/lib/data/`. Imported directly by Server Components — no fetch, no API.
**When to use:** All static content. Keeps components clean, data easy to update.
**Example:**
```typescript
// src/lib/data/course-stats.ts
export type CourseStat = {
  percentage: string
  direction: "up" | "down"   // maps to TrendingUp / TrendingDown lucide icon
  label: string
  timeframe: string
}

export const courseStats: CourseStat[] = [
  { percentage: "37%", direction: "up", label: "Increased calm", timeframe: "4 weeks" },
  { percentage: "23%", direction: "down", label: "Reduced anxiety", timeframe: "4 weeks" },
  { percentage: "31%", direction: "down", label: "Reduction in insomnia", timeframe: "" },
  { percentage: "60%", direction: "down", label: "Reduction in cortisol", timeframe: "3 months" },
  { percentage: "25%", direction: "up", label: "Increase in social connection", timeframe: "4 weeks" },
  { percentage: "34%", direction: "down", label: "Reduced depression", timeframe: "4 weeks" },
]
```

```typescript
// src/lib/data/course-dates.ts
export type CourseDate = {
  id: string
  format: "In-person" | "Online"
  location: string
  startDate: string
  endDate: string
  time: string
  timezone: string
  registrationUrl: string  // links to artofliving.org course finder
  badge?: string
}

export const courseDates: CourseDate[] = [
  // Static list — updatable without code changes
  {
    id: "2026-04-05-exeter",
    format: "In-person",
    location: "Exeter, Devon",
    startDate: "5 April 2026",
    endDate: "7 April 2026",
    time: "10:00 AM – 1:00 PM",
    timezone: "BST",
    registrationUrl: "https://www.artofliving.org/gb-en/courses/art-of-living-part-one",
    badge: "Next Available",
  },
  // Add additional dates
]
```

### Pattern 3: External CTA Link (COURSE-04)
**What:** All CTAs on this page are external links to the official AoL registration page, not form submissions.
**When to use:** Every Register Now button on the course page.
**Example:**
```typescript
// External link pattern — no Server Action, no form
<a
  href="https://www.artofliving.org/gb-en/courses/art-of-living-part-one"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button size="lg" className="...">
    Register Now
  </Button>
</a>
```
Note: The exact AoL course finder URL for Devon/Southwest needs confirmation. Pattern is `artofliving.org/gb-en/courses/...`. The course dates data module should centralize this URL so it is updated in one place.

### Pattern 4: Research Stats Grid (6 cards, 2 rows of 3)
**What:** 6 stat cards with large percentage, directional arrow icon, label, and timeframe. Mirrors the UK reference page layout exactly.
**When to use:** ResearchStatsSection.
**Example:**
```typescript
import { TrendingUp, TrendingDown } from "lucide-react"
import { courseStats } from "@/lib/data/course-stats"

// In the component:
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
  {courseStats.map((stat) => (
    <div key={stat.label} className="text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        {stat.direction === "up" ? (
          <TrendingUp className="h-5 w-5 text-primary" />
        ) : (
          <TrendingDown className="h-5 w-5 text-primary" />
        )}
        <span className="text-3xl sm:text-4xl font-bold text-primary">
          {stat.percentage}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-snug">{stat.label}</p>
      {stat.timeframe && (
        <p className="text-xs text-muted-foreground/70">in {stat.timeframe}</p>
      )}
    </div>
  ))}
</div>
```

### Pattern 5: FAQ Accordion (only client component)
**What:** shadcn Accordion with `"use client"` directive. All other sections are Server Components.
**When to use:** FaqSection only.
**Example:**
```typescript
"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  { q: "How long is the Happiness Program?", a: "3 days, approximately 3 hours each day." },
  { q: "How much does it cost?", a: "..." },
  // ...
]

export function FaqSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="...">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```

### Pattern 6: Hero Background Image (mirrors intro HeroSection exactly)
**What:** `next/image` with `fill` prop + `priority` + gradient overlay div. Not CSS `background-image`.
**When to use:** HeroSection hero background. Required for Next.js image optimization.
**Example:**
```typescript
<section className="relative overflow-hidden min-h-[65vh] flex items-center">
  <div className="absolute inset-0 z-0">
    <Image src="/images/course/hero.webp" alt="" fill className="object-cover" priority />
  </div>
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
  <div className="relative z-20 max-w-4xl mx-auto px-4 py-16 text-center">
    {/* content */}
  </div>
</section>
```

### Anti-Patterns to Avoid
- **Client components for static sections:** Only FaqSection needs `"use client"`. Hero, stats, dates, testimonials are all pure Server Components.
- **Hardcoding the AoL registration URL in multiple places:** Centralize in `course-dates.ts` or a `course-config.ts` constant.
- **Reusing intro testimonials for course testimonials:** They target different audiences — separate data modules, separate testimonial photos.
- **Importing from `src/components/intro/` in course sections:** Each page has its own component folder. Reuse only truly shared primitives (Button, Card, etc. from `components/ui/`).
- **CSS `background-image` for hero:** Use `next/image` with `fill` (established pattern from Phase 3).
- **`<img>` tags:** Always `next/image` for optimization and Core Web Vitals.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ expand/collapse | Custom toggle state | shadcn Accordion | Already available in project; keyboard-accessible, animated, ARIA-compliant |
| Image optimization | `<img>` tags | next/image with `fill` or `width/height` | LCP optimization, WebP auto-conversion, lazy loading — established project pattern |
| Directional stat arrows | Custom SVG | lucide-react TrendingUp/TrendingDown | Already installed, correct visual convention for statistics |
| Brand color tokens | Inline hex values | `--primary`, `--brand-orange` OKLCH variables | Already defined in globals.css; consistent with intro page |

**Key insight:** This page is intentionally dumb — no forms, no state, no API calls. The complexity budget should go into copy quality and visual polish, not technical infrastructure.

---

## Common Pitfalls

### Pitfall 1: Wrong route path
**What goes wrong:** Page created at `/course` or `/part-1` instead of the agreed `/happiness-program`.
**Why it happens:** Multiple route name candidates existed in discussion.
**How to avoid:** Create `src/app/(landing)/happiness-program/page.tsx`. The CONTEXT.md says "at `/happiness-program` (or `/part-1`)" — pick `/happiness-program` as it matches the marketing name.
**Warning signs:** Navigation links to the page 404.

### Pitfall 2: Using intro testimonials for course section
**What goes wrong:** Same 5 testimonials from intro page appear on course page.
**Why it happens:** `testimonials.ts` already exists and is reachable.
**How to avoid:** Create `course-testimonials.ts` with 3 different testimonials focused on life transformation outcomes (stress relief, sleep, relationships). The CONTEXT.md explicitly distinguishes these.
**Warning signs:** Testimonials reference "intro talk" language instead of "the course."

### Pitfall 3: Accordion component not installed
**What goes wrong:** `import { Accordion } from "@/components/ui/accordion"` fails — file doesn't exist.
**Why it happens:** shadcn components are added on demand with `npx shadcn@latest add accordion`.
**How to avoid:** Check for `src/components/ui/accordion.tsx` before writing FaqSection. Add it if missing.
**Warning signs:** TypeScript import error at build time.

### Pitfall 4: AoL registration URL — wrong locale
**What goes wrong:** CTA links to US or generic AoL page, not UK.
**Why it happens:** artofliving.org has locale-specific URLs. UK is `/gb-en/`.
**How to avoid:** Use `https://www.artofliving.org/gb-en/courses/art-of-living-part-one` as the base registration URL.
**Warning signs:** Visitors land on a non-UK registration page.

### Pitfall 5: Hero image missing from public/
**What goes wrong:** next/image 404s because image wasn't copied to `public/`.
**Why it happens:** The relevant images are in `Logos/` (untracked) and `public/images/intro/` — neither automatically becomes a course image.
**How to avoid:** Explicitly copy needed assets from `Logos/` to `public/images/course/` as a plan task. Available in `Logos/`: `AboutArtOfLiving.webp`, `BreakFreeFromLimiting.webp`, `PowerOfSudarshanKriya.webp`, `sudarshan-kriya.webp` (in `public/images/intro/`), `about-art-of-living.webp` (in `public/images/intro/`).
**Warning signs:** Hero section shows broken image in browser.

### Pitfall 6: Founder photo — Sri Sri Ravi Shankar
**What goes wrong:** No photo asset available for the founder section.
**Why it happens:** The `Logos/` folder does not contain a Gurudev photo — only `AboutArtOfLiving.webp` (crowd/group image).
**How to avoid:** Either use `AboutArtOfLiving.webp` as a side image for the founder section, or use a gradient placeholder with a TODO comment (established Phase 3 pattern). Do not use an external URL for a person's photo.
**Warning signs:** Missing image in founder section.

### Pitfall 7: Stats block direction arrows — semantic mismatch
**What goes wrong:** TrendingDown shown for "25% increase in social connection" (direction: "up").
**Why it happens:** Data entry error when populating course-stats.ts.
**How to avoid:** Review each of the 6 stats carefully: calm (up), anxiety (down), insomnia (down), cortisol (down), social connection (up), depression (down).
**Warning signs:** Arrow icon contradicts the percentage label visually.

---

## Code Examples

### Course Stats Data Module
```typescript
// Source: project pattern from src/lib/data/credibility-stats.ts
// File: src/lib/data/course-stats.ts
export type CourseStat = {
  percentage: string
  direction: "up" | "down"
  label: string
  timeframe: string
}

export const courseStats: CourseStat[] = [
  { percentage: "37%", direction: "up",   label: "Increased calm",              timeframe: "4 weeks" },
  { percentage: "23%", direction: "down", label: "Reduced anxiety",             timeframe: "4 weeks" },
  { percentage: "31%", direction: "down", label: "Reduction in insomnia",       timeframe: "" },
  { percentage: "60%", direction: "down", label: "Reduction in cortisol",       timeframe: "3 months" },
  { percentage: "25%", direction: "up",   label: "Increase in social connection", timeframe: "4 weeks" },
  { percentage: "34%", direction: "down", label: "Reduced depression",          timeframe: "4 weeks" },
]
```

### Upcoming Dates Card
```typescript
// Pattern: self-contained card, external CTA link
<div className="rounded-xl border border-border/50 p-5 bg-background shadow-sm hover:shadow-md transition-shadow">
  <div className="flex items-start justify-between gap-4 mb-3">
    <div>
      <p className="font-semibold text-base">{course.startDate} – {course.endDate}</p>
      <p className="text-sm text-muted-foreground">{course.location}</p>
      <p className="text-sm text-muted-foreground">{course.time} {course.timezone}</p>
    </div>
    <Badge variant="secondary">{course.format}</Badge>
  </div>
  <a href={course.registrationUrl} target="_blank" rel="noopener noreferrer">
    <Button className="w-full">Register Now</Button>
  </a>
</div>
```

### Numbers Section (Art of Living in Numbers)
```typescript
// Pattern: mirrors AboutSection stats grid but with course-level numbers
const aolNumbers = [
  { number: "44", label: "Years of teaching" },
  { number: "180+", label: "Countries" },
  { number: "40,000+", label: "Certified teachers" },
  { number: "800M+", label: "People reached" },
]
// 2x2 grid on mobile, 4-col on lg — same pattern as AboutSection
```

### Media Logos Section (reuse MediaLogosSection pattern with quotes)
```typescript
// CONTEXT.md says "actual quotes from the reference" — add quote text below each logo
const mediaFeatures = [
  { name: "CNN", style: "font-black tracking-tight text-gray-700",
    quote: "Breathing technique that can change your life" },
  { name: "Yoga Journal", style: "font-semibold italic text-gray-600",
    quote: "One of the world's leading wellness organizations" },
  { name: "Harvard Health Publishing", style: "font-semibold text-gray-700 text-sm",
    quote: "Research-supported benefits of breathing practices" },
  { name: "The Washington Post", style: "font-serif font-bold text-gray-700",
    quote: "The breath as medicine" },
]
```

### Course Testimonials Data Module (3 testimonials, Part 1 focus)
```typescript
// Source: mirrors src/lib/data/testimonials.ts pattern
// File: src/lib/data/course-testimonials.ts
// All 5 existing testimonials in testimonials.ts are from Part 1 participants
// (Dr. Joe Rod, Mawahib Shaibani, Phillip Mertz, Charlotte Puls, Glenn Haig)
// Select 3 focused on transformation outcomes; photos available in Logos/ folder:
// Charlotte Puls.webp, Glenn Douglas Haig.webp, Philip Mertz.webp
// Mawahib Shaibani.webp

export const courseTestimonials: Testimonial[] = [
  // Pick 3 from existing testimonials.ts pool — different from which 3-4 show on intro page
  // Prefer: Glenn Haig ("anxiousness to peace"), Charlotte Puls ("15 years"), Phillip Mertz ("happy for no reason")
  // These focus on lasting transformation (course outcome) vs. curiosity (intro talk outcome)
]
```

**Note on testimonial photos:** Logos folder has `Charlotte Puls.webp`, `Glenn Douglas Haig.webp`, `Philip Mertz.webp`, `Mawahib Shaibani.webp`. These need to be copied to `public/images/course/testimonials/` as a plan task — they are untracked assets.

---

## Asset Inventory

Assets available for the course page (must be copied to `public/images/course/` before use):

| Source Path | Target Path | Use |
|-------------|-------------|-----|
| `Logos/AboutArtOfLiving.webp` | `public/images/course/about-art-of-living.webp` | Founder section background or side image |
| `Logos/BreakFreeFromLimiting.webp` | `public/images/course/break-free.webp` | Hero or program overview image |
| `Logos/PowerOfSudarshanKriya.webp` | `public/images/course/sudarshan-kriya.webp` | Course content section |
| `Logos/Charlotte Puls.webp` | `public/images/course/testimonials/charlotte-puls.webp` | Testimonial |
| `Logos/Glenn Douglas Haig.webp` | `public/images/course/testimonials/glenn-haig.webp` | Testimonial |
| `Logos/Philip Mertz.webp` | `public/images/course/testimonials/philip-mertz.webp` | Testimonial |
| `Logos/Mawahib Shaibani.webp` | `public/images/course/testimonials/mawahib-shaibani.webp` | Testimonial (backup) |
| `public/images/intro/about-art-of-living.webp` | Already in public — can reference directly | Alternative founder image |
| `public/images/intro/sudarshan-kriya.webp` | Already in public — can reference directly | Alternative course content image |
| `public/images/intro/break-free.webp` | Already in public — can reference directly | Alternative hero |

**Finding:** Several images that appear in `Logos/` are already copied to `public/images/intro/` (sudarshan-kriya.webp, about-art-of-living.webp, break-free.webp). The planner can decide whether to reuse these from `/images/intro/` or create a dedicated `/images/course/` folder for clarity.

**Actual logos available:** `Logos/CNN.svg`, `Logos/Harvard.webp`, `Logos/Yoga Journal.webp`, `Logos/Washington Post.webp` — these are real brand assets. The intro page currently uses styled text. The course page CAN use actual logo images from the Logos folder if copied to public.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS `background-image` for heroes | `next/image` with `fill` + priority | Phase 3 decision | LCP score, automatic WebP, lazy loading |
| Zod v3 `errorMap` | Zod v4 `message` param on `z.literal` | Phase 2 decision | Different API — matters for forms, but no forms on this page |
| Inline hex colors | OKLCH CSS variables via `--primary`, `--brand-orange` | Phase 1 decision | All new components MUST use CSS variables, not `#FF6B35` |
| `<img>` tags | `next/image` with explicit `width`/`height` or `fill` | Project standard | Required for Next.js image optimization |

---

## Open Questions

1. **Route: `/happiness-program` vs `/part-1`**
   - What we know: CONTEXT.md says "`/happiness-program` (or `/part-1`)" — both considered
   - What's unclear: Neither is locked
   - Recommendation: Use `/happiness-program` — it is the marketing name, more descriptive for SEO, and avoids confusion with "Part 1" as a course level number

2. **Founder photo: no Gurudev image in assets**
   - What we know: No photo of Sri Sri Ravi Shankar exists in `Logos/` or `public/`. `AboutArtOfLiving.webp` appears to be a group/event photo.
   - What's unclear: Whether user has a Gurudev photo they can provide
   - Recommendation: Use `AboutArtOfLiving.webp` as a large ambient image for the section, feature the Gurudev quote prominently, and add a TODO comment for swapping in a portrait photo later

3. **Upcoming Devon/Southwest course dates: are real dates available?**
   - What we know: `course-dates.ts` will be a static list; CONTEXT.md says "local Devon/Southwest course listings"
   - What's unclear: Whether actual upcoming course dates have been confirmed
   - Recommendation: Populate with 2-3 plausible placeholder dates (March/April/May 2026) and use the official AoL course finder URL as the registration link. Add a prominent TODO comment.

4. **Media logos: styled text vs actual image files**
   - What we know: Intro page uses styled text. `Logos/` has actual SVG/webp logo files (CNN.svg, Harvard.webp, Yoga Journal.webp, Washington Post.webp)
   - What's unclear: Whether brand permissions apply
   - Recommendation: Use actual logo image files on the course page since they are available. The intro page was built without them because it was phase 3 — now they exist.

5. **Accordion: is it already installed?**
   - What we know: `package.json` has `radix-ui` and `shadcn`. No `src/components/ui/accordion.tsx` confirmed in file listing.
   - What's unclear: Whether accordion has been added via `npx shadcn add accordion`
   - Recommendation: Planner should include a task to check and add accordion if missing, before building FaqSection.

---

## Validation Architecture

> Skipped — `workflow.nyquist_validation` is not present in `.planning/config.json`. The config contains `workflow.research`, `workflow.plan_check`, and `workflow.verifier` but no `nyquist_validation` key. Section omitted per instructions.

---

## Sources

### Primary (HIGH confidence)
- Project codebase — `src/app/(landing)/intro/page.tsx`, `src/components/intro/*.tsx`, `src/lib/data/*.ts`, `src/app/globals.css` — direct read, current
- `package.json` — exact dependency versions as installed
- `.planning/phases/05-course-landing-page/05-CONTEXT.md` — user decisions, locked
- `.planning/REQUIREMENTS.md` — COURSE-01 through COURSE-05 verbatim

### Secondary (MEDIUM confidence)
- `Logos/` directory listing — asset inventory, confirmed by `find` command
- `public/images/intro/` directory listing — existing public assets confirmed

### Tertiary (LOW confidence)
- AoL UK registration URL pattern (`/gb-en/courses/art-of-living-part-one`) — inferred from domain locale convention; should be verified before go-live

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries confirmed installed via package.json
- Architecture: HIGH — mirrors existing working intro page structure exactly
- Pitfalls: HIGH — most derived from project decisions logged in STATE.md
- AoL registration URL: LOW — locale URL pattern inferred, not verified

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (stable stack, 30-day window)
