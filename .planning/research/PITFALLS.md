# Pitfalls Research

**Domain:** Conversion landing page with email automation funnel (Facebook ad traffic)
**Researched:** 2026-02-24
**Confidence:** HIGH (multiple verified sources across all areas)

## Critical Pitfalls

### Pitfall 1: Phone Number Field Kills Mobile Conversion Rate

**What goes wrong:**
Adding a phone number field to the registration form creates significant friction. Research shows reducing form fields from 11 to 4 produces a 120% conversion lift. 81% of users abandon forms after starting, with excessive length being a top driver (27%). Since 83% of Facebook ad traffic is mobile, and mobile already converts at roughly half the desktop rate (2.5-2.9% vs 4.8-5.1%), every additional field compounds the problem.

**Why it happens:**
Teams want phone numbers as a "fallback contact method" without measuring the cost in lost registrations. The perceived value of having a phone number for each registrant blinds them to the reality that they are losing 30-50% of registrants who would have completed a shorter form.

**How to avoid:**
Launch with name + email only (2 fields). Make phone number an optional field or collect it in a post-registration "thank you" page as a secondary step. A/B test adding phone back only after establishing a baseline conversion rate. The intro talk is on Zoom -- email delivers the link perfectly fine.

**Warning signs:**
Form completion rate below 40%. High form-start-to-abandon ratio visible in analytics. Many partial submissions captured (if form tracks field-level engagement).

**Phase to address:**
Phase 1 (Landing Page Build) -- form design is a day-one decision that directly impacts every ad pound spent.

---

### Pitfall 2: Email Authentication Failure Sends Zoom Links to Spam

**What goes wrong:**
Registration confirmation emails and Zoom link reminders land in spam or are rejected entirely. Since November 2025, Google enforces strict rejection of messages from non-compliant senders. Gmail, Yahoo, Microsoft, and Apple collectively serve ~90% of consumer email. Even with valid SPF and DKIM, spam placement rates can exceed 30% if domain alignment is wrong or DMARC is misconfigured.

**Why it happens:**
Developers set up the email tool but skip DNS authentication records. SPF has a hard limit of 10 DNS lookups -- adding multiple SaaS tools easily exceeds this, causing a "PermError" that fails authentication entirely. Subdomains may need separate configuration. First-time senders from new domains have zero reputation, which amplifies spam filtering.

**How to avoid:**
Before sending a single email: (1) Set up SPF, DKIM, and DMARC DNS records for your sending domain. (2) Verify alignment -- the "From" domain must match the domain in SPF/DKIM. (3) Use Mail-Tester.com to send a test email and check your spam score. (4) Start with a small sending volume and gradually increase to build domain reputation. (5) Use a subdomain for marketing email (e.g., mail.artofliving-devon.com) to protect the root domain reputation.

**Warning signs:**
Test emails landing in spam/promotions tab. Mail-Tester score below 8/10. Bounce rates above 5% on first sends. Low open rates (below 20%) on confirmation emails that people actively want to receive.

**Phase to address:**
Phase 2 (Email Automation) -- must be done before any registration form goes live. DNS records need 24-48 hours to propagate, so configure them during landing page development.

---

### Pitfall 3: UK GDPR/PECR Non-Compliance Collecting Email and Phone

**What goes wrong:**
Collecting personal data (email, phone, name) for marketing without proper consent mechanisms violates UK GDPR and PECR (Privacy and Electronic Communications Regulations). The UK Data Use and Access Act 2025 aligned PECR penalties with UK GDPR maximum fines: up to 17.5 million GBP or 4% of annual worldwide turnover. Even small organizations face ICO enforcement action and mandatory remediation.

**Why it happens:**
Teams treat the registration form as "they signed up for the talk, so we can email them anything." The legal reality is more nuanced: (1) You need consent for each distinct purpose (event registration vs. marketing follow-up). (2) Pre-ticked checkboxes do not constitute valid consent. (3) The "soft opt-in" exception only applies during a "sale or negotiation of sale" -- a free intro talk may not qualify. (4) Phone number collection for automated calls requires explicit, specific consent for that type of call.

**How to avoid:**
- Use an unticked checkbox: "I'd like to receive follow-up emails about the Art of Living Part 1 course" -- separate from the registration confirmation flow.
- Transactional emails (Zoom link, reminders) do not require marketing consent, but post-talk nurture emails do.
- Include a privacy notice link on the form explaining: what data you collect, why, how long you keep it, and how to request deletion.
- Record consent evidence: timestamp, IP address, form version, exact wording shown.
- Make phone number explicitly optional with clear purpose statement.
- Include an unsubscribe link in every email (legally required).
- Create a simple privacy policy page on the site.

**Warning signs:**
No consent checkbox on registration form. No privacy policy page. No unsubscribe mechanism in emails. Sending marketing emails to people who only registered for a specific event. No records of when/how consent was obtained.

**Phase to address:**
Phase 1 (Landing Page Build) -- consent UI must be on the form from day one. Phase 2 (Email Automation) -- transactional vs. marketing email separation. Separate task: write a privacy policy page.

---

### Pitfall 4: Facebook Ad to Landing Page Message Mismatch

**What goes wrong:**
Users click a Facebook ad promising one thing and land on a page that looks, feels, or says something different. This causes immediate bounce -- visitors feel they landed on the wrong page. Inconsistent visuals (ad uses blue/red but page is orange/white), mismatched copy (ad says "free breathing workshop" but page says "introductory session"), or different imagery all trigger unconscious distrust.

**Why it happens:**
The landing page is built independently from ad creative. Different people write ad copy and page copy. The page tries to serve multiple audiences or purposes instead of being laser-focused on the ad's specific promise.

**How to avoid:**
- Match the landing page headline to the ad headline almost verbatim. If the ad says "Free Online Introduction to the Happiness Program", the page headline should echo that exact language.
- Use the same hero image on the landing page as in the ad.
- Match the color palette -- Art of Living's white/orange branding should be consistent across ad and page.
- One landing page per ad campaign message. Do not send all ad variants to the same generic page.
- Strip navigation from the landing page -- pages with no navigation convert 20-30% higher. One page, one job, one CTA.

**Warning signs:**
High bounce rate (above 70%) from Facebook traffic specifically. Low time-on-page from ad visitors. Facebook ad relevance score dropping. Users clicking but not scrolling past the fold.

**Phase to address:**
Phase 1 (Landing Page Build) -- design the page around the ad message, not the other way around. Revisit when creating Facebook ad creative to ensure alignment.

---

### Pitfall 5: Mailchimp Free Tier Cannot Do Conditional Email Flows

**What goes wrong:**
Teams choose Mailchimp because of brand recognition, then discover that automated email sequences (Customer Journey Builder) are only available on paid plans starting at $13/month. Mailchimp removed its Classic Automation Builder entirely in June 2025. The free plan is limited to 500 sends/month and 250 contacts -- far too constrained for a growing funnel. The project requires conditional flows (attended vs. didn't attend, reminder sequences, re-engagement) which are impossible on Mailchimp free.

**Why it happens:**
Mailchimp's free tier reduction is a years-long pattern that many developers are unaware of. Blog posts and tutorials from 2020-2023 reference Mailchimp free automation features that no longer exist.

**How to avoid:**
Use Brevo (formerly Sendinblue) for this project. Brevo's free tier includes: unlimited contacts (up to 100,000), 300 emails/day (9,000/month), automation workflow builder with conditional logic, page tracking, and segmentation. This covers the full funnel requirement: confirmation, reminders, no-show re-engagement, and post-talk nurture sequences. EmailOctopus is a backup option (2,500 contacts, 10,000 emails/month) but its automation is limited to basic drip campaigns without sophisticated triggers like open/click conditions.

**Warning signs:**
Choosing an email tool before mapping out the required automation flows. Assuming "free tier" means "free automation." Not testing the full conditional flow end-to-end before going live.

**Phase to address:**
Phase 2 (Email Automation) -- tool selection must happen based on the specific automation requirements, not brand familiarity. Map the full email flow first, then verify the chosen tool supports every branch.

---

### Pitfall 6: Next.js on Cheap Non-Vercel Hosting Breaks Server Features

**What goes wrong:**
Next.js features like API routes, server-side rendering (SSR), Incremental Static Regeneration (ISR), middleware, and server actions require a Node.js runtime. Cheap shared hosting from Nepal (~20 GBP/year) almost certainly does not support Node.js. If you use `output: 'export'` for static HTML, you lose all server-side features -- including any API routes needed for form submission to the email tool.

**Why it happens:**
Next.js documentation makes SSR/ISR look like default behavior, but these features are deeply tied to Vercel's infrastructure. Other platforms need adapters (like OpenNext for Netlify), and cheap shared hosting has no adapter at all. Teams build features during development (where `next dev` provides a full Node server) that silently fail in production static hosting.

**How to avoid:**
Make an explicit hosting decision before writing any code:
- **Option A (Recommended): Vercel free tier.** Supports all Next.js features natively. Free tier covers hobby projects. Use a custom domain. The main limitation is 100GB bandwidth/month and serverless function limits, which are more than adequate for a landing page.
- **Option B: Static export to cheap hosting.** Use `output: 'export'` in next.config.js. Accept that you get zero server features. Handle form submissions entirely client-side via the email tool's API/embed forms. No API routes, no SSR, no ISR.
- **Do NOT** mix approaches. Decide once and design around the constraint.

**Warning signs:**
Using `getServerSideProps` or API routes during development while planning to deploy to static hosting. Using `next/image` without configuring a custom loader for static export. Build succeeding locally but deployment showing 404s or blank pages.

**Phase to address:**
Phase 0 (Project Setup) -- hosting decision must be locked before any code is written. This is the single most consequential technical decision for the project.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Embedding email tool's hosted form instead of custom form | Fast to implement, no API integration needed | Less control over UX, branding, and field validation; harder to A/B test; potential CLS/layout shift from iframe | Acceptable for MVP if the email tool's form is visually decent; replace with custom form in v2 |
| Hardcoding event dates in page content | No CMS or database needed | Every new intro talk session requires a code change and redeployment | Acceptable for v1 with few sessions; add a simple JSON config file to make updates easier |
| Skipping analytics integration | Faster launch | Cannot measure conversion rates, identify drop-off points, or justify ad spend; flying blind | Never -- add at minimum a Meta Pixel and basic page view tracking from day one |
| Using Art of Living images without permission | Better visuals immediately | Potential IP/trademark issues with the foundation | Acceptable only for public promotional images; use AI-generated or stock images for anything uncertain |
| Single-page landing without separate thank-you page | Simpler build | Cannot track form submission conversions in Facebook Ads Manager or Google Analytics (no distinct URL to fire conversion event on) | Never -- a separate thank-you/confirmation page is essential for conversion tracking |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Brevo/Email Tool API | Submitting form data client-side with API key exposed in browser JavaScript | Use Brevo's embedded form or their JavaScript widget which handles this securely. If using custom forms with static export, use Brevo's API with their client-side library that does not expose secret keys. For static sites, Brevo's form embed handles auth server-side. |
| Facebook/Meta Pixel | Installing the pixel but not setting up the specific "Lead" conversion event on the thank-you page | Install pixel on all pages. Fire `fbq('track', 'Lead')` specifically on the thank-you/confirmation page. This lets Facebook optimize ad delivery for conversions, not just clicks. |
| Zoom link delivery | Sending a static Zoom link that expires or gets reused across sessions | Use a recurring Zoom meeting with a persistent link, or generate per-session links. Store the current session's Zoom link in the email tool as a variable/tag so reminders always reference the correct link. |
| DNS for custom domain + email | Configuring DNS for the website hosting but forgetting to add SPF/DKIM/DMARC records for the email sending domain | When purchasing the domain, immediately set up: A/CNAME records for hosting, SPF/DKIM/DMARC for email authentication. Do both at the same time to avoid a "site works but emails go to spam" situation. |
| Form submission on static site | Building a Next.js API route for form handling, then discovering it does not work after static export | If using static export, form submission options are: (a) email tool's embedded form, (b) third-party form endpoint (Formspree, Getform), (c) client-side fetch to email tool's public API. Plan this before building the form. |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized hero images on mobile | Page load over 3 seconds on 3G/4G. 53% of mobile users abandon at 3+ seconds. Facebook ad click-through wasted. | Use next/image with WebP format and responsive sizing. Compress all images below 200KB. Use lazy loading for below-fold images. If static export, configure a custom image loader. | Immediately -- mobile Facebook traffic is the primary audience |
| Too many third-party scripts (pixel, analytics, chat widgets, fonts) | Render-blocking, CLS (Cumulative Layout Shift), slow TTI (Time to Interactive). Form appears after a jarring layout shift. | Load Meta Pixel and analytics async. Defer non-critical scripts. Use `next/font` for Google Fonts to avoid FOIT/FOUT. Limit to essential scripts: pixel + analytics only for v1. | At 3+ third-party scripts on mobile |
| Client-side form validation only | No feedback until submit. Users fill out form, hit submit, see errors, get frustrated and leave. On mobile, scrolling back up to fix errors is painful. | Inline validation on blur for each field. Show errors immediately next to the field. Auto-focus the first error field. Keep form above the fold on mobile or use a sticky CTA button. | From the first user -- bad validation = immediate bounce |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing email tool API secret key in client-side JavaScript | Attacker can send emails from your account, subscribe/unsubscribe anyone, access contact lists | Never put secret API keys in client-side code. Use embedded forms (which handle auth server-side) or a serverless function (Vercel) for API calls. If static hosting, embedded forms are the only safe option. |
| No rate limiting on form submissions | Bot spam floods your email list with fake contacts, burning through email sending limits and polluting your list | Use email tool's built-in form (has bot protection). If custom form, add honeypot field + reCAPTCHA/hCaptcha. Monitor for sudden spikes in registrations. |
| Collecting personal data without HTTPS | Data transmitted in plaintext, violates UK GDPR requirement for appropriate security measures | Both Vercel and most modern hosting provide HTTPS by default. Verify SSL certificate is active before the form goes live. Never collect data over HTTP. |
| No data retention policy | Accumulating personal data indefinitely violates UK GDPR's storage limitation principle | Define how long you keep registrant data (e.g., 12 months after last interaction). Document this in the privacy policy. Set reminders to purge old data. |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Full website navigation on landing page | User clicks away to "About" or "Home" instead of registering. Navigation reduces conversion by 20-30%. | Remove all navigation from the landing page. One page, one goal: register for the intro talk. Add a minimal footer link to privacy policy only. |
| Generic CTA button text ("Submit", "Send") | No emotional connection. Users hesitate because the action feels bureaucratic. | Use benefit-oriented CTA: "Reserve My Free Spot", "Save My Place", "Get My Zoom Link". First person ("My") increases ownership feeling. |
| Desktop-first design with mobile afterthought | 83% of Facebook ad traffic is mobile. If the form is hard to tap, text is too small, or layout breaks on mobile, the majority of traffic bounces. | Design mobile-first. Test on actual phones. Minimum 48x48px touch targets. Thumb-reachable CTA button. Single-column layout. No horizontal scrolling. |
| No social proof above the fold | Visitors from Facebook ads have zero trust. They see an ad, click, and need immediate reassurance they are in the right place. | Place at least one testimonial or credibility element (e.g., "Practiced by 500M+ people in 180 countries") above the fold, visible without scrolling. |
| Missing urgency/scarcity signals | No reason to register now vs. "maybe later" (which means never). | Show specific date/time of the next session. "Only X spots left" (if applicable). Countdown timer to next session. "Next session: [Date] at [Time]" prominently displayed. |
| Asking for date/time preference in the form | Adds cognitive load. User has to think about their schedule mid-registration flow. | Show the next available session prominently. Let them register for THAT session. If multiple sessions, show 2-3 options as simple clickable cards, not a dropdown. |

## "Looks Done But Isn't" Checklist

- [ ] **Registration form:** Often missing consent checkbox for marketing emails -- verify UK GDPR compliance with unticked opt-in checkbox and privacy policy link
- [ ] **Email confirmation:** Often missing -- verify that registrants receive an immediate confirmation with Zoom link within 60 seconds of registration
- [ ] **Reminder emails:** Often missing the 1-hour-before reminder -- verify both 24-hour and 1-hour reminders are configured and tested with real timestamps
- [ ] **Mobile form:** Often broken on small screens -- verify form renders correctly on iPhone SE (smallest common screen), thumb-reachable submit button, no horizontal overflow
- [ ] **Meta Pixel:** Often installed but conversion event not firing -- verify `fbq('track', 'Lead')` fires on the thank-you page by checking Facebook Events Manager test events
- [ ] **Email deliverability:** Often assumed working -- verify by sending test emails to Gmail, Outlook, and Yahoo accounts and checking they land in Primary inbox, not Spam or Promotions
- [ ] **Unsubscribe link:** Often missing in automated sequences -- verify every email in the sequence has a working unsubscribe link (legally required)
- [ ] **Privacy policy page:** Often planned but never created -- verify a live privacy policy page exists and is linked from the registration form
- [ ] **Thank-you page:** Often shows a generic "success" message -- verify it confirms the specific session date/time, sets expectations for what happens next, and fires conversion tracking
- [ ] **No-show flow:** Often the attended/didn't-attend branch is untested -- verify the conditional logic actually triggers correctly by testing both paths end-to-end
- [ ] **Static export build:** Often works in `next dev` but fails on deploy -- verify by running `next build` locally and serving the `out/` directory with a simple HTTP server before deploying

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Phone field killing conversions | LOW | Remove the field. No data migration needed. Existing registrants unaffected. |
| Emails going to spam | MEDIUM | Add/fix DNS records (SPF, DKIM, DMARC). Wait 24-48 hours for propagation. Re-send confirmation to anyone who registered during the broken period. Domain reputation damage takes weeks to recover. |
| GDPR non-compliance discovered | HIGH | Must retroactively obtain consent or delete data for non-consenting users. Rewrite forms with proper consent mechanism. Create privacy policy. If ICO has been notified, expect investigation overhead. |
| Ad-to-page mismatch causing high bounce | LOW | Update landing page headline and hero image to match ad creative. Can be done in a single deployment. |
| Mailchimp free tier inadequate | MEDIUM | Migrate contacts to Brevo. Rebuild automation flows from scratch in new tool. Contacts can be exported/imported, but automations cannot -- they must be recreated manually. |
| Server features failing on static hosting | HIGH | Either migrate to Vercel (change hosting, update DNS, redeploy) or rewrite server-dependent code to work client-side. The rewrite can be extensive if API routes were used for form handling. |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Phone field conversion kill | Phase 1: Landing Page | Form has max 2-3 fields (name, email, optional phone). A/B test framework in place. |
| Email authentication failure | Phase 2: Email Automation (DNS setup during Phase 1) | Mail-Tester score 9+/10. Test emails land in Primary inbox on Gmail, Outlook, Yahoo. |
| UK GDPR/PECR non-compliance | Phase 1: Landing Page + Phase 2: Email Automation | Consent checkbox present (unticked). Privacy policy page live. Unsubscribe in all emails. Consent records stored. |
| Facebook ad message mismatch | Phase 1: Landing Page (revisit when creating ads) | Landing page headline mirrors ad headline. Same imagery. Bounce rate from Facebook below 60%. |
| Wrong email tool selection | Phase 0: Project Setup (tool selection) | Full automation flow mapped. Tool verified to support all conditional branches on free tier. |
| Static hosting breaks server features | Phase 0: Project Setup (hosting decision) | Hosting platform confirmed. `next build` output tested on target platform. Form submission working on deployed site. |
| No conversion tracking | Phase 1: Landing Page | Meta Pixel installed. Lead event firing on thank-you page. Verified in Facebook Events Manager. |
| Unoptimized images on mobile | Phase 1: Landing Page | Lighthouse mobile score above 90. LCP under 2.5 seconds. All images in WebP under 200KB. |
| Bot spam on registration form | Phase 1: Landing Page | Honeypot field or CAPTCHA in place. OR using email tool's embedded form with built-in bot protection. |
| No data retention policy | Phase 2: Email Automation | Privacy policy specifies retention period. Calendar reminder set to review/purge old data. |

## Sources

- [Lovable - Landing Page Best Practices 2026](https://lovable.dev/guides/landing-page-best-practices-convert) -- conversion statistics
- [Unbounce - Friction: The Mobile Conversion Killer](https://unbounce.com/mobile-optimization/friction-mobile-conversion-killer-checklist/) -- mobile form friction data
- [Genesys Growth - Landing Page Conversion Stats 2026](https://genesysgrowth.com/blog/landing-page-conversion-stats-for-marketing-leaders) -- form length vs conversion data
- [Unspam - 2025 Email Deliverability Report](https://unspam.email/articles/email-deliverability-report/) -- spam placement rates
- [Egen Consulting - Email Deliverability 2026 SPF/DKIM/DMARC](https://www.egenconsulting.com/blog/email-deliverability-2026.html) -- authentication requirements
- [Proofpoint - Google Authentication Enforcement 2025](https://www.proofpoint.com/us/blog/email-and-cloud-threats/clock-ticking-stricter-email-authentication-enforcements-google-start) -- Google enforcement timeline
- [ICO - Marketing and Data Protection in Detail](https://ico.org.uk/for-organisations/advice-for-small-organisations/direct-marketing-and-data-protection/marketing-and-data-protection-in-detail/) -- UK GDPR/PECR marketing requirements
- [ICO - Electronic and Telephone Marketing](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/) -- PECR consent rules
- [Data Protection Network - UK Email Marketing Rules](https://dpnetwork.org.uk/email-marketing-rules/) -- consent vs legitimate interest
- [Alston & Bird - UK Data Use and Access Act 2025](https://www.alston.com/en/insights/publications/2026/01/uk-data-use-and-access-act-2025) -- DUAA penalty changes
- [EmailOctopus - Mailchimp Free Plan Changes](https://emailoctopus.com/blog/mailchimp-update-no-more-automated-email-on-free-plan) -- Mailchimp automation removal
- [EmailToolTester - EmailOctopus Review 2026](https://www.emailtooltester.com/en/reviews/emailoctopus/) -- automation limitations
- [GroupMail - Mailchimp Free Plan Changes 2026](https://blog.groupmail.io/mailchimp-free-plan-changes-2026/) -- free tier reduction timeline
- [Next.js Docs - Static Exports](https://nextjs.org/docs/pages/guides/static-exports) -- static export limitations
- [Sherpa - Self-hosting Next.js at Scale 2025](https://www.sherpa.sh/blog/secrets-of-self-hosting-nextjs-at-scale-in-2025) -- non-Vercel hosting challenges
- [Netlify - How We Run Next.js](https://www.netlify.com/blog/how-we-run-nextjs/) -- platform compatibility issues
- [Landingi - Facebook Landing Page Best Practices](https://landingi.com/landing-page/facebook-examples/) -- ad-to-page alignment
- [Striking Alchemy - Message Match Tips](https://strikingalchemy.com/article/message-match-ad-copy-and-landing-page-tips) -- message match principles

---
*Pitfalls research for: Art of Living Devon/Southwest conversion landing page with email automation*
*Researched: 2026-02-24*
