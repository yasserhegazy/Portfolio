'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor]';

function labelFor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  const el = target.closest(INTERACTIVE_SELECTOR);
  if (!el) return null;
  const explicit = el.getAttribute('data-cursor');
  if (explicit) return explicit;
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return 'type';
  return 'open';
}

export default function SmartCursor() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (reduce) return;

    const media = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const syncEnabled = () => setEnabled(media.matches);
    syncEnabled();
    media.addEventListener('change', syncEnabled);
    return () => media.removeEventListener('change', syncEnabled);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add('has-smart-cursor');

    const move = (event: PointerEvent) => {
      setVisible(true);
      if (ref.current) {
        ref.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const over = (event: MouseEvent) => setLabel(labelFor(event.target));
    const out = () => setLabel(null);
    const down = () => setActive(true);
    const up = () => setActive(false);
    const leave = () => setVisible(false);
    const smartLabel = (event: Event) => {
      setLabel((event as CustomEvent<string | null>).detail ?? null);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('smart-cursor-label', smartLabel);

    return () => {
      document.body.classList.remove('has-smart-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      window.removeEventListener('smart-cursor-label', smartLabel);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className={[
        'smart-cursor',
        visible ? 'smart-cursor-visible' : '',
        active ? 'smart-cursor-active' : '',
        label ? 'smart-cursor-labelled' : '',
      ].join(' ')}
      aria-hidden
    >
      <span className="smart-cursor-ring" />
      <span className="smart-cursor-dot" />
      <span className="smart-cursor-label">{label}</span>
    </div>
  );
}
