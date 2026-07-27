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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="mx-auto max-w-lg backdrop-blur-lg bg-white/50 dark:bg-black/50 border border-white/20 dark:border-black/20 rounded-full px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="LeadsLemonade Logo" width={32} height={32} />
          </Link>

          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-accent text-accent-ink"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" className="px-4 py-2 text-sm font-medium rounded-full bg-accent text-accent-ink hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-ink-2 hover:text-ink focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <span className="material-symbols-outlined">menu</span>
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
                  className={`px-4 py-2 rounded-full text-center font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-accent text-accent-ink"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="px-4 py-2 text-center font-medium rounded-full bg-accent text-accent-ink hover:opacity-90 transition-opacity">
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
