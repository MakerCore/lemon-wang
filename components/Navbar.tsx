'use client';

import { useState, useRef } from 'react';

interface WorkItem {
  label: string;
  href?: string;
  disabled: boolean;
  comingSoon?: string;
}

interface WorkGroup {
  title: string;
  items: WorkItem[];
}

const workGroups: WorkGroup[] = [
  {
    title: 'INTELLIGENCE',
    items: [
      { label: 'iNew3D', href: 'https://inew3d.usersvoice.lemon.wang', disabled: false },
      { label: 'FDM Multicolor', href: 'https://fdm-multicolor.usersvoice.lemon.wang', disabled: false },
      { label: 'Resin LCD', href: 'https://resin-insight.usersvoice.lemon.wang', disabled: false },
    ],
  },
  {
    title: 'CREATIVE',
    items: [
      { label: 'Music', href: '#music', disabled: false },
      { label: 'Novel', disabled: true },
    ],
  },
];

const toolsLinks = [
  { label: 'ROI Calculator', href: '/tools/print-cost' },
  { label: "User's Voice Data Engine", href: '/tools/uv-data-engine' },
];

const labnotesLinks = [
  { label: "Lemon's", href: '/blog', hoverColor: '#CCFF00' },
  { label: "ProMax's", href: '/promax', hoverColor: '#CC0000' },
];

export default function Navbar() {
  const [workOpen, setWorkOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [labnotesOpen, setLabnotesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLabnote, setHoveredLabnote] = useState('');

  const workTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const labnotesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function makeHandlers(
    setOpen: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) {
    return {
      onMouseEnter: () => {
        if (timer.current) clearTimeout(timer.current);
        setOpen(true);
      },
      onMouseLeave: () => {
        timer.current = setTimeout(() => setOpen(false), 200);
      },
    };
  }

  const workHandlers = makeHandlers(setWorkOpen, workTimer);
  const toolsHandlers = makeHandlers(setToolsOpen, toolsTimer);
  const labnotesHandlers = makeHandlers(setLabnotesOpen, labnotesTimer);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="LEMON.WANG" className="h-10 w-auto" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Work dropdown */}
            <div className="relative" {...workHandlers}>
              <button className={`font-mono text-sm transition-colors duration-200 flex items-center gap-1 relative ${workOpen ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'}`}>
                Work
                <span className="absolute -top-1 -right-2 w-[6px] h-[6px] rounded-full bg-[var(--red)]" />
              </button>
              {workOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg py-3 shadow-lg" {...workHandlers}>
                  {workGroups.map((group, groupIndex) => (
                    <div key={group.title}>
                      {groupIndex > 0 && <div className="border-t border-[var(--border)] my-2" />}
                      <div className="px-4 py-2">
                        <span className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-muted)]">{group.title}</span>
                      </div>
                      {group.items.map((item) => (
                        <div key={item.label} className="px-2">
                          {item.disabled ? (
                            <div className="flex items-center justify-between px-3 py-2 rounded cursor-not-allowed">
                              <span className="font-mono text-sm text-[var(--text-muted)]">{item.label}</span>
                              {'comingSoon' in item && item.comingSoon && <span className="font-mono text-[11px] text-[var(--text-muted)]">{item.comingSoon}</span>}
                            </div>
                          ) : (
                            <a href={item.href!} className="flex items-center justify-between px-3 py-2 rounded hover:bg-[#1a1a1a] transition-colors">
                              <span className="font-mono text-sm text-[var(--text-secondary)] hover:text-white transition-colors">{item.label}</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tools dropdown */}
            <div className="relative" {...toolsHandlers}>
              <button className={`font-mono text-sm transition-colors duration-200 ${toolsOpen ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'}`}>
                Tools
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-[#0a0a0a] border border-[var(--border)] rounded-lg py-2 shadow-xl" {...toolsHandlers}>
                  {toolsLinks.map((item) => (
                    <a key={item.label} href={item.href} className="block px-4 py-2.5 font-mono text-sm text-[var(--text-secondary)] hover:text-[#CCFF00] transition-colors duration-150">
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* LabNotes dropdown */}
            <div className="relative" {...labnotesHandlers}>
              <button className={`font-mono text-sm transition-colors duration-200 ${labnotesOpen ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'}`}>
                LabNotes
              </button>
              {labnotesOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-[#0a0a0a] border border-[var(--border)] rounded-lg py-2 shadow-xl" {...labnotesHandlers}>
                  {labnotesLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 font-mono text-sm transition-colors duration-150"
                      style={{ color: hoveredLabnote === item.label ? item.hoverColor : 'var(--text-secondary)' }}
                      onMouseEnter={() => setHoveredLabnote(item.label)}
                      onMouseLeave={() => setHoveredLabnote('')}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter */}
            <a href="#newsletter" className="font-mono text-sm text-[var(--text-muted)] hover:text-white transition-colors duration-200">
              Newsletter
            </a>
          </div>

          {/* Mobile hamburger — no border */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)] px-4 py-4 space-y-4">
          <div>
            <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] mb-2">WORK</p>
            {workGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] mb-1 mt-2">{group.title}</p>
                {group.items.filter((i) => !i.disabled).map((item) => (
                  <a key={item.label} href={item.href} className="block py-2 font-mono text-sm text-[var(--text-secondary)] hover:text-white transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] mb-2">TOOLS</p>
            {toolsLinks.map((item) => (
              <a key={item.label} href={item.href} className="block py-2 font-mono text-sm text-[var(--text-secondary)] hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] mb-2">LABNOTES</p>
            {labnotesLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 font-mono text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = item.hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <a href="#newsletter" className="block py-2 font-mono text-sm text-[var(--text-secondary)] hover:text-white transition-colors">
              Newsletter
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
