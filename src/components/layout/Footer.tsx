import Link from "next/link";
import Image from "next/image";

/**
 * Ft5 Statement Footer — one large closing sentence dominates;
 * wordmark + minimal links + copyright sit beneath in muted small type.
 *
 * The "Ready to taste the freshest leads?" CTA IS the statement.
 */
const Footer = () => {
  return (
    <footer className="px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Ft5 Statement — the closing line dominates */}
        <div className="text-center mb-16">
          <h2
            className="font-bold tracking-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-ink)",
              letterSpacing: "var(--tracking-display)",
              lineHeight: 1.1,
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

        {/* Beneath: wordmark + links + copyright in muted small type */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="LeadsLemonade Logo" width={20} height={20} />
            <span className="font-bold text-sm" style={{ color: "var(--color-ink-2)" }}>
              LeadsLemonade
            </span>
          </div>

          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:opacity-80"
              style={{ color: "var(--color-muted)" }}
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:opacity-80"
              style={{ color: "var(--color-muted)" }}
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:opacity-80"
              style={{ color: "var(--color-muted)" }}
            >
              Contact
            </Link>
          </div>

          <div className="text-xs" style={{ color: "var(--color-muted)" }}>
            &copy; {new Date().getFullYear()} LeadsLemonade. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;