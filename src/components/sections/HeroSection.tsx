"use client";

import { useState, useEffect } from 'react';

const placeholders = [
  "Software engineers in Jakarta...",
  "CEO of startups in Singapore...",
  "Marketing directors at SaaS...",
  "Freelance designers in Bandung...",
  "CTOs at fintech...",
];

const words = ['founder', 'owner', 'talent', 'anyone'];

const demoResults = [
  { name: "Sarah Chen", role: "CTO @ FinTech.id", email: "sarah@fintech.id", points: 34 },
  { name: "Budi Hartono", role: "CEO @ StartupHub", email: "budi@startuphub.co", points: 32 },
  { name: "Maya Putri", role: "Marketing Dir @ SaaS Co", email: "maya@saas.co", points: 31 },
];

export default function HeroSection() {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [word, setWord] = useState('founder');
  const [visibleResults, setVisibleResults] = useState(0);

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

  useEffect(() => {
    const i = setInterval(() => {
      setVisibleResults(prev => (prev + 1) % (demoResults.length + 1));
    }, 2200);
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
          {/* Left: H7 Marquee Hero — left-biased headline */}
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
              Search for{' '}
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span
                  key={word}
                  className="word-slide-in-animation inline-block"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {word}
                </span>
              </span>
              {' '}easily.
            </h1>
            <p
              className="text-lg md:text-xl mb-8 max-w-lg"
              style={{ color: 'var(--color-muted)' }}
            >
              Find anyone using natural language, verify emails in real-time, and start for as low as $5.
            </p>
            <div className="relative max-w-lg">
              <input
                type="text"
                placeholder={placeholder}
                className="w-full px-6 py-4 border focus:outline-none focus:ring-2 transition-colors"
                style={{
                  background: 'var(--color-paper-2)',
                  borderColor: 'var(--color-rule)',
                  borderRadius: 'var(--radius-input)',
                  '--tw-ring-color': 'var(--color-accent)',
                } as React.CSSProperties}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 font-medium"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-accent-ink)',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Right: Counterweight — live search demo panel */}
          <div className="hidden lg:block">
            <div
              className="rounded-xl p-6 border"
              style={{
                background: 'var(--color-paper-2)',
                borderColor: 'var(--color-rule)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                className="flex items-center gap-2 mb-4 pb-3 border-b text-xs"
                style={{
                  borderColor: 'var(--color-rule)',
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-label)',
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: 'var(--color-accent-2)' }}
                />
                live-search.ai
              </div>

              <div
                className="text-sm mb-4"
                style={{ color: 'var(--color-ink-2)', fontFamily: 'var(--font-label)' }}
              >
                <span style={{ color: 'var(--color-muted)' }}>$</span> search:{" "}
                <span style={{ color: 'var(--color-accent)' }}>
                  &ldquo;CTOs at fintech in Jakarta&rdquo;
                </span>
              </div>

              <div className="space-y-3">
                {demoResults.slice(0, visibleResults).map((r, idx) => (
                  <div
                    key={idx}
                    className="fade-up-animation rounded-lg p-3 border"
                    style={{
                      background: 'var(--color-paper-3)',
                      borderColor: 'var(--color-rule)',
                      borderRadius: 'var(--radius-card)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm" style={{ color: 'var(--color-ink)' }}>
                          {r.name}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-muted)' }}>
                          {r.role}
                        </div>
                      </div>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={{
                          background: 'color-mix(in oklch, var(--color-accent-2) 15%, transparent)',
                          color: 'var(--color-accent-2)',
                        }}
                      >
                        Verified
                      </span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-ink-2)', fontFamily: 'var(--font-label)' }}>
                      {r.email}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                      {r.points} data points enriched
                    </div>
                  </div>
                ))}
                {visibleResults < demoResults.length && (
                  <div className="text-xs animate-pulse" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}>
                    searching...
                  </div>
                )}
                {visibleResults >= demoResults.length && (
                  <div className="text-xs pt-1" style={{ color: 'var(--color-accent-2)', fontFamily: 'var(--font-label)' }}>
                    3 verified results · 30+ data points enriched
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}