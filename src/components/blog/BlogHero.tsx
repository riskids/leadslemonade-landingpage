interface BlogHeroProps {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}

export default function BlogHero({ title, description, value, onChange }: BlogHeroProps) {
  return (
    <section className="relative pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <h1
              className="font-bold tracking-tighter mb-4"
              style={{
                fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                fontFamily: "var(--font-display)",
              }}
            >
              {title}
            </h1>
            <p className="text-lg md:text-xl max-w-xl" style={{ color: "var(--color-muted)" }}>
              {description}
            </p>
          </div>

          <div className="flex lg:justify-end">
            <div className="relative w-full max-w-md">
              <span
                className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px]"
                style={{ color: "var(--color-muted)" }}
              >
                search
              </span>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 border focus:outline-none focus:ring-2 transition-colors"
                style={{
                  background: "var(--color-paper-2)",
                  borderColor: "var(--color-rule)",
                  borderRadius: "var(--radius-input)",
                  color: "var(--color-ink)",
                  "--tw-ring-color": "var(--color-accent)",
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
