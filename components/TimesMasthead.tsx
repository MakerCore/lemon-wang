import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { getCurrentIssue } from '@/lib/issue'

const playfair = Playfair_Display({ subsets: ['latin'], weight: '900', display: 'swap' })

/** One continuous spectrum — the brand colour. */
export const SPECTRUM = ['#FF7A6B', '#FFC94D', '#7BE495', '#4FD1F0', '#8FA8FF', '#C59BFF', '#FF6FB5']
/** The same spectrum, darkened: the side walls of the glass letters. */
const SPECTRUM_DEEP = ['#803D35', '#806426', '#3E724A', '#286878', '#485480', '#634E80', '#80385A']
const DEPTH = 9
const cssGradient = `linear-gradient(90deg, ${SPECTRUM.join(', ')})`

/**
 * Stacked lock-up (E3): white FULL-COLOR over a glass TIMES, both exactly the
 * same width. Glass = translucent spectrum fill + top specular highlight +
 * soft bottom reflection + a thin bright edge.
 */
function StackedWordmark({ className }: { className: string }) {
  const W = 520
  const font = { fontFamily: playfair.style.fontFamily, fontWeight: 900 }
  const times = { x: 0, y: 208, textLength: W, lengthAdjust: 'spacingAndGlyphs' as const, style: { ...font, fontSize: 146 } }
  return (
    <svg viewBox={`0 0 ${W + 16} 230`} className={className} role="img" aria-label="Full-Color Times">
      <defs>
        <linearGradient id="fct-spectrum" x1="0" x2="1" y1="0" y2="0">
          {SPECTRUM.map((c, i) => <stop key={c} offset={i / (SPECTRUM.length - 1)} stopColor={c} />)}
        </linearGradient>
        <linearGradient id="fct-deep" x1="0" x2="1" y1="0" y2="0">
          {SPECTRUM_DEEP.map((c, i) => <stop key={c} offset={i / (SPECTRUM_DEEP.length - 1)} stopColor={c} />)}
        </linearGradient>
        <filter id="fct-shadow" x="-10%" y="-20%" width="130%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="fct-hi" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fct-lo" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <text x="0" y="66" textLength={W} lengthAdjust="spacingAndGlyphs" fill="#ffffff" style={{ ...font, fontSize: 76 }}>FULL-COLOR</text>
      <rect x="0" y="82" width={W} height="2" fill="#ffffff" opacity="0.35" />
      {/* soft shadow on the page */}
      <text {...times} x={DEPTH + 4} y={208 + DEPTH + 6} fill="#000" opacity="0.55" filter="url(#fct-shadow)">TIMES</text>
      {/* extruded glass body: stacked layers toward the bottom-right */}
      {Array.from({ length: DEPTH }, (_, i) => DEPTH - i).map(d => (
        <text key={d} {...times} x={d * 0.8} y={208 + d} fill="url(#fct-deep)" fillOpacity={0.9}>TIMES</text>
      ))}
      {/* front face */}
      <text {...times} fill="url(#fct-spectrum)" fillOpacity="0.62">TIMES</text>
      <text {...times} fill="url(#fct-hi)">TIMES</text>
      <text {...times} fill="url(#fct-lo)">TIMES</text>
      <text {...times} fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="1.1">TIMES</text>
    </svg>
  )
}

function Wordmark({ className }: { className: string }) {
  return (
    <span className={`${playfair.className} ${className} font-black leading-[0.9] tracking-[-0.01em] whitespace-nowrap`} aria-label="Full-Color Times">
      <span className="text-white" aria-hidden="true">FULL-COLOR </span>
      <span aria-hidden="true" style={{ backgroundImage: cssGradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: 0.9 }}>TIMES</span>
    </span>
  )
}

function Rule() {
  return <div className="h-1 w-full rounded-full opacity-80" style={{ backgroundImage: cssGradient }} aria-hidden="true" />
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
        <span className="text-[var(--highlight)] [word-spacing:0.6em]">Solo. Sour. Sovereign.</span>
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
