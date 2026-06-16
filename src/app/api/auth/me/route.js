import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('glf_admin_token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  // On retourne le token pour qu'il soit stocké en mémoire React (jamais dans localStorage)
  return NextResponse.json({ token })
}
