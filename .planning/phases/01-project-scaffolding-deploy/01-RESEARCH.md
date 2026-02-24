# Phase 1: Project Scaffolding & Deploy - Research

**Researched:** 2026-02-24
**Domain:** Next.js 16 project scaffolding, Tailwind CSS 4, shadcn/ui, Vercel deployment, UK GDPR/PECR privacy policy
**Confidence:** HIGH

## Summary

This phase scaffolds a Next.js 16 project with Tailwind CSS 4 and shadcn/ui, deploys it to Vercel's free Hobby tier, and creates a UK GDPR/PECR compliant privacy policy page. The technology stack is well-established and documented. Next.js 16 (released October 2025) introduces Turbopack as the default bundler, renames `middleware.ts` to `proxy.ts`, requires async request APIs, and ships React 19.2. Tailwind CSS 4 (released January 2025) replaces the JavaScript config with CSS-native configuration using `@import "tailwindcss"` and `@theme` directives. shadcn/ui fully supports Tailwind v4 with OKLCH colors and the `@theme inline` pattern.

The Vercel deployment path is straightforward: push to GitHub and connect via the Vercel dashboard, or use the Vercel CLI. The privacy policy requires covering Meta Pixel, Google Analytics, Brevo email processing, and cookie consent with explicit opt-in under UK GDPR and PECR regulations.

**Primary recommendation:** Use `npx create-next-app@latest --yes` for scaffolding (gives Next.js 16 + Tailwind CSS 4 + TypeScript + App Router + Turbopack by default), then `npx shadcn@latest init` for component infrastructure. Deploy via GitHub integration on Vercel. Write the privacy policy as a static page covering all declared data processors.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Art of Living official branding: white and orange primary palette, peaceful imagery aesthetic
- Devon/Southwest local warmth — approachable community feel, not corporate
- Tailwind theme configured with brand colors and typography so future phases inherit the system
- shadcn/ui components themed to match Art of Living look and feel
- UK GDPR and PECR compliant privacy policy
- Covers: name/email/phone collection, Brevo email processing, Meta Pixel tracking, Google Analytics, cookie usage
- Plain English tone — accessible to general audience, not legalese-heavy
- Hosted at /privacy-policy, linked from all future registration forms
- Clean, minimal site shell — header and footer ready for navigation as pages are added in later phases
- Mobile-first (Facebook ad traffic is 80%+ mobile per requirements)
- No navigation distractions on landing pages (landing pages will use their own minimal layout)

### Claude's Discretion
- Exact color hex values and typography choices (within Art of Living brand guidelines)
- Folder/component structure and naming conventions
- shadcn/ui component selection and theme customization approach
- Privacy policy exact wording and section structure
- Header/footer design and content
- Build tooling configuration

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Next.js 16 project scaffolded with Tailwind CSS 4 and shadcn/ui, deployed on Vercel free tier | Standard Stack section covers exact versions, commands, and deployment approach. Architecture Patterns section covers project structure and theming. |
| INFRA-06 | Privacy policy page compliant with UK GDPR and PECR regulations | Privacy Policy Architecture section covers legal requirements, required sections, and consent patterns for Meta Pixel, GA4, Brevo, and cookies. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.x (latest) | React framework with App Router, SSR/SSG, file-based routing | Official docs version 16.1.6; Turbopack stable, React 19.2 bundled |
| React | 19.2.x (bundled) | UI library | Shipped with Next.js 16; includes View Transitions, useEffectEvent, Activity |
| Tailwind CSS | 4.x | Utility-first CSS framework | CSS-native config, 5x faster builds via Rust engine, no tailwind.config.js needed |
| shadcn/ui | latest (CLI) | Copy-paste component library | Tailwind v4 + React 19 support confirmed; OKLCH colors, @theme inline pattern |
| TypeScript | 5.x | Type safety | Required by Next.js 16 (minimum 5.1.0) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/postcss | latest | PostCSS plugin for Tailwind v4 | Required for Next.js integration with Tailwind CSS 4 |
| tw-animate-css | latest | Animation utilities for Tailwind v4 | Replaces tailwindcss-animate; installed by shadcn/ui init |
| lucide-react | latest | Icon library | Default icon set for shadcn/ui components |
| class-variance-authority | latest | Component variant management | Installed by shadcn/ui for variant-based styling |
| clsx + tailwind-merge | latest | Conditional class merging | Installed by shadcn/ui as `cn()` utility |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn/ui | Radix UI directly | shadcn/ui wraps Radix with Tailwind styling; lower effort, user decided on shadcn/ui |
| Vercel hosting | Netlify, Cloudflare Pages | Vercel is native Next.js platform; zero config; user decided on Vercel |
| Tailwind CSS 4 | Tailwind CSS 3 | v4 is stable since Jan 2025; user specified v4; no reason to use v3 |

**Installation:**
```bash
# Step 1: Scaffold Next.js 16 project
npx create-next-app@latest art-of-living --yes
# Default --yes gives: TypeScript, Tailwind CSS, ESLint, App Router, Turbopack, @/* alias

# Step 2: Initialize shadcn/ui
npx shadcn@latest init
# Select: New York style, OKLCH colors, CSS variables

# Step 3: Vercel CLI (optional — can also deploy via GitHub integration)
npm i -g vercel
vercel
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout (site shell: header + footer)
│   ├── page.tsx             # Homepage (placeholder for Phase 6)
│   ├── privacy-policy/
│   │   └── page.tsx         # Privacy policy page (INFRA-06)
│   ├── globals.css          # Tailwind imports + theme variables + brand colors
│   └── favicon.ico
├── components/
│   ├── ui/                  # shadcn/ui components (auto-managed by CLI)
│   ├── layout/
│   │   ├── site-header.tsx  # Shared header component
│   │   └── site-footer.tsx  # Shared footer component
│   └── shared/              # Reusable project components
├── lib/
│   └── utils.ts             # cn() utility (created by shadcn/ui init)
└── public/
    └── images/              # Static assets
```

### Pattern 1: Tailwind CSS 4 Theme Configuration with Brand Colors
**What:** Configure Art of Living brand colors using CSS-native `@theme inline` directive instead of JavaScript config
**When to use:** All brand color and typography definitions
**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

/* Art of Living brand colors */
:root {
  --brand-orange: oklch(0.75 0.18 55);    /* Art of Living orange */
  --brand-white: oklch(1 0 0);             /* Clean white */
  --brand-warm-gray: oklch(0.96 0.01 80);  /* Warm background */

  /* shadcn/ui theme variables */
  --background: oklch(1 0 0);
  --foreground: oklch(0.15 0.01 260);
  --primary: oklch(0.75 0.18 55);          /* Brand orange as primary */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.96 0.01 80);
  --secondary-foreground: oklch(0.15 0.01 260);
  /* ... other shadcn variables ... */
}

.dark {
  --background: oklch(0.15 0.01 260);
  --foreground: oklch(0.96 0.01 80);
  /* ... dark mode overrides if needed ... */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-brand-orange: var(--brand-orange);
  --color-brand-white: var(--brand-white);
  --color-brand-warm-gray: var(--brand-warm-gray);
  /* ... map all shadcn variables ... */
}
```
**Source:** https://ui.shadcn.com/docs/tailwind-v4, https://tailwindcss.com/blog/tailwindcss-v4

### Pattern 2: Dual Layout Strategy (Site Shell vs Landing Pages)
**What:** Root layout provides site shell (header/footer); landing pages can use a separate minimal layout
**When to use:** Site has both standard pages (privacy policy, homepage) and conversion-focused landing pages
**Example:**
```tsx
// src/app/layout.tsx — Root layout with site shell
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
```
**Note:** Landing pages in future phases can use route groups like `(landing)` with their own layout that omits the header navigation to avoid distractions.

### Pattern 3: Static Privacy Policy Page
**What:** Privacy policy as a server component with no client-side JS needed
**When to use:** Legal/informational pages that don't need interactivity
**Example:**
```tsx
// src/app/privacy-policy/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Art of Living Devon & Southwest",
  description: "How we collect, use, and protect your personal data.",
}

export default function PrivacyPolicyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-12 prose prose-neutral">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: [date]</p>
      {/* Structured sections */}
    </article>
  )
}
```

### Anti-Patterns to Avoid
- **Using tailwind.config.js with Tailwind v4:** Tailwind v4 uses CSS-native configuration. Do not create a tailwind.config.js file. Use `@theme` and `@theme inline` directives in CSS instead.
- **Synchronous request APIs:** Next.js 16 removes synchronous access to `cookies()`, `headers()`, `params`, `searchParams`. Always use `await`.
- **Using middleware.ts:** Next.js 16 renames middleware to proxy. For a new project, use `proxy.ts` if needed (not needed for this phase).
- **Pre-ticked consent checkboxes:** UK GDPR requires "unambiguous positive action" — consent checkboxes must be unticked by default.
- **Loading tracking scripts without consent:** Meta Pixel and Google Analytics cookies require explicit opt-in consent under PECR before loading.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Component styling variants | Custom class concatenation logic | `class-variance-authority` (via shadcn/ui) | Handles variant conflicts, conditional classes cleanly |
| Class name merging | String template concatenation | `cn()` from `lib/utils.ts` (clsx + tailwind-merge) | Prevents Tailwind class conflicts, handles conditional classes |
| UI primitives (buttons, cards) | Custom HTML+CSS components | shadcn/ui components | Accessible, tested, consistent with design system |
| Privacy policy from scratch | Writing legal text without template | Use ICO guidance structure + adapt to project specifics | Missing required sections creates legal risk |
| Deployment pipeline | Custom CI/CD | Vercel Git integration | Zero-config, automatic preview deployments, CDN |

**Key insight:** This phase is about foundation — every custom solution built here becomes tech debt for 9 subsequent phases. Use the standard tools; customize via theming only.

## Common Pitfalls

### Pitfall 1: Tailwind v4 CSS Configuration Confusion
**What goes wrong:** Developers create a `tailwind.config.js` file (v3 pattern) or use `@tailwind` directives instead of `@import "tailwindcss"`.
**Why it happens:** Most tutorials and training data reference Tailwind v3 patterns. v4 changed fundamentally to CSS-native configuration.
**How to avoid:** Use only `@import "tailwindcss"` in globals.css. Configure via `@theme inline` directive. No JavaScript config file. The `create-next-app@latest` template handles this correctly.
**Warning signs:** Seeing `@tailwind base; @tailwind components; @tailwind utilities;` in CSS files, or a `tailwind.config.js` file in the project root.

### Pitfall 2: shadcn/ui Init Validation Failure with Tailwind v4
**What goes wrong:** `npx shadcn@latest init` fails to detect Tailwind CSS installation because it looks for the v3 config file.
**Why it happens:** Known bug in some shadcn CLI versions when Tailwind v4 is used (no tailwind.config.js exists).
**How to avoid:** Use `npx shadcn@latest init` (latest version supports v4). If it fails, try `npx shadcn@canary init`. Ensure `@import "tailwindcss"` is present in globals.css before running init.
**Warning signs:** CLI error about "Tailwind CSS not detected" despite it being installed.

### Pitfall 3: Vercel Hobby Plan Commercial Use
**What goes wrong:** Deploying a site that generates revenue or promotes commercial activity on the Hobby (free) plan violates Vercel's terms.
**Why it happens:** The Hobby plan is "strictly limited to personal and non-commercial use."
**How to avoid:** This is flagged in STATE.md as a blocker. For initial development and testing, Hobby tier is fine. Before the site goes live with real event registrations, confirm with Devon/Southwest organizers whether a Pro plan ($20/month) is needed.
**Warning signs:** Receiving emails from Vercel about plan compliance.

### Pitfall 4: Missing Cookie Consent for Tracking Scripts
**What goes wrong:** Loading Meta Pixel or Google Analytics before user consent, violating UK GDPR and PECR.
**Why it happens:** Developers add tracking scripts in root layout without consent gating.
**How to avoid:** In Phase 1, the privacy policy page just documents the policy. Actual tracking scripts are added in Phase 8 (INFRA-04, INFRA-05) and MUST be gated behind cookie consent. The privacy policy should reference this even though scripts aren't installed yet.
**Warning signs:** Third-party cookies being set on first page load without user interaction.

### Pitfall 5: OKLCH Color Values in shadcn/ui
**What goes wrong:** Using HSL color values (the v3 pattern) in CSS variables when shadcn/ui v4 expects OKLCH.
**Why it happens:** Most existing shadcn/ui examples use HSL. The v4 update migrated to OKLCH for better color perception.
**How to avoid:** When running `shadcn init`, select OKLCH colors. Define all CSS variables in OKLCH format. Use a color converter to translate Art of Living brand colors to OKLCH.
**Warning signs:** Colors looking washed out or inconsistent between design and implementation.

## Privacy Policy Architecture

### Required Sections (UK GDPR + PECR)

Based on ICO guidance and the project's specific data processing activities:

1. **Who we are** — Art of Living Devon & Southwest, contact details, data controller identity
2. **What data we collect** — Name, email, phone (optional), usage data, cookie data
3. **Why we collect it (lawful basis)** — Consent for marketing emails; legitimate interest for event administration; consent for tracking cookies
4. **How we use your data** — Event registration, email reminders, follow-up communications, analytics
5. **Third-party processors** — Must name each:
   - **Brevo** (email automation) — processes name/email for transactional and marketing emails
   - **Meta (Facebook Pixel)** — tracks conversion events, ad performance
   - **Google Analytics 4** — anonymous usage analytics, UTM tracking
   - **Vercel** — website hosting, server logs
6. **Cookies and tracking** — Table of cookies used, their purpose, duration, and type (essential vs analytics vs marketing)
7. **Your rights** — Access, rectification, erasure, restriction, portability, objection, complaint to ICO
8. **Data retention** — How long data is kept and why
9. **International transfers** — Brevo (EU), Meta (US — adequacy decision/SCCs), Google (US)
10. **How to contact us / How to complain** — Direct contact + ICO complaint link
11. **Changes to this policy** — How updates are communicated

### PECR-Specific Requirements
- Cookies categorised: strictly necessary, analytics, marketing
- Consent required before setting non-essential cookies (analytics, marketing)
- Must explain what each cookie does in plain English
- Users must be able to refuse as easily as they accept
- Pre-ticked boxes are NOT valid consent

### Content Tone
Per user decision: "Plain English tone — accessible to general audience, not legalese-heavy." Use short sentences, clear headings, and avoid Latin legal terms. The ICO recommends layered privacy information — a short summary with links to detailed sections.

## Code Examples

### Creating the Next.js 16 Project
```bash
# Source: https://nextjs.org/docs/app/getting-started/installation
npx create-next-app@latest art-of-living --yes
cd art-of-living

# Verify setup
npm run build   # Should complete with zero errors
npm run dev     # Should start on http://localhost:3000
```

### Initializing shadcn/ui with Tailwind v4
```bash
# Source: https://ui.shadcn.com/docs/installation/next
npx shadcn@latest init

# Add components as needed
npx shadcn@latest add button card
```

### Root Layout with Mobile-First Meta Tags
```tsx
// Source: Next.js 16 docs - app/layout.tsx
import type { Metadata, Viewport } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Art of Living Devon & Southwest",
    template: "%s | Art of Living Devon & Southwest",
  },
  description: "Free intro talks and meditation courses in Devon and Southwest England",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F97316", // Brand orange
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
```

### Deploying to Vercel
```bash
# Option A: Vercel CLI
npm i -g vercel
vercel          # Links project, creates first deployment
vercel --prod   # Deploy to production

# Option B: GitHub integration (recommended)
# 1. Push code to GitHub repository
# 2. Go to vercel.com/new
# 3. Import the GitHub repository
# 4. Vercel auto-detects Next.js, deploys automatically
# 5. Every push to main triggers a production deployment
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JavaScript) | `@theme inline` in CSS | Tailwind v4, Jan 2025 | No JS config file; CSS-native theming |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4, Jan 2025 | Single import replaces three directives |
| HSL color values in shadcn/ui | OKLCH color values | shadcn/ui 2025 update | Better perceptual uniformity |
| `tailwindcss-animate` | `tw-animate-css` | shadcn/ui Tailwind v4 update | Compatible with v4 engine |
| `middleware.ts` in Next.js | `proxy.ts` | Next.js 16, Oct 2025 | Renamed; runs on Node.js runtime (not edge) |
| Synchronous `cookies()`, `headers()` | Async `await cookies()`, `await headers()` | Next.js 16, Oct 2025 | Breaking change; all request APIs are async |
| Turbopack opt-in (`--turbopack`) | Turbopack default | Next.js 16, Oct 2025 | No flag needed; use `--webpack` to opt out |
| `bg-gradient-to-*` | `bg-linear-to-*` | Tailwind v4, Jan 2025 | Renamed gradient utilities |
| `React.forwardRef` in shadcn | Function declarations with `data-slot` | shadcn/ui 2025 | Simplified component authoring |

**Deprecated/outdated:**
- `next lint` command: removed in Next.js 16; use ESLint CLI directly
- `tailwind.config.js`: not used in Tailwind v4 new projects
- `.eslintrc` format: Next.js 16 defaults to ESLint Flat Config
- `serverRuntimeConfig` / `publicRuntimeConfig`: removed; use env vars

## Open Questions

1. **Art of Living Brand Color Exact Values**
   - What we know: White and orange primary palette per user decision. Art of Living's official brand uses a distinctive orange.
   - What's unclear: Exact hex/OKLCH values for the official Art of Living orange, and any secondary colors.
   - Recommendation: Use a close approximation (e.g., Tailwind's `orange-500` / `#F97316` as starting point) and refine when brand assets are confirmed. This is within Claude's discretion per CONTEXT.md.

2. **Vercel Hobby Plan Commercial Viability**
   - What we know: Hobby plan is "strictly limited to personal and non-commercial use." This is flagged in STATE.md.
   - What's unclear: Whether a community meditation group counts as commercial use under Vercel's terms.
   - Recommendation: Proceed with Hobby for development. Flag for organizer discussion before going live with real registrations.

3. **Typography Selection**
   - What we know: Should feel peaceful, approachable, not corporate. Within Claude's discretion.
   - What's unclear: Whether to use system fonts (faster) or a Google Font (more distinctive).
   - Recommendation: Use a Google Font pair — a clean sans-serif for body (Inter or similar) and optionally a warmer font for headings. Loaded via `next/font` for zero layout shift.

## Sources

### Primary (HIGH confidence)
- Next.js 16 official docs — installation, upgrading, breaking changes (https://nextjs.org/docs/app/getting-started/installation, https://nextjs.org/docs/app/guides/upgrading/version-16) — version 16.1.6, last updated 2026-02-20
- Tailwind CSS v4 blog post (https://tailwindcss.com/blog/tailwindcss-v4) — released January 2025
- shadcn/ui installation docs (https://ui.shadcn.com/docs/installation/next) and Tailwind v4 guide (https://ui.shadcn.com/docs/tailwind-v4)
- ICO PECR cookie guidance (https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)
- Vercel Hobby plan docs (https://vercel.com/docs/plans/hobby)

### Secondary (MEDIUM confidence)
- Next.js 16 blog announcement (https://nextjs.org/blog/next-16) — cross-verified with upgrade docs
- Vercel pricing and limits (https://vercel.com/docs/limits, https://vercel.com/pricing)
- UK Data (Use and Access) Act 2025 impact on PECR — multiple legal sources confirm penalty alignment

### Tertiary (LOW confidence)
- Art of Living brand colors — approximated from public website, not confirmed with brand guidelines
- shadcn/ui canary workaround for init failures — community reports, may be resolved in latest version

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs verified for all libraries, versions confirmed current
- Architecture: HIGH - Patterns from official Next.js 16 and shadcn/ui docs
- Privacy policy: HIGH - ICO guidance is authoritative; PECR requirements well-documented
- Pitfalls: HIGH - Breaking changes documented in official upgrade guide; shadcn issues verified on GitHub
- Brand colors: LOW - Approximated; exact values need confirmation

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable ecosystem, 30-day validity)
