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
    <footer className="bg-surface border-t border-[var(--border)]">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-mono text-xl font-bold mb-3">
              <span className="text-primary-500">~/</span>
              <span className="text-foreground">yasser-hegazy</span>
            </h3>
            <p className="text-sm text-muted">
              {t.footer.role}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-sm text-primary-text mb-4">
              {`// ${t.nav.contact}`}
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:yasseranahegazy@gmail.com"
                className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                yasseranahegazy@gmail.com
              </a>
              <a
                href="tel:+970567777368"
                className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +970 56 7777 368
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-sm text-primary-text mb-4">
              {`// ${t.footer.social}`}
            </h4>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/yasserhegazy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg panel hover:bg-[var(--surface-elevated)] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-muted" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/yasser-hegazy-134794248/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg panel hover:bg-[var(--surface-elevated)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-link" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted text-xs font-mono">
              © {currentYear} Yasser Hegazy. {t.footer.rights}
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-lg panel hover:bg-[var(--surface-elevated)] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 text-primary-500" />
            </motion.button>
            <p className="text-muted text-xs font-mono">
              {t.footer.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
