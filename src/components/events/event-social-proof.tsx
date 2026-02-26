import { Card } from "@/components/ui/card"
import { type EventTestimonial } from "@/lib/data/events"

const credibilityLogos = [
  { name: "CNN", className: "font-black text-2xl" },
  { name: "Vogue", className: "font-light text-2xl tracking-widest uppercase" },
  { name: "Harvard Health", className: "text-sm font-semibold" },
  { name: "Yale", className: "text-lg font-bold italic" },
  { name: "The Guardian", className: "font-bold text-lg" },
]

export function EventSocialProof({
  testimonials,
}: {
  testimonials?: EventTestimonial[]
}) {
  const visibleTestimonials = testimonials?.slice(0, 3) ?? []

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Credibility logos */}
        <p className="text-sm text-gray-500 text-center uppercase tracking-widest mb-8">
          As featured in
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-16">
          {credibilityLogos.map((logo) => (
            <span
              key={logo.name}
              className={`text-gray-400 hover:text-gray-600 transition-colors select-none ${logo.className}`}
            >
              {logo.name}
            </span>
          ))}
        </div>

        {/* Local testimonials */}
        {visibleTestimonials.length > 0 && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              What Devon Participants Say
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial) => (
                <Card key={testimonial.name} className="p-6">
                  {testimonial.highlight && (
                    <p className="text-primary font-semibold italic text-base mb-3">
                      &ldquo;{testimonial.highlight}&rdquo;
                    </p>
                  )}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {testimonial.name}
                  </p>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
