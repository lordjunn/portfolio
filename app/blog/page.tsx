"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { BlogPost } from "@/lib/blog"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog")
        const data = await response.json()
        setPosts(data.posts)
        setFilteredPosts(data.posts)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.preview.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query),
    )

    setFilteredPosts(filtered)
  }, [searchQuery, posts])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-6xl font-bold mb-8">Blog.</h1>

      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Search posts by title or content..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border bg-card text-card-foreground shadow animate-pulse">
              <div className="h-48 w-full bg-muted"></div>
              <div className="p-6">
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.preview}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground">Try adjusting your search query</p>
        </div>
      )}
    </div>
  )
}

