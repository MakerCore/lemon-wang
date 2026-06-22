import type { Metadata } from 'next'

const DESCRIPTION =
  'Paste raw, messy data and get clean CSV out. A free in-browser data-cleaning tool by Lemon Wang.'

export const metadata: Metadata = {
  title: { absolute: 'UV Data Engine — Raw Data to Clean CSV | Lemon Wang' },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/uv-data-engine' },
  openGraph: {
    type: 'website',
    siteName: 'Lemon Wang',
    url: 'https://www.lemon.wang/tools/uv-data-engine',
    title: 'UV Data Engine — Raw Data to Clean CSV | Lemon Wang',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UV Data Engine — Raw Data to Clean CSV | Lemon Wang',
    description: DESCRIPTION,
  },
}

export default function UvDataEngineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
