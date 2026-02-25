export type Testimonial = {
  name: string
  quote: string
  highlight?: string
  context?: string
  imagePath: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Charlotte P.",
    context: "Lawyer",
    quote:
      "I have been looking for this for 15 years! The techniques are truly a gift.",
    highlight: "Looking for this for 15 years",
    imagePath: "/images/intro/testimonials/charlotte.jpg",
  },
  {
    name: "Phillip M.",
    context: "Stress management",
    quote:
      "About 30 days after practicing regularly, I got so happy for no reason.",
    highlight: "So happy for no reason",
    imagePath: "/images/intro/testimonials/phillip.jpg",
  },
  {
    name: "Sonia K.",
    context: "Parent",
    quote:
      "SKY has made all the difference in better communicating with family.",
    highlight: "All the difference",
    imagePath: "/images/intro/testimonials/sonia.jpg",
  },
  {
    name: "Rebecca D.",
    context: "Professional",
    quote: "People who are so busy definitely need it the most.",
    highlight: "Busy people need it the most",
    imagePath: "/images/intro/testimonials/rebecca.jpg",
  },
  {
    name: "Neeva P.",
    context: "Mental clarity",
    quote: "After I did the course, I just felt so calm inside.",
    highlight: "So calm inside",
    imagePath: "/images/intro/testimonials/neeva.jpg",
  },
  {
    name: "Luis Gagnon",
    context: "CEO",
    quote: "It changed my life literally overnight.",
    highlight: "Changed my life overnight",
    imagePath: "/images/intro/testimonials/luis.jpg",
  },
]
