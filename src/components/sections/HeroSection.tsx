"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PLACEHOLDER_TEXTS = [
  "Software engineers in Jakarta working at Financial industries, skilled in Java",
  "CEO of startups in Singapore with less than 50 employees",
  "Marketing directors at SaaS companies in London",
  "Freelance designers in Bandung skilled in Figma and UI/UX",
  "CTOs at fintech companies in New York hiring remotely",
];

const TYPING_SPEED = 40;   // ms per character
const PAUSE_DURATION = 2200; // ms to hold completed text
const ERASE_SPEED = 18;    // ms per character (erasing faster)

function TypewriterInput({ value, onChange }: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const target = PLACEHOLDER_TEXTS[placeholderIndex];

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, PAUSE_DURATION);
      return;
    }

    if (isTyping) {
      if (displayedPlaceholder.length < target.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedPlaceholder(target.slice(0, displayedPlaceholder.length + 1));
        }, TYPING_SPEED);
      } else {
        setIsPaused(true);
      }
    } else {
      // Erasing
      if (displayedPlaceholder.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedPlaceholder((prev) => prev.slice(0, -1));
        }, ERASE_SPEED);
      } else {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedPlaceholder, isTyping, isPaused, placeholderIndex]);

  return (
    <input
      id="hero-search-input"
      className="bg-transparent border-none outline-none w-full py-4 text-lg placeholder:text-slate-500"
      style={{ color: "#dde3ec" }}
      placeholder={displayedPlaceholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      aria-label="Search leads by natural language"
    />
  );
}

export default function HeroSection() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <section className="relative min-h-[750px] flex flex-col items-center justify-center text-center px-6 hero-gradient pt-20">
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-4 max-w-4xl leading-[1.1]">
        Search for{" "}
        <span
          className="inline-block relative overflow-hidden align-bottom text-left"
          style={{ height: "1.1em" }}
        >
          <span
            className="flex flex-col animate-word-slide w-full"
          >
            <span>founder</span>
            <span>owner</span>
            <span>talent</span>
            <span>anyone</span>
          </span>
        </span>
        <br />
        <span className="text-gradient-primary italic">easily.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl max-w-2xl mb-12 font-light" style={{ color: "#bbc9ca" }}>
        Find anyone using natural language, verify emails in real-time,
        and start for as low as $5.
      </p>

      {/* Search Bar — wider to accommodate long placeholder text */}
      <div
        id="hero-search-bar"
        className="w-full max-w-5xl glass-card rounded-2xl p-2 flex flex-col sm:flex-row items-center shadow-2xl gap-2 sm:gap-0"
      >
        <div className="flex-1 w-full min-w-0 flex items-center px-4 py-2 sm:py-0">
          <span
            className="material-symbols-outlined mr-3 shrink-0"
            style={{ color: "#53d8e3" }}
          >
            search
          </span>
          <TypewriterInput value={searchValue} onChange={setSearchValue} />
        </div>
        <Link
          href="/maintenance"
          id="hero-cta-btn"
          className="shrink-0 font-bold px-8 py-4 w-full sm:w-auto rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #53d8e3 0%, #00afb9 100%)",
            color: "#00363a",
          }}
        >
          Try for Free
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>bolt</span>
        </Link>
      </div>
    </section>
  );
}
