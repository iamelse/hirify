import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!);

export async function isAuthenticated(token: string | undefined) {
  if (!token) return { valid: false };

  try {
    const { payload } = await jwtVerify(token, secret);

    const userId = payload.sub as string;
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const userMetadata = payload[`${SUPABASE_URL}/user_metadata`] as any;

    return {
      valid: true,
      user: {
        id: userId,
        email: payload.email,
        role: userMetadata?.role ?? "USER", // fallback
      },
    };
  } catch (error) {
    console.error("[auth] Invalid token:", error);
    return { valid: false };
  }
}