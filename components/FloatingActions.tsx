'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Mail, Linkedin, MessageCircle, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FloatingActions() {
  const { language } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const actions = [
    {
      icon: Mail,
      label: t.floating.contact,
      href: '#contact',
      bg: 'bg-accent-500 hover:bg-accent-600',
      iconColor: 'text-white',
    },
    {
      icon: Linkedin,
      label: t.floating.linkedin,
      href: 'https://www.linkedin.com/in/yasser-hegazy-134794248/',
      target: '_blank',
      bg: 'bg-blue-600 hover:bg-blue-700',
      iconColor: 'text-white',
    },
    {
      icon: MessageCircle,
      label: t.floating.whatsapp,
      href: 'https://api.whatsapp.com/send/?phone=970567777368',
      target: '_blank',
      bg: 'bg-green-500 hover:bg-green-600',
      iconColor: 'text-white',
    },
  ];

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const scrollToContact = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={rootRef}
      className={`fixed ${language === 'ar' ? 'left-6' : 'right-6'} bottom-6 z-40 flex flex-col items-end gap-3`}
    >
      <AnimatePresence>
        {open &&
          actions.map((action, index) => (
            <motion.a
              key={action.label}
              href={action.href}
              target={action.target}
              onClick={(e) => {
                setOpen(false);
                if (action.href.startsWith('#')) {
                  e.preventDefault();
                  scrollToContact(action.href);
                }
              }}
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 10 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2.5 ${language === 'ar' ? 'pl-4 pr-2' : 'pr-4 pl-2'} py-2 rounded-full shadow-xl ${action.bg} transition-colors duration-300`}
            >
              <span className={`grid place-items-center w-9 h-9 rounded-full bg-black/15 shrink-0`}>
                <action.icon className={`w-4 h-4 ${action.iconColor}`} />
              </span>
              <span className={`font-mono text-xs whitespace-nowrap ${action.iconColor}`}>
                {action.label}
              </span>
            </motion.a>
          ))}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: open ? 45 : 0 }}
        transition={{ delay: open ? 0 : 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="grid place-items-center w-14 h-14 rounded-full shadow-xl hover:shadow-2xl bg-primary-500 hover:bg-primary-600 text-[#0c0a09] transition-colors duration-300"
        aria-label={open ? t.floating.close : t.floating.contact}
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
