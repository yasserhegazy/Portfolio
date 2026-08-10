'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Rss, Boxes, Search, Bot, ShieldCheck, Send, Image as ImageIcon, type LucideIcon } from 'lucide-react';

export interface PipelineStage {
  key: string;
  label: string;
  desc: string;
}

const STAGE_ICON: Record<string, LucideIcon> = {
  ingest: Rss,
  cluster: Boxes,
  retrieve: Search,
  generate: Bot,
  verify: ShieldCheck,
  publish: Send,
  media: ImageIcon,
};

/**
 * WAKIB's generation pipeline as a living diagram: a packet of work fills the
 * pipeline stage by stage, then repeats. Horizontal rail on desktop, vertical
 * on small screens. Reduced motion → all stages shown energized, statically.
 */
export default function PipelineFlow({ stages }: { stages: PipelineStage[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? stages.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((prev) => (prev >= stages.length - 1 ? 0 : prev + 1));
    }, 1100);
    return () => clearInterval(id);
  }, [reduce, stages.length]);

  const progress = stages.length > 1 ? active / (stages.length - 1) : 1;
  // Nodes are centred inside equal columns, so the rail spans between the first
  // and last node centres (half a column inset on each side).
  const inset = stages.length > 0 ? 50 / stages.length : 0;
  const span = 100 - inset * 2;

  return (
    <div className="relative">
      {/* Desktop horizontal rail (logical insets → correct in LTR and RTL) */}
      <div
        className="hidden md:block absolute top-6 h-px bg-[var(--border-strong)]"
        style={{ insetInlineStart: `${inset}%`, insetInlineEnd: `${inset}%` }}
        aria-hidden
      />
      <div
        className="hidden md:block absolute top-6 h-px bg-primary-500 transition-[width] duration-700 ease-out shadow-[0_0_12px_var(--primary-500)]"
        style={{ insetInlineStart: `${inset}%`, width: `${(progress * span).toFixed(2)}%` }}
        aria-hidden
      />

      <ol className="relative flex flex-col md:flex-row md:justify-between gap-4 md:gap-2">
        {stages.map((stage, i) => {
          const Icon = STAGE_ICON[stage.key] ?? Rss;
          const energized = i <= active;
          const current = i === active;
          return (
            <li
              key={stage.key}
              className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3 md:flex-1 md:text-center"
            >
              {/* Mobile vertical connector */}
              {i < stages.length - 1 && (
                <span
                  className={`md:hidden absolute top-12 start-6 -translate-x-1/2 rtl:translate-x-1/2 w-px h-[calc(100%-1rem)] transition-colors duration-500 ${
                    energized ? 'bg-primary-500' : 'bg-[var(--border-strong)]'
                  }`}
                  aria-hidden
                />
              )}

              {/* Node */}
              <span className="relative z-10 shrink-0">
                {current && !reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-xl bg-primary-500/25"
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
                    aria-hidden
                  />
                )}
                <span
                  className={`grid place-items-center w-12 h-12 rounded-xl border transition-colors duration-500 ${
                    energized
                      ? 'bg-primary-500/12 border-primary-500/60 text-primary-text'
                      : 'bg-[var(--surface-elevated)] border-[var(--border)] text-faint'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
              </span>

              {/* Label + desc */}
              <span className="md:mt-1">
                <span className="flex items-center md:justify-center gap-2">
                  <span className="mono-label text-[0.68rem] tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-semibold text-sm transition-colors duration-500 ${
                      energized ? 'text-foreground' : 'text-muted'
                    }`}
                  >
                    {stage.label}
                  </span>
                </span>
                <span className="block mt-1 text-xs text-muted leading-snug md:max-w-[9rem] md:mx-auto">
                  {stage.desc}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
