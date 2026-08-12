import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import { apiRateLimiter } from "./middlewares/rateLimiter";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes";

export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: env.clientOrigin === "*" ? true : env.clientOrigin.split(",").map((value) => value.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));

  if (env.nodeEnv !== "test") app.use(morgan(env.isProd ? "combined" : "dev"));
  app.use("/api", apiRateLimiter);
  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

