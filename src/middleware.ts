import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  const { valid, user } = await isAuthenticated(token);

  const pathname = req.nextUrl.pathname;

  // Lewati file statis
  if (/\.(js|css|svg|png|jpg|webp|ico|map)$/.test(pathname)) {
    return NextResponse.next();
  }

  // 🔐 Rute /user hanya untuk role USER
  if (pathname.startsWith("/user")) {
    if (!valid) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // ⛔️ Sudah login tapi role tidak valid → redirect ke /not-found
    if (user?.role !== "USER") {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }
  }

  // 🛑 Auth pages tidak bisa diakses jika sudah login
  if (pathname === "/signin" || pathname === "/signup") {
    if (valid) {
      const redirectPath = user?.role === "ADMIN" ? "/admin/dashboard" : "/user/home";
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/signin", "/signup"],
};