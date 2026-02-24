# Architecture Research

**Domain:** Conversion-focused landing page site with email automation
**Researched:** 2026-02-24
**Confidence:** HIGH

## Critical Architectural Decision: Static Export vs Node.js Server

The single most important architectural decision for this project is whether to use Next.js `output: 'export'` (static HTML) or run a Node.js server.

**Recommendation: Use Next.js with Node.js server mode (default), deployed to Vercel free tier.**

**Why not static export:**
- Static export (`output: 'export'`) does NOT support API Routes or Server Actions (confirmed in official Next.js docs)
- Form submissions to Mailchimp/Brevo require server-side API calls to avoid exposing API keys in the browser
- Without server capabilities, you need either: (a) a separate backend service, or (b) client-side calls exposing API keys
- A separate backend defeats the simplicity of Next.js; exposed API keys are a security risk

**Why not traditional Nepal hosting (~20/yr):**
- Traditional shared hosting only serves static files -- no Node.js runtime
- Would force static export, losing all server capabilities
- Would require a third-party form service (Formspree, Getform) adding cost and complexity

**Why Vercel free tier wins:**
- Free for hobby projects (this qualifies)
- Native Next.js support with zero config
- API Routes and Server Actions work out of the box
- Edge functions for fast response globally
- Free SSL, custom domain support, preview deployments
- If Vercel free tier becomes insufficient, can self-host with `next start` on any Node.js host

**Confidence:** HIGH -- based on official Next.js documentation confirming static export limitations.

## System Overview

```
                     Facebook Ad
                         |
                         v
┌─────────────────────────────────────────────────────┐
│                    Vercel Edge                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Homepage │  │  Intro   │  │  Course Landing  │  │
│  │   Page   │  │  Talk LP │  │      Page        │  │
│  └──────────┘  └────┬─────┘  └──────────────────┘  │
│                     │                               │
│              ┌──────┴──────┐                        │
│              │ Registration│                        │
│              │    Form     │                        │
│              └──────┬──────┘                        │
│                     │ Server Action                 │
│              ┌──────┴──────┐                        │
│              │  API Layer  │                        │
│              │ (Route      │                        │
│              │  Handler)   │                        │
│              └──────┬──────┘                        │
│                     │                               │
└─────────────────────┼───────────────────────────────┘
                      │ HTTPS
          ┌───────────┴───────────┐
          │   Email Service API   │
          │  (Brevo / Mailchimp)  │
          │                       │
          │  - Add to contact list│
          │  - Trigger automation │
          │  - Send confirmation  │
          └───────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Pages (SSG) | Render marketing content, SEO metadata, structured data | Next.js App Router `page.tsx` with static metadata exports |
| Registration Form | Capture name, email, phone, session selection | Client Component with form validation |
| Server Action / Route Handler | Validate input, call email service API, return result | `app/api/register/route.ts` or Server Action in `actions/` |
| Email Service (external) | Store contacts, trigger automation sequences, send emails | Brevo or Mailchimp API -- automation configured in their dashboard |
| Layout Shell | Shared header, footer, navigation, brand styles | `app/layout.tsx` with nested layouts per section |
| UI Components | Reusable testimonials, CTAs, hero sections, cards | Shared component library in `components/` |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (header, footer, fonts, global styles)
│   ├── page.tsx                # Homepage
│   ├── intro-talk/
│   │   └── page.tsx            # Intro talk landing page
│   ├── course/
│   │   └── page.tsx            # Part 1 course landing page
│   ├── thank-you/
│   │   └── page.tsx            # Post-registration confirmation
│   ├── api/
│   │   └── register/
│   │       └── route.ts        # Registration endpoint (POST)
│   ├── globals.css             # Global styles / Tailwind imports
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── robots.ts               # Robots.txt generation
├── components/
│   ├── ui/                     # Generic UI primitives (Button, Input, Card)
│   ├── forms/
│   │   └── RegistrationForm.tsx # Registration form (Client Component)
│   ├── sections/               # Page sections (Hero, Testimonials, Benefits, etc.)
│   │   ├── Hero.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Benefits.tsx
│   │   ├── TeacherProfile.tsx
│   │   ├── SessionPicker.tsx
│   │   └── SocialProof.tsx
│   └── layout/                 # Header, Footer, Navigation
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── email.ts                # Email service API client (Brevo/Mailchimp)
│   ├── validation.ts           # Shared form validation schemas (Zod)
│   └── constants.ts            # Site-wide constants, session dates, URLs
├── types/
│   └── index.ts                # TypeScript type definitions
└── public/
    ├── images/                 # Optimized images, logos, teacher photos
    └── og/                     # Open Graph images for social sharing
```

### Structure Rationale

- **`app/` flat page structure:** Only 3-4 pages, no need for route groups or complex nesting. Each page is a self-contained marketing page.
- **`components/sections/`:** Landing pages are composed of stacked sections. Each section is a Server Component by default (no JavaScript shipped to client). Only the form needs `"use client"`.
- **`lib/email.ts`:** Single file wrapping the email service API. Called from the API route/Server Action, never from the client. Keeps API keys server-side.
- **`components/forms/`:** Client Components with `"use client"` directive. Handles user interaction, validation feedback, loading states.

## Architectural Patterns

### Pattern 1: Server Components for Content, Client Components Only for Interaction

**What:** All page content (hero, testimonials, benefits, teacher profiles) renders as Server Components. Only the registration form is a Client Component.
**When to use:** Always for this type of site. Marketing content has zero interactivity.
**Trade-offs:** Minimal JavaScript shipped to browser (fast page loads, good Core Web Vitals). Form is the only interactive element.

**Example:**
```typescript
// app/intro-talk/page.tsx (Server Component - no "use client")
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Testimonials } from '@/components/sections/Testimonials';
import { RegistrationForm } from '@/components/forms/RegistrationForm';

export const metadata = {
  title: 'Free Intro Talk - Art of Living Devon',
  description: 'Join our free online intro to the Happiness Program...',
  openGraph: { /* ... */ },
};

export default function IntroTalkPage() {
  return (
    <>
      <Hero variant="intro-talk" />
      <Benefits />
      <RegistrationForm />  {/* Only this is a Client Component */}
      <Testimonials />
    </>
  );
}
```

### Pattern 2: Server Action for Form Submission

**What:** Use a Server Action (not an API Route) for the registration form. Server Actions are simpler, have built-in CSRF protection, end-to-end type safety, and are called directly from the React component.
**When to use:** For internal form submissions where no external service needs to call the endpoint.
**Trade-offs:** Cannot be called from outside the app (not needed here). Slightly less familiar pattern than REST endpoints.

**Example:**
```typescript
// lib/actions/register.ts
'use server';

import { z } from 'zod';
import { addContactToEmailService } from '@/lib/email';

const RegistrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  sessionId: z.string().min(1, 'Please select a session'),
});

export async function registerForIntroTalk(formData: FormData) {
  const parsed = RegistrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    sessionId: formData.get('sessionId'),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  try {
    await addContactToEmailService(parsed.data);
    return { success: true };
  } catch (err) {
    return { error: { form: ['Registration failed. Please try again.'] } };
  }
}
```

### Pattern 3: Email Service as Automation Engine

**What:** The email service (Brevo/Mailchimp) handles ALL email automation logic. Next.js only pushes contacts with attributes. The email service's automation builder handles the sequence: confirmation, reminders, no-show re-engagement, post-talk nurture.
**When to use:** Always. Never build email scheduling logic in your app.
**Trade-offs:** Dependent on the email service's automation capabilities. But this is exactly what these tools are built for.

**Example flow:**
```
Next.js Server Action
    │
    ├── Creates/updates contact in email service
    │   - name, email, phone
    │   - session_date attribute
    │   - session_zoom_link attribute
    │   - registered_at timestamp
    │
    └── Email service automation triggers on "contact added to list":
        ├── Immediately: Confirmation email + Zoom link
        ├── 1 day before session: Reminder email
        ├── 1 hour before session: Final reminder
        ├── 1 day after session:
        │   ├── IF attended → Course info + enrollment link
        │   └── IF not attended → Re-engagement + next session dates
        └── 3 days after → Follow-up nudge (if not enrolled)
```

### Pattern 4: Static Generation with `force-static`

**What:** All marketing pages use static generation. Pages are pre-rendered at build time and served from CDN.
**When to use:** For all pages on this site. Content changes only when the developer deploys.
**Trade-offs:** Must redeploy to update content (session dates, teacher info). Acceptable for this scale.

**Example:**
```typescript
// All pages are statically generated by default in App Router
// No dynamic data fetching needed -- content is hardcoded or from constants

// lib/constants.ts
export const UPCOMING_SESSIONS = [
  {
    id: 'session-2026-03-15',
    date: '2026-03-15T10:00:00Z',
    title: 'Free Intro Talk - March 15',
    zoomLink: 'https://zoom.us/j/...',
    teacher: 'Teacher Name',
  },
  // Add more sessions as needed, redeploy to update
];
```

## Data Flow

### Registration Flow (Primary)

```
User fills form on /intro-talk
    │
    v
RegistrationForm (Client Component)
    │ Client-side validation (Zod)
    │ Shows loading state
    v
Server Action: registerForIntroTalk()
    │ Server-side validation (Zod -- never trust client)
    │
    v
lib/email.ts → addContactToEmailService()
    │ POST to Brevo/Mailchimp API
    │ - Create contact with attributes
    │ - Add to "Intro Talk Registrants" list
    │
    v
Email service automation triggers
    │ (configured in Brevo/Mailchimp dashboard)
    │
    v
Return success/error to client
    │
    v
Redirect to /thank-you OR show error message
```

### Page Render Flow

```
Build time (next build)
    │
    v
All pages pre-rendered to HTML
    │ - Homepage: /
    │ - Intro Talk: /intro-talk
    │ - Course: /course
    │ - Thank You: /thank-you
    │
    v
Deploy to Vercel CDN
    │
    v
User request → CDN serves pre-built HTML (fast)
    │
    v
React hydrates only Client Components (RegistrationForm)
    │ Minimal JavaScript bundle
```

### Attendance Tracking Flow

```
This is handled OUTSIDE the Next.js app:

Option A: Manual update in email service
    - After Zoom call, manually tag attendees
    - Automation branches based on "attended" tag

Option B: Zoom webhook (future enhancement)
    - Zoom sends attendance data to a webhook endpoint
    - API Route processes and updates email service contacts

For v1: Use Option A (manual). Simple, no integration complexity.
```

## Rendering Strategy

| Page | Strategy | Rationale |
|------|----------|-----------|
| `/` (Homepage) | Static (SSG) | Pure marketing content, no dynamic data |
| `/intro-talk` | Static (SSG) | Marketing content + form. Form is client-side interactive but page shell is static |
| `/course` | Static (SSG) | Pure marketing content |
| `/thank-you` | Static (SSG) | Confirmation message, possibly dynamic session details via URL params |
| `/api/register` | Server-side | Only if using Route Handler instead of Server Action |

**All pages are statically generated.** The only server-side execution is the form submission Server Action, which runs on-demand when the user submits.

## SEO Architecture

| Concern | Implementation |
|---------|---------------|
| Page titles & descriptions | `metadata` export in each `page.tsx` |
| Open Graph images | Static images in `public/og/` referenced in metadata |
| Structured data (JSON-LD) | `<script type="application/ld+json">` in page components for Event schema |
| Sitemap | `app/sitemap.ts` auto-generates XML sitemap |
| Robots | `app/robots.ts` allows all pages |
| Canonical URLs | Set in metadata to prevent duplicate content |
| Facebook pixel | Client-side script in root layout for ad conversion tracking |

**JSON-LD Event Schema** is particularly important for the intro talk page -- it marks the page as an event in search results, showing date/time/location (Online).

## Anti-Patterns

### Anti-Pattern 1: Exposing Email API Keys in Client Code

**What people do:** Call Mailchimp/Brevo API directly from the browser to avoid setting up server routes.
**Why it's wrong:** API keys visible in browser dev tools. Anyone can add/remove contacts, send emails, or abuse your account.
**Do this instead:** Always call email APIs from Server Actions or Route Handlers. Keys stay in environment variables on the server.

### Anti-Pattern 2: Building Email Scheduling in the App

**What people do:** Store registration data in a database and build cron jobs to send reminder emails at specific times.
**Why it's wrong:** Massive complexity for a landing page. Needs a database, a scheduler, error handling for failed sends, queue management.
**Do this instead:** Push contacts with attributes (session date, Zoom link) to the email service. Configure automation sequences in Brevo/Mailchimp's visual builder. They handle scheduling, retries, and deliverability.

### Anti-Pattern 3: Using `output: 'export'` and Then Needing Server Features

**What people do:** Start with static export for cheap hosting, then discover they need API routes for forms.
**Why it's wrong:** Major architecture change mid-project. Must either add a separate backend or migrate to a Node.js deployment.
**Do this instead:** Start with Vercel free tier (or any Node.js host). Use Server Actions from day one. If you later need pure static, you can always add `output: 'export'` and switch forms to a third-party service.

### Anti-Pattern 4: Over-Engineering Component Architecture

**What people do:** Create elaborate component hierarchies, context providers, state management for a 3-page site.
**Why it's wrong:** This is a landing page, not a SaaS app. Complexity slows development with zero benefit.
**Do this instead:** Flat component structure. Props for customization. No global state management (no Redux, no Zustand). The only state is in the form component.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Brevo/Mailchimp | REST API from Server Action via `fetch()` | API key in `NEXT_PUBLIC_` is wrong -- use `process.env.EMAIL_API_KEY` (server only) |
| Zoom | Link stored as constant or in email service attributes | No API integration needed for v1 -- just include the link |
| Facebook Pixel | Client-side `<Script>` tag in root layout | Use `next/script` with `strategy="afterInteractive"` |
| Art of Living official site | External link to course registration | Simple `<a>` tag, opens in new tab |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Form Component --> Server Action | Direct function call (React Server Action protocol) | Type-safe, no manual fetch needed |
| Server Action --> Email Service | `fetch()` to REST API | Wrap in `lib/email.ts` for testability |
| Pages --> Components | Props | No shared state needed between pages |
| Layout --> Pages | Composition (children) | Shared header/footer via layout nesting |

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k registrations | Current architecture is perfect. Static pages + Server Action + email service API |
| 1k-10k registrations | Still fine. Vercel handles traffic spikes from Facebook ads. Email service handles volume |
| 10k+ registrations | May need email service paid tier. Consider rate limiting on the Server Action. No architectural changes needed |

### Scaling Priorities

1. **First bottleneck:** Email service free tier limits (Brevo: 300 emails/day free). Solution: Upgrade to paid tier or switch services. No code changes.
2. **Second bottleneck:** Vercel free tier limits (100GB bandwidth/month). Solution: Upgrade to Pro ($20/mo) or self-host. Unlikely to hit with a landing page.

## Build Order (Dependencies)

This ordering matters for the roadmap:

```
Phase 1: Foundation
    ├── Next.js project setup + Tailwind + TypeScript
    ├── Root layout (header, footer, brand styles)
    └── Homepage (content sections)
         No dependencies, can deploy immediately

Phase 2: Intro Talk Landing Page (core conversion page)
    ├── Page structure and marketing sections
    ├── Registration form (Client Component)
    ├── Server Action for form submission
    ├── Email service integration (lib/email.ts)
    └── Thank you page
         Depends on: Phase 1 (layout exists)
         Depends on: Email service account setup

Phase 3: Email Automation
    ├── Configure automation in email service dashboard
    ├── Confirmation email template
    ├── Reminder email templates
    ├── Post-talk follow-up templates
    └── Test full flow end-to-end
         Depends on: Phase 2 (contacts flowing into email service)
         NOTE: This is mostly email service configuration, not code

Phase 4: Course Landing Page + SEO + Polish
    ├── Course landing page content
    ├── SEO metadata, Open Graph, JSON-LD
    ├── Sitemap and robots.txt
    ├── Facebook Pixel integration
    └── Mobile responsiveness QA
         Depends on: Phase 1 (layout exists)
         Independent of: Phase 2-3 (can be built in parallel)
```

## Sources

- [Next.js Official: Static Exports](https://nextjs.org/docs/app/guides/static-exports) -- confirms API Routes and Server Actions not supported with `output: 'export'` (HIGH confidence)
- [Next.js Official: Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) -- file-system routing conventions (HIGH confidence)
- [Next.js Official: Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- SEO metadata API (HIGH confidence)
- [Next.js Official: Deploying](https://nextjs.org/docs/app/getting-started/deploying) -- deployment options and requirements (HIGH confidence)
- [MakerKit: Server Actions vs Route Handlers](https://makerkit.dev/blog/tutorials/server-actions-vs-route-handlers) -- when to use each pattern (MEDIUM confidence)
- [Brevo: Send Transactional Emails with Next.js](https://www.brevo.com/blog/send-transactional-emails-with-next-js-and-sendinblue/) -- Brevo integration pattern (MEDIUM confidence)
- [Next.js GitHub Discussion: Static Export + Server Actions](https://github.com/vercel/next.js/discussions/73559) -- confirms incompatibility (HIGH confidence)

---
*Architecture research for: Art of Living Devon/Southwest Landing Page Site*
*Researched: 2026-02-24*
