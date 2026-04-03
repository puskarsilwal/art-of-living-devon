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
  brevoListId?: number
}

// TODO: Create Brevo lists for each session in Brevo dashboard and set BREVO_LIST_APRIL12 / BREVO_LIST_APRIL19 env vars in Vercel before deployment
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
    meetUrl: "https://meet.google.com/pms-isfg-fwi",
    calendarLink: "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NjJnYjFlY3AwaWYzdmhtaGJsOTF2aDZtYTEgcHVza2FyQHB1c2thcnNpbHdhbC5jb20&tmsrc=puskar%40puskarsilwal.com",
    badge: "Popular",
    brevoListId: process.env.BREVO_LIST_APRIL12 ? Number(process.env.BREVO_LIST_APRIL12) : undefined,
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
    meetUrl: "https://meet.google.com/dua-kxwc-ers",
    calendarLink: "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MGRoNGw5b2RhczV1YjE1MGRmNTBiNmZnamkgcHVza2FyQHB1c2thcnNpbHdhbC5jb20&tmsrc=puskar%40puskarsilwal.com",
    badge: "Last Chance",
    brevoListId: process.env.BREVO_LIST_APRIL19 ? Number(process.env.BREVO_LIST_APRIL19) : undefined,
  },
]

// Backward compatibility export - consumers expecting a single session use this
export const nextIntroTalk = introTalkSessions[0]
