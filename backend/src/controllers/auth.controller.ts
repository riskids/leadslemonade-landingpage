import type { Request, Response } from "express";
import { env } from "../config/env";
import { createSession, invalidateSession, sessionCookieOptions, verifyCredentials, AUTH_FAILURE_MESSAGE } from "../services/auth.service";
import { readCookie } from "../middlewares/auth";
import { ok } from "../utils/response";

export async function login(req: Request, res: Response) {
  const user = await verifyCredentials(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ success: false, message: AUTH_FAILURE_MESSAGE });
  const token = await createSession(user.id);
  res.cookie(env.authCookieName, token, sessionCookieOptions());
  return res.json(ok(user));
}

export async function logout(req: Request, res: Response) {
  await invalidateSession(readCookie(req, env.authCookieName));
  const { maxAge: _maxAge, ...clearOptions } = sessionCookieOptions();
  res.clearCookie(env.authCookieName, clearOptions);
  return res.json(ok({ loggedOut: true }));
}

export function me(req: Request, res: Response) { return res.json(ok(req.authUser)); }
