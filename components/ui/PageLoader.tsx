'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const BOOT_LINES = [
  '> initializing runtime…',
  '> mounting services [api · db · cache · ai]',
  '> establishing connections…',
  '> system ready ✓',
];

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [line, setLine] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const total = reduce ? 600 : 1700;
    const timer = setTimeout(() => setIsLoading(false), total);
    return () => clearTimeout(timer);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setLine((l) => Math.min(l + 1, BOOT_LINES.length - 1));
    }, 360);
    return () => clearInterval(id);
  }, [reduce]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)] grid-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="w-full max-w-md px-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-500 font-bold text-lg">~/yasser-hegazy</span>
              <span className="w-2 h-4 bg-primary-500 animate-[blink_1s_step-end_infinite]" />
            </div>
            <div className="space-y-1.5">
              {BOOT_LINES.slice(0, line + 1).map((l, i) => (
                <motion.p
                  key={i}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    i === BOOT_LINES.length - 1
                      ? 'text-[var(--signal-ok)]'
                      : 'text-muted'
                  }
                >
                  {l}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
