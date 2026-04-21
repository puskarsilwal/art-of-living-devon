"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type SequenceType = "attended" | "missed" | "cold"

const SEQUENCE_LABELS: Record<SequenceType, string> = {
  attended: "Attended - 5 emails over 24 days",
  missed:   "Missed - 4 emails over 5 days",
  cold:     "Cold - 6 emails over 26 days",
}

export function ManualEnrollment({ adminKey }: { adminKey: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [sequence, setSequence] = useState<SequenceType>("attended")
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ enrolled?: number; errors?: string[] } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!name.trim() || !email.trim()) {
      alert("Name and email are required.")
      return
    }

    const confirmed = window.confirm(
      `Manually enroll ${name} (${email}) in: ${SEQUENCE_LABELS[sequence]}\nStart date: ${startDate}`
    )
    if (!confirmed) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/admin/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({
          contacts: [{ email: email.trim(), name: name.trim(), phone: phone.trim() }],
          sequence,
          startDate,
        }),
      })
      const data = await res.json()
      setResult(data)
      if (!data.errors) {
        setName("")
        setEmail("")
        setPhone("")
      }
    } catch {
      setResult({ errors: ["Network error or server unavailable"] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Manual Enrollment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@example.com"
                required
                className="w-full text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+44 7700 900000"
                className="w-full text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1 flex-1 min-w-[200px]">
              <label className="text-sm font-medium">Sequence</label>
              <select
                value={sequence}
                onChange={e => setSequence(e.target.value as SequenceType)}
                className="w-full text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {(Object.keys(SEQUENCE_LABELS) as SequenceType[]).map(seq => (
                  <option key={seq} value={seq}>{SEQUENCE_LABELS[seq]}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? "Enrolling..." : "Enroll manually"}
            </Button>
          </div>

          {result && (
            <div className={`mt-4 rounded-md px-4 py-3 text-sm font-medium ${
              result.errors
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : "bg-green-50 text-green-800 border border-green-200"
            }`}>
              {result.errors
                ? `Failed to enroll. Errors: ${result.errors.join(", ")}`
                : "Successfully enrolled contact. First email sends at next 9 AM UTC cron run."}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
