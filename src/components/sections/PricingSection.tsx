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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative p-8 border"
              style={{
                background: tier.bg,
                borderColor: 'var(--color-rule)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {tier.popular && (
                <div className="absolute top-0 right-4 -mt-3">
                  <span
                    className="px-3 py-1 text-sm font-bold rounded-full"
                    style={{
                      background: 'var(--color-accent)',
                      color: 'var(--color-accent-ink)',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    Most teams pick this
                  </span>
                </div>
              )}
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
              >
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <p
                  className="text-4xl font-bold"
                  style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                >
                  {tier.price}
                </p>
                {tier.unit && (
                  <span
                    className="text-sm"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-label)' }}
                  >
                    {tier.unit}
                  </span>
                )}
              </div>
              <p
                className="mb-4"
                style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}
              >
                {tier.description}
              </p>
              <ul className="space-y-2 mb-8 text-left">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2" style={{ color: 'var(--color-muted)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full px-6 py-3 font-medium transition-opacity hover:opacity-90"
                style={
                  tier.popular
                    ? {
                        background: 'var(--color-accent)',
                        color: 'var(--color-accent-ink)',
                        borderRadius: 'var(--radius-pill)',
                      }
                    : {
                        background: 'var(--color-paper-3)',
                        color: 'var(--color-ink)',
                        borderRadius: 'var(--radius-pill)',
                      }
                }
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