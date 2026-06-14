import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import './globals.css'

// Replace G-XXXXXXXXXX with your GA4 Measurement ID
const GA_ID = 'G-4FTC43XTXD'

const SITE_URL = 'https://www.lemon.wang'
const DESCRIPTION =
  'First-hand signal from inside Chinese hardware. Decision frameworks for founders, operators, and investors in hardware, AI, and deep tech — sour truth, no padding.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lemon Wang | Inside Chinese Hardware',
    template: '%s | Lemon Wang',
  },
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lemon Wang',
    url: SITE_URL,
    title: 'Lemon Wang | Inside Chinese Hardware',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lemon Wang | Inside Chinese Hardware',
    description: DESCRIPTION,
  },
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
        <Navbar />
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
