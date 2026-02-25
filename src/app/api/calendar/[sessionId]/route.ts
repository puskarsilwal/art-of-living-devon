import { createEvent } from "ics"
import { introTalkSessions } from "@/lib/data/intro-talks"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const session = introTalkSessions.find(s => s.id === sessionId)
  if (!session) {
    return new Response("Session not found", { status: 404 })
  }

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
    description: `Join via Zoom: ${session.zoomUrl}\n\nA free 60-minute introduction to SKY Breath Meditation and the Art of Living. No experience needed.`,
    location: session.zoomUrl,
    url: session.zoomUrl,
    status: "CONFIRMED",
    busyStatus: "BUSY",
  })

  if (error || !value) {
    return new Response("Failed to generate calendar file", { status: 500 })
  }

  return new Response(value, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="art-of-living-intro-${session.id}.ics"`,
      "Cache-Control": "no-store",
    },
  })
}
