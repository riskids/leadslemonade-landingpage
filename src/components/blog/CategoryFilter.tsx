import type { Category } from "@/lib/blog-data";

interface CategoryFilterProps {
  categories: readonly Category[];
  active: string;
  onSelect: (category: string) => void;
  counts: Record<string, number>;
}

export default function CategoryFilter({ categories, active, onSelect, counts }: CategoryFilterProps) {
  const items = ["All", ...categories];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {items.map((item) => {
        const isActive = active === item;
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={
              isActive
                ? {
                    background: "var(--color-accent)",
                    color: "var(--color-accent-ink)",
                  }
                : {
                    background: "var(--color-paper-2)",
                    color: "var(--color-ink-2)",
                    border: "1px solid var(--color-rule)",
                  }
            }
          >
            {item}
            {counts[item] !== undefined && (
              <span className="ml-2 text-xs opacity-70">{counts[item]}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
