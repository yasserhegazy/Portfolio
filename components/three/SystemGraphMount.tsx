'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import SystemGraphFallback from './SystemGraphFallback';
import type { TraceInfo } from './SystemGraph';

const SystemGraph = dynamic(() => import('./SystemGraph'), {
  ssr: false,
  loading: () => <SystemGraphFallback />,
});

export default function SystemGraphMount({
  mode = 'compact',
  className = '',
}: {
  mode?: 'compact' | 'hero';
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [canUse3D, setCanUse3D] = useState(false);
  const [trace, setTrace] = useState<TraceInfo | null>(null);

  // Decide capability after mount (avoids SSR mismatch).
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const hasWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();
    setCanUse3D(isDesktop && hasWebGL && !reduce);
  }, [reduce]);

  // Lazy-mount the heavy scene only when scrolled into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const live = canUse3D && inView;
  const responding = trace?.phase === 'response';
  const statusColor = !trace
    ? '#a8a29e'
    : responding
      ? trace.ok
        ? '#34d399'
        : '#f87171'
      : '#fbbf24';

  const isHero = mode === 'hero';

  return (
    <div
      ref={ref}
      className={[
        'relative w-full mx-auto',
        isHero ? 'h-full min-h-[430px] lg:min-h-[650px]' : 'aspect-square max-w-[480px]',
        className,
      ].join(' ')}
      data-cursor="orbit"
    >
      {/* glow */}
      <div
        className={isHero ? 'absolute inset-0 rounded-full blur-3xl opacity-25' : 'absolute inset-8 rounded-full blur-3xl opacity-30'}
        style={{
          background:
            'radial-gradient(circle, var(--primary-500) 0%, rgba(56,189,248,0.18) 32%, transparent 66%)',
        }}
        aria-hidden
      />

      {/* live request-trace readout */}
      {live && trace && (
        <div
          className={[
            'absolute z-10 pointer-events-none font-mono text-[11px] leading-relaxed',
            isHero ? 'top-4 right-4 hidden sm:block' : 'top-3 left-3',
          ].join(' ')}
          style={{
            background: 'rgba(12,10,9,0.7)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '6px 10px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>{trace.method}</span>
            <span style={{ color: '#fafaf9' }}>{trace.path}</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: statusColor }}>
            <span>{responding ? '◂─' : '─▸'}</span>
            <span>{responding ? trace.status : 'routing…'}</span>
          </div>
        </div>
      )}

      <div className="relative w-full h-full">
        {live ? <SystemGraph onTrace={setTrace} /> : <SystemGraphFallback />}
      </div>

      <p
        className={[
          'mono-label',
          isHero
            ? 'absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:block whitespace-nowrap'
            : 'mt-2 text-center',
        ].join(' ')}
      >
        {live
          ? '// live systems console · click nodes · drag to orbit'
          : '// live systems console · static systems map'}
      </p>
    </div>
  );
}
