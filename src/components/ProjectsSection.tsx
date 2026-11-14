import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code, ExternalLink, FolderGit2, X } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolio';
import { MagneticButton } from './MagneticButton';

function ProjectThumbnail({
  project,
  className = '',
}: {
  project: ProjectItem;
  className?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#121321] via-[#0B0C14] to-[#0E1621] p-6 text-center ${className}`}
      >
        <FolderGit2 className="h-9 w-9 text-cyan-400/80 mb-2.5" aria-hidden="true" />
        <span className="font-display text-base font-semibold text-white">{project.name}</span>
        <span className="mt-1 text-xs text-slate-400">{project.stage}</span>
      </div>
    );
  }

  return (
    <img
      src={project.thumbnailUrl}
      alt={project.thumbnailAlt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setImgFailed(true)}
      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${className}`}
    />
  );
}

function ProjectActions({
  project,
  onInspect,
}: {
  project: ProjectItem;
  onInspect: (p: ProjectItem) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Live Demo</span>
        </a>
      ) : (
        <MagneticButton
          type="button"
          onClick={() => onInspect(project)}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-white/[0.07] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gradient-to-r hover:from-violet-600 hover:to-cyan-600 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <ExternalLink className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
          <span>Live Demo</span>
        </MagneticButton>
      )}

      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-cyan-400/45 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Code className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Source Code</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onInspect(project)}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/12 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-violet-400/45 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Code className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
          <span>Source Code</span>
        </button>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!modalProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalProject]);

  // Asymmetrical layout mapping: alternating wide featured and compact cards
  const eduMind = PROJECTS[0];
  const coreVortex = PROJECTS[1];
  const voxi = PROJECTS[2];
  const lectureReminder = PROJECTS[3];
  const itQuery = PROJECTS[4];

  const renderGalleryCard = (
    project: ProjectItem,
    spanClass: string,
    aspectClass: string,
    index: number
  ) => (
    <motion.article
      key={project.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.25), ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0A0B12] transition-colors duration-300 hover:border-violet-400/40 ${spanClass}`}
    >
      <button
        type="button"
        onClick={() => setModalProject(project)}
        aria-label={`Inspect ${project.name}`}
        className={`relative w-full overflow-hidden bg-[#07080D] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 ${aspectClass}`}
      >
        <ProjectThumbnail project={project} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B12] via-[#0A0B12]/15 to-transparent"
        />
      </button>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-cyan-400">{project.stage}</span>
            <button
              type="button"
              onClick={() => setModalProject(project)}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              <span>Inspect</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
            <button
              type="button"
              onClick={() => setModalProject(project)}
              className="text-left hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              {project.name}
            </button>
          </h3>

          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-300">
            {project.shortDescription}
          </p>

          <p className="mt-4 font-mono text-xs text-slate-400 leading-relaxed">
            {project.technologies.join(' · ')}
          </p>
        </div>

        <div className="mt-6 border-t border-white/[0.08] pt-5">
          <ProjectActions project={project} onInspect={setModalProject} />
        </div>
      </div>
    </motion.article>
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-b border-white/[0.06]">
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
              Selected Digital Products
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Things I&apos;ve Built.
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 leading-relaxed">
            An asymmetrical showcase of educational AI systems, voice-first interfaces, and
            structured software builds.
          </p>
        </motion.div>

        {/* Asymmetrical Product Gallery */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Row 1: Large Featured (7 cols) + Compact Sculptural (5 cols) */}
          {renderGalleryCard(eduMind, 'lg:col-span-7', 'aspect-[16/10]', 0)}
          {renderGalleryCard(voxi, 'lg:col-span-5', 'aspect-[4/3]', 1)}

          {/* Row 2: Compact (5 cols) + Large Featured (7 cols) */}
          {renderGalleryCard(coreVortex, 'lg:col-span-5', 'aspect-[4/3]', 2)}
          {renderGalleryCard(lectureReminder, 'lg:col-span-7', 'aspect-[16/10]', 3)}

          {/* Row 3: Full-Width Split Architectural Spotlight (12 cols) */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0A0B12] transition-colors duration-300 hover:border-cyan-400/40"
          >
            <button
              type="button"
              onClick={() => setModalProject(itQuery)}
              aria-label={`Inspect ${itQuery.name}`}
              className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] w-full overflow-hidden bg-[#07080D] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
            >
              <ProjectThumbnail project={itQuery} />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A0B12]/70 via-transparent to-transparent"
              />
            </button>

            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-cyan-400">{itQuery.stage}</span>
                  <button
                    type="button"
                    onClick={() => setModalProject(itQuery)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  <button
                    type="button"
                    onClick={() => setModalProject(itQuery)}
                    className="text-left hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                  >
                    {itQuery.name}
                  </button>
                </h3>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                  {itQuery.shortDescription}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {itQuery.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-mono text-xs text-slate-400 leading-relaxed">
                  {itQuery.technologies.join(' · ')}
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <ProjectActions project={itQuery} onInspect={setModalProject} />
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Fullscreen Lightbox / Project Architecture Modal */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0B0C13] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close project overview"
              onClick={() => setModalProject(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#06060A]/85 text-slate-200 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="aspect-[16/10] w-full overflow-hidden bg-[#07080D]">
              <ProjectThumbnail project={modalProject} />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-medium text-cyan-400">{modalProject.stage}</p>
              <h3
                id="project-modal-title"
                className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-white"
              >
                {modalProject.name}
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                {modalProject.architectureOverview}
              </p>

              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Core Focus Areas
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {modalProject.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Technologies
                </h4>
                <p className="mt-2 font-mono text-xs text-violet-300">
                  {modalProject.technologies.join(' · ')}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                {modalProject.liveUrl || modalProject.repoUrl ? (
                  <div className="flex flex-wrap gap-3">
                    {modalProject.liveUrl && (
                      <a
                        href={modalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Open Live Demo</span>
                      </a>
                    )}
                    {modalProject.repoUrl && (
                      <a
                        href={modalProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-xs font-medium text-white"
                      >
                        <Code className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>View Source Code</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Public demo and repository links are not yet published for this{' '}
                    {modalProject.stage.toLowerCase()}. Attach live URLs in{' '}
                    <code className="text-cyan-300">src/data/portfolio.ts</code> when ready.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  className="inline-flex min-h-[40px] items-center rounded-xl border border-white/15 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.06] whitespace-nowrap shrink-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
