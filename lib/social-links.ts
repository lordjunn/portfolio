// Centralized configuration for social links and footer metadata
// Edit this single file to update all external links across the portfolio

export const socialLinks = {
  github: "https://github.com/LordJunn/",
  linkedin: "https://www.linkedin.com/in/junn-kit-735485245/",
  email: "mailto:ljunnkit5@gmail.com",
} as const

export type SocialLinks = typeof socialLinks

// Footer metadata - update this whenever making significant changes to the site
export const lastUpdated = "4th June, 2026"
