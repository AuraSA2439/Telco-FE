import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Public routes
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith("/recommendations")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/recommendations/:path*"],
};
