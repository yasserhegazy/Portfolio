'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * Designed brand tile for projects without a screenshot — a premium generative
 * visual (mono monogram + signal motif on a blueprint field) instead of a fake
 * product shot. Theme-aware through CSS tokens.
 */
export default function ProjectVisual({
  title,
  tag,
}: {
  title: string;
  tag?: string;
}) {
  const reduce = useReducedMotion();
  // Monogram from the first two word initials (handles Arabic and Latin).
  const monogram = title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('');

  return (
    <div className="relative w-full h-full grid-bg overflow-hidden bg-[var(--surface-elevated)]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(120% 90% at 78% 18%, color-mix(in srgb, var(--primary-500) 22%, transparent) 0%, transparent 55%), radial-gradient(90% 90% at 12% 96%, color-mix(in srgb, var(--accent-500) 18%, transparent) 0%, transparent 58%)',
        }}
        aria-hidden
      />

      {/* monogram */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono font-bold text-6xl md:text-7xl tracking-tight text-foreground/85">
          {monogram}
        </span>
      </div>

      {/* signal dots — an agent/session motif */}
      <div className="absolute bottom-4 start-4 flex items-end gap-1.5" aria-hidden>
        {[10, 18, 26, 16, 22, 12, 20].map((h, i) => (
          <span
            key={i}
            className={`w-1.5 rounded-full bg-primary-500/70 ${reduce ? '' : 'animate-pulse-dot'}`}
            style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>

      {tag && (
        <span className="absolute top-3 end-3 mono-label bg-[var(--surface)]/70 px-1.5 py-0.5 rounded">
          {tag}
        </span>
      )}
    </div>
  );
}
