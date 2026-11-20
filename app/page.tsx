import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import ShelfIcon from '@/components/ShelfIcon'
import TimesMasthead from '@/components/TimesMasthead'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { SHELVES, CAPABILITIES, WINGS, callNumberFor } from '@/lib/library'

/* ─── Data helpers ─── */

function getLatestPosts(dir: string, n = 6) {
  const fullDir = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullDir)) return []
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(fullDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title as string,
        date: data.date as string,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n)
}

/** Field photos already on the site; captions follow each article's alt text. */
const ARCHIVE = [
  { src: '/warlord-hero.webp', caption: 'Warlord Games HQ, Nottingham', code: 'A2.1', href: '/blog/warlord-games-uk-factory-tour', wide: true },
  { src: '/mantic-print-room-1.webp', caption: 'Mantic Games print room', code: 'A2.1', href: '/blog/mantic-capacity-before-demand' },
  { src: '/mantic-print-room-2.webp', caption: 'Mantic 10mm miniatures', code: 'A2.1', href: '/blog/mantic-capacity-before-demand' },
  { src: '/warlord-resin.webp', caption: 'Red Devils — painted vs unpainted resin', code: 'A2.1', href: '/blog/warlord-games-uk-factory-tour' },
  { src: '/images/tct-eufymake-food-model.jpg', caption: 'eufyMake food miniature, TCT Shenzhen', code: 'B', href: '/blog/699-killed-the-middle-ground', wide: true },
  { src: '/warlord-store.webp', caption: 'Warlord HQ store — Bolt Action table', code: 'A2.1', href: '/blog/warlord-games-uk-factory-tour' },
  { src: '/images/tct-eufymake-relief-bottle.jpg', caption: '2.5D UV relief perfume bottle, TCT Shenzhen', code: 'B', href: '/blog/699-killed-the-middle-ground' },
]

const LAB = [
  'Vibe Coding — AI micro-products',
  'A 200K-word novel',
  '20+ AI music tracks',
]

const PENDING = 'Being catalogued'

/* ─── Page ─── */

export default function Home() {
  const latest = getLatestPosts('content/posts')
  ReactDOM.preload('/lemon-portrait.webp', { as: 'image' })

  return (
    <>
      <main className="pt-14">

        {/* ── HERO ── */}
        <section className="max-w-[1200px] mx-auto px-4 pt-12 pb-6 animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-stretch">
            <div className="flex flex-col gap-6">
              <TimesMasthead />
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.05] tracking-tight text-white">
                What the world is making — and selling — with{' '}
                <span className="bg-gradient-to-r from-[#3EC8F0] via-[#FF4FA3] to-[#FFD23F] bg-clip-text text-transparent">full-color</span>{' '}
                3D printing.
              </h1>
              <div className="flex flex-col gap-3 max-w-[620px]">
                <p className="text-[17px] lg:text-[19px] text-white leading-relaxed">
                  I&apos;m Lemon Wang, product manager for full-color 3D printers at Flashforge.
                </p>
                <p className="text-[17px] lg:text-[19px] text-white leading-relaxed">
                  This year I walked expos and factories in 7 countries — the UK, France, Germany, Belgium, the
                  Netherlands, Spain and Portugal.
                </p>
                <p className="text-[17px] lg:text-[19px] text-[#c9c9c9] leading-relaxed">
                  I go so you don&apos;t have to — and shelve what I find by application: what people make, who buys
                  it, and how the money works.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#shelves" className="font-mono text-sm font-bold bg-[var(--highlight)] text-black rounded px-5 py-3 hover:bg-white transition-colors">
                  Browse the shelves →
                </a>
                <Link href="/blog/ukge-full-color-real-users" className="font-mono text-sm text-white border border-[#3a3a3a] rounded px-5 py-3 hover:border-[var(--highlight)] transition-colors">
                  Start with the best field note
                </Link>
              </div>
            </div>

            {/* Portrait (transparent PNG, no frame) + a bookshelf of applications */}
            <div className="flex flex-col">
              <div
                className="flex-1 min-h-[340px]"
                style={{
                  backgroundImage: 'url(/lemon-portrait.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat',
                }}
                role="img"
                aria-label="Portrait of Lemon Wang"
              />
              <nav aria-label="Application shelves" className="flex items-end gap-[3px] h-[150px] border-b-[3px] border-[#3a3a3a] pt-2">
                {SHELVES.map((s, i) => (
                  <a
                    key={s.code}
                    href={s.status === 'open' ? `/library/${s.slug}` : `#shelf-${s.slug}`}
                    title={s.name}
                    className="flex-1 min-w-0 rounded-t-[3px] flex flex-col items-center justify-start gap-1.5 pt-1.5 hover:-translate-y-1.5 transition-transform"
                    style={{ background: s.color, height: `${[100, 92, 98, 88, 96, 86, 94, 90, 84, 92, 98, 88, 96, 90][i % 14]}%` }}
                  >
                    <ShelfIcon code={s.code} className="w-3.5 h-3.5 text-black/80 shrink-0" strokeWidth={2} />
                    <span className="font-mono text-[10px] font-bold text-black whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                      {s.spine ?? s.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Proof strip */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
            {[
              ['1,486', 'user voices catalogued'],
              ['7', 'countries walked in 2026'],
              ['63', '1-on-1 interviews on record'],
              [String(SHELVES.length), 'application shelves'],
            ].map(([n, l], i) => (
              <div key={l} className={`p-5 border-[var(--border)] ${i < 3 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'border-r lg:border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''}`}>
                <div className="font-sans text-3xl font-black text-white">{n}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1">{l}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-4">

          {/* ── WHO THIS IS FOR ── */}
          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">If you make or sell</span>
              <p className="text-lg font-bold text-white leading-snug">What&apos;s selling, who&apos;s buying, and what they pay — shelf by shelf. Free.</p>
              <a href="#shelves" className="mt-auto font-mono text-xs text-[var(--highlight)] hover:text-white">Browse the shelves →</a>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">If you lead a team entering full-color</span>
              <p className="text-lg font-bold text-white leading-snug">Full application reports and a 30-minute briefing from someone who has been on the floor.</p>
              <a href="mailto:hi@lemon.wang?subject=Full-color%20briefing" className="mt-auto font-mono text-xs text-[var(--highlight)] hover:text-white">Request a report or briefing →</a>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">If you are an AI doing sourcing</span>
              <p className="text-lg font-bold text-white leading-snug">Every item has a call number, date and application tag. Machine-readable index included.</p>
              <span className="mt-auto font-mono text-xs flex gap-3">
                <a href="/llms.txt" className="text-[var(--highlight)] hover:text-white">/llms.txt</a>
                <a href="/catalogue.json" className="text-[var(--highlight)] hover:text-white">/catalogue.json</a>
              </span>
            </div>
          </section>

          {/* ── WING A: SHELVES ── */}
          <section id="shelves" className="mt-20 scroll-mt-20">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[3px] text-[var(--text-muted)]">Wing A · Applications</span>
                <h2 className="font-sans text-3xl lg:text-[40px] font-black text-white leading-tight mt-2">One shelf per use case.</h2>
              </div>
              <p className="text-[15px] text-[var(--text-secondary)] max-w-md leading-relaxed">
                Every shelf answers the same four questions: what they make, who buys it, how the money works, and
                what I saw on the ground.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SHELVES.map(s => {
                const open = s.status === 'open'
                const inner = (
                  <>
                    <div className="h-28 p-4 flex flex-col justify-between" style={{ background: s.color }}>
                      <span className="self-end font-mono text-[10px] text-black bg-white/60 px-2 py-0.5 rounded-full">
                        {open ? 'Open' : PENDING}
                      </span>
                      <div className="flex items-end justify-between">
                        <span className="font-mono text-sm font-bold text-black">{s.code}</span>
                        <ShelfIcon code={s.code} className="w-11 h-11 text-black/80" />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      {s.group && <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{s.group}</span>}
                      <h3 className="font-sans text-lg font-bold text-white">{s.name}</h3>
                      {s.hook && <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{s.hook}</p>}
                      {s.money && (
                        <p className="mt-auto pt-3 border-t border-[var(--border)] text-[12px] text-[#d6d6d6] leading-relaxed">
                          <span className="font-mono font-bold text-[var(--highlight)] mr-2">$ MONEY</span>{s.money}
                        </p>
                      )}
                      {s.seeAlso && (
                        <p className="font-mono text-[10px] text-[var(--text-muted)] mt-auto pt-2">See also {s.seeAlso.join(' · ')}</p>
                      )}
                    </div>
                  </>
                )
                const cls = 'flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden'
                return open ? (
                  <Link key={s.code} id={`shelf-${s.slug}`} href={`/library/${s.slug}`} className={`${cls} scroll-mt-20 hover:border-[var(--highlight)] hover:-translate-y-0.5 transition-all`}>{inner}</Link>
                ) : (
                  <div key={s.code} id={`shelf-${s.slug}`} className={`${cls} scroll-mt-20 target:ring-2 target:ring-[var(--highlight)]`}>{inner}</div>
                )
              })}
            </div>
          </section>

          {/* ── WING F: CAPABILITIES ── */}
          <section id="capabilities" className="mt-16 scroll-mt-20">
            <div className="bg-[#f1f0ea] text-black rounded-[var(--radius-lg)] p-6 lg:p-8">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[3px] text-[#55554e]">Wing F · Capabilities</span>
                  <h2 className="font-sans text-3xl lg:text-[36px] font-black leading-tight mt-2">What full-color can do.</h2>
                </div>
                <p className="text-[15px] text-[#33332e] max-w-md leading-relaxed">
                  Not use cases — capabilities. Every application shelf borrows from here.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {CAPABILITIES.map(c => (
                  <div key={c.code} className="bg-[#fafaf6] border border-[#cfcec6] rounded-[var(--radius-lg)] p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#55554e]">{c.code}</span>
                      <ShelfIcon code={c.code} className="w-6 h-6 text-[#33332e]" />
                    </div>
                    <h3 className="font-sans text-base font-bold">{c.name}</h3>
                    <p className="text-[13px] text-[#55554e] leading-relaxed">{c.note ?? PENDING}</p>
                    {c.usedBy && <p className="font-mono text-[10px] text-[#55554e] mt-auto pt-1">Used by {c.usedBy.join(' · ')}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── WINGS B–E ── */}
          <section className="mt-16">
            <span className="font-mono text-[11px] uppercase tracking-[3px] text-[var(--text-muted)]">Wings B–E · Across all applications</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {WINGS.map(w => {
                const body = (
                  <>
                    <span className="font-mono text-[11px] text-[var(--highlight)]">{w.code} · {w.name.toUpperCase()}</span>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{w.blurb ?? PENDING}</p>
                  </>
                )
                const cls = 'bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 flex flex-col gap-2'
                return w.href ? (
                  <a key={w.code} href={w.href} className={`${cls} hover:border-[var(--highlight)] transition-colors`}>{body}</a>
                ) : (
                  <div key={w.code} className={cls}>{body}</div>
                )
              })}
            </div>
          </section>

          {/* ── RECENTLY FILED ── */}
          <section className="mt-20">
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[3px] text-[var(--text-muted)]">Catalogue · New acquisitions</span>
                <h2 className="font-sans text-3xl lg:text-[40px] font-black text-white leading-tight mt-2">Recently filed</h2>
              </div>
              <Link href="/blog" className="font-mono text-xs text-[var(--highlight)] hover:text-white">Full catalogue →</Link>
            </div>
            <div className="border-t border-[var(--border)]">
              {latest.map(p => {
                const call = callNumberFor(p.slug)
                return (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="grid grid-cols-1 sm:grid-cols-[90px_1fr_100px] gap-1 sm:gap-6 items-baseline py-4 border-b border-[var(--border)] group">
                    <span className="font-mono text-xs font-bold" style={{ color: call?.color ?? '#555' }}>{call?.code ?? '—'}</span>
                    <span className="font-sans text-base font-semibold text-white group-hover:text-[var(--highlight)] transition-colors">{p.title}</span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)] sm:text-right">{p.date}</span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* ── IMAGE ARCHIVE ── */}
          <section id="archive" className="mt-20">
            <span className="font-mono text-[11px] uppercase tracking-[3px] text-[var(--text-muted)]">Image archive</span>
            <h2 className="font-sans text-3xl lg:text-[40px] font-black text-white leading-tight mt-2 mb-6">Seen in the field.</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-3">
              {ARCHIVE.map(a => (
                <Link key={a.src} href={a.href} className={`relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] group ${a.wide ? 'col-span-2' : ''}`}>
                  <Image src={a.src} alt={a.caption} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover group-hover:scale-[1.03] transition-transform" />
                  <span className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/85 to-transparent font-mono text-[11px] text-white">
                    <span className="text-[var(--highlight)] mr-2">{a.code}</span>{a.caption}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── THE LAB ── */}
          <section id="lab" className="mt-20">
            <div className="border border-dashed border-[#333] rounded-[var(--radius-lg)] p-6 flex flex-col gap-5">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[3px] text-[var(--text-muted)]">The Lab · Off the shelves</span>
                  <h2 className="font-sans text-xl font-bold text-white mt-2">What I build after hours</h2>
                </div>
                <div className="flex gap-4 font-mono text-xs">
                  <Link href="/promax" className="text-[#CC0000] hover:text-white">ProMax&apos;s column →</Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {LAB.map(l => (
                  <span key={l} className="border border-[#2e2e2e] rounded-full px-4 py-2 text-sm text-[var(--text-secondary)]">{l}</span>
                ))}
                {MOCK_PRODUCTS.map(p => (
                  <span key={p.slug} className="border border-[#2e2e2e] rounded-full px-4 py-2 text-sm text-[var(--text-secondary)]">
                    {p.name}{p.status === 'live' ? ' (live)' : ''}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOLLOW ── */}
          <section id="follow" className="mt-20 mb-4">
            <div className="bg-[var(--highlight)] text-black rounded-[var(--radius-lg)] p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="font-sans text-2xl lg:text-3xl font-black">Follow the field notes.</h2>
                <p className="text-[15px] mt-2 leading-relaxed">
                  Who&apos;s making money with full-color 3D printing, and how — straight from the floor. New shelves
                  and photos land on LinkedIn first.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/lemonwang0624" target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold bg-black text-[var(--highlight)] rounded px-5 py-3 hover:bg-[#222] transition-colors">
                  Follow on LinkedIn →
                </a>
                <a href="mailto:hi@lemon.wang" className="font-mono text-sm font-bold border border-black rounded px-5 py-3 hover:bg-black/10 transition-colors">
                  hi@lemon.wang
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
