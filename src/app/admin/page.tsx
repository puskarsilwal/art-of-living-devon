import { introTalkSessions } from "@/lib/data/intro-talks"
import EmailDashboard from "@/components/admin/email-dashboard"

export const metadata = {
  title: "Admin | Art of Living Devon",
  robots: "noindex, nofollow",
}

interface Props {
  searchParams: Promise<{ key?: string }>
}

export default async function AdminPage({ searchParams }: Props) {
  const { key } = await searchParams
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret || key !== adminSecret) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-sm">Access denied.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Send follow-up emails to intro talk participants. Load contacts first to see who is on each list.
          </p>
        </div>
        <EmailDashboard sessions={introTalkSessions} adminKey={key} />
      </div>
    </main>
  )
}
