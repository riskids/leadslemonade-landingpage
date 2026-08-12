import dotenv from "dotenv";

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function asInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Env var ${name} must be an integer, got: ${raw}`);
  }
  return parsed;
}

const nodeEnv = process.env.NODE_ENV ?? "development";
const isProd = nodeEnv === "production";
const authSecret = required("AUTH_SESSION_SECRET", isProd ? undefined : "development-only-change-me");
if (isProd && authSecret.length < 32) {
  throw new Error("AUTH_SESSION_SECRET must be at least 32 characters in production");
}

export const env = {
  nodeEnv,
  isProd,
  port: asInt("PORT", 5000),
  databaseUrl: required("DATABASE_URL"),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "*",
  authSecret,
  authCookieName: process.env.AUTH_COOKIE_NAME ?? "leadslemonade_admin_session",
  authSessionTtlDays: asInt("AUTH_SESSION_TTL_DAYS", 7),
} as const;

export type Env = typeof env;
