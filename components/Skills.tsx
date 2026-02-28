'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface MarqueeRow {
  items: string[];
  direction: 'scroll-right' | 'scroll-left';
  speed: number;
  dotColor: string;
}

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const rows: MarqueeRow[] = [
    {
      items: [...t.skills.items.languages, ...t.skills.items.frameworks],
      direction: 'scroll-right',
      speed: 35,
      dotColor: 'bg-blue-500',
    },
    {
      items: [...t.skills.items.databases, ...t.skills.items.tools],
      direction: 'scroll-left',
      speed: 40,
      dotColor: 'bg-emerald-500',
    },
    {
      items: t.skills.items.cloud,
      direction: 'scroll-right',
      speed: 30,
      dotColor: 'bg-cyan-500',
    },
    {
      items: t.skills.items.expertise,
      direction: 'scroll-left',
      speed: 45,
      dotColor: 'bg-purple-500',
    },
  ];

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.skills.title}</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.skills.subtitle}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-4">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, x: row.direction === 'scroll-right' ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: row.direction === 'scroll-right' ? -40 : 40 }}
            transition={{ duration: 0.6, delay: 0.2 + rowIndex * 0.1 }}
            className="marquee-container relative"
          >
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

            <div
              className={`marquee-row ${row.direction}`}
              style={{ '--marquee-duration': `${row.speed}s` } as React.CSSProperties}
            >
              {/* Render items twice for seamless loop */}
              {[...row.items, ...row.items].map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-2 px-5 py-2.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 hover:scale-105 transition-all duration-200 cursor-default group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${row.dotColor} group-hover:scale-125 transition-transform`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
