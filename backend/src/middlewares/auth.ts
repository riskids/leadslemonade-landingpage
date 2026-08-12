import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { getUserFromSession, type AuthUser } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";

declare global { namespace Express { interface Request { authUser?: AuthUser; } } }

export function readCookie(req: Request, name: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  return header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const user = await getUserFromSession(readCookie(req, env.authCookieName));
  if (!user) return next(ApiError.unauthorized());
  req.authUser = user;
  next();
}

export function requireTrustedOrigin(req: Request, _res: Response, next: NextFunction) {
  const origin = req.get("origin");
  if (!origin) return next();
  const allowed = env.clientOrigin.split(",").map((value) => value.trim()).filter(Boolean);
  if (allowed.includes("*") && !env.isProd) return next();
  if (allowed.includes(origin)) return next();
  return next(ApiError.forbidden("Unexpected request origin"));
}

