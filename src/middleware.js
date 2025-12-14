import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  /* ------------------------------------------
     ✅ ALLOW PUBLIC / PWA FILES
  ------------------------------------------- */
  if (
    pathname === "/login" ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js" ||
    pathname.startsWith("/icons/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  /* ------------------------------------------
     🔐 AUTH PROTECTION
  ------------------------------------------- */
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

/* ------------------------------------------
   MATCHER (keep this)
------------------------------------------- */
export const config = {
  matcher: [
    "/((?!_next|static|assets).*)",
  ],
};