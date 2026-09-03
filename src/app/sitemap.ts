import type { MetadataRoute } from "next";
import { getPublishedBlogsForSitemap } from "@/lib/api/blog";
import { getSiteUrlString } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: getSiteUrlString("/"), changeFrequency: "weekly", priority: 1 },
    { url: getSiteUrlString("/blog"), changeFrequency: "daily", priority: 0.8 },
    { url: getSiteUrlString("/contact"), changeFrequency: "monthly", priority: 0.5 },
    { url: getSiteUrlString("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: getSiteUrlString("/terms-of-service"), changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const posts = await getPublishedBlogsForSitemap();
    return [
      ...staticPages,
      ...posts.map((post) => ({
        url: getSiteUrlString(`/blog/${post.slug}`),
        lastModified: post.updatedAt || post.publishedAt || undefined,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return staticPages;
  }
}