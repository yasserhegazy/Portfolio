'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { Brain, Server, Code2, LayoutGrid, Database, CheckCircle2, Wrench } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();

  const layers = [
    { key: 'ai', icon: Brain, items: t.skills.items.ai },
    { key: 'backend', icon: Server, items: t.skills.items.backend },
    { key: 'languages', icon: Code2, items: t.skills.items.languages },
    { key: 'frontend', icon: LayoutGrid, items: t.skills.items.frontend },
    { key: 'data', icon: Database, items: t.skills.items.data },
    { key: 'practices', icon: CheckCircle2, items: t.skills.items.practices },
    { key: 'devops', icon: Wrench, items: t.skills.items.devops },
  ] as const;

  return (
    <section id="skills" className="relative section-padding">
      <div className="container-custom">
        <SectionHeader index="06" command="cat stack/*" title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.key}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="panel p-4 md:p-5 grid md:grid-cols-[220px_1fr] gap-3 md:gap-6 md:items-center hover:border-[var(--border-strong)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                  <layer.icon className="w-4 h-4 text-primary-500" />
                </span>
                <div>
                  <div className="mono-label text-primary-text/80">{`0${i + 1}`}</div>
                  <div className="font-semibold text-sm text-foreground">
                    {t.skills.categories[layer.key]}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span key={item} className="tech-chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
