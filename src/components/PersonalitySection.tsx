import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Code2, Dribbble, Gamepad2 } from 'lucide-react';

interface StoryChapter {
  id: 'engineering' | 'basketball' | 'gaming';
  title: string;
  subtitle: string;
  narrative: string;
  traits: string[];
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'engineering',
    title: 'Software Engineering',
    subtitle: 'Structure, curiosity, and purposeful creation',
    narrative:
      'Building software is how I turn abstract thoughts into tools people can rely on. From low-level logic in C and C++ to AI-assisted platforms and web systems, I enjoy breaking down messy problems into clean, maintainable architecture.',
    traits: ['Systems Thinking', 'Clean Architecture', 'Applied AI', 'Continuous Iteration'],
  },
  {
    id: 'basketball',
    title: 'Basketball',
    subtitle: 'Court vision, rhythm, and composure under pressure',
    narrative:
      'The hardwood teaches everything great engineering requires: reading the floor before making a move, trusting teammates, adapting in real time, and putting in deliberate reps when nobody is watching.',
    traits: ['Court Vision', 'Team Chemistry', 'Discipline', 'Fast Adaptation'],
  },
  {
    id: 'gaming',
    title: 'Gaming',
    subtitle: 'Interactive worlds, mechanics, and strategic depth',
    narrative:
      'Gaming shaped my appreciation for responsive interfaces, feedback loops, and smart system design. Whether analyzing strategy or exploring immersive worlds, it keeps my curiosity sharp about how digital experiences feel.',
    traits: ['Pattern Recognition', 'Strategic Focus', 'Interactive Design', 'World Building'],
  },
];

function EngineeringVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="eng-line" x1="0" y1="0" x2="480" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* Subtle Blueprint Grid */}
      <path
        d="M40 60H440M40 120H440M40 180H440M40 240H440M40 300H440M100 30V310M180 30V310M260 30V310M340 30V310M420 30V310"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
      />
      {/* Modular Architecture Nodes */}
      <rect x="64" y="72" width="110" height="58" rx="10" fill="#0E101A" stroke="rgba(139,92,246,0.45)" />
      <rect x="306" y="72" width="110" height="58" rx="10" fill="#0E101A" stroke="rgba(34,211,238,0.45)" />
      <rect x="180" y="198" width="120" height="64" rx="12" fill="#111322" stroke="url(#eng-line)" strokeWidth="1.5" />

      {/* Connecting Paths */}
      <path
        d="M174 101H306M119 130V164C119 175 128 184 139 184H220V198M361 130V164C361 175 352 184 341 184H260V198"
        stroke="url(#eng-line)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="240" cy="101" r="4" fill="#22D3EE" />
      <circle cx="240" cy="230" r="6" fill="#A855F7" />
      <circle cx="119" cy="101" r="3" fill="#A855F7" />
      <circle cx="361" cy="101" r="3" fill="#22D3EE" />
      <text x="86" y="105" fill="#CBD5E1" fontSize="11" fontFamily="JetBrains Mono, monospace">
        INPUT.SYS
      </text>
      <text x="328" y="105" fill="#CBD5E1" fontSize="11" fontFamily="JetBrains Mono, monospace">
        AI.ENGINE
      </text>
      <text x="202" y="234" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace">
        CODEVORTEX
      </text>
    </svg>
  );
}

function BasketballVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="court-arc" x1="80" y1="280" x2="400" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* Stylized Half-Court Geometry */}
      <rect x="44" y="34" width="392" height="272" rx="14" stroke="rgba(255,255,255,0.12)" strokeWidth="1.25" />
      {/* Key / Paint */}
      <rect x="176" y="34" width="128" height="128" stroke="rgba(168,85,247,0.35)" strokeWidth="1.25" />
      <circle cx="240" cy="162" r="44" stroke="rgba(168,85,247,0.35)" strokeWidth="1.25" strokeDasharray="4 4" />
      {/* Three-Point Arc */}
      <path
        d="M84 34V128C84 214.156 153.844 284 240 284C326.156 284 396 214.156 396 128V34"
        stroke="rgba(34,211,238,0.4)"
        strokeWidth="1.5"
      />
      {/* Backboard & Rim */}
      <line x1="208" y1="54" x2="272" y2="54" stroke="#E2E8F0" strokeWidth="2" />
      <circle cx="240" cy="68" r="10" stroke="#22D3EE" strokeWidth="1.75" />

      {/* Shot Trajectory Curve */}
      <path
        d="M118 232C154 114 202 88 240 68"
        stroke="url(#court-arc)"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <circle cx="118" cy="232" r="7" fill="#A855F7" fillOpacity="0.25" stroke="#A855F7" strokeWidth="1.5" />
      <circle cx="352" cy="196" r="5" fill="#22D3EE" fillOpacity="0.25" stroke="#22D3EE" strokeWidth="1.5" />
      <path d="M352 196L282 146" stroke="rgba(34,211,238,0.45)" strokeWidth="1.25" strokeDasharray="3 3" />
    </svg>
  );
}

function GamingVisual() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="game-grad" x1="100" y1="60" x2="380" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Concentric Strategy Rings */}
      <circle cx="240" cy="170" r="118" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle cx="240" cy="170" r="84" stroke="rgba(139,92,246,0.22)" strokeWidth="1" strokeDasharray="5 5" />
      <circle cx="240" cy="170" r="48" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />

      {/* Stylized Minimal Controller Silhouette */}
      <path
        d="M158 134H322C345 134 364 153 368 176L376 220C378 232 368 242 356 240C348 239 341 234 335 227L314 204H166L145 227C139 234 132 239 124 240C112 242 102 232 104 220L112 176C116 153 135 134 158 134Z"
        fill="#0D0F1A"
        stroke="url(#game-grad)"
        strokeWidth="1.75"
      />
      {/* D-Pad */}
      <path d="M168 156V184M154 170H182" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
      {/* Action Cluster */}
      <circle cx="312" cy="158" r="4.5" fill="#A855F7" />
      <circle cx="326" cy="170" r="4.5" fill="#22D3EE" />
      <circle cx="312" cy="182" r="4.5" fill="#CBD5E1" fillOpacity="0.6" />
      <circle cx="298" cy="170" r="4.5" fill="#A855F7" fillOpacity="0.6" />
      {/* Center Emblem */}
      <polygon points="240,158 250,170 240,182 230,170" stroke="#22D3EE" strokeWidth="1.5" />
    </svg>
  );
}

function ChapterIcon({ id }: { id: StoryChapter['id'] }) {
  if (id === 'engineering') return <Code2 className="h-4 w-4" aria-hidden="true" />;
  if (id === 'basketball') return <Dribbble className="h-4 w-4" aria-hidden="true" />;
  return <Gamepad2 className="h-4 w-4" aria-hidden="true" />;
}

export function PersonalitySection() {
  const [activeId, setActiveId] = useState<StoryChapter['id']>('engineering');
  const activeChapter = CHAPTERS.find((c) => c.id === activeId) ?? CHAPTERS[0];

  return (
    <section
      id="beyond-the-code"
      className="relative py-20 sm:py-28 border-b border-white/[0.06] overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-cyan-400 uppercase mb-3">
              Personality &amp; Perspective
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Beyond The Code
            </h2>
          </div>

          <p className="max-w-md text-sm text-slate-400 leading-relaxed">
            Three disciplines that shape how I think, collaborate, and design software experiences.
          </p>
        </motion.div>

        {/* Interactive Visual Storytelling Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 items-stretch gap-8">
          {/* Left: Interactive Chapter Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {CHAPTERS.map((chapter, index) => {
              const selected = chapter.id === activeChapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => setActiveId(chapter.id)}
                  className={`group relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    selected
                      ? 'border-cyan-400/50 bg-[#0F111C]'
                      : 'border-white/[0.08] bg-[#0B0C13] hover:border-white/20 hover:bg-[#0D0F18]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                          selected
                            ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300'
                            : 'border-white/10 bg-[#121421] text-slate-400 group-hover:text-white'
                        }`}
                      >
                        <ChapterIcon id={chapter.id} />
                      </span>
                      <span className="font-display text-lg font-semibold text-white">
                        {chapter.title}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                    {chapter.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Bespoke Visual Canvas & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B0C13] p-6 sm:p-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080E]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  {activeChapter.id === 'engineering' && <EngineeringVisual />}
                  {activeChapter.id === 'basketball' && <BasketballVisual />}
                  {activeChapter.id === 'gaming' && <GamingVisual />}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {activeChapter.title}
                  </h3>
                  <span className="font-mono text-xs text-cyan-400">{activeChapter.subtitle}</span>
                </div>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                  {activeChapter.narrative}
                </p>
                <p className="mt-4 font-mono text-xs text-violet-300">
                  {activeChapter.traits.join(' · ')}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
