# Phase 4: Registration Flow & Session Selection - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

After submitting the registration form, the visitor lands on a confirmation page with everything they need to show up: Zoom link, calendar-add buttons, and reassurance that they're registered. On the landing page, a countdown timer shows time until the next session. Before registering, visitors can select from 2-3 upcoming sessions to choose a time that fits their schedule.

</domain>

<decisions>
## Implementation Decisions

### Session picker design
- 2-3 upcoming sessions shown as distinct selectable cards (not radio buttons) — cards are scannable and feel less form-like
- Each card shows: day + date, time (with timezone), and a "spots remaining" or "popular" badge if applicable
- Selected card gets a highlighted border (brand color) and a checkmark
- Session picker appears above the registration form, with a clear visual connection — selecting a session should feel like step 1 of the flow
- On mobile, cards stack vertically; on desktop, they appear in a row

### Confirmation page
- Page is focused and distraction-free — no navigation, no other CTAs
- Top: Large checkmark or success icon + "You're registered!" heading
- Below: Session details (date, time, Zoom link as a prominent button "Join Zoom")
- Below that: Calendar add section with both options side-by-side — "Add to Google Calendar" and "Download .ics" — labeled clearly for both types of users
- Optional: Short "What to expect" section (1-2 sentences) to reduce no-shows
- No upsell or cross-sell on this page — stay focused on getting them to show up

### Countdown timer behavior
- Timer appears in the hero section of the landing page, close to the CTA — creates urgency without being aggressive
- Counts down to the next scheduled intro talk session
- When timer hits zero, it auto-advances to display the next upcoming session countdown (if one exists), or shows "Registration open — join the next session" if no session is imminent
- Single timer — not per session card (per-session timers add visual clutter)
- Format: `2d 14h 32m 08s` — compact, readable, animated seconds only

### Calendar add & Zoom link delivery
- Zoom link is delivered on the confirmation page only (not via email in this phase — email is Phase 9)
- "Join Zoom" is the most prominent element on the confirmation page — large button, not buried in text
- Both Google Calendar and ICS download options shown simultaneously — don't force a choice
- ICS file includes: event title, date/time, Zoom link in the description, and a short description of the intro talk

### Claude's Discretion
- Exact copy on confirmation page (success message, what-to-expect text)
- Animation/transition from form submit to confirmation page
- Timezone detection and display (show local time if detectable)
- Specific color/styling of selected session card state
- Whether to show a "Share" option on confirmation page

</decisions>

<specifics>
## Specific Ideas

- User deferred all decisions to best practices — apply conversion-optimized, mobile-first patterns throughout
- Confirmation page should feel like a "done" moment — calm, clear, zero anxiety about whether they're actually registered
- Session picker should guide rather than overwhelm — 2-3 options max, easy to scan

</specifics>

<deferred>
## Deferred Ideas

- Email confirmation with Zoom link — Phase 9 (Email Automation - Core Sequence)
- Reminder emails before the session — Phase 9
- Waitlist functionality if session is full — not currently scoped

</deferred>

---

*Phase: 04-registration-flow-session-selection*
*Context gathered: 2026-02-25*
