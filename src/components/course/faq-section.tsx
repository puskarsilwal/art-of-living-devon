"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long is the Happiness Program?",
    answer:
      "The Happiness Program runs over 3 consecutive days, approximately 3 hours each day. Morning and evening sessions are available to suit your schedule. The total time commitment is around 9 hours, spread comfortably across 3 days.",
  },
  {
    question: "How much does the course cost?",
    answer:
      "The course fee varies by location and format. Visit the Art of Living registration page to see current pricing for Devon and Southwest courses. Financial assistance may be available — contact your local centre if the fee is a barrier.",
  },
  {
    question: "Is it available online or in-person?",
    answer:
      "Both formats are offered. In-person courses take place in Exeter, Devon. Online courses are delivered over Zoom from the comfort of your home. Both formats teach the complete SKY Breath Meditation technique, so you get the full experience either way.",
  },
  {
    question: "Do I need any prior experience?",
    answer:
      "No experience is needed. The Happiness Program is designed for complete beginners. You do not need any yoga, meditation, or breathwork background to attend. If you can breathe, you can learn SKY.",
  },
  {
    question: "What if I miss a session?",
    answer:
      "Attendance at all 3 sessions is important for the complete learning experience, as each day builds on the last. If you need to reschedule, contact your course teacher as early as possible. Make-up options may be available depending on the format.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-4" />
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Everything you need to know before signing up
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
