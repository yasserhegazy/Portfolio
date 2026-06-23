'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Boxes, Database, Wrench, Cloud, Cpu } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();

  const layers = [
    { key: 'languages', icon: Code2, items: t.skills.items.languages },
    { key: 'frameworks', icon: Boxes, items: t.skills.items.frameworks },
    { key: 'databases', icon: Database, items: t.skills.items.databases },
    { key: 'cloud', icon: Cloud, items: t.skills.items.cloud },
    { key: 'tools', icon: Wrench, items: t.skills.items.tools },
    { key: 'expertise', icon: Cpu, items: t.skills.items.expertise },
  ] as const;

  return (
    <section id="skills" className="relative section-padding">
      <div className="container-custom">
        <SectionHeader index="02" command="cat stack/*" title={t.skills.title} subtitle={t.skills.subtitle} />

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
