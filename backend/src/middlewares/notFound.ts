import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

/**
 * 404 handler for unmatched routes.
 */
export function notFound(_req: Request, _res: Response, _next: NextFunction) {
  throw ApiError.notFound("Route not found");
}
