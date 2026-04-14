export type CourseDate = {
  id: string
  format: "In-person" | "Online"
  location: string
  startDate: string
  endDate: string
  time: string
  timezone: string
  registrationUrl: string
  badge?: string
}

export const courseDates: CourseDate[] = [
  {
    id: "2026-05-08-online",
    format: "Online",
    location: "Online via Google Meet",
    startDate: "8 May 2026",
    endDate: "10 May 2026",
    time: "7:00 PM – 10:00 PM",
    timezone: "BST",
    registrationUrl: "https://aolreg.org/c/GBC1012472",
    badge: "Next Available",
  },
  {
    id: "2026-09-25-online",
    format: "Online",
    location: "Online via Google Meet",
    startDate: "25 September 2026",
    endDate: "27 September 2026",
    time: "7:00 PM – 10:00 PM",
    timezone: "BST",
    registrationUrl: "https://aolreg.org/c/GBC1044098",
  },
]
