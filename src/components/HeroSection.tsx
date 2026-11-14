import { useState, type MouseEvent } from 'react';
import {
  ArrowRight,
  Compass,
  Mail,
  MessageSquare,
  Search,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_PROFILE } from '../data/portfolio';
import { ParticleField } from './ParticleField';
import { MagneticButton } from './MagneticButton';
import { CodeVortexLogo } from './Navbar';

interface HeroSectionProps {
  onExploreWork: () => void;
  onLetsTalk: () => void;
  onOpenTerminal: () => void;
  onOpenPalette: () => void;
}

interface CodeModule {
  id: string;
  label: string;
  file: string;
  lines: Array<{ num: string; text: string; accent?: 'violet' | 'cyan' | 'muted' }>;
}

const CODE_MODULES: CodeModule[] = [
  {
    id: 'core',
    label: 'Core',
    file: 'vortex.core.ts',
    lines: [
      { num: '01', text: 'export const identity = {', accent: 'violet' },
      { num: '02', text: '  name: "Nelson Hyellamada Wazini",' },
      { num: '03', text: '  alias: "CODEVORTEX",' },
      { num: '04', text: '  languages: ["Python", "JS", "Java", "Dart", "C++"],', accent: 'cyan' },
      { num: '05', text: '};', accent: 'violet' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    file: 'intelligent.flow.py',
    lines: [
      { num: '01', text: 'class CognitiveSystem:', accent: 'violet' },
      { num: '02', text: '    builds = ["EduMind AI", "CoreVortex AI", "Voxi"]' },
      { num: '03', text: '    def transform(self, idea: str):', accent: 'cyan' },
      { num: '04', text: '        return design_and_engineer(idea)' },
      { num: '05', text: '    # Crafted for real utility', accent: 'muted' },
    ],
  },
  {
    id: 'ui',
    label: 'Craft',
    file: 'experience.tsx',
    lines: [
      { num: '01', text: 'function Experience({ intent }) {', accent: 'violet' },
      { num: '02', text: '  return (' },
      { num: '03', text: '    <System clarity={true} motion="60fps" />', accent: 'cyan' },
      { num: '04', text: '  );' },
      { num: '05', text: '}', accent: 'violet' },
    ],
  },
];

export function HeroSection({
  onExploreWork,
  onLetsTalk,
  onOpenTerminal,
  onOpenPalette,
}: HeroSectionProps) {
  const [activeModuleId, setActiveModuleId] = useState<string>('core');
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const activeModule = CODE_MODULES.find((m) => m.id === activeModuleId) ?? CODE_MODULES[0];

  const handleStageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 7, ry: px * 9 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden border-b border-white/[0.06]"
    >
      {/* Subtle Animated Architectural Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_45%,transparent_100%)]"
      />

      <ParticleField />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-10">
          {/* Left Side: Availability, Gradient Headline, Intro, Dual CTAs & Direct Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Subtle Animated Availability Indicator */}
            <div className="mb-6 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-cyan-300">
              <motion.span
                aria-hidden="true"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="inline-flex text-cyan-400 shrink-0"
              >
                <Compass className="h-4 w-4" />
              </motion.span>
              <span>{BRAND_PROFILE.availabilityText}</span>
            </div>

            <p className="mb-3 font-mono text-xs tracking-[0.18em] text-slate-400 uppercase">
              {BRAND_PROFILE.fullName} · {BRAND_PROFILE.brandName}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance]">
              I Build{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Digital Experiences
              </span>{' '}
              That Matter.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
              {BRAND_PROFILE.heroDescription}
            </p>

            {/* Two Primary Call-to-Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                type="button"
                onClick={onExploreWork}
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-950/35 transition-all duration-200 hover:brightness-110 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Explore My Work</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </MagneticButton>

              <MagneticButton
                type="button"
                onClick={onLetsTalk}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-white/15 bg-[#0C0D16]/85 px-6 py-3 text-sm font-medium text-slate-100 transition-colors duration-200 hover:border-cyan-400/50 hover:bg-[#131522] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <MessageSquare className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>Let&apos;s Talk</span>
              </MagneticButton>
            </div>

            {/* Direct Contact & Interactive Discovery Links */}
            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/[0.08] pt-6 text-xs text-slate-400">
              <a
                href={`mailto:${BRAND_PROFILE.email}`}
                className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                <Mail className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>{BRAND_PROFILE.email}</span>
              </a>

              <span aria-hidden="true" className="text-slate-700">
                /
              </span>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                <Terminal className="h-4 w-4 text-violet-400" aria-hidden="true" />
                <span>Explore Terminal</span>
              </button>

              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">
                /
              </span>

              <button
                type="button"
                onClick={onOpenPalette}
                className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                <kbd className="font-mono text-[11px] text-slate-300">Ctrl + K</kbd>
              </button>
            </div>
          </motion.div>

          {/* Right Side: Immersive 3D-Inspired Abstract Digital Composition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <div
              onMouseMove={handleStageMouseMove}
              onMouseLeave={resetTilt}
              style={{
                perspective: '1100px',
              }}
              className="relative w-full max-w-[540px]"
            >
              {/* Soft Ambient Depth Backlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full opacity-30 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.5), rgba(34,211,238,0.25) 55%, transparent 75%)',
                }}
              />

              <div
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative rounded-3xl border border-white/12 bg-[#090A11]/90 p-5 sm:p-6 shadow-2xl shadow-black/75"
              >
                {/* Geometric Orbital SVG Backdrop Layer */}
                <div className="relative mb-5 flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#06070C] px-5 py-5 overflow-hidden">
                  <svg
                    viewBox="0 0 420 140"
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="hero-node-line" x1="0" y1="0" x2="420" y2="140">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.55" />
                      </linearGradient>
                    </defs>
                    <circle cx="210" cy="70" r="62" stroke="rgba(139,92,246,0.22)" strokeDasharray="4 4" />
                    <circle cx="210" cy="70" r="96" stroke="rgba(34,211,238,0.12)" />
                    <path
                      d="M32 34L118 52L210 70L314 38L388 88M54 110L148 92L210 70L292 106L376 112"
                      stroke="url(#hero-node-line)"
                      strokeWidth="1"
                    />
                    <circle cx="32" cy="34" r="2.5" fill="#A855F7" />
                    <circle cx="118" cy="52" r="3" fill="#22D3EE" />
                    <circle cx="314" cy="38" r="3" fill="#A855F7" />
                    <circle cx="388" cy="88" r="2.5" fill="#22D3EE" />
                    <circle cx="54" cy="110" r="2.5" fill="#22D3EE" />
                    <circle cx="292" cy="106" r="2.5" fill="#A855F7" />
                  </svg>

                  {/* Central CODEVORTEX Identity Core */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-[#0C0E18] shadow-lg">
                      <CodeVortexLogo />
                    </div>
                    <div>
                      <p className="font-display text-base font-bold tracking-wider text-white">
                        {BRAND_PROFILE.brandName}
                      </p>
                      <p className="text-xs text-slate-400">{BRAND_PROFILE.tagline}</p>
                    </div>
                  </div>

                  {/* Interactive Terminal Quick Trigger */}
                  <button
                    type="button"
                    onClick={onOpenTerminal}
                    className="relative z-10 inline-flex items-center gap-1.5 rounded-lg border border-violet-500/35 bg-violet-500/15 px-3 py-1.5 font-mono text-xs text-violet-200 transition-colors hover:border-cyan-400/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <Terminal className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                    <span>Explore Terminal</span>
                  </button>
                </div>

                {/* Floating Code Composition Card */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#07080E] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-xs text-slate-300 truncate">
                      {activeModule.file}
                    </span>

                    <div
                      role="tablist"
                      aria-label="Hero code modules"
                      className="flex items-center gap-1 rounded-lg bg-white/[0.04] p-1"
                    >
                      {CODE_MODULES.map((mod) => {
                        const selected = mod.id === activeModule.id;
                        return (
                          <button
                            key={mod.id}
                            role="tab"
                            aria-selected={selected}
                            type="button"
                            onClick={() => setActiveModuleId(mod.id)}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                              selected
                                ? 'bg-gradient-to-r from-violet-600/90 to-cyan-600/90 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {mod.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <pre className="mt-4 overflow-x-auto text-xs sm:text-[13px] leading-6 font-mono">
                    <code>
                      {activeModule.lines.map((line) => {
                        const colorClass =
                          line.accent === 'violet'
                            ? 'text-violet-300'
                            : line.accent === 'cyan'
                              ? 'text-cyan-300'
                              : line.accent === 'muted'
                                ? 'text-slate-500'
                                : 'text-slate-200';
                        return (
                          <div key={line.num} className="flex gap-4">
                            <span className="select-none text-slate-600 tabular-nums">
                              {line.num}
                            </span>
                            <span className={colorClass}>{line.text}</span>
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
