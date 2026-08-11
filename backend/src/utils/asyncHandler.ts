import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Wraps an async route handler so rejected promises are forwarded to
 * the global error middleware instead of crashing the process.
 */
export function asyncHandler(fn: AsyncFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (err instanceof ApiError) return next(err);
      next(err);
    });
  };
}
