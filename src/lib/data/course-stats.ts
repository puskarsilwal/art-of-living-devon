export type CourseStat = {
  percentage: string
  direction: "up" | "down"
  label: string
  timeframe: string
}

export const courseStats: CourseStat[] = [
  { percentage: "37%", direction: "up",   label: "Increased calm",                      timeframe: "4 weeks" },
  { percentage: "23%", direction: "down", label: "Reduced anxiety",                     timeframe: "4 weeks" },
  { percentage: "31%", direction: "down", label: "Reduction in insomnia",               timeframe: "" },
  { percentage: "60%", direction: "down", label: "Reduction in stress hormone cortisol", timeframe: "3 months" },
  { percentage: "25%", direction: "up",   label: "Increase in social connection",        timeframe: "4 weeks" },
  { percentage: "34%", direction: "down", label: "Reduced depression",                  timeframe: "4 weeks" },
]
