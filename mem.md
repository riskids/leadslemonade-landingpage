Project: Lead Lemonade Website

Stack frontend:

* Next.js 16.2.2
* React 19.2.4
* TypeScript
* Tailwind CSS 4
* Geist
* Vercel Analytics

Backend:

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* MySQL XAMPP
* Local API: http://localhost:5001/api
* Development command: `npm run dev`
* Uses `tsx watch src/server.ts`

Project rule:

* Main website is already finished.
* Do not redesign existing pages.
* Do not broadly refactor existing UI.
* Changes should be additive, minimal, and stable.

SEO Blog System status:

* Backend CRUD complete.
* Prisma/MySQL integration complete.
* Idempotent seed complete.
* Categories complete.
* Validation with Zod complete.
* Global error handling complete.
* Public `/blog` connected to backend.
* Public `/blog/[slug]` connected to backend.
* Dashboard Blog list connected to backend.
* Blog Create complete.
* Save Draft complete.
* Publish complete.
* Edit complete.
* Delete complete.
* Dashboard supports DRAFT and PUBLISHED posts.
* Public API exposes only PUBLISHED posts.
* DRAFT articles return 404 through public slug endpoints.
* Dashboard can retrieve Draft articles through ID endpoint.
* Draft publication safety is runtime verified.

Frontend Blog API:

* Service layer exists in `src/lib/api/blog.ts`.
* Supports public listing, article detail, related articles, categories, dashboard listing, create, update, and delete.
* Public listing supports backend pagination, search, and category filtering.
* Search uses 300ms debounce.
* URL state supports `page`, `search`, and `category`.
* Race conditions handled with AbortController/request sequencing.

SEO status:

* `/blog` metadata complete.
* Dynamic `/blog/[slug]` metadata complete.
* Canonical URLs complete.
* Open Graph complete.
* Twitter metadata complete.
* Blog JSON-LD complete.
* BlogPosting JSON-LD complete.
* Sitemap implemented.
* Robots implemented.
* Dashboard has `noindex, nofollow`.
* Drafts are excluded from public rendering, metadata, JSON-LD, and sitemap.
* Production site URL centralized with `NEXT_PUBLIC_SITE_URL`.
* Production fallback: https://leadslemonade.com

Testing:

* Backend Blog API regression tests exist.
* Uses Node built-in `node:test`.
* Test file: `backend/test/blog.api.test.ts`.
* Dedicated MySQL test database: `blog_test`.
* Normal development database: `blog_db`.
* Tests require `TEST_DATABASE_URL`.
* Tests refuse to run against normal development DB.
* Regression suite currently has 7 tests.
* Latest result: 7 passed, 0 failed.
* Test cleanup verified.
* Backend build passes.
* Frontend production build passes.

Current public Blog scalability:

* Backend pagination implemented.
* Backend search implemented.
* Backend category filter implemented.
* `/blog` now uses server API pagination/search/category filtering rather than filtering only loaded posts.
* Featured article remains the first result of the current backend page.
* Minimal Previous/Next pagination is implemented.

Current routes:

* `/blog`
* `/blog/[slug]`
* `/dashboard/blog`
* `/dashboard/blog/create`
* `/dashboard/blog/[id]/edit`
* `/sitemap.xml`
* `/robots.txt`

Remaining non-critical work:

* Dashboard pagination/search scalability.
* Legacy `src/lib/blog-data.ts` type cleanup.
* Lint/tooling cleanup.
* Possible caching/revalidation optimization.
* External production DNS/CDN verification.

Working preference:

* Work incrementally.
* Inspect code before editing.
* Keep AI coding-agent prompts concise but technically strict.
* Verify runtime behavior, not only TypeScript/build.
* Run regression tests after sensitive backend changes.
* Avoid unnecessary dependencies and architectural overengineering.
