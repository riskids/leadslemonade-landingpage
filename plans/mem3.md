# Lead Lemonade Website — Project Memory

## Project Stack

Frontend:

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
* MySQL

Local backend API:

* http://localhost:5001/api

Backend development:

* `npm run dev`

Databases:

* Development: `blog_db`
* Isolated regression test: `blog_test`

Production:

* https://leadslemonade.com

Frontend environment:

* `NEXT_PUBLIC_API_URL`
* `NEXT_PUBLIC_SITE_URL`

---

# Main Project Rules

* Main/public website is already complete and stable.
* Do not redesign or broadly refactor existing public pages.
* Prefer additive, minimal, stable changes.
* Public Blog UI must remain unchanged unless explicitly requested.
* Work incrementally.
* Inspect relevant code before editing.
* Do not scan/refactor the entire repository unnecessarily.
* Keep agent prompts scoped to one task.
* Prefer small sequential tasks over large prompts.
* Keep context usage efficient.
* Use fresh tasks/checkpoints when context becomes large.
* Verify runtime behavior, not only TypeScript.
* Run builds after meaningful changes.
* Use isolated database for destructive/integration tests.
* Never reset/truncate development database for testing.
* Avoid unnecessary dependencies and architectural overengineering.
* Do not work on listed technical debt unless explicitly requested.

---

# PUBLIC WEBSITE

✅ STABLE

Do not modify unless explicitly requested.

---

# PUBLIC BLOG

✅ COMPLETE

Routes:

* `/blog`
* `/blog/[slug]`

Features:

* Connected to backend.
* Backend pagination.
* Backend search.
* Backend category filtering.
* Server-side pagination/search/category filtering.
* Search debounce: 300ms.
* URL state:

  * `page`
  * `search`
  * `category`
* Race conditions handled with AbortController/request sequencing.
* Featured article remains first item of current page.
* Draft posts never exposed publicly.

Public Blog UI should remain unchanged.

---

# BLOG CRUD

✅ COMPLETE

Dashboard:

* Blog list connected to backend.
* Create Blog.
* Save Draft.
* Publish.
* Edit.
* Delete.
* Supports DRAFT and PUBLISHED.
* Dashboard editing uses ID-based endpoint.
* Public article lookup uses published-only slug endpoint.

---

# PUBLICATION SAFETY

✅ COMPLETE

Required invariants:

* Draft article public slug → 404.
* Draft related endpoint → 404.
* Draft metadata not exposed.
* Draft JSON-LD not exposed.
* Draft excluded from public listing.
* Draft excluded from search.
* Draft excluded from category filtering.
* Draft excluded from sitemap.
* Dashboard may retrieve Draft by ID only when authenticated.

Do not weaken these invariants.

---

# SEO

✅ COMPLETE

Includes:

* `/blog` metadata.
* `/blog/[slug]` dynamic metadata.
* Canonical URLs.
* Open Graph.
* Twitter metadata.
* Blog JSON-LD.
* BlogPosting JSON-LD.
* `/sitemap.xml`.
* `/robots.txt`.
* Dashboard `noindex, nofollow`.
* Global site URL centralized.
* Site URL remains controlled by `NEXT_PUBLIC_SITE_URL`.
* Runtime SEO rendering verified.
* Global SEO Settings provide metadata fallbacks.

---

# GLOBAL SEO SETTINGS

✅ COMPLETE

Dashboard route:

* `/dashboard/seo-settings`

Prisma model:

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

* Singleton record.
* Prisma upsert.
* Zod validation.
* Safe defaults.
* Site URL remains environment-controlled.
* Dashboard includes live search-result preview.
* Runtime GET/PUT/persistence verified.

Auth:

* GET remains public for metadata rendering.
* PUT requires authentication.

---

# CATEGORY MANAGEMENT

✅ COMPLETE

Dashboard:

* `/dashboard/categories`

Supports:

* list
* create
* edit
* delete
* post count
* description
* slug
* delete confirmation
* backend error handling

Auth:

* `GET /api/categories` remains public.
* Category POST/PUT/DELETE require authentication.

---

# DASHBOARD

✅ COMPLETE

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

UI:

* Shared navigation.
* Active navigation state.
* Responsive desktop/tablet/mobile layouts.
* Consistent cards.
* Consistent inputs/buttons.
* Improved tables.
* Larger action targets.
* Loading/error/empty states.
* Accessibility improvements.
* Blog Editor SEO grouping.
* Category UI improvements.
* SEO Settings grouping and preview.

Public UI was not modified.

Dashboard considered production-ready for current scope.

---

# ADMIN AUTHENTICATION

✅ COMPLETE

Authentication architecture:

* Express backend is the authentication authority.
* Opaque database-backed sessions.
* Random session token generated on login.
* Raw token exists only in HTTP-only browser cookie.
* Database stores only HMAC-SHA256 token hash.
* Passwords hashed with bcrypt.
* No localStorage/sessionStorage auth tokens.
* No public registration.
* Admin created via CLI.
* Server-side logout invalidates AuthSession.

Prisma:

* `User`
* `AuthSession`
* `UserRole` / ADMIN

Auth endpoints:

* `POST /api/auth/login`
* `POST /api/auth/logout`
* `GET /api/auth/me`

Protected:

* `GET /api/auth/me`
* `POST /api/auth/logout`
* `GET /api/blog/id/:id`
* Blog POST
* Blog PUT
* Blog DELETE
* Category POST
* Category PUT
* Category DELETE
* SEO Settings PUT

Intentionally public:

* `GET /api/health`
* `GET /api/blog`
* `GET /api/blog/:slug`
* `GET /api/blog/:slug/related`
* `GET /api/categories`
* `GET /api/seo-settings`

Frontend:

* `/login`
* Anonymous `/dashboard` redirects to `/login`.
* Successful login redirects to `/dashboard`.
* Shared Dashboard navigation includes Logout.
* Next.js `proxy.ts` is UX-only.
* Express `requireAuth` is the real security boundary.

CSRF protection:

* Authenticated state-changing requests validate trusted Origin.
* Unexpected Origin → 403.
* CORS is not treated as the only CSRF defense.

Local cookie:

* HttpOnly=true
* Secure=false
* SameSite=Lax
* Path=/
* TTL=7 days

Production:

* HTTPS required.
* Secure=true.
* Explicit `CLIENT_ORIGIN`.
* Strong `AUTH_SESSION_SECRET`.
* Same-site deployments normally SameSite=Lax.
* Truly cross-site deployments require SameSite=None + Secure=true.

Admin CLI:

* `npm run admin:create`
* Non-destructive.
* Upsert/idempotent by email.
* Password is bcrypt hashed.
* No default/public registration credentials.

Development admin exists in `blog_db`.
Role:

* ADMIN

Never expose/store the admin password in project memory.

---

# AUTH MIGRATION STATUS

✅ COMPLETE

`blog_db` had an existing Prisma migration baseline mismatch.

`prisma migrate deploy` safely stopped with P3005.

No reset/truncate/drop/recreate was performed.

Auth migration was applied non-destructively using the additive migration SQL and then resolved as applied.

Auth migration added:

* users
* auth_sessions
* unique email constraint
* unique session token hash
* user/session indexes
* AuthSession → User foreign key
* cascade delete

Existing development data was preserved.

Verified after migration:

* Categories: 5
* Blog posts: 4
* SEO settings: 1

Important:
Never use `prisma migrate reset` on `blog_db`.

---

# AUTH RUNTIME VERIFICATION

✅ COMPLETE

Verified:

Anonymous:

* `/dashboard` → `/login`
* `/api/auth/me` → 401

Invalid login:

* 401
* Generic `Invalid email or password`
* No account enumeration.

Valid login:

* 200
* Cookie issued.
* `/api/auth/me` with session → 200.

Protected API without auth:

* `GET /api/blog/id/1` → 401.

CSRF/origin:

* Authenticated mutation from unexpected Origin → 403.

Logout:

* 200.
* Server-side session invalidated.
* Active AuthSession count after logout = 0.
* `/api/auth/me` after logout → 401.

Public API without auth:

* `/api/blog` → 200.
* `/api/categories` → 200.
* `/api/seo-settings` → 200.

Public pages verified:

* `/blog`
* published `/blog/[slug]`

Draft publication safety remains intact.

---

# TESTING

✅ AVAILABLE / PASSING

Backend regression:

* Node built-in `node:test`
* File includes existing Blog API regression tests.
* Auth regression coverage added.
* Uses `blog_test`.
* Requires `TEST_DATABASE_URL`.
* Automatically refuses development DB.
* Never resets/truncates development DB.
* Test records use isolated cleanup.

Latest backend regression result:

* 10 passed
* 0 failed

Coverage includes:

* Valid login.
* Invalid login.
* Unknown email/wrong password generic response.
* `/auth/me` anonymous/authenticated.
* Logout/session invalidation.
* Protected API anonymous/authenticated.
* Unexpected Origin rejection.
* Public Blog unauthenticated access.
* Draft public 404.
* Published public 200.
* DRAFT → PUBLISHED.
* PUBLISHED → DRAFT.
* publishedAt behavior.
* update persistence.
* delete behavior.
* validation/error envelopes.
* category relationship.

Old Blog regression tests were adapted to authenticate through `/api/auth/login`.

Never bypass auth during tests.

---

# BUILD STATUS

✅ PASSING

Backend TypeScript production build:

* Passed.

Frontend Next.js production build:

* Passed.

Latest frontend build:

* Compile passed.
* TypeScript passed.
* Static generation 21/21.
* `/login` included.
* Public/dashboard routes processed successfully.

Previous static generation timeout issue remains fixed.

Shared frontend API reads:

* 10-second timeout.
* Caller AbortSignals preserved.

SEO metadata:

* SEO Settings metadata fetch uses 60-second revalidation.

Blog:

* `/blog` remains ISR ~60 seconds.
* `/blog/[slug]` remains SSG/ISR.

---

# CURRENT PROJECT STATUS

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

Admin Authentication:
✅ Complete

Backend:
✅ Complete for current Blog/Dashboard/Auth scope

Production Builds:
✅ Passing

Regression Tests:
✅ 10 passed / 0 failed

---

# NON-CRITICAL TECHNICAL DEBT

Do not address unless explicitly requested:

* Existing `BlogEditor.tsx` useEffect dependency lint warning.
* Repository-wide ESLint cleanup.
* Legacy `src/lib/blog-data.ts` type/mock cleanup.
* Dashboard pagination/search scalability for larger content volume.
* Caching/on-demand revalidation optimization.
* Easier automation of `TEST_DATABASE_URL`.
* External production DNS/CDN/proxy verification.

---

# FUTURE AUTH FEATURES — NOT CURRENTLY REQUIRED

Do not add unless explicitly requested:

* Public registration.
* OAuth.
* Multi-role/RBAC complexity.
* Forgot password.
* Email verification.
* Refresh-token architecture.
* External auth providers.
* User management system.

Possible next small feature:

* Admin Change Password.

If implemented, keep current authentication architecture intact and make only additive changes.

---

# AGENT WORKING STYLE

User currently uses Anti Gravity for coding work.

When creating Anti Gravity prompts:

* Give enough project context to understand boundaries.
* Keep task focused.
* Tell agent to inspect relevant code first.
* Allow agent to choose implementation details when safe.
* Explicitly prohibit broad refactors.
* Explicitly protect public Blog behavior.
* Require runtime verification.
* Require backend/frontend build after meaningful changes.
* Require `blog_test` for integration/destructive tests.
* Never reset/truncate `blog_db`.
* Ask for concise final report with:

  * files changed
  * architecture
  * migration changes
  * environment variables
  * protected/public endpoints
  * tests
  * runtime verification
  * frontend build
  * backend build
  * remaining deployment notes

Primary development philosophy:
small, additive, secure, tested, and stable changes.
