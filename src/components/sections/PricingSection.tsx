"use client";

const PricingSection = () => {
  const tiers = [
    {
      name: "Free Sample",
      price: "$0",
      unit: "",
      description: "Up to 10 leads / month. For testing the waters.",
      features: [
        "10 lead credits / month",
        "Email + role enrichment",
        "Community support",
      ],
      cta: "Get Started",
      bg: 'var(--color-paper-2)',
      popular: false,
    },
    {
      name: "Micro Squeeze",
      price: "$5",
      unit: "",
      description: "One-time credit pack. No subscription, no expiry.",
      features: [
        "100 lead credits — one-time",
        "Premium SMTP verification",
        "Pay only for verified leads",
        "No hidden fees",
      ],
      cta: "Buy Credits",
      bg: 'var(--color-paper-3)',
      popular: true,
    },
    {
      name: "Fresh Monthly",
      price: "$29.90",
      unit: "/ mo",
      description: "For teams scaling outbound. No credit ceiling.",
      features: [
        "1,000 lead credits / month",
        "Volume discount on enrichment",
        "Premium SMTP verification",
        "Top-ups at $4 per 100 credits",
        "Priority support",
      ],
      cta: "Get Started",
      bg: 'var(--color-paper-2)',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <span
          className="text-xs font-mono mb-2 block"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
        >
          04 / Pricing
        </span>
        <h2
          className="font-bold tracking-tighter mb-4"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Transparent Pricing
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--color-muted)' }}>
          Plans that scale with you, not against you.
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: tier.bg,
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-card)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                textAlign: 'left',
                position: 'relative',
                ...(tier.popular
                  ? {
                      boxShadow: '0 24px 60px -30px rgba(0, 0, 60, 0.35)',
                    }
                  : {}),
              }}
            >
              {/* Badge */}
              {tier.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '2rem',
                    fontFamily: 'var(--font-label)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    background: 'var(--color-accent)',
                    color: 'var(--color-accent-ink)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 12px',
                  }}
                >
                  Recomended
                </span>
              )}

              {/* Tier name — mono, xs, uppercase */}
              <div
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-muted)',
                }}
              >
                {tier.name}
              </div>

              {/* Price — display, 3xl, 600, tight tracking */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.875rem',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  color: 'var(--color-ink)',
                }}
              >
                {tier.price}
                {tier.unit && (
                  <small
                    style={{
                      fontSize: '0.4em',
                      fontWeight: 400,
                      color: 'var(--color-muted)',
                    }}
                  >
                    {tier.unit}
                  </small>
                )}
              </div>

              {/* Description — sm, pulled close to price */}
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-muted)',
                  marginTop: '-4px',
                }}
              >
                {tier.description}
              </p>

              {/* Features — checkmarks, gap 8px */}
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.875rem',
                }}
              >
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      paddingLeft: '22px',
                      position: 'relative',
                      color: 'var(--color-muted)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA — pill button */}
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  border: '1px solid transparent',
                  width: '100%',
                  marginTop: 'auto',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                  ...(tier.popular
                    ? {
                        background: 'var(--color-accent)',
                        color: 'var(--color-accent-ink)',
                        borderColor: 'var(--color-accent)',
                      }
                    : {
                        background: 'var(--color-ink)',
                        color: 'var(--color-paper)',
                        borderColor: 'var(--color-ink)',
                      }),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;