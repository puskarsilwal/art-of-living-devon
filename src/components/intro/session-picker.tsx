"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { introTalkSessions } from "@/lib/data/intro-talks"

interface Props {
  selectedId: string | null
  onSelect: (sessionId: string) => void
}

export function SessionPicker({ selectedId, onSelect }: Props) {
  return (
    <div>
      <h3 className="text-base font-semibold mb-1">Choose your session</h3>
      <p className="text-sm text-muted-foreground mb-3">Select a date that works for you</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {introTalkSessions.map((session) => {
          const isSelected = selectedId === session.id
          return (
            <button
              key={session.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(session.id)}
              className={[
                "relative p-4 rounded-xl text-left transition-all duration-150",
                isSelected
                  ? "border-2 border-primary bg-primary/5 shadow-md"
                  : "border-2 border-border bg-card hover:border-primary/40",
              ].join(" ")}
            >
              {session.badge && (
                <Badge variant="secondary" className="mb-2 text-xs">
                  {session.badge}
                </Badge>
              )}
              <p className="font-semibold text-sm">{session.date}</p>
              <p className="text-muted-foreground text-sm">
                {session.time} {session.timezone}
              </p>
              {isSelected && (
                <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
