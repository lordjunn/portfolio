import type { Metadata } from "next"
import Link from "next/link"
import { socialLinks } from "@/lib/social-links"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Junn Kit's personal portfolio website.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  const effectiveDate = "20 September 2026"

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Effective date: {effectiveDate}</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            This is the personal portfolio website of Junn Kit. I take your privacy seriously.
            This page explains what personal data is collected through this site, why it is collected,
            and how it is handled. This site has no user accounts, no subscriptions, no purchases,
            and no advertising.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. What Data is Collected</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The only personal data collected on this site comes from the <strong>contact form</strong>.
            When you submit a message, the following information is collected:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
            <li>Your name</li>
            <li>Your email address</li>
            <li>Your message</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            No other data (device info, IP address, location, browsing behaviour) is collected,
            stored, or processed by this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Why It is Collected</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your contact details are collected <strong>solely to read and reply to your message</strong>.
            They are not used for marketing, advertising, profiling, or any automated decision-making.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. How It is Stored</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your submission is <strong>not stored in any database</strong>. When you submit the contact form,
            the message is delivered as an email directly to my private Gmail inbox via Gmail's mail delivery
            service. It is retained only for as long as needed to respond to your inquiry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Third Parties</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            This site uses the following third-party services. None of them receive your contact form data
            for any purpose other than what is described below:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
            <li>
              <strong>Vercel</strong> — hosts and serves this website. Subject to{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Vercel's Privacy Policy
              </a>.
            </li>
            <li>
              <strong>Google / Gmail</strong> — used to deliver contact form submissions to my inbox. Subject to{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Google's Privacy Policy
              </a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Cookies & Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            This site <strong>does not use cookies</strong>, analytics scripts, advertising pixels,
            or any other tracking technology. No data about your visit is collected or shared
            with any analytics provider.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Your Rights (Malaysia PDPA 2010)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Under Malaysia's Personal Data Protection Act 2010 (PDPA), you have the right to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
            <li>Request access to personal data I hold about you</li>
            <li>Request correction of any inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Withdraw consent for the use of your personal data</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            To exercise any of these rights, please contact me directly by email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For any privacy-related questions or requests, you may reach me at:{" "}
            <a
              href={socialLinks.email}
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              ljunnkit5@gmail.com
            </a>
          </p>
        </section>

        <div className="border-t pt-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
