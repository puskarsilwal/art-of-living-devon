# Project Research Summary

**Project:** Art of Living Devon/Southwest Landing Page
**Domain:** High-converting event registration landing page with email automation funnel (wellness/meditation)
**Researched:** 2026-02-24
**Confidence:** HIGH

## Executive Summary

This project is a conversion-focused marketing site for a local Art of Living community group in Devon/Southwest England. Its primary purpose is to capture registrations for free online intro talks (via Zoom), then nurture registrants through an email sequence toward enrollment in the paid Art of Living Part 1 (Happiness Program) course. Traffic will come almost entirely from Facebook ads targeting a cold audience in the Devon/Southwest region, which means mobile-first design and a frictionless single-step registration form are non-negotiable from day one. The recommended approach is a 3-4 page Next.js 16 site (SSG for marketing content, Server Action for form submission) deployed on Vercel's free tier, integrated with Brevo for email automation. This stack is fully free at MVP scale and avoids every major trap that kills similar projects.

The critical strategic decision is using Brevo over Mailchimp. Mailchimp gutted its free tier in 2025 and cannot support conditional automation flows (attended vs. no-show branching) on any free plan. Brevo provides unlimited contacts, 300 emails/day, and full conditional workflow logic on its free tier — exactly what this funnel requires. The registration form must be minimal (name + email only, phone optional), the landing page must mirror the Facebook ad creative verbatim to prevent bounce, and email authentication (SPF/DKIM/DMARC) must be configured before a single registration is collected. The site has substantial credibility assets to work with: 100+ peer-reviewed studies at Yale, Harvard, and Stanford validate SKY Breath Meditation, and the foundation's global reach (500M+ people, 180 countries) provides social proof for cold traffic.

The primary risks are legal and operational rather than technical. UK GDPR/PECR compliance is mandatory and must be built into the form and email sequences from day one — retroactive remediation is expensive and carries fines up to 17.5 million GBP. Email deliverability failure (Zoom links going to spam) is a recoverable but damaging mistake. The architecture is simple enough that an experienced developer can ship a production-ready MVP in a single focused sprint. The complexity of this project lies in the email automation configuration (done in Brevo's dashboard, not in code) and the copywriting/ad alignment work, not in the technology.

---

## Key Findings

### Recommended Stack

The stack is modern, well-integrated, and entirely free at MVP scale. Next.js 16 with App Router is the clear choice: it provides SSG for fast static marketing pages, Server Actions for secure form submission without exposing API keys, and zero-config deployment on Vercel. Tailwind CSS 4 ships as the default with Next.js 16 and enables rapid mobile-first responsive design. shadcn/ui provides accessible form components (built on Radix UI) that can be fully customized to match Art of Living's orange/white brand identity without the weight of a full design system.

Brevo is the decisive email platform choice. EmailOctopus is a viable fallback but lacks conditional automation triggers. Mailchimp and MailerLite are not viable on free tiers for this use case. For analytics, both GA4 (required for Facebook Ads attribution) and Vercel Analytics (zero-config web vitals) run simultaneously at no cost.

**Core technologies:**
- **Next.js 16.x (React 19.2, TypeScript 5.x):** SSG for marketing pages + Server Actions for form submission — full-stack without a separate backend
- **Tailwind CSS 4.x + shadcn/ui:** Rapid utility-first styling with accessible, customizable components — matches Art of Living branding with full control
- **React Hook Form 7.x + Zod 4.x:** Standard form handling with type-safe validation on both client and server — prevents form data bugs
- **Brevo (API v3, @getbrevo/brevo SDK):** Free tier covers unlimited contacts, 300 emails/day, conditional automation workflows — the only free tool that supports the full funnel
- **Vercel (Hobby tier):** Zero-config Next.js hosting, edge CDN, free SSL, preview deployments — requires non-commercial use classification (Art of Living as a nonprofit community project qualifies)
- **GA4 + Vercel Analytics:** Facebook Ads conversion tracking (GA4) + core web vitals (Vercel) — both required, both free
- **Framer Motion 11.x:** Polished scroll animations and CTA hover states — landing pages need motion to feel premium
- **next/image + Sharp:** Automatic WebP/AVIF conversion, 40-70% image size reduction — critical for mobile load times

See [STACK.md](.planning/research/STACK.md) for full comparison including email tool alternatives and hosting options.

### Expected Features

The intro talk landing page is the primary conversion surface and must be treated as a focused, single-purpose registration page — not a general website. Facebook ad traffic is 80%+ mobile and cold (audience has no prior knowledge of Art of Living), so every design decision must serve conversion above all else. The email funnel is the primary mechanism for attendance improvement and course enrollment — it cannot be treated as an afterthought.

**Must have (table stakes):**
- Clear, specific headline above the fold with event date/time ("Free 60-Min Online Workshop: [Date/Time]") — visitors decide in 3-5 seconds
- Minimal registration form: name + email (phone optional or post-registration) — each extra field costs conversions
- Single repeated CTA ("Save My Seat" / "Reserve My Free Spot") — used in hero, after benefits, after social proof, footer
- Mobile-responsive design — mobile-first since Facebook ad traffic is 80%+ mobile
- Social proof: Art of Living credibility stats (500M+ people, 180 countries, Yale/Harvard/Stanford research) — cold traffic needs trust signals before the fold
- Teacher photo and brief bio — anonymous events feel untrustworthy
- Confirmation page with Zoom link + calendar add button — immediate expectation after registration
- Complete email sequence: immediate confirmation (Zoom link), 1-day reminder, 1-hour reminder, post-event follow-up
- UK GDPR/PECR consent checkbox (unticked) and privacy policy page — legally mandatory
- GA4 + Meta Pixel with Lead conversion event on thank-you page — required for ad attribution

**Should have (differentiators):**
- Countdown timer to next session — authentic urgency lifts conversions 30-50%
- Research-backed credibility section with university logos and key stats — Art of Living has unusually strong scientific validation most competitors cannot claim
- "What to expect" section (step-by-step Zoom walkthrough) — reduces newcomer anxiety
- Conditional email flows: different post-event sequences for attendees vs. no-shows — 10-15% re-engagement lift
- No-show re-engagement email — captures people who intended to attend but forgot
- Local Devon/Southwest identity — cold Facebook traffic in the region responds to local connection
- Session date picker (2-3 upcoming sessions) — reduces "I'm busy that day" objection
- Calendar add button (ICS/Google) in confirmation email — reduces no-shows

**Defer (v2+):**
- Course landing page (Part 1 / Happiness Program) — needed but not blocking intro talk launch
- Video testimonial or teacher intro clip — high value but adds production overhead
- SMS/WhatsApp automation — only if email open rates prove insufficient
- Blog/CMS — only if content marketing becomes a strategy
- Homepage for Art of Living Devon/Southwest — intro talk LP can serve as landing until v2

See [FEATURES.md](.planning/research/FEATURES.md) for full feature list including Art of Living credibility content, messaging strategy for cold Facebook traffic, and feature dependencies.

### Architecture Approach

The architecture is deliberately simple: 3-4 Next.js pages rendered statically at build time (fast CDN delivery), one Client Component for the registration form, one Server Action for form submission (keeps API keys server-side, provides CSRF protection, maintains type safety end-to-end). All email automation logic lives in Brevo's dashboard, not in the Next.js app. This is the correct separation of concerns: Next.js handles the UI and secure API calls; Brevo handles scheduling, conditional branching, retries, and deliverability. The critical architectural decision — Vercel over static export to cheap hosting — is confirmed: Next.js static export does not support API Routes or Server Actions, making it impossible to call the Brevo API without exposing secret keys in the browser.

**Major components:**
1. **Pages (SSG Server Components):** Homepage, Intro Talk landing page, Course page, Thank You page — all pre-rendered HTML served from CDN; zero JavaScript cost for marketing content
2. **RegistrationForm (Client Component):** The only interactive element; handles field validation feedback, loading states, error messages; calls the Server Action
3. **Server Action (`lib/actions/register.ts`):** Server-side Zod validation, Brevo API call, redirects to thank-you page — never callable from browser, API key never exposed
4. **lib/email.ts:** Thin wrapper around Brevo SDK; creates contact with session_date and session_zoom_link attributes; triggers Brevo automation
5. **Brevo Automation Engine (external):** Handles all email scheduling logic — confirmation, 1-day reminder, 1-hour reminder, attended/no-show branching, post-event nurture
6. **Section Components (Server Components):** Hero, Benefits, Testimonials, TeacherProfile, SocialProof, SessionPicker — no JavaScript shipped, pure HTML rendering

See [ARCHITECTURE.md](.planning/research/ARCHITECTURE.md) for full project structure, data flow diagrams, rendering strategy, and code examples.

### Critical Pitfalls

Research identified 6 critical pitfalls. Three are Phase 0/1 decisions with high recovery costs if missed.

1. **Phone number field kills mobile conversions** — Launch with name + email only. Phone is optional or collected post-registration on the thank-you page. Every additional field at 80%+ mobile traffic means significant revenue lost per day of ads running.

2. **Email authentication failure sends Zoom links to spam** — Set up SPF, DKIM, and DMARC DNS records before collecting a single registration. Verify with Mail-Tester.com (target 9+/10). Domain reputation damage takes weeks to recover. Configure email auth during landing page build, not after.

3. **UK GDPR/PECR non-compliance** — Unticked marketing consent checkbox is mandatory on the form from day one. Transactional emails (Zoom link, reminders) do not require marketing consent; post-talk nurture emails do. Privacy policy page must exist before launch. Recovery is expensive: retroactive consent collection or data deletion, potential ICO investigation. Fines up to 17.5M GBP under the 2025 Data Use and Access Act.

4. **Facebook ad to landing page message mismatch** — The landing page headline must mirror the ad headline almost verbatim. Use the same hero image. Remove all site navigation from the landing page (navigation reduces conversion 20-30%). One page, one goal, one CTA. High bounce rate from Facebook traffic is the warning sign.

5. **Wrong email tool** — Brevo only. Mailchimp removed Classic Automation Builder in June 2025; free tier is 500 sends/month, 250 contacts, no automation. MailerLite is 500 subscriber limit. EmailOctopus lacks conditional triggers (attended/no-show branching). Verify the chosen tool supports the full conditional flow before building the form.

6. **Hosting locks out server features** — Static export to cheap Nepal hosting ($20/year) eliminates Server Actions and API Routes. The only safe way to call Brevo without exposing API keys is through a server runtime. Use Vercel free tier from day one. This is the single most consequential technical decision — reversing it mid-project is a major rewrite.

See [PITFALLS.md](.planning/research/PITFALLS.md) for full pitfall detail, recovery strategies, integration gotchas, and the "Looks Done But Isn't" pre-launch checklist.

---

## Implications for Roadmap

Based on combined research, the build order has clear dependencies that dictate phase structure. Architecture research explicitly defines build order. Pitfalls research confirms which decisions must happen in Phase 0 before writing any code.

### Phase 0: Setup and Configuration
**Rationale:** Three decisions must be locked before code is written, and two have 24-48 hour lead times (DNS propagation, domain setup). The wrong hosting choice is a high-cost mistake to reverse. This is not "project setup" in the boilerplate sense — it is consequential technical decision-making.
**Delivers:** Confirmed hosting platform, domain with email authentication DNS records propagating, Brevo account with automation flow mapped, Next.js project scaffolded with TypeScript + Tailwind + shadcn/ui
**Addresses:** Pitfalls 5 (wrong email tool), 6 (hosting locks out server features)
**Decisions to lock:**
- Hosting: Vercel free tier (confirmed)
- Email platform: Brevo (confirmed, automation flows mapped before tool selected)
- Domain and sending subdomain (e.g., mail.artofliving-devon.com)
- DNS records: A/CNAME for hosting, SPF/DKIM/DMARC for email
- Next.js project init: `npx create-next-app@latest` with TypeScript, Tailwind, App Router, Turbopack

### Phase 1: Intro Talk Landing Page (Core Conversion)
**Rationale:** This is the entire product for v1. The intro talk landing page is the only page that generates revenue-enabling activity (registrations). Everything else is secondary. It must ship before any Facebook ads run.
**Delivers:** Production-ready, mobile-first registration page that converts cold Facebook traffic
**Uses:** Next.js SSG + Server Components for content sections, React Hook Form + Zod for the Client Component form, Brevo Server Action integration, next/image for optimized hero images, Framer Motion for scroll animations
**Implements:** All table-stakes features + top differentiators: headline/value prop, event date/time, 2-field form (name + email), single CTA, social proof above the fold, teacher photo/bio, countdown timer, Art of Living credibility section (Yale/Harvard research stats), "What to expect" walkthrough, UK GDPR consent checkbox, privacy policy page, thank-you/confirmation page with Zoom link + calendar add
**Avoids:** Pitfall 1 (phone field friction), Pitfall 3 (GDPR), Pitfall 4 (ad message mismatch — design page around the ad brief), Pitfall 6 (static hosting)
**Critical:** Meta Pixel installed and Lead event verified firing on thank-you page. Navigation stripped from landing page. Mobile tested on actual devices.

### Phase 2: Email Automation
**Rationale:** Form submissions flow into Brevo from Phase 1. The automation configuration in Brevo's dashboard can begin before Phase 1 ships, but requires Brevo account and a mapped automation flow to build correctly. Attendance at sessions depends on reminder delivery — this phase directly drives the core business metric.
**Delivers:** Complete automated email funnel from registration to post-event follow-up
**Uses:** Brevo automation builder (no code, dashboard configuration), Brevo API already integrated in Phase 1
**Implements:** Confirmation email with Zoom link (fires within 60 seconds), 1-day-before reminder, 1-hour-before reminder, post-event follow-up (initial: single flow, both attendees and no-shows get follow-up linking to course), email templates matching Art of Living branding, unsubscribe link in every email
**Avoids:** Pitfall 2 (email auth — DNS must be verified before first send), Pitfall 3 (transactional vs marketing email separation — reminders are transactional, post-talk nurture requires marketing consent)
**Note:** Attend/no-show conditional branching is Phase 3 — Phase 2 delivers a linear sequence that handles the core use case. Phase 2 is primarily Brevo dashboard configuration, not code.

### Phase 3: Enhancements (Attendance Improvement + Conversion Optimization)
**Rationale:** Once the funnel is running and collecting data, enhancements are prioritized based on where registrants are dropping off. No-show rates and post-event enrollment rates are the metrics to optimize.
**Delivers:** Conditional email flows (attended vs. no-show), session date picker for multiple upcoming sessions, course landing page, video content, "bring a friend" sharing in confirmation flow
**Uses:** Brevo automation conditional branching, Next.js additional page for course LP, attendance tracking via manual tagging in Brevo (Option A — no Zoom API integration needed for v1)
**Implements:** FEATURES.md Phase 2 list: conditional post-event flows, no-show re-engagement email, session date picker, course landing page (Art of Living Part 1 details + link to official enrollment), "bring a friend" prompt, video testimonial or teacher intro clip (if asset available)

### Phase 4: Growth and Optimization
**Rationale:** Only after baseline conversion data exists can optimization decisions be made. Earlier "optimization" is guesswork.
**Delivers:** Validated improvements based on real data — A/B tests, expanded analytics, possible SMS integration, homepage for Art of Living Devon/Southwest
**Defers:** Blog/CMS (only if content marketing becomes strategy), SMS/WhatsApp (only if email open rates prove insufficient), advanced analytics dashboard, user accounts

### Phase Ordering Rationale

- **Phase 0 before Phase 1:** Hosting and DNS decisions cannot be reversed cheaply. DNS propagation has a 24-48 hour lead time. Domain purchasing and Vercel setup take minutes but must precede code.
- **Phase 1 before Phase 2:** Email automation requires contacts flowing into Brevo. The Server Action integration (Phase 1) is the entry point for all contacts.
- **Phase 2 as primary Phase 2 focus:** A registration page with no reminder emails results in low attendance and a failed funnel. The email sequence is not optional — it is the product.
- **Phase 3 as separate phase:** Conditional flows require attendance data that doesn't exist until sessions have run. Session date picker requires multiple sessions to be scheduled. Course LP can be built in parallel with Phase 2 but is lower priority than getting the email funnel working.
- **Course LP is Phase 3, not Phase 1:** The intro talk page is the conversion surface. Course enrollment happens on the official Art of Living site. The course LP is a supporting page, not blocking.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Email Automation):** Brevo automation builder UI and conditional logic configuration. The overall pattern is well-understood but the specific steps for setting up session-date-triggered sequences with Zoom link attributes in Brevo should be validated against current Brevo documentation before implementation.
- **Phase 1 (GDPR):** The exact wording of the consent checkbox and the content required for the privacy policy page under UK GDPR/PECR should be reviewed with an ICO guidance checklist during implementation. The legal requirements are well-documented but the exact consent language matters.

Phases with standard patterns (skip research-phase):
- **Phase 0 (Setup):** Next.js scaffolding with create-next-app is fully documented and well-established. Vercel deployment is zero-config. DNS record types (SPF/DKIM/DMARC) are well-documented.
- **Phase 1 (Landing Page Build):** React Hook Form + Zod + Server Actions pattern is thoroughly documented in Next.js 16 official docs and multiple tutorials. shadcn/ui component integration is standard. next/image usage is well-understood.
- **Phase 4 (Growth):** Dependent on data that doesn't exist yet. No pre-research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core framework choices (Next.js 16, Tailwind 4, React 19.2) verified against official release blogs and docs. Brevo free tier verified against current pricing after Oct 2025 restructure. Vercel free tier verified including non-commercial use requirement. |
| Features | HIGH | Art of Living credibility content verified from official sources (artofliving.org, Yale News, Wikipedia). Landing page conversion best practices cross-referenced across 5+ industry sources. Email funnel sequence requirements are industry standard. |
| Architecture | HIGH | All architectural decisions confirmed against official Next.js documentation. Static export + Server Actions incompatibility confirmed from official docs and GitHub discussions. No ambiguity in the recommended approach. |
| Pitfalls | HIGH | UK GDPR/PECR requirements sourced directly from ICO official guidance and Alston & Bird legal analysis of the 2025 Data Use and Access Act. Email authentication requirements sourced from Google enforcement timeline and Proofpoint analysis. Mailchimp free tier changes confirmed from multiple sources. |

**Overall confidence:** HIGH

### Gaps to Address

- **Vercel Hobby plan commercial use classification:** The Hobby plan prohibits commercial use. This Art of Living community project is nonprofit in nature but the ICO's definition may not align with Vercel's terms. During Phase 0, confirm with the Devon/Southwest organizers whether this should be classified as a personal/community project or whether Vercel Pro ($20/month) is the appropriate tier. The fallback is self-hosting with `next start` on any Node.js hosting provider.

- **Brevo daily limit vs. ad campaign scale:** Brevo's free tier allows 300 emails/day. At scale (running multiple Facebook ad campaigns), this could become a constraint if daily registrations exceed 150 (each registration triggers at minimum a confirmation email). The plan is to upgrade to Brevo Starter ($9/month) when this limit approaches — budget for this from day one of running paid ads.

- **Art of Living brand assets and permissions:** Use of Art of Living logos, the Gurudev's image, and official imagery requires confirmation of permissions from the Art of Living foundation or the UK/Devon organization. Research flagged this as acceptable for public promotional images but uncertain for others. Resolve during Phase 1 content gathering.

- **Session Zoom link management:** For v1, the Zoom link is hardcoded as a constant and stored as a contact attribute in Brevo. This works for recurring meetings with a persistent link. If the Devon team uses per-session Zoom links, a manual update process for each session is needed. Zoom API integration (webhook to auto-update Brevo contact attributes) is a Phase 3 enhancement.

- **Course pricing and enrollment flow:** The Art of Living Part 1 course pricing is not publicly listed on the UK site. The course landing page (Phase 3) will link to the official Art of Living site for enrollment rather than showing pricing directly. Confirm with the Devon team what the current course pricing is and whether there is a specific Devon/Southwest enrollment page or whether the national site handles enrollment.

---

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Release Blog](https://nextjs.org/blog/next-16) — framework version, App Router, Turbopack, React 19.2
- [Next.js Official Docs: Static Exports](https://nextjs.org/docs/app/guides/static-exports) — confirms Server Actions incompatibility with static export
- [Next.js Official Docs: Forms](https://nextjs.org/docs/app/guides/forms) — Server Action form pattern
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, Oxide engine
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next) — Next.js 16 + Tailwind 4 compatibility
- [Brevo Free Plan FAQ](https://help.brevo.com/hc/en-us/articles/208580669) — 300/day limit, unlimited contacts, automation
- [Vercel Hobby Plan Docs](https://vercel.com/docs/plans/hobby) — bandwidth limits, non-commercial use requirement
- [Art of Living UK: Part 1 Course](https://www.artofliving.org/uk-en/courses/art-of-living-part-one) — course details, format, benefits
- [Art of Living: Research on Sudarshan Kriya](https://www.artofliving.org/us-en/meditation/benefits/research-sudarshan-kriya/) — research statistics
- [Yale News: Teach Them to Breathe (2020)](https://news.yale.edu/2020/07/27/improve-students-mental-health-yale-study-finds-teach-them-breathe) — Yale study on SKY vs mindfulness (Frontiers in Psychiatry, peer-reviewed)
- [ICO: Marketing and Data Protection in Detail](https://ico.org.uk/for-organisations/advice-for-small-organisations/direct-marketing-and-data-protection/marketing-and-data-protection-in-detail/) — UK GDPR/PECR consent rules
- [Alston & Bird: UK Data Use and Access Act 2025](https://www.alston.com/en/insights/publications/2026/01/uk-data-use-and-access-act-2025) — updated PECR penalties
- [Unbounce: Landing Page Best Practices](https://unbounce.com/landing-page-articles/landing-page-best-practices/) — form length, CTA copy, conversion data

### Secondary (MEDIUM confidence)
- [Brevo: Send Transactional Emails with Next.js](https://www.brevo.com/blog/send-transactional-emails-with-next-js-and-sendinblue/) — Brevo integration pattern for Next.js
- [MakerKit: Server Actions vs Route Handlers](https://makerkit.dev/blog/tutorials/server-actions-vs-route-handlers) — when to use each pattern
- [EmailOctopus Review 2026](https://research.com/software/reviews/emailoctopus) — EmailOctopus automation limitations
- [Email Tool Tester: Free Email Services 2026](https://www.emailtooltester.com/en/blog/free-email-marketing-services/) — email platform comparison
- [ActiveCampaign: 8 Emails in a Webinar Sequence](https://www.activecampaign.com/blog/webinar-email-sequence) — email funnel best practices
- [Unspam: 2025 Email Deliverability Report](https://unspam.email/articles/email-deliverability-report/) — spam placement statistics
- [Art of Living UK: Trustpilot Reviews (213 reviews)](https://uk.trustpilot.com/review/www.artofliving.org) — testimonial themes
- [Landingi: Facebook Landing Page Best Practices](https://landingi.com/landing-page/facebook-examples/) — ad-to-page alignment

### Tertiary (LOW confidence)
- [Art of Living Technology Stack (RocketReach)](https://rocketreach.co/art-of-living-technology-stack_b5c5ddbaf42e0e46) — official website stack (Drupal 7, not relevant to our build)

---
*Research completed: 2026-02-24*
*Ready for roadmap: yes*
