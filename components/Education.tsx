'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Calendar, Users, BookOpen } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Panel from '@/components/ui/Panel';

export default function Education() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();

  return (
    <section id="education" className="relative section-padding">
      <div className="container-custom">
        <SectionHeader index="06" command="cat credentials.md" title={t.education.title} subtitle={t.education.subtitle} />

        {/* Degree */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="panel p-6 md:p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <span className="grid place-items-center w-12 h-12 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shrink-0">
              <GraduationCap className="w-6 h-6 text-primary-500" />
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-1">{t.education.degree}</h3>
              <p className="font-mono text-sm text-primary-500 mb-2">{t.education.university}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted font-mono mb-4">
                <Calendar className="w-3.5 h-3.5" />
                {t.education.period}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="tech-chip border-[var(--signal-ok)]/40 text-[var(--signal-ok)]">
                  {t.education.gpa}
                </span>
                <span className="tech-chip border-primary-500/40 text-primary-500">
                  ★ {t.education.achievement}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base text-muted leading-relaxed mb-6">
            {t.education.description}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="panel-elevated p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary-500" />
                <h4 className="font-semibold text-sm text-foreground">{t.education.activitiesTitle}</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed">{t.education.activities}</p>
            </div>
            <div className="panel-elevated p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary-500" />
                <h4 className="font-semibold text-sm text-foreground">{t.education.leadership}</h4>
              </div>
              <div className="space-y-2.5">
                {t.education.leadershipItems.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <h3 className="font-mono text-sm text-primary-500 mb-4">{`// ${t.education.certificationsTitle}`}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.education.certifications.map((cert, i) => (
            <Panel key={cert.title} delay={(i % 3) * 0.06} interactive className="!p-5">
              <p className="font-semibold text-sm text-foreground mb-3 leading-snug">{cert.title}</p>
              <div className="flex items-center justify-between">
                <span className="tech-chip">{cert.issuer}</span>
                <span className="mono-label">{cert.date}</span>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
