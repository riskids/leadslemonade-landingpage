interface SEOScoreCardProps {
  score: number;
}

export default function SEOScoreCard({ score }: SEOScoreCardProps) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "var(--color-accent)" : score >= 60 ? "var(--color-ink-2)" : "var(--color-accent-2)";
  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs work";

  return (
    <div
      className="flex items-center gap-4 p-4 border"
      style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
    >
      <div className="relative w-12 h-12">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="var(--color-rule)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-xs font-bold"
          style={{ color: "var(--color-ink)" }}
        >
          {score}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
          SEO Score
        </p>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}
