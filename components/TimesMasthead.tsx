import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { SHELVES } from '@/lib/library'
import { getCurrentIssue } from '@/lib/issue'

const playfair = Playfair_Display({ subsets: ['latin'], weight: '900', display: 'swap' })

/** One shelf colour per letter of FULL-COLOR. */
const LETTER_COLORS = ['#FF6F61', '#3EC8F0', '#9BE6F7', '#2FA3DA', '#2EC4B6', '#FFD23F', '#FF9A4D', '#5BE38A', '#B69CFF', '#FF4FA3']

function Wordmark({ className }: { className: string }) {
  return (
    <span className={`${playfair.className} ${className} font-black leading-[0.9] tracking-[-0.01em] whitespace-nowrap`} aria-label="Full-Color Times">
      {'FULL-COLOR'.split('').map((ch, i) => (
        <span key={i} style={{ color: LETTER_COLORS[i] }} aria-hidden="true">{ch}</span>
      ))}
      <span className="text-white" aria-hidden="true"> TIMES</span>
    </span>
  )
}

function Rule() {
  return (
    <div className="flex h-1.5 w-full" aria-hidden="true">
      {SHELVES.map(s => <span key={s.code} className="flex-1" style={{ background: s.color }} />)}
    </div>
  )
}

/** Large masthead for the homepage. */
export default function TimesMasthead() {
  const issue = getCurrentIssue()
  return (
    <div className="flex flex-col gap-2">
      <Wordmark className="text-[44px] sm:text-[64px] lg:text-[80px]" />
      <Rule />
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">
        <span>{issue.label}</span>
        <span>Field reports on full-color 3D printing · by Lemon Wang</span>
      </div>
    </div>
  )
}

/** Compact masthead strip for sub-pages (shelves, field notes). */
export function TimesMastheadBar({ className = '' }: { className?: string }) {
  const issue = getCurrentIssue()
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <Link href="/" className="hover:opacity-80 transition-opacity"><Wordmark className="text-[26px] sm:text-[32px]" /></Link>
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)] pb-0.5">{issue.label}</span>
      </div>
      <Rule />
    </div>
  )
}
