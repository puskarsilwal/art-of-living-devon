import {
  Handshake,
  Brain,
  Wind,
  Sunrise,
  Users,
  MessageCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { whatToExpectSteps } from "@/lib/data/what-to-expect"
import type { ComponentType } from "react"

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Handshake,
  Brain,
  Wind,
  Sunrise,
  Users,
  MessageCircle,
}

export function WhatToExpectSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-3">
          What to Expect in 60 Minutes
        </h2>
        <p className="text-muted-foreground text-center text-base sm:text-lg mb-10 max-w-2xl mx-auto">
          A guided journey from understanding your mind to experiencing deep
          inner calm
        </p>

        <div className="space-y-6 sm:space-y-8">
          {whatToExpectSteps.map((step) => {
            const Icon = iconMap[step.iconName]
            return (
              <div
                key={step.number}
                className="flex gap-4 sm:gap-6 items-start"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    {step.number}
                  </div>
                  {step.number < whatToExpectSteps.length && (
                    <div className="w-px h-6 sm:h-8 bg-border mt-2" />
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {Icon && (
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                    )}
                    <h3 className="text-base sm:text-lg font-semibold">
                      {step.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-primary/80 text-sm italic mt-1">
                    {step.outcome}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
