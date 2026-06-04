"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { socialLinks } from "@/lib/social-links"

export default function Hero() {
  const [greeting, setGreeting] = useState("Hello")
  const greetings = ["Hello", "Halo", "哈喽"]
  const currentGreetingIndex = useRef(0)
  const isDeleting = useRef(false)

  // Adjustable speeds (in milliseconds)
  const [typingSpeed, setTypingSpeed] = useState({
    typing: 150, // Time between adding characters
    deleting: 75, // Time between removing characters
    pauseBeforeDelete: 1500, // Pause time after completing a word
    pauseBeforeType: 500, // Pause time after deleting a word
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const typeEffect = () => {
      const currentGreeting = greetings[currentGreetingIndex.current]

      if (isDeleting.current) {
        // Deleting text
        if (greeting.length > 0) {
          setGreeting((prev) => prev.slice(0, -1))
          timeout = setTimeout(typeEffect, typingSpeed.deleting) // Faster when deleting
        } else {
          // Finished deleting
          isDeleting.current = false
          currentGreetingIndex.current = (currentGreetingIndex.current + 1) % greetings.length
          timeout = setTimeout(typeEffect, typingSpeed.pauseBeforeType)
        }
      } else {
        // Typing text
        if (greeting.length < currentGreeting.length) {
          setGreeting((prev) => currentGreeting.slice(0, prev.length + 1))

          // Randomize typing speed slightly to make it look more human
          const randomVariation = Math.random() * 50 - 25 // ±25ms variation
          timeout = setTimeout(typeEffect, typingSpeed.typing + randomVariation)
        } else {
          // Finished typing
          isDeleting.current = true
          timeout = setTimeout(typeEffect, typingSpeed.pauseBeforeDelete)
        }
      }
    }

    timeout = setTimeout(typeEffect, 1000) // Initial delay

    return () => clearTimeout(timeout)
  }, [greeting, typingSpeed])

  return (
    <section className="py-20 md:py-32">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl md:text-8xl font-bold">
          <span id="greeting" className="inline-block min-w-[180px]">
            {greeting}
          </span>{" "}
          <span className="inline-block animate-wave origin-bottom-right">👋</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
          I build practical web products that solve real workflow problems, from high-traffic student platforms to
          full-stack tools with analytics, automation, and clean UX.
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
          Computer Science student open to full-time Software Engineer / Data Scientist roles from Aug/Nov 2026.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Link
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View Resume
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            See Projects
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href={socialLinks.email} target="_blank" rel="noopener noreferrer">
            <Mail className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

