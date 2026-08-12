import type { Metadata } from "next";
import DashboardAuthGuard from "@/components/auth/DashboardAuthGuard";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardAuthGuard>{children}</DashboardAuthGuard>;
}