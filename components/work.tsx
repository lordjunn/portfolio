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
    description: `Developed a website that stores educational materials that I have done, which has benefited my entire intake of 600+ students and others to score higher and better. 
      Shared with other batches as well, which brings the total helped students to more than 1000+.
      
      Applicable to other universities as well.`,
    image: "/Work/Exams.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Study-With-Junn",
    website: "https://lordjunn.github.io/Study-With-Junn/index.html",
  },
  {
    id: 2,
    title: "Dine with Junn",
    description: `One of my earliest websites. Displays food options on and off campus along with reviews of the meals I've had. 
      It also features an all-in-one site that loads data from a CSV file, showing the full list of food items I've tried with added search and sorting options. 
      Later versions include monthly graphs to visualize food pricing trends, focusing on the cost per meal.`,
    image: "/Work/Food.png",
    tags: ["HTML", "CSS", "JavaScript", "CSV"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Food-MMU",
    website: "https://lordjunn.github.io/Food-MMU/",
  },
  {
    id: 3,
    title: "Webstack Trio",
    description: `A website that hosts all my other mini projects, including Tic Tac Toe, Maze, Tower Defense, Wordle, Calculator, Currency Exchanger, and other fun interactive games and useful utilities.
      
      <b>Game based projects:</b>
      - Tic Tac Toe 
      - Maze game 
      - (Easier) 2048 
      - Tower Defense (PvZ type) 
      - Memory Card game 
      - Wordle (not API for now)
      - Snake game (adjustable settings from spawn, speed, colour, etc) 

      <b>Non-game projects:</b>

      - Scientific Calculator 
      - Music Player (Desktop version works well, mobile version less optimized)
      - Quad Currency Exchange (Exchanges up to 5 currencies at once using API)`,
    image: "/Work/Trio.png",
    tags: ["HTML", "CSS", "JavaScript", "APIs"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/LordJunn/Webstack-Trio",
    website: "https://lordjunn.github.io/Webstack-Trio/",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: `A modern, responsive portfolio website built with Next.js and TypeScript, designed to showcase my development work and personal blog. 
    It features dark/light mode toggling, smooth animations, and optimized performance across all devices using Tailwind CSS and React.

    The site includes:
    - A blog system with Markdown support
    - Project filtering and tags
    - A fully functional contact form with Gmail integration using Nodemailer
    - Honeypot spam prevention to protect against bots
    - Accessibility-friendly components and semantic HTML for better UX

    Deployed on borh Vercel and Netlify, the site is fast, secure, and fully mobile-friendly, demonstrating my attention to UI/UX and modern full-stack practices.
    (Double deployment in case MCMC does the funny again)`,
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
      "One of my earliest group projects. Led a team of 4 to create a website introducing Italy’s attractions, transportation, gastronomy, and other key tourist info.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png",
    tags: ["HTML", "CSS"],
    projectType: ["Team Lead", "University"],
    github: "https://github.com/LordJunn/portfolio",
    website: "https://lordjunn.github.io/italy/",
  },
  {
    id: 6,
    title: "Restaurant CRUD CLI App",
    description: `Led a team of 4 to build a Python-based command-line app simulating a restaurant backend. 
      Features include user login, menu CRUD operations, order handling, and checkout.`,
    image:
      "https://static.vecteezy.com/system/resources/previews/011/943/265/non_2x/pixel-art-wooden-table-with-chairs-and-food-tray-icon-for-8bit-game-on-white-background-vector.jpg",
    tags: ["Python", "CLI"],
    projectType: ["Team Lead", "University"],
    //github: "https://github.com/LordJunn/portfolio",
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
    image:
      "https://cdn.dribbble.com/userupload/11728109/file/original-5b23dc8c17dbdd997f330778d2e13f84.jpg?resize=1600x1200",
    tags: ["C++", "CLI"],
    projectType: ["Team", "University"],
    github: "https://github.com/LordJunn/Robocop5000",
    //website: "https://junn-portfolio.vercel.app/",
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
    //website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 11,
    title: "iKun Music",
    description: `Contributed to a group of 3 to create a music sharing web app, includes roles such as User, Artist & Admin.
      Currently being hosted on pythonanywhere.`,
    image: "/Work/iKun.png",
    tags: ["Flask", "SQLite", "PythonAnywhere"],
    projectType: ["Team", "University"],
    //github: "https://github.com/jackodinn/sef-musicSharingApp",
    website: "https://lordjunn.pythonanywhere.com/",
  },
  {
    id: 12,
    title: "CPU Scheduling Algorithm Simulator",
    description: `Contributed to a group of 4 to create a CPU Scheduler Algorithm Simulator that simulates algorithms such as:
      -Round Robin, 
      -(Non) Preemptive Priority, both of them, and
      -FCFS.
      
      Despite the Github says otherwise, I contributed to the Preemptive Priority.`,
    image: "https://ih1.redbubble.net/image.1120540391.8213/st,small,507x507-pad,600x600,f8f8f8.jpg",
    tags: ["Python", "GUI"],
    projectType: ["Team", "University"],
    github: "https://github.com/Meiyp0817/CPU-SchedulingAlgorithm-Simulator",
    //website: "https://junn-portfolio.vercel.app/",
  },
  {
    id: 13,
    title: "Song Tracker",
    description: `Developed a full-stack web application that allows me to jot down songs and notes of what I had listened and shared to someone.

    Includes functions such as:
    - Built with Supabase for authentication, CRUD operations, and user management
    - Song search, notes, and filter features
    - User interactions: like system, login tracking, and song engagement stats
    - Admin dashboard with insights on song performance and user activity
    - One-click export to Google Sheets

    <i>Not really worked on now :( </i>
    `,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    tags: ["Typescript", "TailWindCSS", "React", "Supabase"],
    projectType: ["Solo", "Personal"],
    //github: "",
    website: "https://song-tracker.vercel.app/",
  },
  {
    id: 14,
    title: "Personal Blog Site",
    description: `Developed a full-stack web application that lets me share blog posts with a selected audience (based on tier list). 
    Think of it as an "improvement" over my online-based note logging web app.

    For those who wish to connect, they are free to send a connection request there.
    `,
    image: "",
    tags: ["Markdown", "Typescript", "TailWindCSS", "React", "Supabase", "NodeMailer"],
    projectType: ["Solo", "Personal"],
    //github: "",
    website: "https://junn-personal-site.vercel.app/",
  },
  {
    id: 15,
    title: "Foodie Streamlit Site",
    description: `Built an end-to-end Streamlit application to scrape, clean, explore, visualize, and forecast personal food spending data.

    Features include:
    - Robust web scraper with progress UI, error handling, and multi-month/year ingestion
    - Interactive data explorer with filters (restaurant, meal type, date), dish search, and CSV export
    - Data cleaning and normalization (price parsing, numeric_price, meal-type standardization)
    - Statistical summaries and "KPIs" with monthly and category-based breakdowns
    - Visualizations including box plots, histograms with normal overlays, QQ plots, LOWESS trends, calendar heatmaps, and time-series charts
    - Forecasting module with Prophet, ARIMA, Exponential Smoothing, and Linear Regression; up to 24 months.
    `,
    image: "/Work/Oguri.png",
    tags: ["Streamlit", "Python", "Time Series", "Forecasting", "Data Viz"],
    projectType: ["Solo", "Personal"],
    github: "https://github.com/lordjunn/Foodie-Streamlit",
    website: "https://junn-foodie-data-science.streamlit.app/",
  },
  {
      id: 16,
      title: "Technovation Ethical Hacking Lab",
      description: `Developed a comprehensive vulnerable web application lab and associated tools for ethical hacking education and testing.

      Features include:
      - Vulnerable lab setup with Node.js backend (Express, PostgreSQL) and React frontend, including intentional flaws like SQL injection, plaintext passwords, and insecure APIs
      - Database seeding with default admin/test users and products for testing authentication and authorization
      - Penetration testing tools in Python: recon scripts for domain enumeration, vulnerability scanners for web apps, SQL injection exploits, and automated assessment runners
      - Report generation for findings, with support for full assessments via shell scripts
      - Docker-based deployment for easy setup, with non-Docker alternatives for local environments
      - Phase-based vulnerability fixes documentation to demonstrate secure coding practices`,
      image: "/Work/TechnovationLab.png",
      tags: ["Ethical Hacking", "Python", "Node.js", "PostgreSQL", "Penetration Testing"],
      projectType: ["Team", "University+"],
      github: "",
      website: "",
  },
  {
    id: 17,
    title: "E-commerce Analytics Dashboard",
    description: `Developed a comprehensive Streamlit dashboard for analyzing Olist Brazilian E-commerce data as part of a data mining project. 
      Features include executive summaries with KPIs (revenue, orders, satisfaction rates), interactive filters by state and category, and visualizations like revenue by state and top product categories.
      
      Includes a Logistics & Risk Optimizer with delivery risk heatmaps, prediction tools for delivery time and late delivery risk using machine learning models, historical route data, and feature importance analysis.
      
      Also features a Customer Segments & Satisfaction section with satisfaction prediction based on order details, customer clustering (K-means) on features like order value and review scores, segment visualizations, and order history filtering.
      
      Utilizes pre-trained models (delivery time, risk assessment, satisfaction, clustering) loaded from pickle files, with data from a cleaned CSV dataset. Supports model validation, safe predictions, and export of filtered data.`,
    image: "/Work/Dashboard.png",  // Replace with actual image path or URL
    tags: ["Streamlit", "Python", "Data Mining", "Machine Learning", "Plotly", "Pandas", "Scikit-learn"],
    projectType: ["Team", "University"],
    github: "",  // Adjust if different
    website: "",  // Leave empty if not deployed online
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

    Basically the course "Computer Networks" in my uni.
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
    At times engaged in weekly meetups every Tuesday evening, and presented ideas for new projects, and progress updates to peers for constructive feedback.
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
    Hackathon, no more Competitive Programming. 
    Not participant, am the one working on this now.

    Things I'm told I'll be doing:
    All technical aspects of the event (PA System, Speakers, controlling slides, etc.) ✅
    Website UI/UX Design 
    Website Frontend & Backend Development ✅

    Things I've done:
    Finished the WordPress site with 2+ others.
    Helped with setup of the overall venue, then cleaning once it ends.
    Control the slides during the event day.
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

    All in all, it was a good experience, teaching me the importance of asynchronous communication and working as a team.
    It also shows that I have areas to improve, and areas that I have qualities in.
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
    Despite what the appointment letter stated, my role turned out to be a versatile "do whatever needs doing" position — giving me exposure to both the technical and operational sides of an IT-driven organization.

    Throughout the internship, I worked with a diverse range of technologies and tools. I began by exploring Autocount Software and its plugins, before developing a MySQL Database Copier using C# and WinForms. 
    I participated in bug testing for Autocount plugins and implemented payment gateway integrations using Stripe and Billplz APIs.  
    In addition, I created several Python-based automation tools, including a Selenium web scraper and an Excel comparison utility.  
    Among my more impactful projects were enhancements to the EMAS-to-Autocount integration, an MDEC Report auto-filler tool, and a Quote + Maintenance Status Report Generator — built with Python, Excel, and a styled HTML interface using Jinja2 templates, HTML, and CSS (later integrated into Power BI).

    On the data side, I gained hands-on experience with SQL Server through dynamic SQL scripting and learned how to connect and merge datasets in Power BI using both DirectQuery and Import modes.  
    My role also extended into digital marketing, where I worked on promotional material design using Canva, and into system testing for internal tools such as CubeHous (a Warehouse Management System).  
    Additionally, I implemented CRM data extraction via the Zoho Bigin API for internal reporting purposes.

    Overall, the internship was an enriching experience that deepened my technical proficiency, improved my problem-solving capabilities, and gave me a real-world perspective on how different departments collaborate within a software company.  
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
                      className="flex items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
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
                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
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
