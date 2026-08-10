import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPageClient from "@/components/blog/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | LeadsLemonade",
  description:
    "Insights, strategies, and growth systems for AI automation, lead generation, GTM engineering, and revenue optimization.",
  openGraph: {
    title: "Blog | LeadsLemonade",
    description:
      "Insights, strategies, and growth systems for AI automation, lead generation, and revenue optimization.",
    type: "website",
    url: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogPageClient />
      <Footer />
    </>
  );
}
