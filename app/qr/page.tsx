import React from 'react'
import QR from '../../components/qr'
import { socialLinks } from "@/lib/social-links"

export default function QRPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <QR portfolioUrl={socialLinks.portfolio} resumeUrl="/resume.pdf" />
    </main>
  )
}
