import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LiveDeepSearchSection from "@/components/sections/LiveDeepSearchSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import PricingSection from "@/components/sections/PricingSection";
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <LiveDeepSearchSection />
        <FeaturesSection />
        <CalculatorSection />
        <PricingSection />
      </main>
      {/* Ft5 Statement Footer — CTA statement IS the footer */}
      <Footer />
      <Analytics />
    </>
  );
}