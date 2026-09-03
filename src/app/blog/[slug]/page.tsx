import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogArticle from "@/components/blog/BlogArticle";
import RelatedArticles from "@/components/blog/RelatedArticles";
import {
  getBlogs,
  getBlogBySlug,
  getBlogBySlugRaw,
  getRelatedBlogs,
  getSeoSettingsSafe,
} from "@/lib/api/blog";
import { getSiteImageUrl, getSiteUrlString, isValidImageUrl } from "@/lib/site";

/**
 * Pre-render the most recent blog slugs at build time. New posts are still
 * served on-demand via ISR (revalidate: 60 in the service layer), so this is
 * a progressive-enhancement, not a hard constraint.
 */
export async function generateStaticParams() {
  try {
    const blogPosts = await getBlogs();
    return blogPosts.map((post) => ({ slug: post.slug }));
  } catch {
    // If the backend is unreachable at build time, fall back to on-demand
    // rendering instead of failing the whole build.
    return [];
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlugRaw(slug);
  if (!post) {
    return { title: "Not Found | LeadsLemonade Blog" };
  }

  // Prefer backend-provided SEO fields, fall back to title/excerpt so the
  // metadata is always populated.
  const settings = await getSeoSettingsSafe();
  const metaTitle = post.metaTitle || settings?.defaultTitle || `${post.title} | LeadsLemonade Blog`;
  const metaDescription = post.metaDescription || settings?.defaultDescription || post.excerpt || "LeadsLemonade blog article.";
  const articleUrl = getSiteUrlString(`/blog/${post.slug}`);
  const imageUrl = isValidImageUrl(post.coverImage)
    ? post.coverImage
    : isValidImageUrl(settings?.defaultSocialImage)
      ? settings.defaultSocialImage
      : getSiteImageUrl();

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.keywords?.length ? post.keywords : undefined,
    alternates: { canonical: articleUrl },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: articleUrl,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      authors: post.author ? [post.author] : undefined,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    notFound();
  }

  const related = await getRelatedBlogs(slug);
  const rawPost = await getBlogBySlugRaw(slug);
  const articleUrl = getSiteUrlString(`/blog/${post.slug}`);
  const imageUrl = isValidImageUrl(rawPost?.coverImage)
    ? rawPost.coverImage
    : undefined;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: rawPost?.metaTitle || rawPost?.title || post.title,
    description:
      rawPost?.metaDescription || rawPost?.excerpt || "LeadsLemonade blog article.",
    datePublished: rawPost?.publishedAt || undefined,
    dateModified: rawPost?.updatedAt || undefined,
    author: rawPost?.author ? { "@type": "Person", name: rawPost.author } : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <Navbar />
      <main className="py-16">
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
