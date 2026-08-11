import { PrismaClient, PostStatus } from "@prisma/client";
import { slugify, estimateReadingTime } from "../src/utils/slugify";

const prisma = new PrismaClient();

const categories = [
  { name: "AI Automation", slug: "ai-automation", description: "AI-driven outbound and SDR automation." },
  { name: "Lead Generation", slug: "lead-generation", description: "Tactics for building qualified lead pipelines." },
  { name: "GTM Strategy", slug: "gtm-strategy", description: "Go-to-market planning and execution." },
  { name: "RevOps", slug: "revops", description: "Revenue operations, systems, and analytics." },
  { name: "Sales Strategy", slug: "sales-strategy", description: "Closing, qualification, and deal motion." },
];

type ArticleSeed = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  categorySlug: string;
  author: string;
  status: PostStatus;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

const articles: ArticleSeed[] = [
  {
    title: "How AI Automation Replaces 80% of SDR Work",
    slug: "ai-automation-replaces-sdr-work",
    excerpt:
      "Modern GTM teams use AI automation to take over repetitive SDR tasks—research, sequencing, and follow-ups—so reps focus on closing.",
    content: [
      "# How AI Automation Replaces 80% of SDR Work",
      "",
      "Sales development reps spend most of their day on manual research, list-building, and follow-up. AI automation changes the unit economics of outbound.",
      "",
      "## Where AI fits in the SDR workflow",
      "- Account research and enrichment",
      "- Personalized first-touch emails",
      "- Multi-step follow-up sequences",
      "- Reply classification and routing",
      "",
      "## A simple playbook",
      "1. Pull ICP signals into your CRM.",
      "2. Run an enrichment agent to fill gaps.",
      "3. Generate personalized openers per account.",
      "4. Enroll contacts in a 5-step sequence.",
      "",
      "The result: reps spend time on qualified conversations instead of data entry.",
    ].join("\n"),
    coverImage: "https://images.unsplash.com/photo-1677442136019-21767ec04548?w=1200",
    categorySlug: "ai-automation",
    author: "Maya Chen",
    status: PostStatus.PUBLISHED,
    metaTitle: "AI Automation for SDRs | LeadsLemonade",
    metaDescription:
      "How top GTM teams use AI automation to replace repetitive SDR tasks and scale outbound without burning out reps.",
    keywords: ["ai automation", "sdr", "outbound", "lead generation"],
  },
  {
    title: "The Lead Generation Playbook for 2025",
    slug: "lead-generation-playbook-2025",
    excerpt:
      "A practical lead generation framework: ICP definition, channel mix, qualification, and handoff to sales.",
    content: [
      "# The Lead Generation Playbook for 2025",
      "",
      "Lead generation is not about more volume—it's about better fit and faster follow-up.",
      "",
      "## Define your ICP",
      "Start from firmographics, then layer technographics and intent signals.",
      "",
      "## Channel mix",
      "- Outbound (email + LinkedIn)",
      "- Inbound (SEO + content)",
      "- Partner-sourced",
      "",
      "## Qualification",
      "Use BANT or MEDICC, but keep handoff criteria crisp to avoid churn in the pipeline.",
    ].join("\n"),
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    categorySlug: "lead-generation",
    author: "Devon Park",
    status: PostStatus.PUBLISHED,
    metaTitle: "Lead Generation Playbook 2025 | LeadsLemonade",
    metaDescription:
      "A practical lead generation framework covering ICP, channel mix, qualification, and sales handoff for 2025.",
    keywords: ["lead generation", "icp", "outbound", "inbound"],
  },
  {
    title: "GTM Strategy: From Zero to Repeatable Revenue",
    slug: "gtm-strategy-zero-to-repeatable-revenue",
    excerpt:
      "How to design a go-to-market motion that compounds: positioning, pricing, channels, and a repeatable sales process.",
    content: [
      "# GTM Strategy: From Zero to Repeatable Revenue",
      "",
      "A great GTM strategy aligns positioning, pricing, and channels around one ICP.",
      "",
      "## Positioning",
      "Pick a wedge. Win one segment before expanding.",
      "",
      "## Pricing",
      "Price for value, not for cost. Test willingness-to-pay early.",
      "",
      "## Channels",
      "Choose one dominant acquisition channel until you hit $1M ARR, then diversify.",
    ].join("\n"),
    coverImage: "https://images.unsplash.com/photo-1454165184684-1d1b3ebcd6a8?w=1200",
    categorySlug: "gtm-strategy",
    author: "Priya Raman",
    status: PostStatus.PUBLISHED,
    metaTitle: "GTM Strategy Guide | LeadsLemonade",
    metaDescription:
      "Design a go-to-market motion that compounds: positioning, pricing, channels, and a repeatable sales process.",
    keywords: ["gtm strategy", "positioning", "pricing", "revenue"],
  },
  {
    title: "RevOps: Building a Single Source of Truth",
    slug: "revops-single-source-of-truth",
    excerpt:
      "RevOps is the backbone of predictable growth. Here's how to build the data pipeline, attribution, and reporting.",
    content: [
      "# RevOps: Building a Single Source of Truth",
      "",
      "Revenue operations ties marketing, sales, and CS into one data model.",
      "",
      "## Foundations",
      "- Clean CRM data",
      "- Shared definitions for MQL, SQL, and opp stage",
      "- Attribution by source and motion",
      "",
      "## Reporting",
      "Build dashboards for pipeline coverage, win rate, and CAC payback—not vanity metrics.",
    ].join("\n"),
    coverImage: "https://images.unsplash.com/photo-1551288252-9564541b8a9c?w=1200",
    categorySlug: "revops",
    author: "Marcus Lee",
    status: PostStatus.PUBLISHED,
    metaTitle: "RevOps Single Source of Truth | LeadsLemonade",
    metaDescription:
      "How to build RevOps foundations: clean CRM data, shared definitions, attribution, and reporting for predictable growth.",
    keywords: ["revops", "crm", "attribution", "reporting"],
  },
  {
    title: "Sales Strategy: Qualify Faster, Close Better",
    slug: "sales-strategy-qualify-faster-close-better",
    excerpt:
      "A crisp qualification framework helps reps spend time on deals that will actually close. Here's the checklist.",
    content: [
      "# Sales Strategy: Qualify Faster, Close Better",
      "",
      "Most pipeline bloat comes from poor qualification. Tighten the top of the funnel.",
      "",
      "## Qualification checklist",
      "- Problem stated by the buyer",
      "- Budget owner identified",
      "- Decision timeline agreed",
      "- Why now, not why us",
      "",
      "## Closing motion",
      "Mutual action plan, not a surprise close. Align on next steps after every call.",
    ].join("\n"),
    coverImage: "https://images.unsplash.com/photo-1521791135412-1c2f6a2b3f3a?w=1200",
    categorySlug: "sales-strategy",
    author: "Sofia Alvarez",
    status: PostStatus.PUBLISHED,
    metaTitle: "Sales Strategy: Qualify & Close | LeadsLemonade",
    metaDescription:
      "A crisp qualification framework helps reps spend time on deals that close. Checklists for qualification and closing.",
    keywords: ["sales strategy", "qualification", "closing", "pipeline"],
  },
];

async function main() {
  console.log("Seeding database...");

  // Insert categories (idempotent by slug)
  const categoryMap = new Map<string, number>();
  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    categoryMap.set(cat.slug, record.id);
    console.log(`  category: ${record.name} (id=${record.id})`);
  }

  // Insert articles (idempotent by slug)
  for (const a of articles) {
    const categoryId = categoryMap.get(a.categorySlug);
    if (!categoryId) {
      throw new Error(`Missing category for slug "${a.categorySlug}"`);
    }
    const readingTime = estimateReadingTime(a.content);
    const publishedAt = a.status === PostStatus.PUBLISHED ? new Date() : null;

    await prisma.blogPost.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        coverImage: a.coverImage ?? null,
        categoryId,
        author: a.author,
        status: a.status,
        metaTitle: a.metaTitle,
        metaDescription: a.metaDescription,
        keywords: a.keywords,
        readingTime,
        publishedAt,
      },
      create: {
        title: a.title,
        slug: slugify(a.slug) || a.slug,
        excerpt: a.excerpt,
        content: a.content,
        coverImage: a.coverImage ?? null,
        categoryId,
        author: a.author,
        status: a.status,
        metaTitle: a.metaTitle,
        metaDescription: a.metaDescription,
        keywords: a.keywords,
        readingTime,
        publishedAt,
      },
    });
    console.log(`  article: ${a.title}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
