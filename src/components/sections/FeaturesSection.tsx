"use client";

const features = [
  {
    id: "ai-search",
    icon: "psychology",
    title: "AI-Driven Search",
    desc: "Our LLM-powered scrapers understand intent, not just keywords. Find CEOs who like hiking or developers using Go.",
    accent: "#53d8e3",
    bg: "rgba(83,216,227,0.1)",
    border: "rgba(83,216,227,0.2)",
  },
  {
    id: "pricing-freedom",
    icon: "payments",
    title: "Pricing Freedom",
    desc: "Pay for what you squeeze. No heavy lock-ins. From micro-topups to enterprise volumes, we scale with you.",
    accent: "#3397e0",
    bg: "rgba(51,151,224,0.1)",
    border: "rgba(51,151,224,0.2)",
  },
  {
    id: "data-freshness",
    icon: "update",
    title: "Data Freshness",
    desc: "Zero stale databases. Every search triggers a live scrape to ensure contact info is accurate as of this minute.",
    accent: "#00afb9",
    bg: "rgba(0,175,185,0.1)",
    border: "rgba(0,175,185,0.2)",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden" style={{ background: "#090f15" }}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: "#dde3ec" }}>
            AI-Powered Lead Discovery
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.id}
              id={`feature-card-${f.id}`}
              className="glass-card p-8 rounded-2xl transition-all duration-300 cursor-default hover:brightness-125"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: f.bg, border: `1px solid ${f.border}` }}
              >
                <span className="material-symbols-outlined text-3xl" style={{ color: f.accent }}>
                  {f.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: f.accent }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#bbc9ca" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
