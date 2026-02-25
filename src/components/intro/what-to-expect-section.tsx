import Image from "next/image"
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
        {/* Header with lifestyle accent image */}
        <div className="text-center mb-10">
          <div className="relative rounded-2xl overflow-hidden mb-6 max-w-2xl mx-auto">
            <Image
              src="/images/intro/breathing-session.jpg"
              alt="Group breathing and meditation session"
              width={1200}
              height={400}
              className="w-full h-40 sm:h-48 object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-muted/90 via-muted/40 to-transparent" />
            <div className="absolute bottom-4 left-0 right-0">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-foreground">
                What to Expect in 60 Minutes
              </h2>
            </div>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A guided journey from understanding your mind to experiencing deep
            inner calm
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {whatToExpectSteps.map((step, index) => {
            const Icon = iconMap[step.iconName]
            return (
              <div
                key={step.number}
                className="flex gap-4 sm:gap-6 items-start"
              >
                {/* Number + connecting line */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-sm">
                    {step.number}
                  </div>
                  {index < whatToExpectSteps.length - 1 && (
                    <div className="w-px h-full min-h-[1rem] bg-gradient-to-b from-primary/40 to-primary/10 mt-2" />
                  )}
                </div>

                {/* Step content card */}
                <div className="flex-1 bg-background rounded-xl p-4 shadow-sm mb-1">
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
