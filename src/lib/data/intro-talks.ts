export type IntroTalkSession = {
  id: string
  title: string
  date: string
  time: string
  timezone: string
  location: string
  duration: string
  dateISO: string
  // TODO: Replace PLACEHOLDER with real Zoom meeting IDs before go-live
  zoomUrl: string
  badge?: string
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
    dateISO: "2026-03-08T10:00:00Z",
    zoomUrl: "https://zoom.us/j/PLACEHOLDER",
    badge: "Popular",
  },
  {
    id: "2026-03-15-1000",
    title: "Free Intro to the Art of Living",
    date: "Saturday 15 March 2026",
    time: "10:00 AM",
    timezone: "GMT",
    location: "Online via Zoom",
    duration: "60 minutes",
    dateISO: "2026-03-15T10:00:00Z",
    zoomUrl: "https://zoom.us/j/PLACEHOLDER",
    badge: undefined,
  },
  {
    id: "2026-03-22-1000",
    title: "Free Intro to the Art of Living",
    date: "Saturday 22 March 2026",
    time: "10:00 AM",
    timezone: "GMT",
    location: "Online via Zoom",
    duration: "60 minutes",
    dateISO: "2026-03-22T10:00:00Z",
    zoomUrl: "https://zoom.us/j/PLACEHOLDER",
    badge: "Limited Spots",
  },
]

// Backward compatibility export - consumers expecting a single session use this
export const nextIntroTalk = introTalkSessions[0]
