import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/SupabaseServer'

export async function GET() {
  const supabase = createSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ user })
}