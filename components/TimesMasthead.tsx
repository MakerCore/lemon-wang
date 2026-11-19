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

/**
 * Stacked lock-up: a full-colour FULL-COLOR crown over a giant white TIMES,
 * both forced to exactly the same width (SVG textLength), with the shelf
 * colour rule between them.
 */
function StackedWordmark({ className }: { className: string }) {
  const W = 520
  const font = { fontFamily: playfair.style.fontFamily, fontWeight: 900 }
  const seg = W / SHELVES.length
  return (
    <svg viewBox={`0 0 ${W} 300`} className={className} role="img" aria-label="Full-Color Times">
      <text x="0" y="78" textLength={W} lengthAdjust="spacing" style={{ ...font, fontSize: 84 }}>
        {'FULL-COLOR'.split('').map((ch, i) => <tspan key={i} fill={LETTER_COLORS[i]}>{ch}</tspan>)}
      </text>
      {SHELVES.map((sh, i) => <rect key={sh.code} x={i * seg} y="96" width={seg + 0.5} height="7" fill={sh.color} />)}
      <text x="0" y="290" textLength={W} lengthAdjust="spacing" fill="#ffffff" style={{ ...font, fontSize: 210 }}>TIMES</text>
    </svg>
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
    <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
      <StackedWordmark className="w-[260px] sm:w-[340px] lg:w-[380px] h-auto" />
      <div className="flex flex-col gap-1.5 pb-1 font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">
        <span className="text-white">{issue.label}</span>
        <span>Field reports on full-color 3D printing</span>
        <span>by Lemon Wang</span>
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
