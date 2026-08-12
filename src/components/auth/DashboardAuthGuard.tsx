"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me } from "@/lib/api/auth";
export default function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter(); const [ready, setReady] = useState(false);
  useEffect(() => { me().then(() => setReady(true)).catch(() => router.replace(`/login?next=${encodeURIComponent(location.pathname)}`)); }, [router]);
  return ready ? children : <div className="min-h-screen grid place-items-center text-sm" style={{ color: "var(--color-muted)" }}>Checking session...</div>;
}
