"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "intro", num: "01", label: "Introduction" },
  { id: "collection", num: "02", label: "Data Collection" },
  { id: "usage", num: "03", label: "How We Use Data" },
  { id: "cookies", num: "04", label: "Cookie Policy" },
  { id: "compliance", num: "05", label: "GDPR & CCPA" },
];

export default function PrivacySidebar() {
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "intro";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 250) {
            currentId = section.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-32 space-y-2">
      <p
        className="text-xs font-bold tracking-widest uppercase mb-4"
        style={{ color: "#869394" }}
      >
        Contents
      </p>
      {sections.map((s) => {
        const isActive = activeId === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(s.id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setActiveId(s.id);
                window.history.pushState(null, "", `#${s.id}`);
              }
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer"
            style={
              isActive
                ? {
                  background: "#252b31",
                  color: "#53d8e3",
                  borderRight: "2px solid #53d8e3",
                }
                : { color: "#bbc9ca" }
            }
            onMouseEnter={(e) => {
              if (!isActive)
                (e.currentTarget as HTMLAnchorElement).style.background = "#161c22";
            }}
            onMouseLeave={(e) => {
              if (!isActive)
                (e.currentTarget as HTMLAnchorElement).style.background = "";
            }}
          >
            <span className="text-sm font-semibold">
              {s.num}. {s.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
