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
    id: "2026-05-08-exeter",
    format: "In-person",
    location: "St Sidwell's Community Centre, Exeter",
    startDate: "8 May 2026",
    endDate: "10 May 2026",
    time: "Fri 6–9 PM, Sat–Sun 10:30 AM–1:30 PM",
    timezone: "BST",
    registrationUrl: "https://aolreg.org/c/GBC1012472",
    badge: "Next Available",
  },
  {
    id: "2026-09-25-exeter",
    format: "In-person",
    location: "Exeter, Devon",
    startDate: "25 September 2026",
    endDate: "27 September 2026",
    time: "TBC",
    timezone: "BST",
    registrationUrl: "https://aolreg.org/c/GBC1044098",
  },
]
