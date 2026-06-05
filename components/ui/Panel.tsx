'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PanelProps {
  children: ReactNode;
  className?: string;
  /** mono label shown in the top-right corner, e.g. "service" */
  tag?: string;
  /** show a status dot in the corner */
  status?: 'ok' | 'warn' | 'idle';
  interactive?: boolean;
  delay?: number;
}

const statusColor: Record<string, string> = {
  ok: 'var(--signal-ok)',
  warn: 'var(--signal-warn)',
  idle: 'var(--text-faint)',
};

export default function Panel({
  children,
  className = '',
  tag,
  status,
  interactive = false,
  delay = 0,
}: PanelProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className={`panel relative p-6 transition-colors duration-300 ${
        interactive
          ? 'hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]'
          : ''
      } ${className}`}
    >
      {(tag || status) && (
        <div className="absolute top-4 end-4 flex items-center gap-2">
          {status && (
            <span
              className="relative flex h-2 w-2"
              aria-label={`status ${status}`}
            >
              {status === 'ok' && !reduce && (
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                  style={{ backgroundColor: statusColor[status] }}
                />
              )}
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: statusColor[status] }}
              />
            </span>
          )}
          {tag && <span className="mono-label">{tag}</span>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
