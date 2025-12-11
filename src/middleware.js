import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;

  // Allow login page
  if (url === "/login") return NextResponse.next();

  // Redirect to login if no token
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|assets|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};