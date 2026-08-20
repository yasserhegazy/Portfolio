'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';

export type LiveShot = { src: string; caption: string };

type Props = {
  liveUrl: string;
  badge: string;
  openLabel: string;
  hint: string;
  shots: LiveShot[];
};

const CYCLE_MS = 4000;

export default function WakibLivePreview({ liveUrl, badge, openLabel, hint, shots }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const go = useCallback(
    (i: number) => setActive(((i % shots.length) + shots.length) % shots.length),
    [shots.length]
  );

  // Continuously loop the screens (feed → AR feed → article → back to feed).
  useEffect(() => {
    if (reduce || shots.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % shots.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, shots.length]);

  const current = shots[active];

  return (
    <div className="panel overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
        <span className="flex gap-1.5 shrink-0" aria-hidden>
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </span>
        <span
          dir="ltr"
          className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)] px-3 py-1 font-mono text-xs text-muted"
        >
          <Lock className="w-3 h-3 text-[var(--signal-ok)] shrink-0" aria-hidden />
          <span className="truncate">www.wakib.ai</span>
        </span>
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[var(--signal-ok)]/12 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--signal-ok)]">
          <span className="relative flex h-1.5 w-1.5">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--signal-ok)] opacity-70 animate-ping" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--signal-ok)]" />
          </span>
          {badge}
        </span>
      </div>

      {/* Screens — clickable to launch */}
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={openLabel}
        data-cursor="external"
        className="group relative block h-[260px] sm:h-[380px] lg:h-[460px] overflow-hidden bg-[var(--surface-elevated)]"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={current.src}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.caption}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-top"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* launch overlay — always legible on mobile, intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09]/70 via-transparent to-transparent opacity-90" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
          <span dir="auto" className="font-mono text-xs text-white/90 truncate drop-shadow">
            {current.caption}
          </span>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-3 py-1.5 text-[#0c0a09] font-semibold text-sm shadow-lg transition-transform group-hover:-translate-y-0.5">
            {openLabel}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>

      {/* Control bar: dots + hint */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-[var(--border)] bg-[var(--surface-elevated)]">
        <div className="flex items-center gap-2" role="tablist" aria-label="Preview screens">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.caption}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-6 bg-primary-500'
                  : 'w-1.5 bg-[var(--border-strong)] hover:bg-primary-500/50'
              }`}
            />
          ))}
        </div>
        <p className="mono-label truncate text-end">{hint}</p>
      </div>
    </div>
  );
}
