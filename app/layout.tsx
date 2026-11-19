import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Space_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import JsonLd from '@/components/JsonLd'
import './globals.css'

// Self-hosted via next/font — no render-blocking request to fonts.googleapis.com
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

// Replace G-XXXXXXXXXX with your GA4 Measurement ID
const GA_ID = 'G-4FTC43XTXD'

const SITE_URL = 'https://www.lemon.wang'
const DESCRIPTION =
  'Field reports on who is making money with full-color 3D printing, shelved by application. By Lemon Wang, product manager for full-color 3D printers at Flashforge.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lemon Wang | The Full-Color Times',
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
    title: 'Lemon Wang | The Full-Color Times',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lemon Wang | The Full-Color Times',
    description: DESCRIPTION,
  },
  verification: {
    google: 'dyoQoCXbmXNdw3TIVZO2Y6YaEpgXjOTxnYsfXNO04CU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <head />
      <body>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: 'Lemon Wang',
                description: DESCRIPTION,
                publisher: { '@id': `${SITE_URL}/#person` },
              },
              {
                '@type': 'Person',
                '@id': `${SITE_URL}/#person`,
                name: 'Lemon Wang',
                url: SITE_URL,
                jobTitle: 'Product Manager',
                description: DESCRIPTION,
              },
            ],
          }}
        />
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
