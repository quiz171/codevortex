import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Braces,
  Brain,
  Code2,
  Cpu,
  FileCode2,
  Globe,
  Layout,
  Palette,
  Smartphone,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { SKILL_CATEGORIES, SKILLS, type SkillItem } from '../data/portfolio';

function CategoryIcon({ category }: { category: SkillItem['category'] }) {
  if (category === 'Programming Languages') {
    return <Code2 className="h-4 w-4 text-violet-400" aria-hidden="true" />;
  }
  if (category === 'Web Development') {
    return <Globe className="h-4 w-4 text-cyan-400" aria-hidden="true" />;
  }
  return <Sparkles className="h-4 w-4 text-violet-300" aria-hidden="true" />;
}

function TechGlyph({ name }: { name: string }) {
  const cls = 'h-5 w-5';
  switch (name) {
    case 'Python':
      return <Terminal className={`${cls} text-cyan-300`} aria-hidden="true" />;
    case 'JavaScript':
      return <Braces className={`${cls} text-violet-300`} aria-hidden="true" />;
    case 'Java':
      return <Cpu className={`${cls} text-cyan-300`} aria-hidden="true" />;
    case 'Dart':
      return <Smartphone className={`${cls} text-violet-300`} aria-hidden="true" />;
    case 'C':
    case 'C++':
    case 'C#':
      return <FileCode2 className={`${cls} text-cyan-300`} aria-hidden="true" />;
    case 'HTML':
      return <Layout className={`${cls} text-violet-300`} aria-hidden="true" />;
    case 'CSS':
      return <Palette className={`${cls} text-cyan-300`} aria-hidden="true" />;
    case 'Artificial Intelligence':
      return <Brain className={`${cls} text-violet-300`} aria-hidden="true" />;
    case 'Software Engineering':
      return <Code2 className={`${cls} text-cyan-300`} aria-hidden="true" />;
    default:
      return <Sparkles className={`${cls} text-violet-300`} aria-hidden="true" />;
  }
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof SKILL_CATEGORIES)[number]>('All');

  const visibleCategories =
    selectedCategory === 'All'
      ? (['Programming Languages', 'Web Development', 'Other Interests'] as const)
      : ([selectedCategory] as const);

  return (
    <section id="skills" className="relative py-24 sm:py-32 border-b border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-cyan-400 uppercase mb-3">
              Technology Ecosystem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              My Tech Arsenal.
            </h2>
          </motion.div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter technical skills by category"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0A0B12] p-1 self-start md:self-auto"
          >
            {SKILL_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    active
                      ? 'bg-gradient-to-r from-violet-600/90 to-cyan-600/90 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 space-y-14">
          {visibleCategories.map((category) => {
            const categorySkills = SKILLS.filter((skill) => skill.category === category);
            return (
              <div key={category}>
                <div className="mb-6 flex items-center gap-2.5 border-b border-white/[0.08] pb-3.5">
                  <CategoryIcon category={category} />
                  <h3 className="font-display text-lg font-semibold text-white">{category}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {categorySkills.map((skill, idx) => (
                    <motion.div
                      key={`${skill.category}-${skill.name}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(idx * 0.04, 0.24),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0D0F18] to-[#08090F] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transition-opacity group-hover:via-cyan-400/50"
                      />

                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#121422] transition-colors group-hover:border-violet-400/40">
                            <TechGlyph name={skill.name} />
                          </div>
                          <span className="font-mono text-xs text-slate-500 group-hover:text-cyan-300 transition-colors">
                            {skill.monogram}
                          </span>
                        </div>

                        <h4 className="mt-4 font-display text-base font-semibold text-white">
                          {skill.name}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {skill.summary}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
