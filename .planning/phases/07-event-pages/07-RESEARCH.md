# Phase 7: Event Pages - Research

**Researched:** 2026-02-26
**Domain:** Next.js dynamic routes, data-driven page templates, event landing page UX
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Registration mechanism**
- Primary CTA: external link to Art of Living portal or ticketing system (Eventbrite etc.)
- "Register Now" button links to a configurable external URL per event
- On-page email opt-in form also present on each event page
- Email form UI built in Phase 7; Brevo API connection wired in Phase 9
- Per-event Brevo lists (architecture decided here, implementation in Phase 9)

**Template reuse**
- One config/data file per event drives the entire page (title, date, time, location, price, description, registration URL, image, etc.)
- Dynamic Next.js route: `/events/[slug]` (e.g. `/events/satsang-2026-march`)
- New event = create a new config file and deploy. No template code to touch.
- Events index page (/events): Claude's discretion

**Event content & display**
- All section decisions at Claude's discretion, optimised for maximum conversion
- Reference: London Satsang page (events.artofliving.eu) as structural inspiration
- Required sections: hero with event name/date/CTA, event details bar (where/when/duration/price), experiential overview, explainer section, social proof
- Videos included — Claude decides format and placement (YouTube embed or section)
- Social proof: both credibility logos (CNN, Vogue, Harvard Health, Yale, etc.) AND local Devon/Southwest attendee testimonials
- Pricing display: Claude's discretion

**Visual design & branding**
- No navigation header — standalone focused landing page (same as intro talk page)
- Visually elevated — dramatically better than current state; rich, immersive design
- Uses stock photography as placeholder; template designed to shine with real event photography
- Color/mood: Claude's discretion — event pages can have their own atmospheric feel while staying on-brand

### Claude's Discretion
- Events index page (/events) — whether to include and what it shows
- Video placement and format (autoplay hero, mid-page section, testimonial clips)
- Price display treatment (transparency vs. mystery, framing copy)
- Section ordering and naming
- Image overlay/treatment styles
- Whether to give different event types (Satsang vs. Kirtan) distinct color accents

### Deferred Ideas (OUT OF SCOPE)
- Brevo API wiring for email opt-in — scoped to Phase 9
- Per-event Brevo list creation and mapping — scoped to Phase 9
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| EVENT-01 | Reusable event page template for Satsang, Kirtan, and other community events | Dynamic `/events/[slug]` route driven by per-event data files; single template component tree renders all events |
| EVENT-02 | Each event page displays date, time, location, description, and price if applicable | EventConfig type includes all these fields; details bar section pattern maps directly |
| EVENT-03 | Each event page has registration or ticket link (external or on-page form) | External CTA link + on-page email opt-in form (stub, Brevo wiring deferred to Phase 9) |
</phase_requirements>

---

## Summary

Phase 7 builds a reusable, data-driven event landing page template inside the existing Next.js project. The pattern is well-established in this codebase: define a TypeScript config type, create one data file per event, and have a single page template that renders from that data. This is exactly what was done for courses (`CourseDate` type, `course-dates.ts` data file) and intro talks (`IntroTalkSession` type, `intro-talks.ts` data file).

The key architectural decision is to use Next.js dynamic routing (`/events/[slug]/page.tsx`) within the `(landing)` route group so the page renders with no site header or footer — a standalone marketing funnel matching the intro talk and course page patterns. A lookup from slug to event config at render time provides full SSG/SSR compatibility. A simple events index at `/events` can list upcoming events as cards, linking into each detail page.

The email opt-in form is UI-only in this phase. It should render the same field structure (name + email + GDPR consent) as the intro talk registration form but submit to a no-op handler that records the intent. The Brevo API wiring is explicitly deferred to Phase 9. This means the form can be a controlled component with a stub server action that logs submission and returns a success state — the full integration slot is reserved for Phase 9.

**Primary recommendation:** Place `/events/[slug]` inside the `(landing)` route group, drive the entire page from a single `EventConfig` object per event stored in `src/lib/data/events/`, and build 8-10 section components under `src/components/events/` following the exact same component-per-section pattern used for intro talk and course pages.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (installed) | Dynamic `[slug]` routing, SSG page generation, Server Actions | Already in project; dynamic routes are a core Next.js feature |
| React | 19.2.3 (installed) | Component tree for all sections | Already in project |
| Tailwind CSS v4 | ^4 (installed) | OKLCH color system, utility-first styling | Already in project with brand tokens |
| shadcn/ui | via `radix-ui` + `shadcn` (installed) | Button, Card, Badge, Input, Checkbox, Label components | Already installed and themed to brand |
| lucide-react | ^0.575.0 (installed) | Icons for details bar (MapPin, Clock, Calendar, Ticket) | Already in project |
| next/image | built-in | Hero background, section images, testimonial avatars | Already used across all pages for optimization |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zod | ^4.3.6 (installed) | Validate email opt-in form fields | Same pattern as intro talk registration form |
| react-hook-form / useActionState | installed | Email opt-in form state management | Match existing registration form approach |
| tw-animate-css | ^1.4.0 (installed) | Subtle entrance animations on scroll | Optional — use sparingly for elevated feel |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static data files per event | CMS (Contentful, Sanity) | CMS adds external dependency; static files are zero-cost, fast, and Git-versioned — right for this scale |
| `generateStaticParams` | Server-only dynamic render | Static params preferred for event pages (fast, cacheable); use server render if events change very frequently |

**Installation:** No new packages needed. All required libraries are already installed.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── (landing)/
│       └── events/
│           ├── [slug]/
│           │   └── page.tsx          # Dynamic event page (per-event SSG)
│           └── page.tsx              # Events index (list of upcoming events)
├── components/
│   └── events/
│       ├── event-hero-section.tsx    # Full-bleed hero with event name, date, primary CTA
│       ├── event-details-bar.tsx     # Sticky or inline: where/when/duration/price
│       ├── event-experience-section.tsx   # Experiential "what it feels like" copy + image
│       ├── event-explainer-section.tsx    # What is Satsang/Kirtan? Education section
│       ├── event-video-section.tsx   # YouTube embed (iframe, no autoplay per REQUIREMENTS)
│       ├── event-social-proof.tsx    # Credibility logos + local testimonials
│       ├── event-email-optin.tsx     # On-page email form (stub — Brevo wired Phase 9)
│       └── event-footer-cta.tsx     # Final register CTA above page end
└── lib/
    └── data/
        └── events/
            ├── index.ts              # getAllEvents() and getEventBySlug() helpers
            ├── satsang-2026-march.ts # One file per event (or all in events.ts array)
            └── kirtan-2026-april.ts  # Optional second event for demo
```

### Pattern 1: EventConfig Data Module

**What:** A strongly-typed TypeScript object per event. The page template consumes one `EventConfig` and renders all sections. New event = new file (or new entry in array).

**When to use:** Always — this is the only pattern for this phase.

```typescript
// src/lib/data/events/index.ts
// Source: project pattern from src/lib/data/intro-talks.ts and course-dates.ts

export type EventConfig = {
  slug: string
  title: string
  subtitle?: string        // e.g. "An evening of chant and meditation"
  eventType: "satsang" | "kirtan" | "community" | "special"
  date: string             // "Saturday 15 March 2026"
  dateISO: string          // "2026-03-15T19:00:00Z"
  time: string             // "7:00 PM"
  timezone: string         // "GMT" | "BST"
  duration: string         // "2 hours"
  location: string         // "Exeter Community Centre, EX4 3AT"
  locationMapUrl?: string  // Google Maps URL
  description: string      // Short marketing description (1-2 sentences)
  longDescription?: string // Richer body copy
  price: string | null     // "£8" | "Free" | null (null = price on enquiry)
  registrationUrl: string  // External link (Art of Living portal / Eventbrite)
  heroImage: string        // "/images/events/satsang-hero.jpg"
  videoUrl?: string        // YouTube embed URL (no autoplay)
  testimonials?: EventTestimonial[]
  brevoListId?: number     // Reserved for Phase 9 — leave undefined in Phase 7
  seoTitle?: string
  seoDescription?: string
  robots?: { index: boolean; follow: boolean }
}

export type EventTestimonial = {
  name: string
  quote: string
  highlight?: string
}

export const events: EventConfig[] = [
  {
    slug: "satsang-2026-march",
    title: "Satsang Evening",
    subtitle: "Meditation, chant, and silence",
    eventType: "satsang",
    date: "Saturday 15 March 2026",
    dateISO: "2026-03-15T19:00:00Z",
    time: "7:00 PM",
    timezone: "GMT",
    duration: "2 hours",
    location: "Exeter, Devon",
    description: "Join us for an evening of guided meditation, kirtan chanting, and deep collective silence.",
    price: "Free — donations welcome",
    registrationUrl: "https://www.artofliving.org/gb-en/events",
    heroImage: "/images/intro/meditation-group.jpg",
  },
]

export function getEventBySlug(slug: string): EventConfig | undefined {
  return events.find((e) => e.slug === slug)
}

export function getAllEvents(): EventConfig[] {
  return events
}
```

### Pattern 2: Dynamic Route with generateStaticParams

**What:** Next.js SSG for event pages. At build time, generates one static HTML file per event slug. Zero runtime cost.

**When to use:** All event pages. Matches how the rest of the site is built.

```typescript
// src/app/(landing)/events/[slug]/page.tsx
// Source: Next.js docs — generateStaticParams pattern

import { notFound } from "next/navigation"
import { getAllEvents, getEventBySlug } from "@/lib/data/events"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return getAllEvents().map((event) => ({ slug: event.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return {}
  return {
    title: event.seoTitle ?? `${event.title} | Art of Living Devon`,
    description: event.seoDescription ?? event.description,
    robots: event.robots ?? { index: true, follow: true },
  }
}

export default async function EventPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  return (
    <>
      {/* Conversion funnel order:
          1. Hero — event name, date, primary CTA button
          2. Details bar — where/when/duration/price at a glance
          3. Experience section — "what it feels like" narrative
          4. Explainer — what is Satsang/Kirtan?
          5. Video — past event or teacher introduction (if provided)
          6. Social proof — credibility logos + local testimonials
          7. Email opt-in — capture leads (Brevo wiring Phase 9)
          8. Footer CTA — final register button
      */}
      <EventHeroSection event={event} />
      <EventDetailsBar event={event} />
      <EventExperienceSection event={event} />
      <EventExplainerSection event={event} />
      {event.videoUrl && <EventVideoSection videoUrl={event.videoUrl} />}
      <EventSocialProof testimonials={event.testimonials} />
      <EventEmailOptin event={event} />
      <EventFooterCta event={event} />
    </>
  )
}
```

### Pattern 3: Email Opt-in Stub (Phase 7)

**What:** A UI-complete email form with a stub server action. Stores nothing, returns success state. The slot is reserved for Phase 9 Brevo wiring.

**When to use:** EmailOptin section only.

```typescript
// src/actions/event-optin.ts
"use server"

export type OptinState = {
  success: boolean
  message: string
}

export async function subscribeToEventUpdates(
  _prev: OptinState,
  formData: FormData
): Promise<OptinState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    return { success: false, message: "Please fill in all required fields." }
  }

  // TODO Phase 9: Wire to Brevo API with per-event list ID
  console.log("[Phase 7 stub] Event opt-in:", { name, email })

  return {
    success: true,
    message: "Thanks! We'll send event updates to your inbox.",
  }
}
```

### Pattern 4: Events Index Page

**What:** `/events` lists all upcoming events as photo cards. Uses the same `getAllEvents()` helper. Part of `(main)` route group (has site header/footer) — this is a directory page, not a landing page.

**Recommendation:** Include the index page. The homepage already links to `/events` (see `offerings-section.tsx`). Without it, that link 404s. A simple grid of event cards is low effort and high value.

**Route group decision:** `/events` index should be in `(main)` (with header/footer — it's a browsing page), while `/events/[slug]` should be in `(landing)` (no header/footer — it's a conversion funnel).

```
src/app/
├── (main)/
│   └── events/
│       └── page.tsx    # Events index — has SiteHeader + SiteFooter
└── (landing)/
    └── events/
        └── [slug]/
            └── page.tsx  # Individual event — no header/footer
```

**Important:** Next.js route groups allow this split. Both `(main)/events/page.tsx` and `(landing)/events/[slug]/page.tsx` coexist without conflict — the `[slug]` is in a separate segment.

### Anti-Patterns to Avoid

- **Hardcoding event data in component JSX:** Every field that might change (title, date, price, URL) must come from `EventConfig`. Hardcoded content breaks the template reuse goal.
- **Putting `/events/[slug]` in `(main)` route group:** The event detail page is a conversion funnel — no navigation header should appear. Use `(landing)` like the intro talk and course pages.
- **Using `router.push()` for external registration link:** The registration URL is external. Use a plain `<a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">` or a shadcn `Button` rendered as an anchor (not `Link` — that's for internal routes).
- **Blocking on Phase 9 features:** The email form must render and "work" (UI complete, stub action) in Phase 7. Do not leave it as a TODO or placeholder skeleton.
- **Auto-playing video:** REQUIREMENTS.md explicitly forbids autoplay video (increases bounce rate, bad for mobile). Use a click-to-play YouTube embed only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YouTube embed | Custom iframe wrapper with play/pause JS | Plain `<iframe>` with `src="https://www.youtube-nocookie.com/embed/{id}"` | YouTube's privacy-enhanced embed handles all player logic; `youtube-nocookie.com` reduces tracking cookies |
| External link button | Custom anchor element | shadcn `Button` with `asChild` + `<a>` | Consistent styling, accessible, already in project |
| Map link | Embedded Google Maps (heavy) | Plain text address + `locationMapUrl` as anchor | Embedded maps add significant JS weight; a link to Google Maps is lightweight and equally useful |
| Form validation | Manual regex checks | Zod schema + `useActionState` (already used for intro form) | Same pattern already proven in the project |
| Image optimization | `<img>` tags | `next/image` with `fill` prop for hero, fixed sizes for thumbnails | Automatic WebP, lazy loading, prevents CLS |
| 404 for invalid slug | Manual guard | `notFound()` from `next/navigation` | Renders Next.js 404 page correctly, same pattern as confirmation page |

**Key insight:** This phase is almost entirely composition of existing project patterns. New code volume is low — the value is in design quality and conversion-optimized section structure.

---

## Common Pitfalls

### Pitfall 1: params is now a Promise in Next.js 15+

**What goes wrong:** `params.slug` throws a TypeScript error or runtime error in Next.js 16.

**Why it happens:** Next.js 15 changed page props — `params` and `searchParams` are now Promise-wrapped. This project uses Next.js 16.1.6.

**How to avoid:** Always `await params` before destructuring. See Pattern 2 code example above.

**Warning signs:** TypeScript error "Property 'slug' does not exist on type 'Promise<...>'" — or runtime undefined slug.

### Pitfall 2: Route Group Conflict for /events

**What goes wrong:** Having both `(main)/events/page.tsx` (index) and `(landing)/events/[slug]/page.tsx` (detail) might seem like a conflict.

**Why it happens:** Developers assume route groups share a URL namespace and could collide.

**How to avoid:** Route groups (folders in parentheses) are invisible to the URL. `(main)/events/page.tsx` resolves to `/events` and `(landing)/events/[slug]/page.tsx` resolves to `/events/[slug]`. These are different URL paths — no conflict. Next.js resolves them correctly.

**Warning signs:** 404 on `/events` or `/events/some-slug` — check the folder nesting is exactly right.

### Pitfall 3: External Registration Link Rendered as Next.js Link

**What goes wrong:** Using `<Link href={event.registrationUrl}>` for an external URL navigates via the Next.js router, which fails for external domains.

**Why it happens:** `Link` is designed for internal navigation.

**How to avoid:** Use `<a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">` or `<Button asChild><a href={...} target="_blank">Register Now</a></Button>`.

### Pitfall 4: generateStaticParams Not Exported

**What goes wrong:** Page renders server-side on every request instead of being statically generated.

**Why it happens:** `generateStaticParams` must be exported from the page file (not a helper module).

**How to avoid:** Export it directly from `src/app/(landing)/events/[slug]/page.tsx`. Check Vercel build logs for "Dynamic" vs "Static" route indicator.

### Pitfall 5: Email Form Submits Without GDPR Consent

**What goes wrong:** Email opt-in form collects data without explicit consent checkbox, violating UK GDPR/PECR requirements already established in this project.

**Why it happens:** Developer forgets the consent field present on the intro talk form.

**How to avoid:** EventEmailOptin component MUST include: unticked GDPR consent checkbox, privacy policy link, and explicit "I agree to receive event updates" label — matching the intro talk registration form pattern exactly.

---

## Code Examples

### Hero Section with Full-Bleed Image (established project pattern)

```tsx
// Source: src/components/intro/hero-section.tsx (project codebase)
// Pattern: relative container, absolute image fill, gradient overlay, content z-20

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { EventConfig } from "@/lib/data/events"

export function EventHeroSection({ event }: { event: EventConfig }) {
  return (
    <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={event.heroImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center w-full">
        <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
          {event.eventType === "satsang" ? "Community Satsang" : event.eventType}
        </Badge>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          {event.title}
        </h1>
        {event.subtitle && (
          <p className="text-white/80 text-lg sm:text-xl mb-6">{event.subtitle}</p>
        )}
        <p className="text-white/70 text-base mb-8">
          {event.date} · {event.time} {event.timezone}
        </p>
        <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="h-14 text-lg font-semibold px-10 shadow-lg shadow-primary/30">
            Register Now
          </Button>
        </a>
      </div>
    </section>
  )
}
```

### Details Bar (icon grid)

```tsx
// Source: project pattern from lucide-react usage in intro components
import { MapPin, Clock, Calendar, Ticket } from "lucide-react"
import type { EventConfig } from "@/lib/data/events"

export function EventDetailsBar({ event }: { event: EventConfig }) {
  const details = [
    { icon: Calendar, label: "Date", value: event.date },
    { icon: Clock, label: "Time", value: `${event.time} ${event.timezone} · ${event.duration}` },
    { icon: MapPin, label: "Location", value: event.location },
    { icon: Ticket, label: "Price", value: event.price ?? "Contact us" },
  ]

  return (
    <section className="bg-zinc-950 text-white py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            <p className="text-xs text-white/50 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-medium">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

### YouTube Privacy-Enhanced Embed (no autoplay)

```tsx
// Source: YouTube IFrame Player API docs — privacy-enhanced domain
// youtube-nocookie.com reduces third-party cookies without losing embed functionality

export function EventVideoSection({ videoUrl }: { videoUrl: string }) {
  // Expect videoUrl like: https://www.youtube-nocookie.com/embed/VIDEO_ID
  return (
    <section className="py-16 sm:py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl"
            src={videoUrl}
            title="Event video"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
```

---

## Section Order Recommendation

Based on the London Satsang reference and established project conversion funnel patterns:

1. **EventHeroSection** — Full-bleed image, event name, date/time, primary "Register Now" CTA
2. **EventDetailsBar** — Sticky or inline strip: date / time+duration / location / price (icon grid, dark bg)
3. **EventExperienceSection** — "What it feels like" — sensory, emotional copy. Pull quote. 2-col layout (text + image)
4. **EventExplainerSection** — "What is Satsang / Kirtan?" — educational, removes uncertainty. Icon grid or step layout
5. **EventVideoSection** — YouTube embed (conditional: only renders if `event.videoUrl` defined)
6. **EventSocialProof** — Credibility logos (CNN, Yale, Harvard, Vogue) + 2-3 local Devon testimonial cards
7. **EventEmailOptin** — "Stay in the loop" — name + email + GDPR consent — stub in Phase 7, Brevo in Phase 9
8. **EventFooterCta** — Repeat primary CTA: "Register Now" with date/location reminder

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params.slug` (direct) | `const { slug } = await params` | Next.js 15 | Must await params — already applies in this project at Next.js 16 |
| `getServerSideProps` | Server Components + `generateStaticParams` | Next.js 13+ App Router | No need for data fetching hooks — read data directly in async page components |
| `<iframe>` with `youtube.com` | `<iframe>` with `youtube-nocookie.com` | Ongoing privacy best practice | Reduces cookie consent friction |

**Deprecated/outdated:**
- `getStaticPaths` / `getStaticProps`: Replaced by `generateStaticParams` + async Server Components in App Router. Do not use.
- `pages/` directory pattern: This project uses App Router exclusively.

---

## Open Questions

1. **Events index route group placement**
   - What we know: Homepage `OfferingsSection` links to `/events`. Main layout has SiteHeader + SiteFooter.
   - What's unclear: Whether `/events` index should be in `(main)` (browsing) or `(landing)` (focused).
   - Recommendation: Use `(main)` route group for `/events` index — it's a directory page, benefits from nav context. Use `(landing)` for `/events/[slug]` — it's a conversion funnel with no distraction nav.

2. **Seed event content**
   - What we know: A Satsang event for Devon/Southwest should be created as a working example.
   - What's unclear: Actual dates, prices, and locations for real events.
   - Recommendation: Create one placeholder event (`satsang-2026-march`) with clearly marked TODO fields for date/price/registrationUrl. This demonstrates the full template without needing real event data.

3. **Testimonials for events**
   - What we know: Social proof is required; existing testimonials in `src/lib/data/testimonials.ts` are about the full Art of Living programme.
   - What's unclear: Whether generic Art of Living testimonials are appropriate for event pages or if new Satsang/Kirtan-specific quotes are needed.
   - Recommendation: For Phase 7, reuse the existing `Testimonial` type and pull 2-3 entries from the existing testimonials array. Add an optional `eventTestimonials` field to `EventConfig` for phase 9+ when local Devon testimonials become available.

---

## Sources

### Primary (HIGH confidence)
- Project codebase — `src/lib/data/intro-talks.ts`, `src/lib/data/course-dates.ts`, `src/components/intro/hero-section.tsx`, `src/app/(landing)/intro/page.tsx` — directly inspected patterns
- Project codebase — `package.json` — exact installed versions of Next.js (16.1.6), React (19.2.3), Tailwind CSS v4, shadcn/ui
- Project codebase — `src/app/(main)/layout.tsx`, `src/app/(landing)/layout.tsx` — route group structure confirmed
- Next.js App Router docs (training knowledge, version 15+ confirmed via project) — `generateStaticParams`, async params, `notFound()`

### Secondary (MEDIUM confidence)
- London Satsang reference page (events.artofliving.eu) — described in CONTEXT.md; structural sections used as inspiration
- YouTube privacy-enhanced embed (`youtube-nocookie.com`) — established web practice, consistent with project's "no autoplay" requirement from REQUIREMENTS.md

### Tertiary (LOW confidence)
- Section conversion order (hero → details → experience → explainer → video → proof → optin → footer CTA) — derived from established landing page best practices + project's own funnel comments in page.tsx files; not independently verified against event-specific A/B data

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries directly inspected in package.json and codebase
- Architecture: HIGH — dynamic route and data module patterns are directly established in existing project files; no new patterns needed
- Pitfalls: HIGH — params-as-Promise confirmed for Next.js 16; route group coexistence confirmed by understanding of Next.js App Router; other pitfalls derived from existing project decisions
- Section design: MEDIUM — conversion section ordering is best-practice derived, not A/B tested for event pages specifically

**Research date:** 2026-02-26
**Valid until:** 2026-03-28 (stable stack — Next.js and project structure unlikely to change)
