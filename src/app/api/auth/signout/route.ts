import { NextRequest, NextResponse } from "next/server";

// Logout route - hapus token Supabase dari cookies
export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: "Signed out successfully" });

  // Hapus sb-access-token dan sb-refresh-token
  response.cookies.set({
    name: "sb-access-token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set({
    name: "sb-refresh-token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}