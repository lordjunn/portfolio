import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import "./globals.css"
import "./highlight.css" // Add this line after your globals.css import

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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



import './globals.css'