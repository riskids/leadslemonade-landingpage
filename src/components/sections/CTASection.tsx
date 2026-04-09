import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 px-8">
      <div
        className="max-w-5xl mx-auto p-1 rounded-[3rem] border"
        style={{
          background: "linear-gradient(135deg, rgba(83,216,227,0.1), transparent)",
          borderColor: "rgba(83,216,227,0.2)",
        }}
      >
        <div
          className="p-12 md:p-20 rounded-[2.8rem] text-center"
          style={{ background: "#1a2027" }}
        >
          <h2
            className="text-4xl md:text-5xl font-black mb-6"
            style={{ color: "#dde3ec" }}
          >
            Ready to taste the freshest leads on the market?
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
            style={{ color: "#bbc9ca" }}
          >
            Growth your teams using LeadsLemonade for
            high-quality prospecting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/maintenance"
              id="cta-try-free-btn"
              className="block flex-1 sm:flex-none w-full sm:w-auto px-12 py-5 font-black rounded-2xl text-lg active:scale-95 transition-all text-center"
              style={{
                background: "#53d8e3",
                color: "#00363a",
                boxShadow: "0 8px 40px rgba(83,216,227,0.3)",
              }}
            >
              Try for Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
