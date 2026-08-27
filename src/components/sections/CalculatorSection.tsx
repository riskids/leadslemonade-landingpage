"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ctaHref } from '@/lib/cta';

const CalculatorSection = () => {
  const [credits, setCredits] = useState(100);
  const cost = credits * 0.05;

  return (
    <section id="calculator" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span
          className="text-xs font-mono mb-2 block"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
        >
          03 / Calculator
        </span>
        <h2
          className="font-bold tracking-tighter mb-4"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--color-ink)',
          }}
        >
          Cost Calculator
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--color-muted)' }}>
          Estimate your cost based on the number of leads you need.
        </p>
        <div
          className="p-8 border"
          style={{
            background: 'var(--color-paper-2)',
            borderColor: 'var(--color-rule)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-lg" style={{ color: 'var(--color-ink)' }}>
              {credits} Credits
            </span>
            <span
              className="font-bold text-2xl"
              style={{ color: 'var(--color-accent)' }}
            >
              ${cost.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={credits}
            onChange={(e) => setCredits(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: 'var(--color-rule)',
              accentColor: 'var(--color-accent)',
            }}
          />
          <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--color-muted)' }}>
            <span>10 credits</span>
            <span>1,000 credits</span>
          </div>
          <Link
            href={ctaHref("calculator", { credits })}
            aria-label={`Buy ${credits} credits for $${cost.toFixed(2)}`}
            className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 font-medium transition-opacity hover:opacity-90"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-accent-ink)',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            Buy {credits} credits — ${cost.toFixed(2)}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;