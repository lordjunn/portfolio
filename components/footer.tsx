import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  // Manually set your last updated date here
  const lastUpdated = "6th July, 2025" // Update this whenever you make changes

  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="relative group">
              <p className="text-sm text-muted-foreground cursor-help">
                © {currentYear} Portfolio. All rights reserved.
              </p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md shadow-md border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Last updated: {lastUpdated}
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-popover"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
      </div>
    </footer>
  )
}
