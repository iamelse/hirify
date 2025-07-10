import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/SupabaseServer'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  return NextResponse.json({ message: 'Login berhasil', data })
}