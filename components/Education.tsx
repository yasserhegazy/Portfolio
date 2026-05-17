'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, Calendar, Users, BookOpen } from 'lucide-react';

export default function Education() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const certVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 14, stiffness: 180, delay: i * 0.06 },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: [0, 1.15, 1],
      transition: { duration: 0.5, delay: 0.4 + i * 0.12 },
    }),
  };

  const issuerColor = (issuer: string) => {
    if (issuer === 'IBM') return {
      bg: 'bg-blue-100 dark:bg-blue-900/40',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800/50',
      accent: 'border-l-blue-500',
    };
    return {
      bg: 'bg-purple-100 dark:bg-purple-900/40',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800/50',
      accent: 'border-l-purple-500',
    };
  };

  return (
    <section id="education" className="relative section-padding bg-gray-50/50 dark:bg-gray-900/30">
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
              <span className="gradient-text">{t.education.title}</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.education.subtitle}
            </p>
          </div>

          {/* Education Card — Full Width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            className="glass-card p-8 mb-8 hover:shadow-2xl transition-all duration-300"
          >
            {/* Degree Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl shadow-lg flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {t.education.degree}
                </h3>
                <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                  {t.education.university}
                </p>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  {t.education.period}
                </div>
                <div className="flex flex-wrap gap-2">
                  <motion.div
                    custom={0}
                    variants={badgeVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg font-semibold border border-green-200 dark:border-green-800/50 shadow-sm"
                  >
                    {t.education.gpa}
                  </motion.div>
                  <motion.div
                    custom={1}
                    variants={badgeVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-lg font-semibold border border-yellow-200 dark:border-yellow-800/50"
                  >
                    🏆 {t.education.achievement}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t.education.description}
            </p>

            {/* Activities & Leadership — 2-column grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Activities */}
              <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-gray-800/50 border border-primary-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{t.education.activitiesTitle}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.education.activities}
                </p>
              </div>

              {/* Leadership */}
              <div className="p-4 rounded-xl bg-accent-50/50 dark:bg-gray-800/50 border border-accent-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{t.education.leadership}</h4>
                </div>
                <div className="space-y-3">
                  {t.education.leadershipItems.map((item, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 dark:from-accent-600 dark:to-accent-700 rounded-xl shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {t.education.certificationsTitle}
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {t.education.certifications.map((cert, index) => {
                const colors = issuerColor(cert.issuer);
                return (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={certVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`glass-card p-5 border-l-4 ${colors.accent} hover:shadow-xl transition-all duration-300`}
                  >
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3 leading-snug">
                      {cert.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 ${colors.bg} ${colors.text} ${colors.border} border rounded-full text-xs font-bold`}>
                        {cert.issuer}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {cert.date}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
