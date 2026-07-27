"use client";

import { useState } from 'react';

const CalculatorSection = () => {
  const [credits, setCredits] = useState(100);
  const cost = credits * 0.05;

  return (
    <section id="calculator" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Cost Calculator</h2>
        <p className="text-lg text-muted mb-8">
          Estimate your cost based on the number of leads you need.
        </p>
        <div className="p-8 bg-paper-2 rounded-lg shadow-card">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">{credits} Credits</span>
            <span className="font-bold text-2xl text-accent">${cost.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={credits}
            onChange={(e) => setCredits(parseInt(e.target.value))}
            className="w-full h-2 bg-rule rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
