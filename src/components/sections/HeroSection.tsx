"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ctaHref } from '@/lib/cta';

const placeholders = [
  "Try CEO of startups in Singapore...",
  "Try growth leads at fintech companies in Jakarta...",
  "Try RevOps managers using Shopify..."
];

const words = ['founders', 'owners', 'talent', 'anyone'];

export default function HeroSection() {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [word, setWord] = useState('founders');

  useEffect(() => {
    const i = setInterval(() => {
      setPlaceholder(prev => {
        const idx = (placeholders.indexOf(prev) + 1) % placeholders.length;
        return placeholders[idx];
      });
    }, 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setWord(prev => {
        const idx = (words.indexOf(prev) + 1) % words.length;
        return words[idx];
      });
    }, 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Static radial blooms (Aurora genre rule: max 2, no animation) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, color-mix(in oklch, var(--color-accent) 8%, transparent), transparent 40%),
            radial-gradient(circle at 80% 70%, color-mix(in oklch, var(--color-accent-2) 8%, transparent), transparent 40%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline + subtext only */}
          <div className="text-left">
            <h1
              className="font-bold tracking-tighter mb-4"
              style={{
                fontSize: "var(--text-display)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: 1.05,
                fontFamily: "var(--font-display)",
              }}
            >
              Find{' '}
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span
                  key={word}
                  className="word-slide-in-animation inline-block"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {word}
                </span>
              </span>
              {' '}<br></br>with one search.
            </h1>
            <p
              className="text-lg md:text-xl max-w-lg"
              style={{ color: 'var(--color-muted)' }}
            >
              Search with natural language, verify emails in real time, and start with 100 credits for $5.
            </p>
          </div>

          {/* Right: Search form only */}
          <div className="flex lg:justify-end justify-center w-full">
            <div className="relative max-w-lg w-full">
              <input
                type="text"
                placeholder={placeholder}
                aria-label="Lead search query"
                className="w-full px-6 py-4 border focus:outline-none focus:ring-2 transition-colors"
                style={{
                  background: 'var(--color-paper-2)',
                  borderColor: 'var(--color-rule)',
                  borderRadius: 'var(--radius-input)',
                  '--tw-ring-color': 'var(--color-accent)',
                } as React.CSSProperties}
              />
              <Link
                href={ctaHref("hero-search")}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 font-medium"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-accent-ink)',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}