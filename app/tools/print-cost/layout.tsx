import type { Metadata } from 'next'

const DESCRIPTION =
  'Free 3D printing cost calculator — estimate material, machine, and labor cost per print. Built by Lemon Wang.'

export const metadata: Metadata = {
  title: { absolute: '3D Print Cost Calculator | Lemon Wang' },
  description: DESCRIPTION,
  alternates: { canonical: '/tools/print-cost' },
  openGraph: {
    type: 'website',
    siteName: 'Lemon Wang',
    url: 'https://www.lemon.wang/tools/print-cost',
    title: '3D Print Cost Calculator | Lemon Wang',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Print Cost Calculator | Lemon Wang',
    description: DESCRIPTION,
  },
}

export default function PrintCostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
