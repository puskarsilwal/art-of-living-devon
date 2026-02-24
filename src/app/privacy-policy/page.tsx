import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal data.",
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-xl border border-border bg-card p-6 sm:p-8 ${className}`}
    >
      {children}
    </section>
  )
}

function SectionHeading({
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </span>
      {title}
    </h2>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-12 sm:py-16">
      {/* Page header */}
      <header className="mb-10 text-center sm:mb-14">
        <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          Legal
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-base text-muted-foreground">
          Last updated: 24 February 2026
        </p>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary" />
      </header>

      {/* Intro summary */}
      <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
          This policy explains how <strong>Art of Living Devon &amp; Southwest</strong> collects,
          uses, and protects your personal data when you visit our website or register
          for our events. We have written it in plain English so it is easy to understand.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* 1. Who we are */}
        <SectionCard>
          <SectionHeading number="1" title="Who we are" />
          <div className="space-y-3 pl-11 text-[15px] leading-relaxed text-foreground/80">
            <p>
              We are <strong className="text-foreground">Art of Living Devon &amp; Southwest</strong>,
              a community group that organises free introductory talks, breathing
              workshops, meditation sessions, and yoga courses across Devon and
              Southwest England.
            </p>
            <p>
              We are the data controller for the personal information we collect
              through this website. If you have any questions about how we handle
              your data, you can contact us at{" "}
              <strong className="text-foreground">[email to be confirmed]</strong>.
            </p>
          </div>
        </SectionCard>

        {/* 2. What data we collect */}
        <SectionCard>
          <SectionHeading number="2" title="What data we collect" />
          <p className="mb-4 pl-11 text-[15px] leading-relaxed text-foreground/80">
            We may collect the following information about you:
          </p>
          <ul className="space-y-3 pl-11">
            {[
              {
                label: "Name",
                desc: "so we know who is attending our events",
              },
              {
                label: "Email address",
                desc: "so we can send you event details, Zoom links, and reminders",
              },
              {
                label: "Phone number",
                desc: "(optional) only if you choose to provide it, for event-related communications",
              },
              {
                label: "Website usage data",
                desc: "pages you visit, time spent on the site, and how you arrived here (for example, from a Facebook ad)",
              },
              {
                label: "Cookie data",
                desc: "small files stored on your device to help the site work and to understand how people use it",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <strong className="text-foreground">{item.label}</strong> &mdash; {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* 3. Why we collect it (lawful basis) */}
        <SectionCard>
          <SectionHeading number="3" title="Why we collect it" />
          <div className="space-y-4 pl-11">
            <p className="text-[15px] leading-relaxed text-foreground/80">
              Under UK data protection law, we need a lawful reason to collect and
              use your personal data. We rely on the following:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">Consent</p>
                <p className="text-[15px] leading-relaxed text-foreground/80">
                  For sending you marketing emails about future courses and events,
                  and for setting analytics and marketing cookies on your device. You
                  can withdraw your consent at any time.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">Legitimate interest</p>
                <p className="text-[15px] leading-relaxed text-foreground/80">
                  For event administration, such as sending you the Zoom link after
                  you register, event reminders, and follow-up information directly
                  related to an event you signed up for.
                </p>
              </div>
            </div>
            <p className="rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-[15px] leading-relaxed text-foreground/80">
              When we ask for your consent (for example, on a registration form or
              cookie banner), the checkbox will always be unticked by default. We
              will never assume you agree &mdash; you must actively opt in.
            </p>
          </div>
        </SectionCard>

        {/* 4. How we use your data */}
        <SectionCard>
          <SectionHeading number="4" title="How we use your data" />
          <p className="mb-4 pl-11 text-[15px] leading-relaxed text-foreground/80">
            We use the information we collect to:
          </p>
          <ul className="space-y-2.5 pl-11">
            {[
              "Process your event registrations",
              "Send you Zoom links and event reminders",
              "Follow up with information about Art of Living courses (only with your consent)",
              "Understand how people use our website so we can improve it (using anonymous analytics)",
              "Measure the effectiveness of our Facebook advertising campaigns",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* 5. Third-party processors */}
        <SectionCard>
          <SectionHeading number="5" title="Who we share your data with" />
          <p className="mb-4 pl-11 text-[15px] leading-relaxed text-foreground/80">
            We use a small number of trusted services to help run our website and
            events. Each one only receives the data it needs:
          </p>
          <div className="space-y-3 pl-11">
            {[
              {
                name: "Brevo",
                aka: "formerly Sendinblue",
                desc: "Handles our email communications. Brevo processes your name and email address to send event confirmations and, where you have consented, marketing emails.",
                location: "European Union",
              },
              {
                name: "Meta",
                aka: "Facebook Pixel",
                desc: "Helps us understand how visitors from our Facebook ads interact with the website. It tracks actions like visiting a page or completing a registration form.",
                location: "United States (see Section 9)",
              },
              {
                name: "Google Analytics 4",
                aka: null,
                desc: "Provides anonymous website usage statistics such as which pages are most visited and how visitors found us.",
                location: "United States (see Section 9)",
              },
              {
                name: "Vercel",
                aka: null,
                desc: "Hosts this website. Vercel processes server logs (IP addresses, page requests) as part of normal website hosting.",
                location: "United States",
              },
            ].map((service) => (
              <div
                key={service.name}
                className="rounded-lg border border-border bg-muted/50 p-4"
              >
                <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-semibold text-foreground">
                    {service.name}
                  </span>
                  {service.aka && (
                    <span className="text-xs text-muted-foreground">
                      ({service.aka})
                    </span>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {service.location}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/80">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 pl-11 text-[15px] font-medium leading-relaxed text-foreground/80">
            We do not sell your personal data to anyone. We do not share it with
            any organisations beyond those listed above.
          </p>
        </SectionCard>

        {/* 6. Cookies and tracking */}
        <SectionCard>
          <SectionHeading number="6" title="Cookies and tracking" />
          <p className="mb-4 pl-11 text-[15px] leading-relaxed text-foreground/80">
            Cookies are small text files placed on your device when you visit a
            website. We use three types:
          </p>
          <div className="overflow-x-auto pl-11">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="pb-3 pr-4 font-semibold text-foreground">Type</th>
                  <th className="pb-3 pr-4 font-semibold text-foreground">Purpose</th>
                  <th className="pb-3 font-semibold text-foreground">Consent required?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 pr-4 align-top">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      Essential
                    </span>
                  </td>
                  <td className="py-3 pr-4 align-top text-foreground/80">
                    Keep the website working properly (session management, security
                    preferences)
                  </td>
                  <td className="py-3 align-top text-foreground/80">
                    No &mdash; strictly necessary
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 align-top">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      Analytics
                    </span>
                  </td>
                  <td className="py-3 pr-4 align-top text-foreground/80">
                    Help us understand how visitors use the site (Google Analytics)
                  </td>
                  <td className="py-3 align-top text-foreground/80">
                    Yes &mdash; only set after you give consent
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 align-top">
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                      Marketing
                    </span>
                  </td>
                  <td className="py-3 pr-4 align-top text-foreground/80">
                    Track the effectiveness of our Facebook ads (Meta Pixel)
                  </td>
                  <td className="py-3 align-top text-foreground/80">
                    Yes &mdash; only set after you give consent
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-lg border-l-4 border-primary bg-primary/5 p-4 pl-4 text-[15px] leading-relaxed text-foreground/80 sm:ml-11">
            Analytics and marketing cookies will only load after you have given
            your explicit consent through our cookie banner. You can change your
            cookie preferences at any time.
          </p>
        </SectionCard>

        {/* 7. Your rights under UK GDPR */}
        <SectionCard>
          <SectionHeading number="7" title="Your rights" />
          <p className="mb-4 pl-11 text-[15px] leading-relaxed text-foreground/80">
            Under UK data protection law (UK GDPR), you have the following rights:
          </p>
          <div className="grid gap-2.5 pl-11 sm:grid-cols-2">
            {[
              {
                right: "Right of access",
                desc: "Ask for a copy of the personal data we hold about you",
              },
              {
                right: "Right to rectification",
                desc: "Ask us to correct any inaccurate or incomplete data",
              },
              {
                right: "Right to erasure",
                desc: "Ask us to delete your personal data",
              },
              {
                right: "Right to restrict processing",
                desc: "Ask us to limit how we use your data",
              },
              {
                right: "Right to data portability",
                desc: "Ask for your data in a commonly used, machine-readable format",
              },
              {
                right: "Right to object",
                desc: "Object to us processing your data in certain circumstances",
              },
              {
                right: "Right to withdraw consent",
                desc: "Withdraw consent at any time without affecting prior processing",
              },
              {
                right: "Right to complain",
                desc: "Make a complaint to the ICO if you are unhappy with how we handle your data",
              },
            ].map((item) => (
              <div
                key={item.right}
                className="rounded-lg border border-border p-3"
              >
                <p className="mb-0.5 text-sm font-semibold text-foreground">
                  {item.right}
                </p>
                <p className="text-[13px] leading-relaxed text-foreground/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 pl-11 text-[15px] leading-relaxed text-foreground/80">
            To exercise any of these rights, contact us at{" "}
            <strong className="text-foreground">[email to be confirmed]</strong>.
            We will respond within one month.
          </p>
        </SectionCard>

        {/* 8. Data retention */}
        <SectionCard>
          <SectionHeading number="8" title="How long we keep your data" />
          <div className="space-y-3 pl-11">
            {[
              {
                label: "Registration data",
                detail: "(name, email, phone)",
                desc: "Kept for 12 months after your last activity with us. After that, we delete it unless you have actively engaged with a new event.",
              },
              {
                label: "Analytics data",
                detail: null,
                desc: "Retained according to Google Analytics and Meta default retention periods (typically 14 months for GA4).",
              },
              {
                label: "Email marketing data",
                detail: null,
                desc: "Kept until you unsubscribe or ask us to delete it.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <strong className="text-foreground">{item.label}</strong>
                  {item.detail && (
                    <span className="text-muted-foreground"> {item.detail}</span>
                  )}
                  {" "}&mdash; {item.desc}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 pl-11 text-[15px] font-medium leading-relaxed text-foreground/80">
            You can request deletion of your data at any time.
          </p>
        </SectionCard>

        {/* 9. International transfers */}
        <SectionCard>
          <SectionHeading number="9" title="International data transfers" />
          <p className="mb-4 pl-11 text-[15px] leading-relaxed text-foreground/80">
            Some of the services we use are based outside the UK:
          </p>
          <div className="space-y-3 pl-11">
            <div className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">Brevo</strong> processes data
                within the European Union, which has an adequate level of data
                protection under UK law.
              </span>
            </div>
            <div className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">Meta</strong> and{" "}
                <strong className="text-foreground">Google</strong> are based in the
                United States. Transfers to the US are covered by the EU-US Data
                Privacy Framework, UK adequacy regulations, and Standard Contractual
                Clauses. These safeguards ensure your data receives a level of
                protection that is essentially equivalent to UK law.
              </span>
            </div>
            <div className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">Vercel</strong> is based in the
                United States and relies on Standard Contractual Clauses for data
                transfers.
              </span>
            </div>
          </div>
        </SectionCard>

        {/* 10. How to contact us */}
        <SectionCard>
          <SectionHeading number="10" title="How to contact us" />
          <div className="space-y-3 pl-11 text-[15px] leading-relaxed text-foreground/80">
            <p>
              If you have questions about this privacy policy or want to exercise
              your data rights, contact us at{" "}
              <strong className="text-foreground">[email to be confirmed]</strong>.
            </p>
            <p>
              If you are not satisfied with our response, you have the right to
              complain to the Information Commissioner&apos;s Office (ICO):
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="mb-1 text-sm font-semibold text-foreground">
                Information Commissioner&apos;s Office (ICO)
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  ico.org.uk/make-a-complaint
                </a>
              </p>
              <p>Telephone: 0303 123 1113</p>
            </div>
          </div>
        </SectionCard>

        {/* 11. Changes to this policy */}
        <SectionCard>
          <SectionHeading number="11" title="Changes to this policy" />
          <p className="pl-11 text-[15px] leading-relaxed text-foreground/80">
            We may update this privacy policy from time to time. When we make
            changes, we will update the &quot;Last updated&quot; date at the top of
            this page. We encourage you to check this page periodically for any
            updates.
          </p>
        </SectionCard>
      </div>
    </article>
  )
}
