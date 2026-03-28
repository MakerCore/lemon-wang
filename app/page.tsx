import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

/* ─── Data helpers ─── */

function getLatestPosts(dir: string, n = 2) {
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
        tags: Array.isArray(data.tags) ? data.tags as string[] : [],
        summary: data.summary as string,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n)
}

/* ─── Page ─── */

export default function Home() {
  const lemonPosts = getLatestPosts('content/posts')
  const promaxPosts = getLatestPosts('content/promax')

  return (
    <>
      <main className="pt-14">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="bento-grid animate-fade-up">

            {/* ── HERO ── */}
            <div className="bento-hero bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8 flex flex-col min-h-[260px]">
              <span className="bento-label">lemon.wang</span>
              <h1 className="font-sans text-4xl lg:text-[56px] font-bold leading-[1.05] tracking-tight text-[var(--text-primary)] mb-4">
                LEMON<br />WANG
              </h1>
              <p className="text-[15px] text-white leading-relaxed mb-2">
                PM by day. Builder by night. Writer always.
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                Making things a solo person was never supposed to make.
              </p>
              <p className="mt-auto pt-6 font-mono text-xs tracking-widest text-[var(--highlight)] uppercase">
                SOLO.&nbsp;&nbsp;SOUR.&nbsp;&nbsp;SOVEREIGN.
              </p>
            </div>

            {/* ── USER'S VOICE ── */}
            <a
              href="https://fdm-multicolor.usersvoice.lemon.wang"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-voice bg-[var(--highlight)] border border-[var(--highlight)]/20 rounded-[var(--radius-lg)] p-6
                         flex flex-col cursor-pointer group transition-all hover:brightness-110"
            >
              <span className="font-mono text-[10px] text-black/60 uppercase tracking-wider mb-4">
                USER&apos;S VOICE · COMPETITIVE INTELLIGENCE
              </span>
              <p className="font-mono text-base lg:text-lg font-bold text-black leading-relaxed mb-auto">
                310 real user voices.
                <br />
                Prusa makes you want to throw it.
                Bambu makes you cry about waste.
                Two failure modes. One clear winner.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-xs text-black/60 uppercase tracking-wider">
                  User&apos;s Voice
                </span>
                <span className="flex items-center gap-1.5 text-sm text-black font-mono">
                  <span className="group-hover:underline">Visit product</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </a>

            {/* ── NOW 1: Vibe Coding ── */}
            <div className="bento-now1 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6
                          transition-all duration-200 hover:bg-[#1a1a1a] hover:border-l-[3px] hover:border-l-[var(--accent)]">
              <span className="bento-label">Now #1</span>
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] mb-2">
                Vibe Coding
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Building AI micro-products from zero.
              </p>
            </div>

            {/* ── NOW 2: Novel ── */}
            <div className="bento-now2 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6
                          transition-all duration-200 hover:bg-[#1a1a1a] hover:border-l-[3px] hover:border-l-[var(--accent)]">
              <span className="bento-label">Now #2</span>
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] mb-2">
                Novel
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                200K+ words, still going.
              </p>
            </div>

            {/* ── NOW 3: Music ── */}
            <div className="bento-now3 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6
                          transition-all duration-200 hover:bg-[#1a1a1a] hover:border-l-[3px] hover:border-l-[var(--accent)]">
              <span className="bento-label">Now #3</span>
              <h3 className="font-mono font-bold text-sm text-[var(--text-primary)] mb-2">
                Music
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                20+ AI tracks and counting.
              </p>
            </div>

          </div>

          {/* ── LEMON'S / PROMAX'S SECTION ── */}
          <section id="labnotes" className="mt-16 pt-10 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Left — LEMON'S */}
              <div className="space-y-4">
                <h2 className="font-mono text-xs text-[#CCFF00] uppercase tracking-widest mb-4">
                  LEMON&apos;S
                </h2>
                {lemonPosts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6
                               group cursor-pointer hover:border-[#CCFF00] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {post.tags[0] && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide font-mono text-[#CCFF00] border border-[#CCFF00]">
                          {post.tags[0].toUpperCase()}
                        </span>
                      )}
                      <span className="text-xs text-[var(--text-muted)] font-mono ml-auto">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[#CCFF00] transition-colors mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>
                  </Link>
                ))}
                <div className="pt-2 text-right">
                  <Link href="/blog" className="font-mono text-sm text-[#CCFF00] hover:text-white transition-colors">
                    All posts →
                  </Link>
                </div>
              </div>

              {/* Right — PROMAX'S */}
              <div className="space-y-4">
                <h2 className="font-mono text-xs text-[#CC0000] uppercase tracking-widest mb-4">
                  PROMAX&apos;S
                </h2>
                {promaxPosts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/promax/${post.slug}`}
                    className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6
                               group cursor-pointer hover:border-[#CC0000] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {post.tags[0] && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide font-mono text-[#CC0000] border border-[#CC0000]">
                          {post.tags[0].toUpperCase()}
                        </span>
                      )}
                      <span className="text-xs text-[var(--text-muted)] font-mono ml-auto">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[#CC0000] transition-colors mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>
                  </Link>
                ))}
                <div className="pt-2 text-right">
                  <Link href="/promax" className="font-mono text-sm text-[#CC0000] hover:text-white transition-colors">
                    All posts →
                  </Link>
                </div>
              </div>

            </div>
          </section>

          {/* ── PRODUCTS SECTION ── */}
          <section className="mt-8">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
              <span className="bento-label">Products</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MOCK_PRODUCTS.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="group block border border-[var(--border)] rounded-[var(--radius)] p-4
                               hover:border-[var(--highlight)] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--highlight)] transition-colors">
                        {p.name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        p.status === 'live'
                          ? 'bg-[var(--highlight)] text-black'
                          : 'bg-[var(--accent-light)] text-[var(--accent)]'
                      }`}>
                        {p.status === 'live' ? 'Live' : 'Building'}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-snug">
                      {p.tagline}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link
                  href="/products"
                  className="font-mono text-sm text-[var(--accent)] hover:text-[var(--highlight)] transition-colors"
                >
                  All products →
                </Link>
              </div>
            </div>
          </section>

          {/* ── NEWSLETTER SECTION ── */}
          <section id="newsletter" className="mt-16 pt-10 border-t border-[var(--border)]">
            <div className="max-w-xl">
              <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)] mb-2">
                Newsletter
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Get updates on new products, LabNotes, and experiments. No spam, just output.
              </p>
              <NewsletterForm />
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
