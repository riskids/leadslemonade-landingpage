"use client";

import { useState } from "react";

const MIN = 100;
const MAX = 50000;
const STEP = 100;
const PRICE_PER_LEAD = 0.03; // $5 for 100 leads

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

function estimateCost(leads: number): number {
  return Math.max(5, Math.round(leads * PRICE_PER_LEAD * 100) / 100);
}

function estimateHours(leads: number): number {
  return Math.round((leads / 100) * 0.25);
}

export default function CalculatorSection() {
  const [leads, setLeads] = useState(5000);
  const cost = estimateCost(leads);
  const hours = estimateHours(leads);

  return (
    <section id="calculator" className="py-24 px-8 max-w-5xl mx-auto">
      <div className="glass-card rounded-[2rem] p-12 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#dde3ec" }}>
            Estimate Your Cost
          </h2>
          <p className="mb-12" style={{ color: "#bbc9ca" }}>
            Calculate your high-quality lead volume.
          </p>

          <div className="space-y-12">
            {/* Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: "#53d8e3" }}
                  htmlFor="leads-slider"
                >
                  Leads Required
                </label>
                <span className="text-4xl font-black" style={{ color: "#dde3ec" }}>
                  {formatNumber(leads)}
                </span>
              </div>
              <input
                id="leads-slider"
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{ background: "#2f353c" }}
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                aria-label="Number of leads"
              />
              <div className="flex justify-between text-xs" style={{ color: "#869394" }}>
                <span>{formatNumber(MIN)}</span>
                <span>{formatNumber(MAX)}</span>
              </div>
            </div>

            {/* Result */}
            <div
              className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-2xl border"
              style={{
                background: "rgba(9,15,21,0.5)",
                borderColor: "rgba(60,73,74,0.1)",
              }}
            >
              <div>
                <p className="text-xs uppercase mb-1" style={{ color: "#bbc9ca" }}>
                  Estimated Cost
                </p>
                <p className="text-5xl font-black" style={{ color: "#53d8e3" }}>
                  ${cost.toFixed(2)}
                  <span className="text-lg font-medium" style={{ color: "#bbc9ca" }}>
                    /mo
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Saves {hours} hours of manual research
                </div>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  No expensive commitment
                </div>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  99.9% verified deliverability
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
