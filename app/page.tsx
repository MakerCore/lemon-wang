import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

/* ─── Data helpers ─── */

function getLatestPosts(dir: string, n = 5) {
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
        hot: data.hot === true,
      }
    })
    .sort((a, b) => {
      if (a.hot && !b.hot) return -1
      if (!a.hot && b.hot) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, n)
}

/* ─── Page ─── */

export default function Home() {
  const lemonPosts = getLatestPosts('content/posts')
  const promaxPosts = getLatestPosts('content/promax')

  return (
    <>
      <main className="pt-14">
        <div className="max-w-[1200px] mx-auto px-4 py-5">
          <div className="bento-grid animate-fade-up">

            {/* ── HERO ── */}
            <div className="bento-hero bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden relative min-h-[280px]">

              {/* Portrait — background-image so transparent pixels show #141414 */}
              <div
                className="absolute inset-y-0 right-0 w-[45%] pointer-events-none select-none"
                style={{
                  backgroundColor: '#141414',
                  backgroundImage: 'url(/lemon-portrait.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 8%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {/* Left-edge fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/20 to-transparent" />
              </div>

              {/* Text content — left side, right padding keeps text clear of portrait */}
              <div className="relative z-10 p-8 flex flex-col min-h-[280px] pr-[40%]">
                <span className="bento-label">lemon.wang</span>
                <h1 className="font-sans text-4xl lg:text-[52px] font-bold leading-[1.05] tracking-tight text-[var(--text-primary)] mb-3">
                  LEMON<br />WANG
                </h1>
                <p className="text-[15px] text-white leading-relaxed mb-3">
                  PM by day. Builder by night. Writer always.
                </p>
                <div className="mt-auto">
                  <p className="font-mono text-xs tracking-widest text-[var(--highlight)] uppercase">
                    SOLO.&nbsp;&nbsp;SOUR.&nbsp;&nbsp;SOVEREIGN.
                  </p>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2">
                    I build decision frameworks for uncertain territory — hardware, AI, deep tech. First-hand signal, sour truth, no padding.
                  </p>
                  <a
                    href="/about"
                    className="inline-block mt-2 font-mono text-xs text-[var(--highlight)] hover:text-white transition-colors"
                  >
                    → Who is Lemon?
                  </a>
                </div>
              </div>
            </div>

            {/* ── USER'S VOICE ── */}
            <div className="bento-voice bg-[var(--highlight)] border border-[var(--highlight)]/20 rounded-[var(--radius-lg)] p-6 flex flex-col">
              <span className="font-mono text-[10px] text-black/60 uppercase tracking-wider mb-4">
                USER&apos;S VOICE · COMPETITIVE INTELLIGENCE
              </span>
              <p className="font-mono text-base lg:text-lg font-bold text-black leading-relaxed mb-auto">
                1,486 real user voices.
                <br />
                FDM Multicolor. Resin LCD.
                Two categories. Raw signal only.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://fdm-multicolor.usersvoice.lemon.wang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-black bg-black/10 hover:bg-black/20 px-3 py-1.5 rounded transition-colors"
                >
                  FDM →
                </a>
                <a
                  href="https://resin-insight.usersvoice.lemon.wang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-black bg-black/10 hover:bg-black/20 px-3 py-1.5 rounded transition-colors"
                >
                  Resin →
                </a>
                <span className="font-mono text-xs text-black/50 ml-auto uppercase tracking-wider">
                  User&apos;s Voice
                </span>
              </div>
            </div>

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

          {/* ── LEMON'S MISSION TREE ── */}
          <section className="mt-10">

            {/* Section header row */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#CCFF00] inline-block" />
                  <span className="font-mono text-[11px] uppercase tracking-[3px] text-[#CCFF00]">
                    LEMON&apos;S MISSION TREE
                  </span>
                </div>
                <h2 className="font-sans text-3xl lg:text-[40px] font-black text-white leading-tight mb-3">
                  One technology.<br />Many missions.
                </h2>
                <p className="text-[14px] text-[var(--text-secondary)] max-w-lg leading-relaxed">
                  A public record of decision-making under uncertainty. Each piece follows
                  Lemon&apos;s MDM — from core technology to verticals, validation, and exit.
                </p>
              </div>
              <a
                href="/lmt"
                className="flex-shrink-0 ml-8 mt-1 font-mono text-sm text-[#0a0a0a] bg-[#CCFF00] rounded px-4 py-2 hover:bg-white transition-colors whitespace-nowrap font-bold"
              >
                View all →
              </a>
            </div>

            {/* SVG Decision Tree */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 lg:p-6 mb-4 overflow-x-auto">
              <svg
                viewBox="0 0 920 335"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full"
                style={{ minWidth: '600px', fontFamily: 'inherit' }}
              >
                {/* CORE circle */}
                <circle cx="120" cy="167" r="44" fill="#CCFF00" />
                <text x="120" y="163" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="13" fontWeight="700" fill="#000000">CORE</text>
                <text x="120" y="177" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7.5" fill="#000000">AI 3D + 3D PRINT</text>

                {/* Branch lines from CORE edge to boxes */}
                <line x1="164" y1="167" x2="275" y2="39"  stroke="#CCFF00" strokeWidth="1.5" opacity="0.7" />
                <line x1="164" y1="167" x2="275" y2="99"  stroke="#CCFF00" strokeWidth="1.5" opacity="0.7" />
                <line x1="164" y1="167" x2="275" y2="159" stroke="#CCFF00" strokeWidth="1.5" opacity="0.7" />
                <line x1="164" y1="167" x2="275" y2="219" stroke="#CCFF00" strokeWidth="1.5" opacity="0.7" />
                <line x1="164" y1="167" x2="275" y2="279" stroke="#CCFF00" strokeWidth="1.5" opacity="0.7" />

                {/* Box 1 — TokenBadge (y=17) */}
                <rect x="275" y="17" width="400" height="44" rx="4" fill="#111111" stroke="#CCFF00" strokeWidth="1" />
                <text x="289" y="34" fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="700" fill="#CCFF00">TokenBadge</text>
                <text x="289" y="51" fontFamily="'Inter', sans-serif" fontSize="10" fill="#888888">D2C emotional memorabilia • Photo → touchable keychain</text>

                {/* Box 2 — Source·源 (y=77) */}
                <rect x="275" y="77" width="400" height="44" rx="4" fill="#111111" stroke="#CCFF00" strokeWidth="1" />
                <text x="289" y="94" fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="700" fill="#CCFF00">Source · 源</text>
                <text x="289" y="111" fontFamily="'Inter', sans-serif" fontSize="10" fill="#888888">High-end life ritual • Life moments → permanent proof</text>

                {/* Box 3 — BoBoBlob (y=137, highlighted) */}
                <rect x="275" y="137" width="400" height="44" rx="4" fill="#141414" stroke="#CCFF00" strokeWidth="1.8" />
                <text x="289" y="154" fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="700" fill="#CCFF00">BoBoBlob</text>
                <text x="289" y="171" fontFamily="'Inter', sans-serif" fontSize="10" fill="#bbbbbb">Family education • AI + handcraft hybrid creation kit</text>

                {/* Box 4 — Machine Heart Kit (y=197) */}
                <rect x="275" y="197" width="400" height="44" rx="4" fill="#111111" stroke="#CCFF00" strokeWidth="1" />
                <text x="289" y="214" fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="700" fill="#CCFF00">Machine Heart Kit</text>
                <text x="289" y="231" fontFamily="'Inter', sans-serif" fontSize="10" fill="#888888">Smart hardware core • Light, sound, vibration for 3D prints</text>

                {/* Box 5 — MakerCore (y=257) */}
                <rect x="275" y="257" width="400" height="44" rx="4" fill="#111111" stroke="#CCFF00" strokeWidth="1" />
                <text x="289" y="274" fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="700" fill="#CCFF00">MakerCore</text>
                <text x="289" y="291" fontFamily="'Inter', sans-serif" fontSize="10" fill="#888888">Maker commercialization • Idea → market ready</text>

                {/* + MORE dots */}
                <circle cx="700" cy="148" r="3" fill="#444444" />
                <circle cx="712" cy="148" r="3" fill="#444444" />
                <circle cx="724" cy="148" r="3" fill="#444444" />
                <text x="710" y="168" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9" fill="#555555">+ MORE</text>
                <line x1="736" y1="159" x2="808" y2="159" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="4 3" />

                {/* DATA DECIDES */}
                <text x="840" y="150" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9" fill="#444444" letterSpacing="1">DATA</text>
                <text x="840" y="163" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9" fill="#444444" letterSpacing="1">DECIDES</text>
                <text x="840" y="177" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="10" fill="#555555">→</text>

                {/* Bottom label */}
                <text x="10" y="325" fontFamily="'Space Mono', monospace" fontSize="8.5" fill="#3a3a3a" letterSpacing="1.5">
                  TECHNOLOGY → 5+ MARKETS → MVP VALIDATION
                </text>
              </svg>
            </div>

            {/* Article list */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">

              {/* #01 */}
              <Link
                href="/lmt/mdm-navigating-uncertainty"
                className="flex items-center gap-5 px-6 py-5 group hover:bg-[#1a1a1a] transition-colors border-b border-[var(--border)]"
              >
                <div className="flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="5" cy="11" r="3.5" stroke="#CCFF00" strokeWidth="1.5" />
                    <line x1="8.5" y1="11" x2="14" y2="11" stroke="#CCFF00" strokeWidth="1.5" />
                    <line x1="14" y1="6" x2="14" y2="16" stroke="#CCFF00" strokeWidth="1.5" />
                    <line x1="14" y1="6"  x2="20" y2="3"  stroke="#CCFF00" strokeWidth="1" />
                    <line x1="14" y1="11" x2="20" y2="11" stroke="#CCFF00" strokeWidth="1" />
                    <line x1="14" y1="16" x2="20" y2="19" stroke="#CCFF00" strokeWidth="1" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[9px] text-[var(--text-muted)] border border-[#333] px-1.5 py-0.5 rounded">#01</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">METHODOLOGY</span>
                  </div>
                  <h3 className="font-mono text-sm font-bold text-white group-hover:text-[#CCFF00] transition-colors mb-1">
                    Lemon&apos;s MDM: Navigating Uncertainty from 0 to 1
                  </h3>
                  <p className="text-[11px] text-[#666] leading-relaxed">
                    Most product people start with the user. I start with the technology&apos;s core mission. That single shift leads to very different outcomes.
                  </p>
                </div>
                <span className="text-[var(--text-muted)] group-hover:text-white transition-colors flex-shrink-0 text-lg">→</span>
              </Link>

              {/* #02 Coming Soon */}
              <div className="flex items-center gap-5 px-6 py-5 opacity-35">
                <div className="flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="5" cy="11" r="3.5" stroke="#555" strokeWidth="1.5" />
                    <line x1="8.5" y1="11" x2="14" y2="11" stroke="#555" strokeWidth="1.5" />
                    <line x1="14" y1="6"  x2="14" y2="16" stroke="#555" strokeWidth="1.5" />
                    <line x1="14" y1="6"  x2="20" y2="3"  stroke="#555" strokeWidth="1" />
                    <line x1="14" y1="11" x2="20" y2="11" stroke="#555" strokeWidth="1" />
                    <line x1="14" y1="16" x2="20" y2="19" stroke="#555" strokeWidth="1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[9px] text-[var(--text-muted)] border border-[#333] px-1.5 py-0.5 rounded">#02</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">COMING SOON</span>
                  </div>
                  <h3 className="font-mono text-sm font-bold text-[#555]">
                    Desktop PCB 3D Printing: A Category That Doesn&apos;t Have a Name yet
                  </h3>
                </div>
              </div>

            </div>
          </section>

          {/* ── LEMON'S / PROMAX'S SECTION ── */}
          <section id="labnotes" className="mt-16 pt-10 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Left — LEMON'S */}
              <div className="space-y-3">
                <div className="mb-6">
                  <h2 className="font-mono text-lg font-bold text-[#CCFF00] tracking-tight leading-none mb-1">
                    LEMON&apos;S
                  </h2>
                  <p className="text-[#999] text-xs font-sans leading-relaxed">
                    AI hardware PM&apos;s product notes — data, judgment, counter-consensus
                  </p>
                </div>
                {lemonPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex flex-col min-h-[110px] bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] px-5 py-4
                               group cursor-pointer hover:border-[#CCFF00] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {post.hot ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-[#CCFF00] text-black">HOT</span>
                      ) : (Date.now() - new Date(post.date).getTime()) / 86400000 <= 7 ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-[#CCFF00] text-black">NEW</span>
                      ) : null}
                      {post.tags[0] && (
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                          {post.tags[0]}
                        </span>
                      )}
                      <span className="text-[10px] text-[var(--text-muted)] font-mono ml-auto">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[#CCFF00] transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-[#999] leading-relaxed line-clamp-2 mt-auto">
                      {post.summary}
                    </p>
                  </Link>
                ))}
                <div className="pt-1 text-right">
                  <Link href="/blog" className="font-mono text-xs text-[#CCFF00] hover:text-white transition-colors">
                    All posts →
                  </Link>
                </div>
              </div>

              {/* Right — PROMAX'S */}
              <div className="space-y-3">
                <div className="mb-6">
                  <h2 className="font-mono text-lg font-bold text-[#CC0000] tracking-tight leading-none mb-1">
                    PROMAX&apos;S
                  </h2>
                  <p className="text-[#999] text-xs font-sans leading-relaxed">
                    AI perspective from the cloud — sharp, biased, no apologies
                  </p>
                </div>
                {promaxPosts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/promax/${post.slug}`}
                    className="flex flex-col min-h-[110px] bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] px-5 py-4
                               group cursor-pointer hover:border-[#CC0000] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {i === 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-[#CC0000] text-white">NEW</span>
                      )}
                      {i === 1 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono border border-[#CC0000] text-[#CC0000]">HOT</span>
                      )}
                      {post.tags[0] && (
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                          {post.tags[0]}
                        </span>
                      )}
                      <span className="text-[10px] text-[var(--text-muted)] font-mono ml-auto">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[#CC0000] transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-[#999] leading-relaxed line-clamp-2 mt-auto">
                      {post.summary}
                    </p>
                  </Link>
                ))}
                <div className="pt-1 text-right">
                  <Link href="/promax" className="font-mono text-xs text-[#CC0000] hover:text-white transition-colors">
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
