import React from 'react'

type Props = {
  portfolioUrl?: string
  resumeUrl?: string
}

export default function QR({
  portfolioUrl = 'https://junn-portfolio.vercel.app',
  resumeUrl = '/resume.pdf',
}: Props) {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Quick access — scan to open</h1>

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <img
            src="/qr-portfolio.png"
            alt="QR code linking to portfolio"
            className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
          />
          <span className="text-sm mt-2">Portfolio</span>
        </a>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <img
            src="/qr-resume.png"
            alt="QR code linking to resume"
            className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
          />
          <span className="text-sm mt-2">Resume</span>
        </a>
      </div>

      <p className="text-xs text-center mt-4">
        Tip: open this page on your device and let recruiters scan from your phone or tablet.
      </p>
    </section>
  )
}
