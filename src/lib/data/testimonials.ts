export type Testimonial = {
  name: string
  quote: string
  highlight?: string
  context?: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Charlotte P.",
    context: "Lawyer",
    quote:
      "I have been looking for this for 15 years! The techniques are truly a gift.",
    highlight: "Looking for this for 15 years",
  },
  {
    name: "Phillip M.",
    context: "Stress management",
    quote:
      "About 30 days after practicing regularly, I got so happy for no reason.",
    highlight: "So happy for no reason",
  },
  {
    name: "Sonia K.",
    context: "Parent",
    quote:
      "SKY has made all the difference in better communicating with family.",
    highlight: "All the difference",
  },
  {
    name: "Rebecca D.",
    context: "Professional",
    quote: "People who are so busy definitely need it the most.",
    highlight: "Busy people need it the most",
  },
  {
    name: "Neeva P.",
    context: "Mental clarity",
    quote: "After I did the course, I just felt so calm inside.",
    highlight: "So calm inside",
  },
  {
    name: "Luis Gagnon",
    context: "CEO",
    quote: "It changed my life literally overnight.",
    highlight: "Changed my life overnight",
  },
]
