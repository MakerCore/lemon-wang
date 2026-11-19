import {
  ScanFace, Swords, House, Landmark, ToyBrick, Gift, Luggage, PawPrint,
  GraduationCap, Clapperboard, Factory, Gem, Shell, Sun, Lightbulb, Feather, ZoomIn,
  type LucideIcon,
} from 'lucide-react'
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number }

/** A ring with a sparkling stone — Accessories. */
function RingIcon({ strokeWidth = 1.75, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="15" r="6.5" />
      <path d="M9.5 6.5 12 9l2.5-2.5L13 4.5h-2z" />
      <path d="M18.5 3.5v2M17.5 4.5h2M5 5v1.6M4.2 5.8h1.6" />
    </svg>
  )
}

/** A Porto azulejo tile pattern — Keepsake Miniatures. */
function AzulejoIcon({ strokeWidth = 1.75, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M12 7c1.6 0 2.5 1.2 2.5 2.5S13.6 12 12 12s-2.5-1.2-2.5-2.5S10.4 7 12 7zM12 12c1.6 0 2.5 1.2 2.5 2.5S13.6 17 12 17s-2.5-1.2-2.5-2.5S10.4 12 12 12z" />
      <path d="M7 12c0-1.6 1.2-2.5 2.5-2.5M7 12c0 1.6 1.2 2.5 2.5 2.5M17 12c0-1.6-1.2-2.5-2.5-2.5M17 12c0 1.6-1.2 2.5-2.5 2.5" />
      <path d="M3 3l3 3M21 3l-3 3M3 21l3-3M21 21l-3-3" />
    </svg>
  )
}

type AnyIcon = LucideIcon | ((p: IconProps) => JSX.Element)

/** One icon per call number, so a shelf reads at a glance. */
const ICONS: Record<string, AnyIcon> = {
  'A1': ScanFace,        // Portraits
  'A2.1': Swords,        // Tabletop Wargaming
  'A2.2': House,         // Dollhouses & Miniature Food
  'A2.3': Landmark,      // Heritage Replicas
  'A3': ToyBrick,        // Figures & Designer Toys
  'A4': Gift,            // Personalized Gifts
  'A4.1': AzulejoIcon,   // Keepsake Miniatures (Porto tile pattern)
  'A4.2': Luggage,       // Travel Souvenirs
  'A5': PawPrint,        // Pets
  'A6': GraduationCap,   // Education
  'A7': Clapperboard,    // Stop-Motion
  'A8': RingIcon,        // Accessories (ring with a sparkling stone)
  'A9': Factory,         // Industrial Color Replacement
  'A10': Gem,            // Digital Jewelry
  'F1': Shell,           // Digital Materials
  'F2.1': Sun,           // Transparency
  'F2.2': Lightbulb,     // Light inside (Tyndall)
  'F3': Feather,         // Soft & Soft-Hard
  'F4': ZoomIn,          // Fine Detail
}

export default function ShelfIcon({ code, className, strokeWidth = 1.75 }: { code: string; className?: string; strokeWidth?: number }) {
  const Icon = ICONS[code]
  if (!Icon) return null
  return <Icon aria-hidden="true" className={className} strokeWidth={strokeWidth} />
}
