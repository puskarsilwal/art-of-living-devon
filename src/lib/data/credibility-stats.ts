export type CredibilityStat = {
  icon: string
  number: string
  label: string
}

export const credibilityStats: CredibilityStat[] = [
  { icon: "Users", number: "500M+", label: "Lives touched worldwide" },
  { icon: "Globe", number: "180+", label: "Countries" },
  { icon: "BookOpen", number: "100+", label: "Peer-reviewed studies" },
  {
    icon: "GraduationCap",
    number: "Yale & Harvard",
    label: "Research-backed",
  },
]

export type ResearchHighlight = {
  institution: string
  finding: string
}

export const researchHighlights: ResearchHighlight[] = [
  {
    institution: "Yale University (2020)",
    finding:
      "SKY Campus Happiness program found most effective for student mental health and wellbeing",
  },
  {
    institution: "Harvard Medical School",
    finding:
      "Independent research endorsing the efficacy of SKY Breath Meditation",
  },
]
