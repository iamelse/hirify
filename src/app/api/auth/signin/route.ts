import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/SupabaseServer";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const accessToken = data.session?.access_token;
  const refreshToken = data.session?.refresh_token;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const res = NextResponse.json({ message: "Login berhasil", data });

  res.cookies.set("sb-access-token", accessToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.cookies.set("sb-refresh-token", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}