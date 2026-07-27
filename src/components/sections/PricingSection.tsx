const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Transparent Pricing</h2>
        <p className="text-lg text-muted mb-8">
          Simple tiers for every stage of growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-paper-2 rounded-lg shadow-card">
            <h3 className="text-2xl font-bold mb-2">Free Sample</h3>
            <p className="text-4xl font-bold mb-4">$0</p>
            <ul className="space-y-2 text-muted mb-8">
              <li>10 Lead Credits/mo</li>
              <li>Basic Enriching</li>
            </ul>
            <button className="w-full px-6 py-3 rounded-full bg-paper-3 text-ink font-medium">Start Free</button>
          </div>
          <div className="p-8 bg-paper-3 rounded-lg shadow-card relative">
            <div className="absolute top-0 right-4 -mt-4">
              <span className="px-3 py-1 bg-accent-2 text-accent-ink text-sm font-bold rounded-full">Most Popular</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Micro Squeeze</h3>
            <p className="text-4xl font-bold mb-4">$5</p>
            <ul className="space-y-2 text-muted mb-8">
              <li>100 Lead Credits</li>
              <li>One-time purchase</li>
              <li>Premium verification</li>
              <li>No hidden fee</li>
            </ul>
            <button className="w-full px-6 py-3 rounded-full bg-accent text-accent-ink font-medium">Squeeze Now</button>
          </div>
          <div className="p-8 bg-paper-2 rounded-lg shadow-card">
            <h3 className="text-2xl font-bold mb-2">Fresh Monthly</h3>
            <p className="text-4xl font-bold mb-4">$29.90/mo</p>
            <ul className="space-y-2 text-muted mb-8">
              <li>1,000 Credits/mo</li>
              <li>Pay less for information detail</li>
              <li>Premium verification</li>
              <li>No hidden fee</li>
              <li>Scale with $4 per 100 credit top-ups</li>
            </ul>
            <button className="w-full px-6 py-3 rounded-full bg-paper-3 text-ink font-medium">Select Plan</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
