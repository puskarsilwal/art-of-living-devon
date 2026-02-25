import {
  UserCheck,
  CreditCard,
  Camera,
  Clock,
  Wifi,
  Users,
  ShieldCheck,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const objections = [
  { icon: UserCheck, text: "No experience needed" },
  { icon: CreditCard, text: "100% free, no credit card" },
  { icon: Camera, text: "Camera optional, no pressure" },
  { icon: Clock, text: "Just 60 minutes of your time" },
  { icon: Wifi, text: "Join from anywhere with internet" },
  { icon: Users, text: "Guided by a live, certified teacher" },
]

export function ObjectionsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header with shield icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            No Barriers, Just Benefits
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {objections.map((obj) => (
            <div
              key={obj.text}
              className="flex flex-col items-center text-center gap-2 bg-muted/30 rounded-xl p-4 sm:p-6"
            >
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <obj.icon className="h-8 w-8 text-primary" />
                </div>
                {/* Small check badge */}
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <p className="text-sm sm:text-base font-medium leading-snug">
                {obj.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#register">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 text-lg font-semibold px-8"
            >
              Save My Seat (It&apos;s Free)
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
