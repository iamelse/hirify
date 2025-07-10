import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/SupabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "User registered", user: data.user });
  } catch (err) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}