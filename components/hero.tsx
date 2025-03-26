import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl md:text-8xl font-bold">
          Hello <span className="inline-block animate-wave origin-bottom-right">👋</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
          I'm a developer passionate about creating beautiful and functional web experiences.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Link href="https://github.com/LordJunn/" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/junn-kit-735485245/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:ljunnkit5@gmail.com" target="_blank" rel="noopener noreferrer">
            <Mail className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

