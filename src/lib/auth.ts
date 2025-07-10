import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!);

export async function isAuthenticated(token: string | undefined) {
  if (!token) return { valid: false };

  try {
    const { payload } = await jwtVerify(token, secret);
    return { valid: true, userId: payload.sub };
  } catch (error) {
    console.error("[auth] Invalid token:", error);
    return { valid: false };
  }
}