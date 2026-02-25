export type Testimonial = {
  name: string
  quote: string
  highlight?: string
  context?: string
  imagePath: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Joe Rod",
    context: "Cardiologist",
    quote:
      "After 90 days of doing this, I felt my stress was markedly reduced, and now I would not stop doing it, because I would not want to revert to the levels of stress I had at the time.",
    highlight: "Stress markedly reduced",
    imagePath: "/images/intro/testimonials/dr-joe-rod.webp",
  },
  {
    name: "Mawahib Shaibani",
    context: "Financial Advisor",
    quote:
      "I used to be so tense. I'd be getting so angry, shouting, screaming. Now when I realize I'm getting tense, I just breathe and I calm down. I'm much more focused and much more productive.",
    highlight: "Much more focused and productive",
    imagePath: "/images/intro/testimonials/mawahib-shaibani.webp",
  },
  {
    name: "Phillip Mertz",
    context: "Investment Manager",
    quote:
      "About 30 days after doing the techniques very regularly, I just got so happy for no reason. And I hadn't experienced that in a long time.",
    highlight: "So happy for no reason",
    imagePath: "/images/intro/testimonials/phillip-mertz.webp",
  },
  {
    name: "Charlotte Puls",
    context: "Lawyer",
    quote:
      "I have been looking for this for 15 years! The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day.",
    highlight: "Looking for this for 15 years",
    imagePath: "/images/intro/testimonials/charlotte-puls.webp",
  },
  {
    name: "Glenn-Douglas Haig",
    context: "CEO",
    quote:
      "Within three days I started experiencing a deep shift within myself from anxiousness to peace, from sadness to joy. I find myself more and more centered in the joy and clarity of a calm and peaceful existence.",
    highlight: "From anxiousness to peace",
    imagePath: "/images/intro/testimonials/glenn-haig.webp",
  },
]
