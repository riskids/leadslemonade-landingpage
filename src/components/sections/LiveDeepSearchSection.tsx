"use client";

const LiveDeepSearchSection = () => {
  return (
    <section id="live-deep-search" className="relative py-20">
      <div id="sticky-container" className="h-[200vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4 sticky-blur-reveal">
            <h2
              className="font-bold tracking-tighter mb-4"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "var(--tracking-display)",
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Live Deep Search
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--color-muted)' }}>
              Watch our engine scrape, verify, and enrich data in real-time. We don&apos;t just find emails; we build full profiles with over 30+ data points including tech stacks and company details.
            </p>
          </div>

          {/* Rich profile enrichment card — brief says "don't simplify it away" */}
          <div className="w-full max-w-4xl mx-auto px-4 mt-8 fade-up-animation">
            <div
              className="p-8 border"
              style={{
                background: 'var(--color-paper-2)',
                borderColor: 'var(--color-rule)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Profile header */}
              <div className="flex items-center gap-4">
                <img
                  src="/andrew-sebastian.jpg"
                  alt="Andrew Sebastian"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--color-ink)' }}>
                    Andrew Sebastian
                  </h3>
                  <p style={{ color: 'var(--color-muted)' }}>Founder at Analisa.io</p>
                </div>
                <span
                  className="ml-auto text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: 'color-mix(in oklch, var(--color-accent-2) 15%, transparent)',
                    color: 'var(--color-accent-2)',
                  }}
                >
                  30+ data points
                </span>
              </div>

              {/* Data grid */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h4
                    className="text-xs mb-1"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
                  >
                    EMAIL
                  </h4>
                  <p style={{ color: 'var(--color-ink)' }}>andrew@analisa.io</p>
                </div>
                <div>
                  <h4
                    className="text-xs mb-1"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
                  >
                    LINKEDIN
                  </h4>
                  <a
                    href="#"
                    className="transition-colors"
                    style={{ color: 'var(--color-accent)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                  >
                    linkedin.com/in/andrew-sebastian
                  </a>
                </div>
                <div>
                  <h4
                    className="text-xs mb-1"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
                  >
                    PHONE
                  </h4>
                  <p style={{ color: 'var(--color-ink)' }}>+62 812 3456 7890</p>
                </div>
              </div>

              {/* Tech stack */}
              <div className="mt-6">
                <h4
                  className="text-xs mb-2"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
                >
                  TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'Vercel', 'Stripe', 'PostgreSQL', 'Redis', 'Tailwind'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full border"
                      style={{
                        background: 'var(--color-paper-3)',
                        borderColor: 'var(--color-rule)',
                        color: 'var(--color-ink-2)',
                        borderRadius: 'var(--radius-pill)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company info */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs mb-1" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}>
                    COMPANY
                  </h4>
                  <p style={{ color: 'var(--color-ink)' }}>Analisa.io</p>
                </div>
                <div>
                  <h4 className="text-xs mb-1" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}>
                    EMPLOYEES
                  </h4>
                  <p style={{ color: 'var(--color-ink)' }}>11-50</p>
                </div>
                <div>
                  <h4 className="text-xs mb-1" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}>
                    FUNDING
                  </h4>
                  <p style={{ color: 'var(--color-ink)' }}>Seed · $2M</p>
                </div>
              </div>
            </div>

            {/* Feature highlight cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* 99.9% Deliverability */}
              <div
                className="p-6 border"
                style={{
                  background: 'var(--color-paper-2)',
                  borderColor: 'var(--color-rule)',
                  borderRadius: 'var(--radius-card)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                    style={{
                      background: 'color-mix(in oklch, var(--color-accent) 15%, transparent)',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.24" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-lg"
                      style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                    >
                      99.9% Deliverability
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                      Multi-layer SMTP verification
                    </p>
                  </div>
                </div>
              </div>

              {/* Pay what you get */}
              <div
                className="p-6 border"
                style={{
                  background: 'var(--color-paper-2)',
                  borderColor: 'var(--color-rule)',
                  borderRadius: 'var(--radius-card)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                    style={{
                      background: 'color-mix(in oklch, var(--color-accent-2) 15%, transparent)',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-lg"
                      style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                    >
                      Pay what you get
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                      No hidden fees. Pay only for the leads you actually pick.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDeepSearchSection;