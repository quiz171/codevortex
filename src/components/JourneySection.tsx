import { motion } from 'motion/react';
import { JOURNEY_MILESTONES } from '../data/portfolio';

export function JourneySection() {
  return (
    <section id="journey" className="relative py-20 sm:py-28 border-b border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-xs font-medium tracking-[0.16em] text-cyan-400 uppercase mb-3">
              Development Journey
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Always Building. Always Learning.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-400">
              Every project is an opportunity to test an idea, learn a deeper engineering principle,
              and refine how software serves the people using it.
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10">
              {JOURNEY_MILESTONES.map((milestone, idx) => (
                <motion.div
                  key={milestone.phase}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(idx * 0.06, 0.24),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  {/* Timeline Node Marker */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] sm:-left-[37px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-cyan-400 bg-[#06060A]"
                  >
                    <span className="h-1 w-1 rounded-full bg-violet-400" />
                  </span>

                  <p className="font-mono text-xs text-cyan-400">{milestone.phase}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                    {milestone.description}
                  </p>
                  <p className="mt-3 font-mono text-xs text-slate-400">
                    {milestone.focusAreas.join(' · ')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
