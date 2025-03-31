---
date: '2025-03-31T13:00:00.000Z'
title: Setting Up Your Portfolio Website
tagline: A Step-by-Step Guide to Set Up This Portfolio Website for Your Own Use
preview: >-
  Learn how to clone, configure, and deploy your personalized portfolio website with ease using Next.js, TypeScript, and Tailwind CSS.
image: >-
  https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070
keywords: "Next.js, TypeScript, Tailwind CSS, Portfolio"
author:
  authorname: Lord Junn
  authorimage: >-
    https://cdn.discordapp.com/avatars/294784896579403777/fffbe8d9591126d66f8a3b57da81e26a.png?size=4096
readingtime: 6
---

# Portfolio Website

A modern and fully responsive portfolio website template built with Next.js 14, TypeScript, and Tailwind CSS. It features a light/dark mode toggle, a blog with Markdown support, and a customizable project showcase to highlight your work and achievements.

![Portfolio Preview](/public/portfolio-preview.png)

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [1. Download the Template](#1-download-the-template)
  - [2. Prepare Your Blog Posts](#2-prepare-your-blog-posts)
  - [3. Customize the Content](#3-customize-the-content)
  - [4. Change the Icon](#4-change-the-icon)
  - [5. Deploy Your Site](#5-deploy-your-site)
- [Contributing](#contributing)

## Key Features

- 🚀 **Built with Next.js 14** using the App Router for optimal routing and performance.
- 💅 **Tailwind CSS** for efficient, responsive, and customizable styling.
- 🌓 **Light/Dark Mode Toggle** for an enhanced user experience.
- 📱 **Fully Responsive Design** ensuring compatibility across all devices.
- 📝 **Markdown Blog** with built-in syntax highlighting for clear and professional posts.
- 🔍 **Project Showcase** with dynamic filtering to showcase your work and achievements.
- 📊 **Contact Form** to allow users to reach out to you directly.

## Getting Started

To set up and customize the portfolio, follow the steps below:

### 1. **Download the Template**

You can either clone the repository or download it as a ZIP file, command below.

```bash
git clone https://github.com/LordJunn/portfolio.git
```
### 2. **Prepare Your Blog Posts**

To start with a clean slate, remove any existing posts in the <code>/content/blog/ </code> directory.

```bash
# Delete all existing blog posts for a fresh start
rm -rf content/blog/*
```

### 3. **Customize the Content**

Edit the necessary components and pages as needed. Below are the key components to modify:

About Section: Update the <code>/components/about.tsx </code> file to add your personal information.
Hero Section: Modify <code>/components/hero.tsx </code> to customize your homepage introduction.
Pages: Update other relevant pages inside the <code>/components/ </code> directory to reflect your unique content.

### 4. **Change the Icon**

If you wish to change the favicon or other icons, navigate to the <code>/public/ </code> directory and replace the current icons.

### 5. **Deploy Your Site**

Once you've made your changes, deploy the site using your preferred platform, such as Vercel or Netlify, for seamless hosting.

## Contributing

We welcome contributions to improve this template! If you'd like to contribute:

Fork the repository.
Create a new branch for your changes.
Submit a pull request with a detailed description of the changes you made.