'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Download, Mail, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingActions() {
  const { language } = useLanguage();
  const t = translations[language];

  const actions = [
    {
      icon: Download,
      label: t.floating.downloadCV,
      href: '/cv/yasser-hegazy-cv.pdf',
      download: true,
      className: 'bg-primary-600 hover:bg-primary-700 text-white',
    },
    {
      icon: Mail,
      label: t.floating.contact,
      href: '#contact',
      className: 'bg-accent-600 hover:bg-accent-700 text-white',
    },
    {
      icon: Linkedin,
      label: t.floating.linkedin,
      href: 'https://www.linkedin.com/in/yasser-hegazy/',
      target: '_blank',
      className: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      icon: MessageCircle,
      label: t.floating.whatsapp,
      href: 'https://api.whatsapp.com/send/?phone=972567777368',
      target: '_blank',
      className: 'bg-green-500 hover:bg-green-600 text-white',
    },
  ];

  const scrollToContact = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: language === 'ar' ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className={`fixed ${language === 'ar' ? 'left-6' : 'right-6'} bottom-6 z-40 flex flex-col gap-3`}
    >
      {actions.map((action, index) => (
        <motion.a
          key={index}
          href={action.href}
          target={action.target}
          download={action.download}
          onClick={(e) => {
            if (action.href.startsWith('#')) {
              e.preventDefault();
              scrollToContact(action.href);
            }
          }}
          initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`group relative p-4 rounded-full shadow-xl hover:shadow-2xl ${action.className} transition-all duration-300`}
          aria-label={action.label}
        >
          <action.icon className="w-5 h-5" />
          
          {/* Tooltip */}
          <span className={`absolute ${language === 'ar' ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg`}>
            {action.label}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
