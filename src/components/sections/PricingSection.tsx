import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free Sample",
    tagline: "Testing the waters",
    price: "$0",
    priceNote: "",
    featured: false,
    features: ["10 Lead Credits / mo", "Basic Enriching"],
    cta: "Start Free",
    ctaStyle: "ghost",
  },
  {
    id: "micro",
    name: "Micro Squeeze",
    tagline: "Top-up when needed",
    price: "$5",
    priceNote: "",
    badge: "Most Popular",
    featured: true,
    features: [
      "100 Lead Credits",
      "One-time purchase",
      "Premium verification",
      "No hidden fee",
    ],
    cta: "Squeeze Now",
    ctaStyle: "primary",
  },
  {
    id: "monthly",
    name: "Fresh Monthly",
    tagline: "Growing startups",
    price: "$29.90",
    priceNote: "/mo",
    featured: false,
    features: [
      "1,000 Credits / mo",
      "Pay less for information detail",
      "Premium verification",
      "No hidden fee",
      "Scale with only $4 per 100 credit top-ups",
    ],
    cta: "Select Plan",
    ctaStyle: "outline",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4" style={{ color: "#dde3ec" }}>
          Transparent Pricing
        </h2>
        <p style={{ color: "#bbc9ca" }}>Simple tiers for every stage of growth.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {plans.map((plan) => (
          <div
            key={plan.id}
            id={`pricing-card-${plan.id}`}
            className={`glass-card p-8 rounded-2xl flex flex-col hover:-translate-y-2 transition-all duration-300 relative ${plan.featured ? "scale-105 z-10 shadow-[0_0_50px_rgba(83,216,227,0.1)]" : ""
              }`}
            style={
              plan.featured
                ? { borderColor: "rgba(83,216,227,0.4)" }
                : { borderColor: "rgba(7,26,31,0.3)" }
            }
          >
            {/* Badge */}
            {plan.badge && (
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest"
                style={{ background: "#53d8e3", color: "#00363a" }}
              >
                {plan.badge}
              </div>
            )}

            <h3 className="text-xl font-bold mb-2" style={{ color: "#dde3ec" }}>
              {plan.name}
            </h3>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#bbc9ca" }}>
              {plan.tagline}
            </p>
            <div className="text-4xl font-black mb-8" style={{ color: "#dde3ec" }}>
              {plan.price}
              {plan.priceNote && (
                <span className="text-lg font-normal" style={{ color: "#bbc9ca" }}>
                  {plan.priceNote}
                </span>
              )}
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: plan.featured ? "#dde3ec" : "#bbc9ca" }}
                >
                  <span className="material-symbols-outlined" style={{ color: "#53d8e3" }}>
                    check
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {plan.ctaStyle === "primary" && (
              <Link
                href="/maintenance"
                className="block text-center w-full py-3 rounded-xl font-bold transition-opacity hover:opacity-90"
                style={{ background: "#53d8e3", color: "#00363a", boxShadow: "0 4px 20px rgba(83,216,227,0.2)" }}
              >
                {plan.cta}
              </Link>
            )}
            {plan.ctaStyle === "ghost" && (
              <Link
                href="/maintenance"
                className="block text-center w-full py-3 rounded-xl font-bold border transition-colors hover:bg-slate-700/50"
                style={{ borderColor: "rgba(60,73,74,0.2)", color: "#dde3ec" }}
              >
                {plan.cta}
              </Link>
            )}
            {plan.ctaStyle === "outline" && (
              <Link
                href="/maintenance"
                className="block text-center w-full py-3 rounded-xl font-bold border transition-colors hover:bg-cyan-400/5"
                style={{ borderColor: "rgba(83,216,227,0.2)", color: "#53d8e3" }}
              >
                {plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
