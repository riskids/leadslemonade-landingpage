"use client";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section label — hanging heading, Aurora style */}
        <div className="mb-12">
          <span
            className="text-xs font-mono mb-2 block"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
          >
            02 / Features
          </span>
          <h2
            className="font-bold tracking-tighter"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--color-ink)',
            }}
          >
            AI-Powered Lead Discovery
          </h2>
        </div>

        {/* Asymmetric bento grid — breaks the 3-card icon-tile anti-pattern */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {/* Large card — 2 cols, 2 rows */}
          <div
            className="md:col-span-2 md:row-span-2 p-8 border flex flex-col justify-between min-h-[280px] transition-colors"
            style={{
              background: 'var(--color-paper-2)',
              borderColor: 'var(--color-rule)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-card)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-paper-3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-paper-2)')}
          >
            <div>
              <div
                className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-4"
                style={{
                  background: 'color-mix(in oklch, var(--color-accent) 12%, transparent)',
                  color: 'var(--color-accent)',
                }}
              >
                01 / Core
              </div>
              <h3
                className="text-3xl font-bold mb-3"
                style={{ color: 'var(--color-ink)' }}
              >
                AI-Driven Search
              </h3>
              <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
                Our LLM-powered scrapers understand intent, not just keywords. Find CEOs who like hiking or developers using Go.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['LLM-powered', 'Intent-based', 'Natural language', '30+ data points'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full border"
                  style={{
                    borderColor: 'var(--color-rule)',
                    color: 'var(--color-ink-2)',
                    fontFamily: 'var(--font-label)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tall card — 1 col, 2 rows */}
          <div
            className="md:row-span-2 p-8 border flex flex-col justify-between min-h-[280px] transition-colors"
            style={{
              background: 'var(--color-paper-2)',
              borderColor: 'var(--color-rule)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-card)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-paper-3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-paper-2)')}
          >
            <div>
              <div
                className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-4"
                style={{
                  background: 'color-mix(in oklch, var(--color-accent-2) 12%, transparent)',
                  color: 'var(--color-accent-2)',
                }}
              >
                02 / Pricing
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: 'var(--color-ink)' }}
              >
                Pricing Freedom
              </h3>
              <p style={{ color: 'var(--color-muted)' }}>
                Pay for what you squeeze. No heavy lock-ins. From micro-top-ups to enterprise volumes, we scale with you.
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-bold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  $5
                </span>
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  / 100 leads
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--color-rule)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ background: 'var(--color-accent)', width: '65%' }}
                />
              </div>
              <div
                className="text-xs font-mono"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
              >
                No lock-in. Scale as you go.
              </div>
            </div>
          </div>

          {/* Wide card — 3 cols, 1 row */}
          <div
            className="md:col-span-3 p-8 border flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-colors"
            style={{
              background: 'var(--color-paper-2)',
              borderColor: 'var(--color-rule)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-card)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-paper-3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-paper-2)')}
          >
            <div className="flex-1">
              <div
                className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-3"
                style={{
                  background: 'color-mix(in oklch, var(--color-accent) 12%, transparent)',
                  color: 'var(--color-accent)',
                }}
              >
                03 / Data
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--color-ink)' }}
              >
                Data Freshness
              </h3>
              <p style={{ color: 'var(--color-muted)' }}>
                Freshness-first enrichment. New searches trigger live checks so contact info is current when you pick a lead.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className="relative inline-flex w-3 h-3 rounded-full"
                style={{ background: 'var(--color-accent-2)' }}
              >
                <span
                  className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
                  style={{ background: 'var(--color-accent-2)' }}
                />
              </span>
              <span
                className="text-sm font-mono"
                style={{ color: 'var(--color-ink-2)', fontFamily: 'var(--font-label)' }}
              >
                Live · Real-time scrape
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;