'use client';

import { Mail, Github, Linkedin, MessageCircle, BookOpen } from 'lucide-react';

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialIcons = [
  { icon: XIcon, href: '#', label: 'X' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: '公众号' },
  { icon: BookOpen, href: '#', label: '小红书' },
];

export default function Footer() {
  return (
    <footer id="connect" className="bg-[var(--bg-primary)] border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left - Copyright */}
          <div>
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--highlight)] transition-colors cursor-pointer"
            >
              © 2026 lemon.wang
            </a>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center gap-6">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[var(--text-muted)] hover:text-white transition-colors duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
            <a 
              href="mailto:hi@lemon.wang" 
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span className="font-mono text-sm">hi@lemon.wang</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
