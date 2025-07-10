import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/SupabaseServer";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const supabase = await createSupabaseServerClient(); // ✅ tambahkan await

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // Set token cookie jika berhasil login
  const cookieStore = await cookies(); // ✅

  const accessToken = data.session?.access_token;
  const refreshToken = data.session?.refresh_token;

  if (accessToken && refreshToken) {
    cookieStore.set("sb-access-token", accessToken, {
      path: "/",
      httpOnly: true,
      secure: true,
    });

    cookieStore.set("sb-refresh-token", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
    });
  }

  return NextResponse.json({ message: "Login berhasil", data });
}