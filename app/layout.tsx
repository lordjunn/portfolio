import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import "./globals.css"
import "./highlight.css" // Import highlight.js CSS

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://junn-portfolio.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Junn Kit | Software Engineer Portfolio",
    template: "%s | Junn Kit",
  },
  description:
    "Portfolio of Junn Kit, a Computer Science student building practical full-stack web products with Next.js, TypeScript, Python, and SQL.",
  keywords: [
    "Junn Kit",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Junn Kit" }],
  creator: "Junn Kit",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Junn Kit | Software Engineer Portfolio",
    description:
      "Computer Science student building practical products with modern web technologies and measurable impact.",
    siteName: "Junn Kit Portfolio",
    images: [
      {
        url: "/ProfilePictures/ProfilePicture.jpg",
        width: 1200,
        height: 630,
        alt: "Junn Kit Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junn Kit | Software Engineer Portfolio",
    description:
      "Computer Science student building practical products with modern web technologies and measurable impact.",
    images: ["/ProfilePictures/ProfilePicture.jpg"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Junn Kit",
      url: siteUrl,
      jobTitle: "Software Engineer",
      sameAs: ["https://github.com/LordJunn/", "https://www.linkedin.com/in/junn-kit-735485245/"],
    },
    {
      "@type": "WebSite",
      name: "Junn Kit Portfolio",
      url: siteUrl,
      inLanguage: "en",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" storageKey="portfolio-theme">
          <div className="min-h-screen bg-background">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

