"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js and Stripe integration. This project includes user authentication, product management, shopping cart functionality, and secure payment processing. The admin dashboard allows for easy product and order management with real-time analytics. The responsive design ensures a seamless shopping experience across all devices. The platform also includes features like wishlist, product reviews, and personalized recommendations based on user browsing history.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates. Users can create projects, assign tasks, set deadlines, and track progress. The app features a drag-and-drop interface for easy task organization and prioritization. It also includes notification systems to keep team members updated on task changes and approaching deadlines.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["React", "Firebase", "Material UI"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A weather dashboard that provides current conditions and forecasts for any location. The app uses geolocation to automatically detect the user's location and displays relevant weather information. Users can also search for weather data in different cities and save their favorite locations for quick access.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["JavaScript", "OpenWeather API", "Chart.js"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing my projects and skills. The site features a clean, modern design with smooth animations and transitions. It's built with accessibility in mind and optimized for performance across all devices.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
]

export default function Work() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="work" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Work.</h2>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted py-2 px-4 border-b flex items-center gap-4">
          <span className="font-medium">Project</span>
          <span className="font-medium ml-auto hidden md:block">Tags</span>
          <span className="w-24 text-center font-medium hidden md:block">Links</span>
        </div>
        <div className="divide-y">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div
                className="flex items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleExpand(project.id)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-1">
                      {project.description}
                      {!expandedId && project.description.length > 100 && (
                        <button
                          className="text-primary font-medium ml-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleExpand(project.id)
                          }}
                        >
                          See more
                        </button>
                      )}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex gap-2 flex-wrap max-w-[200px] justify-end">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-muted px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {project.github && (
                    <Button variant="ghost" size="icon" asChild onClick={(e) => e.stopPropagation()}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button variant="ghost" size="icon" asChild onClick={(e) => e.stopPropagation()}>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    </Button>
                  )}
                  {expandedId === project.id ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              {expandedId === project.id && (
                <div className="p-4 pt-0 bg-muted/20">
                  <div className="flex md:hidden gap-2 flex-wrap mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-muted px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

