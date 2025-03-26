"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#work" className="text-sm font-medium hover:text-primary">
            Work
          </Link>
          <Link href="/#about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Resume
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
          <Button variant="ghost" size="icon" aria-label="Toggle Theme" className="rounded-full" onClick={toggleTheme}>
            {mounted && (theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />)}
          </Button>
        </nav>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" aria-label="Toggle Theme" className="rounded-full" onClick={toggleTheme}>
            {mounted && (theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />)}
          </Button>
        </div>
      </div>
    </header>
  )
}

