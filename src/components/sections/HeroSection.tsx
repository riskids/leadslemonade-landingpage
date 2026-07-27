"use client";

import { useState, useEffect } from 'react';

const placeholders = [
  "Software engineers in Jakarta...",
  "CEO of startups in Singapore...",
  "Marketing directors at SaaS...",
  "Freelance designers in Bandung...",
  "CTOs at fintech...",
];

const HeroSection = () => {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [word, setWord] = useState('founder');
  const words = ['founder', 'owner', 'talent', 'anyone'];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % placeholders.length;
      setPlaceholder(placeholders[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % words.length;
      setWord(words[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-transparent"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4" style={{ fontFeatureSettings: "'tnum' on, 'lnum' on" }}>
          Search for <span className="inline-block overflow-hidden h-20 align-bottom"><span className="word-slide-in-animation inline-block" key={word}>{word}</span></span> easily.
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
          Find anyone using natural language, verify emails in real-time, and start for as low as $5.
        </p>
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-6 py-4 rounded-full bg-paper-2 border border-rule focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-accent text-accent-ink font-medium">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
