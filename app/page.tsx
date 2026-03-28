'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { MOCK_POSTS, MOCK_PRODUCTS } from '@/lib/mock-data';

/* ─── Types ─── */
type TypeLabel = 'labnote' | 'music' | 'product';

/* ─── Shared sub-components ─── */

function TypeBadge({ type }: { type: TypeLabel }) {
  const map: Record<TypeLabel, { label: string; cls: string }> = {
    labnote: { label: 'LabNote', cls: 'text-[var(--accent)] border border-[var(--accent)]' },
    music: { label: 'Music', cls: 'text-purple-400 border border-purple-400' },
    product: { label: 'Product', cls: 'text-[var(--red)] border border-[var(--red)]' },
  };
  const { label, cls } = map[type];
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide font-mono ${cls}`}>
      {label}
    </span>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 text-sm bg-[var(--bg-card)] border border-[var(--border)] rounded-lg
                     text-white placeholder:text-[var(--text-muted)]
                     focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-bold text-black bg-[var(--highlight)] rounded-lg
                     hover:bg-white active:scale-[0.98] transition-all cursor-pointer font-mono whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
      {status === 'success' && (
        <p className="text-sm text-[var(--highlight)] mt-3 animate-fade-in">
          You&apos;re in. Welcome to the loop.
        </p>
      )}
    </div>
  );
}

/* ─── Page ─── */

export default function Home() {
  const [lat1, lat2] = MOCK_POSTS;

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

          {/* ── LABNOTES SECTION ── */}
          <section id="labnotes" className="mt-16 pt-10 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {/* LabNotes Cards */}
              <div className="space-y-4">
                <h2 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4">
                  LABNOTES
                </h2>
                <Link
                  href={`/blog/${lat1.slug}`}
                  className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6
                             group cursor-pointer hover:border-[var(--highlight)] transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <TypeBadge type={lat1.type === 'music' ? 'music' : 'labnote'} />
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {lat1.published_at.slice(0, 10)}
                    </span>
                    <span className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--highlight)] transition-colors text-lg">→</span>
                  </div>
                  <h2 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--highlight)] transition-colors text-lg mb-2">
                    {lat1.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {lat1.body.slice(0, 140)}…
                  </p>
                </Link>
                <Link
                  href={lat2.tags.includes('music') ? '/music' : `/blog/${lat2.slug}`}
                  className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6
                             group cursor-pointer hover:border-[var(--highlight)] transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <TypeBadge type={lat2.tags.includes('music') ? 'music' : 'labnote'} />
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {lat2.published_at.slice(0, 10)}
                    </span>
                    <span className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--highlight)] transition-colors">→</span>
                  </div>
                  <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--highlight)] transition-colors text-[15px] mb-1.5">
                    {lat2.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {lat2.body.slice(0, 100)}…
                  </p>
                </Link>
                <div className="pt-2 text-right">
                  <Link
                    href="/blog"
                    className="font-mono text-sm text-[var(--accent)] hover:text-[var(--highlight)] transition-colors"
                  >
                    All posts →
                  </Link>
                </div>
              </div>

              {/* Products Cards */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 flex flex-col">
                <span className="bento-label">Products</span>
                <div className="flex flex-col gap-3 flex-1">
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
