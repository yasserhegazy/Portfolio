'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, X, Cpu } from 'lucide-react';

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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
    <section id="projects" className="section-padding">
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
              <span className="gradient-text">{t.projects.title}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {t.projects.items.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card p-6 cursor-pointer group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-700 rounded-xl"
                onClick={() => setSelectedProject(project.id)}
              >
                {/* Project Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-lg shadow-md">
                      <Cpu className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                      {project.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-xs font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details */}
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>{t.projects.viewDetails}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const project = t.projects.items.find((p) => p.id === selectedProject);
              if (!project) return null;

              return (
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                        {project.subtitle}
                      </span>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                        {project.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {t.projects.techStack}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {t.projects.architecture}
                    </h3>
                    <ul className="space-y-2">
                      {project.architecture.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* GitHub Link */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {t.projects.viewGithub}
                  </a>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
