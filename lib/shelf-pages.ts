/**
 * Long-form content for shelves that have their own page.
 * Every fact here comes from an article already published on lemon.wang.
 */

export interface ShelfPage {
  moneySource: string
  money: { label: string; value: string }[]
  priceTable?: { product: string; price: string; note: string }[]
  findings: { title: string; body: string }[]
  album: { src: string; caption: string; wide?: boolean }[]
}

export const SHELF_PAGES: Record<string, ShelfPage> = {
  'tabletop-wargaming': {
    moneySource: 'UKGE 2026 stall interviews — see “What I Saw at UKGE”',
    money: [
      { label: 'What they make', value: 'Miniatures and terrain, sold unpainted or fully painted.' },
      { label: 'Who buys', value: 'Young wargamers (20–30) who want to play, not paint.' },
      { label: 'What they pay', value: 'Painted resin terrain £25 vs £11 unpainted: +127% for one coat of paint.' },
      { label: 'Why color wins', value: 'Hand-painting one piece takes 6–7 hours. Full-color printing skips it.' },
    ],
    priceTable: [
      { product: 'FDM single-color mini', price: '€3–5', note: 'Stall owner prints these himself' },
      { product: 'White-mode injection', price: '£2 / piece', note: 'Bare plastic, buyer must paint' },
      { product: 'Painted injection', price: '£6 / piece', note: 'Hand-painted, sold in sets' },
      { product: 'White-mode resin terrain', price: '£11', note: 'Buyer paints it' },
      { product: 'Painted resin terrain', price: '£25', note: '+127% premium' },
      { product: 'Full-color UV-cured terrain', price: '£16–32', note: '“No painting required” is the slogan' },
    ],
    findings: [
      { title: 'The buyer is the player, not the family.', body: 'Two days walking every aisle at UKGE, the UK’s largest tabletop expo. Families were in the board-game section.' },
      { title: 'Cheap desktop printers are already production capacity.', body: 'At Mantic Games, a rack of £500 desktop printers makes 10mm miniatures that a €26,000 industrial machine can’t make economically.' },
      { title: 'Sell the printer, not the service.', body: 'Studios won’t share files — “once you sell the files, you lose ownership.” A printer gives them control; a service takes it away.' },
    ],
    album: [
      { src: '/warlord-hero.webp', caption: 'Warlord Games HQ, Nottingham', wide: true },
      { src: '/mantic-print-room-1.webp', caption: 'Mantic Games print room' },
      { src: '/mantic-print-room-2.webp', caption: 'Mantic 10mm miniatures' },
      { src: '/warlord-resin.webp', caption: 'Red Devils — painted vs unpainted resin' },
      { src: '/warlord-cavalry.webp', caption: 'Black Powder cavalry — Warlord product line' },
      { src: '/warlord-store.webp', caption: 'Warlord HQ store — Bolt Action table', wide: true },
    ],
  },
}
