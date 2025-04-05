"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, ChevronRight, ExternalLink, Github, Search, ChevronLeft, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[] // Tech stack tags (HTML, CSS, JavaScript, etc.)
  projectType: string[] // Project type tags (solo, team, university, etc.)
  github?: string
  website?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Study with Junn",
    description:
      "Developed a website that stores educational materials that I have done, which has benefited my entire intake of 600+ students and others to score higher and better. Applicable to other universities as well.",
    image:
      "/Work/Exams.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Study-With-Junn",
    website: "https://lordjunn.github.io/Study-With-Junn/index.html",
  },
  {
    id: 2,
    title: "Food",
    description: "One of my earliest websites. Shows food options on campus, and some reviews of food I had.",
    image:
      "https://preview.redd.it/whats-son-gokus-favorite-dish-ive-always-loved-the-variety-v0-c4z2a45ke4jb1.jpg?width=736&format=pjpg&auto=webp&s=dd25b7826bd1279637a7feeee8d5bbf5439bf6e5",
    tags: ["HTML", "CSS", "JavaScript"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Food-MMU",
    website: "https://lordjunn.github.io/Food-MMU/",
  },
  {
    id: 3,
    title: "Webstack Trio",
    description:
      "A website that hosts all my other mini projects, including Tic Tac Toe, Maze, Tower Defense, Wordle, Calculator, Currency Exchanger, and other fun interactive games and useful utilities.",
    image: "https://imakestuff.online/wp-content/uploads/2019/12/HTML-CSS-JS-Logo-600x619.png",
    tags: ["HTML", "CSS", "JavaScript", "APIs"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Webstack-Trio",
    website: "https://lordjunn.github.io/Webstack-Trio/",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with Next.js and TypeScript, featuring a responsive design, dark/light mode toggle, and an integrated blog system with Markdown support. The site showcases my projects, skills, and writing in a clean, accessible interface. It includes project filtering, smooth animations, and optimized performance across all devices.",
    image: "https://i.pinimg.com/736x/27/8f/89/278f8911cd0bb929a45209f749096358.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Markdown"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/portfolio",
    website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 5,
    title: "Introduction to Italy",
    description:
      "One of my earliest group assignments. Led a group of 4 to introduce the countrys attractions, transportation, gastronomy and other things a tourist would like to know.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png",
    tags: ["HTML", "CSS"],
    projectType: ["Team Lead", "University"],
    github: "https://github.com/LordJunn/portfolio",
    website: "https://lordjunn.github.io/italy/",
  },
  {
    id: 6,
    title: "Restaurant CRUD CLI App",
    description:
      "Led a group of 4 to create a mini Python CLI application that simulates a restaurant backend, such as receiving orders, setting food availability, checkout and other functions.",
    image: "https://static.vecteezy.com/system/resources/previews/011/943/265/non_2x/pixel-art-wooden-table-with-chairs-and-food-tray-icon-for-8bit-game-on-white-background-vector.jpg",
    tags: ["Python", "CLI"],
    projectType: ["Team Lead", "University"],
    //github: "https://github.com/LordJunn/portfolio",
    //website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 7,
    title: "Restaurant CRUD Flask App",
    description:
      "Contributed to a group of 4 to create a Flask application that simulates both a restaurant frontend and backend.",
    image: "https://www.shutterstock.com/image-vector/cafeteria-chair-table-coffee-pot-600nw-2063937668.jpg",
    tags: ["Flask"],
    projectType: ["Team", "University"],
    //github: "https://github.com/LordJunn/portfolio",
    //website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 8,
    title: "Assembly code intepreter CLI",
    description: "Contributed to a group of 4 to create an ASM code intepreter based on CLI.",
    image: "https://static-00.iconduck.com/assets.00/assembly-icon-2048x2048-wspx42mf.png",
    tags: ["C++", "CLI"],
    projectType: ["Team", "University"],
    //github: "https://github.com/LordJunn/portfolio",
    //website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 9,
    title: "Robocop 5000",
    description: "Contributed to a group of 6 to create a 'Robot War' simulator using OOP & DS concepts.",
    image: "https://cdn.dribbble.com/userupload/11728109/file/original-5b23dc8c17dbdd997f330778d2e13f84.jpg?resize=1600x1200",
    tags: ["C++", "CLI"],
    projectType: ["Team", "University"],
    //github: "https://github.com/LordJunn/portfolio",
    //website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 10,
    title: "Kwazam Chess",
    description:
      "Contributed to a group of 4 to create a special Chess game with load & save functions with special pieces.",
    image: "/placeholder.svg",
    tags: ["Java"],
    projectType: ["Team", "University"],
    //github: "https://github.com/LordJunn/portfolio",
    //website: "https://junn-portfolio.vercel.app/",
  },
]

export default function Work() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [startIndex, setStartIndex] = useState(0)

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.projectType.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Ensure startIndex is valid when filtered projects change
  useEffect(() => {
    if (startIndex > filteredProjects.length - 1) {
      setStartIndex(Math.max(0, filteredProjects.length - 1))
    }
  }, [filteredProjects, startIndex])

  const visibleProjects = filteredProjects.slice(startIndex, Math.min(startIndex + 3, filteredProjects.length))

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(filteredProjects.length - 3, startIndex + 1))
  }

  return (
    <section id="work" className="py-16">
      <h2 className="text-3xl font-bold mb-4">Work.</h2>
      <p className="mb-6">These are the things I done, sorted by personal, followed by team.</p>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted py-2 px-4 border-b flex items-center gap-4">
          <span className="font-medium">Projects</span>
          <span className="font-medium ml-auto hidden md:block">Project Type</span>
          <span className="w-24 text-center font-medium hidden md:block">Links</span>
        </div>

        {filteredProjects.length > 0 ? (
          <>
            <div className="divide-y">
              {visibleProjects.map((project) => (
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
                          {!expandedId && project.description.length > 1000 && (
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
                      {project.projectType.map((type) => (
                        <span key={type} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          {type}
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
                      {project.website && (
                        <Button variant="ghost" size="icon" asChild onClick={(e) => e.stopPropagation()}>
                          <a href={project.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Live website</span>
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
                      {/* Show project type tags on mobile */}
                      <div className="flex md:hidden gap-2 flex-wrap mb-3">
                        {project.projectType.map((type) => (
                          <span key={type} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                            {type}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      {/* Tech stack tags now appear below the description */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="bg-muted px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation controls */}
            {filteredProjects.length > 3 && (
              <div className="flex justify-between items-center p-3 border-t bg-muted/20">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + 3, filteredProjects.length)} of{" "}
                  {filteredProjects.length}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevious} disabled={startIndex === 0}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={startIndex >= filteredProjects.length - 3}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No projects found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}

