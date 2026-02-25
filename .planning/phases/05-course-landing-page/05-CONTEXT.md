# Phase 5: Course Landing Page - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

A standalone landing page at `/happiness-program` (or `/part-1`) converting warm leads who attended the intro talk into Happiness Program (Art of Living Part 1) course enrollees. Visitors arrive already curious — this page gives them everything to commit: what the course is, the science behind it, what they'll learn, and a clear path to register. The CTA links to the official Art of Living registration page.

</domain>

<decisions>
## Implementation Decisions

### Page structure & section order
Follow the proven structure from the reference pages, adapted for Devon/Southwest:
1. **Hero** — Full-width nature/meditation image, headline ("Breathe Out Stress From Day One" or similar), 1-line description, Register Now CTA
2. **What is the Happiness Program?** — Brief paragraph explanation, secondary CTA button
3. **Research stats block** — Big percentage numbers (37% increased calm, 23% reduced anxiety, 31% reduced insomnia, 60% cortisol reduction, 25% social connection, 34% reduced depression) with up/down arrow icons, citing peer-reviewed studies
4. **Media logos strip** — CNN, Yoga Journal, Harvard Health Publishing, The Washington Post
5. **Course content** — What you'll learn: Sudarshan Kriya, pranayama, yoga, meditation sessions breakdown
6. **Upcoming dates** — Local Devon/Southwest course listings with Register Now buttons linking to official Art of Living registration page
7. **About the founder** — Brief section on Sri Sri Ravi Shankar with photo
8. **Testimonials** — 3 participant quotes with photos, sourced from public Art of Living reviews
9. **Art of Living in numbers** — 44 years, 180 countries, 40,000+ teachers, 800M+ people reached
10. **FAQ** — 4-6 common questions (duration, cost, online vs in-person, age limit, rescheduling)
11. **Footer CTA** — Final Register Now button

### Research credibility section
- Lead with: "Backed by 100+ independent studies in peer-reviewed journals"
- Show 6 stat cards with large percentage numbers and directional arrows (use reference sample 2 layout exactly)
- Stats to use: 37% increased calm (4 weeks), 23% reduced anxiety (4 weeks), 31% reduction in insomnia, 60% reduction in stress hormone cortisol (3 months), 25% increase in social connection (4 weeks), 34% reduced depression (4 weeks)
- Below stats: media logo strip (CNN, Yoga, Harvard Health Publishing, Washington Post) with their actual quotes from the reference

### CTA & enrollment flow
- Multiple CTAs throughout the page (hero, after course content, after testimonials, footer)
- Button label: "Register Now" (consistent with reference pages)
- All CTAs link to official Art of Living registration page (external link, opens in new tab)
- Upcoming dates section shows Devon/Southwest courses from the Art of Living course finder — static list that can be updated, or direct link to filtered results on artoflivng.org
- No urgency countdown on this page (that was intro talk specific) — instead use upcoming dates grid as the natural urgency mechanism

### Testimonials
- 3 testimonials from Part 1 course participants
- Use photos + name + brief credentials/role where available
- Source from public Art of Living reviews (Google, official site testimonials)
- Testimonials should focus on life transformation outcomes (stress relief, sleep, relationships) — different angle from intro talk testimonials which focus on curiosity/discovery
- Section header: "How is Art of Living Changing Lives?"

### Visual design
- Follow Art of Living official aesthetic: white/cream backgrounds, orange accent (#FF6B35 or AoL gold), peaceful nature photography
- Match the Devon intro talk page brand for consistency (same font, same CTA button style)
- Hero should use a full-bleed nature/meditation photo (meadow, sunlight, peaceful setting)

### Claude's Discretion
- Exact FAQ questions and answers
- Specific photo choices from the assets available
- Exact founder bio copy
- Internal section spacing and padding
- Whether to use accordion or static layout for course content sessions

</decisions>

<specifics>
## Specific Ideas

**Reference pages location:** `/Users/mac/Documents/Art of Living Landing Page/Course Landing Page Reference/`
- `www.artofliving.org_de-en_art-of-living-part-1-course.png` — German/English AoL site (3-step flow, research brain graphic, media logos, upcoming dates, founder, testimonials)
- `www.artofliving.org_uk-en_courses_art-of-living-part-one.png` — UK/English AoL site (stat grid, course content, upcoming courses filter, FAQ, numbers section)

- Reference 1 (DE): Use the "3 steps" flow (Clear Stress → Experience Meditation → Connect to Inner Peace) — good for the "How does it work?" section
- Reference 2 (UK): Use the stat grid layout exactly — 6 stats in 2 rows of 3, with percentage, arrow icon, and label
- Reference 2 (UK): The upcoming courses filter (All / Online / In-person, Date, Country) is a good pattern — simplify for Devon context (just list Devon courses)
- Both references use: CNN, Yoga Journal, Harvard Health Publishing, Washington Post logos — use these same media partners
- Quote from Gurudev: "The quality of our lives depends on the quality of our minds." — use this as a featured pullquote between sections

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-course-landing-page*
*Context gathered: 2026-02-25*
