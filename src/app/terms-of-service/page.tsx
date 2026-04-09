import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | LeadsLemonade",
  description:
    "Please read these terms carefully before using LeadsLemonade services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block" style={{ color: "#53d8e3" }}>
              Legal Framework
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6" style={{ color: "#dde3ec" }}>
              Terms of Service
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "#bbc9ca" }}>
              Last updated: April 7, 2026. Please read these terms carefully
              before using LeadsLemonade services.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* 1. Acceptance */}
            <div className="md:col-span-12 glass-panel p-8 rounded-2xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border"
                  style={{ background: "rgba(83,216,227,0.1)", borderColor: "rgba(83,216,227,0.2)" }}>
                  <span className="material-symbols-outlined" style={{ color: "#53d8e3" }}>verified_user</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: "#dde3ec" }}>1. Acceptance of Terms</h2>
                  <p className="leading-relaxed" style={{ color: "#bbc9ca" }}>
                    By accessing or using LeadsLemonade (&ldquo;the Service&rdquo;), you agree to be bound by these Terms
                    of Service and all applicable laws and regulations. If you do not agree with any of these
                    terms, you are prohibited from using or accessing this site. Our high-performance lead
                    generation engine is provided subject to your compliance with these directives.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. User Conduct */}
            <div className="md:col-span-7 glass-panel p-8 rounded-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "#dde3ec" }}>
                <span className="material-symbols-outlined" style={{ color: "#97cbff" }}>gavel</span>
                2. User Conduct
              </h2>
              <p className="leading-relaxed text-sm mb-4" style={{ color: "#bbc9ca" }}>
                Users must maintain the integrity of our precision-engineered environment. Prohibited actions include:
              </p>
              <ul className="space-y-3">
                {[
                  "Automated scraping of the dashboard interface",
                  "Sharing account credentials with third parties",
                  "Attempting to bypass credit-based limitations",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#bbc9ca" }}>
                    <span className="material-symbols-outlined text-[18px]" style={{ color: "#53d8e3" }}>check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. IP Rights */}
            <div className="md:col-span-5 glass-panel p-8 rounded-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "#dde3ec" }}>
                <span className="material-symbols-outlined" style={{ color: "#97cbff" }}>copyright</span>
                3. IP Rights
              </h2>
              <p className="leading-relaxed text-sm" style={{ color: "#bbc9ca" }}>
                The LeadsLemonade engine, visual architecture, and all proprietary algorithms are the
                exclusive property of LeadsLemonade Systems. All rights not expressly granted are reserved.
              </p>
            </div>

            {/* 4. Billing & Credits */}
            <div className="md:col-span-12 glass-panel p-8 rounded-2xl border-l-4"
              style={{ borderLeftColor: "#53d8e3", background: "rgba(22,28,34,0.3)" }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-black mb-4 flex items-center gap-3" style={{ color: "#dde3ec" }}>
                    <span className="material-symbols-outlined" style={{ color: "#53d8e3", fontVariationSettings: "'FILL' 1" }}>payments</span>
                    4. Billing and Credits
                  </h2>
                  <p className="mb-6" style={{ color: "#bbc9ca" }}>
                    LeadsLemonade operates on a precise credit-consumption model designed for fair resource distribution.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { value: "1 Credit", label: "Per Search Page" },
                      { value: "1 Credit", label: "Per Lead Detail View" },
                      { value: "FREE", label: "Save & CSV Export", highlight: true },
                    ].map((item) => (
                      <div key={item.label}
                        className="p-4 rounded-xl border"
                        style={
                          item.highlight
                            ? { background: "rgba(83,216,227,0.1)", borderColor: "rgba(83,216,227,0.2)" }
                            : { background: "#1a2027", borderColor: "rgba(60,73,74,0.1)" }
                        }>
                        <div className="font-bold mb-1" style={{ color: "#53d8e3" }}>{item.value}</div>
                        <div className="text-xs uppercase tracking-wider" style={{ color: "#bbc9ca" }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Limitation of Liability */}
            <div className="md:col-span-12 glass-panel p-8 rounded-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "#dde3ec" }}>
                <span className="material-symbols-outlined" style={{ color: "#97cbff" }}>shield</span>
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed" style={{ color: "#bbc9ca" }}>
                In no event shall LeadsLemonade or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the materials on LeadsLemonade&apos;s website,
                even if LeadsLemonade or an authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>
            </div>
          </div>

          {/* CTA Bottom */}
          <div className="mt-16 text-center">
            <p className="mb-6 text-sm" style={{ color: "#bbc9ca" }}>Have questions about our terms?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold transition-all duration-300 hover:gap-4"
              style={{ color: "#53d8e3" }}
            >
              Contact Us
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
