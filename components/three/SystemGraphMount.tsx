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

export default function SystemGraphMount() {
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

  return (
    <div ref={ref} className="relative w-full aspect-square max-w-[480px] mx-auto">
      {/* glow */}
      <div
        className="absolute inset-8 rounded-full blur-3xl opacity-30"
        style={{
          background:
            'radial-gradient(circle, var(--primary-500) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      {/* live request-trace readout */}
      {live && trace && (
        <div
          className="absolute top-3 left-3 z-10 pointer-events-none font-mono text-[11px] leading-relaxed"
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

      <p className="mt-2 text-center mono-label">
        {live
          ? '// click a node to inspect · drag to orbit'
          : '// live request trace · system map'}
      </p>
    </div>
  );
}
