'use client';

import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalWindow({
  title = 'yasser@portfolio: ~',
  children,
  className = '',
}: TerminalWindowProps) {
  return (
    <div
      className={`panel overflow-hidden shadow-2xl shadow-black/20 ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
        <span className="flex gap-1.5" aria-hidden>
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </span>
        <span className="flex-1 text-center font-mono text-xs text-faint truncate">
          {title}
        </span>
        <span className="w-12" aria-hidden />
      </div>
      {/* Body */}
      <div className="p-4 sm:p-5 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
