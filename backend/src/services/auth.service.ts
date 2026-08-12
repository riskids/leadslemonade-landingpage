import { createHmac, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { env } from "../config/env";

export const AUTH_FAILURE_MESSAGE = "Invalid email or password";
export type AuthUser = { id: number; email: string; role: "ADMIN" };

export function normalizeEmail(email: string): string { return email.trim().toLowerCase(); }
function hashSessionToken(token: string): string { return createHmac("sha256", env.authSecret).update(token).digest("hex"); }

export function sessionCookieOptions() {
  const sameSite = process.env.AUTH_COOKIE_SAME_SITE ?? "lax";
  if (!["lax", "strict", "none"].includes(sameSite)) throw new Error("AUTH_COOKIE_SAME_SITE must be lax, strict, or none");
  if (sameSite === "none" && !env.isProd) throw new Error("AUTH_COOKIE_SAME_SITE=none requires production HTTPS");
  return { httpOnly: true, secure: env.isProd || sameSite === "none", sameSite: sameSite as "lax" | "strict" | "none", path: "/", maxAge: env.authSessionTtlDays * 86400000 };
}

export async function verifyCredentials(email: string, password: string): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
  if (!user || user.role !== "ADMIN") return null;
  if (!(await bcrypt.compare(password, user.passwordHash))) return null;
  return { id: user.id, email: user.email, role: user.role };
}

export async function createSession(userId: number): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  await prisma.authSession.create({ data: { tokenHash: hashSessionToken(token), userId, expiresAt: new Date(Date.now() + env.authSessionTtlDays * 86400000) } });
  return token;
}

export async function getUserFromSession(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null;
  const session = await prisma.authSession.findUnique({ where: { tokenHash: hashSessionToken(token) }, include: { user: true } });
  if (!session) return null;
  if (session.expiresAt <= new Date()) {
    await prisma.authSession.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }
  if (session.user.role !== "ADMIN") return null;
  return { id: session.user.id, email: session.user.email, role: session.user.role };
}

export async function invalidateSession(token: string | undefined): Promise<void> {
  if (token) await prisma.authSession.deleteMany({ where: { tokenHash: hashSessionToken(token) } });
}
