# Art of Living Devon/Southwest

## What This Is

A conversion-focused website for the Art of Living Devon/Southwest community, centered around driving Facebook ad traffic to a free online intro talk for the Art of Living Part 1 (Happiness Program) course. The site serves as an independent local front door — separate from the main London-based Art of Living Foundation — giving the Devon/Southwest team full control over their marketing funnel, landing pages, and email automation while linking to the official foundation for final course registration.

## Core Value

Convert Facebook ad visitors into intro talk attendees, then nurture them toward enrolling in the full Art of Living Part 1 course — without losing anyone along the way.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] High-converting intro talk landing page with registration form (name, email, phone)
- [ ] Part 1 course landing page with detailed course information
- [ ] Homepage for Art of Living Devon/Southwest as a local community hub
- [ ] Registration form that captures name, email, and phone number
- [ ] Date/time selection for upcoming intro talk sessions (placeholder dates for now)
- [ ] Full email automation funnel: confirmation + Zoom link → reminders (1 day + 1 hour before) → no-show re-engagement → post-talk course nudge
- [ ] Conditional email flows based on attendance (attended vs. didn't attend)
- [ ] Public testimonials and social proof from Art of Living sourced from the web
- [ ] Art of Living credibility elements (research, statistics, media mentions)
- [ ] Conversion best practices throughout (urgency, social proof, clear CTAs, minimal friction)
- [ ] Blended branding: Art of Living official look (white, orange, peaceful) with Devon/Southwest local warmth
- [ ] Rotating teacher support — flexible instructor display per session
- [ ] Mobile-responsive design (Facebook ad traffic is heavily mobile)
- [ ] Deep research on Art of Living Part 1 program, intro talk format, UK-specific details

### Out of Scope

- Payment processing — intro talk is free, course registration happens on official Art of Living site
- User accounts / login system — not needed for landing pages
- Blog or content management — static pages are sufficient for v1
- Integration with Art of Living Foundation's internal systems — independent operation
- SMS/WhatsApp automation — email only for v1

## Context

- **Art of Living Foundation** is a global wellness organization founded by Gurudev Sri Sri Ravi Shankar, offering breathing techniques, meditation, and yoga programs
- **Part 1 course** (also known as the Happiness Program) is their flagship offering — the intro talk is the free gateway session that introduces people to the course
- **Devon/Southwest UK** team operates semi-independently from the London foundation due to communication friction — they need their own marketing infrastructure
- **Target audience** is a mix of cold (never heard of Art of Living) and warm (wellness-curious, heard of meditation) audiences reached via Facebook/Meta ads
- **Funnel flow:** Facebook Ad → Intro Talk Landing Page → Register → Email Sequence → Attend Zoom Intro Talk → Course Landing Page → Official Registration Link
- Public testimonials, research data, and credibility elements are available on the Art of Living website and can be leveraged
- Extensive web research needed on the Part 1 program details, intro talk format, benefits, and UK-specific naming/positioning

## Constraints

- **Tech stack**: Next.js (React-based) for the frontend
- **Email automation**: Free tier tool (Mailchimp free, EmailOctopus, Brevo, or similar — to be decided during research)
- **Hosting**: Affordable hosting from Nepal (~£20/year) or potentially Vercel free tier with a subdomain
- **Budget**: Minimal — free tools where possible, low-cost hosting
- **Domain**: To be purchased (Art of Living Devon domain) — or Vercel subdomain as fallback
- **Branding**: Must feel connected to official Art of Living while having local Devon/Southwest identity

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js for frontend | React-based, good for landing pages, supports SSR/SSG, deployable to Vercel or traditional hosting | — Pending |
| Free email automation tool | Budget constraint — need reliable free tier with automation/conditional flows | — Pending |
| Independent site from London foundation | Communication friction makes coordination difficult; local team needs autonomy for marketing | — Pending |
| Full funnel from day one | Don't want to lose leads — capture and nurture from first touch through course enrollment | — Pending |
| Phone number on form | Maximum reach — fallback if email doesn't work, but may increase form friction (research needed) | — Pending |
| Public testimonials from web | No local testimonials yet — leverage Art of Living's existing social proof | — Pending |

---
*Last updated: 2026-02-24 after initialization*
