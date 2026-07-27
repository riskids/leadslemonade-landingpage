"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[720px] px-4">
      <div
        className="backdrop-blur-xl rounded-full px-4 py-2 border"
        style={{
          background: "color-mix(in oklch, var(--color-paper-2) 75%, transparent)",
          borderColor: "var(--color-rule)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="LeadsLemonade Logo" width={32} height={32} />
          </Link>

          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
                style={
                  activeSection === item.id
                    ? { background: "var(--color-accent)", color: "var(--color-accent-ink)" }
                    : { color: "var(--color-ink-2)" }
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium rounded-full transition-opacity hover:opacity-90"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-accent-ink)",
              }}
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full focus:outline-none focus:ring-2"
              style={{
                color: "var(--color-ink-2)",
                "--tw-ring-color": "var(--color-accent)",
              } as React.CSSProperties}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-full text-center font-medium transition-colors"
                  style={
                    activeSection === item.id
                      ? { background: "var(--color-accent)", color: "var(--color-accent-ink)" }
                      : { color: "var(--color-ink-2)" }
                  }
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="px-4 py-2 text-center font-medium rounded-full transition-opacity hover:opacity-90"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-accent-ink)",
                }}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;