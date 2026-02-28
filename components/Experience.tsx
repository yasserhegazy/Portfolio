'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: language === 'ar' ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const respVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.08 },
    }),
  };

  return (
    <section id="experience" className="relative section-padding bg-gray-50/50 dark:bg-gray-900/30">
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
              <span className="gradient-text">{t.experience.title}</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.experience.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Timeline Line — animated draw */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"
            />

            {t.experience.jobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
                }`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
                  {/* Timeline Dot — pulse entrance */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                    transition={{ delay: index * 0.3 + 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                    className={`absolute ${language === 'ar' ? 'right-6' : 'left-6'} md:left-1/2 top-0 w-4 h-4 -ml-2 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg`}
                  ></motion.div>

                  <motion.div
                    initial={{ boxShadow: '-4px 0 0 0 transparent' }}
                    animate={isInView ? { boxShadow: '-4px 0 12px -2px rgba(var(--primary-500-rgb, 99, 102, 241), 0.4)' } : {}}
                    transition={{ delay: index * 0.3 + 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="glass-card p-6 ml-12 md:ml-0 md:mr-8 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Company & Position */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl shadow-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {job.position}
                        </h3>
                        <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {job.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-3">
                      {job.responsibilities.map((resp, idx) => (
                        <motion.li
                          key={idx}
                          custom={idx}
                          variants={respVariants}
                          initial="hidden"
                          animate={isInView ? 'visible' : 'hidden'}
                          whileHover={{ x: 4 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300 group"
                        >
                          <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full mt-0.5">
                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          </div>
                          <span className="leading-relaxed">{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
