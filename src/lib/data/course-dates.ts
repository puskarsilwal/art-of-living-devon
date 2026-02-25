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

// TODO: Update with confirmed Devon/Southwest course dates before go-live
export const courseDates: CourseDate[] = [
  {
    id: "2026-04-11-exeter",
    format: "In-person",
    location: "Exeter, Devon",
    startDate: "11 April 2026",
    endDate: "13 April 2026",
    time: "10:00 AM – 1:00 PM",
    timezone: "BST",
    registrationUrl: "https://www.artofliving.org/gb-en/courses/art-of-living-part-one",
    badge: "Next Available",
  },
  {
    id: "2026-05-09-online",
    format: "Online",
    location: "Online (Zoom)",
    startDate: "9 May 2026",
    endDate: "11 May 2026",
    time: "7:00 PM – 10:00 PM",
    timezone: "BST",
    registrationUrl: "https://www.artofliving.org/gb-en/courses/art-of-living-part-one",
  },
  {
    id: "2026-06-06-exeter",
    format: "In-person",
    location: "Exeter, Devon",
    startDate: "6 June 2026",
    endDate: "8 June 2026",
    time: "10:00 AM – 1:00 PM",
    timezone: "BST",
    registrationUrl: "https://www.artofliving.org/gb-en/courses/art-of-living-part-one",
  },
]
