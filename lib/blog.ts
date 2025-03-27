import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

export interface Author {
  authorname: string
  authorimage?: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  tagline?: string
  preview: string
  image?: string
  keywords?: string
  author?: Author
  readingtime?: number
  content: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

// Make sure the getAllPosts function properly handles the new blog post
// by ensuring it can read the content/blog directory correctly

// Update the error handling in getAllPosts to provide more detailed logs
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Check if directory exists
    try {
      await fs.access(postsDirectory)
    } catch (error) {
      // Directory doesn't exist, create it
      await fs.mkdir(postsDirectory, { recursive: true })
      console.log("Created blog directory at content/blog")
      return [] // Return empty array if no posts exist yet
    }

    const fileNames = await fs.readdir(postsDirectory)
    console.log(`Found ${fileNames.length} files in blog directory:`, fileNames)

    // Filter out non-markdown files
    const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))

    if (markdownFiles.length === 0) {
      console.log("No blog posts found in content/blog directory")
      return []
    }

    const posts = await Promise.all(
      markdownFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "")
        const post = await getPostBySlug(slug)
        return post
      }),
    )

    // Sort posts by date in descending order
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error getting all posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const mdFilePath = path.join(postsDirectory, `${slug}.md`)
    const mdxFilePath = path.join(postsDirectory, `${slug}.mdx`)

    let filePath: string

    try {
      await fs.access(mdFilePath)
      filePath = mdFilePath
    } catch (error) {
      try {
        await fs.access(mdxFilePath)
        filePath = mdxFilePath
      } catch (error) {
        return null
      }
    }

    const fileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      tagline: data.tagline,
      preview: data.preview || "No preview available",
      image: data.image,
      keywords: data.keywords,
      author: data.author,
      readingtime: data.readingtime || Math.ceil(content.split(/\s+/).length / 200), // Estimate reading time if not provided
      content,
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

