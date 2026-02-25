# Phase 2: Intro Talk Landing Page - Core - Research

**Researched:** 2026-02-25
**Domain:** Next.js 16 landing page, mobile-first registration form, Server Actions, shadcn/ui form components, GDPR consent, route groups
**Confidence:** HIGH

## Summary

This phase builds the core intro talk landing page — the first page real visitors from Facebook ads will see. The page must convert visitors into registrants within 30 seconds on mobile. The existing Next.js 16 + Tailwind CSS 4 + shadcn/ui foundation from Phase 1 provides everything needed; no new framework-level dependencies are required beyond form-specific packages (react-hook-form, zod, @hookform/resolvers).

The critical architectural decision is using a Next.js route group `(landing)` to give the intro talk page its own minimal layout without the site header/footer navigation — matching the Phase 1 research recommendation of "no navigation distractions on landing pages." The registration form uses a hybrid approach: shadcn/ui Field components with react-hook-form for client-side validation and UX, backed by a Server Action with Zod validation for server-side security. The form is deliberately minimal (name, email, phone optional) to minimize friction for mobile users.

The page structure follows a proven landing page pattern: hero with headline + date/time + CTA, benefits section + CTA, social proof placeholder + CTA, and footer CTA — satisfying the 4-CTA requirement. GDPR compliance requires an unticked consent checkbox adjacent to the form with a link to the existing privacy policy page.

**Primary recommendation:** Use a `(landing)` route group with a stripped-down layout (no header/footer nav). Build the registration form with shadcn/ui Field + Input + Checkbox + Button components, react-hook-form for state management, Zod for validation, and a Server Action for submission. For Phase 2, the Server Action logs the registration data (actual Brevo integration comes in Phase 9). All content is hardcoded — no CMS or dynamic data sources.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INTRO-01 | Visitor sees clear, benefit-driven headline and value proposition above the fold | Hero section pattern with large heading, subheading, and CTA. Mobile-first layout ensures above-fold visibility at 375px+. |
| INTRO-02 | Visitor sees next intro talk date/time prominently displayed with timezone (GMT/BST) | Date/time displayed in hero section as a styled badge/callout. Hardcoded for Phase 2; dynamic session selection comes in Phase 4 (INTRO-12). |
| INTRO-03 | Visitor can register with name + email (phone optional) via minimal-friction form | shadcn/ui Field + Input components with react-hook-form + Zod validation. Server Action handles submission. Single-step form, no page navigation. |
| INTRO-04 | Repeated CTA ("Save My Seat") appears in hero, after benefits, after social proof, and footer | Four CTA placements throughout page. Each CTA either scrolls to the form or is an inline form instance. |
| INTRO-05 | Page is mobile-first responsive (Facebook ad traffic is 80%+ mobile) | Tailwind mobile-first breakpoints (375px base, sm:640px, md:768px, lg:1024px). Touch-friendly inputs (min 44px tap targets). Full-width form on mobile. |
| INTRO-09 | Page includes GDPR-compliant explicit consent checkbox (unticked), privacy policy link, and trust indicators | shadcn/ui Checkbox component, unticked by default, with label text linking to /privacy-policy. Zod validation requires consent=true before submission. |
</phase_requirements>

## Standard Stack

### Core (already installed from Phase 1)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Framework — App Router, Server Actions, file-based routing | Already installed; Server Actions are stable and production-ready |
| React | 19.2.3 | UI library — useActionState, useFormStatus hooks | Already installed; React 19 form primitives are the standard |
| Tailwind CSS | 4.x | Utility-first CSS — mobile-first responsive design | Already installed; OKLCH theme configured |
| shadcn/ui | latest CLI | Component library — Button, Input, Checkbox, Field, Label | Already configured; new-york style, OKLCH colors |
| lucide-react | 0.575.x | Icons — CheckCircle, Clock, MapPin, etc. | Already installed |

### New Dependencies (Phase 2)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | ^7.x | Form state management — uncontrolled inputs, minimal re-renders | shadcn/ui's official form integration; best performance for React forms |
| zod | ^3.x | Schema validation — shared between client and server | Official shadcn/ui form validation; type-safe, composable schemas |
| @hookform/resolvers | ^5.x | Zod-to-react-hook-form bridge | Required to connect Zod schemas to react-hook-form validation |

### shadcn/ui Components to Add
| Component | CLI Command | Purpose |
|-----------|-------------|---------|
| button | `npx shadcn@latest add button` | CTA buttons ("Save My Seat") |
| input | `npx shadcn@latest add input` | Name, email, phone form fields |
| checkbox | `npx shadcn@latest add checkbox` | GDPR consent checkbox |
| label | `npx shadcn@latest add label` | Accessible form labels |
| card | `npx shadcn@latest add card` | Content section cards |
| badge | `npx shadcn@latest add badge` | Date/time display, "Free" indicator |
| separator | `npx shadcn@latest add separator` | Visual section dividers |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-hook-form + shadcn Field | Pure useActionState + HTML inputs | Simpler but no client-side validation UX, no field-level errors, worse mobile experience. react-hook-form is the shadcn/ui blessed approach. |
| react-hook-form | TanStack Form | TanStack Form is newer, less ecosystem integration with shadcn/ui. react-hook-form is mature and documented. |
| Zod server validation | Manual FormData parsing | Zod provides type safety, composable schemas, and reusable validation between client and server. No reason to hand-roll. |
| Route group layout | Conditional header/footer rendering | Route groups are the Next.js blessed pattern for layout isolation. Conditional rendering adds complexity and breaks layout caching. |

**Installation:**
```bash
# New dependencies
npm install react-hook-form zod @hookform/resolvers

# shadcn/ui components
npx shadcn@latest add button input checkbox label card badge separator
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── (main)/                    # Route group for pages WITH site header/footer
│   │   ├── layout.tsx             # Wraps children with SiteHeader + SiteFooter
│   │   ├── page.tsx               # Homepage (moved here)
│   │   └── privacy-policy/
│   │       └── page.tsx           # Privacy policy (moved here)
│   ├── (landing)/                 # Route group for landing pages WITHOUT nav
│   │   ├── layout.tsx             # Minimal layout — no header/footer, just branding
│   │   └── intro/
│   │       └── page.tsx           # Intro talk landing page
│   ├── layout.tsx                 # Root layout (html/body, fonts, globals.css)
│   └── globals.css
├── components/
│   ├── ui/                        # shadcn/ui components (auto-managed)
│   ├── layout/
│   │   ├── site-header.tsx        # Shared header (used by (main) layout)
│   │   └── site-footer.tsx        # Shared footer (used by (main) layout)
│   └── intro/                     # Intro talk page components
│       ├── hero-section.tsx       # Hero with headline, date, CTA
│       ├── benefits-section.tsx   # Benefits list with CTA
│       ├── social-proof-section.tsx  # Placeholder for testimonials
│       ├── registration-form.tsx  # Client component — the form
│       └── footer-cta.tsx         # Bottom CTA section
├── lib/
│   ├── utils.ts                   # cn() utility
│   └── schemas/
│       └── registration.ts        # Zod schema (shared client + server)
└── actions/
    └── register.ts                # Server Action for form submission
```

### Pattern 1: Route Group Layout Isolation
**What:** Use `(landing)` and `(main)` route groups to give landing pages a distraction-free layout while standard pages keep the site header/footer.
**When to use:** Any page designed for conversion (landing pages from ads) vs. informational pages.
**Example:**
```tsx
// src/app/layout.tsx — Root layout (shared by ALL pages)
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
```
```tsx
// src/app/(main)/layout.tsx — Standard pages with nav
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
```
```tsx
// src/app/(landing)/layout.tsx — Landing pages without nav
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
```
**Source:** https://nextjs.org/docs/app/api-reference/file-conventions/route-groups (Next.js 16.1.6 official docs)

**Caveat:** Navigating between routes using different root layouts triggers a full page reload. This is acceptable because users arriving from Facebook ads land on `/intro` and don't navigate to `/privacy-policy` from the same SPA session typically — the privacy link opens in a new tab.

### Pattern 2: Registration Form with react-hook-form + Server Action
**What:** Client-side form with react-hook-form for instant validation feedback, backed by a Server Action for secure server-side processing.
**When to use:** Forms that need both good UX (instant field validation) and server-side security (Zod re-validation).
**Example:**
```tsx
// src/lib/schemas/registration.ts — Shared schema
import { z } from "zod"

export const registrationSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to receive event communications" }),
  }),
})

export type RegistrationInput = z.infer<typeof registrationSchema>
```
```tsx
// src/actions/register.ts — Server Action
"use server"

import { registrationSchema } from "@/lib/schemas/registration"

export type RegistrationState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function registerForIntroTalk(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    consent: formData.get("consent") === "on",
  }

  const result = registrationSchema.safeParse(raw)

  if (!result.success) {
    return {
      success: false,
      message: "Please check the form for errors.",
      errors: result.error.flatten().fieldErrors,
    }
  }

  // Phase 2: Log registration (Brevo integration in Phase 9)
  console.log("Registration:", result.data)

  return {
    success: true,
    message: "You're registered! Check your email for details.",
  }
}
```
```tsx
// src/components/intro/registration-form.tsx — Client component
"use client"

import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema, type RegistrationInput } from "@/lib/schemas/registration"
import { registerForIntroTalk, type RegistrationState } from "@/actions/register"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const initialState: RegistrationState = {
  success: false,
  message: "",
}

export function RegistrationForm() {
  const [state, formAction, pending] = useActionState(registerForIntroTalk, initialState)

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: "", email: "", phone: "", consent: false },
    mode: "onTouched",
  })

  return (
    <form action={formAction} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          required
          className="h-12 text-base"  {/* Touch-friendly height */}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          className="h-12 text-base"
        />
      </div>

      {/* Phone (optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone <span className="text-muted-foreground">(optional)</span></Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="07xxx xxxxxx"
          className="h-12 text-base"
        />
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start gap-3">
        <Checkbox id="consent" name="consent" required />
        <Label htmlFor="consent" className="text-sm leading-relaxed">
          I agree to receive event details and reminders by email.
          See our <Link href="/privacy-policy" target="_blank" className="underline text-primary">Privacy Policy</Link>.
        </Label>
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold" disabled={pending}>
        {pending ? "Saving your seat..." : "Save My Seat"}
      </Button>

      {/* Server response */}
      {state.message && (
        <p className={state.success ? "text-green-600" : "text-destructive"} aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  )
}
```
**Source:** https://nextjs.org/docs/app/guides/forms (Next.js 16.1.6), https://ui.shadcn.com/docs/forms/react-hook-form

### Pattern 3: Mobile-First CTA Placement Strategy
**What:** Place "Save My Seat" CTAs at 4 strategic points: hero, after benefits, after social proof, and footer. On mobile, CTAs are full-width buttons. On desktop, inline or centered.
**When to use:** Conversion-focused landing pages where users may scroll at different speeds.
**Example:**
```tsx
// Reusable CTA component
function SaveMySeatCTA({ variant = "default" }: { variant?: "default" | "outline" }) {
  return (
    <a href="#register" className="block">
      <Button variant={variant} size="lg" className="w-full sm:w-auto h-14 text-lg font-semibold px-8">
        Save My Seat — It's Free
      </Button>
    </a>
  )
}
```

### Pattern 4: Above-the-Fold Hero Layout for Mobile
**What:** Ensure headline, date/time, and first CTA are all visible without scrolling on a 375px-wide mobile viewport.
**When to use:** Hero sections on landing pages targeting mobile-heavy ad traffic.
**Key constraints:**
- Mobile viewport at 375px width is approximately 667px height (iPhone SE) to 812px (iPhone X)
- Content must fit in ~500px after accounting for browser chrome
- Use compact spacing on mobile, expand on larger screens
```tsx
// Hero section mobile-first layout
<section className="px-4 pt-8 pb-12 sm:pt-16 sm:pb-20 text-center">
  {/* Free badge */}
  <Badge variant="secondary" className="mb-4">Free Online Event</Badge>

  {/* Headline — compact on mobile */}
  <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3">
    Discover the Breath That<br className="hidden sm:block" />
    <span className="text-primary">Changes Everything</span>
  </h1>

  {/* Date/time with timezone */}
  <div className="flex items-center justify-center gap-2 text-lg font-medium mb-6">
    <Clock className="h-5 w-5 text-primary" />
    <span>Saturday 8 March, 10:00 AM GMT</span>
  </div>

  {/* CTA */}
  <SaveMySeatCTA />
</section>
```

### Anti-Patterns to Avoid
- **Multi-step registration:** Each step loses 20-40% of users. This is a free event — one-step form only. Explicitly listed in project Out of Scope.
- **Header navigation on landing pages:** Navigation links give visitors escape routes, reducing conversion. Use the `(landing)` route group pattern instead.
- **Pre-ticked GDPR checkbox:** Illegal under UK GDPR. The checkbox MUST be unticked by default and require explicit positive action.
- **Small tap targets on mobile:** Form inputs and buttons must be at least 44px tall for comfortable touch interaction. Use `h-12` (48px) for inputs and `h-14` (56px) for the submit button.
- **Autoplaying media:** Listed in Out of Scope as damaging to trust and page speed. Do not add video or audio.
- **Fake urgency/countdown:** Listed in Out of Scope. Use real dates only.
- **Exit-intent popups:** Listed in Out of Scope. Damages trust with wellness audience.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom useState per field | react-hook-form | Handles validation, errors, touched state, submission; shadcn/ui blessed |
| Form validation | Manual regex/string checks | Zod schemas | Type-safe, composable, reusable between client and server |
| Checkbox component | Custom `<input type="checkbox">` | shadcn/ui Checkbox (Radix) | Accessible, keyboard-navigable, ARIA attributes, consistent styling |
| Form field layout | Custom div + label + input wrappers | shadcn/ui Field + FieldLabel + FieldError | Accessibility built-in, error states handled, consistent markup |
| Scroll-to-section CTA | Custom JS scroll handler | Native `<a href="#register">` with `scroll-mt-*` | Progressive enhancement; works without JS |
| Landing page layout isolation | Conditional rendering in root layout | Next.js route groups `(landing)/(main)` | Official pattern; layout caching preserved; clean separation |
| Responsive breakpoints | Custom media queries | Tailwind mobile-first utilities (sm:, md:, lg:) | Consistent with existing codebase; utility-first approach |

**Key insight:** This is a conversion page, not a feature-rich app. Simplicity IS the feature. Every custom solution adds code that doesn't serve the single goal: getting a visitor to register.

## Common Pitfalls

### Pitfall 1: Route Group Migration Breaking Existing Pages
**What goes wrong:** Moving existing pages (homepage, privacy-policy) into a `(main)` route group without updating the root layout causes 404s or layout duplication.
**Why it happens:** The root layout currently wraps all pages with SiteHeader/SiteFooter. Creating route groups requires splitting this into group-specific layouts.
**How to avoid:** Step-by-step migration: (1) Create root layout with only html/body/fonts, (2) Create `(main)` group layout with header/footer, (3) Move existing pages into `(main)`, (4) Create `(landing)` group with minimal layout, (5) Verify both groups render correctly.
**Warning signs:** Header/footer appearing twice, or disappearing entirely.

### Pitfall 2: react-hook-form + Server Action Integration Confusion
**What goes wrong:** Using react-hook-form's `handleSubmit` as the form's `onSubmit` blocks the Server Action from receiving FormData, or using both `action` and `onSubmit` creates conflicting submission paths.
**Why it happens:** react-hook-form traditionally uses `onSubmit` for client-side handling, while Server Actions use the `action` prop. These are two different submission mechanisms.
**How to avoid:** Use a simplified approach for this 3-field form: use native HTML form with `action={formAction}` (from useActionState) for the Server Action, and use react-hook-form only for client-side validation with `mode: "onTouched"`. The form's `name` attributes ensure FormData is populated for the Server Action. Alternatively, skip react-hook-form entirely and use `useActionState` alone with server-side Zod validation — simpler and sufficient for a 3-field form.
**Warning signs:** Form submitting twice, or field values not reaching the Server Action.

### Pitfall 3: GDPR Checkbox Not Validated Server-Side
**What goes wrong:** Client-side only validation of the consent checkbox — a malicious user or browser extension could bypass it and submit without consent.
**Why it happens:** Developers rely on `required` HTML attribute and client-side Zod validation but forget server-side re-validation.
**How to avoid:** The Zod schema uses `z.literal(true)` for the consent field. The Server Action re-validates with the same schema. If consent is not `true`, the action returns an error.
**Warning signs:** Registration records in the database (or logs) without consent=true.

### Pitfall 4: Above-the-Fold Content Overflow on Small Mobile Screens
**What goes wrong:** Hero headline, date/time, and CTA don't all fit without scrolling on smaller devices (375px x 667px like iPhone SE).
**Why it happens:** Desktop-sized headings, generous padding, or too many elements in the hero.
**How to avoid:** Use compact mobile typography (`text-2xl` not `text-4xl`), tight vertical spacing on mobile (`pt-8 pb-12` expanding to `sm:pt-16 sm:pb-20`), and test in Chrome DevTools at 375x667. Keep hero content to: one badge, one headline (2 lines max on mobile), one date line, one CTA button.
**Warning signs:** CTA button below the fold on iPhone SE viewport.

### Pitfall 5: Form Input Zoom on iOS
**What goes wrong:** iOS Safari zooms into the page when user taps a form input with font-size < 16px.
**Why it happens:** iOS auto-zooms on inputs with font-size below 16px to aid readability.
**How to avoid:** Set form input font-size to at least 16px. Use `text-base` class (16px) on all Input components. The Tailwind class `text-base` is 1rem = 16px by default.
**Warning signs:** Page zooms in when tapping a field on iPhone, requiring user to manually zoom back out.

### Pitfall 6: Checkbox Value in FormData
**What goes wrong:** Reading `formData.get("consent")` returns `null` when unchecked (not `false`), and `"on"` when checked (not `true`).
**Why it happens:** HTML checkbox inputs only include their value in FormData when checked. The default value is `"on"`.
**How to avoid:** In the Server Action, parse the consent value as `formData.get("consent") === "on"` before passing to Zod validation. Alternatively, use a hidden input pattern.
**Warning signs:** Zod validation always failing on the consent field because it receives `"on"` string instead of boolean `true`.

## Code Examples

### shadcn/ui Component Installation (verified)
```bash
# Source: https://ui.shadcn.com/docs/components
# Install all components needed for Phase 2
npx shadcn@latest add button input checkbox label card badge separator
```

### Zod Schema for Registration (verified pattern)
```typescript
// Source: https://nextjs.org/docs/app/guides/forms + Zod docs
import { z } from "zod"

export const registrationSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name")
    .max(100, "Name must be 100 characters or less"),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to receive event communications" }),
  }),
})
```

### Server Action with useActionState (verified pattern from Next.js 16 docs)
```typescript
// Source: https://nextjs.org/docs/app/guides/forms
"use server"

import { registrationSchema } from "@/lib/schemas/registration"

type State = { success: boolean; message: string; errors?: Record<string, string[]> }

export async function registerForIntroTalk(prevState: State, formData: FormData): Promise<State> {
  const parsed = registrationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    consent: formData.get("consent") === "on",
  })

  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below.", errors: parsed.error.flatten().fieldErrors }
  }

  // TODO Phase 9: Send to Brevo API
  console.log("New registration:", parsed.data)

  return { success: true, message: "You're registered! We'll send you the details." }
}
```

### Mobile-First Touch-Friendly Input Styling
```tsx
// Source: iOS HIG (44pt min tap target) + Tailwind docs
// h-12 = 48px (above 44px minimum), text-base = 16px (prevents iOS zoom)
<Input
  id="email"
  name="email"
  type="email"
  placeholder="your@email.com"
  required
  className="h-12 text-base"
/>
```

### Anchor CTA with Smooth Scroll
```tsx
// Progressive enhancement — works without JS
<a href="#register">
  <Button size="lg" className="w-full sm:w-auto h-14 text-lg font-semibold px-8">
    Save My Seat — It's Free
  </Button>
</a>

// Target section with scroll margin for fixed elements
<section id="register" className="scroll-mt-8">
  <RegistrationForm />
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useFormState` (react-dom) | `useActionState` (react) | React 19, Dec 2024 | Renamed and moved to `react` package; adds `pending` as third return value |
| API routes for form submission | Server Actions with `action` prop | Next.js 14+ stable | No separate API endpoint needed; form submits directly to server function |
| `onSubmit` + `fetch` for forms | `action` prop + useActionState | React 19 + Next.js 16 | Progressive enhancement; forms work without JS |
| Custom responsive containers | Tailwind `container` + mobile-first utilities | Tailwind v4, Jan 2025 | No custom breakpoint configuration needed |
| `React.forwardRef` in shadcn | Direct function components | shadcn/ui 2025 | Simpler component code; React 19 handles ref forwarding |

**Deprecated/outdated:**
- `useFormState` from `react-dom`: renamed to `useActionState` in React 19 (moved to `react` package)
- API routes for simple form submissions: Server Actions are simpler and support progressive enhancement
- `next/form` `<Form>` component: available but not needed here — standard `<form action={}>` with useActionState is the documented pattern

## Open Questions

1. **react-hook-form vs. pure useActionState for a 3-field form**
   - What we know: react-hook-form adds client-side validation UX (instant field errors on blur). useActionState alone provides server-side validation with page-level error messages. shadcn/ui docs recommend react-hook-form for forms.
   - What's unclear: Whether the added complexity of react-hook-form is justified for a form with only 3 required fields.
   - Recommendation: Start with the simpler approach — **use useActionState + native HTML validation (`required`, `type="email"`) + server-side Zod**. This gives progressive enhancement (works without JS), minimal bundle size, and is fully sufficient for 3 fields. Add react-hook-form only if user testing reveals the need for instant field-level error feedback. This is within Claude's discretion.

2. **CTA linking strategy: scroll-to-form vs. repeated inline forms**
   - What we know: INTRO-04 requires 4 CTA placements. The form itself appears once (in the registration section). CTAs can either scroll to the form section or each contain an inline form.
   - What's unclear: Whether smooth scrolling to a single form provides better conversion than showing the form inline in multiple places.
   - Recommendation: Use **anchor links scrolling to a single form section** (near bottom of page, before footer). Simpler to maintain, single source of truth for form logic, and standard landing page pattern. Use `scroll-behavior: smooth` in CSS and `scroll-mt-*` on the target section.

3. **Intro talk date/time — hardcoded vs. configurable**
   - What we know: INTRO-02 requires showing the next intro talk date/time. Phase 4 adds session selection (INTRO-12). For Phase 2, there's one session to display.
   - What's unclear: Whether to hardcode the date in the component or extract it to a config/data file for easier updates.
   - Recommendation: Extract to a simple TypeScript constant file (`src/lib/data/intro-talks.ts`) so the date can be updated without modifying component code. Not a CMS — just a typed object. This prepares for Phase 4's multi-session feature.

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 Forms Guide — https://nextjs.org/docs/app/guides/forms (verified 2026-02-25, version 16.1.6)
- Next.js 16.1.6 Route Groups — https://nextjs.org/docs/app/api-reference/file-conventions/route-groups (verified 2026-02-25)
- shadcn/ui React Hook Form docs — https://ui.shadcn.com/docs/forms/react-hook-form (verified 2026-02-25)
- shadcn/ui Component docs (Checkbox, Input, Label, Button) — https://ui.shadcn.com/docs/components
- React 19 useActionState — https://react.dev/reference/react/useActionState
- Existing codebase inspection — Phase 1 layout, globals.css, components.json verified directly

### Secondary (MEDIUM confidence)
- iOS HIG touch target guidance (44pt minimum) — Apple Human Interface Guidelines
- iOS Safari input zoom behavior (font-size < 16px triggers zoom) — widely documented, verified by multiple sources

### Tertiary (LOW confidence)
- Optimal CTA placement strategy (4 locations) — based on landing page best practices from multiple marketing sources, not A/B tested for this specific audience

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries verified via official docs; shadcn/ui + react-hook-form + Zod is the documented pattern
- Architecture: HIGH — Route groups documented in Next.js 16; component structure follows established patterns from Phase 1
- Form handling: HIGH — Server Actions + useActionState pattern verified in Next.js 16.1.6 official forms guide
- Mobile responsiveness: HIGH — Tailwind mobile-first utilities well-documented; iOS pitfalls well-known
- GDPR consent: HIGH — UK GDPR unticked-by-default requirement well-established; privacy policy already exists from Phase 1
- Pitfalls: HIGH — All pitfalls verified through official docs or widely-documented browser behaviors

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (stable ecosystem, 30-day validity)
