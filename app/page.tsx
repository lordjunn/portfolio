import Hero from "@/components/hero"
import Work from "@/components/work"
import About from "@/components/about"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <Work />
      <About />
      <Contact />
    </main>
  )
}

