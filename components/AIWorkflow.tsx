'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Brain, Workflow, Radio, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Panel from '@/components/ui/Panel';

const ICONS = [Brain, Workflow, Radio, ShieldCheck];

export default function AIWorkflow() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="ai-workflow" className="relative section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader index="05" command="run ai-workflow" title={t.aiWorkflow.title} subtitle={t.aiWorkflow.subtitle} />

        <div className="grid sm:grid-cols-2 gap-5">
          {t.aiWorkflow.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Panel key={item.title} delay={i * 0.06} tag={`0${i + 1}`} interactive>
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] mb-4">
                  <Icon className="w-5 h-5 text-primary-500" />
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </Panel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
