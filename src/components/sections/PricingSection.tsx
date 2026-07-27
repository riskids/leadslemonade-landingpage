const PricingSection = () => {
  const tiers = [
    {
      name: "Free Sample",
      price: "$0",
      features: ["10 Lead Credits/mo", "Basic Enriching"],
      cta: "Start Free",
      bg: 'var(--color-paper-2)',
      popular: false,
    },
    {
      name: "Micro Squeeze",
      price: "$5",
      features: ["100 Lead Credits", "One-time purchase", "Premium verification", "No hidden fee"],
      cta: "Squeeze Now",
      bg: 'var(--color-paper-3)',
      popular: true,
    },
    {
      name: "Fresh Monthly",
      price: "$29.90/mo",
      features: ["1,000 Credits/mo", "Pay less for information detail", "Premium verification", "No hidden fee", "Scale with $4 per 100 credit top-ups"],
      cta: "Select Plan",
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
          }}
        >
          Transparent Pricing
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--color-muted)' }}>
          Simple tiers for every stage of growth.
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
                      background: 'var(--color-accent-2)',
                      color: 'var(--color-accent-ink)',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--color-ink)' }}
              >
                {tier.name}
              </h3>
              <p
                className="text-4xl font-bold mb-4"
                style={{ color: 'var(--color-ink)' }}
              >
                {tier.price}
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