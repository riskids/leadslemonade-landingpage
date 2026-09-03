import { NextRequest, NextResponse } from "next/server";
const cookieName = process.env.AUTH_COOKIE_NAME ?? "leadslemonade_admin_session";
export function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(cookieName)?.value);
  if (request.nextUrl.pathname.startsWith("/dashboard") && !hasSession) {
    const login = new URL("/login", request.url); login.searchParams.set("next", request.nextUrl.pathname); return NextResponse.redirect(login);
  }
  if (request.nextUrl.pathname === "/login" && hasSession) return NextResponse.redirect(new URL("/dashboard", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*", "/login"] };
