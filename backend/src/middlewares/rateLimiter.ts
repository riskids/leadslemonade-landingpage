import rateLimit from "express-rate-limit";

/**
 * Basic per-IP rate limiter to mitigate abuse.
 * 100 requests / 15 min window per IP.
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

/**
 * Stricter limiter for write operations.
 */
export const writeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many write requests, please try again later.",
  },
});
