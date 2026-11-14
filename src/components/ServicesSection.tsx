import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Cpu,
  Database,
  Globe,
  Layers,
  Smartphone,
  Terminal,
} from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/portfolio';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

function ServiceIcon({ name }: { name: ServiceItem['iconName'] }) {
  const cls = 'h-5 w-5 text-slate-200 transition-colors group-hover:text-cyan-300';
  switch (name) {
    case 'globe':
      return <Globe className={cls} aria-hidden="true" />;
    case 'terminal':
      return <Terminal className={cls} aria-hidden="true" />;
    case 'smartphone':
      return <Smartphone className={cls} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={cls} aria-hidden="true" />;
    case 'database':
      return <Database className={cls} aria-hidden="true" />;
    case 'layers':
      return <Layers className={cls} aria-hidden="true" />;
  }
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-24 sm:py-32 border-b border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-cyan-400 uppercase mb-3">
              Capabilities
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              What I Can Build.
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 leading-relaxed">
            Focused software engineering services designed around clarity, reliability, and
            thoughtful execution.
          </p>
        </motion.div>

        {/* Clean Editorial Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.08]">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: Math.min(idx * 0.05, 0.25),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col justify-between border-r border-b border-white/[0.08] bg-[#07080D]/60 p-7 sm:p-8 transition-colors duration-200 hover:bg-[#0C0E17]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0D0F18] transition-colors group-hover:border-cyan-400/35">
                    <ServiceIcon name={service.iconName} />
                  </div>
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>
              </div>

              <div className="mt-7 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 transition-colors group-hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                >
                  <span>Inquire about this service</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
