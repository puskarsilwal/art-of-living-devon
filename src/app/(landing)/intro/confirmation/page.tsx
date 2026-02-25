import { notFound } from "next/navigation"
import { CheckCircle, Video, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { introTalkSessions } from "@/lib/data/intro-talks"

export const metadata = {
  title: "You're Registered | Art of Living Devon & Southwest",
  robots: "noindex", // Confirmation page should not be indexed
}

interface Props {
  searchParams: Promise<{ session?: string }>
}

function buildGoogleCalendarUrl(session: (typeof introTalkSessions)[0]): string {
  const startDate = new Date(session.dateISO)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: session.title,
    dates: `${fmt(startDate)}/${fmt(endDate)}`,
    details: `Join via Zoom: ${session.zoomUrl}\n\nA free 60-minute introduction to the Art of Living and SKY Breath Meditation.`,
    location: session.zoomUrl,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { session } = await searchParams
  const selectedSession = introTalkSessions.find(s => s.id === session)

  if (!selectedSession) notFound()

  const googleCalendarUrl = buildGoogleCalendarUrl(selectedSession)
  const icsDownloadUrl = `/api/calendar/${selectedSession.id}`

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex items-start justify-center px-4 py-16 sm:py-24">
      <div className="max-w-md w-full space-y-8 text-center">

        {/* Success icon + heading */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            You&apos;re registered!
          </h1>
          <p className="text-muted-foreground">
            We look forward to seeing you at the intro talk.
          </p>
        </div>

        {/* Session details card */}
        <Card className="border-primary/10 shadow-sm text-left">
          <CardContent className="pt-6 space-y-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Your session</p>
              <p className="font-semibold">{selectedSession.date}</p>
              <p className="text-muted-foreground">{selectedSession.time} {selectedSession.timezone} · {selectedSession.duration} · Online</p>
            </div>

            {/* Join Zoom - most prominent element */}
            <Button asChild size="lg" className="w-full mt-4 gap-2">
              <a href={selectedSession.zoomUrl} target="_blank" rel="noopener noreferrer">
                <Video className="h-4 w-4" />
                Join Zoom
              </a>
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Save this link. You&apos;ll need it to join the session.
            </p>
          </CardContent>
        </Card>

        {/* Calendar add - side by side */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Add to your calendar</p>
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-4 w-4" />
                Google Calendar
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <a href={icsDownloadUrl}>
                <Calendar className="h-4 w-4" />
                Download .ics
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            .ics works with Apple Calendar, Outlook, and most calendar apps
          </p>
        </div>

        {/* What to expect reassurance */}
        <div className="text-sm text-muted-foreground border-t pt-6">
          <p>
            The session is 60 minutes online. You&apos;ll experience a guided breathing exercise,
            a short meditation, and have time for live Q&amp;A. Camera on but no pressure to participate actively.
          </p>
        </div>

      </div>
    </main>
  )
}
