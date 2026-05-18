import React from 'react'
import QR from '../../components/qr'

export default function QRPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <QR portfolioUrl="https://junn-portfolio.vercel.app" resumeUrl="/resume.pdf" />
    </main>
  )
}
