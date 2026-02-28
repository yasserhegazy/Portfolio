'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import Image from 'next/image';
import ParticleBackground from '@/components/ui/ParticleBackground';
import TypeWriter from '@/components/ui/TypeWriter';

const nameVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 12, stiffness: 200 },
  },
};

const ctaContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const ctaItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isArabic = language === 'ar';
  const nameSegments = isArabic ? t.hero.name.split(' ') : t.hero.name.split('');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950"></div>
        <ParticleBackground className="absolute inset-0" />
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 glass-card rounded-full text-sm font-medium text-primary-600 dark:text-primary-400"
            >
              👋 {t.hero.title}
            </motion.div>

            <motion.h1
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              {nameSegments.map((segment, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="gradient-text inline-block"
                  style={isArabic ? (i < nameSegments.length - 1 ? { marginInlineEnd: '0.3em' } : undefined) : (segment === ' ' ? { width: '0.3em' } : undefined)}
                >
                  {isArabic ? segment : (segment === ' ' ? '\u00A0' : segment)}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-2"
            >
              <span className="text-2xl md:text-3xl font-bold gradient-text">
                <TypeWriter
                  words={['Backend Engineer', 'System Designer', 'API Architect', 'Problem Solver']}
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 font-medium"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 italic"
            >
              &quot;{t.hero.philosophy}&quot;
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ctaContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                variants={ctaItemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                href="/cv/yasser-hegazy-cv.pdf"
                download
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full font-semibold transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                {t.hero.downloadCV}
              </motion.a>

              <motion.button
                variants={ctaItemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(156, 163, 175, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
                className="group px-8 py-4 glass-card hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                {t.hero.contactMe}
              </motion.button>

            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, type: 'spring', damping: 12, stiffness: 80 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full blur-3xl"
                animate={{
                  opacity: [0.2, 0.35, 0.2],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Orbiting dots */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 4, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className={`absolute w-3 h-3 rounded-full shadow-lg ${
                      i === 0 ? 'bg-primary-500 top-0 left-1/2 -translate-x-1/2' :
                      i === 1 ? 'bg-accent-500 bottom-4 right-0' :
                      'bg-pink-500 bottom-4 left-0'
                    }`}
                  />
                </motion.div>
              ))}

              {/* Rotating gradient border ring */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #6366f1, #ec4899, #8b5cf6, #6366f1)',
                  padding: '3px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900" />
              </motion.div>

              {/* Image with float */}
              <motion.div
                className="relative rounded-full overflow-hidden shadow-2xl"
                animate={{ y: [0, -10, 0], rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Yasser Hegazy"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-7 h-11 rounded-full border-2 border-primary-400 dark:border-primary-500 flex items-start justify-center p-2 shadow-lg"
        >
          <motion.div
            animate={{ height: ['20%', '80%', '20%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-primary-400 dark:bg-primary-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
