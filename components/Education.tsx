'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="education" className="section-padding bg-gray-50 dark:bg-gray-900/50">
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
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.education.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="glass-card p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.education.degree}
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                    {t.education.university}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    {t.education.period}
                  </div>
                  <div className="space-y-2">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-300 rounded-lg font-semibold shadow-sm">
                      {t.education.gpa}
                    </div>
                    <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg font-semibold ml-2">
                      🏆 {t.education.achievement}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="glass-card p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-4 bg-gradient-to-br from-accent-500 to-accent-600 dark:from-accent-600 dark:to-accent-700 rounded-xl shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {t.education.certificationsTitle}
                </h3>
              </div>

              <div className="space-y-3">
                {t.education.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-accent-50 hover:to-purple-50 dark:hover:from-accent-900/20 dark:hover:to-purple-900/20 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-accent-200 dark:hover:border-accent-700"
                  >
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
