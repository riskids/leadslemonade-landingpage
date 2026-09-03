Project: Lead Lemonade Website

Project stack:

* Frontend: Next.js 16.2.2, React 19.2.4, TypeScript, Tailwind CSS 4, Geist, Vercel Analytics.
* Backend: Node.js, Express.js, TypeScript, Prisma ORM, MySQL.
* Local backend API: http://localhost:5001/api
* Backend development command: `npm run dev`
* Development database: `blog_db`
* Isolated regression test database: `blog_test`
* Production site origin: https://leadslemonade.com
* Frontend uses `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL`.

Main project rule:

* Main/public website is already complete and stable.
* Do not redesign or broadly refactor existing public pages.
* Prefer additive, minimal, stable changes.
* Public Blog UI should remain unchanged unless explicitly requested.

Lead Lemonade Blog System status:

PUBLIC BLOG — COMPLETE

* `/blog` connected to backend.
* `/blog/[slug]` connected to backend.
* Backend pagination implemented.
* Backend search implemented.
* Backend category filtering implemented.
* `/blog` uses server-side pagination/search/category filtering.
* Search has 300ms debounce.
* URL state supports `page`, `search`, and `category`.
* Race conditions handled with AbortController/request sequencing.
* Featured article remains first item from current page.
* Draft posts are never exposed publicly.

BLOG CRUD — COMPLETE

* Dashboard Blog list connected to backend.
* Create Blog complete.
* Save Draft complete.
* Publish complete.
* Edit complete.
* Delete complete.
* Dashboard supports DRAFT and PUBLISHED posts.
* Blog editing uses ID-based dashboard endpoint.
* Public article lookup uses published-only slug lookup.

PUBLICATION SAFETY — COMPLETE

* Draft article by public slug returns 404.
* Draft related endpoint returns 404.
* Draft metadata is not exposed.
* Draft JSON-LD is not exposed.
* Draft is excluded from public listing/search/category filtering.
* Draft is excluded from sitemap.
* Dashboard can still retrieve Draft articles by ID.

SEO — COMPLETE

* `/blog` SEO metadata complete.
* `/blog/[slug]` dynamic SEO metadata complete.
* Canonical URLs complete.
* Open Graph complete.
* Twitter metadata complete.
* Blog JSON-LD complete.
* BlogPosting JSON-LD complete.
* `/sitemap.xml` complete.
* `/robots.txt` complete.
* Dashboard uses `noindex, nofollow`.
* Global site URL centralized.
* Site URL remains environment-controlled.
* SEO runtime rendering has been verified.
* Global SEO Settings provide safe metadata fallbacks.

GLOBAL SEO SETTINGS — COMPLETE
Dashboard route:

* `/dashboard/seo-settings`

Persistent backend model:

* `SeoSettings`

Fields:

* siteName
* defaultTitle
* defaultDescription
* defaultSocialImage

API:

* `GET /api/seo-settings`
* `PUT /api/seo-settings`

Behavior:

* Singleton settings record.
* Prisma upsert persistence.
* Zod validation.
* Safe defaults.
* Site URL stays controlled by `NEXT_PUBLIC_SITE_URL`.
* SEO Settings dashboard includes live search-result preview.
* Runtime GET/PUT/persistence verified.

CATEGORY MANAGEMENT — COMPLETE
Dashboard route:

* `/dashboard/categories`

Supports:

* category list
* create
* edit
* delete
* post count
* description
* slug
* delete confirmation
* backend error handling

Category CRUD runtime verified.

DASHBOARD — COMPLETE
Routes:

* `/dashboard`
* `/dashboard/blog`
* `/dashboard/blog/create`
* `/dashboard/blog/[id]/edit`
* `/dashboard/categories`
* `/dashboard/seo-settings`

Dashboard Overview uses real backend data:

* Total Posts
* Published Posts
* Draft Posts
* Categories
* Recent Posts

Dashboard UI has been polished:

* consistent shared navigation
* active navigation state
* responsive desktop/tablet/mobile layouts
* consistent cards
* consistent inputs/buttons
* improved tables
* larger action targets
* loading/error/empty states
* accessibility improvements
* Blog Editor SEO section grouping
* Category UI improvements
* SEO Settings grouping and preview
* public UI was not modified

Dashboard is considered production-ready from route/API/build verification.

TESTING — AVAILABLE
Backend Blog API regression tests:

* Node built-in `node:test`
* file: `backend/test/blog.api.test.ts`
* uses isolated `blog_test`
* requires `TEST_DATABASE_URL`
* refuses to use development DB automatically
* does not truncate/reset development data
* cleanup verified

Regression suite has previously passed:

* 7 passed
* 0 failed

Important test invariants include:

* Draft by dashboard ID = 200
* Draft public slug = 404
* Published public slug = 200
* DRAFT → PUBLISHED transition
* PUBLISHED → DRAFT transition
* publishedAt behavior
* update persistence
* delete behavior
* validation/error envelopes
* category relationship

BUILD STATUS

* Backend TypeScript production build passes.
* Frontend Next.js production build passes.
* Static generation timeout issue was fixed.
* Shared frontend API reads now have a 10-second timeout.
* Caller AbortSignals are preserved.
* SEO settings metadata fetch uses 60-second revalidation instead of no-store.
* `/blog` remains ISR with approximately 60-second revalidation.
* `/blog/[slug]` remains SSG/ISR.
* Production build has passed repeatedly after the fix.

CURRENT PROJECT STATUS

Public Website:
✅ Stable

Public Blog:
✅ Complete

Blog CRUD:
✅ Complete

Category CRUD:
✅ Complete

Global SEO Settings:
✅ Complete

Dashboard Overview:
✅ Complete

Dashboard UI Polish:
✅ Complete

SEO:
✅ Complete

Draft Publication Safety:
✅ Complete

Backend:
✅ Complete for current Blog/Dashboard scope

Production Build:
✅ Passing

NON-CRITICAL TECHNICAL DEBT
Do not address unless explicitly requested:

* Existing `BlogEditor.tsx` useEffect dependency lint warning.
* Repository-wide ESLint cleanup.
* Legacy `src/lib/blog-data.ts` type/mock cleanup.
* Dashboard pagination/search scalability when content volume grows.
* Caching/on-demand revalidation optimization.
* Easier automation of `TEST_DATABASE_URL`.
* External production DNS/CDN/proxy verification.

WORKING STYLE FOR THIS PROJECT

* Work incrementally.
* Inspect relevant code before editing.
* Do not scan/refactor the entire repository unnecessarily.
* Keep Cline prompts short and scoped to one task/part.
* Prefer small sequential parts over huge prompts.
* User uses ChatGPT 5.6 Luna with Cline, Ponytail, and Hallmark.
* Keep Cline context usage efficient.
* Avoid unnecessarily consuming the 128K effective Cline context.
* Use fresh tasks/checkpoints when context becomes large.
* Verify runtime behavior, not only TypeScript.
* Run builds after meaningful changes.
* Use isolated database for destructive/integration tests.
* Never reset the development database for tests.
* Avoid unnecessary dependencies and architectural overengineering.
* Public website and public Blog should not be modified unless explicitly requested.
