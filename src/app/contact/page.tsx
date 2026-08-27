"use client";

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

// Note: metadata export cannot be combined with "use client"
// Move metadata to a server component wrapper if needed.

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Create your own key at web3forms.com
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Contact Message - LeadsLemonade",
          from_name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none -z-10"
          style={{ background: "color-mix(in oklch, var(--color-accent) 5%, transparent)", filter: "blur(120px)" }}
        />

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight" style={{ color: "var(--color-ink)" }}>
                Have something in mind?{" "}
                <span style={{ color: "var(--color-accent)" }}>Contact us</span>
              </h1>
              <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--color-muted)" }}>
                Our team is here to help you scale. Send us a message and
                we&apos;ll get back to you shortly.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {[
                {
                  icon: "mail",
                  label: "Email Support",
                  value: "support@leadslemonade.com",
                  accent: "var(--color-accent)",
                  iconBg: "color-mix(in oklch, var(--color-accent) 10%, transparent)",
                },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="flex items-start gap-4 p-6 rounded-xl border"
                  style={{ background: "var(--color-paper-2)", borderColor: "color-mix(in oklch, var(--color-rule) 40%, transparent)" }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: contact.iconBg }}>
                    <span className="material-symbols-outlined" style={{ color: contact.accent }}>
                      {contact.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: contact.accent }}>
                      {contact.label}
                    </p>
                    <p className="font-medium" style={{ color: "var(--color-ink)" }}>{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div
              className="glass-card p-10 md:p-12 rounded-3xl border"
              style={{ borderColor: "color-mix(in oklch, var(--color-rule) 40%, transparent)" }}
            >
              <h2 className="text-2xl font-bold mb-8 tracking-tight" style={{ color: "var(--color-ink)" }}>
                Send a secure message
              </h2>

              {submitted ? (
                <div className="text-center py-16">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "color-mix(in oklch, var(--color-accent) 15%, transparent)" }}
                  >
                    <span className="material-symbols-outlined text-3xl" style={{ color: "var(--color-accent)", fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-ink)" }}>Message Transmitted</h3>
                  <p style={{ color: "var(--color-muted)" }}>We&apos;ll get back to you shorty.</p>
                </div>
              ) : (
                <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: "var(--color-muted)" }}>
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-xl px-4 py-4 outline-none transition-all"
                      style={{
                        background: "var(--color-paper-2)",
                        border: "1px solid color-mix(in oklch, var(--color-rule) 50%, transparent)",
                        color: "var(--color-ink)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-accent)";
                        e.target.style.boxShadow = "0 0 0 3px color-mix(in oklch, var(--color-accent) 10%, transparent)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "color-mix(in oklch, var(--color-rule) 50%, transparent)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: "var(--color-muted)" }}>
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full rounded-xl px-4 py-4 outline-none transition-all"
                      style={{
                        background: "var(--color-paper-2)",
                        border: "1px solid color-mix(in oklch, var(--color-rule) 50%, transparent)",
                        color: "var(--color-ink)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-accent)";
                        e.target.style.boxShadow = "0 0 0 3px color-mix(in oklch, var(--color-accent) 10%, transparent)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "color-mix(in oklch, var(--color-rule) 50%, transparent)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: "var(--color-muted)" }}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="How can LeadsLemonade help you scale?"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full rounded-xl px-4 py-4 outline-none transition-all resize-none"
                      style={{
                        background: "var(--color-paper-2)",
                        border: "1px solid color-mix(in oklch, var(--color-rule) 50%, transparent)",
                        color: "var(--color-ink)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-accent)";
                        e.target.style.boxShadow = "0 0 0 3px color-mix(in oklch, var(--color-accent) 10%, transparent)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "color-mix(in oklch, var(--color-rule) 50%, transparent)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all"
                    style={{
                      background: "var(--color-accent)",
                      color: "var(--color-accent-ink)",
                      boxShadow: "0 4px 20px color-mix(in oklch, var(--color-accent) 15%, transparent)",
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSubmitting ? "Transmitting..." : "Transmit Message"}
                  </button>
                  {error && <p className="text-red-400 text-center text-sm">{error}</p>}
                  <p className="text-center text-[10px] uppercase tracking-tighter" style={{ color: "color-mix(in oklch, var(--color-muted) 60%, transparent)" }}>
                    By sending this form, you agree to our data processing terms.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
