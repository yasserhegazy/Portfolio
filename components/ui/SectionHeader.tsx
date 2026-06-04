'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeaderProps {
  index: string;
  command: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  index,
  command,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  const reduce = useReducedMotion();
  const centered = align === 'center';

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      <div
        className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}
      >
        <span className="font-mono text-sm text-primary-500 tabular-nums">
          {index}
        </span>
        <span className="h-px w-8 bg-[var(--border-strong)]" aria-hidden />
        <span className="font-mono text-sm text-muted">
          <span className="text-primary-500/70">$</span> {command}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base md:text-lg text-muted max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
