'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CircleDot, Hammer, TrendingUp, Check } from 'lucide-react';
import PipelineFlow from '@/components/ui/PipelineFlow';

const STAR_ICONS = [CircleDot, Hammer, TrendingUp] as const;

export default function WakibCaseStudy() {
  const { language } = useLanguage();
  const t = translations[language];
  const w = t.wakib;
  const reduce = useReducedMotion();
  const [hasShot, setHasShot] = useState(true);

  const star = [
    { label: w.starLabels.situation, text: w.situation },
    { label: w.starLabels.action, text: w.action },
    { label: w.starLabels.result, text: w.result },
  ];

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.55, delay },
        };

  return (
    <section id="wakib" className="relative section-padding overflow-hidden bg-surface">
      {/* atmospheric wash to mark this as the flagship */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" aria-hidden />
      <div
        className="absolute -z-10 -top-24 end-0 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, var(--primary-500) 0%, transparent 65%)' }}
        aria-hidden
      />

      <div className="container-custom">
        {/* Header */}
        <motion.div {...reveal(0)} className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-sm text-primary-text tabular-nums">03</span>
            <span className="h-px w-8 bg-[var(--border-strong)]" aria-hidden />
            <span className="mono-label">{w.eyebrow}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="gradient-text">{w.title}</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">{w.subtitle}</p>
          <a
            href={w.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 font-mono text-sm text-link hover:underline"
          >
            {w.liveLabel}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Highlights band */}
        <motion.div
          {...reveal(0.1)}
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {w.highlights.map((h) => (
            <div key={h.label} className="panel-elevated px-4 py-4">
              <div dir="ltr" className="font-mono text-xl md:text-2xl font-bold text-primary-text leading-none text-start">
                {h.value}
              </div>
              <div className="mono-label mt-2 leading-tight">{h.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Optional live screenshot in a browser frame */}
        {hasShot && (
          <motion.div {...reveal(0.15)} className="mt-10">
            <div className="panel overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </span>
                <span className="flex-1 text-center font-mono text-xs text-faint truncate">wakib.ai</span>
                <span className="w-12" aria-hidden />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/wakib.png"
                alt="WAKIB.ai — live bilingual AI news platform"
                loading="lazy"
                onError={() => setHasShot(false)}
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        )}

        {/* STAR story */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {star.map((s, i) => {
            const Icon = STAR_ICONS[i];
            return (
              <motion.div key={s.label} {...reveal(0.1 + i * 0.08)} className="panel p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                    <Icon className="w-4 h-4 text-primary-500" />
                  </span>
                  <span className="mono-label">{`0${i + 1} · ${s.label}`}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{s.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Pipeline signature */}
        <motion.div {...reveal(0.15)} className="mt-8 panel p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-8">
            <h3 className="text-lg md:text-xl font-bold text-foreground">{w.pipelineTitle}</h3>
            <p className="mono-label max-w-md">{w.pipelineNote}</p>
          </div>
          <PipelineFlow stages={w.stages} />
        </motion.div>

        {/* Reliability + stack */}
        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-4">
          <motion.div {...reveal(0.1)} className="panel p-6 md:p-8">
            <h3 className="font-mono text-sm text-primary-text mb-4">{`// ${w.capabilitiesTitle}`}</h3>
            <ul className="space-y-3">
              {w.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                  <span className="grid place-items-center w-5 h-5 mt-0.5 rounded-md bg-[var(--signal-ok)]/12 shrink-0">
                    <Check className="w-3.5 h-3.5 text-[var(--signal-ok)]" />
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...reveal(0.18)} className="panel-elevated p-6 md:p-8">
            <h3 className="font-mono text-sm text-primary-text mb-4">{`// ${w.stackTitle}`}</h3>
            <div className="flex flex-wrap gap-2">
              {w.stack.map((s) => (
                <span key={s} className="tech-chip">{s}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
