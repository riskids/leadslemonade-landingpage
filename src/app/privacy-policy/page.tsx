import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrivacySidebar from "@/components/privacy/PrivacySidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - LeadsLemonade",
  description:
    "At LeadsLemonade, your data privacy is at the core of our philosophy. Read how we handle your information with precision.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="mb-20 text-center md:text-left">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full mb-6"
            style={{ background: "#161c22", border: "1px solid rgba(60,73,74,0.15)" }}
          >
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "#53d8e3" }}
            >
              Legal Governance
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-gradient-primary">
            Privacy Policy
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#bbc9ca" }}>
            At LeadsLemonade, your data privacy is at the core of our &ldquo;Synthetic
            Ether&rdquo; philosophy. We handle your information with the same precision we
            apply to our lead generation algorithms.
          </p>
          <div
            className="mt-8 flex items-center gap-4 text-sm font-medium"
            style={{ color: "#53d8e3" }}
          >
            <span className="material-symbols-outlined text-sm">schedule</span>
            Last Updated: April 7, 2026
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Navigation — Client Component */}
          <aside className="lg:col-span-3 hidden lg:block">
            <PrivacySidebar />
          </aside>

          {/* Content Canvas */}
          <div className="lg:col-span-9 space-y-16">
            {/* 01. Introduction */}
            <section className="scroll-mt-32" id="intro">
              <div
                className="rounded-xl p-8 border"
                style={{ background: "#161c22", borderColor: "rgba(60,73,74,0.1)" }}
              >
                <h2
                  className="text-2xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: "#dde3ec" }}
                >
                  <span className="font-mono text-lg" style={{ color: "#53d8e3" }}>
                    01.
                  </span>
                  Introduction
                </h2>
                <div className="space-y-4 leading-relaxed" style={{ color: "#bbc9ca" }}>
                  <p>
                    Welcome to LeadsLemonade. This Privacy Policy describes how your personal
                    information is collected, used, and shared when you visit or use our SaaS
                    platform.
                  </p>
                  <p>
                    We are committed to protecting your personal data and your right to privacy.
                    If you have any questions, please contact us at{" "}
                    <span style={{ color: "#53d8e3" }}>support@leadslemonade.com</span>.
                  </p>
                </div>
              </div>
            </section>

            {/* 02. Data Collection */}
            <section className="scroll-mt-32" id="collection">
              <h2
                className="text-2xl font-bold mb-8 flex items-center gap-3"
                style={{ color: "#dde3ec" }}
              >
                <span className="font-mono text-lg" style={{ color: "#53d8e3" }}>
                  02.
                </span>
                Data Collection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "person",
                    title: "Personal Identity",
                    desc: "We collect names, email addresses, business contact details, and payment information when you register for our services.",
                    accent: "#53d8e3",
                    iconBg: "rgba(83,216,227,0.1)",
                  },
                  {
                    icon: "terminal",
                    title: "Technical Telemetry",
                    desc: "Log data, IP addresses, browser types, and device identifiers are automatically collected to ensure security and performance.",
                    accent: "#97cbff",
                    iconBg: "rgba(151,203,255,0.1)",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-8 rounded-xl border"
                    style={{ background: "#090f15", borderColor: "rgba(60,73,74,0.15)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                      style={{ background: item.iconBg }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ color: item.accent }}
                      >
                        {item.icon}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{ color: "#dde3ec" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#bbc9ca" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03. How We Use Data */}
            <section className="scroll-mt-32" id="usage">
              <div
                className="rounded-xl p-8 relative overflow-hidden"
                style={{ background: "#252b31" }}
              >
                <h2
                  className="text-2xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: "#dde3ec" }}
                >
                  <span className="font-mono text-lg" style={{ color: "#53d8e3" }}>
                    03.
                  </span>
                  How We Use Data
                </h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Service Provision",
                      desc: "To operate, maintain, and provide all features of the LeadsLemonade platform.",
                    },
                    {
                      title: "Product Improvement",
                      desc: 'Analyzing user behavior to optimize our "Ether" layout and workflow efficiency.',
                    },
                    {
                      title: "Security & Compliance",
                      desc: "Detecting and preventing fraudulent activities and ensuring legal adherence.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span
                        className="material-symbols-outlined mt-1"
                        style={{ color: "#53d8e3" }}
                      >
                        check_circle
                      </span>
                      <div>
                        <p className="font-bold" style={{ color: "#dde3ec" }}>
                          {item.title}
                        </p>
                        <p className="text-sm" style={{ color: "#bbc9ca" }}>
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 04. Cookie Policy */}
            <section className="scroll-mt-32" id="cookies">
              <div
                className="rounded-xl p-8 border"
                style={{ background: "#161c22", borderColor: "rgba(60,73,74,0.1)" }}
              >
                <h2
                  className="text-2xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: "#dde3ec" }}
                >
                  <span className="font-mono text-lg" style={{ color: "#53d8e3" }}>
                    04.
                  </span>
                  Cookie Policy
                </h2>
                <p className="mb-6" style={{ color: "#bbc9ca" }}>
                  We use &ldquo;cookies&rdquo; to collect information and improve our Services. You
                  have the option to either accept or refuse these cookies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Essential", desc: "Necessary for site functionality." },
                    { label: "Performance", desc: "Helping us speed up the UI." },
                    { label: "Targeting", desc: "Marketing and analytics data." },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="p-4 rounded-lg"
                      style={{ background: "#1a2027" }}
                    >
                      <span
                        className="text-xs font-bold uppercase block mb-2"
                        style={{ color: "#97cbff" }}
                      >
                        {c.label}
                      </span>
                      <p className="text-xs" style={{ color: "#bbc9ca" }}>
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 05. User Rights */}
            <section className="scroll-mt-32" id="rights">
              <h2
                className="text-2xl font-bold mb-8 flex items-center gap-3"
                style={{ color: "#dde3ec" }}
              >
                <span className="font-mono text-lg" style={{ color: "#53d8e3" }}>
                  05.
                </span>
                Global Rights Compliance
              </h2>
              <div
                className="p-8 rounded-xl border shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#161c22,#252b31)",
                  borderColor: "rgba(60,73,74,0.2)",
                }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: "#53d8e3" }}>
                  GDPR &amp; CCPA Alignment
                </h3>
                <p className="mb-6 leading-relaxed" style={{ color: "#bbc9ca" }}>
                  Regardless of your location, we provide high-standard protection for your data.
                  You have the right to access, rectify, delete, and restrict the processing of
                  your data.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["The Right to Access", "The Right to Erasure", "Data Portability"].map(
                    (r) => (
                      <span
                        key={r}
                        className="px-4 py-2 rounded-full text-xs font-bold"
                        style={{ background: "rgba(51,151,224,0.2)", color: "#97cbff" }}
                      >
                        {r}
                      </span>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* CTA Bottom */}
            <div className="mt-16 text-center">
              <p className="mb-6 text-sm" style={{ color: "#bbc9ca" }}>Have questions about our policy?</p>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
