import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-cyan-900/20 flex flex-col md:flex-row justify-between items-center gap-6"
      style={{ background: "#020c0e" }}>
      {/* Brand */}
      <div className="flex flex-col gap-2 items-center md:items-start">
        <Image
          src="/logo.png"
          alt="LeadsLemonade Logo"
          width={120}
          height={32}
          className="h-8 w-auto object-contain"
        />
        <p className="text-xs font-light text-slate-500 max-w-xs text-center md:text-left">
          © {new Date().getFullYear()} LeadsLemonade Lead Generation Platform. <br></br> All rights reserved.
        </p>
      </div>

      {/* Nav Links */}
      <div className="flex-1 flex justify-center">
        <div className="flex flex-wrap justify-center gap-8 text-xs font-light text-slate-500">
          <Link
            href="/privacy-policy"
            className="hover:text-yellow-400 transition-colors underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-yellow-400 transition-colors underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-400 transition-colors underline-offset-4 hover:underline"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#3c4f50" }}>
          Secured &amp; Processed By
        </p>
        <div className="flex items-center gap-4">
          {/* Let's Encrypt */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            title="SSL secured by Let's Encrypt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.35C16.5 21.15 20 16.25 20 11V5L12 2z" fill="#003A70" stroke="#003A70" strokeWidth="0.5" />
              <path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.35C16.5 21.15 20 16.25 20 11V5L12 2z" fill="#2C8EBB" opacity="0.7" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] font-semibold tracking-tight" style={{ color: "#869394" }}>
              Let&apos;s Encrypt
            </span>
          </div>

          {/* Stripe */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            title="Payments powered by Stripe"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#635BFF">
              <path d="M13.976 9.15c-2.172-.806-3.353-1.472-3.353-2.473 0-.83.695-1.33 1.827-1.33 2.144 0 4.34.87 5.86 1.705l.86-5.278C17.307.89 15.216 0 12.337 0c-2.408 0-4.416.776-5.787 2.13C5.186 3.454 4.5 5.166 4.5 7.139c0 3.937 2.408 5.52 6.271 6.905 2.102.752 2.9 1.444 2.9 2.44 0 1.024-.918 1.61-2.38 1.61-2.017 0-4.588-.863-6.33-2.04l-.875 5.354C5.666 23.01 8.28 24 11.344 24c2.545 0 4.657-.68 6.083-1.975 1.42-1.29 2.19-3.14 2.19-5.348-.005-3.955-2.435-5.686-5.641-6.527z" />
            </svg>
            <span className="text-[10px] font-semibold tracking-tight" style={{ color: "#869394" }}>
              Stripe
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
