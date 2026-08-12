import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import type { AddressInfo } from "node:net";
import { createApp } from "../src/app";
import { prisma } from "../src/config/prisma";

if (!process.env.TEST_DATABASE_URL) throw new Error("TEST_DATABASE_URL is required; refusing to use the development database.");
const prefix = `auth-regression-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const email = `${prefix}@example.test`;
const password = "AuthRegressionPassword!123";
let baseUrl = "";
let server: ReturnType<ReturnType<typeof createApp>["listen"]>;
let cookie = "";

async function request(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (cookie) headers.set("cookie", cookie);
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers });
  return { response, body: (await response.json()) as Record<string, any> };
}
function json(body: Record<string, unknown>): RequestInit { return { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }; }

before(async () => {
  await prisma.user.create({ data: { email, passwordHash: await bcrypt.hash(password, 4), role: "ADMIN" } });
  await new Promise<void>((resolve) => { server = createApp().listen(0, () => { baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`; resolve(); }); });
});
after(async () => {
  if (server) await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  await prisma.authSession.deleteMany({ where: { user: { email } } });
  await prisma.user.deleteMany({ where: { email } });
  await prisma.$disconnect();
});

test("login failures are generic", async () => {
  const unknown = await request("/api/auth/login", json({ email: "missing@example.test", password }));
  const wrong = await request("/api/auth/login", json({ email, password: "wrong-password" }));
  assert.equal(unknown.response.status, 401); assert.equal(wrong.response.status, 401);
  assert.equal(unknown.body.message, wrong.body.message);
});
test("session lifecycle authenticates and invalidates", async () => {
  const login = await request("/api/auth/login", json({ email, password }));
  assert.equal(login.response.status, 200);
  const setCookie = login.response.headers.get("set-cookie"); assert.ok(setCookie); assert.match(setCookie!, /HttpOnly/i);
  cookie = setCookie!.split(";")[0];
  assert.equal((await request("/api/auth/me")).response.status, 200);
  assert.equal((await request("/api/auth/logout", { method: "POST" })).response.status, 200);
  assert.equal((await request("/api/auth/me")).response.status, 401);
});
test("unexpected origin is rejected for private mutation", async () => {
  const login = await request("/api/auth/login", json({ email, password }));
  const setCookie = login.response.headers.get("set-cookie");
  assert.ok(setCookie);
  cookie = setCookie!.split(";")[0];
  const response = await request("/api/categories", { method: "POST", headers: { origin: "https://unexpected.example", "content-type": "application/json" }, body: JSON.stringify({ name: "x", slug: `${prefix}-x` }) });
  assert.equal(response.response.status, 403);
});
