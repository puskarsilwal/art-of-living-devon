# Technology Stack

**Project:** Art of Living Devon/Southwest Landing Page
**Researched:** 2026-02-24

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 16.x (latest 16.1.6) | Full-stack React framework | Current stable version. App Router is mature, Turbopack is now the default bundler (2-5x faster builds), React 19.2 integration, built-in image optimization. SSG/ISR perfect for landing pages -- fast static pages with optional dynamic revalidation. | HIGH |
| React | 19.2 | UI library | Ships with Next.js 16. View Transitions for smooth page animations, useEffectEvent for cleaner effects. | HIGH |
| TypeScript | 5.x | Type safety | Next.js 16 is TypeScript-first by default. Catches form data bugs, improves DX. Non-negotiable for any new project. | HIGH |

### Styling & UI

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | 4.x (latest 4.2) | Utility-first CSS | Ships as default with Next.js 16's create-next-app. CSS-first config (no tailwind.config.js), Oxide engine with 5x faster builds. Perfect for landing pages -- rapid prototyping, responsive design, no CSS file management. | HIGH |
| shadcn/ui | latest | Component primitives | Not a dependency -- copies components into your codebase. Built on Radix UI (accessible) + Tailwind. Gives you form inputs, buttons, dialogs without building from scratch. Full control to customize for Art of Living branding. | HIGH |
| Framer Motion | 11.x | Animations | Smooth scroll animations, hero section entrance effects, CTA hover states. Landing pages need motion to feel polished. Lightweight for the effects needed. | MEDIUM |

### Form Handling & Validation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| React Hook Form | 7.x | Form state management | De facto standard for React forms. Works with Next.js Server Actions. Minimal re-renders, excellent DX. | HIGH |
| Zod | 4.x | Schema validation | Type-safe validation that infers TypeScript types from schemas. zodResolver bridges to React Hook Form seamlessly (supports Zod v3.25+ and v4). Validates name, email, phone on both client and server. | HIGH |
| @hookform/resolvers | latest | Validation bridge | Connects Zod schemas to React Hook Form. Standard integration. | HIGH |

### Email Automation (see detailed comparison below)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Brevo** (recommended) | API v3 | Email automation & CRM | Best free tier for this use case: unlimited contacts, 300 emails/day (sufficient for early-stage landing page), automation workflows with conditional logic, official Node.js SDK (@getbrevo/brevo), transactional + marketing emails in one platform. | MEDIUM |

### Analytics

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vercel Analytics | built-in | Core web vitals & page views | Free on Vercel Hobby/Pro. Zero-config with Next.js. Tracks performance metrics automatically. | HIGH |
| Google Analytics 4 | GA4 | Conversion tracking | Facebook Ads integration requires GA4 for proper attribution. Track form submissions as conversion events. Free. Industry standard for ad campaign measurement. | HIGH |

### Image Optimization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/image | built-in | Image component | Built into Next.js. Auto-converts to WebP/AVIF (60-80% size reduction). Lazy loading, blur-up placeholders, responsive srcset, prevents layout shift. No extra config needed. | HIGH |
| Sharp | auto-installed | Server-side compression | Next.js uses Sharp automatically for image optimization on the server. 40-70% file size reduction. Install explicitly for production builds. | HIGH |

### Hosting

| Technology | Tier | Purpose | Why | Confidence |
|------------|------|---------|-----|------------|
| **Vercel** (recommended) | Hobby (free) | Hosting & deployment | Zero-config Next.js deployment (Vercel made Next.js). Git push to deploy. Edge network, automatic HTTPS, preview deployments. 100GB bandwidth (enough for ~100K visitors/month). | HIGH |

**IMPORTANT Vercel caveat:** The Hobby plan is for personal, non-commercial use only. This Art of Living community project is borderline -- it's a nonprofit community effort, not a business. If Vercel considers it commercial, upgrade to Pro ($20/month) or use the Open Source Program. For MVP/initial development, Hobby is fine. Revisit before heavy promotion.

**Alternative:** Static export to Nepal hosting (~$20/year) is viable since landing pages can be fully static. Use `output: 'export'` in next.config.js. Loses Server Actions (use API routes on a separate service or client-side email API calls instead).

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-plausible | 3.12.x | Privacy-focused analytics | If you want cookie-free analytics as a GA4 alternative (self-host for free, or paid cloud). Optional. |
| clsx / cn | latest | Conditional class names | Comes with shadcn/ui setup. Use everywhere for dynamic Tailwind classes. |
| lucide-react | latest | Icons | Comes with shadcn/ui. Clean, consistent icon set. Use for CTAs, features, social proof. |
| @vercel/og | latest | Open Graph images | Generate dynamic social share images for Facebook ads. Low priority but nice for CTR. |

---

## Free Email Automation Tool Comparison

This is the critical decision for the project. All four options researched:

### Comparison Matrix

| Criterion | **Brevo** | **EmailOctopus** | **MailerLite** | **Mailchimp** |
|-----------|-----------|------------------|---------------|---------------|
| **Free contacts** | Unlimited (100K) | 2,500 | 500 | 250 |
| **Free sends** | 300/day (~9,000/mo) | 10,000/mo | 12,000/mo | 500/mo |
| **Automation on free** | Yes (2,000 contacts in automations) | Yes (basic workflows) | Yes (single-trigger, 100 steps) | NO |
| **Conditional flows** | Yes | Limited (no open/click triggers) | No multi-trigger | No |
| **API/SDK** | Official Node.js SDK (@getbrevo/brevo) | REST API | REST API | Official SDK |
| **Transactional email** | Yes (same platform) | No (separate service) | No | Separate (Mandrill, paid) |
| **Landing pages** | Yes (removed from starter Oct 2025, check free) | Yes | Yes (up to 10) | Yes |
| **CRM** | Basic CRM included | No | No | Basic CRM |
| **Templates** | Yes | Yes | NOT on free plan | Limited |

### Recommendation: Brevo

**Why Brevo wins for this project:**

1. **Unlimited contacts** -- as the landing page scales from Facebook ads, you won't hit a contact wall at 250 (Mailchimp) or 500 (MailerLite).
2. **Conditional automation** -- the funnel requires "attended vs. didn't attend" branching. Brevo supports this; EmailOctopus and MailerLite don't on free tiers.
3. **Transactional + marketing in one** -- confirmation emails with Zoom links are transactional; nurture sequences are marketing. Brevo handles both. Others require separate services.
4. **Official Node.js SDK** -- clean integration with Next.js API routes/Server Actions. Well-documented.
5. **300 emails/day is sufficient** -- for a local Devon community landing page, you won't hit 300 registrations/day for a long time. When you do, that's a good problem (upgrade to Starter at $9/month).

**Why NOT the others:**
- **Mailchimp**: No automation on free tier. 250 contact limit is laughable. Dead last.
- **MailerLite**: 500 subscriber limit (reduced from 1,000 in Sept 2025). No multi-trigger workflows. Would need upgrading quickly.
- **EmailOctopus**: Generous contacts (2,500) but lacks conditional flow triggers (open/click-based). No transactional email. API-only (no SDK). Second-best option if Brevo's daily limit is a concern.

### Fallback: EmailOctopus

If Brevo's 300/day limit becomes an issue before budget allows upgrading, EmailOctopus with 10,000/month and 2,500 contacts is the backup. You'd need a separate transactional email service (Resend free tier: 100 emails/day) for confirmation/Zoom link emails.

---

## Art of Living Official Website Reference

**Tech stack (artofliving.org):** Drupal 7 + PHP + MySQL + Nginx + cPanel. Legacy stack, not a model to follow for new development.

**Design patterns to replicate:**

| Element | Art of Living Pattern | Our Adaptation |
|---------|----------------------|----------------|
| Colors | Purple/blue (#7677F4) primary, Orange (#FF7E00) CTAs, white backgrounds | Use official Art of Living orange as primary CTA color. White/cream backgrounds for peaceful feel. Add Devon-specific warmth (earth tones as accents). |
| Typography | Open Sans (400, 600, 700 weights) | Use Open Sans or similar clean sans-serif (Inter is the Next.js default and equally clean). |
| CTAs | 6 button styles; orange gradient for high-priority actions | Orange gradient CTA for "Register Now". Ghost/outlined for secondary actions. |
| Layout | Max-width 1200px container, grid-based | Standard approach. Use Tailwind's max-w-7xl (1280px) container. |
| Hero | Large H1 (48px desktop, 30px mobile), dramatic scaling | Full-width hero with background image, large headline, single CTA. |
| Mobile | Hamburger nav, responsive scaling | Mobile-first since Facebook ad traffic is heavily mobile. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro | Astro is great for static sites but lacks React ecosystem depth. Next.js gives us Server Actions for form handling, easy Vercel deploy, and future flexibility if project grows. |
| Styling | Tailwind CSS 4 | CSS Modules | Tailwind is faster for landing pages. CSS Modules add file management overhead with no benefit for a small site. |
| UI Components | shadcn/ui | Material UI, Chakra | MUI/Chakra are heavy, opinionated design systems. shadcn/ui gives full control -- critical for matching Art of Living branding. |
| Forms | React Hook Form + Zod | Formik | Formik is legacy at this point. RHF has better performance, smaller bundle, modern API. |
| Email | Brevo | Mailchimp | Mailchimp gutted their free tier. No automation. 250 contacts. Not viable. |
| Hosting | Vercel | Netlify, Nepal hosting | Vercel has the best Next.js integration (they built it). Netlify is comparable but no advantage. Nepal hosting requires static export (loses Server Actions). |
| Analytics | GA4 + Vercel Analytics | Plausible only | GA4 is required for Facebook Ads attribution. Plausible alone can't do conversion tracking for ad campaigns. |

---

## Installation

```bash
# Create project with Next.js 16 defaults (App Router, TypeScript, Tailwind CSS 4, Turbopack)
npx create-next-app@latest art-of-living-devon --typescript --tailwind --app --turbopack

# UI components (shadcn/ui)
npx shadcn@latest init
npx shadcn@latest add button input label card dialog form

# Form handling & validation
npm install react-hook-form @hookform/resolvers zod

# Email automation (Brevo SDK)
npm install @getbrevo/brevo

# Animations
npm install framer-motion

# Analytics
npm install @vercel/analytics

# Image optimization (explicit install for production)
npm install sharp

# Icons (comes with shadcn but ensure installed)
npm install lucide-react
```

```bash
# Dev dependencies
npm install -D @types/node

# Environment variables needed
# BREVO_API_KEY=your_brevo_api_key
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Version Verification Notes

| Technology | Claimed Version | Verification Source | Status |
|------------|----------------|-------------------|--------|
| Next.js | 16.1.6 | WebSearch: nextjs.org/blog, releasebot.io | Verified -- Next.js 16 is current as of Feb 2026 |
| Tailwind CSS | 4.2 | WebSearch: github.com/tailwindlabs/tailwindcss/releases | Verified -- v4.2.0 is latest stable |
| React | 19.2 | WebSearch: nextjs.org/blog/next-16 | Verified -- ships with Next.js 16 |
| Brevo free tier | 300/day, unlimited contacts | WebSearch: multiple 2026 reviews, brevo.com help center | Verified -- note Oct 2025 pricing restructure |
| Vercel Hobby | 100GB bandwidth, personal use only | WebSearch: vercel.com/pricing, vercel.com/docs/plans/hobby | Verified |
| shadcn/ui | latest | WebSearch: ui.shadcn.com/docs/installation/next | Verified -- works with Next.js 16 + Tailwind 4 |

---

## Sources

- [Next.js 16 Release Blog](https://nextjs.org/blog/next-16) -- HIGH confidence
- [Next.js App Router Docs](https://nextjs.org/docs/app) -- HIGH confidence
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- HIGH confidence
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next) -- HIGH confidence
- [Brevo Free Plan FAQ](https://help.brevo.com/hc/en-us/articles/208580669) -- HIGH confidence
- [Brevo Node.js SDK](https://github.com/getbrevo/brevo-node) -- HIGH confidence
- [EmailOctopus Review 2026](https://research.com/software/reviews/emailoctopus) -- MEDIUM confidence
- [MailerLite Free Plan](https://www.mailerlite.com/free-plan) -- MEDIUM confidence
- [Email Tool Tester: Free Email Services 2026](https://www.emailtooltester.com/en/blog/free-email-marketing-services/) -- MEDIUM confidence
- [Vercel Hobby Plan Docs](https://vercel.com/docs/plans/hobby) -- HIGH confidence
- [Vercel Pricing](https://vercel.com/pricing) -- HIGH confidence
- [Next.js Image Optimization Docs](https://nextjs.org/docs/app/getting-started/images) -- HIGH confidence
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms) -- HIGH confidence
- [React Hook Form + Zod Guide](https://react-hook-form.com/docs/useform) -- HIGH confidence
- [Art of Living UK Website](https://www.artofliving.org/uk-en) -- MEDIUM confidence (design analysis via WebFetch)
- [Art of Living Technology Stack](https://rocketreach.co/art-of-living-technology-stack_b5c5ddbaf42e0e46) -- LOW confidence (third-party profiler)
