# Requirements: Art of Living Devon/Southwest

**Defined:** 2026-02-24
**Core Value:** Convert Facebook ad visitors into intro talk attendees, then nurture them toward enrolling in the full Art of Living Part 1 course — without losing anyone along the way.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Intro Talk Landing Page

- [x] **INTRO-01**: Visitor sees clear, benefit-driven headline and value proposition above the fold
- [x] **INTRO-02**: Visitor sees next intro talk date/time prominently displayed with timezone (GMT/BST)
- [x] **INTRO-03**: Visitor can register with name + email (phone optional) via minimal-friction form
- [x] **INTRO-04**: Repeated CTA ("Save My Seat") appears in hero, after benefits, after social proof, and footer
- [x] **INTRO-05**: Page is mobile-first responsive (Facebook ad traffic is 80%+ mobile)
- [x] **INTRO-06**: Visitor sees social proof section with public testimonials from Art of Living participants
- [x] **INTRO-07**: Visitor sees credibility section with Yale/Harvard research stats, 500M+ lives touched, 180 countries
- [x] **INTRO-08**: Visitor sees teacher/host photo, name, and credentials
- [x] **INTRO-09**: Page includes GDPR-compliant explicit consent checkbox (unticked), privacy policy link, and trust indicators
- [x] **INTRO-10**: After registration, visitor sees confirmation page with Zoom link and calendar add button (ICS/Google)
- [x] **INTRO-11**: Countdown timer shows real time remaining until next scheduled intro talk session
- [x] **INTRO-12**: Visitor can select from 2-3 upcoming intro talk sessions with date/time
- [x] **INTRO-13**: "What to expect" section explains the 60-min format step-by-step (breathing technique, meditation, Q&A)
- [x] **INTRO-14**: Page addresses common objections ("No experience needed", "Free, no credit card required", "Camera on but no pressure")

### Part 1 Course Landing Page

- [x] **COURSE-01**: Visitor sees detailed Happiness Program / Part 1 course information and overview
- [ ] **COURSE-02**: Visitor sees course benefits, format (3 days, 3hrs/day), and what they'll learn (Sudarshan Kriya, pranayama, yoga)
- [x] **COURSE-03**: Visitor sees SKY Breath Meditation research data and credibility (Yale, Harvard, 100+ studies)
- [ ] **COURSE-04**: CTA links to official Art of Living registration page for course enrollment
- [x] **COURSE-05**: Page includes testimonials from Part 1 course participants (sourced from public reviews)

### Homepage

- [ ] **HOME-01**: Art of Living Devon/Southwest branded homepage serves as community hub
- [ ] **HOME-02**: Homepage links to intro talk page, course page, and upcoming events
- [ ] **HOME-03**: Brief "About Art of Living" section with foundation credibility facts
- [ ] **HOME-04**: Blended branding — Art of Living official look (white, orange, peaceful imagery) with Devon/Southwest local warmth

### Satsang/Event Pages

- [ ] **EVENT-01**: Reusable event page template for Satsang, Kirtan, and other community events
- [ ] **EVENT-02**: Each event page displays date, time, location, description, and price if applicable
- [ ] **EVENT-03**: Each event page has registration or ticket link (external or on-page form)

### Email Automation

- [ ] **EMAIL-01**: Registration confirmation email sent immediately with Zoom link, event date/time, and calendar add link
- [ ] **EMAIL-02**: 1-day-before reminder email re-stating value prop and including Zoom link
- [ ] **EMAIL-03**: 1-hour-before reminder email (short, urgent, with Zoom link)
- [ ] **EMAIL-04**: Post-event follow-up email for attendees with course info and registration link
- [ ] **EMAIL-05**: No-show re-engagement email sent 2-4 hours after missed session with next session invite
- [ ] **EMAIL-06**: Conditional email flows — different paths for attendees vs. no-shows (manual tagging in Brevo)
- [ ] **EMAIL-07**: Course enrollment nudge sequence — multi-email series pushing warm leads toward Part 1 enrollment

### Infrastructure

- [x] **INFRA-01**: Next.js 16 project scaffolded with Tailwind CSS 4 and shadcn/ui, deployed on Vercel free tier
- [ ] **INFRA-02**: Brevo account configured and integrated for email automation (free tier)
- [ ] **INFRA-03**: SPF/DKIM/DMARC email authentication configured on domain DNS
- [ ] **INFRA-04**: Meta Pixel installed with Lead conversion event firing on registration confirmation page
- [ ] **INFRA-05**: Google Analytics 4 installed with UTM parameter tracking for Facebook ad campaigns
- [x] **INFRA-06**: Privacy policy page compliant with UK GDPR and PECR regulations
- [ ] **INFRA-07**: SEO meta tags and Open Graph tags configured for social sharing on all pages

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Content

- **VID-01**: Video testimonial or short teacher intro clip on intro talk page
- **VID-02**: "Bring a friend" sharing prompt in confirmation flow with pre-written share text

### Communication

- **SMS-01**: SMS/WhatsApp reminder integration as backup to email
- **SMS-02**: WhatsApp community group link for Devon/Southwest

### Advanced Analytics

- **ANLY-01**: Conversion rate dashboard tracking ad-to-registration and registration-to-attendance
- **ANLY-02**: A/B testing framework for headline and CTA variations

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Payment processing | Intro talk is free; course registration happens on official Art of Living site |
| User accounts / login system | Not needed for landing pages; adds friction |
| Blog / CMS | Static pages sufficient for v1; over-engineering |
| Multi-step registration wizard | Each step loses 20-40% of users; free event needs one-step registration |
| Chat widget / live support | Adds complexity, requires monitoring; FAQ section suffices |
| Exit-intent popups | Wellness audience sensitive to pushy marketing; damages trust |
| Fake countdown timers | Damages trust; use real session dates and actual Zoom capacity |
| Auto-playing video | Increases bounce rate, bad for mobile page speed |
| Integration with Art of Living Foundation systems | Independent operation by design |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INTRO-01 | Phase 2 | Complete |
| INTRO-02 | Phase 2 | Complete |
| INTRO-03 | Phase 2 | Complete |
| INTRO-04 | Phase 2 | Complete |
| INTRO-05 | Phase 2 | Complete |
| INTRO-06 | Phase 3 | Complete |
| INTRO-07 | Phase 3 | Complete |
| INTRO-08 | Phase 3 | Complete |
| INTRO-09 | Phase 2 | Complete |
| INTRO-10 | Phase 4 | Complete |
| INTRO-11 | Phase 4 | Complete |
| INTRO-12 | Phase 4 | Complete |
| INTRO-13 | Phase 3 | Complete |
| INTRO-14 | Phase 3 | Complete |
| COURSE-01 | Phase 5 | Complete |
| COURSE-02 | Phase 5 | Pending |
| COURSE-03 | Phase 5 | Complete |
| COURSE-04 | Phase 5 | Pending |
| COURSE-05 | Phase 5 | Complete |
| HOME-01 | Phase 6 | Pending |
| HOME-02 | Phase 6 | Pending |
| HOME-03 | Phase 6 | Pending |
| HOME-04 | Phase 6 | Pending |
| EVENT-01 | Phase 7 | Pending |
| EVENT-02 | Phase 7 | Pending |
| EVENT-03 | Phase 7 | Pending |
| EMAIL-01 | Phase 9 | Pending |
| EMAIL-02 | Phase 9 | Pending |
| EMAIL-03 | Phase 9 | Pending |
| EMAIL-04 | Phase 10 | Pending |
| EMAIL-05 | Phase 10 | Pending |
| EMAIL-06 | Phase 10 | Pending |
| EMAIL-07 | Phase 10 | Pending |
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 9 | Pending |
| INFRA-03 | Phase 9 | Pending |
| INFRA-04 | Phase 8 | Pending |
| INFRA-05 | Phase 8 | Pending |
| INFRA-06 | Phase 1 | Complete |
| INFRA-07 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 40 total
- Mapped to phases: 40
- Unmapped: 0

---
*Requirements defined: 2026-02-24*
*Last updated: 2026-02-24 after roadmap revision*
