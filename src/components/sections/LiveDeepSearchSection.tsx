"use client";

/* ─── Profile data for search grid ─── */
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

/* ─── Profile Card (used in 2×2 search grid) ─── */
function ProfileCard({ profile }: { profile: typeof profiles[0] }) {
  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: "color-mix(in oklch, var(--color-paper-2) 40%, transparent)",
        border: "1px solid color-mix(in oklch, var(--color-accent) 10%, transparent)",
        backdropFilter: "blur(12px)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        {profile.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={profile.name}
            className="w-11 h-11 rounded-full object-cover shrink-0"
            src={profile.imgUrl}
          />
        ) : (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              background: "color-mix(in oklch, var(--color-accent) 20%, transparent)",
              color: "var(--color-accent)",
            }}
          >
            {profile.initials}
          </div>
        )}
        <div>
          <h4
            className="text-sm font-bold leading-tight"
            style={{ color: "var(--color-ink)" }}
          >
            {profile.name}
          </h4>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--color-muted)" }}
          >
            {profile.role}
          </p>
        </div>
      </div>
      <div
        className="flex items-center text-xs mb-3"
        style={{ color: "var(--color-muted)" }}
      >
        <span
          className="material-symbols-outlined mr-1"
          style={{ fontSize: "14px" }}
        >
          location_on
        </span>
        {profile.location}
      </div>
      <div
        className="flex justify-between items-center pt-2.5"
        style={{ borderTop: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)" }}
      >
        <span
          className="text-[11px] font-black uppercase tracking-tighter flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{
            color: "var(--color-accent)",
            background: "color-mix(in oklch, var(--color-accent) 10%, transparent)",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "13px", fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          VERIFIED
        </span>
      </div>
    </div>
  );
}

/* ─── Tech stack + keywords data ─── */
const techStack = [
  "JavaSE", "Java", "JavaScript", "Struts", "Hibernate",
  "Android SDK", "MySQL", "jQuery", "Bootstrap",
];

const keywords = [
  "SOFTWARE DEVELOPMENT", "DIGITAL PAYMENTS", "RIDE-HAILING",
  "FINANCIAL TECHNOLOGY", "E-COMMERCE", "SOUTHEAST ASIA", "MARKETPLACE",
];

/* ─── Detailed Profile Card (reveals on scroll) ─── */
function DetailedProfileCard() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none sm:p-4">
      <div
        className="w-[calc(100vw-2rem)] sm:w-full max-w-2xl rounded-2xl sm:rounded-[2.5rem] overflow-hidden flex flex-col pointer-events-auto scroll-reveal-target overflow-y-auto scale-100 lg:scale-[0.8] max-h-full lg:max-h-[54rem]"
        style={{
          transformOrigin: "center center",
          height: "100%",
          minHeight: "100%",
          background: "var(--color-paper-2)",
          border: "1px solid color-mix(in oklch, var(--color-accent) 30%, transparent)",
          boxShadow: "0 50px 100px -20px oklch(0% 0 0 / 0.8)",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-rule-2) var(--color-paper)",
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
                style={{
                  border: "2px solid color-mix(in oklch, var(--color-accent) 30%, transparent)",
                }}
              />
              <div
                className="absolute -bottom-2 -right-2 rounded-full p-1 flex items-center justify-center"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-accent-ink)",
                  border: "4px solid var(--color-paper-2)",
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
                  <h3
                    className="text-3xl font-black mb-0.5"
                    style={{ color: "var(--color-ink)" }}
                  >
                    Andrew Sebastian
                  </h3>
                  <p
                    className="font-medium text-lg leading-tight"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Senior Back End Engineer @ Goto Group
                  </p>
                  <p
                    className="text-sm mt-1 flex items-center gap-1.5 italic opacity-80"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "14px" }}
                    >
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
                      background: "var(--color-paper-3)",
                      border: "1px solid color-mix(in oklch, var(--color-rule) 30%, transparent)",
                      color: "var(--color-ink)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-ink)")
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
                    background: "color-mix(in oklch, var(--color-accent) 10%, transparent)",
                    color: "var(--color-accent)",
                    border: "1px solid color-mix(in oklch, var(--color-accent) 10%, transparent)",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "14px" }}
                  >
                    location_on
                  </span>
                  Jakarta, Indonesia
                </span>
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter"
                  style={{
                    background: "color-mix(in oklch, var(--color-accent-2) 10%, transparent)",
                    color: "var(--color-accent-2)",
                    border: "1px solid color-mix(in oklch, var(--color-accent-2) 10%, transparent)",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "14px" }}
                  >
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
                className="p-5 rounded-2xl"
                style={{
                  background: "color-mix(in oklch, var(--color-paper-2) 50%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
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
                      style={{ color: "var(--color-muted)" }}
                    >
                      Seniority
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-ink)" }}
                    >
                      Senior
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Functional Area
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-ink)" }}
                    >
                      Engineering
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "color-mix(in oklch, var(--color-paper-2) 50%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{ color: "var(--color-accent-2)" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    contact_phone
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-widest">
                    Company Contact Details
                  </h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Company Phone
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-ink)" }}
                    >
                      (021) 2910 1072
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Global HQ Address
                    </p>
                    <p
                      className="text-sm font-medium leading-snug"
                      style={{ color: "var(--color-muted)" }}
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
                className="p-5 rounded-2xl h-full"
                style={{
                  background: "color-mix(in oklch, var(--color-paper-2) 50%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
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
                        style={{ color: "var(--color-muted)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          color: item.highlight ? "var(--color-accent)" : "var(--color-ink)",
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-4 pt-4"
                  style={{
                    borderTop: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
                  }}
                >
                  <p
                    className="text-[9px] uppercase tracking-widest mb-2"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Corporate Profile
                  </p>
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
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
              className="p-5 rounded-2xl"
              style={{
                background: "color-mix(in oklch, var(--color-paper-2) 50%, transparent)",
                border: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
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
                    className="px-3 py-1 rounded-lg text-xs"
                    style={{
                      background: "color-mix(in oklch, var(--color-paper-3) 50%, transparent)",
                      border: "1px solid color-mix(in oklch, var(--color-rule) 20%, transparent)",
                      color: "var(--color-ink)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "color-mix(in oklch, var(--color-paper-2) 50%, transparent)",
                border: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-4"
                style={{ color: "var(--color-muted)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  label
                </span>
                <h4 className="text-xs font-black uppercase tracking-widest">
                  Search Keywords
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <span
                    key={k}
                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{
                      background: "color-mix(in oklch, var(--color-accent) 5%, transparent)",
                      color: "color-mix(in oklch, var(--color-accent) 80%, transparent)",
                      border: "1px solid color-mix(in oklch, var(--color-accent) 10%, transparent)",
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

/* ─── Feature Bullet (left column highlights) ─── */
function FeatureBullet({
  icon,
  title,
  desc,
  accent,
}: {
  icon: string;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{
        background: "var(--color-paper-2)",
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ color: accent }}
      >
        {icon}
      </span>
      <div>
        <p
          className="text-sm font-bold"
          style={{ color: "var(--color-ink)" }}
        >
          {title}
        </p>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function LiveDeepSearchSection() {
  return (
    <section id="live-deep-search" className="aurora-sticky-container">
      <div className="aurora-sticky-content">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left: Copy + feature highlights */}
          <div className="lg:col-span-4 z-30">
            <h2
              className="font-bold tracking-tighter mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--color-accent)",
                fontFamily: "var(--font-display)",
              }}
            >
              Live Deep Search
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Watch our engine scrape, verify, and enrich data in real-time.
              We don&apos;t just find emails; we build full profiles with over
              30+ data points including tech stacks and company details.
            </p>
            <div className="space-y-4">
              <FeatureBullet
                icon="verified"
                accent="var(--color-accent)"
                title="99.9% Deliverability"
                desc="Multi-layer SMTP verification"
              />
              <FeatureBullet
                icon="attach_money"
                accent="var(--color-accent-2)"
                title="Pay what you get"
                desc="No hidden fees. Pay only for the leads you actually pick."
              />
            </div>
          </div>

          {/* Right: Cards panel with scroll animation */}
          <div className="lg:col-span-8">
            <div className="relative h-[85vh] lg:h-auto lg:min-h-[500px] flex flex-col items-center justify-center scale-100 lg:scale-[1.05] origin-center">
              {/* Search Grid — blurs on scroll */}
              <div
                className="scroll-blur-target rounded-2xl overflow-hidden shadow-2xl w-full max-w-xl mx-auto"
                style={{
                  background: "var(--color-paper-2)",
                  border: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
                }}
              >
                <div
                  className="px-6 py-3 flex items-center justify-between"
                  style={{
                    borderBottom: "1px solid color-mix(in oklch, var(--color-ink) 5%, transparent)",
                    background: "var(--color-paper-3)",
                  }}
                >
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "rgba(239,68,68,0.5)" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "rgba(234,179,8,0.5)" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "rgba(34,197,94,0.5)" }}
                    />
                  </div>
                  <span
                    className="text-[8px] uppercase tracking-[0.2em] font-black"
                    style={{
                      color: "color-mix(in oklch, var(--color-muted) 80%, transparent)",
                    }}
                  >
                    Search Analytics
                  </span>
                </div>
                <div className="p-6 flex items-center justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {profiles.map((p) => (
                      <ProfileCard key={p.id} profile={p} />
                    ))}
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