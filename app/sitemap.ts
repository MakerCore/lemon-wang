import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE = 'https://www.lemon.wang'

// Map a content dir to its public URL prefix
const SECTIONS: { dir: string; prefix: string }[] = [
  { dir: 'content/posts', prefix: '/blog' },
  { dir: 'content/promax', prefix: '/promax' },
  { dir: 'content/lmt', prefix: '/lmt' },
]

function postsFor(dir: string, prefix: string): MetadataRoute.Sitemap {
  const fullDir = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullDir)) return []
  return fs
    .readdirSync(fullDir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(fullDir, filename), 'utf-8')
      const { data } = matter(raw)
      const slug = filename.replace('.mdx', '')
      const date = data.date ? new Date(data.date) : new Date()
      return {
        url: `${BASE}${prefix}/${slug}`,
        lastModified: isNaN(date.getTime()) ? new Date() : date,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/promax`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/lmt`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/tools/print-cost`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE}/tools/uv-data-engine`, changeFrequency: 'monthly' as const, priority: 0.5 },
  ].map(r => ({ ...r, lastModified: new Date() }))

  const postRoutes = SECTIONS.flatMap(s => postsFor(s.dir, s.prefix))

  return [...staticRoutes, ...postRoutes]
}
