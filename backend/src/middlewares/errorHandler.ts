import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

interface ErrorEnvelope {
  success: false;
  message: string;
  errors?: string[];
}

/**
 * Global error handler. Converts any thrown error into the standard
 * error envelope: { success: false, message, errors? }
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Known application errors
  if (err instanceof ApiError) {
    const body: ErrorEnvelope = {
      success: false,
      message: err.message,
    };
    if (err.errors && err.errors.length > 0) body.errors = err.errors;
    res.status(err.statusCode).json(body);
    return;
  }

  // Zod validation errors (defensive; validate middleware already handles these)
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "value";
      return `${path}: ${issue.message}`;
    });
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
    return;
  }

  // Prisma unique-constraint violation (e.g. duplicate slug)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[] | undefined)?.join(", ") ?? "field";
      res.status(409).json({
        success: false,
        message: "A record with this value already exists",
        errors: [`${target} must be unique`],
      });
      return;
    }
    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Resource not found",
      });
      return;
    }
  }

  // Fallback for truly unexpected errors
  const detail = err instanceof Error ? err.message : "Internal server error";
  if (!env.isProd) {
    // eslint-disable-next-line no-console
    console.error("[error]", err);
  }
  const body: ErrorEnvelope = {
    success: false,
    message: "Internal server error",
  };
  // In dev only, surface the detail to help debugging
  if (!env.isProd) body.errors = [detail];
  res.status(500).json(body);
}
