"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Github,
  Search,
  ChevronLeft,
  ChevronRightIcon,
  Award,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  description: string
  image: string
  credential?: string
}

interface Experience {
  id: number
  title: string
  organization?: string // Made organization optional
  role?: string // Role is optional
  period: string
  description: string
  image: string
}

/*
  {
    id: 1,
    title: "duh",
    description:
      "desc here, use `` for longer descs",
    image:
      "/placeholder.svg?height=400&width=400",
    tags: ["HTML", "CSS", "JavaScript"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Study-With-Junn",
    website: "https://lordjunn.github.io/Study-With-Junn/index.html",
  },
*/

const projects: Project[] = [
  {
  id: 1,
  title: "Study with Junn ⭐",
  description: `Built and maintain a centralized academic resource platform used by 1,000+ students across multiple universities.

  I designed the information architecture for notes, course modules, and exam formats so students can find revision materials quickly without jumping across fragmented channels.

  The site is a lightweight, mobile-friendly static build with fast load times and reliable cross-device performance.

  Impact (Google Search Console, 25 Dec 2024 - 22 Apr 2026):
  - 1.84K clicks and 6.17K impressions
  - 29.8% average CTR
  - 5.6 average ranking position`,
  image: "/Work/Exams.jpg",
  tags: ["HTML", "CSS", "JavaScript", "Education", "Content Architecture"],
  projectType: ["Solo", "Personal"],
  github: "https://github.com/LordJunn/Study-With-Junn",
  website: "https://lordjunn.github.io/Study-With-Junn/index.html",
  },
  {
  id: 2,
  title: "Dine with Junn",
  description: `Started as a personal food journal and evolved into a searchable, CSV-powered meal tracking platform.

  Built features for filtering, sorting, and monthly price trend visualizations to turn daily logs into usable spending insights.

  This project demonstrates how I turn a simple personal pain point into a practical product with data-backed utility.`,
  image: "/Work/Food.png",
  tags: ["HTML", "CSS", "JavaScript", "CSV"],
  projectType: ["Solo", "Personal"],
  github: "https://github.com/LordJunn/Food-MMU",
  website: "https://lordjunn.github.io/Food-MMU/",
  },
  {
    id: 3,
    title: "Webstack Trio",
    description: `Built a mini-project hub that consolidates interactive games and utility tools in one place.

      The platform includes browser games (Tic-Tac-Toe, Maze, 2048 variant, Tower Defense, Wordle-style game, Snake) and practical utilities (scientific calculator, music player, multi-currency converter).

      This project highlights front-end experimentation, UI state handling, and rapid feature delivery across many small products.`,
    image: "/Work/Trio.png",
    tags: ["HTML", "CSS", "JavaScript", "APIs"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Webstack-Trio",
    website: "https://lordjunn.github.io/Webstack-Trio/",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: `Built a production-ready portfolio and blog using Next.js, TypeScript, Tailwind CSS, and React.

    Core features include Markdown blogging, project search and filtering, dark/light mode, and a functional contact workflow with Nodemailer plus honeypot spam protection.

    The site is deployed on both Vercel and Netlify for availability, with responsive design and accessibility-focused components across desktop and mobile.`,
    image: "https://i.pinimg.com/736x/27/8f/89/278f8911cd0bb929a45209f749096358.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Markdown", "Nodemailer"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/portfolio",
    website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 5,
    title: "Introduction to Italy",
    description:
      "Led a 4-person team to build an informational tourism website covering Italy's attractions, transportation, and food culture. This project strengthened my collaboration, planning, and delivery skills in a team setting.",
    image: "/Work/Italy.png",
    tags: ["HTML", "CSS"],
    projectType: ["Team Lead", "University"],
    // github: "",
    website: "https://lordjunn.github.io/italy/",
  },
  {
    id: 6,
    title: "Restaurant CRUD CLI App",
    description: `Led a 4-person team to build a Python command-line application that simulates core restaurant backend operations.
      Implemented authentication, menu CRUD workflows, order handling, and checkout logic to model an end-to-end service flow in a terminal environment.`,
    image:
      "https://static.vecteezy.com/system/resources/previews/011/943/265/non_2x/pixel-art-wooden-table-with-chairs-and-food-tray-icon-for-8bit-game-on-white-background-vector.jpg",
    tags: ["Python", "CLI"],
    projectType: ["Team Lead", "University"],
    //github: "",
    website: "https://colab.research.google.com/drive/1IQtX3yY3Qt8CK1lqRfYVT1SMnBd2p9zJ",
  },
  {
    id: 7,
    title: "Restaurant CRUD Flask App",
    description:
      "Contributed to a group of 4 to create a Flask application that simulates both a restaurant frontend and backend.",
    image: "https://www.shutterstock.com/image-vector/cafeteria-chair-table-coffee-pot-600nw-2063937668.jpg",
    tags: ["Python", "Flask"],
    projectType: ["Team", "University"],
    //github: "",
    //website: "",
  },
  {
    id: 8,
    title: "Assembly code interpreter CLI",
    description: "Contributed to a group of 4 to create an ASM code interpreter based on CLI.",
    image: "/Work/C++ASM.png",
    tags: ["C++", "CLI"],
    projectType: ["Team", "University"],
    //github: "",
    //website: "",
  },
  {
    id: 9,
    title: "Robocop 5000",
    description: "Contributed to a group of 6 to create a 'Robot War' simulator using OOP & DS concepts.",
    image:
      "https://cdn.dribbble.com/userupload/11728109/file/original-5b23dc8c17dbdd997f330778d2e13f84.jpg?resize=1600x1200",
    tags: ["C++", "CLI"],
    projectType: ["Team", "University"],
    github: "https://github.com/LordJunn/Robocop5000",
    //website: "",
  },
  {
    id: 10,
    title: "Kwazam Chess",
    description:
      "Contributed to a group of 4 to create a special Chess game with load & save functions with special pieces.",
    image: "https://raw.githubusercontent.com/LordJunn/Kwazam-Chess/refs/heads/main/MainMenu.png",
    tags: ["Java"],
    projectType: ["Team", "University"],
    github: "https://github.com/LordJunn/Kwazam-Chess",
    //website: "",
  },
  {
    id: 11,
    title: "iKun Music",
    description: `Contributed to a group of 3 to create a music sharing web app, includes roles such as User, Artist & Admin.
      Currently hosted on PythonAnywhere.`,
    image: "/Work/iKun.png",
    tags: ["Flask", "SQLite", "PythonAnywhere"],
    projectType: ["Team", "University"],
    //github: "https://github.com/jackodinn/sef-musicSharingApp",
    website: "https://lordjunn.pythonanywhere.com/",
  },
  {
    id: 12,
    title: "CPU Scheduling Algorithm Simulator",
    description: `Contributed to a 4-person team building a CPU scheduling simulator for Round Robin, FCFS, and Priority scheduling (preemptive and non-preemptive).
      I specifically implemented parts of the Preemptive Priority flow.`,
    image: "https://ih1.redbubble.net/image.1120540391.8213/st,small,507x507-pad,600x600,f8f8f8.jpg",
    tags: ["Python", "GUI"],
    projectType: ["Team", "University"],
    github: "https://github.com/Meiyp0817/CPU-SchedulingAlgorithm-Simulator",
    //website: "",
  },
  {
    id: 13,
    title: "Song Tracker",
    description: `Built a full-stack song logging app with Supabase authentication, CRUD, search, notes, engagement tracking, and a lightweight admin dashboard.
    Added Google Sheets export for quick reporting and sharing.

    <i>Currently on hold while I focus on newer projects.</i>`,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    tags: ["TypeScript", "Tailwind CSS", "React", "Supabase"],
    projectType: ["Solo", "Personal"],
    //github: "",
    website: "https://song-tracker.vercel.app/",
  },
  {
    id: 14,
    title: "Personal Blog Site",
    description: `Developed a full-stack web application for publishing posts to selected audience tiers.
    It evolved from my earlier web-based note logging project into a more structured content platform.

    Visitors can also send connection requests directly through the site.
    `,
    image: "https://static.vecteezy.com/system/resources/thumbnails/026/306/533/small/stickman-icon-stick-figure-man-person-male-stand-standing-full-body-men-bathroom-sign-symbol-black-artwork-graphic-illustration-clipart-eps-vector.jpg",
    tags: ["Markdown", "TypeScript", "Tailwind CSS", "React", "Supabase", "Nodemailer"],
    projectType: ["Solo", "Personal"],
    //github: "",
    website: "https://junn-personal-site.vercel.app/",
  },
  {
    id: 15,
    title: "Foodie Streamlit Site",
    description: `Built an end-to-end Streamlit app to scrape, clean, visualize, and forecast personal food spending.
    Includes filtering, CSV export, KPI dashboards, and time-series forecasting with Prophet, ARIMA, Exponential Smoothing, and Linear Regression.
    Focused on turning raw logs into practical monthly budgeting insights.`,
    image: "/Work/Oguri.png",
    tags: ["Streamlit", "Python", "Time Series", "Forecasting", "Data Viz"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/lordjunn/Foodie-Streamlit",
    website: "https://junn-foodie-data-science.streamlit.app/",
  },
  {
    id: 16,
    title: "Technovation Ethical Hacking Lab",
    description: `Built a vulnerable web lab for ethical hacking training with a React frontend, Express API, and PostgreSQL backend.
    Added Python-based recon/scanning/exploit tools, automated reporting, and Docker setup for reproducible testing.
    Documented phased remediations to demonstrate secure coding improvements after assessment.`,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Hacker_behind_PC.svg/960px-Hacker_behind_PC.svg.png",
    tags: ["Ethical Hacking", "Python", "Node.js", "PostgreSQL", "Penetration Testing"],
    projectType: ["Team", "University+"],
    // github: "",
    // website: "",
  },
  {
    id: 17,
    title: "E-commerce Analytics Dashboard",
    description: `Developed and deployed a Streamlit analytics dashboard for the Olist e-commerce dataset, hosted on Render.
    Features executive KPIs, interactive filtering, revenue trend analysis, and advanced modules for logistics risk, delivery prediction, customer satisfaction, and segmentation.
    Built with Scikit-learn models and optimized pipelines for reliable interactive inference.`,
    image: "https://play-lh.googleusercontent.com/E88VHr_8R1dXih2RGG9dEaNn0fBiKolP-rfydYJMR1R6TdosntXQfragSfK7VgydtA1D",  
    tags: ["Streamlit", "Python", "Data Mining", "Machine Learning", "Plotly", "Pandas", "Scikit-learn"],
    projectType: ["Team", "University"],
    github: "https://github.com/lordjunn/Olist-Ecommerce-Analytics-Dashboard", 
    website: "https://olist-ecommerce-analytics-dashboard.onrender.com/",  
  },
  {
    id: 18,
    title: "Discord Utility Bot",
    description: `Developed and deployed a modular Discord bot for automation, analytics, and real-time utility features.
    Includes latency checks, emote analytics with Supabase JSONB caching, message mirroring, scraping tools, and a reminder system with snooze controls.
    Built with discord.py and Supabase (PostgreSQL), then deployed on Railway with dedicated docs for usage.`,
    image: "https://static.vecteezy.com/system/resources/previews/006/892/625/non_2x/discord-logo-icon-editorial-free-vector.jpg", // change if you have a better image
    tags: ["Python", "discord.py", "Supabase", "PostgreSQL", "Railway"],
    projectType: ["Solo", "Personal"],
    // github: "", // replace with your actual repo
    website: "https://lordjunn.github.io/Discord-Bots/", 
  }
]

// New certificates array
/*
  {
    id: 2,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "August 2023",
    description:
      "Professional certification in React development covering components, hooks, state management, and deployment.",
    image: "/placeholder.svg?height=400&width=400",
    credential: "https://meta.com/verify/789012",
  },
*/
const certificates: Certificate[] = [
  {
    id: 1,
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "March 2025",
    description: `
    From understanding network architectures and protocols to mastering IP addressing and Ethernet fundamentals, I developed foundational knowledge and built my networking basics. 
    Includes usage of Cisco Packet Tracer v6 & v8.

    This aligns closely with the "Computer Networks" course in my university curriculum.
    `,
    image: "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png",
    credential: "https://www.netacad.com/certificates?issuanceId=319adae7-9228-4d64-99b0-4870daa58b8b",
  },
]

// Updated experiences array with some entries having no role
/*
  {
    id: 1,
    title: "",
    organization: "",
    role: "",
    period: "",
    description: `
    
    `,
    image: "/placeholder.svg?height=400&width=400",
  },
*/
const experiences: Experience[] = [
  {
    id: 1,
    title: "Committee Member of Technical Division",
    organization: "MMU IT Society",
    // No role provided here
    period: "30 Dec 2024 - 18 Dec 2025",
    description: `
    Collaborated with the technical team to develop and maintain projects for both the Society and the University.
    All the while honing my current skillset and gaining new skills out of the university syllabus.
    
    <b>Projects done:</b>
    MMU Clubs Site (Backend for admin, Design for SuperUser, some other things) - Never deployed due to MMU moment
    MMU Hack Day (created problem statements, FAQ, Programme Briefing, forgot what else)
    `,
    image: "/Experience/ITS.jpg",
  },
  {
    id: 2,
    title: "CodeNection 2024",
    organization: "MMU IT Society",
    role: "Participant",
    period: "23 Nov 2024",
    description: `
    Participated in CodeNection 2024, a nationwide competitive programming competition organized by the IT Society of MMU Cyberjaya.
    Collaborated in a team of two in the Closed Category, solving challenging algorithmic problems under time pressure.
    Ranked 10th out of 57 teams in the Closed Category, and 11th overall across both Closed and Open Categories based on total points — out of 633 participants from 37 universities nationwide.
    Although we did not advance to the finals, the experience sharpened my problem-solving skills and strengthened my ability to work collaboratively in high-stakes environments.
    `,
    image: "/Experience/Codenection.png",
  },
  {
    id: 3,
    title: "Hackerspace MMU",
    role: "Member",
    period: "16 Aug 2024+",
    description: `
    Joined Hackerspace MMU, a vibrant community of self-learners and tech enthusiasts at Multimedia University Cyberjaya.
    I joined three weekly meetups that happen every Tuesday evening and presented project ideas and progress updates for peer feedback, such as my Study site.
    Benefited from a supportive environment fostering continuous learning, where members share knowledge, discuss the latest tech trends, and provide assistance in overcoming coding challenges.
    Embraced the hackerspace philosophy: "I hear and I forget. I see and I remember. I do and I understand."

    <b>Projects presented:</b>
    Study site (Study with Junn)
    Tic Tac Toe (Webstack Trio)
    `,
    image: "/Experience/Hackerspace.png",
  },
  {
    id: 4,
    title: "Event Management Member",
    organization: "GDC MMU",
    period: "5 Jan 2025+",
    description: `
    Joined the Game Development Club MMU Cyberjaya, a dynamic community dedicated to fostering game development skills and creativity among students.
    As an Event Management Member, I assist in organizing and executing various club events. My responsibilities encompass:
    - Coordinating logistics for events, ensuring smooth execution.
    - Collaborating with team members to plan engaging activities.
    - Assisting in setting up and overseeing event operations.
    Through these experiences, I am honing my organizational and teamwork skills, contributing to the vibrant game community at MMU.

    <b>Events managed:</b>
    Annual General Meeting 2025 (Just the setup & cleanup)
    MMU Game Jam 2025 (Logistics + Event Management, 2 out of 3 days)
    Annual General Meeting 2026
    Welcoming Party 2026 (Feedback form creation)
    `,
    image: "/Experience/GDC.png",
  },
  {
    id: 5,
    title: "CodeNection 2025",
    organization: "MMU IT Society",
    role: "Committee Member of Technical Division",
    period: "12 Apr 2025 - 9 Nov 2025",
    description: `
    This edition shifted from competitive programming to a hackathon format.
    I supported the organizing team as a committee member in the technical division.

    Responsibilities:
    All technical aspects of the event (PA System, Speakers, controlling slides, etc.) ✅
    Website UI/UX Design 
    Website Frontend & Backend Development ✅

    Contributions delivered:
    Completed the WordPress event website with two other committee members.
    Supported venue setup and post-event cleanup.
    Managed live presentation slides during the event day.
    `,
    image: "/Experience/Codenection.png",
  },
  {
    id: 6,
    title: "MMU Game Jam 2025",
    organization: "GDC MMU",
    role: "Logistics & Event Management Committee Member",
    period: "23 May 2025 - 25 May 2025",
    description: `
    Contributed to the smooth operation of the MMU Game Jam 2025 through various logistical and support tasks over two days:

    Day 1: Manpower
    - Transported stand fans from the FAIE building to the Radio Room.
    - Delivered VIP gift packs from the Chancellor’s Office to the FAC Cinema.
    - Supported meal distribution logistics for committee members.
    - Moved large floor mats from the surau to the Radio Room for storage.
    - Helped guide participants to their designated accommodation and activity areas.
    - Procured supplies (e.g., air conditioning items) from the clinic to the venue.

    Day 2: Backup
    - Handled breakfast and lunch delivery for the committee team.
    - Served as a standby support member in the committee operation room to assist participants and fill in for backup roles as needed.
    - Patrolled the Team Rooms from time to time. 

    Overall, this experience strengthened my asynchronous communication and teamwork skills.
    It also highlighted areas where I can continue improving as an event operations contributor.
    `,
    image: "/Experience/GDC.png",
  },
  {
    id: 7,
    title: "Intern",
    organization: "Presoft (M) Sdn Bhd",
    role: "System Support / Web Designer / Web Developer / Digital Marketing",
    period: "28 Jul 2025 - 28 Oct 2025",
    description: `
    Completed a three-month internship at Presoft (M) Sdn Bhd, a company specializing in business solutions and accounting software integration.  
    While my appointment letter listed a narrow role, the internship evolved into a broad, cross-functional position that exposed me to both technical and operational workflows.

    Throughout the internship, I worked with a diverse range of technologies and tools. I began by exploring Autocount Software and its plugins, before developing a MySQL Database Copier using C# and WinForms. 
    I participated in bug testing for Autocount plugins and implemented payment gateway integrations using Stripe and Billplz APIs.  
    In addition, I created several Python-based automation tools, including a Selenium web scraper and an Excel comparison utility.  
    Among my more impactful projects were enhancements to the EMAS-to-Autocount integration, an MDEC Report auto-filler tool, and a Quote + Maintenance Status Report Generator — built with Python, Excel, and a styled HTML interface using Jinja2 templates, HTML, and CSS (later integrated into Power BI).

    On the data side, I gained hands-on experience with SQL Server through dynamic SQL scripting and learned how to connect and merge datasets in Power BI using both DirectQuery and Import modes.  
    My role also extended into digital marketing, where I worked on promotional material design using Canva, and into system testing for internal tools such as CubeHous (a Warehouse Management System).  
    Additionally, I implemented CRM data extraction via the Zoho Bigin API for internal reporting purposes.

    Overall, the internship deepened my technical proficiency, strengthened my problem-solving ability, and gave me a practical view of cross-department collaboration in a software company.
    (Also, yes — half-day Saturdays and the unpaid overtime were part of the package!)
    `,
    image: "/Experience/Presoft.png",
    },
]

export default function Work() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [expandedCertId, setExpandedCertId] = useState<number | null>(null)
  const [expandedExpId, setExpandedExpId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [startIndex, setStartIndex] = useState(0)
  const [expStartIndex, setExpStartIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("projects")

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.projectType.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (exp.organization && exp.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (exp.role && exp.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    if (startIndex > filteredProjects.length - 1) {
      setStartIndex(Math.max(0, filteredProjects.length - 1))
    }
  }, [filteredProjects, startIndex])

  useEffect(() => {
    if (expStartIndex > filteredExperiences.length - 1) {
      setExpStartIndex(Math.max(0, filteredExperiences.length - 1))
    }
  }, [filteredExperiences, expStartIndex])

  const visibleProjects = filteredProjects.slice(startIndex, Math.min(startIndex + 3, filteredProjects.length))
  const visibleExperiences = filteredExperiences.slice(
    expStartIndex,
    Math.min(expStartIndex + 3, filteredExperiences.length),
  )

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const toggleExpandCert = (id: number) => {
    setExpandedCertId(expandedCertId === id ? null : id)
  }

  const toggleExpandExp = (id: number) => {
    setExpandedExpId(expandedExpId === id ? null : id)
  }

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(filteredProjects.length - 3, startIndex + 1))
  }

  const handlePreviousExp = () => {
    setExpStartIndex(Math.max(0, expStartIndex - 1))
  }

  const handleNextExp = () => {
    setExpStartIndex(Math.min(filteredExperiences.length - 3, expStartIndex + 1))
  }

  const renderHTML = (html: string) => {
    return { __html: html.replace(/\n/g, "<br/>") }
  }

  return (
    <section id="work" className="py-16">
      <h2 className="text-3xl font-bold mb-4">Work.</h2>
      <p className="mb-6">My projects, certificates, and experiences.</p>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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

      <Tabs defaultValue="projects" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects">
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
                        className="flex items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors min-h-24"
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
                              {project.description.replace(/<[^>]*>/g, "")}
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
                          <div className="flex md:hidden gap-2 flex-wrap mb-3">
                            {project.projectType.map((type) => (
                              <span key={type} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                          <div
                            className="text-sm text-muted-foreground mb-3"
                            dangerouslySetInnerHTML={renderHTML(project.description)}
                          />
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
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted py-2 px-4 border-b flex items-center gap-4">
              <span className="font-medium">Certificates</span>
              <span className="font-medium ml-auto hidden md:block">Issuer</span>
              <span className="w-24 text-center font-medium hidden md:block">Date</span>
            </div>

            {filteredCertificates.length > 0 ? (
              <div className="divide-y">
                {filteredCertificates.map((cert) => (
                  <div key={cert.id} className="group">
                    <div
                      className="flex items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors min-h-24"
                      onClick={() => toggleExpandCert(cert.id)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                          {cert.image ? (
                            <Image
                              src={cert.image || "/placeholder.svg"}
                              alt={cert.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Award className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-lg">{cert.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-1">
                            {cert.description.replace(/<[^>]*>/g, "")}
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block text-right text-sm text-muted-foreground">{cert.issuer}</div>
                      <div className="hidden md:block w-24 text-center text-sm text-muted-foreground">{cert.date}</div>
                      <div className="flex items-center ml-4">
                        {cert.credential && (
                          <Button variant="ghost" size="icon" asChild onClick={(e) => e.stopPropagation()}>
                            <a href={cert.credential} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View credential</span>
                            </a>
                          </Button>
                        )}
                        {expandedCertId === cert.id ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    {expandedCertId === cert.id && (
                      <div className="p-4 pt-0 bg-muted/20">
                        <div className="md:hidden flex flex-col gap-1 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Issuer:</span>
                            <span className="text-muted-foreground">{cert.issuer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Date:</span>
                            <span className="text-muted-foreground">{cert.date}</span>
                          </div>
                        </div>
                        <div
                          className="text-sm text-muted-foreground"
                          dangerouslySetInnerHTML={renderHTML(cert.description)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No certificates found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Experiences Tab */}
        <TabsContent value="experiences">
          <div className="border rounded-lg overflow-hidden">
            {filteredExperiences.length > 0 ? (
              <>
                <div className="divide-y">
                  {visibleExperiences.map((exp) => (
                    <div key={exp.id} className="group">
                      <div
                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors min-h-24"
                        onClick={() => toggleExpandExp(exp.id)}
                      >
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                          {exp.image ? (
                            <Image
                              src={exp.image || "/placeholder.svg"}
                              alt={exp.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Users className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-lg">{exp.title}</h3>
                          {exp.organization && <p className="text-muted-foreground text-sm mt-1">{exp.organization}</p>}
                          {exp.role && <p className="text-muted-foreground text-sm mt-1">{exp.role}</p>}
                          <p className="text-muted-foreground text-sm mt-1">{exp.period}</p>
                        </div>
                        <div className="flex items-center">
                          {expandedExpId === exp.id ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      {expandedExpId === exp.id && (
                        <div className="p-4 pt-0 bg-muted/20">
                          <div className="flex flex-col gap-1 mb-3">
                            {exp.organization && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Organization:</span>
                                <span className="text-muted-foreground">{exp.organization}</span>
                              </div>
                            )}
                            {exp.role && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Role:</span>
                                <span className="text-muted-foreground">{exp.role}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Period:</span>
                              <span className="text-muted-foreground">{exp.period}</span>
                            </div>
                          </div>
                          <div
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={renderHTML(exp.description)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {filteredExperiences.length > 3 && (
                  <div className="flex justify-between items-center p-3 border-t bg-muted/20">
                    <div className="text-sm text-muted-foreground">
                      Showing {expStartIndex + 1}-{Math.min(expStartIndex + 3, filteredExperiences.length)} of{" "}
                      {filteredExperiences.length}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handlePreviousExp} disabled={expStartIndex === 0}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextExp}
                        disabled={expStartIndex >= filteredExperiences.length - 3}
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
                <p className="text-muted-foreground">No experiences found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
