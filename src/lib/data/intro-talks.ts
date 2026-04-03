export type IntroTalkSession = {
  id: string
  title: string
  date: string
  time: string
  timezone: string
  location: string
  duration: string
  dateISO: string
  meetUrl: string
  calendarLink: string
  badge?: string
}

export const introTalkSessions: IntroTalkSession[] = [
  {
    id: "2026-04-12-1900",
    title: "Free Intro to the Art of Living",
    date: "Sunday 12 April 2026",
    time: "7:00 PM",
    timezone: "BST",
    location: "Online via Google Meet",
    duration: "60 minutes",
    dateISO: "2026-04-12T19:00:00+01:00",
    meetUrl: "https://meet.google.com/guw-ybbe-ums",
    calendarLink: "https://calendar.app.google/tiL5MaHgBRVVrKJJ9",
    badge: "Popular",
  },
  {
    id: "2026-04-19-1900",
    title: "Free Intro to the Art of Living",
    date: "Sunday 19 April 2026",
    time: "7:00 PM",
    timezone: "BST",
    location: "Online via Google Meet",
    duration: "60 minutes",
    dateISO: "2026-04-19T19:00:00+01:00",
    meetUrl: "https://meet.google.com/ddn-irto-gfc",
    calendarLink: "https://calendar.app.google/sacCLP4UzejV2w3cA",
    badge: "Last Chance",
  },
]

// Backward compatibility export - consumers expecting a single session use this
export const nextIntroTalk = introTalkSessions[0]
