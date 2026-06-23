'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Experience() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();

  const isPresent = (period: string) => period.includes('Present') || period.includes('الحالي');

  return (
    <section id="experience" className="relative section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader index="03" command="git log --timeline" title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="relative ms-2">
          {/* pipeline rail */}
          <div className="absolute top-2 bottom-2 start-0 w-px bg-[var(--border-strong)]" aria-hidden />

          <div className="space-y-8">
            {t.experience.jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={reduce ? false : { opacity: 0, x: language === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative ps-8"
              >
                {/* node */}
                <span className="absolute start-0 top-1.5 -translate-x-1/2 rtl:translate-x-1/2 flex h-3 w-3">
                  {isPresent(job.period) && !reduce && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-60 animate-ping" />
                  )}
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-500 ring-4 ring-[var(--surface)]" />
                </span>

                <div className="panel p-6 hover:border-[var(--border-strong)] transition-colors">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{job.position}</h3>
                    {isPresent(job.period) && (
                      <span className="mono-label text-[var(--signal-ok)]">● active</span>
                    )}
                  </div>
                  <p className="font-mono text-sm text-primary-text mb-3">{job.company}</p>

                  <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted font-mono">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {job.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                        <span className="text-primary-500/70 font-mono mt-0.5 shrink-0">→</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
