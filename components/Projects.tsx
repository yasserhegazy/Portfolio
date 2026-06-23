'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { X, Github, Globe, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const isMultiRepo = (
    github: string | { frontend: string; backend: string } | null
  ): github is { frontend: string; backend: string } => typeof github === 'object' && github !== null;

  return (
    <section id="projects" className="relative section-padding">
      <div className="container-custom">
        <SectionHeader index="04" command="ls services/" title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.projects.items.map((project, i) => (
            <motion.button
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              onClick={() => setSelectedProject(project.id)}
              className="panel group text-start overflow-hidden hover:border-[var(--border-strong)] transition-colors flex flex-col"
            >
              <div className="relative w-full aspect-video overflow-hidden border-b border-[var(--border)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    {!reduce && (
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--signal-ok)] opacity-60 animate-ping" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--signal-ok)]" />
                  </span>
                  <span className="mono-label">{project.subtitle}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-text transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-chip">+{project.techStack.length - 4}</span>
                  )}
                </div>

                <span className="inline-flex items-center gap-1.5 font-mono text-sm text-primary-text group-hover:gap-2.5 transition-all">
                  {t.projects.viewDetails}
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              key="modal-content"
              initial={reduce ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="bg-surface border border-[var(--border-strong)] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = t.projects.items.find((p) => p.id === selectedProject);
                if (!project) return null;

                return (
                  <div>
                    <div className="relative w-full aspect-video rounded-t-xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <button
                        onClick={() => setSelectedProject(null)}
                        aria-label={t.projects.closeModal}
                        className="absolute top-3 end-3 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="mb-5">
                        <span className="mono-label text-primary-text/80">{project.subtitle}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                          {project.title}
                        </h2>
                      </div>

                      <p className="text-muted leading-relaxed mb-6">{project.description}</p>

                      <div className="mb-6">
                        <h3 className="font-mono text-sm text-primary-text mb-3">{`// ${t.projects.techStack}`}</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="tech-chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-7">
                        <h3 className="font-mono text-sm text-primary-text mb-3">{`// ${t.projects.architecture}`}</h3>
                        <ul className="space-y-2">
                          {project.architecture.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                              <span className="text-primary-500/70 font-mono mt-0.5 shrink-0">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-[#0c0a09] font-semibold transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          {t.projects.viewLive}
                        </a>

                        {isMultiRepo(project.github) ? (
                          <>
                            <a
                              href={project.github.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg panel hover:bg-[var(--surface-elevated)] font-semibold transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              {t.projects.frontendRepo}
                            </a>
                            <a
                              href={project.github.backend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg panel hover:bg-[var(--surface-elevated)] font-semibold transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              {t.projects.backendRepo}
                            </a>
                          </>
                        ) : project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg panel hover:bg-[var(--surface-elevated)] font-semibold transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            {t.projects.viewGithub}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
