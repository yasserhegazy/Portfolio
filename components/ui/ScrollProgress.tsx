'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setScrollPercent(percent);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[3px] bg-gradient-to-r from-primary-500 to-accent-500"
      style={{
        width: `${scrollPercent}%`,
        transition: 'width 0.1s ease-out',
        boxShadow: scrollPercent > 0 ? '0 0 8px rgba(var(--color-primary-500, 99 102 241) / 0.4)' : 'none',
      }}
    />
  );
}
