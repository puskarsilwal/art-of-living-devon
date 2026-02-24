import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal data.",
}

export default function PrivacyPolicyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-primary prose-a:underline-offset-4">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: 24 February 2026</p>

        {/* 1. Who we are */}
        <h2>1. Who we are</h2>
        <p>
          We are <strong>Art of Living Devon &amp; Southwest</strong>, a
          community group that organises free introductory talks, breathing
          workshops, meditation sessions, and yoga courses across Devon and
          Southwest England.
        </p>
        <p>
          We are the data controller for the personal information we collect
          through this website. If you have any questions about how we handle
          your data, you can contact us at{" "}
          <strong>[email to be confirmed]</strong>.
        </p>

        {/* 2. What data we collect */}
        <h2>2. What data we collect</h2>
        <p>We may collect the following information about you:</p>
        <ul>
          <li>
            <strong>Name</strong> — so we know who is attending our events
          </li>
          <li>
            <strong>Email address</strong> — so we can send you event details,
            Zoom links, and reminders
          </li>
          <li>
            <strong>Phone number</strong> (optional) — only if you choose to
            provide it, for event-related communications
          </li>
          <li>
            <strong>Website usage data</strong> — pages you visit, time spent on
            the site, and how you arrived here (for example, from a Facebook ad)
          </li>
          <li>
            <strong>Cookie data</strong> — small files stored on your device to
            help the site work and to understand how people use it
          </li>
        </ul>

        {/* 3. Why we collect it (lawful basis) */}
        <h2>3. Why we collect it</h2>
        <p>
          Under UK data protection law, we need a lawful reason to collect and
          use your personal data. We rely on the following:
        </p>
        <ul>
          <li>
            <strong>Consent</strong> — for sending you marketing emails about
            future courses and events, and for setting analytics and marketing
            cookies on your device. You can withdraw your consent at any time.
          </li>
          <li>
            <strong>Legitimate interest</strong> — for event administration,
            such as sending you the Zoom link after you register, event
            reminders, and follow-up information directly related to an event you
            signed up for.
          </li>
        </ul>
        <p>
          When we ask for your consent (for example, on a registration form or
          cookie banner), the checkbox will always be unticked by default. We
          will never assume you agree — you must actively opt in.
        </p>

        {/* 4. How we use your data */}
        <h2>4. How we use your data</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process your event registrations</li>
          <li>Send you Zoom links and event reminders</li>
          <li>
            Follow up with information about Art of Living courses (only with
            your consent)
          </li>
          <li>
            Understand how people use our website so we can improve it (using
            anonymous analytics)
          </li>
          <li>
            Measure the effectiveness of our Facebook advertising campaigns
          </li>
        </ul>

        {/* 5. Third-party processors */}
        <h2>5. Who we share your data with</h2>
        <p>
          We use a small number of trusted services to help run our website and
          events. Each one only receives the data it needs:
        </p>
        <ul>
          <li>
            <strong>Brevo</strong> (formerly Sendinblue) — handles our email
            communications. Brevo processes your name and email address to send
            event confirmations and, where you have consented, marketing emails.
            Brevo stores data on servers in the European Union.
          </li>
          <li>
            <strong>Meta (Facebook Pixel)</strong> — helps us understand how
            visitors from our Facebook ads interact with the website. It tracks
            actions like visiting a page or completing a registration form. Meta
            is based in the United States and processes data under adequate
            safeguards (see Section 9).
          </li>
          <li>
            <strong>Google Analytics 4</strong> — provides anonymous website
            usage statistics such as which pages are most visited and how
            visitors found us. Google is based in the United States and processes
            data under adequate safeguards (see Section 9).
          </li>
          <li>
            <strong>Vercel</strong> — hosts this website. Vercel processes
            server logs (IP addresses, page requests) as part of normal website
            hosting. Vercel is based in the United States.
          </li>
        </ul>
        <p>
          We do not sell your personal data to anyone. We do not share it with
          any organisations beyond those listed above.
        </p>

        {/* 6. Cookies and tracking */}
        <h2>6. Cookies and tracking</h2>
        <p>
          Cookies are small text files placed on your device when you visit a
          website. We use three types:
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Purpose</th>
                <th>Consent required?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Essential</strong>
                </td>
                <td>
                  Keep the website working properly (session management, security
                  preferences)
                </td>
                <td>No — these are strictly necessary</td>
              </tr>
              <tr>
                <td>
                  <strong>Analytics</strong>
                </td>
                <td>
                  Help us understand how visitors use the site (Google Analytics)
                </td>
                <td>Yes — only set after you give consent</td>
              </tr>
              <tr>
                <td>
                  <strong>Marketing</strong>
                </td>
                <td>
                  Track the effectiveness of our Facebook ads (Meta Pixel)
                </td>
                <td>Yes — only set after you give consent</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Analytics and marketing cookies will only load after you have given
          your explicit consent through our cookie banner. You can change your
          cookie preferences at any time.
        </p>

        {/* 7. Your rights under UK GDPR */}
        <h2>7. Your rights</h2>
        <p>
          Under UK data protection law (UK GDPR), you have the following rights:
        </p>
        <ul>
          <li>
            <strong>Right of access</strong> — you can ask for a copy of the
            personal data we hold about you
          </li>
          <li>
            <strong>Right to rectification</strong> — you can ask us to correct
            any inaccurate or incomplete data
          </li>
          <li>
            <strong>Right to erasure</strong> — you can ask us to delete your
            personal data
          </li>
          <li>
            <strong>Right to restrict processing</strong> — you can ask us to
            limit how we use your data
          </li>
          <li>
            <strong>Right to data portability</strong> — you can ask for your
            data in a commonly used, machine-readable format
          </li>
          <li>
            <strong>Right to object</strong> — you can object to us processing
            your data in certain circumstances
          </li>
          <li>
            <strong>Right to withdraw consent</strong> — where we rely on your
            consent, you can withdraw it at any time. This does not affect the
            lawfulness of any processing carried out before you withdrew consent.
          </li>
          <li>
            <strong>Right to complain</strong> — you can make a complaint to the
            Information Commissioner&apos;s Office (ICO) if you are unhappy with
            how we handle your data
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <strong>[email to be confirmed]</strong>. We will respond within one
          month.
        </p>

        {/* 8. Data retention */}
        <h2>8. How long we keep your data</h2>
        <ul>
          <li>
            <strong>Registration data</strong> (name, email, phone) — kept for
            12 months after your last activity with us. After that, we delete it
            unless you have actively engaged with a new event.
          </li>
          <li>
            <strong>Analytics data</strong> — retained according to Google
            Analytics and Meta default retention periods (typically 14 months for
            GA4).
          </li>
          <li>
            <strong>Email marketing data</strong> — kept until you unsubscribe
            or ask us to delete it.
          </li>
        </ul>
        <p>You can request deletion of your data at any time.</p>

        {/* 9. International transfers */}
        <h2>9. International data transfers</h2>
        <p>Some of the services we use are based outside the UK:</p>
        <ul>
          <li>
            <strong>Brevo</strong> processes data within the European Union,
            which has an adequate level of data protection under UK law.
          </li>
          <li>
            <strong>Meta</strong> and <strong>Google</strong> are based in the
            United States. Transfers to the US are covered by the EU-US Data
            Privacy Framework, UK adequacy regulations, and Standard Contractual
            Clauses. These safeguards ensure your data receives a level of
            protection that is essentially equivalent to UK law.
          </li>
          <li>
            <strong>Vercel</strong> is based in the United States and relies on
            Standard Contractual Clauses for data transfers.
          </li>
        </ul>

        {/* 10. How to contact us */}
        <h2>10. How to contact us</h2>
        <p>
          If you have questions about this privacy policy or want to exercise
          your data rights, contact us at{" "}
          <strong>[email to be confirmed]</strong>.
        </p>
        <p>
          If you are not satisfied with our response, you have the right to
          complain to the Information Commissioner&apos;s Office (ICO):
        </p>
        <ul>
          <li>
            Website:{" "}
            <a
              href="https://ico.org.uk/make-a-complaint/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk/make-a-complaint
            </a>
          </li>
          <li>Telephone: 0303 123 1113</li>
        </ul>

        {/* 11. Changes to this policy */}
        <h2>11. Changes to this policy</h2>
        <p>
          We may update this privacy policy from time to time. When we make
          changes, we will update the &quot;Last updated&quot; date at the top of
          this page. We encourage you to check this page periodically for any
          updates.
        </p>
      </div>
    </article>
  )
}
