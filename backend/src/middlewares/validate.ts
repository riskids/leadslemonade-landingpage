import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { ApiError } from "../utils/ApiError";

type ValidationTarget = "body" | "query" | "params";

/**
 * Validate a request part against a Zod schema.
 * On failure, throws ApiError(400) with flattened field errors.
 */
export function validate(schema: ZodSchema, target: ValidationTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);
      // Replace with the parsed (coerced / defaulted) value
      (req as unknown as Record<string, unknown>)[target] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => {
          const path = issue.path.length > 0 ? issue.path.join(".") : "value";
          return `${path}: ${issue.message}`;
        });
        return next(ApiError.badRequest("Validation failed", errors));
      }
      next(err);
    }
  };
}
