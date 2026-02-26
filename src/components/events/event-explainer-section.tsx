import { Music2, Wind, Users } from "lucide-react"
import type { EventConfig } from "@/lib/data/events"

type FeatureItem = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
}

const satsangFeatures: FeatureItem[] = [
  {
    icon: Music2,
    title: "Kirtan Chanting",
    body: "Ancient Sanskrit mantras sung in call-and-response. No experience needed — the melodies are simple and the rhythm carries you.",
  },
  {
    icon: Wind,
    title: "Guided Meditation",
    body: "A short guided breathing and meditation practice. You'll leave with a technique you can use at home.",
  },
  {
    icon: Users,
    title: "Collective Silence",
    body: "The power of meditating with others is palpable. Shared silence creates an atmosphere that's hard to describe and unforgettable once felt.",
  },
]

const kirtanFeatures: FeatureItem[] = [
  {
    icon: Music2,
    title: "Call-and-Response Chanting",
    body: "Sanskrit mantras led by an experienced kirtan singer. No musical ability required — your voice is exactly right.",
  },
  {
    icon: Users,
    title: "Community Energy",
    body: "When voices join together in devotional song, something shifts. Kirtan is a shared practice that lifts the whole room.",
  },
  {
    icon: Wind,
    title: "Moments of Stillness",
    body: "Between rounds of chanting, the silence is golden. Deep rest arrives naturally after the joy of song.",
  },
]

const defaultFeatures: FeatureItem[] = [
  {
    icon: Users,
    title: "Warm Community",
    body: "A welcoming gathering of like-minded people. Come alone and leave feeling connected.",
  },
  {
    icon: Wind,
    title: "Meditation Practice",
    body: "A guided practice suitable for all levels. Simple techniques you can take home and use every day.",
  },
  {
    icon: Music2,
    title: "Uplifting Atmosphere",
    body: "Music, silence, and collective presence combine to create an evening that nourishes body and mind.",
  },
]

const headingByType: Record<EventConfig["eventType"], string> = {
  satsang: "An Evening of Peace and Connection",
  kirtan: "An Evening of Chant and Joy",
  community: "A Community Gathering",
  special: "A Special Evening Together",
}

const subheadingByType: Record<EventConfig["eventType"], string> = {
  satsang:
    "Satsang is a Sanskrit word meaning 'gathering in truth' — an evening of shared meditation, devotional chanting, and collective silence.",
  kirtan:
    "Kirtan is the ancient practice of devotional call-and-response chanting — a joyful, musical meditation that needs no prior experience.",
  community:
    "An open gathering to meditate, connect, and return to what matters.",
  special:
    "A curated evening with the Art of Living Devon community — nourishing, uplifting, and unlike anything else.",
}

function getFeatures(eventType: EventConfig["eventType"]): FeatureItem[] {
  if (eventType === "satsang") return satsangFeatures
  if (eventType === "kirtan") return kirtanFeatures
  return defaultFeatures
}

interface EventExplainerSectionProps {
  event: EventConfig
}

export function EventExplainerSection({ event }: EventExplainerSectionProps) {
  const heading = headingByType[event.eventType] ?? "A Community Gathering"
  const subheading =
    subheadingByType[event.eventType] ??
    "An open gathering to meditate, connect, and return to what matters."
  const features = getFeatures(event.eventType)

  return (
    <section className="bg-muted/30 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Centered header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            What to Expect
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {subheading}
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-xl border bg-muted/30 p-6"
              >
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
