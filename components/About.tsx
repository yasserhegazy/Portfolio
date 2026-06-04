'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, GraduationCap, Languages, Phone } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Panel from '@/components/ui/Panel';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();

  const paragraphs = [t.about.description, t.about.paragraph1, t.about.paragraph2, t.about.paragraph3];

  const infoItems = [
    { icon: MapPin, label: t.about.location, value: t.about.locationValue },
    { icon: GraduationCap, label: t.about.university, value: t.about.universityValue },
    { icon: Languages, label: t.about.languages, value: t.about.languagesValue },
    { icon: Phone, label: t.about.phone, value: t.about.phoneValue },
  ];

  return (
    <section id="about" className="relative section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader index="01" command="whoami" title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
          {/* Photo + quick facts */}
          <div className="space-y-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="panel p-2 relative"
            >
              <span className="absolute top-3 end-3 z-10 mono-label bg-surface/80 px-1.5 rounded">
                ./profile.jpg
              </span>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Yasser Hegazy"
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority
                />
              </div>
            </motion.div>

            <div className="space-y-3">
              {infoItems.map((item, i) => (
                <Panel key={item.label} delay={i * 0.05} className="!p-4">
                  <div className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="mono-label">{item.label}</div>
                      <div className="text-sm text-foreground leading-snug">{item.value}</div>
                    </div>
                  </div>
                </Panel>
              ))}
            </div>
          </div>

          {/* Narrative */}
          <div className="space-y-5">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-base md:text-lg text-muted leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
