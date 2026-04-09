"use client";

const profiles = [
  {
    id: 1,
    initials: "AS",
    name: "Andrew Sebastian",
    role: "Senior Back End Engineer @ Goto Group",
    location: "Jakarta, Indonesia",
    imgUrl: "/andrew-sebastian.jpg",
  },
  {
    id: 2,
    initials: "PC",
    name: "Paul Copplestone",
    role: "Co-Founder & CEO @ Supabase",
    location: "Singapore",
    imgUrl: "https://avatars.githubusercontent.com/u/10214025?v=4",
  },
  {
    id: 3,
    initials: "KS",
    name: "Karri Saarinen",
    role: "Co-Founder & CEO @ Linear",
    location: "San Francisco, CA",
    imgUrl: "https://avatars.githubusercontent.com/u/260?v=4",
  },
  {
    id: 4,
    initials: "LR",
    name: "Lee Robinson",
    role: "VP of Product @ Vercel",
    location: "Des Moines, IA",
    imgUrl: "https://avatars.githubusercontent.com/u/9113740?v=4",
  },
];

function ProfileCard({ profile }: { profile: typeof profiles[0] }) {
  return (
    <div className="glass-card border border-primary/10 p-4 rounded-xl backdrop-blur-md"
      style={{ background: "rgba(22, 28, 34, 0.4)" }}>
      <div className="flex items-center gap-3 mb-3">
        {profile.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={profile.name}
            className="w-11 h-11 rounded-full object-cover shrink-0"
            src={profile.imgUrl}
          />
        ) : (
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ background: "rgba(83,216,227,0.2)", color: "#53d8e3" }}>
            {profile.initials}
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold leading-tight" style={{ color: "#dde3ec" }}>
            {profile.name}
          </h4>
          <p className="text-xs mt-0.5" style={{ color: "#bbc9ca" }}>{profile.role}</p>
        </div>
      </div>
      <div className="flex items-center text-xs mb-3" style={{ color: "#bbc9ca" }}>
        <span className="material-symbols-outlined mr-1" style={{ fontSize: "14px" }}>location_on</span>
        {profile.location}
      </div>
      <div className="flex justify-between items-center pt-2.5 border-t border-white/5">
        <span className="text-[11px] font-black uppercase tracking-tighter flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{ color: "#53d8e3", background: "rgba(83,216,227,0.1)" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "13px", fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          VERIFIED
        </span>
      </div>
    </div>
  );
}

const techStack = ["JavaSE", "Java", "JavaScript", "Struts", "Hibernate", "Android SDK", "MySQL", "jQuery", "Bootstrap"];
const keywords = ["SOFTWARE DEVELOPMENT", "DIGITAL PAYMENTS", "RIDE-HAILING", "FINANCIAL TECHNOLOGY", "E-COMMERCE", "SOUTHEAST ASIA", "MARKETPLACE"];

/* ─── Detailed Profile Card ─── */
function DetailedProfileCard() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 z-40 pointer-events-none">
      <div
        className="glass-card w-full max-w-2xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pointer-events-auto scroll-reveal-target overflow-y-auto scale-[0.8]"
        style={{
          transformOrigin: "center center",
          height: "54rem;",
          borderColor: "rgba(83,216,227,0.3)",
          scrollbarWidth: "thin",
          scrollbarColor: "#3c494a #090f15",
        }}
      >
        <div className="p-6 md:p-8">
          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/andrew-sebastian.jpg"
                alt="Andrew Sebastian"
                className="w-24 h-24 rounded-2xl object-cover shadow-2xl"
                style={{ border: "2px solid rgba(83,216,227,0.3)" }}
              />
              <div
                className="absolute -bottom-2 -right-2 rounded-full p-1 flex items-center justify-center"
                style={{
                  background: "#53d8e3",
                  color: "#00363a",
                  border: "4px solid #0e141a",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>

            {/* Identity */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black mb-0.5" style={{ color: "#dde3ec" }}>
                    Andrew Sebastian
                  </h3>
                  <p className="font-medium text-lg leading-tight" style={{ color: "#53d8e3" }}>
                    Senior Back End Engineer @ Goto Group
                  </p>
                  <p
                    className="text-sm mt-1 flex items-center gap-1.5 italic opacity-80"
                    style={{ color: "#bbc9ca" }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                      work_outline
                    </span>
                    Information Technology &amp; Services · Indonesia
                  </p>
                </div>
                {/* LinkedIn */}
                <div className="flex gap-2 self-start sm:self-center">
                  <a
                    href="https://www.linkedin.com/in/andrew-sebastian-7350a686"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg transition-colors"
                    style={{
                      background: "#252b31",
                      border: "1px solid rgba(60,73,74,0.3)",
                      color: "#dde3ec",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#53d8e3")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#dde3ec")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="20"
                      height="20"
                      aria-label="LinkedIn"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter"
                  style={{
                    background: "rgba(83,216,227,0.1)",
                    color: "#53d8e3",
                    border: "1px solid rgba(83,216,227,0.1)",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    location_on
                  </span>
                  Jakarta, Indonesia
                </span>
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter"
                  style={{
                    background: "rgba(51,151,224,0.1)",
                    color: "#3397e0",
                    border: "1px solid rgba(51,151,224,0.1)",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    mail
                  </span>
                  andrew.sebastian@gtl.id
                </span>
              </div>
            </div>
          </div>

          {/* ── Details Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* Personal Intelligence */}
              <div
                className="p-5 rounded-2xl border border-white/5"
                style={{ background: "rgba(22,28,34,0.5)" }}
              >
                <div className="flex items-center gap-2 mb-4" style={{ color: "#53d8e3" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    person
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-widest">
                    Personal Intelligence
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: "#869394" }}
                    >
                      Seniority
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#dde3ec" }}>
                      Senior
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: "#869394" }}
                    >
                      Functional Area
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#dde3ec" }}>
                      Engineering
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div
                className="p-5 rounded-2xl border border-white/5"
                style={{ background: "rgba(22,28,34,0.5)" }}
              >
                <div className="flex items-center gap-2 mb-4" style={{ color: "#3397e0" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    contact_phone
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-widest">Company Contact Details</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: "#869394" }}
                    >
                      Company Phone
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#dde3ec" }}>
                      (021) 2910 1072
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: "#869394" }}
                    >
                      Global HQ Address
                    </p>
                    <p
                      className="text-sm font-medium leading-snug"
                      style={{ color: "#bbc9ca" }}
                    >
                      Jakarta, Jakarta Raya,
                      <br />
                      ID 10110 · Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Company Intelligence */}
            <div>
              <div
                className="p-5 rounded-2xl border border-white/5 h-full"
                style={{ background: "rgba(22,28,34,0.5)" }}
              >
                <div className="flex items-center gap-2 mb-4" style={{ color: "#00afb9" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    business
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-widest">
                    Company Intelligence
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  {[
                    { label: "Firm", value: "Goto Group", highlight: false },
                    { label: "Founded", value: "2021", highlight: false },
                    { label: "Scale", value: "17,000 Employees", highlight: false },
                    { label: "Est. Revenue", value: "$24.3M", highlight: true },
                  ].map((item) => (
                    <div key={item.label}>
                      <p
                        className="text-[9px] uppercase tracking-widest mb-1"
                        style={{ color: "#869394" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: item.highlight ? "#53d8e3" : "#dde3ec" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p
                    className="text-[9px] uppercase tracking-widest mb-2"
                    style={{ color: "#869394" }}
                  >
                    Corporate Profile
                  </p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "#bbc9ca" }}>
                    GoTo is Indonesia&apos;s largest tech group, combining on-demand &amp;
                    financial services through the Gojek and GoTo Financial brands.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom: Tech Stack + Keywords ── */}
          <div className="mt-6 space-y-6">
            {/* Tech Stack */}
            <div
              className="p-5 rounded-2xl border border-white/5"
              style={{ background: "rgba(22,28,34,0.5)" }}
            >
              <div className="flex items-center gap-2 mb-4" style={{ color: "#53d8e3" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  terminal
                </span>
                <h4 className="text-xs font-black uppercase tracking-widest">
                  Tech Stack Signature
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs border"
                    style={{
                      background: "rgba(52,58,65,0.5)",
                      borderColor: "rgba(60,73,74,0.2)",
                      color: t === "Vuejs" ? "#53d8e3" : "#dde3ec",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div
              className="p-5 rounded-2xl border border-white/5"
              style={{ background: "rgba(22,28,34,0.5)" }}
            >
              <div className="flex items-center gap-2 mb-4" style={{ color: "#869394" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  label
                </span>
                <h4 className="text-xs font-black uppercase tracking-widest">Search Keywords</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <span
                    key={k}
                    className="px-2 py-0.5 rounded text-[10px] font-bold border"
                    style={{
                      background: "rgba(83,216,227,0.05)",
                      color: "rgba(83,216,227,0.8)",
                      borderColor: "rgba(83,216,227,0.1)",
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature Bullet ─── */
function FeatureBullet({ icon, title, desc, accent }: {
  icon: string; title: string; desc: string; accent: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl"
      style={{ background: "#161c22", borderLeft: `4px solid ${accent}` }}>
      <span className="material-symbols-outlined" style={{ color: accent }}>{icon}</span>
      <div>
        <p className="text-sm font-bold" style={{ color: "#dde3ec" }}>{title}</p>
        <p className="text-xs" style={{ color: "#bbc9ca" }}>{desc}</p>
      </div>
    </div>
  );
}

export default function LiveDeepSearchSection() {
  return (
    <section id="live-preview" className="sticky-container">
      <div className="sticky-content">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left: Copy */}
          <div className="lg:col-span-4 z-30">
            <h2 className="text-4xl font-bold mb-6" style={{ color: "#53d8e3" }}>
              Live Deep Search
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "#bbc9ca" }}>
              Watch our engine scrape, verify, and enrich data in real-time.
              We don&apos;t just find emails; we build full profiles with over
              30+ data points including tech stacks and company details.
            </p>
            <div className="space-y-4">
              <FeatureBullet
                icon="verified"
                accent="#53d8e3"
                title="99.9% Deliverability"
                desc="Multi-layer SMTP verification"
              />
              <FeatureBullet
                icon="attach_money"
                accent="#3397e0"
                title="Pay what you get"
                desc="No hidden fees. Pay only for the leads you actually pick."
              />
            </div>
          </div>

          {/* Right: Cards panel */}
          <div className="lg:col-span-8">
            <div className="relative min-h-[500px] flex items-center justify-center scale-[1.05] origin-center">

              {/* Search Grid — blurs on scroll */}
              <div className="glass-card rounded-2xl overflow-hidden shadow-2xl scroll-blur-target w-full max-w-xl mx-auto">
                <div className="px-6 py-3 flex items-center justify-between border-b border-white/5"
                  style={{ background: "#2f353c" }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: "rgba(239,68,68,0.5)" }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: "rgba(234,179,8,0.5)" }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: "rgba(34,197,94,0.5)" }} />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-black" style={{ color: "rgba(134,147,148,0.8)" }}>
                    Search Analytics
                  </span>
                </div>
                <div className="p-6 flex items-center justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {profiles.map((p) => <ProfileCard key={p.id} profile={p} />)}
                  </div>
                </div>
              </div>

              {/* Detailed Profile Card — reveals on scroll */}
              <DetailedProfileCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
