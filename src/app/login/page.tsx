import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
export const metadata: Metadata = { title: "Admin Login | LeadsLemonade", description: "Sign in to the LeadsLemonade dashboard.", robots: { index: false, follow: false } };
export default function LoginPage() { return <main className="min-h-screen grid place-items-center px-4 py-16"><div className="w-full max-w-md"><Link href="/" className="block text-center text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>LeadsLemonade</Link><h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Admin sign in</h1><p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>Access the Blog and Dashboard workspace.</p><Suspense fallback={<div className="h-48" />}><LoginForm /></Suspense></div></main>; }
