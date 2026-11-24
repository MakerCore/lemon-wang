/**
 * The Full-Color Times — single source of truth for shelves, wings and
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
    code: 'A1', slug: 'portraits', name: 'Portraits', color: '#FF6F61', status: 'collecting',
    hook: 'Etsy workshops sell chibi figures at €40–50 and sell out. The next step is realistic portraits — if they come off the printer ready to sell.',
    money: 'Industrial full-color makes one portrait for €200–300. A small workshop needs to sell at €60–70 on under €10 of material.',
    posts: [],
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
    color: '#9BE6F7', status: 'collecting',
    hook: 'Collectors who display, not play. At a Shanghai doll & miniature expo, “no painting” was the selling point — and fragility the deal-breaker.',
    money: 'Doll collectors spend hundreds to ¥1,000 per show: eyes, hair and clothes first, miniature props next.',
    posts: [], seeAlso: ['F3'],
  },
  {
    code: 'A2.3', spine: 'Heritage', slug: 'heritage-replicas', name: 'Heritage Replicas', group: 'Miniatures',
    color: '#2FA3DA', status: 'collecting',
    hook: 'Lost and living landmarks in miniature — down to a single stained-glass panel. Pixel-level color is more lifelike than hand restoration.',
    posts: [], seeAlso: ['F2.1'],
  },
  {
    code: 'A3', spine: 'Figures & Toys', slug: 'figures-designer-toys', name: 'Figures & Designer Toys', color: '#2EC4B6',
    status: 'collecting',
    hook: 'Full-color can’t match 1/16 high-precision figures yet. It makes the small parts — eyes, nails — mixed with resin or FDM bodies.',
    posts: [],
  },
  {
    code: 'A4', spine: 'Gifts', slug: 'personalized-gifts', name: 'Personalized Gifts', color: '#FFD23F',
    status: 'collecting',
    hook: 'A photo becomes something you can hold.',
    money: 'A ~$43B personalized-gift market by 2028 (industry forecast); 73% of buyers say personalization is worth paying for.',
    posts: [],
  },
  {
    code: 'A4.1', spine: 'Keepsakes', slug: 'keepsake-miniatures', name: 'Keepsake Miniatures', group: 'Personalized Gifts',
    color: '#F2B705', status: 'collecting',
    hook: 'A real place, kept to remember a moment: the factory you just opened, the home you just moved into.',
    money: 'Photo-to-object keepsakes already sell: 3D laser crystal engraving alone is a ~$1.9B category (2026).',
    posts: [], seeAlso: ['A2'],
  },
  {
    code: 'A4.2', spine: 'Souvenirs', slug: 'travel-souvenirs', name: 'Travel Souvenirs', group: 'Personalized Gifts',
    color: '#FFE27A', status: 'collecting',
    hook: 'Porto’s azulejo tiles are painted one by one. Fridge magnets, wine stoppers, tiles — printed in one go.',
    money: 'A hand-painted azulejo tile sells for €18 in a Porto souvenir shop.',
    posts: [],
  },
  {
    code: 'A5', slug: 'pets', name: 'Pets', color: '#FF9A4D', status: 'collecting',
    hook: 'Owners buy likeness, not technology — and one wrong fur color means a refund.',
    money: 'Custom pet memorials: $549M worldwide in 2025. In Taiwan the best-seller is a NT$95 ($3) badge — small pieces carry the margin.',
    posts: [],
  },
  {
    code: 'A6', slug: 'education', name: 'Education', color: '#5BE38A', status: 'collecting',
    hook: 'The budget exists, but a school takes 3–6 months to buy.',
    money: '$3,000–5,000 for the printer, $500–1,000 a year in materials.',
    posts: [],
  },
  {
    code: 'A7', slug: 'stop-motion', name: 'Stop-Motion', color: '#B69CFF', status: 'collecting',
    hook: 'LAIKA printed 142,030 replacement faces for one film. Small studios now print their own.',
    money: 'An indie studio printing its own faces paid about 25% of the outsourcing cost. Stop-motion content: ~$400M a year (2025).',
    posts: [],
  },
  {
    code: 'A8', slug: 'accessories', name: 'Accessories', color: '#FFA6D5', status: 'collecting',
    hook: 'Clay, resin and hand-painted pieces: full-color replaces both the shaping and the painting in one print.',
    money: 'Personalized accessories sell for about 2.7× the plain version (industry figure).',
    posts: [],
  },
  {
    code: 'A9', spine: 'Industrial', slug: 'industrial-color-replacement', name: 'Industrial Color Replacement', color: '#C8C8C0',
    status: 'collecting',
    hook: 'Print bureaus already make money on $40k–100k+ Mimaki and Stratasys machines. Unit cost is what hurts.',
    money: 'About €200 per part on an industrial full-color machine — a Madrid print bureau’s own figure.',
    posts: [],
  },
  {
    code: 'A10', spine: 'Jewelry', slug: 'digital-jewelry', name: 'Digital Jewelry', color: '#FF4FA3', status: 'collecting',
    hook: 'Finished jewelry set with printed gems.',
    money: '3D-printed jewelry: a $690–870M market growing 8–15% a year (estimates vary by source).',
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
  { code: 'C', name: 'Markets', blurb: 'US: demand proven by Hero Forge and LAIKA. Europe: print bureaus on industrial machines are hunting for cheaper ones.' as string | undefined, href: undefined as string | undefined },
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
