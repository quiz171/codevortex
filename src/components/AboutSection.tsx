import { useState } from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { BRAND_PROFILE } from '../data/portfolio';

export function AboutSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="relative py-24 sm:py-32 border-b border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          {/* Editorial Profile Image Composition (No Heavy Boxed Card Clutter) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
              {/* Offset geometric backdrop frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 translate-x-2 translate-y-2 rounded-3xl border border-violet-500/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/15 blur-xl"
              />

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/12 bg-[#090A10] shadow-2xl shadow-black/70">
                {!imageError ? (
                  <img
                    src={BRAND_PROFILE.avatarUrl}
                    alt={BRAND_PROFILE.avatarAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0F101A] via-[#090A10] to-[#121020] p-8 text-center">
                    <Code2 className="h-12 w-12 text-cyan-400 mb-3" aria-hidden="true" />
                    <p className="font-display text-lg font-semibold text-white">
                      {BRAND_PROFILE.fullName}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {BRAND_PROFILE.brandName} · Software Engineer
                    </p>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06060A]/90 via-[#06060A]/35 to-transparent"
                />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-slate-200 truncate">
                    {BRAND_PROFILE.fullName}
                  </span>
                  <span className="font-mono text-cyan-300 shrink-0">
                    {BRAND_PROFILE.brandName}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Typography Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-cyan-400 uppercase mb-4">
                About Me
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-white [text-wrap:balance]">
                Designing software with precision, curiosity, and{' '}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  lasting utility
                </span>
                .
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
              <p>
                I&apos;m{' '}
                <strong className="font-semibold text-white">{BRAND_PROFILE.fullName}</strong>,
                known across the developer community as{' '}
                <strong className="font-semibold text-cyan-300">{BRAND_PROFILE.brandName}</strong>.
                I build thoughtful digital systems by combining disciplined engineering with a deep
                curiosity for emerging technology.
              </p>
              <p>
                From crafting educational artificial intelligence platforms to structuring everyday
                workflow tools, my focus stays consistent: understand the human problem first, then
                engineer clean, resilient software that feels effortless to use.
              </p>
            </div>

            {/* Clean Editorial Hairline Pillars (Unboxed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/[0.08] pt-8">
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  Intelligent Solutions
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Exploring applied artificial intelligence and voice-first interfaces to make
                  learning and information access more intuitive.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  Problem-Solving Craft
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Breaking complex requirements into modular architecture across Python, JavaScript,
                  Java, Dart, and systems-level languages.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
