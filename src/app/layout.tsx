import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getSiteUrl, getSiteUrlString, getSiteImageUrl } from "@/lib/site";
import { getSeoSettingsSafe } from "@/lib/api/blog";
import "./globals.css";

// Material Symbols Outlined — must be loaded via <link> for ligatures to work
const materialSymbols = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";

const fallbackTitle = "LeadsLemonade | Leads Generation Platform";
const fallbackDescription = "Find anyone using natural language, verify emails in real-time, and start for as low as $5. AI-powered lead discovery with 99.9% deliverability.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSeoSettingsSafe();
  const title = settings?.defaultTitle || fallbackTitle;
  const description = settings?.defaultDescription || fallbackDescription;
  const image = settings?.defaultSocialImage || getSiteImageUrl();
  return {
  metadataBase: getSiteUrl(),
  title,
  description,
  keywords: ["lead generation", "email finder", "AI search", "B2B leads", "sales intelligence"],
  openGraph: {
    title,
    description,
    type: "website",
    url: getSiteUrlString(),
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "LeadsLemonade - Search for anyone easily",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-theme="aurora"
    >
      <head>
        <link rel="stylesheet" href={materialSymbols} />
      </head>
      <body style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}