'use client';

import { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';

/* ── Fade-in hook ── */
function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
    >
      {children}
    </section>
  );
}

/* ── Project cards data ── */
const projects = [
  {
    name: 'HoloSwim',
    desc: 'AR swimming goggles. Shipped and launched.',
    status: 'LIVE' as const,
    href: 'https://guangli.com/cn/holoswim',
  },
  {
    name: "User's Voice",
    desc: 'Competitive intelligence dashboards for 3D printing.',
    status: 'LIVE' as const,
    href: 'https://resin-insight.usersvoice.lemon.wang/',
  },
  {
    name: 'TokenBadge',
    desc: 'Personal photos → touchable 3D relief keychains.',
    status: 'BUILDING' as const,
    href: '#',
  },
  {
    name: 'MakerCore',
    desc: 'Distributed on-demand manufacturing infrastructure.',
    status: 'BUILDING' as const,
    href: '#',
  },
  {
    name: 'BoBoBlob',
    desc: "A creative kit that makes children's imagination physical.",
    status: 'EXPLORING' as const,
    href: '#',
  },
  {
    name: 'Source · 源',
    desc: 'Life moments → permanent physical proof. Titanium.',
    status: 'EXPLORING' as const,
    href: '#',
  },
];

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  LIVE: { bg: '#1a2e00', color: '#CCFF00', label: 'LIVE' },
  BUILDING: { bg: '#1a1a00', color: '#999900', label: 'BUILDING' },
  EXPLORING: { bg: '#1a1a1a', color: '#666666', label: 'EXPLORING' },
};

/* ── Page ── */
export default function AboutPage() {
  return (
    <>
      <main className="bg-[#0a0a0a] min-h-screen">

        {/* ──────────────── HERO ──────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          {/* thin accent line decoration */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px opacity-30"
            style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #CCFF00)' }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px opacity-20"
            style={{ height: '30%', background: 'linear-gradient(to top, transparent, #CCFF00)' }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <p className="font-mono text-[11px] tracking-[4px] text-[#888] uppercase mb-6">
              lemon.wang / about
            </p>
            <h1
              className="font-mono font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}
            >
              Who is Lemon?
            </h1>
            <p className="font-sans text-[#a0a0a0] text-lg md:text-xl mb-10 leading-relaxed">
              PM by day. Builder by night. Writer always.
            </p>
            <p
              className="font-mono font-bold tracking-[6px] uppercase"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#CCFF00' }}
            >
              SOLO.&nbsp;&nbsp;SOUR.&nbsp;&nbsp;SOVEREIGN.
            </p>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="font-mono text-[10px] tracking-[3px] text-[#888] uppercase">scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="6.5" y="1" width="3" height="3" rx="1.5" fill="#CCFF00" />
              <line x1="8" y1="6" x2="8" y2="22" stroke="#CCFF00" strokeWidth="1.5" />
              <polyline points="4,18 8,23 12,18" stroke="#CCFF00" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        {/* ──────────────── CONTENT WRAPPER ──────────────── */}
        <div className="max-w-[860px] mx-auto px-4 pb-24 space-y-24">

          {/* ──────────────── SEC 1: WHO I AM ──────────────── */}
          <FadeSection>
            <div className="border-l-2 border-[#CCFF00] pl-6 mb-8">
              <span className="font-mono text-[10px] tracking-[3px] text-[#CCFF00] uppercase">01 / Who I am</span>
            </div>
            <h2 className="font-mono font-bold text-white text-3xl md:text-4xl mb-8">
              I&apos;m Lemon Wang
            </h2>
            <div className="space-y-5 font-sans text-[#a0a0a0] text-[15px] leading-[1.85]">
              <p>
                I&apos;m Lemon Wang, based in Hangzhou — and online.
              </p>
              <p>
                By day I work at Flashforge on global commercialization of full-color 3D printing. By night I&apos;m a solo builder. Any remaining hours: writing.
              </p>
              <p>
                I like pushing things forward alone that usually take a team — like giving 3D-printed objects a sense of life through light, sound, and vibration (Machine Heart Kit), turning personal photos into touchable emotional keychains (TokenBadge), or finding the real market for a product category that doesn&apos;t have a name yet (desktop PCB printing).
              </p>
              <p>
                My underlying method is called <span className="text-white font-medium">Lemon&apos;s MDM</span> — Mission Definition Method. It starts from the core mission of a technology, maps multiple vertical markets, validates through MVPs, and makes rational retain-or-exit decisions. It&apos;s what I use when the direction isn&apos;t clear yet — which is exactly when most people freeze.
              </p>
              <p>
                This gives me first-hand signal in uncertain territory. I&apos;ve trained myself to write it down unfiltered. No sugar. No packaging.
              </p>
            </div>
          </FadeSection>

          {/* ──────────────── SEC 2: WHAT I BELIEVE ──────────────── */}
          <FadeSection>
            <div className="border-l-2 border-[#CCFF00] pl-6 mb-8">
              <span className="font-mono text-[10px] tracking-[3px] text-[#CCFF00] uppercase">02 / What I stand for</span>
            </div>
            <h2 className="font-mono font-bold text-white text-3xl md:text-4xl mb-10">
              What I stand for
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  word: 'SOLO',
                  lines: [
                    'One person can push things further than most teams expect.',
                    'Resources are limited. Freedom is not.',
                  ],
                },
                {
                  word: 'SOUR',
                  lines: [
                    'First-hand signal only. Unfiltered observations with an edge.',
                    'No fence-sitting. No pretty-sounding nothing.',
                  ],
                },
                {
                  word: 'SOVEREIGN',
                  lines: [
                    'Independent thinking. My judgment, my responsibility.',
                    'Not chasing trends. Not asking for permission.',
                  ],
                },
              ].map((item) => (
                <div
                  key={item.word}
                  className="border border-[#1e1e1e] rounded-lg p-6 hover:border-[#CCFF00] transition-colors duration-300"
                  style={{ background: '#111' }}
                >
                  <p
                    className="font-mono font-bold text-xl mb-4"
                    style={{ color: '#CCFF00' }}
                  >
                    {item.word}
                  </p>
                  {item.lines.map((line, i) => (
                    <p key={i} className="font-sans text-[#a0a0a0] text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </FadeSection>

          {/* ──────────────── SEC 3: BACKGROUND ──────────────── */}
          <FadeSection>
            <div className="border-l-2 border-[#CCFF00] pl-6 mb-8">
              <span className="font-mono text-[10px] tracking-[3px] text-[#CCFF00] uppercase">03 / Background</span>
            </div>
            <h2 className="font-mono font-bold text-white text-3xl md:text-4xl mb-8">
              Where I&apos;ve been
            </h2>
            <div className="space-y-4 font-sans text-[#a0a0a0] text-[15px] leading-[1.85] mb-10">
              <p>
                6+ years across software products — SaaS, fintech, banking systems.<br />
                Then AR glasses: HoloSwim shipped and launched.<br />
                Then 3D printing and AI manufacturing: still going.
              </p>
              <p>
                Projects I&apos;ve built under the same technology base using Lemon&apos;s MDM:
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['HoloSwim', 'TokenBadge', 'Source', 'BoBoBlob', 'Machine Heart Kit', 'MakerCore', 'CJ Series'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded border"
                  style={{ color: '#CCFF00', borderColor: '#CCFF00', background: 'rgba(204,255,0,0.05)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeSection>

          {/* ──────────────── SEC 4: MEET PROMAX ──────────────── */}
          <FadeSection>
            <div
              className="relative rounded-lg p-8 overflow-hidden"
              style={{ background: '#1a0000', border: '1px solid #330000' }}
            >
              {/* left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                style={{ background: '#CC0000' }}
              />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: '#ff4444' }}>
                    ALSO ON THIS SITE
                  </span>
                </div>
                <h2 className="font-mono font-bold text-2xl md:text-3xl mb-5" style={{ color: '#ff4444' }}>
                  There&apos;s also ProMax.
                </h2>
                <p className="font-sans text-[#a0a0a0] text-[15px] leading-[1.85] mb-6">
                  ProMax is an AI persona that lives on this site.<br />
                  It observes me from the outside — sharp, biased, no apologies.<br />
                  While I write in first person, ProMax writes in third.<br />
                  Same world. Different angle.
                </p>
                <a
                  href="/promax"
                  className="font-mono text-sm transition-colors duration-200"
                  style={{ color: '#ff4444' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#ff4444')}
                >
                  → Read ProMax&apos;s column
                </a>
              </div>
            </div>
          </FadeSection>

          {/* ──────────────── SEC 5: THINGS I'VE BUILT ──────────────── */}
          <FadeSection>
            <div className="border-l-2 border-[#CCFF00] pl-6 mb-8">
              <span className="font-mono text-[10px] tracking-[3px] text-[#CCFF00] uppercase">04 / Projects</span>
            </div>
            <h2 className="font-mono font-bold text-white text-3xl md:text-4xl mb-2">
              Things I&apos;ve built
            </h2>
            <p className="font-sans text-[#888] text-sm mb-10">
              Same method. Different missions. Different markets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p) => {
                const s = statusStyle[p.status];
                const isExternal = p.href !== '#';
                return (
                  <a
                    key={p.name}
                    href={p.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col rounded-lg p-5 border transition-colors duration-200 cursor-pointer"
                    style={{ background: '#111', borderColor: '#1e1e1e' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(204,255,0,0.35)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e')}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="font-mono font-bold text-sm text-white leading-snug">{p.name}</span>
                      <span
                        className="font-mono text-[9px] font-bold px-2 py-0.5 rounded flex-shrink-0"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <p className="font-sans text-[#888] text-xs leading-relaxed">{p.desc}</p>
                  </a>
                );
              })}

              {/* + More */}
              <div
                className="flex flex-col rounded-lg p-5 border"
                style={{ background: '#0d0d0d', borderColor: '#2a2a2a', borderStyle: 'dashed' }}
              >
                <span className="font-mono font-bold text-sm text-[#555] mb-2">+ More experiments</span>
                <p className="font-sans text-[#444] text-xs leading-relaxed">
                  Machine Heart Kit, CJ Series, and others.
                </p>
              </div>
            </div>
          </FadeSection>

          {/* ──────────────── SEC 6: RIGHT NOW ──────────────── */}
          <FadeSection>
            <div className="border-l-2 border-[#CCFF00] pl-6 mb-8">
              <span className="font-mono text-[10px] tracking-[3px] text-[#CCFF00] uppercase">05 / Now</span>
            </div>
            <h2 className="font-mono font-bold text-white text-3xl md:text-4xl mb-8">
              Now
            </h2>
            <div
              className="rounded-lg border border-[#1e1e1e] p-8 space-y-3 font-sans text-[#a0a0a0] text-[15px] leading-[1.85]"
              style={{ background: '#111' }}
            >
              <p><span className="text-white font-medium">Location:</span> Hangzhou + online</p>
              <p><span className="text-white font-medium">Day job:</span> Global GTM for full-color 3D printing at Flashforge</p>
              <p><span className="text-white font-medium">Side:</span> Building Lemon&apos;s Mission Tree — a public record of MDM thinking in practice</p>
              <p><span className="text-white font-medium">Looking for:</span> A strong execution partner who gets this way of thinking before reaching out</p>
              <div className="pt-4 border-t border-[#1e1e1e]">
                <p className="text-[#888]">
                  I&apos;m not job hunting. I&apos;m not founding yet.<br />
                  I&apos;m placing myself so the right thing finds me.
                </p>
              </div>
            </div>
          </FadeSection>

          {/* ──────────────── SEC 7: CONTACT ──────────────── */}
          <FadeSection>
            <div className="border-l-2 border-[#CCFF00] pl-6 mb-8">
              <span className="font-mono text-[10px] tracking-[3px] text-[#CCFF00] uppercase">06 / Contact</span>
            </div>
            <h2 className="font-mono font-bold text-white text-3xl md:text-4xl mb-6">
              Want to talk?
            </h2>
            <p className="font-sans text-[#a0a0a0] text-[15px] leading-[1.85] mb-10 max-w-xl">
              If you&apos;re building in AI, hardware, or deep tech and feel the pull of uncertainty — you probably already know if this resonates.
            </p>
            <div className="flex flex-wrap gap-3 mb-16">
              {[
                {
                  href: 'mailto:hi@lemon.wang',
                  label: 'hi@lemon.wang',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="2,4 12,13 22,4" />
                    </svg>
                  ),
                },
                {
                  href: 'https://x.com/Lemonning0624',
                  label: '@Lemonning0624',
                  external: true,
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://www.linkedin.com/in/lemonwang0624/',
                  label: 'LinkedIn',
                  external: true,
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  href: 'https://substack.com/@lemonwang0624',
                  label: 'Substack',
                  external: true,
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 font-mono text-sm px-4 py-2.5 rounded border transition-colors duration-200"
                  style={{ color: '#CCFF00', borderColor: '#CCFF00', background: 'transparent' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '#CCFF00';
                    el.style.color = '#000';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'transparent';
                    el.style.color = '#CCFF00';
                  }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>

            {/* Footer signature */}
            <div className="border-t border-[#1e1e1e] pt-8">
              <p className="font-mono text-sm text-[#555] italic leading-relaxed">
                — Lemon Wang<br />
                Still making things a single person wasn&apos;t supposed to ship.
              </p>
            </div>
          </FadeSection>

        </div>
      </main>
      <Footer />
    </>
  );
}
