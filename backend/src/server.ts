import { env } from "./config/env";
import { createApp } from "./app";
import { prisma } from "./config/prisma";

const app = createApp();

const server = app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `\n🚀 LeadsLemonade Blog API running at http://localhost:${env.port} (${env.nodeEnv})`
  );
  // eslint-disable-next-line no-console
  console.log(`   CORS origin: ${env.clientOrigin}`);
});

async function shutdown(signal: string) {
  // eslint-disable-next-line no-console
  console.log(`\n${signal} received: closing HTTP server...`);
  server.close(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log("HTTP server closed and Prisma disconnected. Bye.");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
