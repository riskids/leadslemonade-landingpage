"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api/auth";
export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(null); setLoading(true);
    try { await login(email, password); router.replace(params.get("next")?.startsWith("/") ? params.get("next")! : "/dashboard"); }
    catch { setError("Invalid email or password."); setLoading(false); }
  }
  return <form onSubmit={submit} className="w-full max-w-md border p-6 sm:p-8 space-y-5" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}>
    <div><label htmlFor="email" className="block text-sm font-medium mb-2">Email</label><input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full min-h-11 border px-3" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }} /></div>
    <div><label htmlFor="password" className="block text-sm font-medium mb-2">Password</label><input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full min-h-11 border px-3" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }} /></div>
    {error && <p role="alert" className="text-sm" style={{ color: "var(--color-accent-2)" }}>{error}</p>}
    <button id="login-submit" disabled={loading} className="w-full min-h-11 rounded-full font-medium disabled:opacity-60" style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}>{loading ? "Signing in..." : "Sign in"}</button>
  </form>;
}
