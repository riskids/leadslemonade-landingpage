# Revision 3 — Section 1 & Section 2 Rework

## Issue 1: Section 1 (Hero) — move search form to the right
File: `src/components/sections/HeroSection.tsx`

Currently the right column has a "live-search.ai" demo panel with animated search results. Remove that entire panel. Instead put the **search form** (input + Search button) on the right side.

Left column: headline + subtext (unchanged, just remove the search form from here)
Right column: search form only (input + Search button), centered/right-aligned

## Issue 2: Section 2 (Live Deep Search) — full rework
File: `src/components/sections/LiveDeepSearchSection.tsx` + `src/app/globals.css`

### 2a. Move live-search.ai card here
The "live-search.ai" search results demo panel that was in the Hero should be in this section, positioned BEHIND the Andrew Sebastian detail card. On scroll, the search grid blurs out and the detail card reveals on top — this is the original animation from the `main` branch.

### 2b. Full Andrew Sebastian detail data
The current detail card is missing most of the data. Port the FULL detail from the original `main` branch version. The original has:
- **Header**: Avatar with verified badge, name, role ("Senior Back End Engineer @ Goto Group"), industry/location subtitle, LinkedIn link button, location + email tags
- **Personal Intelligence** card: Seniority (Senior), Functional Area (Engineering)
- **Company Contact Details** card: Company Phone ((021) 2910 1072), Global HQ Address (Jakarta, Jakarta Raya, ID 10110 · Indonesia)
- **Company Intelligence** card: Firm (Goto Group), Founded (2021), Scale (17,000 Employees), Est. Revenue ($24.3M), Corporate Profile text
- **Tech Stack Signature** card: JavaSE, Java, JavaScript, Struts, Hibernate, Android SDK, MySQL, jQuery, Bootstrap
- **Search Keywords** card: SOFTWARE DEVELOPMENT, DIGITAL PAYMENTS, RIDE-HAILING, FINANCIAL TECHNOLOGY, E-COMMERCE, SOUTHEAST ASIA, MARKETPLACE

### 2c. Scroll-driven animation
The original uses CSS scroll-driven animations with `view-timeline`. Add these to `globals.css`:

```css
/* Scroll-Driven Animations */
.aurora-sticky-container {
  height: auto;
  view-timeline-name: --scroll-sequence;
}
.aurora-sticky-content {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
  padding: 4rem 0;
}
@media (min-width: 1024px) {
  .aurora-sticky-container { height: 225vh; }
  .aurora-sticky-content {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    padding: 0;
  }
}
.scroll-blur-target {
  animation: blur-sequence linear both;
  animation-timeline: --scroll-sequence;
  animation-range: exit-crossing 35% exit-crossing 45%;
}
.scroll-reveal-target {
  animation: reveal-sequence linear both;
  animation-timeline: --scroll-sequence;
  animation-range: exit-crossing 35% exit-crossing 45%;
}
@keyframes blur-sequence {
  0%   { filter: blur(0px);  opacity: 1;   transform: scale(1); }
  100% { filter: blur(25px); opacity: 0.1; transform: scale(0.9); }
}
@keyframes reveal-sequence {
  0%   { opacity: 0; transform: translateY(100px) scale(0.8) rotateX(15deg); visibility: hidden; }
  1%   { opacity: 0; visibility: visible; }
  100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0deg); }
}
```

Also add `.scroll-blur-target` and `.scroll-reveal-target` to the `prefers-reduced-motion` media query.

### Layout
The section uses a 12-column grid:
- Left (lg:col-span-4): "Live Deep Search" heading + description + feature highlight cards (99.9% Deliverability + Pay what you get)
- Right (lg:col-span-8): relative container with:
  - Search grid card (has class `scroll-blur-target`) — shows 4 profile cards in a 2x2 grid
  - Detailed profile card (has class `scroll-reveal-target`, positioned absolute) — reveals on scroll

### Reference
Read the original `main` branch version with:
```bash
git show main:src/components/sections/LiveDeepSearchSection.tsx
```
This has the exact data, structure, and animation. Adapt it to use Aurora CSS tokens (var(--color-*)) instead of hardcoded hex colors.

## Files to modify:
1. `src/components/sections/HeroSection.tsx` — remove live-search.ai panel, put search form on right
2. `src/components/sections/LiveDeepSearchSection.tsx` — full rework with scroll animation + full detail card
3. `src/app/globals.css` — add scroll-driven animation CSS

## Verification:
1. `npm run build` — must pass
2. `npm run lint` — must pass
3. Git commit: `fix: revision 3 — hero search form, deep search scroll animation + full detail card [REDIGN-001]`
4. Git push to `origin feature/redesign-bananastudio-aurora`