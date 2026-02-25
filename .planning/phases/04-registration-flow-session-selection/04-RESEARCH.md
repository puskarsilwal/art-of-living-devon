# Phase 4: Registration Flow & Session Selection - Research

**Researched:** 2026-02-25
**Domain:** Next.js App Router form flow, ICS generation, countdown timer, Google Calendar links
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Session picker design**
- 2-3 upcoming sessions shown as distinct selectable cards (not radio buttons) — cards are scannable and feel less form-like
- Each card shows: day + date, time (with timezone), and a "spots remaining" or "popular" badge if applicable
- Selected card gets a highlighted border (brand color) and a checkmark
- Session picker appears above the registration form, with a clear visual connection — selecting a session should feel like step 1 of the flow
- On mobile, cards stack vertically; on desktop, they appear in a row

**Confirmation page**
- Page is focused and distraction-free — no navigation, no other CTAs
- Top: Large checkmark or success icon + "You're registered!" heading
- Below: Session details (date, time, Zoom link as a prominent button "Join Zoom")
- Below that: Calendar add section with both options side-by-side — "Add to Google Calendar" and "Download .ics" — labeled clearly for both types of users
- Optional: Short "What to expect" section (1-2 sentences) to reduce no-shows
- No upsell or cross-sell on this page — stay focused on getting them to show up

**Countdown timer behavior**
- Timer appears in the hero section of the landing page, close to the CTA — creates urgency without being aggressive
- Counts down to the next scheduled intro talk session
- When timer hits zero, it auto-advances to display the next upcoming session countdown (if one exists), or shows "Registration open — join the next session" if no session is imminent
- Single timer — not per session card (per-session timers add visual clutter)
- Format: `2d 14h 32m 08s` — compact, readable, animated seconds only

**Calendar add & Zoom link delivery**
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

### Deferred Ideas (OUT OF SCOPE)
- Email confirmation with Zoom link — Phase 9 (Email Automation - Core Sequence)
- Reminder emails before the session — Phase 9
- Waitlist functionality if session is full — not currently scoped
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INTRO-10 | After registration, visitor sees confirmation page with Zoom link and calendar add button (ICS/Google) | Server action `redirect()` to `/intro/confirmation?session=ID`, Route Handler at `/api/calendar/[sessionId]/route.ts` serves ICS download, Google Calendar link built as URL string |
| INTRO-11 | Countdown timer shows real time remaining until next scheduled intro talk session | Client component with `useEffect` + `setInterval`, initialized null to avoid SSR hydration mismatch, reads from extended `introTalkSessions` data array |
| INTRO-12 | Visitor can select from 2-3 upcoming intro talk sessions with date/time | Client component `SessionPicker` manages selected session state, passes selection as hidden input to registration form, session data lives in `src/lib/data/intro-talks.ts` |
</phase_requirements>

---

## Summary

Phase 4 adds three interconnected features to the existing landing page: a session selection picker before the form, a countdown timer in the hero, and a confirmation page with Zoom link + calendar add. All work runs within the existing Next.js 16 / React 19 / Tailwind CSS 4 / shadcn/ui stack — no new UI libraries are needed.

The key architectural insight is how session selection state flows through the system. The session picker is a client component that captures which session the user chose. That selection passes as a hidden form field to the existing server action, which then redirects to a confirmation page with the session ID in the query string. The confirmation page reads the session ID from `searchParams` and renders the appropriate Zoom link, Google Calendar URL, and a link to the ICS download Route Handler.

The countdown timer is a pure client component using `useEffect` + `setInterval`. It must initialize with `null` state (not a time string) to prevent SSR/client hydration mismatch — the server cannot know the exact remaining seconds at render time. The `ics` npm package (or a hand-crafted ICS string — see Don't Hand-Roll section) handles the ICS file, served via a Next.js Route Handler that sets `Content-Type: text/calendar` and `Content-Disposition: attachment`.

**Primary recommendation:** Extend `src/lib/data/intro-talks.ts` to export an array of 2-3 sessions with a Zoom URL per session. Build SessionPicker as a client component using existing shadcn/ui Card + Checkbox. Redirect after registration to `/intro/confirmation` with `?session=<id>` query param. Serve ICS from `/api/calendar/[sessionId]/route.ts`.

---

## Standard Stack

### Core (already installed — no new deps required for most features)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Route Handlers, Server Actions, redirect() | Already in project |
| react | 19.2.3 | useEffect, useState for countdown + session picker | Already in project |
| tailwindcss | 4.x | Styling session cards, confirmation page | Already in project |
| shadcn/ui (radix-ui) | 1.4.3 | Card, Button, Badge, Checkbox for session picker | Already in project |
| lucide-react | 0.575.0 | CheckCircle, Calendar, Video icons | Already in project |

### New Dependency: ICS Generation

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| ics | ^3.8.1 | Generate RFC-5545 compliant ICS calendar files | Most downloaded iCal generator for Node.js; handles edge cases in date formatting that hand-rolled strings get wrong |

**Installation:**
```bash
npm install ics
```

> Note: The ICS string is simple enough for this use case that a hand-rolled approach is viable (see Don't Hand-Roll section). The `ics` package is preferred because it handles timezone offsets, line folding (75-char limit per RFC 5545), and UID generation correctly.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| ics npm package | Hand-rolled ICS string template | Hand-rolled works for a single timezone, fixed event. Fine if the team wants zero new deps. Acceptable tradeoff here given the simplicity. |
| Route Handler for ICS download | Client-side Blob + anchor click | Client-side approach works but requires JS; Route Handler is server-rendered, accessible, and simpler |
| redirect() with query param | Cookie-based session state | Query param is simpler, stateless, shareable. No cookie needed because data isn't sensitive. |

---

## Architecture Patterns

### Recommended Project Structure Changes

```
src/
├── actions/
│   └── register.ts              # MODIFY: add redirect() after success, pass sessionId
├── app/
│   ├── (landing)/
│   │   └── intro/
│   │       ├── page.tsx         # MODIFY: add SessionPicker above RegistrationForm
│   │       └── confirmation/
│   │           └── page.tsx     # NEW: confirmation page (Server Component, reads searchParams)
│   └── api/
│       └── calendar/
│           └── [sessionId]/
│               └── route.ts     # NEW: Route Handler serving ICS download
├── components/
│   └── intro/
│       ├── registration-form.tsx  # MODIFY: accept selectedSessionId prop or read hidden field
│       ├── session-picker.tsx     # NEW: client component, card selection UI
│       └── countdown-timer.tsx   # NEW: client component, useEffect countdown
└── lib/
    └── data/
        └── intro-talks.ts       # MODIFY: export sessions array with Zoom links + IDs
```

### Pattern 1: Session Data Model Extension

**What:** Extend the existing `IntroTalkSession` type to include an `id`, `zoomUrl`, and make it work as an array of 2-3 sessions.
**When to use:** Before implementing any other feature — everything downstream depends on this data.

```typescript
// src/lib/data/intro-talks.ts
// Source: Existing project pattern + extension

export type IntroTalkSession = {
  id: string           // e.g. "2026-03-08-1000"
  title: string
  date: string         // "Saturday 8 March 2026"
  time: string         // "10:00 AM"
  timezone: string     // "GMT" or "BST"
  location: string     // "Online via Zoom"
  duration: string     // "60 minutes"
  zoomUrl: string      // "https://zoom.us/j/..."
  dateISO: string      // ISO 8601 for countdown + ICS: "2026-03-08T10:00:00Z"
  badge?: string       // Optional: "Popular" | "Limited Spots" | undefined
}

export const introTalkSessions: IntroTalkSession[] = [
  {
    id: "2026-03-08-1000",
    title: "Free Intro to the Art of Living",
    date: "Saturday 8 March 2026",
    time: "10:00 AM",
    timezone: "GMT",
    location: "Online via Zoom",
    duration: "60 minutes",
    zoomUrl: "https://zoom.us/j/PLACEHOLDER",
    dateISO: "2026-03-08T10:00:00Z",
    badge: "Popular",
  },
  // ... 1-2 more sessions
]

// Convenience: next upcoming session (for countdown timer + hero display)
export const nextIntroTalk = introTalkSessions[0]
```

### Pattern 2: Server Action Redirect with Session ID

**What:** After successful registration, call `redirect()` from `next/navigation` with the selected session ID in the query string.
**When to use:** This is the handoff from form submission to confirmation page.

```typescript
// src/actions/register.ts
// Source: https://nextjs.org/docs/app/getting-started/updating-data#redirecting

"use server"

import { redirect } from "next/navigation"
import { registrationSchema } from "@/lib/schemas/registration"

export async function registerForIntroTalk(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    consent: formData.get("consent") === "on",
    sessionId: formData.get("sessionId") as string,  // NEW: from hidden input
  }

  const result = registrationSchema.safeParse(raw)
  if (!result.success) {
    return { success: false, message: "...", errors: ... }
  }

  // TODO: Brevo integration in Phase 9

  // redirect() throws a control-flow exception — must be OUTSIDE try/catch
  redirect(`/intro/confirmation?session=${encodeURIComponent(result.data.sessionId)}`)
}
```

**CRITICAL:** `redirect()` must NOT be called inside a `try/catch` block — it works by throwing a special exception that Next.js catches. Wrapping it in try/catch swallows it silently.

### Pattern 3: Confirmation Page as Server Component

**What:** The confirmation page reads `searchParams` (server component) to get the session ID, finds the matching session in the data array, and renders Zoom link + calendar buttons.
**When to use:** Default pattern for App Router pages that need URL data.

```typescript
// src/app/(landing)/intro/confirmation/page.tsx
// Source: Next.js App Router searchParams pattern

import { introTalkSessions } from "@/lib/data/intro-talks"
import { notFound } from "next/navigation"

interface Props {
  searchParams: Promise<{ session?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { session } = await searchParams
  const selectedSession = introTalkSessions.find(s => s.id === session)

  if (!selectedSession) notFound()

  const googleCalendarUrl = buildGoogleCalendarUrl(selectedSession)
  const icsDownloadUrl = `/api/calendar/${selectedSession.id}`

  return (
    // ... confirmation UI
  )
}
```

**Note:** In Next.js 15+, `searchParams` is a Promise — must be awaited. This is a breaking change from Next.js 14.

### Pattern 4: Google Calendar URL (No Library Needed)

**What:** Build the Google Calendar "add event" URL as a plain string. No library required.
**When to use:** Always — the format is stable and trivial to build.

```typescript
// Source: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md

function buildGoogleCalendarUrl(session: IntroTalkSession): string {
  const startDate = new Date(session.dateISO)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // +60 min

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  // e.g. "20260308T100000Z"

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: session.title,
    dates: `${fmt(startDate)}/${fmt(endDate)}`,
    details: `Join via Zoom: ${session.zoomUrl}\n\nA free 60-minute introduction to the Art of Living and SKY Breath Meditation.`,
    location: session.zoomUrl,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
```

### Pattern 5: ICS Route Handler

**What:** A Next.js Route Handler that generates and serves an ICS file for download.
**When to use:** Serves the "Download .ics" button click.

```typescript
// src/app/api/calendar/[sessionId]/route.ts
// Source: Next.js Route Handler docs + ics package pattern

import { NextResponse } from "next/server"
import { createEvent } from "ics"
import { introTalkSessions } from "@/lib/data/intro-talks"

export async function GET(
  _request: Request,
  { params }: { params: { sessionId: string } }
) {
  const session = introTalkSessions.find(s => s.id === params.sessionId)
  if (!session) return new Response("Not found", { status: 404 })

  const start = new Date(session.dateISO)
  const { error, value } = createEvent({
    title: session.title,
    start: [
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      start.getUTCDate(),
      start.getUTCHours(),
      start.getUTCMinutes(),
    ],
    startInputType: "utc",
    duration: { hours: 1 },
    description: `Join via Zoom: ${session.zoomUrl}\n\nA free 60-minute introduction to SKY Breath Meditation and the Art of Living.`,
    location: session.zoomUrl,
    url: session.zoomUrl,
    status: "CONFIRMED",
    busyStatus: "BUSY",
  })

  if (error || !value) {
    return new Response("Calendar generation failed", { status: 500 })
  }

  return new Response(value, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="art-of-living-intro-${session.id}.ics"`,
    },
  })
}
```

### Pattern 6: Countdown Timer (Client Component)

**What:** A `"use client"` component using `useEffect` + `setInterval`. Initialized with `null` to prevent SSR hydration mismatch.
**When to use:** Any real-time countdown in Next.js App Router.

```typescript
// src/components/intro/countdown-timer.tsx
"use client"

import { useState, useEffect } from "react"
import { introTalkSessions } from "@/lib/data/intro-talks"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
} | null

function getNextSession() {
  const now = new Date()
  return introTalkSessions.find(s => new Date(s.dateISO) > now) ?? null
}

function calcTimeLeft(targetISO: string): TimeLeft {
  const diff = new Date(targetISO).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export function CountdownTimer() {
  // null initial state = no SSR mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null)
  const [targetSession, setTargetSession] = useState<typeof introTalkSessions[0] | null>(null)

  useEffect(() => {
    const session = getNextSession()
    setTargetSession(session)
    if (!session) return

    const tick = () => {
      const tl = calcTimeLeft(session.dateISO)
      if (!tl) {
        // Timer hit zero — try next session
        const next = getNextSession()
        setTargetSession(next)
      } else {
        setTimeLeft(tl)
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!targetSession) {
    return (
      <p className="text-sm text-white/80">
        Registration open — join the next session
      </p>
    )
  }

  // Render null (or skeleton) until useEffect fires — avoids hydration mismatch
  if (!timeLeft) return null

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex items-center gap-1.5 text-white/90 text-sm font-mono">
      <span>{timeLeft.days}d</span>
      <span>{pad(timeLeft.hours)}h</span>
      <span>{pad(timeLeft.minutes)}m</span>
      <span className="tabular-nums">{pad(timeLeft.seconds)}s</span>
    </div>
  )
}
```

### Pattern 7: Session Picker (Client Component)

**What:** Card-based session selector that manages local state and syncs chosen session into the registration form as a hidden input.
**When to use:** Placed above the RegistrationForm in the page; passes selectedSessionId down.

```typescript
// src/components/intro/session-picker.tsx
"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { introTalkSessions, type IntroTalkSession } from "@/lib/data/intro-talks"

interface Props {
  onSelect: (sessionId: string) => void
  selectedId: string | null
}

export function SessionPicker({ onSelect, selectedId }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {introTalkSessions.map((session) => {
        const isSelected = session.id === selectedId
        return (
          <button
            key={session.id}
            type="button"
            onClick={() => onSelect(session.id)}
            className={`
              relative text-left p-4 rounded-xl border-2 transition-all
              ${isSelected
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/40"
              }
            `}
            aria-pressed={isSelected}
          >
            {isSelected && (
              <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
            )}
            {session.badge && (
              <Badge variant="secondary" className="mb-2 text-xs">
                {session.badge}
              </Badge>
            )}
            <p className="font-semibold text-sm">{session.date}</p>
            <p className="text-muted-foreground text-sm">
              {session.time} {session.timezone}
            </p>
          </button>
        )
      })}
    </div>
  )
}
```

**Integration:** The parent component (or a wrapper around RegistrationForm) holds `selectedSessionId` state and passes it as a hidden `<input name="sessionId">` inside the form.

### Pattern 8: Confirmation Page Layout (No Navigation)

**What:** The confirmation page lives in the `(landing)` route group, which already has no header/footer (per Phase 2 decision). No additional layout changes needed.

```
GET /intro/confirmation?session=2026-03-08-1000
→ renders in (landing) layout (no nav, no footer) ✓
```

The landing layout is already distraction-free — the confirmation page gets this for free by living in `(landing)/intro/confirmation/`.

### Anti-Patterns to Avoid

- **Calling `redirect()` inside try/catch:** Next.js `redirect()` works by throwing a special error. Wrapping it in try/catch swallows it silently and the redirect never happens. Place `redirect()` after any try/catch block.
- **Rendering countdown timer with real time on the server:** Server renders at build/request time; client renders at current time. These differ by seconds/minutes, causing hydration errors. Always initialize timer state as `null` and populate in `useEffect`.
- **Using `router.push()` from a server action via useRouter:** Server actions cannot access client hooks. Use `redirect()` from `next/navigation` (server-side) instead.
- **Storing session selection in server-side cookies just to pass it to the confirmation page:** Query params are sufficient — the data (session ID) is not sensitive and doesn't need to be hidden.
- **Building the ICS manually as a template literal without line-length handling:** RFC 5545 requires lines to be folded at 75 characters. Hand-rolled strings that include long Zoom URLs will produce invalid ICS files that some calendar apps reject.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| ICS file generation | Template literal string | `ics` npm package | RFC 5545 requires 75-char line folding; correct DTSTART/DTEND UTC formatting; UID generation. Hand-rolled gets rejected by Outlook and some Apple Calendar versions. |
| Google Calendar URL | Custom URL builder utility | Inline `URLSearchParams` construction | The URL format has only 4 parameters and won't change. A utility function of 5 lines is the right scope — no library needed. |
| Countdown calculation | External countdown library | `useEffect` + `setInterval` + date arithmetic | The math is 10 lines. Any countdown library adds bundle weight for zero benefit here. |
| Session card UI | Custom card/radio system | shadcn/ui `Card` + Tailwind state classes | Existing design system handles accessibility (aria-pressed), focus rings, and responsive layout. |

**Key insight:** The ICS format has enough edge cases (line folding, timezone encoding, UID uniqueness, DTSTAMP requirements) that hand-rolled strings silently fail for some calendar clients. Use the `ics` package for correctness, even though the output looks simple.

---

## Common Pitfalls

### Pitfall 1: `redirect()` Swallowed by try/catch

**What goes wrong:** The registration server action wraps its body in try/catch for error handling. Calling `redirect()` inside the try block silently swallows the redirect — the user stays on the form page with no feedback.
**Why it happens:** `redirect()` throws a `NEXT_REDIRECT` error internally. try/catch catches it before Next.js can handle it.
**How to avoid:** Validate and handle errors inside try/catch. Call `redirect()` after the try/catch block exits cleanly. The existing `registerForIntroTalk` action uses early returns (not try/catch), so this is less risky here — but must be kept that way.
**Warning signs:** Form submits, pending state clears, but page doesn't navigate.

### Pitfall 2: Hydration Mismatch in Countdown Timer

**What goes wrong:** Timer renders different content on server (static time or empty) vs. client (live countdown), causing React hydration warning or error.
**Why it happens:** Server renders at request time; client renders at page load time. Any time-based state will differ.
**How to avoid:** Initialize timer state as `null`. Render nothing (or a placeholder skeleton) until `useEffect` fires and sets the real value. The timer only "appears" after hydration completes.
**Warning signs:** Console warning "Text content does not match server-rendered HTML."

### Pitfall 3: `searchParams` Must Be Awaited in Next.js 15+

**What goes wrong:** Confirmation page tries to access `searchParams.session` directly (like Next.js 14), but in Next.js 15/16 `searchParams` is a Promise.
**Why it happens:** Breaking change in Next.js 15 — `searchParams` and `params` are now async.
**How to avoid:** `const { session } = await searchParams` in the async page component.
**Warning signs:** TypeScript error on `searchParams.session`; runtime error "Cannot read property of undefined."

### Pitfall 4: Session Not Found on Confirmation Page

**What goes wrong:** User bookmarks the confirmation page URL, or visits it with an invalid/expired session ID. The page crashes or shows a broken state.
**Why it happens:** No guard against missing session data.
**How to avoid:** After `introTalkSessions.find(...)`, immediately call `notFound()` if the result is undefined. Next.js renders the 404 page cleanly.

### Pitfall 5: ICS Download Blocked by CORS/Content-Type

**What goes wrong:** Browser opens the ICS content inline as text instead of triggering a download.
**Why it happens:** Missing or incorrect `Content-Disposition: attachment` header.
**How to avoid:** Route Handler must set both headers: `Content-Type: text/calendar; charset=utf-8` AND `Content-Disposition: attachment; filename="event.ics"`. Both are required for reliable cross-browser download behavior.

### Pitfall 6: Session Picker State Lost on Form Re-render

**What goes wrong:** User selects a session, gets a validation error, form re-renders, and the selected session resets to null.
**Why it happens:** Session picker state lives in a client component. If the parent re-renders and recreates the picker, state is lost.
**How to avoid:** Lift selectedSessionId state up to the parent wrapper component (or the registration form component itself), not inside SessionPicker. Pass it as a controlled prop.

---

## Code Examples

### ICS createEvent Call (verified pattern)

```typescript
// Source: github.com/adamgibbons/ics (official README)
import { createEvent } from "ics"

const { error, value } = createEvent({
  title: "Free Intro to the Art of Living",
  start: [2026, 3, 8, 10, 0],      // [year, month (1-12), day, hour, minute]
  startInputType: "utc",
  duration: { hours: 1 },
  description: "Join via Zoom: https://zoom.us/j/...",
  location: "https://zoom.us/j/...",
  url: "https://zoom.us/j/...",
  status: "CONFIRMED",
})
// value is the full ICS string ready to serve
```

### Google Calendar URL (verified format)

```typescript
// Source: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md
// Format: YYYYMMDDTHHMMSSZ
const start = "20260308T100000Z"
const end   = "20260308T110000Z"
const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Free Intro to the Art of Living")}&dates=${start}/${end}&details=${encodeURIComponent("Zoom: https://zoom.us/j/...")}&location=${encodeURIComponent("https://zoom.us/j/...")}`
```

### Server Action Redirect (verified pattern)

```typescript
// Source: https://nextjs.org/docs/app/getting-started/updating-data#redirecting
"use server"
import { redirect } from "next/navigation"

export async function registerForIntroTalk(prevState, formData) {
  // ... validation ...
  if (!result.success) return { success: false, ... }

  // redirect() must be OUTSIDE any try/catch
  redirect(`/intro/confirmation?session=${encodeURIComponent(sessionId)}`)
}
```

### Confirmation Page searchParams (Next.js 15/16 pattern)

```typescript
// Source: Next.js 16.1.6 App Router — searchParams is async
export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>
}) {
  const { session } = await searchParams
  // ...
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `searchParams` as sync object in page props | `searchParams` as `Promise<{...}>` requiring `await` | Next.js 15 | Must await searchParams or TypeScript errors/runtime crash |
| `res.setHeader()` in Pages Router API routes | `new Response(body, { headers })` in App Router Route Handlers | Next.js 13 | Route Handler pattern is what this project uses |
| Custom radio-button session selection | Card-based click targets with `aria-pressed` | UX best practice | Better mobile tap targets, more visual, accessible |

**Deprecated/outdated:**
- `useRouter().push()` from server actions: Not possible. Use `redirect()` from `next/navigation` in server code.
- Pages Router `getServerSideProps` for passing URL params to pages: App Router uses `searchParams` prop directly.

---

## Open Questions

1. **Zoom URL for each session**
   - What we know: The confirmation page must show a real Zoom link
   - What's unclear: We have placeholder data (`https://zoom.us/j/PLACEHOLDER`). The planner should note tasks include setting real Zoom URLs once known.
   - Recommendation: Use placeholder URLs in data file with a clear TODO comment. The architecture works identically with real URLs.

2. **Timezone display: GMT vs BST**
   - What we know: The CONTEXT.md mentions timezone detection as Claude's discretion. UK switches from GMT to BST in late March 2026.
   - What's unclear: Sessions in March/April will straddle the timezone change.
   - Recommendation: Store `timezone` string explicitly per session (e.g., "GMT" for March sessions, "BST" for April+). The data model already supports this. Optionally, detect user's local timezone in the countdown timer using `Intl.DateTimeFormat().resolvedOptions().timeZone` and show a "(your time)" annotation.

3. **Registration form: how does sessionId reach the server action?**
   - What we know: The form uses `useActionState` and submits via FormData. Server actions receive FormData.
   - What's unclear: Best way to pass sessionId — hidden input or wrapper state.
   - Recommendation: Add a hidden `<input type="hidden" name="sessionId" value={selectedSessionId ?? ""} />` inside the existing form. This is the simplest approach that works with the existing `useActionState` + FormData pattern. Validate sessionId in the server action using `z.string().min(1)`.

---

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 official docs (fetched): Server Actions redirect pattern, searchParams Promise, Route Handler file download
- github.com/adamgibbons/ics (fetched): createEvent API, start array format, `{ error, value }` return
- Next.js official docs URL: https://nextjs.org/docs/app/getting-started/updating-data

### Secondary (MEDIUM confidence)
- https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md — Google Calendar URL format (`action=TEMPLATE`, `dates`, `text`, `details`, `location` params). Verified against multiple sources.
- https://nextjs.org/docs/messages/react-hydration-error — Hydration mismatch documentation confirming null-init pattern for time-based state

### Tertiary (LOW confidence)
- WebSearch results on ICS Route Handler pattern — corroborated by official Route Handler docs but specific ICS Content-Type header combination not from primary source
- Community pattern for `useActionState` + hidden input for session ID — standard FormData pattern, low risk

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries already in project except `ics`; `ics` is the most downloaded iCal package on npm with official GitHub docs
- Architecture: HIGH — Server Action redirect, searchParams page, Route Handler patterns all verified against Next.js 16.1.6 official docs
- Pitfalls: HIGH — redirect()/try-catch and hydration mismatch are documented Next.js issues with official sources; searchParams async change is a confirmed Next.js 15 breaking change

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (stable domain; Next.js minor releases unlikely to affect these patterns)
