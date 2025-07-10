// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  const { valid } = await isAuthenticated(token); // ✅ pakai await

  console.log("MIDDLEWARE", { token, valid, path: req.nextUrl.pathname });

  const pathname = req.nextUrl.pathname;

  // Lewati jika file statis
  if (/\.(js|css|svg|png|jpg|webp|ico|map)$/.test(pathname)) {
    return NextResponse.next();
  }

  // Rute terlindungi
  if (pathname.startsWith("/user")) {
    if (!valid) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // Halaman auth tidak bisa diakses jika sudah login
  if (pathname === "/signin" || pathname === "/signup") {
    if (valid) {
      return NextResponse.redirect(new URL("/user/home", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/signin", "/signup"],
};