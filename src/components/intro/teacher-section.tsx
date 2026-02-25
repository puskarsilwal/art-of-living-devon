import { Award, Heart, Users, Sparkles } from "lucide-react"

const credentials = [
  {
    icon: Award,
    label: "Internationally certified",
  },
  {
    icon: Heart,
    label: "Warm, supportive approach",
  },
  {
    icon: Users,
    label: "Part of your local community",
  },
]

export function TeacherSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-8">
          Meet Your Guide
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* TODO: Replace with actual teacher-in-action photo */}
          <div className="w-full md:w-5/12 shrink-0">
            <div className="aspect-square max-w-[320px] mx-auto rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-muted flex flex-col items-center justify-center gap-4">
              <Sparkles className="h-16 w-16 text-primary/40" />
              <p className="text-sm text-muted-foreground font-medium px-6 text-center">
                Your certified Art of Living teacher
              </p>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-lg sm:text-xl font-semibold text-primary mb-2">
              Certified Art of Living Teacher
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-2">
              Trained personally in the tradition of Gurudev Sri Sri Ravi
              Shankar, bringing authentic practices that have transformed
              millions of lives worldwide.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              Passionate about sharing these life-changing techniques with your
              local Devon &amp; Southwest community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {credentials.map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-center gap-2"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <cred.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{cred.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
