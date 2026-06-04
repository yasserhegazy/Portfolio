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
      href: '/cv/Yasser-Hegazy-CV.pdf',
      download: true,
      className: 'bg-primary-500 hover:bg-primary-600 text-[#0c0a09]',
    },
    {
      icon: Mail,
      label: t.floating.contact,
      href: '#contact',
      className: 'bg-accent-500 hover:bg-accent-600 text-white',
    },
    {
      icon: Linkedin,
      label: t.floating.linkedin,
      href: 'https://www.linkedin.com/in/yasser-hegazy-134794248/',
      target: '_blank',
      className: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      icon: MessageCircle,
      label: t.floating.whatsapp,
      href: 'https://api.whatsapp.com/send/?phone=970567777368',
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + index * 0.1 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`group relative p-4 rounded-full shadow-xl hover:shadow-2xl ${action.className} transition-all duration-300`}
          aria-label={action.label}
        >
          <action.icon className="w-5 h-5" />
          
          {/* Tooltip — opens toward screen center so it never overflows the edge */}
          <span className={`absolute ${language === 'ar' ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 -translate-y-1/2 px-3 py-1.5 panel font-mono text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
            {action.label}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
