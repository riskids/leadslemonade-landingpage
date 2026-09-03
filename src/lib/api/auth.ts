const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");
const BASE_URL = API_URL;
function url(path: string) { return `${BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`; }
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url(path), { ...init, credentials: "include", headers: { Accept: "application/json", ...(init.body ? { "Content-Type": "application/json" } : {}), ...init.headers } });
  const body = (await response.json()) as { success: boolean; data?: T; message?: string };
  if (!response.ok || !body.success) throw new Error(body.message ?? "Authentication request failed");
  return body.data as T;
}
export type AuthUser = { id: number; email: string; role: "ADMIN" };
export function login(email: string, password: string) { return request<AuthUser>("auth/login", { method: "POST", body: JSON.stringify({ email, password }) }); }
export function me() { return request<AuthUser>("auth/me", { cache: "no-store" }); }
export function logout() { return request<{ loggedOut: boolean }>("auth/logout", { method: "POST" }); }
