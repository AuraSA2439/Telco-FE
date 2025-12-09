import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value || req.headers.get("Authorization");

  const protectedRoutes = ["/profile", "/recommendations"];

  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}