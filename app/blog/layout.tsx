import { TimesMastheadBar } from '@/components/TimesMasthead'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 pt-20 -mb-8">
        <TimesMastheadBar />
      </div>
      {children}
    </>
  )
}
