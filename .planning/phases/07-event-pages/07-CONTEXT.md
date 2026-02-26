# Phase 7: Event Pages - Context

**Gathered:** 2026-02-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a reusable event page template for Satsang, Kirtan, and other Devon/Southwest community events. Each page is a focused marketing funnel — no site navigation — designed to convert ad/email traffic into registrations. Template is driven by per-event config files so new events can be launched by updating a data file. Registration handling (Brevo API) is wired in Phase 9; this phase builds the UI.

</domain>

<decisions>
## Implementation Decisions

### Registration mechanism
- Primary CTA: external link to Art of Living portal or ticketing system (Eventbrite etc.)
- "Register Now" button links to a configurable external URL per event
- On-page email opt-in form also present on each event page
- Email form UI built in Phase 7; Brevo API connection wired in Phase 9
- Per-event Brevo lists (architecture decided here, implementation in Phase 9)

### Template reuse
- One config/data file per event drives the entire page (title, date, time, location, price, description, registration URL, image, etc.)
- Dynamic Next.js route: `/events/[slug]` (e.g. `/events/satsang-2026-march`)
- New event = create a new config file and deploy. No template code to touch.
- Events index page (/events): Claude's discretion

### Event content & display
- All section decisions at Claude's discretion, optimised for maximum conversion
- Reference: London Satsang page (events.artofliving.eu) as structural inspiration
- Required sections: hero with event name/date/CTA, event details bar (where/when/duration/price), experiential overview, explainer section, social proof
- Videos included — Claude decides format and placement (YouTube embed or section)
- Social proof: both credibility logos (CNN, Vogue, Harvard Health, Yale, etc.) AND local Devon/Southwest attendee testimonials
- Pricing display: Claude's discretion

### Visual design & branding
- No navigation header — standalone focused landing page (same as intro talk page)
- Visually elevated — dramatically better than current state; rich, immersive design
- Uses stock photography as placeholder; template designed to shine with real event photography
- Color/mood: Claude's discretion — event pages can have their own atmospheric feel while staying on-brand

### Claude's Discretion
- Events index page (/events) — whether to include and what it shows
- Video placement and format (autoplay hero, mid-page section, testimonial clips)
- Price display treatment (transparency vs. mystery, framing copy)
- Section ordering and naming
- Image overlay/treatment styles
- Whether to give different event types (Satsang vs. Kirtan) distinct color accents

</decisions>

<specifics>
## Specific Ideas

- London Satsang reference page (events.artofliving.eu) was reviewed as primary structural inspiration — dark rich hero, details bar, icon grid, content cards, explainer section, multiple Register Now CTAs
- User wants the design to be dramatically more visually elevated than current pages
- Stock photos (e.g. Unsplash) used as placeholder until real Devon event photography is available
- Videos from past events may be available to embed — Claude decides best use

</specifics>

<deferred>
## Deferred Ideas

- Brevo API wiring for email opt-in — scoped to Phase 9
- Per-event Brevo list creation and mapping — scoped to Phase 9

</deferred>

---

*Phase: 07-event-pages*
*Context gathered: 2026-02-26*
