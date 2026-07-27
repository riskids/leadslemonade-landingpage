"use client"

const LiveDeepSearchSection = () => {
  return (
    <section id="live-deep-search" className="relative py-20">
      <div id="sticky-container" className="h-[200vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4 sticky-blur-reveal">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Live Deep Search</h2>
            <p className="text-lg text-muted mb-8">
              Watch our engine scrape, verify, and enrich data in real-time. We don&apos;t just find emails; we build full profiles with over 30+ data points including tech stacks and company details.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto px-4 mt-8">
            <div className="p-8 bg-paper-2 rounded-lg shadow-card">
              <div className="flex items-center space-x-4">
                <img src="/andrew-sebastian.jpg" alt="Andrew Sebastian" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-bold text-lg">Andrew Sebastian</h3>
                  <p className="text-muted">Founder at Analisa.io</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-label text-sm text-muted">Email</h4>
                  <p>andrew@analisa.io</p>
                </div>
                <div>
                  <h4 className="font-label text-sm text-muted">LinkedIn</h4>
                  <a href="#" className="text-accent hover:underline">linkedin.com/in/andrew-sebastian</a>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-label text-sm text-muted">Tech Stack</h4>
                <div className="flex space-x-2 mt-2">
                  <span className="px-2 py-1 bg-paper-3 text-sm rounded">Next.js</span>
                  <span className="px-2 py-1 bg-paper-3 text-sm rounded">Vercel</span>
                  <span className="px-2 py-1 bg-paper-3 text-sm rounded">Stripe</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-accent">verified</span>
                <p className="mt-2 font-bold">99.9% Deliverability</p>
                <p className="text-sm text-muted">Multi-layer SMTP verification</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-accent-2">attach_money</span>
                <p className="mt-2 font-bold">Pay what you get</p>
                <p className="text-sm text-muted">No hidden fees. Pay only for the leads you actually pick.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveDeepSearchSection;
