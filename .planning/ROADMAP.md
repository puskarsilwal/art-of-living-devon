# Roadmap: Art of Living Devon/Southwest

## Overview

This roadmap converts 40 v1 requirements into 10 phases that deliver a complete Facebook-ad-to-course-enrollment funnel for the Art of Living Devon/Southwest community. The build order prioritises landing pages first -- the intro talk page is the core product surface and gets built immediately after scaffolding. Email automation and DNS configuration are deferred until a domain is purchased. Everything deploys to Vercel free tier with no custom domain initially.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Project Scaffolding & Deploy** - Scaffold Next.js project, deploy to Vercel free tier, create privacy policy page
- [x] **Phase 2: Intro Talk Landing Page - Core** - Hero section, registration form, repeated CTAs, mobile-first layout, GDPR consent
- [x] **Phase 3: Intro Talk Landing Page - Trust & Content** - Social proof, credibility stats, teacher profile, what-to-expect section, objection handling (completed 2026-02-25)
- [ ] **Phase 4: Registration Flow & Session Selection** - Confirmation page with Zoom link and calendar add, countdown timer, session date picker
- [x] **Phase 5: Course Landing Page** - Happiness Program details, benefits/format, research data, testimonials, link to official registration (completed 2026-02-25)
- [x] **Phase 6: Homepage** - Art of Living Devon/Southwest community hub with branding, navigation to all pages, about section (completed 2026-02-26)
- [ ] **Phase 7: Event Pages** - Reusable event page template for Satsang, Kirtan, and community events with registration links
- [ ] **Phase 8: Analytics & Tracking** - Meta Pixel with Lead event, GA4 with UTM tracking, SEO/OG tags on all pages
- [ ] **Phase 9: Email Automation - Core Sequence** - DNS email auth, Brevo account setup, confirmation email with Zoom link, reminder emails
- [ ] **Phase 10: Email Automation - Post-Event & Nurture** - Post-event follow-up, no-show re-engagement, conditional attend/no-show flows, course enrollment nudge series

## Phase Details

### Phase 1: Project Scaffolding & Deploy
**Goal**: A working Next.js project is live on Vercel's free tier so all subsequent pages can be built and deployed immediately
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-06
**Success Criteria** (what must be TRUE):
  1. Next.js 16 project with Tailwind CSS 4 and shadcn/ui is deployed and accessible on a public Vercel URL (*.vercel.app)
  2. Privacy policy page exists at /privacy-policy with UK GDPR and PECR compliant content
  3. Running `npm run build` locally produces zero errors and the deployed site loads in under 3 seconds
**Plans**: 1 plan

Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 16 + Tailwind CSS 4 + shadcn/ui, brand theming, privacy policy, deploy to Vercel

### Phase 2: Intro Talk Landing Page - Core
**Goal**: A visitor arriving from a Facebook ad sees a compelling above-the-fold experience and can register in under 30 seconds on mobile
**Depends on**: Phase 1
**Requirements**: INTRO-01, INTRO-02, INTRO-03, INTRO-04, INTRO-05, INTRO-09
**Success Criteria** (what must be TRUE):
  1. Visitor sees benefit-driven headline and next intro talk date/time above the fold without scrolling (mobile and desktop)
  2. Visitor can register with name and email (phone optional) via a single-step form with no navigation distractions on the page
  3. "Save My Seat" CTA appears in at least 4 locations: hero, after benefits, after social proof area, and footer
  4. Page renders correctly and is fully usable on mobile viewports (375px+) with touch-friendly form inputs
  5. GDPR consent checkbox (unticked by default) and link to privacy policy are visible adjacent to the registration form
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Route group architecture, form dependencies, registration schema + server action
- [x] 02-02-PLAN.md — Intro talk landing page sections, registration form, 4 CTAs, mobile-first layout
- [ ] 02-03-PLAN.md — Gap closure: client-side Zod validation via react-hook-form + trust indicators near form

### Phase 3: Intro Talk Landing Page - Trust & Content
**Goal**: Cold Facebook traffic sees enough social proof and credibility to trust registering for an event from an organization they have never heard of
**Depends on**: Phase 2
**Requirements**: INTRO-06, INTRO-07, INTRO-08, INTRO-13, INTRO-14
**Success Criteria** (what must be TRUE):
  1. Visitor sees testimonials from real Art of Living participants in a dedicated social proof section
  2. Visitor sees credibility stats (Yale/Harvard research, 500M+ lives, 180 countries) with visual emphasis
  3. Visitor sees teacher/host photo, name, and credentials in a profile section
  4. Visitor can read a step-by-step "What to expect" breakdown of the 60-minute intro talk format
  5. Common objections ("No experience needed", "Free, no credit card", "Camera optional") are addressed visibly on the page
**Plans**: 10 plans

Plans:
- [x] 03-01-PLAN.md — Testimonial + credibility data files and section components (replaces placeholder SocialProofSection)
- [x] 03-02-PLAN.md — Teacher profile, what-to-expect, objections sections + page composition
- [x] 03-03-PLAN.md — Gap closure: source stock images (testimonial avatars, teacher photo, lifestyle images) + update data files
- [x] 03-04-PLAN.md — Gap closure: visual overhaul of all 5 trust sections (photos, alignment fixes, premium styling)
- [x] 03-05-PLAN.md — Gap closure: hero background image + benefits icon cards + CTA urgency (Gaps 6, 7, 9 partial)
- [x] 03-06-PLAN.md — Gap closure: registration form warmth + footer CTA image overlay + section rhythm CSS (Gaps 8, 9 partial, 10, 11)
- [x] 03-07-PLAN.md — Gap closure round 2: hero 3-bullet points + SessionIntroSection + MediaLogosSection (Gaps 12, 13, 15)
- [x] 03-08-PLAN.md — Gap closure round 2: benefits circular photos + credibility dark redesign + AboutSection (Gaps 14, 16, 17)
- [ ] 03-09-PLAN.md — Gap closure round 3: remove em-dashes from hero, session-intro, benefits; fix gradient + image variety
- [ ] 03-10-PLAN.md — Gap closure round 3: fix teacher quote dash, registration dual-heading, WhatToExpect banner, about copy

### Phase 4: Registration Flow & Session Selection
**Goal**: After registering, the visitor has everything they need to actually show up to the Zoom session, and can choose a session that fits their schedule
**Depends on**: Phase 2
**Requirements**: INTRO-10, INTRO-11, INTRO-12
**Success Criteria** (what must be TRUE):
  1. After submitting the registration form, visitor lands on a confirmation page showing the Zoom link and a working calendar-add button (ICS download and Google Calendar link)
  2. A real countdown timer on the landing page shows hours/minutes/seconds until the next scheduled intro talk session
  3. Visitor can select from 2-3 upcoming intro talk sessions with distinct dates and times before registering
**Plans**: 4 plans

Plans:
- [ ] 04-01-PLAN.md — Extend session data model (ids, zoomUrl, dateISO) + countdown timer client component + hero wiring
- [ ] 04-02-PLAN.md — Session picker UI + registration form wiring + server action redirect to confirmation
- [ ] 04-03-PLAN.md — Confirmation page (Zoom link, Google Calendar, ICS download) + ICS Route Handler
- [ ] 04-04-PLAN.md — Human verification of full end-to-end registration flow

### Phase 5: Course Landing Page
**Goal**: Warm leads from the intro talk can learn everything about the Happiness Program and click through to officially enroll
**Depends on**: Phase 1 (infrastructure)
**Requirements**: COURSE-01, COURSE-02, COURSE-03, COURSE-04, COURSE-05
**Success Criteria** (what must be TRUE):
  1. Visitor sees a comprehensive overview of the Art of Living Part 1 / Happiness Program including format (3 days, 3hrs/day) and what they will learn
  2. Visitor sees SKY Breath Meditation research data with university names and key statistics
  3. Visitor sees testimonials from Part 1 course participants
  4. A clear CTA links to the official Art of Living registration page for course enrollment
**Plans**: 5 plans

Plans:
- [ ] 05-01-PLAN.md — Data modules (course-stats, course-dates, course-testimonials) + accordion install + image assets
- [ ] 05-02-PLAN.md — Hero, Program Overview, Research Stats, Media Logos sections
- [ ] 05-03-PLAN.md — Course Content, Upcoming Dates, Founder sections
- [ ] 05-04-PLAN.md — Testimonials, Numbers, FAQ, Footer CTA sections
- [ ] 05-05-PLAN.md — Page assembler (happiness-program/page.tsx) + visual verification checkpoint

### Phase 6: Homepage
**Goal**: Art of Living Devon/Southwest has a branded local web presence that connects visitors to all offerings
**Depends on**: Phase 1 (infrastructure), Phase 2 (intro talk page exists to link to)
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04
**Success Criteria** (what must be TRUE):
  1. Homepage is accessible at the root URL with Art of Living Devon/Southwest branding (white, orange, peaceful imagery with local warmth)
  2. Homepage links to the intro talk page, course page, and upcoming events
  3. An "About Art of Living" section displays foundation credibility facts (global reach, Gurudev, mission)
**Plans**: 4 plans

Plans:
- [ ] 06-01-PLAN.md — Upgrade SiteHeader + SiteFooter with nav links and CTA button
- [ ] 06-02-PLAN.md — Build HeroSection + OfferingsSection homepage components
- [ ] 06-03-PLAN.md — Build AboutSection + LocalGuidesSection + FooterCta components
- [ ] 06-04-PLAN.md — Assemble page.tsx + human visual verification checkpoint

### Phase 7: Event Pages
**Goal**: The Devon/Southwest team can promote Satsang, Kirtan, and other community events using a consistent, reusable page template
**Depends on**: Phase 1 (infrastructure)
**Requirements**: EVENT-01, EVENT-02, EVENT-03
**Success Criteria** (what must be TRUE):
  1. A reusable event page template exists that can be duplicated for new events with minimal effort
  2. Each event page displays date, time, location, description, and price (if applicable)
  3. Each event page includes a registration or ticket link (external URL or on-page form)
**Plans**: 5 plans

Plans:
- [ ] 07-01-PLAN.md — EventConfig data module + email opt-in stub server action
- [ ] 07-02-PLAN.md — Hero, Details Bar, Experience, Explainer section components
- [ ] 07-03-PLAN.md — Video, Social Proof, Email Opt-in, Footer CTA section components
- [ ] 07-04-PLAN.md — Dynamic /events/[slug] page + /events index page
- [ ] 07-05-PLAN.md — Human visual verification checkpoint

### Phase 8: Analytics & Tracking
**Goal**: Every registration is tracked end-to-end so Facebook ad spend can be attributed and pages share well on social media
**Depends on**: Phase 4 (confirmation page must exist for Lead event to fire)
**Requirements**: INFRA-04, INFRA-05, INFRA-07
**Success Criteria** (what must be TRUE):
  1. Meta Pixel is installed and a Lead conversion event fires on the registration confirmation page (verified in Facebook Events Manager)
  2. GA4 is installed on all pages and correctly reads UTM parameters from Facebook ad campaign URLs
  3. All pages have appropriate SEO meta tags and Open Graph tags that render correctly when shared on Facebook/WhatsApp
**Plans**: TBD

Plans:
- [ ] 08-01: TBD

### Phase 9: Email Automation - Core Sequence
**Goal**: Every registrant receives the Zoom link immediately and gets reminded before the session so they actually show up (requires domain to be purchased and DNS configured)
**Depends on**: Phase 2 (registration form must submit to Brevo), domain purchase (external dependency)
**Requirements**: EMAIL-01, EMAIL-02, EMAIL-03, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. SPF, DKIM, and DMARC DNS records are configured and verified (Mail-Tester.com score of 9+/10)
  2. Brevo account is configured with API integration working from the Next.js Server Action (contact created on form submission)
  3. Confirmation email with Zoom link, event date/time, and calendar-add link arrives within 2 minutes of registration
  4. 1-day-before reminder email with value proposition and Zoom link is sent automatically
  5. 1-hour-before reminder email (short, urgent, Zoom link) is sent automatically
**Plans**: TBD

Plans:
- [ ] 09-01: TBD
- [ ] 09-02: TBD

### Phase 10: Email Automation - Post-Event & Nurture
**Goal**: After the intro talk, attendees are guided toward course enrollment and no-shows are re-engaged for the next session
**Depends on**: Phase 9
**Requirements**: EMAIL-04, EMAIL-05, EMAIL-06, EMAIL-07
**Success Criteria** (what must be TRUE):
  1. Attendees receive a post-event follow-up email with course information and a link to the official Art of Living registration page
  2. No-shows receive a re-engagement email 2-4 hours after the missed session inviting them to the next available session
  3. Email flows branch conditionally based on attendance status (attendee vs. no-show paths via manual tagging in Brevo)
  4. A multi-email course enrollment nudge sequence is sent to warm leads who attended but have not yet enrolled
**Plans**: TBD

Plans:
- [ ] 10-01: TBD
- [ ] 10-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Scaffolding & Deploy | 1/1 | Complete    | 2026-02-25 |
| 2. Intro Talk LP - Core | 2/3 | Gap closure | - |
| 3. Intro Talk LP - Trust | 11/11 | Complete   | 2026-02-25 |
| 4. Registration Flow | 3/4 | In Progress|  |
| 5. Course Landing Page | 5/5 | Complete   | 2026-02-25 |
| 6. Homepage | 4/4 | Complete   | 2026-02-26 |
| 7. Event Pages | 0/5 | Planning complete | - |
| 8. Analytics & Tracking | 0/1 | Not started | - |
| 9. Email - Core Sequence | 0/2 | Not started | - |
| 10. Email - Post-Event | 0/2 | Not started | - |
