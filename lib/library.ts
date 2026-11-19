/**
 * The Full-Color Library — single source of truth for shelves, wings and
 * call numbers. Used by the homepage, /library/[slug], /llms.txt and
 * /catalogue.json.
 *
 * Rule: only write what Lemon has said or published. Anything not yet
 * known stays `undefined` and renders as "Being catalogued".
 */

export type ShelfStatus = 'open' | 'collecting'

export interface Shelf {
  code: string            // call number, e.g. "A2.1"
  slug: string            // URL slug under /library
  name: string
  spine?: string          // short label for the hero bookshelf
  group?: string          // parent shelf name, e.g. "Miniatures"
  color: string           // shelf colour (full-colour spectrum)
  status: ShelfStatus     // 'open' = has a shelf page
  hook?: string           // one-line finding
  money?: string          // who pays, what it sells for
  posts: string[]         // content/posts slugs filed on this shelf
  seeAlso?: string[]      // other call numbers
}

export interface Capability {
  code: string
  name: string
  note?: string
  usedBy?: string[]
}

export const SHELVES: Shelf[] = [
  {
    code: 'A1', slug: 'portraits', name: 'Portraits', color: '#FF6F61',
    status: 'collecting', posts: [],
  },
  {
    code: 'A2.1', spine: 'Wargaming', slug: 'tabletop-wargaming', name: 'Tabletop Wargaming', group: 'Miniatures',
    color: '#3EC8F0', status: 'open',
    hook: 'The real full-color buyer: wargamers who want to play, not paint.',
    money: 'Painted terrain sells for £25 vs £11 unpainted. Full-color skips 6–7 hours of painting.',
    posts: ['ukge-full-color-real-users', 'warlord-games-uk-factory-tour', 'mantic-capacity-before-demand'],
    seeAlso: ['A2.2', 'A2.3'],
  },
  {
    code: 'A2.2', spine: 'Dollhouse & Food', slug: 'dollhouses-miniature-food', name: 'Dollhouses & Miniature Food', group: 'Miniatures',
    color: '#9BE6F7', status: 'collecting', posts: [], seeAlso: ['F3'],
  },
  {
    code: 'A2.3', spine: 'Heritage', slug: 'heritage-replicas', name: 'Heritage Replicas', group: 'Miniatures',
    color: '#2FA3DA', status: 'collecting',
    hook: 'Lost and living landmarks in miniature — down to a single stained-glass panel.',
    posts: [], seeAlso: ['F2.1'],
  },
  {
    code: 'A3', spine: 'Figures & Toys', slug: 'figures-designer-toys', name: 'Figures & Designer Toys', color: '#2EC4B6',
    status: 'collecting', posts: [],
  },
  {
    code: 'A4', spine: 'Gifts', slug: 'personalized-gifts', name: 'Personalized Gifts', color: '#FFD23F',
    status: 'collecting', posts: [],
  },
  {
    code: 'A4.1', spine: 'Keepsakes', slug: 'keepsake-miniatures', name: 'Keepsake Miniatures', group: 'Personalized Gifts',
    color: '#F2B705', status: 'collecting',
    hook: 'A real place, kept to remember a moment: the factory you just opened, the home you just moved into.',
    posts: [], seeAlso: ['A2'],
  },
  {
    code: 'A4.2', spine: 'Souvenirs', slug: 'travel-souvenirs', name: 'Travel Souvenirs', group: 'Personalized Gifts',
    color: '#FFE27A', status: 'collecting', posts: [],
  },
  {
    code: 'A5', slug: 'pets', name: 'Pets', color: '#FF9A4D', status: 'collecting', posts: [],
  },
  {
    code: 'A6', slug: 'education', name: 'Education', color: '#5BE38A', status: 'collecting', posts: [],
  },
  {
    code: 'A7', slug: 'stop-motion', name: 'Stop-Motion', color: '#B69CFF', status: 'collecting', posts: [],
  },
  {
    code: 'A8', slug: 'accessories', name: 'Accessories', color: '#FFA6D5', status: 'collecting', posts: [],
  },
  {
    code: 'A9', spine: 'Industrial', slug: 'industrial-color-replacement', name: 'Industrial Color Replacement', color: '#C8C8C0',
    status: 'collecting', posts: [],
  },
  {
    code: 'A10', spine: 'Jewelry', slug: 'digital-jewelry', name: 'Digital Jewelry', color: '#FF4FA3', status: 'collecting',
    hook: 'Finished jewelry set with printed gems.',
    posts: [], seeAlso: ['F1'],
  },
]

export const CAPABILITIES: Capability[] = [
  { code: 'F1', name: 'Digital Materials', note: 'Tortoiseshell, shell, gemstone — resin jade with identical veining, piece after piece.', usedBy: ['A10'] },
  { code: 'F2.1', name: 'Transparency', note: 'Color you can see light through — stained-glass panels and more.', usedBy: ['A2.3'] },
  { code: 'F2.2', name: 'Light Inside (Tyndall)', note: 'Voxel color that scatters light within the part: depth and glow, not just see-through.' },
  { code: 'F3', name: 'Soft & Soft-Hard', note: 'Ultra-flexible, or soft and rigid in one print — the cream on a miniature parfait.', usedBy: ['A2.2'] },
  { code: 'F4', name: 'Fine Detail' },
]

/** Wings B–E: across all applications. */
export const WINGS = [
  { code: 'B', name: 'Industry', blurb: 'Pricing, positioning, who competes where.', href: '/blog' },
  { code: 'C', name: 'Markets', blurb: undefined as string | undefined, href: undefined as string | undefined },
  { code: 'D', name: "User's Voice", blurb: '1,486 raw user voices: FDM Multicolor and Resin LCD.', href: 'https://fdm-multicolor.usersvoice.lemon.wang' },
  { code: 'E', name: 'Method', blurb: "Lemon's MDM: start from the technology's mission, not the user.", href: '/lmt' },
]

/** Call numbers for posts that are not on an application shelf. */
export const POST_WING: Record<string, string> = {
  'full-color-vs-fdm': 'B',
  '699-killed-the-middle-ground': 'B',
}

export function shelfByCode(code: string) {
  return SHELVES.find(s => s.code === code)
}

/** Returns e.g. "A2.1" for a post slug, or the wing letter, or undefined. */
export function callNumberFor(postSlug: string): { code: string; color: string } | undefined {
  const shelf = SHELVES.find(s => s.posts.includes(postSlug))
  if (shelf) return { code: shelf.code, color: shelf.color }
  const wing = POST_WING[postSlug]
  if (wing) return { code: wing, color: '#CCFF00' }
  return undefined
}
