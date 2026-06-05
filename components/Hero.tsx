'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, Mail, Terminal } from 'lucide-react';
import TypeWriter from '@/components/ui/TypeWriter';
import TerminalWindow from '@/components/ui/TerminalWindow';
import SystemGraphMount from '@/components/three/SystemGraphMount';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduce = useReducedMotion();

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      {/* blueprint grid + atmospheric glows */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-70" aria-hidden />
      <div
        className="absolute -z-10 top-1/4 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, var(--primary-500) 0%, transparent 65%)' }}
        aria-hidden
      />
      <div
        className="absolute -z-10 bottom-0 right-0 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, var(--accent-500) 0%, transparent 62%)' }}
        aria-hidden
      />

      <div
        className="absolute inset-y-10 -right-28 z-0 w-[125%] sm:w-[110%] lg:right-0 lg:w-[68%] opacity-35 sm:opacity-45 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
        aria-label="Interactive portfolio systems console"
      >
        <SystemGraphMount mode="hero" />
      </div>

      <div
        className="absolute inset-y-0 left-0 z-[1] w-full lg:w-[62%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 92%, transparent) 55%, transparent 100%)',
        }}
        aria-hidden
      />

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-[38rem]">
          <motion.div {...reveal(0)} className="flex items-center gap-3 mb-5">
            <span className="font-mono text-sm text-primary-500">00</span>
            <span className="h-px w-8 bg-[var(--border-strong)]" aria-hidden />
            <span className="font-mono text-sm text-muted">
              <span className="text-primary-500/70">$</span> ./boot-live-systems
            </span>
          </motion.div>

          {/* status */}
          <motion.div
            {...reveal(0.05)}
            className="inline-flex flex-wrap items-center gap-3 mb-6 font-mono text-xs"
          >
            <span className="inline-flex items-center gap-2 text-[var(--signal-ok)]">
              <span className="relative flex h-2 w-2">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--signal-ok)] opacity-70 animate-ping" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--signal-ok)]" />
              </span>
              {t.hero.availableStatus}
            </span>
            <span className="text-faint">·</span>
            <span className="text-muted">{t.hero.openToRemote}</span>
            <span className="hidden sm:inline text-faint">·</span>
            <span className="hidden sm:inline text-muted">SaaS · APIs · AI agents</span>
          </motion.div>

          <motion.h1
            {...reveal(0.1)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            {t.hero.name}
          </motion.h1>

          <motion.div {...reveal(0.15)} className="mb-5">
            <span className="font-mono text-lg md:text-2xl font-semibold">
              <span className="text-primary-500/70">&gt; </span>
              <TypeWriter words={t.hero.roles} className="gradient-text" />
            </span>
          </motion.div>

          <motion.p
            {...reveal(0.2)}
            className="text-base md:text-lg text-muted max-w-xl leading-relaxed mb-8"
          >
            {t.hero.tagline}
          </motion.p>

          {/* metrics */}
          <motion.div
            {...reveal(0.25)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-xl"
          >
            {t.hero.metrics.map((m) => (
              <div key={m.label} className="panel px-3 py-3 bg-[var(--surface)]/88 backdrop-blur-sm">
                <div className="font-mono text-lg md:text-xl font-bold text-primary-500 tabular-nums">
                  {m.value}
                </div>
                <div className="mono-label leading-tight">{m.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...reveal(0.3)} className="flex flex-wrap gap-3">
            <a
              href="/cv/Yasser-Hegazy-CV.pdf"
              download
              data-cursor="download"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-[#0c0a09] font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              {t.hero.downloadCV}
            </a>
            <button
              onClick={() => scrollToSection('#projects')}
              data-cursor="projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg panel bg-[var(--surface)]/88 backdrop-blur-sm hover:bg-[var(--surface-elevated)] font-semibold transition-colors"
            >
              <Terminal className="w-4 h-4 text-primary-500" />
              {t.hero.viewProjects}
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              data-cursor="contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-link hover:underline transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t.hero.contactMe}
            </button>
          </motion.div>

          <motion.div {...reveal(0.35)} className="mt-7 hidden md:block max-w-xl">
            <TerminalWindow title={t.hero.terminal.prompt}>
              <div className="space-y-1.5">
                {t.hero.terminal.commands.map((c) => (
                  <div key={c.cmd}>
                    <div className="flex gap-2">
                      <span className="text-primary-500/80 shrink-0">
                        {t.hero.terminal.prompt}
                      </span>
                      <span className="text-foreground">{c.cmd}</span>
                    </div>
                    <div className="text-muted ps-1">{c.out}</div>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
