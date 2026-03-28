import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

// Replace G-XXXXXXXXXX with your GA4 Measurement ID
const GA_ID = 'G-4FTC43XTXD'

export const metadata: Metadata = {
  title: 'lemon.wang',
  description: 'PM by day. Builder by night. Writer always.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍋</text></svg>" />
      </head>
      <body>
        <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#222]">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
            <a href="/" className="font-mono text-white text-sm tracking-wider hover:text-[#CCFF00] transition-colors">
              LEMON.WANG
            </a>
            <a href="/blog" className="font-mono text-[#999] text-sm hover:text-[#CCFF00] transition-colors">
              LABNOTES
            </a>
          </div>
        </nav>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
