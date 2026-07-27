import Link from "next/link";

/**
 * CTA Section — "Ready to taste the freshest leads?"
 * Standalone section on the homepage, not part of the footer.
 */
const CTASection = () => {
  return (
    <section id="cta" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="font-bold tracking-tight mb-6"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--color-ink)",
            letterSpacing: "var(--tracking-display)",
            lineHeight: 1.1,
            fontFamily: "var(--font-display)",
          }}
        >
          Ready to taste the freshest leads on the market?
        </h2>
        <p
          className="text-lg mb-8"
          style={{ color: "var(--color-muted)" }}
        >
          Growth your teams using LeadsLemonade for high-quality prospecting.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 font-medium text-lg transition-opacity hover:opacity-90"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-accent-ink)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  );
};

export default CTASection;