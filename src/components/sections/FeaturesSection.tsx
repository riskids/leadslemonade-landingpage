const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 p-8 bg-paper-2 rounded-lg shadow-card hover:bg-paper-3 transition-colors">
            <h3 className="text-2xl font-bold mb-2">AI-Driven Search</h3>
            <p className="text-muted">
              Our LLM-powered scrapers understand intent, not just keywords. Find CEOs who like hiking or developers using Go.
            </p>
          </div>
          <div className="p-8 bg-paper-2 rounded-lg shadow-card hover:bg-paper-3 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Pricing Freedom</h3>
            <p className="text-muted">
              Pay for what you squeeze. No heavy lock-ins. From micro-top-ups to enterprise volumes, we scale with you.
            </p>
          </div>
          <div className="p-8 bg-paper-2 rounded-lg shadow-card hover:bg-paper-3 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Data Freshness</h3>
            <p className="text-muted">
              Zero stale databases. Every search triggers a live scrape to ensure contact info is accurate as of this minute.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
