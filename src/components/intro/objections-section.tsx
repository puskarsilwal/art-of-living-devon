import {
  UserCheck,
  CreditCard,
  Camera,
  Clock,
  Wifi,
  Users,
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
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-8">
          No Barriers, Just Benefits
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {objections.map((obj) => (
            <div key={obj.text} className="flex flex-col items-center text-center gap-3">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <obj.icon className="h-7 w-7 text-primary" />
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
              Save My Seat — It&apos;s Free
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
