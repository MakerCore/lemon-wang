import {
  ScanFace, Swords, House, Landmark, ToyBrick, Gift, Building2, Luggage, PawPrint,
  GraduationCap, Clapperboard, Watch, Factory, Gem, Shell, Sun, Lightbulb, Feather, ZoomIn,
  type LucideIcon,
} from 'lucide-react'

/** One icon per call number, so a shelf reads at a glance. */
const ICONS: Record<string, LucideIcon> = {
  'A1': ScanFace,        // Portraits
  'A2.1': Swords,        // Tabletop Wargaming
  'A2.2': House,         // Dollhouses & Miniature Food
  'A2.3': Landmark,      // Heritage Replicas
  'A3': ToyBrick,        // Figures & Designer Toys
  'A4': Gift,            // Personalized Gifts
  'A4.1': Building2,     // Keepsake Miniatures (your factory, your home)
  'A4.2': Luggage,       // Travel Souvenirs
  'A5': PawPrint,        // Pets
  'A6': GraduationCap,   // Education
  'A7': Clapperboard,    // Stop-Motion
  'A8': Watch,           // Accessories
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
