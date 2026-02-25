"use client"

import { useEffect, useState } from "react"
import { introTalkSessions } from "@/lib/data/intro-talks"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
} | null

function getNextSession() {
  const now = new Date()
  return introTalkSessions.find((s) => new Date(s.dateISO) > now) ?? null
}

function calcTimeLeft(targetISO: string): TimeLeft {
  const diff = new Date(targetISO).getTime() - Date.now()
  if (diff <= 0) return null

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null)

  useEffect(() => {
    let session = getNextSession()

    function tick() {
      if (!session) {
        setTimeLeft(null)
        return
      }

      const result = calcTimeLeft(session.dateISO)

      if (result === null) {
        // Session just passed - advance to next
        session = getNextSession()
        if (!session) {
          setTimeLeft(null)
        } else {
          setTimeLeft(calcTimeLeft(session.dateISO))
        }
      } else {
        setTimeLeft(result)
      }
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  // Pre-hydration: render nothing to avoid SSR mismatch flash
  if (timeLeft === null) {
    const session = getNextSession()
    if (!session) {
      return (
        <p className="text-sm text-white/80">
          Registration open. Join the next session
        </p>
      )
    }
    return null
  }

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <div className="text-center sm:text-left">
      <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
        Next session in
      </p>
      <div className="flex items-center gap-3 text-white/90 font-mono text-sm sm:text-base">
        <span>{days}d</span>
        <span>{pad(hours)}h</span>
        <span>{pad(minutes)}m</span>
        <span className="tabular-nums">{pad(seconds)}s</span>
      </div>
    </div>
  )
}
