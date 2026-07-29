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

  // N5 spec: drop a link if pill would push past ~720px
  const navItems = [
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
  ];

  return (
    <header
      className="fixed z-50"
      style={{
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div
        className="flex items-center gap-4 rounded-full px-3 py-2 border nav-pill-shadow"
        style={{
          background: "color-mix(in oklch, var(--color-paper) 78%, transparent)",
          backdropFilter: "blur(14px) saturate(120%)",
          WebkitBackdropFilter: "blur(14px) saturate(120%)",
          borderColor: "var(--color-rule)",
          borderRadius: "var(--radius-pill)",
          maxWidth: "720px",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="LeadsLemonade Logo" width={140} height={26} />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
              style={
                activeSection === item.id
                  ? {
                      background: "var(--color-accent)",
                      color: "var(--color-accent-ink)",
                    }
                  : { color: "var(--color-ink-2)" }
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block shrink-0">
          <Link
            href="/maintenance"
            className="px-4 py-1.5 text-sm font-medium rounded-full transition-opacity hover:opacity-90"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-accent-ink)",
              borderRadius: "var(--radius-pill)",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full focus:outline-none"
          style={{ color: "var(--color-ink-2)" }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-[720px]">
          <div
            className="rounded-2xl p-4 border nav-pill-shadow"
            style={{
              background: "color-mix(in oklch, var(--color-paper) 85%, transparent)",
              backdropFilter: "blur(14px) saturate(120%)",
              WebkitBackdropFilter: "blur(14px) saturate(120%)",
              borderColor: "var(--color-rule)",
            }}
          >
            <nav className="flex flex-col gap-2">
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
                onClick={() => setIsOpen(false)}
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
        </div>
      )}
    </header>
  );
};

export default Navbar;