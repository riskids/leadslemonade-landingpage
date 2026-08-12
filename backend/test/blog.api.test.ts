import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import type { AddressInfo } from "node:net";
import { createApp } from "../src/app";
import { prisma } from "../src/config/prisma";

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl) {
  throw new Error(
    "TEST_DATABASE_URL is required. Refusing to run API tests against the development database."
  );
}

type JsonObject = Record<string, any>;

const prefix = `api-regression-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const categorySlug = `${prefix}-category`;
const adminEmail = `${prefix}@example.test`;
let baseUrl = "";
let sessionCookie = "";
let server: ReturnType<ReturnType<typeof createApp>["listen"]>;
let categoryId: number;
const postIds: number[] = [];

async function request(path: string, init: RequestInit = {}): Promise<{ status: number; body: JsonObject; setCookie?: string }> {
  const headers = new Headers(init.headers);
  if (sessionCookie) headers.set("cookie", sessionCookie);
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers });
  return { status: response.status, body: (await response.json()) as JsonObject, setCookie: response.headers.get("set-cookie") ?? undefined };
}

function loginHeadersCookie(response: { setCookie?: string }): string {
  assert.ok(response.setCookie);
  return response.setCookie!.split(";")[0];
}

function jsonInit(method: string, body: JsonObject): RequestInit {
  return {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}

function postData(slug: string, status: "DRAFT" | "PUBLISHED" = "DRAFT") {
  return {
    title: `${prefix} title`,
    slug,
    excerpt: `${prefix} excerpt`,
    content: `${prefix} content with enough text for the API regression test`,
    categoryId,
    author: "API Regression Test",
    status,
    metaTitle: `${prefix} meta title`,
    metaDescription: `${prefix} meta description`,
    keywords: [`${prefix}-keyword`, "regression"],
  };
}

function data(response: { status: number; body: JsonObject }): JsonObject {
  assert.equal(response.body.success, true);
  return response.body.data as JsonObject;
}

before(async () => {
  await prisma.user.create({ data: { email: adminEmail, passwordHash: await bcrypt.hash("RegressionPassword!123", 4), role: "ADMIN" } });
  categoryId = (await prisma.category.create({ data: { name: `${prefix} category`, slug: categorySlug, description: "Created and removed by the blog API regression suite" } })).id;
  await new Promise<void>((resolve) => {
    server = createApp().listen(0, () => { const address = server.address() as AddressInfo; baseUrl = `http://127.0.0.1:${address.port}`; resolve(); });
  });
  const login = await request("/api/auth/login", jsonInit("POST", { email: adminEmail, password: "RegressionPassword!123" }));
  assert.equal(login.status, 200);
  sessionCookie = loginHeadersCookie(login);
});

after(async () => {
  if (server) await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  await prisma.blogPost.deleteMany({ where: { slug: { startsWith: prefix } } });
  if (categoryId) await prisma.category.delete({ where: { id: categoryId } });
  await prisma.authSession.deleteMany({ where: { user: { email: adminEmail } } });
  await prisma.user.deleteMany({ where: { email: adminEmail } });
  await prisma.$disconnect();
});

test("health endpoint responds successfully", async () => {
  const response = await request("/api/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.status, "ok");
});

test("drafts remain dashboard-visible but publicly hidden", async () => {
  const slug = `${prefix}-draft`;
  const created = await request("/api/blog", jsonInit("POST", postData(slug)));
  assert.equal(created.status, 201);
  const draft = data(created);
  postIds.push(draft.id);
  assert.equal(draft.status, "DRAFT");

  const byId = await request(`/api/blog/id/${draft.id}`);
  assert.equal(byId.status, 200);
  assert.equal(data(byId).status, "DRAFT");

  assert.equal((await request(`/api/blog/${slug}`)).status, 404);
  assert.equal((await request(`/api/blog/${slug}/related`)).status, 404);
  const list = data(await request("/api/blog?pageSize=100"));
  assert.equal(list.items.some((item: JsonObject) => item.id === draft.id), false);
  const search = data(await request(`/api/blog?search=${encodeURIComponent(prefix)}`));
  assert.equal(search.items.some((item: JsonObject) => item.id === draft.id), false);
});

test("published posts are visible by ID, slug, list, and search", async () => {
  const slug = `${prefix}-published`;
  const created = await request("/api/blog", jsonInit("POST", postData(slug, "PUBLISHED")));
  assert.equal(created.status, 201);
  const published = data(created);
  postIds.push(published.id);
  assert.equal(published.status, "PUBLISHED");
  assert.ok(published.publishedAt);

  assert.equal((await request(`/api/blog/id/${published.id}`)).status, 200);
  assert.equal((await request(`/api/blog/${slug}`)).status, 200);
  const list = data(await request("/api/blog?pageSize=100"));
  assert.equal(list.items.some((item: JsonObject) => item.id === published.id), true);
  const search = data(await request(`/api/blog?search=${encodeURIComponent(prefix)}`));
  assert.equal(search.items.some((item: JsonObject) => item.id === published.id), true);
  assert.equal(published.category.id, categoryId);
  assert.equal(published.category.slug, categorySlug);
});

test("status transitions update publication safety and publishedAt", async () => {
  const slug = `${prefix}-transition`;
  const created = data(await request("/api/blog", jsonInit("POST", postData(slug))));
  postIds.push(created.id);
  assert.equal((await request(`/api/blog/${slug}`)).status, 404);

  const published = data(await request(`/api/blog/${created.id}`, jsonInit("PUT", { status: "PUBLISHED" })));
  assert.equal(published.status, "PUBLISHED");
  assert.ok(published.publishedAt);
  assert.equal((await request(`/api/blog/${slug}`)).status, 200);

  const draft = data(await request(`/api/blog/${created.id}`, jsonInit("PUT", { status: "DRAFT" })));
  assert.equal(draft.status, "DRAFT");
  assert.equal(draft.publishedAt, null);
  assert.equal((await request(`/api/blog/${slug}`)).status, 404);
  assert.equal((await request(`/api/blog/id/${created.id}`)).status, 200);
});

test("updates persist content, metadata, keywords, category, and relationship DTO", async () => {
  const created = data(await request("/api/blog", jsonInit("POST", postData(`${prefix}-update`))));
  postIds.push(created.id);
  const update = {
    title: `${prefix} updated title`,
    excerpt: `${prefix} updated excerpt`,
    content: `${prefix} updated content`,
    categoryId,
    metaTitle: `${prefix} updated meta title`,
    metaDescription: `${prefix} updated meta description`,
    keywords: [`${prefix}-updated-keyword`],
  };
  const updated = data(await request(`/api/blog/${created.id}`, jsonInit("PUT", update)));
  const retrieved = data(await request(`/api/blog/id/${created.id}`));
  for (const [key, value] of Object.entries(update)) assert.deepEqual(retrieved[key], value);
  assert.equal(updated.category.id, categoryId);
  assert.equal(retrieved.category.slug, categorySlug);
});

test("deletes draft and published posts", async () => {
  const draft = data(await request("/api/blog", jsonInit("POST", postData(`${prefix}-delete-draft`))));
  const published = data(await request("/api/blog", jsonInit("POST", postData(`${prefix}-delete-published`, "PUBLISHED"))));
  postIds.push(draft.id, published.id);
  assert.equal((await request(`/api/blog/${draft.id}`, { method: "DELETE" })).status, 200);
  assert.equal((await request(`/api/blog/id/${draft.id}`)).status, 404);
  assert.equal((await request(`/api/blog/${published.id}`, { method: "DELETE" })).status, 200);
  assert.equal((await request(`/api/blog/${published.slug}`)).status, 404);
});

test("validation and not-found errors use the standard envelope", async () => {
  const invalid = await request("/api/blog", jsonInit("POST", { title: "invalid" }));
  assert.equal(invalid.status, 400);
  assert.equal(invalid.body.success, false);
  assert.equal(invalid.body.message, "Validation failed");
  assert.ok(Array.isArray(invalid.body.errors));

  const missing = await request("/api/blog/2147483647", { method: "DELETE" });
  assert.equal(missing.status, 404);
  assert.equal(missing.body.success, false);
  assert.equal(missing.body.message, "Blog post not found");
});