export const categories = [
  "AI Automation",
  "Lead Generation",
  "Sales Strategy",
  "GTM Engineering",
  "RevOps",
  "Marketing",
] as const;

export type Category = (typeof categories)[number];

export type ContentBlock = {
  type: "h2" | "h3" | "p";
  text: string;
};

export interface BlogPost {
  title: string;
  slug: string;
  category: Category;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readingTime: string;
  status: "Published" | "Draft";
  seoScore: number;
  updatedAt: string;
  content: ContentBlock[];
}

export const posts: BlogPost[] = [
  {
    title: "How AI Automation Replaces 80% of Repetitive SDR Work",
    slug: "ai-automation-replaces-sdr-work",
    category: "AI Automation",
    excerpt:
      "Discover the workflows top GTM teams use to automate prospecting, enrichment, and follow-ups without losing the human touch.",
    image: "",
    author: "Andrew Sebastian",
    date: "Aug 5, 2026",
    readingTime: "7 min read",
    status: "Published",
    seoScore: 94,
    updatedAt: "2026-08-05",
    content: [
      { type: "h2", text: "The SDR workday is mostly repetition" },
      {
        type: "p",
        text:
          "Researching accounts, writing cold emails, updating CRM fields, and logging calls eat up the majority of an SDR's week. Most of these tasks follow predictable patterns, which makes them ideal candidates for automation.",
      },
      { type: "h2", text: "What AI automation actually changes" },
      { type: "h3", text: "Intent signals first, outbound second" },
      {
        type: "p",
        text:
          "Instead of spraying every company in a target list, AI agents score accounts by intent so outreach lands when buyers are already in motion.",
      },
      { type: "h3", text: "Hands-free enrichment" },
      {
        type: "p",
        text:
          "A single prompt can pull verified emails, mobile numbers, job titles, and recent activity into your CRM in seconds.",
      },
      { type: "h2", text: "Getting started with automation" },
      {
        type: "p",
        text:
          "Start with one workflow: outbound prospecting. Map the trigger, the data you need, and the action you want, then expand from there.",
      },
    ],
  },
  {
    title: "The Lead Generation Playbook for Bootstrapped SaaS",
    slug: "lead-generation-playbook-bootstrapped-saas",
    category: "Lead Generation",
    excerpt:
      "A no-budget framework for finding your first 100 qualified prospects using LinkedIn, job boards, and smart scraping.",
    image: "",
    author: "Maya Chen",
    date: "Aug 2, 2026",
    readingTime: "6 min read",
    status: "Published",
    seoScore: 89,
    updatedAt: "2026-08-02",
    content: [
      { type: "h2", text: "Start with the problem, not the persona" },
      {
        type: "p",
        text:
          "Early-stage teams over-index on ideal customer profiles. A faster path is to find companies that recently started paying for a competing or adjacent tool.",
      },
      { type: "h2", text: "Three free sourcing channels" },
      { type: "h3", text: "LinkedIn job posts" },
      {
        type: "p",
        text:
          "Hiring is a buying signal. A company hiring sales ops probably needs better data. Job descriptions also reveal the tools they use.",
      },
      { type: "h3", text: "Community water coolers" },
      {
        type: "p",
        text:
          "Slack communities, Discord servers, and niche forums contain unfiltered complaints about existing solutions. Those complaints are your lead list.",
      },
      { type: "h2", text: "Convert signal into outreach" },
      {
        type: "p",
        text:
          "Once you have a signal and a point of contact, write one sentence that connects the two. No templates. No fluff.",
      },
    ],
  },
  {
    title: "Sales Strategy: From Demo to Close in 14 Days",
    slug: "sales-strategy-demo-to-close-14-days",
    category: "Sales Strategy",
    excerpt:
      "A tight evaluation plan, clear economic buyer mapping, and one shared mutual-close plan can cut enterprise sales cycles in half.",
    image: "",
    author: "James O'Connor",
    date: "Jul 28, 2026",
    readingTime: "8 min read",
    status: "Published",
    seoScore: 91,
    updatedAt: "2026-07-28",
    content: [
      { type: "h2", text: "Why deals stall" },
      {
        type: "p",
        text:
          "Most deals stall because the next step is vague. Fast deals have a scheduled next step with a named owner and a decision criteria.",
      },
      { type: "h2", text: "The 14-day sprint" },
      { type: "h3", text: "Day 1–3: Discovery and stakeholder map" },
      {
        type: "p",
        text:
          "Run a structured discovery call, identify the economic buyer, the champion, and the blockers, then send a one-page mutual evaluation plan.",
      },
      { type: "h3", text: "Day 4–10: Prove the value" },
      {
        type: "p",
        text:
          "Use a pilot or proof-of-concept tied to a metric the buyer already cares about. The closer your metric is to their board deck, the faster legal and procurement move.",
      },
      { type: "h2", text: "Close with a plan" },
      {
        type: "p",
        text:
          "Replace 'send me the contract' with a mutual-close document that lists every signature, security review, and procurement step with owners and dates.",
      },
    ],
  },
  {
    title: "GTM Engineering: Building Your First Revenue Stack",
    slug: "gtm-engineering-building-revenue-stack",
    category: "GTM Engineering",
    excerpt:
      "How to wire together CRM, enrichment, outreach, and analytics tools so your go-to-market machine runs while you sleep.",
    image: "",
    author: "Sarah Kim",
    date: "Jul 22, 2026",
    readingTime: "9 min read",
    status: "Published",
    seoScore: 87,
    updatedAt: "2026-07-22",
    content: [
      { type: "h2", text: "Stack design is strategy" },
      {
        type: "p",
        text:
          "Every tool choice encodes a hypothesis about how you win customers. A bloated stack slows you down. A lean, wired-together stack creates compounding leverage.",
      },
      { type: "h2", text: "The four layers" },
      { type: "h3", text: "Source of truth" },
      {
        type: "p",
        text:
          "Your CRM should be the single place account, contact, opportunity, and activity data converge. If it is not, nothing downstream can be trusted.",
      },
      { type: "h3", text: "Data layer" },
      {
        type: "p",
        text:
          "Enrichment, intent, and product usage data should flow into the CRM automatically and update records without manual imports.",
      },
      { type: "h2", text: "Measure what matters" },
      {
        type: "p",
        text:
          "Pick one north-star metric per function: pipeline generated, win rate, sales velocity, or net revenue retention. Report it weekly and ignore vanity metrics.",
      },
    ],
  },
  {
    title: "RevOps Metrics Every Executive Should Watch",
    slug: "revops-metrics-every-executive-should-watch",
    category: "RevOps",
    excerpt:
      "Pipeline coverage, sales velocity, and CAC payback tell you more about the health of your business than any top-of-funnel vanity number.",
    image: "",
    author: "Daniel Park",
    date: "Jul 15, 2026",
    readingTime: "6 min read",
    status: "Published",
    seoScore: 92,
    updatedAt: "2026-07-15",
    content: [
      { type: "h2", text: "Metrics are a conversation" },
      {
        type: "p",
        text:
          "The goal of RevOps reporting is not to produce charts. It is to create a shared reality across sales, marketing, and finance so decisions happen faster.",
      },
      { type: "h2", text: "The three buckets" },
      { type: "h3", text: "Efficiency" },
      {
        type: "p",
        text:
          "CAC payback, sales efficiency, and pipeline coverage tell you if you can afford to scale. If payback stretches past 18 months, fix unit economics before adding headcount.",
      },
      { type: "h3", text: "Velocity" },
      {
        type: "p",
        text:
          "Average deal age, stage-to-stage conversion, and time-to-close highlight friction. A single slow stage is usually a process problem, not a people problem.",
      },
      { type: "h2", text: "Forecast accuracy" },
      {
        type: "p",
        text:
          "The best RevOps teams forecast within 10% by weighting pipeline stage, deal age, and rep history. Everything else is a guess dressed up as a dashboard.",
      },
    ],
  },
  {
    title: "Marketing Playbooks That Actually Scale in 2026",
    slug: "marketing-playbooks-that-scale-2026",
    category: "Marketing",
    excerpt:
      "From demand capture to demand creation: the channels, content formats, and measurement models working right now.",
    image: "",
    author: "Emily Ross",
    date: "Jul 8, 2026",
    readingTime: "7 min read",
    status: "Draft",
    seoScore: 76,
    updatedAt: "2026-07-08",
    content: [
      { type: "h2", text: "Demand capture is a commodity" },
      {
        type: "p",
        text:
          "Buying intent keywords and retargeting are table stakes. The winners in 2026 are building demand before buyers ever search for a solution.",
      },
      { type: "h2", text: "Three scalable formats" },
      { type: "h3", text: "Original research" },
      {
        type: "p",
        text:
          "Small surveys of your own customer base produce unique data that no competitor can copy. That data becomes reports, LinkedIn carousels, webinars, and sales collateral.",
      },
      { type: "h3", text: "Founder-led content" },
      {
        type: "p",
        text:
          "People buy from people. A founder writing weekly about real decisions builds trust at a scale that corporate brand accounts cannot match.",
      },
      { type: "h2", text: "Measure pipeline, not impressions" },
      {
        type: "p",
        text:
          "If your marketing report starts with impressions and clicks, flip it. Lead quality, pipeline influenced, and revenue attributed are the only numbers that matter.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}
