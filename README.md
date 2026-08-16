# Personal Developer Portfolio & Blog

A modern, responsive developer portfolio and technical blog built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

🌐 **Live Demo:** [https://junn-portfolio.vercel.app](https://junn-portfolio.vercel.app)

---

## ✨ Features

- **🌓 Dark & Light Theme**: Seamless theme switching with system preference detection (`next-themes`).
- **📄 In-App Resume Preview**: Native modal preview on mobile & desktop without forcing file downloads, plus an automated GitHub Actions PDF $\to$ PNG build pipeline.
- **✍️ Technical Markdown Blog**: Static markdown blog support with syntax highlighting, tag filtering, and reading time.
- **💼 Interactive Work & Projects**: Filterable project showcases, experience timeline, and certificate gallery.
- **📱 Responsive & Mobile-First**: Optimized touch controls, mobile navigation sheet, and a dedicated `/qr` quick-share view for career fairs and networking.
- **🔍 SEO & Accessibility**: OpenGraph tags, Twitter cards, JSON-LD structured data, and semantic HTML.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Styling:** [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React Icons](https://lucide.dev/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Deployment & CI:** [Vercel](https://vercel.com/), [GitHub Actions](https://github.com/features/actions)

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/LordJunn/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Run the development server
```bash
pnpm dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live site.

### 4. Build for production
```bash
pnpm build
pnpm start
```

---

## ⚙️ Customization & Self-Hosting Guide

If you're using or adapting this portfolio for your own site, follow these steps to customize it:

### 1. Social Links & Metadata
Edit **`lib/social-links.ts`** to update all your centralized URLs:
```ts
export const socialLinks = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile/",
  email: "mailto:your-email@example.com",
  portfolio: "https://your-domain.vercel.app",
}
```

### 2. Bio & Personal Info
- **Hero Banner:** Edit `components/hero.tsx` to customize the typing greeting effect and hero tagline.
- **About Section:** Edit `components/about.tsx` to update your introduction and skills breakdown.
- **SEO & Site Title:** Edit `app/layout.tsx` to change page titles, site descriptions, and OpenGraph/Twitter card images.

### 3. Projects, Experience & Certificates
Edit **`components/work.tsx`**:
- Update the `projects` array with your project titles, tech tags, descriptions, GitHub links, and live demos.
- Update the `experiences` and `certificates` arrays to reflect your journey.

### 4. Blog Posts
Add or edit `.md` files in **`content/blog/`**:
```markdown
---
title: 'My First Post'
date: '2026-08-15T00:00:00.000Z'
description: 'A brief summary of this article.'
tags: ['Next.js', 'WebDev']
---

Your markdown content here...
```

### 5. Resume & Automated Preview
1. Replace **`public/Resume.pdf`** with your own resume PDF.
2. The GitHub Action in **`.github/workflows/generate-resume-png.yml`** will automatically convert your PDF into `public/Resume.png` and commit it whenever you push changes to `Resume.pdf`.
3. *(Ensure **Settings $\to$ Actions $\to$ General $\to$ Workflow permissions** is set to **Read and write permissions** in your GitHub repo).*

### 6. Deploying to Vercel / Netlify
1. Push your customized code to your GitHub repository.
2. Import your repository into [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
3. Framework preset will automatically detect Next.js—click **Deploy**.

---

## 📄 License

Open-source and available under the [MIT License](LICENSE) (or feel free to adapt for personal portfolio use).
