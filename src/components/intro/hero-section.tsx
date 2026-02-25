import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { nextIntroTalk } from "@/lib/data/intro-talks"

export function HeroSection() {
  return (
    <section className="px-4 pt-8 pb-10 sm:pt-16 sm:pb-20 text-center">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-3 text-sm">
          Free Online Event
        </Badge>

        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3">
          Discover the Breath That{" "}
          <span className="text-primary">Changes Everything</span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-5">
          Join a free 60-minute intro to the Art of Living. Learn a powerful
          breathing technique used by millions worldwide.
        </p>

        <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-medium mb-6">
          <Clock className="h-5 w-5 text-primary shrink-0" />
          <span>
            {nextIntroTalk.date}, {nextIntroTalk.time} {nextIntroTalk.timezone}
          </span>
        </div>

        <a href="#register">
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 text-lg font-semibold px-8"
          >
            Save My Seat — It&apos;s Free
          </Button>
        </a>
      </div>
    </section>
  )
}
