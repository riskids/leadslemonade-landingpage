# LeadsLemonade Blog Backend

A simple, production-ready SEO Blog backend API built with **Node.js + Express + TypeScript + Prisma + MySQL**.

This service provides the data layer for the existing LeadsLemonade Next.js blog UI (public blog listing, blog detail page, blog dashboard, and blog editor).

> Scope: backend only. No authentication, user system, file storage, payment, email, CMS, AI, or permissions.

---

## Tech Stack

| Layer        | Choice                            |
| ------------ | --------------------------------- |
| Runtime      | Node.js                           |
| Language     | TypeScript                        |
| Framework    | Express.js                        |
| ORM          | Prisma                            |
| Database     | MySQL                             |
| Validation   | Zod                               |
| Security     | helmet, cors, express-rate-limit  |
| Logging      | morgan                            |

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Prisma schema (MySQL, BlogPost + Category)
│   └── seed.ts                # Seed: 5 categories + 5 articles
├── src/
│   ├── config/
│   │   ├── env.ts             # Typed env config
│   │   └── prisma.ts          # Shared PrismaClient
│   ├── controllers/
│   │   ├── blogPost.controller.ts
│   │   └── category.controller.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts    # Global error handler
│   │   ├── notFound.ts        # 404 handler
│   │   ├── rateLimiter.ts     # Rate limiters
│   │   └── validate.ts        # Zod validation middleware
│   ├── routes/
│   │   ├── blog.routes.ts
│   │   ├── category.routes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── blogPost.service.ts
│   │   └── category.service.ts
│   ├── utils/
│   │   ├── ApiError.ts
│   │   ├── asyncHandler.ts
│   │   ├── dto.ts             # Response shaping
│   │   ├── response.ts        # Envelope helpers
│   │   └── slugify.ts
│   ├── validators/
│   │   ├── blogPost.validator.ts
│   │   └── category.validator.ts
│   ├── app.ts                 # Express app factory
│   └── server.ts              # HTTP server entrypoint
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Installation

```bash
cd backend
npm install
```

---

## Environment Setup

Copy the example env file and edit values for your local MySQL:

```bash
cp .env.example .env
```

`.env`:

```env
DATABASE_URL="mysql://root:password@localhost:3306/blog_db"
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN="http://localhost:3000"
AUTH_SESSION_SECRET="change-this-to-a-random-secret"
AUTH_COOKIE_NAME="leadslemonade_admin_session"
AUTH_SESSION_TTL_DAYS=7
AUTH_COOKIE_SAME_SITE="lax"
```

- `DATABASE_URL` — MySQL connection string.
- `PORT` — HTTP port (default 5000).
- `CLIENT_ORIGIN` — comma-separated trusted frontend origins. Do not use `*` in production.
- `AUTH_SESSION_SECRET` — HMAC secret; production requires at least 32 characters.
- `AUTH_COOKIE_SAME_SITE` — `lax`, `strict`, or `none`. `none` requires production HTTPS.
- `NODE_ENV` — `development` | `production`.

### Authentication deployment

The dashboard uses an opaque database-backed session in an HTTP-only cookie. The raw token is never stored or logged; only its HMAC representation is stored in `auth_sessions`.

- Local frontend `http://localhost:3000` and API `http://localhost:5001` use `SameSite=Lax`, `Secure=false`.
- Production same-site frontend/API deployments use `Secure=true` with `SameSite=Lax` (or `Strict` if the deployment supports it).
- A truly cross-site frontend/API deployment must use `SameSite=None`, `Secure=true`, HTTPS on both origins, and explicit `CLIENT_ORIGIN`.
- State-changing authenticated requests reject an unexpected `Origin`; CORS is not the only protection.
- Run `ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run admin:create` to create/update one admin non-destructively. Passwords are never committed.

---

## MySQL Setup

1. Install MySQL 8 (locally or via Docker).
2. Create the database (Prisma does **not** create the database itself):

```sql
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;
```

Update `DATABASE_URL` to match the user you just created.

### Quick MySQL via Docker

```bash
docker run --name leadlemon-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=blog_db \
  -p 3306:3306 \
  -d mysql:8
```

---

## Prisma Migration

Generate the Prisma client and create the initial migration (creates tables):

```bash
npm run prisma:generate
npm run prisma:migrate
```

`prisma:migrate` runs `prisma migrate dev --name init`. For production, use `npm run prisma:deploy` (`prisma migrate deploy`).

Inspect data visually:

```bash
npm run prisma:studio
```

---

## Seed Database

Inserts 5 categories and 5 sample published articles (idempotent via `upsert`):

```bash
npm run seed
```

Seed categories:

- AI Automation
- Lead Generation
- GTM Strategy
- RevOps
- Sales Strategy

---

## Run Development Server

```bash
npm run dev
```

Server runs at `http://localhost:5000`. Health check:

```bash
curl http://localhost:5000/api/health
```

### Build & Run (production)

```bash
npm run build
npm start
```

---

## API Documentation

Base URL: `http://localhost:5000/api`

### Response Envelope

**Success**

```json
{ "success": true, "data": { ... } }
```

**Error**

```json
{ "success": false, "message": "...", "errors": ["field: reason"] }
```

### Blog Endpoints

#### `GET /api/blog`

List published blog posts with pagination, search, and category filter.

**Query params**

| Param      | Type   | Default    | Description                       |
| ---------- | ------ | ---------- | --------------------------------- |
| `page`     | int    | 1          | Page number                       |
| `pageSize` | int    | 10         | Items per page (max 100)          |
| `search`   | string | —          | Search in title/excerpt/content   |
| `category` | string | —          | Filter by category **slug**       |
| `status`   | enum   | PUBLISHED  | `DRAFT` or `PUBLISHED`            |

**Example**

```bash
curl "http://localhost:5000/api/blog?page=1&pageSize=5&search=ai&category=ai-automation"
```

**Response**

```json
{
  "success": true,
  "data": {
    "items": [ { "id": 1, "title": "...", "slug": "...", ... } ],
    "total": 1,
    "page": 1,
    "pageSize": 5,
    "totalPages": 1
  }
}
```

#### `GET /api/blog/:slug`

Get a single published article by slug.

```bash
curl http://localhost:5000/api/blog/ai-automation-replaces-sdr-work
```

#### `GET /api/blog/:slug/related`

Get up to 3 related published articles in the same category.

#### `POST /api/blog`

Create a blog post.

```bash
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Article",
    "slug": "new-article",
    "excerpt": "Short summary",
    "content": "Full body...",
    "categoryId": 1,
    "author": "Maya Chen",
    "status": "PUBLISHED",
    "metaTitle": "New Article | LeadsLemonade",
    "metaDescription": "SEO meta description under 160 chars.",
    "keywords": ["seo", "blog"]
  }'
```

#### `PUT /api/blog/:id`

Update a blog post. All fields are optional (partial update).

```bash
curl -X PUT http://localhost:5000/api/blog/1 \
  -H "Content-Type: application/json" \
  -d '{ "title": "Updated Title", "status": "DRAFT" }'
```

#### `DELETE /api/blog/:id`

Delete a blog post.

```bash
curl -X DELETE http://localhost:5000/api/blog/1
```

### Category Endpoints

#### `GET /api/categories`

List all categories with post counts.

#### `POST /api/categories`

---

## Validation Rules (Zod)

**Blog post (create)**

| Field             | Rule                                              |
| ----------------- | ------------------------------------------------- |
| `title`           | required, max 255                                 |
| `slug`            | required, unique, lowercase, URL-friendly regex   |
| `excerpt`         | required, max 1000                                |
| `content`         | required                                          |
| `categoryId`      | required, positive integer                        |
| `author`          | required, max 120                                 |
| `status`          | `DRAFT` \| `PUBLISHED` (default `DRAFT`)          |
| `metaTitle`       | max 60 chars                                      |
| `metaDescription` | max 160 chars                                     |
| `keywords`        | array of strings (default `[]`)                   |
| `coverImage`      | optional, valid URL                               |

**Category**

| Field         | Rule                          |
| ------------- | ----------------------------- |
| `name`        | required, max 120             |
| `slug`        | required, unique, URL-friendly |
| `description` | optional, max 2000            |

Slug regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$` — lowercase, hyphen-separated.

---

## SEO Response Shape

Every blog response includes the SEO fields required by the spec:

```json
{
  "success": true,
  "data": {
    "title": "How AI Automation Replaces 80% of SDR Work",
    "slug": "ai-automation-replaces-sdr-work",
    "excerpt": "...",
    "content": "...",
    "metaTitle": "AI Automation for SDRs | LeadsLemonade",
    "metaDescription": "...",
    "keywords": ["ai automation", "sdr"],
    "coverImage": "https://...",
    "publishedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

The full DTO also returns `id`, `categoryId`, `category`, `author`, `status`, `readingTime`, `createdAt`, and `updatedAt` for dashboard use.

---

## Security

- `helmet` — sets secure HTTP headers.
- `cors` — restricts origins to `CLIENT_ORIGIN`.
- `express-rate-limit` — 100 req/15min globally, 50 req/15min on write endpoints.
- Global error handler never leaks stack traces in production.

---

## NPM Scripts

| Script                    | Description                          |
| ------------------------- | ------------------------------------ |
| `npm run dev`             | Start dev server with hot reload     |
| `npm run build`           | Compile TypeScript to `dist/`        |
| `npm start`               | Run compiled server                  |
| `npm run lint`            | Run ESLint                           |
| `npm run prisma:generate` | Generate Prisma Client               |
| `npm run prisma:migrate`  | Create dev migration                 |
| `npm run prisma:deploy`   | Apply migrations in production       |
| `npm run prisma:studio`   | Open Prisma Studio                   |
| `npm run seed`            | Seed categories + sample articles    |

---

## Connecting the Frontend

The existing Next.js frontend reads from `src/lib/blog-data.ts` (static mock data). To connect it to this backend later, replace the static data fetches with `fetch("http://localhost:5000/api/blog")` calls. The backend response envelope (`{ success, data }`) and DTO shapes are designed to map directly to the frontend's `BlogPost` type with minimal adaptation.

---

## License

Private. LeadsLemonade.


```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{ "name": "Marketing", "slug": "marketing", "description": "..." }'
```

#### `PUT /api/categories/:id`

```bash
curl -X PUT http://localhost:5000/api/categories/1 \
  -H "Content-Type: application/json" \
  -d '{ "name": "Renamed Category" }'
```

#### `DELETE /api/categories/:id`

Deleting a category still referenced by posts returns `400 Bad Request`.

```bash
curl -X DELETE http://localhost:5000/api/categories/1
```

