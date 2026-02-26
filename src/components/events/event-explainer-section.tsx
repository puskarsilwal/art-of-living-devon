import Image from "next/image"
import type { EventConfig } from "@/lib/data/events"

type FeatureItem = {
  image: string
  title: string
  body: string
}

const satsangFeatures: FeatureItem[] = [
  {
    image: "/images/events/circle-kirtan.jpg",
    title: "Kirtan Chanting",
    body: "Ancient Sanskrit mantras sung in call-and-response. No experience needed — the melodies carry you effortlessly into stillness.",
  },
  {
    image: "/images/events/circle-meditation.jpg",
    title: "Guided Meditation",
    body: "A short, powerful guided breathing and meditation practice. You will leave with a technique you can use at home every day.",
  },
  {
    image: "/images/events/circle-silence.jpg",
    title: "Collective Silence",
    body: "The power of meditating with others is palpable. Shared silence creates an atmosphere that is hard to describe and unforgettable once felt.",
  },
]

const kirtanFeatures: FeatureItem[] = [
  {
    image: "/images/events/circle-kirtan.jpg",
    title: "Call-and-Response Chanting",
    body: "Sanskrit mantras led by an experienced kirtan singer. No musical ability required — your voice is exactly right.",
  },
  {
    image: "/images/events/circle-silence.jpg",
    title: "Community Energy",
    body: "When voices join together in devotional song, something shifts. Kirtan is a shared practice that lifts the whole room.",
  },
  {
    image: "/images/events/circle-meditation.jpg",
    title: "Moments of Stillness",
    body: "Between rounds of chanting, the silence is golden. Deep rest arrives naturally after the joy of song.",
  },
]

const defaultFeatures: FeatureItem[] = [
  {
    image: "/images/events/circle-silence.jpg",
    title: "Warm Community",
    body: "A welcoming gathering of like-minded people. Come alone and leave feeling connected.",
  },
  {
    image: "/images/events/circle-meditation.jpg",
    title: "Meditation Practice",
    body: "A guided practice suitable for all levels. Simple techniques you can take home and use every day.",
  },
  {
    image: "/images/events/circle-kirtan.jpg",
    title: "Uplifting Atmosphere",
    body: "Music, silence, and collective presence combine to create an evening that nourishes body and mind.",
  },
]

const headingByType: Record<EventConfig["eventType"], string> = {
  satsang: "What You'll Experience",
  kirtan: "An Evening of Chant and Joy",
  community: "What to Expect",
  special: "A Special Evening Together",
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
  const heading = headingByType[event.eventType] ?? "What to Expect"
  const features = getFeatures(event.eventType)

  return (
    <section className="bg-white py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold uppercase mb-4"
            style={{ color: "#C8386A", letterSpacing: "0.28em" }}
          >
            The Evening
          </p>
          <h2
            className="font-light text-gray-900"
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
            }}
          >
            {heading}
          </h2>
        </div>

        {/* Feature tiles */}
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
          {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                {/* Circle photo */}
                <div className="h-28 w-28 rounded-full overflow-hidden mb-6 shadow-lg ring-2 ring-white ring-offset-2">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h3
                  className="text-gray-900 mb-3 font-normal"
                  style={{
                    fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                    fontSize: "1.3rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[260px]">
                  {feature.body}
                </p>
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}
