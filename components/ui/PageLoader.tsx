'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950"
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center">
            <motion.span
              className="font-signature text-4xl text-gray-900 dark:text-white sm:text-5xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Yasser
            </motion.span>

            <motion.div
              className="mt-2 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
