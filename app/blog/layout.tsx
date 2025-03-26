import type React from "react"
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="min-h-[calc(100vh-64px-80px)]">{children}</main>
}

