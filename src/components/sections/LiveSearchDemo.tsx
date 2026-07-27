"use client";

import { useEffect, useState } from 'react';

const searchResults = [
  { name: 'Andrew Sebastian', title: 'Founder & CEO', company: 'Startup Inc.', location: 'Jakarta, Indonesia' },
  { name: 'Samantha Lee', title: 'Marketing Director', company: 'SaaS Corp.', location: 'Singapore' },
  { name: 'David Chen', title: 'Lead Designer', company: 'Creative Studio', location: 'Bandung, Indonesia' },
  { name: 'Jessica Miller', title: 'CTO', company: 'Fintech Solutions', location: 'Remote' },
];

const LiveSearchDemo = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % (searchResults.length + 1));
    }, 2000); // Cycle through results every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-[var(--color-paper-1)] rounded-xl shadow-lg overflow-hidden border border-[var(--color-rule)]">
      <div className="p-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-6 bg-[var(--color-paper-2)]">
        <p className="text-sm text-[var(--color-muted)] mb-4 font-mono">
          &gt; Searching for: <span className="text-[var(--color-ink)]">Software engineers in Jakarta...</span>
        </p>
        <div className="space-y-4">
          {searchResults.map((result, index) => (
            <div
              key={result.name}
              className={`transition-all duration-500 transform ${
                index < visibleIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex-shrink-0 mr-4"></div>
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">{result.name}</p>
                  <p className="text-sm text-[var(--color-muted)]">{result.title} at {result.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveSearchDemo;
