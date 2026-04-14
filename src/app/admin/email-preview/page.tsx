import EmailPreviewClient from "@/components/admin/email-preview-client"

export const metadata = {
  title: "Email Preview | Art of Living Devon",
  robots: "noindex, nofollow",
}

interface Props {
  searchParams: Promise<{ key?: string }>
}

export default async function EmailPreviewPage({ searchParams }: Props) {
  const { key } = await searchParams
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret || key !== adminSecret) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-sm">Access denied.</p>
      </main>
    )
  }

  return <EmailPreviewClient adminKey={key} />
}
