'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, GraduationCap, Languages, Phone } from 'lucide-react';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const paragraphs = [t.about.description, t.about.paragraph1, t.about.paragraph2, t.about.paragraph3];

  const infoItems = [
    {
      icon: MapPin,
      label: t.about.location,
      value: t.about.locationValue,
    },
    {
      icon: GraduationCap,
      label: t.about.university,
      value: t.about.universityValue,
    },
    {
      icon: Languages,
      label: t.about.languages,
      value: t.about.languagesValue,
    },
    {
      icon: Phone,
      label: t.about.phone,
      value: t.about.phoneValue,
    },
  ];

  return (
    <section id="about" className="relative section-padding bg-gray-50/50 dark:bg-gray-900/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.about.title}</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.about.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              {paragraphs.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Info Cards */}
            <motion.div variants={itemVariants} className="space-y-4">
              {infoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -2, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-xl shadow-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                        {item.label}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
