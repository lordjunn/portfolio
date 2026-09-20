// Centralized configuration for social links, site URL, and metadata
// Edit this single file to update links and URLs across the entire portfolio

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://junn-portfolio.vercel.app"

export const socialLinks = {
  github: "https://github.com/LordJunn/",
  linkedin: "https://www.linkedin.com/in/junn-kit-735485245/",
  email: "mailto:ljunnkit5@gmail.com",
  portfolio: siteUrl,
  resume: "/Resume.pdf",
} as const

export type SocialLinks = typeof socialLinks

// Footer metadata - update this whenever making significant changes to the site
export const lastUpdated = "20th September, 2026"
