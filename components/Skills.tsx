'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2,
  Layers,
  Database,
  Wrench,
  Target,
} from 'lucide-react';

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [
    {
      title: t.skills.categories.languages,
      icon: Code2,
      items: t.skills.items.languages,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t.skills.categories.frameworks,
      icon: Layers,
      items: t.skills.items.frameworks,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t.skills.categories.databases,
      icon: Database,
      items: t.skills.items.databases,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t.skills.categories.tools,
      icon: Wrench,
      items: t.skills.items.tools,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: t.skills.categories.cloud,
      icon: Target,
      items: t.skills.items.cloud,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: t.skills.categories.expertise,
      icon: Target,
      items: t.skills.items.expertise,
      color: 'from-indigo-500 to-purple-500',
    },
  ];

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
    <section id="skills" className="section-padding">
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
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card p-6 group hover:shadow-2xl transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.span
                      key={itemIndex}
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:from-primary-50 hover:to-primary-100 dark:hover:from-primary-900/30 dark:hover:to-primary-800/30 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
