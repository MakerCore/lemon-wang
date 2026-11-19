import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import { TimesMastheadBar } from '@/components/TimesMasthead'
import { SHELVES, shelfByCode } from '@/lib/library'
import { SHELF_PAGES } from '@/lib/shelf-pages'

export function generateStaticParams() {
  return SHELVES.filter(s => s.status === 'open').map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const shelf = SHELVES.find(s => s.slug === params.slug)
  if (!shelf) return {}
  return {
    title: `${shelf.code} ${shelf.name} — The Full-Color Times`,
    description: shelf.hook,
  }
}

function getPost(slug: string) {
  const file = path.join(process.cwd(), 'content/posts', `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data } = matter(fs.readFileSync(file, 'utf-8'))
  return { slug, title: data.title as string, date: data.date as string, summary: data.summary as string }
}

export default function ShelfPage({ params }: { params: { slug: string } }) {
  const shelf = SHELVES.find(s => s.slug === params.slug)
  const page = SHELF_PAGES[params.slug]
  if (!shelf || shelf.status !== 'open' || !page) notFound()

  const posts = shelf.posts.map(getPost).filter(Boolean) as NonNullable<ReturnType<typeof getPost>>[]
  const related = (shelf.seeAlso ?? []).map(c => shelfByCode(c)).filter(Boolean)

  return (
    <>
      <main className="pt-14">
        <div className="max-w-[1200px] mx-auto px-4 pt-6 pb-6">
          <TimesMastheadBar />
        </div>
        {/* Header band in the shelf colour */}
        <section style={{ background: shelf.color }} className="text-black">
          <div className="max-w-[1200px] mx-auto px-4 pt-6 pb-12">
            <div className="flex flex-wrap justify-between gap-3 font-mono text-xs">
              <Link href="/#shelves" className="font-bold hover:underline">← All shelves</Link>
              <span>Wing A{shelf.group ? ` · ${shelf.group}` : ''} · Shelf {shelf.code}</span>
            </div>
            <p className="font-mono text-sm font-bold mt-12">{shelf.code}</p>
            <h1 className="font-sans text-4xl sm:text-6xl font-black tracking-tight leading-none mt-2">{shelf.name}</h1>
            {shelf.hook && <p className="text-lg sm:text-xl leading-relaxed mt-5 max-w-3xl">{shelf.hook}</p>}
            <nav className="flex flex-wrap gap-2 mt-8 font-mono text-xs">
              <a href="#money" className="bg-black px-3 py-2 rounded-full" style={{ color: shelf.color }}>How the money works</a>
              <a href="#findings" className="border border-black px-3 py-2 rounded-full">Findings</a>
              <a href="#album" className="border border-black px-3 py-2 rounded-full">Album</a>
              <a href="#notes" className="border border-black px-3 py-2 rounded-full">Field notes · {posts.length}</a>
              {related.length > 0 && <a href="#see-also" className="border border-black px-3 py-2 rounded-full">See also</a>}
            </nav>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-4">
          {/* Money */}
          <section id="money" className="mt-14 scroll-mt-20">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-white">How the money works</h2>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">Source: {page.moneySource}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {page.money.map(m => (
                <div key={m.label} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: shelf.color }}>{m.label}</span>
                  <p className="text-[15px] font-semibold text-white leading-snug">{m.value}</p>
                </div>
              ))}
            </div>
            {page.priceTable && (
              <div className="mt-4 overflow-x-auto border border-[var(--border)] rounded-[var(--radius-lg)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left font-mono text-[11px] uppercase text-[var(--text-muted)] border-b border-[var(--border)]">
                      <th className="p-3">Product</th><th className="p-3">Price</th><th className="p-3">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.priceTable.map(r => (
                      <tr key={r.product} className="border-b border-[var(--border)] last:border-0">
                        <td className="p-3 text-white">{r.product}</td>
                        <td className="p-3 font-mono text-white whitespace-nowrap">{r.price}</td>
                        <td className="p-3 text-[var(--text-secondary)]">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Findings */}
          <section id="findings" className="mt-16 scroll-mt-20">
            <span className="font-mono text-[11px] uppercase tracking-[3px] text-[var(--text-muted)]">What a decision-maker should know in 60 seconds</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              {page.findings.map(f => (
                <div key={f.title} className="pt-4 border-t-[3px]" style={{ borderColor: shelf.color }}>
                  <h3 className="font-sans text-lg font-bold text-white leading-snug">{f.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Album */}
          <section id="album" className="mt-16 scroll-mt-20">
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-white mb-5">Album</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-3">
              {page.album.map(a => (
                <figure key={a.src} className={`relative m-0 rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] ${a.wide ? 'col-span-2' : ''}`}>
                  <Image src={a.src} alt={a.caption} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 to-transparent font-mono text-[11px] text-white">{a.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Field notes */}
          <section id="notes" className="mt-16 scroll-mt-20">
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-white mb-2">Field notes</h2>
            <div>
              {posts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block py-5 border-b border-[var(--border)] group">
                  <span className="font-mono text-[11px]" style={{ color: shelf.color }}>{shelf.code} · {p.date}</span>
                  <h3 className="font-sans text-lg font-semibold text-white group-hover:text-[var(--highlight)] transition-colors mt-1">{p.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1 line-clamp-2">{p.summary}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Report CTA + see also */}
          <section className="mt-16 mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Application report</span>
              <p className="text-lg font-bold text-white">The full {shelf.name} report: market, users, players.</p>
              <a href={`mailto:hi@lemon.wang?subject=${encodeURIComponent(`${shelf.code} ${shelf.name} report`)}`} className="mt-2 self-start font-mono text-sm font-bold bg-[var(--highlight)] text-black rounded px-4 py-2.5 hover:bg-white transition-colors">
                Request the full report
              </a>
            </div>
            {related.length > 0 && (
              <div id="see-also" className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-3 scroll-mt-20">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">See also</span>
                {related.map(r => r && (
                  <div key={r.code} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-sm" style={{ background: r.color }} />
                    <span className="font-mono text-xs text-[var(--text-muted)]">{r.code}</span>
                    <span className="text-white">{r.name}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
