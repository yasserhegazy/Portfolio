'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Github, Linkedin, Mail } from 'lucide-react';
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
            <h3 className="text-2xl font-bold gradient-text mb-4">
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
                className="p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all shadow-sm hover:shadow-md"
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
                className="p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40 transition-all shadow-sm hover:shadow-md"
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
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.footer.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
