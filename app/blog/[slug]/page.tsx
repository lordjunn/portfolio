import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { markdownToHtml } from "@/lib/markdown"
import type { Metadata } from "next"
import { Clock, Calendar } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.preview,
    keywords: post.keywords,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Convert markdown to HTML
  const contentHtml = await markdownToHtml(post.content)

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.tagline && <p className="text-xl text-muted-foreground mb-6">{post.tagline}</p>}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.authorimage && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={post.author.authorimage || "/placeholder.svg"}
                      alt={post.author.authorname || "Author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{post.author.authorname}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {post.readingtime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingtime} min read</span>
              </div>
            )}
          </div>
        </div>

        {post.image && (
          <div className="relative w-full h-[400px] mb-10 rounded-lg overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          />
        </div>
      </article>
    </div>
  )
}

