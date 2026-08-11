import { prisma } from "../config/prisma";
import type { UpdateSeoSettingsInput } from "../validators/seoSettings.validator";

export const defaultSeoSettings = {
  siteName: "LeadsLemonade",
  defaultTitle: "LeadsLemonade | Leads Generation Platform",
  defaultDescription:
    "Find anyone using natural language, verify emails in real-time, and start for as low as $5.",
  defaultSocialImage: null,
} as const;

export async function getSeoSettings() {
  const settings = await prisma.seoSettings.findUnique({ where: { id: 1 } });
  return settings ?? defaultSeoSettings;
}

export async function updateSeoSettings(input: UpdateSeoSettingsInput) {
  return prisma.seoSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...input, defaultSocialImage: input.defaultSocialImage ?? null },
    update: { ...input, defaultSocialImage: input.defaultSocialImage ?? null },
  });
}