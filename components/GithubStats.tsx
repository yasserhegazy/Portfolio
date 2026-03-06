'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, Code2, TrendingUp } from 'lucide-react';

export default function GithubStats() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const username = t.github.username;
  
  const [statsError, setStatsError] = useState(false);
  const [langsError, setLangsError] = useState(false);
  const [streakError, setStreakError] = useState(false);

  return (
    <section id="github" className="section-padding">
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
              <span className="gradient-text">{t.github.title}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.github.subtitle}
            </p>
          </div>

          {/* GitHub Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 flex items-center justify-center min-h-[200px]"
            >
              {!statsError ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=00000000&title_color=3b82f6&icon_color=a855f7&text_color=6b7280&cache_seconds=1800`}
                    alt="GitHub Stats"
                    loading="lazy"
                    onError={() => setStatsError(true)}
                    className="w-full h-auto"
                  />
                </>
              ) : (
                <div className="text-center py-8">
                  <Github className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">GitHub Stats</p>
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    View on GitHub
                  </a>
                </div>
              )}
            </motion.div>

            {/* Top Languages */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent-200 dark:hover:border-accent-700 rounded-xl min-h-[200px]"
            >
              {!langsError ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=00000000&title_color=3b82f6&text_color=6b7280&cache_seconds=1800`}
                    alt="Top Languages"
                    loading="lazy"
                    onError={() => setLangsError(true)}
                    className="w-full h-auto"
                  />
                </>
              ) : (
                <div className="text-center py-8">
                  <Code2 className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Top Languages</p>
                  <a
                    href={`https://github.com/${username}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    View Repositories
                  </a>
                </div>
              )}
            </motion.div>
          </div>

          {/* Streak Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01, y: -4 }}
            className="mt-6 max-w-3xl mx-auto"
          >
            <div className="glass-card p-6 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-700 rounded-xl min-h-[180px]">
              {!streakError ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true&background=00000000&ring=3b82f6&fire=a855f7&currStreakLabel=6b7280`}
                    alt="GitHub Streak"
                    loading="lazy"
                    onError={() => setStreakError(true)}
                    className="w-full h-auto"
                  />
                </>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Contribution Streak</p>
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    View GitHub Profile
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* GitHub Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {t.github.viewProfile}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
