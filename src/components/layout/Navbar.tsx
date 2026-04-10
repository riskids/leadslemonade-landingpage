"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Live Preview", href: "/#live-preview", sectionId: "live-preview" },
  { label: "Features", href: "/#features", sectionId: "features" },
  { label: "Calculator", href: "/#calculator", sectionId: "calculator" },
  { label: "Pricing", href: "/#pricing", sectionId: "pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    NAV_LINKS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  function isActive(link: (typeof NAV_LINKS)[0]) {
    if (pathname === "/" && link.sectionId) {
      return activeSection === link.sectionId;
    }
    return false;
  }

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-xl flex justify-between items-center px-8 h-20"
      style={{ background: "rgba(7, 26, 31, 0.7)", boxShadow: "0 20px 40px rgba(0,175,185,0.08)" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="LeadsLemonade Logo"
          width={160}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive(link)
                ? "text-cyan-400 border-b-2 border-cyan-400 pb-1 transition-all duration-200"
                : "text-slate-400 hover:text-cyan-200 transition-colors duration-200"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop CTA Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/maintenance"
          id="nav-login-btn"
          className="text-slate-400 hover:text-cyan-200 text-sm font-medium px-4 py-2 hover:bg-cyan-400/10 transition-all duration-300 rounded-lg active:scale-90"
        >
          Login
        </Link>
        <Link
          href="/maintenance"
          id="nav-get-started-btn"
          className="bg-cyan-400 text-cyan-950 px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-cyan-400/20 active:scale-95 transition-all"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-slate-400 p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-3xl">
          {isMobileMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-20 left-0 w-full p-6 flex flex-col gap-6 md:hidden shadow-2xl border-t border-white/5"
          style={{ background: "rgba(7, 26, 31, 0.98)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col gap-4 text-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={
                  isActive(link)
                    ? "text-cyan-400 text-lg font-bold"
                    : "text-slate-300 hover:text-cyan-200 text-lg font-medium"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Link
              href="/maintenance"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-200 text-center text-lg font-medium py-3 rounded-xl border border-white/10"
            >
              Login
            </Link>
            <Link
              href="/maintenance"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-cyan-400 text-cyan-950 text-center py-3 rounded-xl text-lg font-bold shadow-lg shadow-cyan-400/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
