import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getRelatedPosts } from "@/lib/blog-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogArticle from "@/components/blog/BlogArticle";
import RelatedArticles from "@/components/blog/RelatedArticles";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Not Found | LeadsLemonade Blog" };
  }
  return {
    title: `${post.title} | LeadsLemonade Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }
  const related = getRelatedPosts(post);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <BlogArticle post={post} />
          <div className="lg:sticky lg:top-32 space-y-8">
            <RelatedArticles posts={related} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
