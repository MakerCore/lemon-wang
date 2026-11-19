import { Playfair_Display } from 'next/font/google'
import { SHELVES } from '@/lib/library'

const playfair = Playfair_Display({ subsets: ['latin'], weight: '900', display: 'swap' })

/** One shelf colour per letter of FULL-COLOR. */
const LETTER_COLORS = ['#FF6F61', '#3EC8F0', '#9BE6F7', '#2FA3DA', '#2EC4B6', '#FFD23F', '#FF9A4D', '#5BE38A', '#B69CFF', '#FF4FA3']

export default function TimesMasthead({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const text = size === 'lg' ? 'text-[44px] sm:text-[64px] lg:text-[80px]' : 'text-2xl'
  return (
    <div className="flex flex-col gap-2">
      <p className={`${playfair.className} ${text} font-black leading-[0.9] tracking-[-0.01em] whitespace-nowrap`} aria-label="Full-Color Times">
        {'FULL-COLOR'.split('').map((ch, i) => (
          <span key={i} style={{ color: LETTER_COLORS[i] }} aria-hidden="true">{ch}</span>
        ))}
        <span className="text-white" aria-hidden="true"> TIMES</span>
      </p>
      <div className="flex h-1.5 w-full" aria-hidden="true">
        {SHELVES.map(s => <span key={s.code} className="flex-1" style={{ background: s.color }} />)}
      </div>
    </div>
  )
}
