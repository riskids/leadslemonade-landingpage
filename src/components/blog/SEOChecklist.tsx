interface ChecklistItem {
  label: string;
  passed: boolean;
}

interface SEOChecklistProps {
  items: ChecklistItem[];
}

export default function SEOChecklist({ items }: SEOChecklistProps) {
  const passed = items.filter((item) => item.passed).length;

  return (
    <div
      className="p-5 border"
      style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h4
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--color-ink-2)" }}
        >
          SEO Checklist
        </h4>
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{ background: "var(--color-paper-3)", color: "var(--color-muted)" }}
        >
          {passed}/{items.length}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <span
              className="material-symbols-outlined text-lg shrink-0"
              style={{ color: item.passed ? "var(--color-accent)" : "var(--color-muted)" }}
            >
              {item.passed ? "check_circle" : "radio_button_unchecked"}
            </span>
            <span style={{ color: item.passed ? "var(--color-ink)" : "var(--color-muted)" }}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
