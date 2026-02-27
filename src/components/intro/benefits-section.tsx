import Image from "next/image"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    image: "/images/intro/benefit-calm.jpg",
    alt: "Person experiencing calm and relief after breathwork",
    caption: "Introduction to SKY Breathing Technique",
    description: "Your first taste of the signature SKY technique. Even this intro session produces a tangible shift — researched at leading universities.",
  },
  {
    image: "/images/intro/benefit-focus.jpg",
    alt: "Woman in deep focused meditation",
    caption: "Guided Meditation",
    description: "A gentle teacher-led inward journey — different from SKY Breath. Quiets mental chatter and leaves you feeling like you've had a full night's rest.",
  },
  {
    image: "/images/intro/benefit-sleep.jpg",
    alt: "Person experiencing deep restful sleep",
    caption: "Deep Rest & Better Sleep",
    description: "Settles the mind and restores natural energy without years of practice.",
  },
  {
    image: "/images/intro/benefit-energy.jpg",
    alt: "Person feeling energised and alive after practice",
    caption: "Expert Guidance",
    description: "Live certified teachers and a warm Devon & Southwest community behind you every step.",
  },
]

export function BenefitsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            What You&apos;ll Experience
          </p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Real Techniques. Real Results. Real People.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-10">
          {benefits.map((benefit) => (
            <div key={benefit.caption} className="flex flex-col items-center text-center">
              {/* Circular photo */}
              <div className="relative w-40 h-40 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-primary/20">
                <Image
                  src={benefit.image}
                  alt={benefit.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 144px, 176px"
                />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                {benefit.caption}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xs">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#register">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto h-14 text-lg font-semibold px-8"
            >
              Join the Free Session →
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
