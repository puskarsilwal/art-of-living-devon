import Link from "next/link"
import { Wind, BookOpen, CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const offerings = [
  {
    icon: Wind,
    title: "Free Intro Talk",
    description:
      "Experience SKY Breath Meditation in a live 60-minute session. No experience needed. Completely free.",
    href: "/intro",
    cta: "Register Free",
  },
  {
    icon: BookOpen,
    title: "Part 1 Course",
    description:
      "Three days to learn Sudarshan Kriya, pranayama, and yoga. Science-backed and life-changing.",
    href: "/happiness-program",
    cta: "Explore the Course",
  },
  {
    icon: CalendarDays,
    title: "Community Events",
    description:
      "Satsang, kirtan, and meditation gatherings across Devon and Southwest England.",
    href: "/events", // /events route created in Phase 7
    cta: "See Events",
  },
]

export function OfferingsSection() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What We Offer</h2>
          <p className="mt-3 text-muted-foreground text-lg">Find the right practice for you</p>
        </div>

        {/* Offering cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {offerings.map((offering) => {
            const Icon = offering.icon
            return (
              <Card
                key={offering.title}
                className="flex flex-col h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mt-4">{offering.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">{offering.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link href={offering.href}>
                    <Button className="w-full">{offering.cta}</Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
