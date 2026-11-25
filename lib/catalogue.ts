import { SHELVES, CAPABILITIES, WINGS } from '@/lib/library'
import { getAllPosts, callNumberFor } from '@/lib/posts'
import { getSiteStats } from '@/lib/site-stats'

export const BASE = 'https://www.lemon.wang'

export function buildCatalogue() {
  const posts = getAllPosts().map(p => ({
    call_number: callNumberFor(p)?.code ?? null,
    title: p.title,
    date: p.date,
    summary: p.summary,
    tags: p.tags,
    url: `${BASE}/blog/${p.slug}`,
  }))

  return {
    name: 'The Full-Color Times',
    curator: { name: 'Lemon Wang', role: 'Product manager, full-color 3D printers, Flashforge', contact: 'hi@lemon.wang' },
    description: 'Field reports on who is making money with full-color 3D printing, shelved by application.',
    stats: getSiteStats(),
    shelves: SHELVES.map(s => ({
      call_number: s.code,
      name: s.name,
      group: s.group ?? null,
      status: s.status === 'open' ? 'open' : 'being_catalogued',
      finding: s.hook ?? null,
      money: s.money ?? null,
      url: s.status === 'open' ? `${BASE}/library/${s.slug}` : null,
      see_also: s.seeAlso ?? [],
    })),
    capabilities: CAPABILITIES.map(c => ({ call_number: c.code, name: c.name, note: c.note ?? null, used_by: c.usedBy ?? [] })),
    wings: WINGS.map(w => ({ call_number: w.code, name: w.name, note: w.blurb ?? null })),
    items: posts,
  }
}
