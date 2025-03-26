import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import type { Metadata } from "next"
import { Clock, Calendar } from 'lucide-react'

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

function formatMarkdown(content: string): string {
  return content
    // Format headings
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
    
    // Format lists
    .replace(/^- (.*$)/gm, '<li class="ml-6 mb-1">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal mb-1">$2</li>')
    
    // Format code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/gm, (match, language, code) => {
      return `<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code class="language-${language || 'text'}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    })
    
    // Format inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-foreground">$1</code>')
    
    // Format paragraphs and line breaks
    .replace(/^\s*$/gm, "<br />")
    .replace(/^([^<#].*$)/gm, '<p class="mb-4">$1</p>')
    
    // Clean up any duplicate tags
    .replace(/<p class="mb-4">(<h|<li|<br|<pre)/g, "$1")
    .replace(/<\/h1>|<\/h2>|<\/h3>|<\/li>|<br \/>/g, "$&\n");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedContent = formatMarkdown(post.content);

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
              __html: formattedContent
            }}
          />
        </div>
      </article>
    </div>
  )
}

