import { type EventTestimonial } from "@/lib/data/events"

export function EventSocialProof({
  testimonials,
}: {
  testimonials?: EventTestimonial[]
}) {
  const visibleTestimonials = testimonials?.slice(0, 3) ?? []

  if (visibleTestimonials.length === 0) return null

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#FEF0F5" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase mb-3"
            style={{ color: "#C8386A", letterSpacing: "0.28em" }}
          >
            Community Voices
          </p>
          <h2
            className="font-light text-gray-900"
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
            }}
          >
            What Devon Participants Say
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {visibleTestimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-7"
              style={{
                border: "1px solid rgba(200,56,106,0.12)",
                boxShadow: "0 4px 24px rgba(200,56,106,0.06)",
              }}
            >
              {/* Opening quote mark */}
              <div
                className="text-4xl font-serif leading-none mb-3 select-none"
                style={{ color: "#C8386A", fontFamily: "Georgia, serif", opacity: 0.4 }}
              >
                &ldquo;
              </div>

              {t.highlight && (
                <p
                  className="font-normal italic mb-3"
                  style={{
                    color: "#C8386A",
                    fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                    fontSize: "1.15rem",
                  }}
                >
                  {t.highlight}
                </p>
              )}

              <p className="text-gray-600 text-sm leading-relaxed mb-5">{t.quote}</p>

              <div className="flex items-center gap-2">
                <div
                  className="h-px flex-1"
                  style={{ background: "rgba(200,56,106,0.15)" }}
                />
                <p
                  className="text-[11px] font-medium uppercase"
                  style={{ color: "rgba(0,0,0,0.35)", letterSpacing: "0.18em" }}
                >
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
