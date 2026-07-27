# Revision 2 — 6 Issues to Fix

## 1. Logo too small in Navbar & Footer
- Logo is `/logo.png` — 2012×382px (wide, 5.27:1 aspect ratio, NOT square)
- **Navbar**: currently `width={28} height={28}` → change to `width={140} height={26}` (proper aspect ratio, visible)
- **Footer**: currently `width={20} height={20}` → change to `width={120} height={22}`

## 2. Live Deep Search — data points card animation + odd sections
File: `src/components/sections/LiveDeepSearchSection.tsx`
- **Profile card animation**: The card currently just appears with no animation. Wrap the profile card in a div with `className="fade-up-animation"` so it animates in on scroll/load.
- **"99.9% Deliverability" and "Pay what you get" section**: These look odd — just a giant checkmark and dollar sign with text below. Redesign these as proper feature highlight cards:
  - Use card containers with `background: var(--color-paper-2)`, `border`, `borderRadius: var(--radius-card)`, `padding`, `boxShadow: var(--shadow-card)`
  - Replace the giant ✓ and $ symbols with proper icon-style elements (smaller, inside a circle badge)
  - Use tighter typography, proper spacing
  - Make them side-by-side cards, not floating text blocks

## 3. Pricing fixes
File: `src/components/sections/PricingSection.tsx`
- **Font family**: Add `fontFamily: 'var(--font-display)'` to the section heading (h2) and tier names (h3). Price should also use display font.
- **"Most Popular" badge color**: Currently `var(--color-accent-2)` (teal-green) → change to `var(--color-accent)` (cyan) so it matches the design system's primary accent
- **Add short description under each price tag** (between price and features list):
  - Free Sample → "Testing the waters"
  - Micro Squeeze → "Top-up when needed"
  - Fresh Monthly → "Growing startups"
  - Style: `color: var(--color-muted)`, `fontSize: 0.875rem`, `marginTop: 4px, marginBottom: 16px`

## 4. "Ready to taste the freshest leads" — move from footer to its own section
- Create a new component: `src/components/sections/CTASection.tsx`
- Move the "Ready to taste" statement + button from Footer into this CTASection
- CTASection should look like any other section (padding, centered text, CTA button)
- Import CTASection in `src/app/page.tsx` and place it between `PricingSection` and `Footer`

## 5. Footer — widen + restore Stripe/Let's Encrypt badges
File: `src/components/layout/Footer.tsx`
- **Remove** the "Ready to taste" statement (moved to CTASection now)
- **Width**: Change `max-w-4xl` to `max-w-7xl` for desktop
- **Restore Stripe and Let's Encrypt trust badges** — use the exact same SVG badges from the `main` branch footer (code provided below)
- Footer layout should be: Logo + wordmark on left, nav links center, trust badges on right, copyright below
- Use Aurora tokens (not hardcoded hex colors from old footer)

### Stripe + Let's Encrypt badges code (adapt to Aurora tokens):
```tsx
{/* Trust Badges */}
<div className="flex flex-col items-center gap-2">
  <p className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--color-muted)' }}>
    Secured &amp; Processed By
  </p>
  <div className="flex items-center gap-4">
    {/* Let's Encrypt */}
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
      style={{ background: 'var(--color-paper-3)', border: '1px solid var(--color-rule)' }}
      title="SSL secured by Let's Encrypt">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none">
        <path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.35C16.5 21.15 20 16.25 20 11V5L12 2z" fill="#003A70" stroke="#003A70" strokeWidth="0.5" />
        <path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.35C16.5 21.15 20 16.25 20 11V5L12 2z" fill="#2C8EBB" opacity="0.7" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[10px] font-semibold tracking-tight" style={{ color: 'var(--color-muted)' }}>Let&apos;s Encrypt</span>
    </div>
    {/* Stripe */}
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
      style={{ background: 'var(--color-paper-3)', border: '1px solid var(--color-rule)' }}
      title="Payments powered by Stripe">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.353-1.472-3.353-2.473 0-.83.695-1.33 1.827-1.33 2.144 0 4.34.87 5.86 1.705l.86-5.278C17.307.89 15.216 0 12.337 0c-2.408 0-4.416.776-5.787 2.13C5.186 3.454 4.5 5.166 4.5 7.139c0 3.937 2.408 5.52 6.271 6.905 2.102.752 2.9 1.444 2.9 2.44 0 1.024-.918 1.61-2.38 1.61-2.017 0-4.588-.863-6.33-2.04l-.875 5.354C5.666 23.01 8.28 24 11.344 24c2.545 0 4.657-.68 6.083-1.975 1.42-1.29 2.19-3.14 2.19-5.348-.005-3.955-2.435-5.686-5.641-6.527z" />
      </svg>
      <span className="text-[10px] font-semibold tracking-tight" style={{ color: 'var(--color-muted)' }}>Stripe</span>
    </div>
  </div>
</div>
```

## 6. page.tsx update
- Import `CTASection` and place it after `PricingSection`, before `Footer`
- Remove the old statement footer comment

## Files to modify:
1. `src/components/layout/Navbar.tsx` — logo size
2. `src/components/layout/Footer.tsx` — full rewrite (remove statement, widen, add badges)
3. `src/components/sections/LiveDeepSearchSection.tsx` — card animation + feature highlight cards
4. `src/components/sections/PricingSection.tsx` — font, color, descriptions
5. `src/components/sections/CTASection.tsx` — NEW file
6. `src/app/page.tsx` — add CTASection import and placement

## Verification:
1. `npm run build` must pass
2. `npm run lint` must pass
3. Git commit + push to `feature/redesign-bananastudio-aurora`