'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Github, Linkedin, Mail, ArrowUp, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-signature gradient-text mb-4">
              Yasser Hegazy
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Backend Software Engineer
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {t.nav.contact}
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:yasseranahegazy@gmail.com"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                yasseranahegazy@gmail.com
              </a>
              <a
                href="tel:+9705677773368"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +970 56 7777 368
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Social
            </h4>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/YasserHegazy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/yasser-hegazy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all shadow-sm hover:shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Yasser Hegazy. {t.footer.rights}
            </p>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800/50 hover:bg-primary-100 dark:hover:bg-primary-800/50 transition-all shadow-sm hover:shadow-md"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </motion.button>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.footer.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
