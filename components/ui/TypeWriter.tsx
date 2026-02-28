'use client';

import { useState, useEffect, useCallback } from 'react';

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function TypeWriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
  className,
}: TypeWriterProps) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
    } else {
      setText(currentWord.substring(0, text.length + 1));
    }
  }, [isDeleting, text, wordIndex, words]);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && text === currentWord) {
      delay = pauseTime;
      const timeout = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(tick, delay);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime, tick]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
