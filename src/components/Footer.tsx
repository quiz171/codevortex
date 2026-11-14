import { Mail } from 'lucide-react';
import { BRAND_PROFILE } from '../data/portfolio';
import { CodeVortexLogo } from './Navbar';

interface FooterProps {
  onOpenTerminal?: () => void;
  onOpenPalette?: () => void;
}

const FOOTER_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export function Footer({ onOpenTerminal, onOpenPalette }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#050509] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-white/[0.06] pb-10">
          <div>
            <div className="flex items-center gap-2.5">
              <CodeVortexLogo />
              <span className="font-display text-lg font-semibold tracking-wide text-white">
                {BRAND_PROFILE.brandName}
              </span>
            </div>
            <p className="mt-2.5 text-sm text-slate-400">{BRAND_PROFILE.footerTagline}</p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${BRAND_PROFILE.email}`}
              className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              <Mail className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              <span>{BRAND_PROFILE.email}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>
              &copy; {year} {BRAND_PROFILE.fullName} ({BRAND_PROFILE.brandName}). All rights
              reserved.
            </span>
            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                Terminal
              </button>
            )}
            {onOpenPalette && (
              <button
                type="button"
                onClick={onOpenPalette}
                className="hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                Ctrl + K
              </button>
            )}
          </div>

          <p className="font-mono text-xs tracking-wider text-slate-500">
            DESIGNED &amp; DEVELOPED BY CODEVORTEX.
          </p>
        </div>
      </div>
    </footer>
  );
}
