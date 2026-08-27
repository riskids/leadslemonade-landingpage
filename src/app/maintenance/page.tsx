"use client";

import Image from "next/image";
import { useState } from "react";

// Note: move to layout if you need static metadata for this route
// export const metadata: Metadata = {
//   title: "Under Maintenance - LeadsLemonade",
//   description: "We are currently refining our precision engine to deliver high-performance growth.",
// };

export default function MaintenancePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Waitlist Subscriber - LeadsLemonade",
          email: email,
          message: "A new user joined the waitlist for the launch.",
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Failed to subscribe.");
      }
    } catch (err) {
      setError("Failed to connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-paper overflow-x-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-accent-2/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* Hero Content */}
      <section className="max-w-4xl mx-auto px-8 text-center relative z-10 py-16 text-ink">
        <div className="flex justify-center mb-12">
          <Image 
            src="/logo.png" 
            alt="LeadsLemonade Logo" 
            width={160} 
            height={64} 
            className="h-12 w-auto md:h-16 object-contain" 
            priority
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
          Something Big is{" "}
          <span style={{ color: "var(--color-accent)" }}>
            Brewing
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          Be the first to taste the freshest leads. We&apos;re refining our precision engine to deliver high-performance growth directly to your pipeline.
        </p>
        
        {/* Subscription Form */}
        {submitted ? (
          <div className="p-8 rounded-xl border max-w-md mx-auto" style={{ background: "color-mix(in oklch, var(--color-paper-2) 70%, transparent)", backdropFilter: "blur(16px)", borderColor: "color-mix(in oklch, var(--color-accent-2) 20%, transparent)" }}>
             <span className="material-symbols-outlined text-4xl mb-4" style={{ color: "var(--color-accent)" }}>check_circle</span>
             <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
             <p className="text-sm" style={{ color: "var(--color-muted)" }}>We&apos;ll notify you at {email} the moment we are ready to launch.</p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubscribe}
            className="p-2 rounded-xl border max-w-md mx-auto flex flex-col sm:flex-row gap-2 relative"
            style={{ 
              background: "color-mix(in oklch, var(--color-paper-2) 70%, transparent)", 
              backdropFilter: "blur(16px)", 
              borderColor: "color-mix(in oklch, var(--color-accent-2) 20%, transparent)" 
            }}
          >
            <input 
              className="flex-grow border-0 focus:ring-2 focus:ring-accent/20 text-ink rounded-lg px-4 py-3 placeholder:text-muted/50 transition-all focus:outline-none" 
              style={{ background: "var(--color-paper-2)" }}
              placeholder="Enter your professional email" 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-accent font-bold px-8 py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all text-accent-ink whitespace-nowrap"
              style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
            >
              {isSubmitting ? "Sending..." : "Notify Me"}
            </button>
            {error && (
              <p className="text-red-400 text-xs absolute -bottom-6 w-full text-center">{error}</p>
            )}
          </form>
        )}
      </section>
    </main>
  );
}
