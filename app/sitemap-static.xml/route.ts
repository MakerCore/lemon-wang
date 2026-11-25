import sitemap from '@/app/sitemap'

export const dynamic = 'force-static'

/** Plain-XML twin of /sitemap.xml, kept because robots.txt and search consoles point here. */
export function GET() {
  const urls = sitemap().map(r => [
    '  <url>',
    `    <loc>${r.url}</loc>`,
    `    <lastmod>${new Date(r.lastModified ?? Date.now()).toISOString().slice(0, 10)}</lastmod>`,
    `    <changefreq>${r.changeFrequency}</changefreq>`,
    `    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n'))
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
