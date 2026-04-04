"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_sCfz8iSBHKCtxgnF3BRekmEmhkBzjcyZQayyETYTaeZP", {
      api_host: "https://eu.i.posthog.com",
      defaults: "2026-01-30",
      person_profiles: "identified_only",
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
