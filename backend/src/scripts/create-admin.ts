import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { normalizeEmail } from "../services/auth.service";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (minimum 12 characters)");
  const normalized = normalizeEmail(email);
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({ where: { email: normalized }, update: { passwordHash, role: "ADMIN" }, create: { email: normalized, passwordHash, role: "ADMIN" } });
  console.log(`Admin account ready: ${normalized}`);
}

main().finally(() => prisma.$disconnect());

