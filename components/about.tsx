"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const skillCategories = {
  frontend: {
    title: "Frontend",
    description: "Client-side technologies and frameworks",
    skills: [
      { name: "React", level: "Beginner", years: 1 },
      { name: "Next.js", level: "Beginner", years: 1 },
      { name: "TypeScript", level: "Beginner", years: 1 },
      { name: "Tailwind CSS", level: "Beginner", years: 1 },
      { name: "HTML", level: "Proficient", years: 3 },
      { name: "CSS", level: "Proficient", years: 3 },
      { name: "Jinja2 Templates", level: "Beginner", years: 0.5 },
    ],
  },

  backend: {
    title: "Backend",
    description: "Server-side technologies and databases",
    skills: [
      { name: "Node.js", level: "Beginner", years: 2 },
      { name: "Express", level: "Beginner", years: 2 },
      { name: "Flask", level: "Beginner", years: 1 },
      { name: "Supabase", level: "Beginner", years: 1 },
      { name: "PostgreSQL", level: "Beginner", years: 0.5 },
      { name: "SQLite", level: "Beginner", years: 2 },
      { name: "MySQL", level: "Beginner", years: 0.5 },
      { name: "SQL Server", level: "Beginner", years: 0.5 },
    ],
  },

  programming: {
    title: "Programming Languages",
    description: "Core programming languages I work with",
    skills: [
      { name: "JavaScript", level: "Proficient", years: 3 },
      { name: "Python", level: "Proficient", years: 3 },
      { name: "Java", level: "Beginner", years: 2 },
      { name: "C++", level: "Beginner", years: 2 },
      { name: "R", level: "Beginner", years: 1 },
      { name: "C#", level: "Beginner", years: 0.5 },
      { name: "AutoHotkey (AHK)", level: "Intermediate", years: 4 },
    ],
  },

  tools: {
    title: "Tools & Platforms",
    description: "Development tools and environments",
    skills: [
      { name: "Git / GitHub", level: "Intermediate", years: 5 },
      { name: "Visual Studio Code", level: "Proficient", years: 3 },
      { name: "Visual Studio", level: "Beginner", years: 0.5 },
      { name: "SQL Server Management Studio", level: "Beginner", years: 0.5 },
      { name: "MySQL Workbench", level: "Novice", years: 0.5 },
      { name: "Power BI", level: "Beginner", years: 0.3 },
      { name: "Figma", level: "Beginner", years: 2 },
      { name: "Canva", level: "Intermediate", years: 3 },
      { name: "Vercel", level: "Beginner", years: 1 },
      { name: "Netlify", level: "Novice", years: 1 },
      { name: "PythonAnywhere", level: "Novice", years: 1 },
      { name: "Cisco Packet Tracer", level: "Novice", years: 1 },
      { name: "Jupyter Notebook", level: "Beginner", years: 1 },
      { name: "Anaconda", level: "Beginner", years: 1 },
      { name: "AutoCount", level: "Beginner", years: 0.5 },
      { name: "Zoho Bigin", level: "Novice", years: 0.3 },
      { name: "Streamlit", level: "Beginner", years: 0.1 },
    ],
  },

  concepts: {
    title: "Concepts & Methodologies",
    description: "Software development concepts and practices",
    skills: [
      { name: "Responsive Design", level: "Beginner", years: 3 },
      { name: "RESTful APIs", level: "Beginner", years: 1 },
      { name: "Object-Oriented Programming (OOP)", level: "Beginner", years: 2 },
      { name: "Data Structures & Algorithms", level: "Beginner", years: 1 },
      { name: "SQL Scripting", level: "Beginner", years: 1 },
      { name: "Automation / Scripting", level: "Intermediate", years: 4 },
      { name: "System Integration", level: "Novice", years: 0.5 },
      { name: "Software Testing", level: "Novice", years: 0.5 },
      { name: "Version Control & Branching", level: "Intermediate", years: 3 },
      { name: "Reporting & Data Visualization", level: "Beginner", years: 0.5 },
    ],
  },

  languages: {
    title: "Languages",
    description: "Human languages that I can speak and understand",
    skills: [
      { name: "English", level: "Advanced" },
      { name: "Malay", level: "Proficient" },
      { name: "Chinese (Mandarin)", level: "Intermediate" },
      { name: "Chinese (Cantonese)", level: "Advanced" },
    ],
  },
}


// Helper function to get level color
const getLevelColor = (level: string) => {
  switch (level) {
    case "Novice":
      return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"
    case "Beginner":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Proficient":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "Advanced":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Expert":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
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
            user-friendly applications. Eventually looking for a Full Time Job around October 2026.
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
            // Detailed tabbed view with responsive grid
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-6 mb-4 h-auto p-1 gap-1">
                {Object.entries(skillCategories).map(([key, category]) => (
                  <TabsTrigger key={key} value={key} className="text-xs px-2 py-2 h-auto whitespace-nowrap">
                    {category.title.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(skillCategories).map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-3">{category.description}</h4>
                    <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                      <div className="grid grid-cols-1 gap-2">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex items-center justify-between p-2 rounded-md bg-muted/30"
                          >
                            <span className="font-medium text-sm">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className={`text-xs ${getLevelColor(skill.level)}`}>
                                {skill.level}
                              </Badge>
                              {skill.years && <span className="text-xs text-muted-foreground">{skill.years}y</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {category.skills.length > 6 && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Scroll to see all {category.skills.length} skills
                      </p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </section>
  )
}
