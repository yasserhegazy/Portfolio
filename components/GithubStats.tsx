'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Github, Code2, TrendingUp } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function GithubStats() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();
  const username = t.github.username;

  const [statsError, setStatsError] = useState(false);
  const [langsError, setLangsError] = useState(false);
  const [streakError, setStreakError] = useState(false);

  const cardClass =
    'panel p-6 flex items-center justify-center min-h-[200px] hover:border-[var(--border-strong)] transition-colors';

  const fallback = (Icon: typeof Github, label: string, href: string, cta: string) => (
    <div className="text-center py-8">
      <Icon className="w-10 h-10 text-faint mx-auto mb-3" />
      <p className="text-muted mb-2 text-sm">{label}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-link hover:underline text-sm">
        {cta}
      </a>
    </div>
  );

  return (
    <section id="github" className="relative section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader index="07" command="git stats" title={t.github.title} subtitle={t.github.subtitle} />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="space-y-5 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className={cardClass}>
              {!statsError ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&bg_color=00000000&title_color=f59e0b&icon_color=38bdf8&text_color=a8a29e&cache_seconds=1800`}
                  alt="GitHub Stats"
                  loading="lazy"
                  onError={() => setStatsError(true)}
                  className="w-full h-auto"
                />
              ) : (
                fallback(Github, 'GitHub Stats', `https://github.com/${username}`, 'View on GitHub')
              )}
            </div>

            <div className={cardClass}>
              {!langsError ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&bg_color=00000000&title_color=f59e0b&text_color=a8a29e&cache_seconds=1800`}
                  alt="Top Languages"
                  loading="lazy"
                  onError={() => setLangsError(true)}
                  className="w-full h-auto"
                />
              ) : (
                fallback(Code2, 'Top Languages', `https://github.com/${username}?tab=repositories`, 'View Repositories')
              )}
            </div>
          </div>

          <div className={`${cardClass} max-w-3xl mx-auto !min-h-[180px]`}>
            {!streakError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&background=00000000&ring=f59e0b&fire=38bdf8&currStreakLabel=a8a29e&sideLabels=a8a29e&dates=78716c&stroke=292524`}
                alt="GitHub Streak"
                loading="lazy"
                onError={() => setStreakError(true)}
                className="w-full h-auto"
              />
            ) : (
              fallback(TrendingUp, 'Contribution Streak', `https://github.com/${username}`, 'View GitHub Profile')
            )}
          </div>

          <div className="text-center">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg panel hover:bg-[var(--surface-elevated)] font-semibold transition-colors"
            >
              <Github className="w-5 h-5 text-primary-500" />
              {t.github.viewProfile}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
