import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { getSiteUrlString } from "@/lib/site";
import { getSeoSettingsSafe } from "@/lib/api/blog";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSeoSettingsSafe();
  const title = settings?.defaultTitle || "Blog | LeadsLemonade";
  const description = settings?.defaultDescription || "Insights, strategies, and growth systems for AI automation, lead generation, GTM engineering, and revenue optimization.";
  return {
  title,
  description,
  alternates: { canonical: getSiteUrlString("/blog") },
  openGraph: {
    title,
    description,
    type: "website",
    url: getSiteUrlString("/blog"),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  };
}

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "LeadsLemonade Blog",
  description: "Insights, strategies, and growth systems for AI automation, lead generation, GTM engineering, and revenue optimization.",
  url: getSiteUrlString("/blog"),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <Navbar />
      <Suspense fallback={null}>
        <BlogPageClient />
      </Suspense>
      <Footer />
    </>
  );
}
