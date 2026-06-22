import type { Metadata } from 'next'

const DESCRIPTION =
  'Lemon Wang is a product strategist and solo builder in Hangzhou. Global GTM for full-color 3D printing by day, hardware experiments by night. Learn about the MDM framework, projects, and AI/hardware strategy.'

export const metadata: Metadata = {
  title: { absolute: 'About Lemon Wang | Inside Chinese Hardware' },
  description: DESCRIPTION,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'profile',
    siteName: 'Lemon Wang',
    url: 'https://www.lemon.wang/about',
    title: 'About Lemon Wang | Inside Chinese Hardware',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Lemon Wang | Inside Chinese Hardware',
    description: DESCRIPTION,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
