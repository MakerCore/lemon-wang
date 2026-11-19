import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { SHELVES, CAPABILITIES, WINGS, callNumberFor } from '@/lib/library'

export const BASE = 'https://www.lemon.wang'

export function buildCatalogue() {
  const dir = path.join(process.cwd(), 'content/posts')
  const posts = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => {
        const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf-8'))
        const slug = f.replace('.mdx', '')
        return {
          call_number: callNumberFor(slug)?.code ?? null,
          title: data.title as string,
          date: data.date as string,
          summary: data.summary as string,
          tags: Array.isArray(data.tags) ? data.tags : [],
          url: `${BASE}/blog/${slug}`,
        }
      }).sort((a, b) => (a.date < b.date ? 1 : -1))
    : []

  return {
    name: 'The Full-Color Library',
    curator: { name: 'Lemon Wang', role: 'Full-color product researcher, Flashforge', contact: 'hi@lemon.wang' },
    description: 'Field research on what people make and sell with full-color 3D printing, shelved by application.',
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
