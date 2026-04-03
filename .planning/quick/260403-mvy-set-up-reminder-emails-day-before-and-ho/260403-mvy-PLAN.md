---
quick: 260403-mvy
type: execute
autonomous: true
files_modified:
  - vercel.json
  - src/app/api/cron/remind-day-before/route.ts
  - src/app/api/cron/remind-hour-before/route.ts

must_haves:
  truths:
    - "Registrants with a session tomorrow receive a day-before reminder email by 9am UTC"
    - "Registrants with a session today starting at 7pm BST (6pm UTC) receive an hour-before email at 5pm UTC"
    - "Cron routes are secured — only Vercel can invoke them"
    - "Both cron jobs fire automatically on Vercel with no manual intervention"
  artifacts:
    - path: "vercel.json"
      provides: "Cron schedule definitions for both reminder jobs"
    - path: "src/app/api/cron/remind-day-before/route.ts"
      provides: "Queries Brevo for contacts with tomorrow's session, sends reminder email"
    - path: "src/app/api/cron/remind-hour-before/route.ts"
      provides: "Queries Brevo for contacts with today's session in 1 hour, sends reminder email"
  key_links:
    - from: "vercel.json cron schedule"
      to: "src/app/api/cron/remind-day-before/route.ts"
      via: "Vercel invokes GET /api/cron/remind-day-before with Authorization header"
    - from: "src/app/api/cron/remind-day-before/route.ts"
      to: "Brevo GET /v3/contacts"
      via: "fetch with SESSION_ID filter matching tomorrow's session id"
    - from: "src/app/api/cron/remind-hour-before/route.ts"
      to: "Brevo GET /v3/contacts"
      via: "fetch with SESSION_ID filter matching today's session id"
---

<objective>
Add automated reminder emails — day-before and hour-before — for intro talk registrants.

Purpose: Reduce no-shows by ensuring registrants have timely reminders with the Google Meet link. The day-before email arrives morning of the day prior; the hour-before email arrives 1 hour before the 7pm BST session start.

Output: Two Vercel cron routes + vercel.json cron config. No database required — registrations already stored in Brevo contacts with SESSION_ID attribute.
</objective>

<context>
@.planning/STATE.md
@src/lib/data/intro-talks.ts
@src/actions/register.ts

Architecture notes:
- Registrations are stored in Brevo contacts via upsert. Each contact has SESSION_ID and SESSION_DATE attributes set on registration.
- Sessions are fixed: "2026-04-12-1900" (7pm BST = 6pm UTC, April 12) and "2026-04-19-1900" (7pm BST = 6pm UTC, April 19)
- Day-before cron: fires at 09:00 UTC daily. Checks introTalkSessions for any session whose dateISO falls tomorrow. If found, queries Brevo contacts filtered by SESSION_ID, sends reminder emails.
- Hour-before cron: fires at 17:00 UTC daily (= 6pm BST = 1 hour before 7pm BST sessions). Checks for session today. If found, queries Brevo and sends.
- Both sessions start at the same time (7pm BST), so a single daily cron at 17:00 UTC covers both.
- Vercel Hobby supports multiple cron jobs with daily granularity minimum (specific hour:minute is fine, just not sub-hourly on free tier).
- Cron route security: check Authorization header equals "Bearer {CRON_SECRET}" — Vercel sets this automatically from env var CRON_SECRET.

Key Brevo API for querying contacts by attribute:
  GET https://api.brevo.com/v3/contacts?filters={"SESSION_ID":"2026-04-12-1900"}
  This returns all contacts whose SESSION_ID matches. Use listId filter if needed for performance.
  Alternatively: GET /v3/contacts?attributes.SESSION_ID={id} — check Brevo docs; the contacts list API supports filtering by list, not by attribute directly.

IMPORTANT — Brevo contacts attribute filter limitation:
  Brevo's REST contacts endpoint does NOT support filtering by custom attribute in a simple GET. The workaround is to add each registrant to a Brevo list corresponding to their session (e.g. list 4 = April 12, list 5 = April 19) at registration time, then the cron fetches all contacts from that list.
  
  Preferred approach: On registration (in register.ts), add contact to a session-specific Brevo list (listIds array). Then cron routes fetch contacts from that list ID.
  
  Session-to-list mapping (create these lists in Brevo dashboard or via API first time):
    "2026-04-12-1900" -> BREVO_LIST_APRIL12 (env var, e.g. list ID 4)
    "2026-04-19-1900" -> BREVO_LIST_APRIL19 (env var, e.g. list ID 5)

  The executor MUST update register.ts to include listIds: [sessionListId] in the Brevo contact upsert call.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update register.ts to assign registrants to session-specific Brevo lists</name>
  <files>src/actions/register.ts, src/lib/data/intro-talks.ts</files>
  <action>
    The Brevo contacts API does not support filtering by custom attributes. To allow crons to fetch session registrants, each registrant must be added to a Brevo list specific to their session at registration time.

    1. Add an optional `brevoListId` field to the `IntroTalkSession` type in `src/lib/data/intro-talks.ts`. Type: `number | undefined`.

    2. Set brevoListId on each session using env vars:
       - session "2026-04-12-1900": `brevoListId: process.env.BREVO_LIST_APRIL12 ? Number(process.env.BREVO_LIST_APRIL12) : undefined`
       - session "2026-04-19-1900": `brevoListId: process.env.BREVO_LIST_APRIL19 ? Number(process.env.BREVO_LIST_APRIL19) : undefined`

    3. In `register.ts`, inside `sendBrevoConfirmation`, update the Brevo contact upsert body to include `listIds` when the session has a brevoListId:
       ```
       ...(session.brevoListId ? { listIds: [session.brevoListId] } : {})
       ```
       Add this to the existing upsert payload alongside `email`, `updateEnabled`, `attributes`.

    NOTE: The Brevo lists with these IDs must exist in the Brevo account. The executor should add a TODO comment: "// TODO: Create Brevo lists for each session in Brevo dashboard and set BREVO_LIST_APRIL12 / BREVO_LIST_APRIL19 env vars in Vercel before deployment"

    Do NOT change anything else in register.ts — confirmation email, organiser notification, and ICS logic remain intact.
  </action>
  <verify>
    Grep for `listIds` in register.ts and `brevoListId` in intro-talks.ts — both should be present. TypeScript should compile: `npx tsc --noEmit`
  </verify>
  <done>
    register.ts upserts registrants into a session-specific Brevo list (when env var is set). intro-talks.ts IntroTalkSession type includes brevoListId field.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create reminder cron API routes + vercel.json cron config</name>
  <files>
    src/app/api/cron/remind-day-before/route.ts,
    src/app/api/cron/remind-hour-before/route.ts,
    vercel.json
  </files>
  <action>
    Create two Next.js API route handlers (GET) for reminder cron jobs.

    **Security pattern (both routes):**
    ```typescript
    import { NextResponse } from "next/server"
    
    const CRON_SECRET = process.env.CRON_SECRET
    
    export async function GET(request: Request) {
      const auth = request.headers.get("authorization")
      if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      // ... logic
    }
    ```

    **Shared helper (inline in both files — no separate module needed):**
    ```typescript
    async function fetchBrevoListContacts(listId: number): Promise<Array<{ email: string; attributes: Record<string, string> }>> {
      const res = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=500`, {
        headers: { "api-key": process.env.BREVO_API_KEY!, "Content-Type": "application/json" },
      })
      if (!res.ok) return []
      const data = await res.json()
      return data.contacts ?? []
    }
    
    async function sendReminderEmail(contact: { email: string; attributes: Record<string, string> }, session: IntroTalkSession, type: "day-before" | "hour-before") {
      const firstName = contact.attributes.FIRSTNAME || contact.email.split("@")[0]
      const subject = type === "day-before"
        ? `Reminder — Your Art of Living intro talk is tomorrow (${session.date})`
        : `Starting in 1 hour — Your Art of Living intro talk today at ${session.time} ${session.timezone}`
      const htmlContent = type === "day-before"
        ? `<p>Hi ${firstName},</p><p>Just a reminder that your free Art of Living intro talk is <strong>tomorrow, ${session.date} at ${session.time} ${session.timezone}</strong>.</p><p>Join via Google Meet: <a href="${session.meetUrl}">${session.meetUrl}</a></p><p>See you tomorrow,<br>The Art of Living Devon Team</p>`
        : `<p>Hi ${firstName},</p><p>Your free Art of Living intro talk starts in <strong>1 hour</strong> — today at ${session.time} ${session.timezone}.</p><p>Join now via Google Meet: <a href="${session.meetUrl}">${session.meetUrl}</a></p><p>See you soon,<br>The Art of Living Devon Team</p>`
      
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": process.env.BREVO_API_KEY!, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "Art of Living Devon", email: "puskarsilwal001@gmail.com" },
          to: [{ email: contact.email, name: firstName }],
          subject,
          htmlContent,
        }),
      })
    }
    ```

    **src/app/api/cron/remind-day-before/route.ts logic:**
    - After auth check, compute "tomorrow's date" in UTC: `new Date(Date.now() + 24*60*60*1000)` — compare date portion against each session's `dateISO`
    - For each session in `introTalkSessions`, check if `new Date(session.dateISO).toDateString() === tomorrowDate.toDateString()` (compare in UTC)
    - If matched and `session.brevoListId` is defined: fetch contacts from that list, send day-before reminder to each
    - Log: `console.log("Day-before reminders sent: N")` or `"No sessions tomorrow"`
    - Return `NextResponse.json({ sent: N })`

    **src/app/api/cron/remind-hour-before/route.ts logic:**
    - After auth check, compute "today's date" in UTC
    - For each session in `introTalkSessions`, check if `new Date(session.dateISO).toDateString() === today.toDateString()`
    - If matched and `session.brevoListId` is defined: fetch contacts from that list, send hour-before reminder to each
    - Return `NextResponse.json({ sent: N })`

    **vercel.json** (create new file at project root):
    ```json
    {
      "crons": [
        {
          "path": "/api/cron/remind-day-before",
          "schedule": "0 9 * * *"
        },
        {
          "path": "/api/cron/remind-hour-before",
          "schedule": "0 17 * * *"
        }
      ]
    }
    ```
    Schedule explanation:
    - `0 9 * * *` = 9:00 UTC daily — fires on the day before a session (April 11 and April 18) and sends day-before reminders
    - `0 17 * * *` = 17:00 UTC daily = 6:00 PM BST = 1 hour before the 7pm BST session start

    Add a comment in both route files explaining the cron schedule:
    `// Invoked by Vercel cron at 9:00 UTC daily (see vercel.json). Secured via CRON_SECRET env var.`

    Both files import `introTalkSessions` and `IntroTalkSession` from `@/lib/data/intro-talks`.
    Use `export const runtime = "nodejs"` (not edge — needs Buffer/process.env reliably).
  </action>
  <verify>
    `npx tsc --noEmit` passes. Verify file structure:
    - `src/app/api/cron/remind-day-before/route.ts` exists
    - `src/app/api/cron/remind-hour-before/route.ts` exists
    - `vercel.json` exists with `crons` array containing 2 entries
    
    Manual smoke test (optional, requires CRON_SECRET in .env.local):
    ```
    curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/remind-day-before
    ```
    Should return `{"sent":0}` (no sessions tomorrow during dev) without 401.
  </verify>
  <done>
    Two cron route files exist and compile. vercel.json defines both schedules. Both routes return 401 without correct auth header and JSON response with sent count when authorized. On Vercel deployment, crons will auto-register and appear in the Vercel dashboard under "Cron Jobs".
  </done>
</task>

</tasks>

<verification>
After both tasks:
- `npx tsc --noEmit` passes with no errors
- `vercel.json` exists at project root with 2 cron entries
- Both cron route files exist and are guarded by CRON_SECRET check
- register.ts includes `listIds` in the Brevo contact upsert payload (conditional on env var)

Env vars to add in Vercel dashboard before going live:
- `CRON_SECRET` — any random string (Vercel uses this to sign cron requests)
- `BREVO_LIST_APRIL12` — Brevo list ID for the April 12 session (create in Brevo dashboard: Contacts > Lists > Create)
- `BREVO_LIST_APRIL19` — Brevo list ID for the April 19 session
</verification>

<success_criteria>
- Day-before reminder: On April 11 at 9am UTC, Brevo contacts in the April 12 list each receive "Your intro talk is tomorrow" email
- Hour-before reminder: On April 12 at 5pm UTC (= 6pm BST), same contacts receive "Starting in 1 hour" email with Google Meet link
- Same pattern repeats for April 19 session
- Cron routes return 401 for any request without the correct Authorization header
- No new npm dependencies required (uses native fetch, existing Brevo API key)
</success_criteria>

<output>
After completion, commit with message: `feat(reminders): add day-before and hour-before cron reminder emails via Brevo`

No SUMMARY.md required for quick tasks.
</output>
