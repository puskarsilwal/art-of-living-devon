export type Step = {
  number: number
  title: string
  description: string
  outcome: string
  duration: string
  iconName: string
}

export const whatToExpectSteps: Step[] = [
  {
    number: 1,
    title: "Welcome & Introduction",
    description: "Setting the space with a warm welcome and brief intro to Art of Living",
    outcome: "Feel welcomed and at ease",
    duration: "~5 min",
    iconName: "Handshake",
  },
  {
    number: 2,
    title: "Understanding the Mind",
    description: "Interactive talk on how thoughts create stress and the 3 tendencies of the mind",
    outcome: "Fresh perspective on your own mind",
    duration: "~10 min",
    iconName: "Brain",
  },
  {
    number: 3,
    title: "Breathing Technique",
    description: "Guided calming breathing exercise to quiet the mind",
    outcome: "Feel your body and mind begin to settle",
    duration: "~15 min",
    iconName: "Wind",
  },
  {
    number: 4,
    title: "Guided Meditation",
    description: "Real meditation experience, effortless and deeply relaxing",
    outcome: "Feel light, calm, and at peace",
    duration: "~15 min",
    iconName: "Sunrise",
  },
  {
    number: 5,
    title: "Community Connection",
    description: "Connect with like-minded people and share experiences",
    outcome: "Sense of belonging",
    duration: "~5 min",
    iconName: "Users",
  },
  {
    number: 6,
    title: "Q&A + Next Steps",
    description: "Live questions with the teacher and introduction to the full course",
    outcome: "Clarity on your journey forward",
    duration: "~10 min",
    iconName: "MessageCircle",
  },
]
