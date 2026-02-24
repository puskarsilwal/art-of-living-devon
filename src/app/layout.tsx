import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Art of Living Devon & Southwest",
    template: "%s | Art of Living Devon & Southwest",
  },
  description:
    "Free intro talks and meditation courses in Devon and Southwest England. Discover breathing techniques, meditation, and yoga for a stress-free, healthy life.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F97316",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
