import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leadslemonade.com"),
  title: "LeadsLemonade | Leads Generation Platform",
  description:
    "Find anyone using natural language, verify emails in real-time, and start for as low as $5. AI-powered lead discovery with 99.9% deliverability.",
  keywords: ["lead generation", "email finder", "AI search", "B2B leads", "sales intelligence"],
  openGraph: {
    title: "LeadsLemonade | Leads Generation Platform",
    description:
      "Find anyone using natural language, verify emails in real-time, and start for as low as $5.",
    type: "website",
    url: "https://leadslemonade.com",
    images: [
      {
        url: "https://leadslemonade.com/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "LeadsLemonade - Search for anyone easily",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadsLemonade | Leads Generation Platform",
    description:
      "Find anyone using natural language, verify emails in real-time, and start for as low as $5.",
    images: ["https://leadslemonade.com/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} data-theme="aurora">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}