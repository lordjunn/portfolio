"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define skill categories with proficiency levels
const skillCategories = {
  frontend: {
    title: "Frontend",
    description: "Client-side technologies and frameworks",
    skills: [
      { name: "React", level: "Advanced", years: 3 },
      { name: "Next.js", level: "Advanced", years: 2 },
      { name: "TypeScript", level: "Intermediate", years: 2 },
      { name: "Tailwind CSS", level: "Advanced", years: 2 },
      { name: "HTML/CSS", level: "Advanced", years: 4 },
      { name: "JavaScript", level: "Advanced", years: 4 },
      { name: "Vue.js", level: "Beginner", years: 0.5 },
    ],
  },
  backend: {
    title: "Backend",
    description: "Server-side technologies and databases",
    skills: [
      { name: "Node.js", level: "Intermediate", years: 2 },
      { name: "Express", level: "Intermediate", years: 2 },
      { name: "Python", level: "Advanced", years: 3 },
      { name: "Flask", level: "Intermediate", years: 1 },
      { name: "Supabase", level: "Intermediate", years: 1 },
      { name: "PostgreSQL", level: "Beginner", years: 0.5 },
      { name: "SQLite", level: "Intermediate", years: 2 },
    ],
  },
  languages: {
    title: "Programming Languages",
    description: "Core programming languages I work with",
    skills: [
      { name: "JavaScript", level: "Advanced", years: 4 },
      { name: "TypeScript", level: "Intermediate", years: 2 },
      { name: "Python", level: "Advanced", years: 3 },
      { name: "Java", level: "Intermediate", years: 2 },
      { name: "C++", level: "Intermediate", years: 2 },
      { name: "C", level: "Beginner", years: 1 },
    ],
  },
  tools: {
    title: "Tools & Platforms",
    description: "Development tools and platforms",
    skills: [
      { name: "Git/GitHub", level: "Advanced", years: 3 },
      { name: "VS Code", level: "Advanced", years: 4 },
      { name: "Figma", level: "Intermediate", years: 1 },
      { name: "Vercel", level: "Intermediate", years: 2 },
      { name: "PythonAnywhere", level: "Beginner", years: 0.5 },
      { name: "Cisco Packet Tracer", level: "Intermediate", years: 1 },
    ],
  },
  concepts: {
    title: "Concepts & Methodologies",
    description: "Software development concepts and practices",
    skills: [
      { name: "Responsive Design", level: "Advanced", years: 3 },
      { name: "RESTful APIs", level: "Intermediate", years: 2 },
      { name: "Object-Oriented Programming", level: "Advanced", years: 3 },
      { name: "Data Structures & Algorithms", level: "Intermediate", years: 2 },
      { name: "Version Control", level: "Advanced", years: 3 },
      { name: "Agile Development", level: "Beginner", years: 1 },
    ],
  },
}

// Helper function to get level color
const getLevelColor = (level: string) => {
  switch (level) {
    case "Advanced":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Beginner":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function About() {
  const [activeView, setActiveView] = useState<"simple" | "detailed">("simple")

  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl font-bold mb-8">About.</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-lg mb-4">
            Hi there! I'm a passionate Computer Science student with expertise in building modern, responsive, and
            user-friendly applications.
          </p>
          <p className="text-lg mb-4">
            With several years of experience in the field, I've worked on a variety of projects ranging from University
            to Personal projects. I specialize in front-end development using React and Next.js, but I'm also
            comfortable working with back-end technologies.
          </p>
          <p className="text-lg">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
            enjoying indoor activities.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Skills</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView("simple")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeView === "simple"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Simple
              </button>
              <button
                onClick={() => setActiveView("detailed")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeView === "detailed"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Detailed
              </button>
            </div>
          </div>

          {activeView === "simple" ? (
            // Simple grid view (original layout)
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(skillCategories)
                .slice(0, 4)
                .map(([key, category]) => (
                  <div key={key}>
                    <h4 className="font-medium mb-2">{category.title}</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      {category.skills.slice(0, 4).map((skill) => (
                        <li key={skill.name}>{skill.name}</li>
                      ))}
                      {category.skills.length > 4 && (
                        <li className="text-xs text-muted-foreground/70">+{category.skills.length - 4} more</li>
                      )}
                    </ul>
                  </div>
                ))}
            </div>
          ) : (
            // Detailed tabbed view
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-4">
                {Object.entries(skillCategories).map(([key, category]) => (
                  <TabsTrigger key={key} value={key} className="text-xs">
                    {category.title.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(skillCategories).map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-3">{category.description}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={`text-xs ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{skill.years}y</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>

      {/* Optional: Skills overview cards */}
      {activeView === "detailed" && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Skills Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skillCategories).map(([key, category]) => (
              <Card key={key} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {category.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill.name} variant="outline" className="text-xs">
                        {skill.name}
                      </Badge>
                    ))}
                    {category.skills.length > 6 && (
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        +{category.skills.length - 6}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
