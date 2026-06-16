import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()

  // FastAPI attend du form-data pour OAuth2
  const formData = new URLSearchParams()
  formData.append('username', body.username)
  formData.append('password', body.password)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  const data = await res.json()

  // On pose le cookie httpOnly — JavaScript ne pourra jamais le lire
  const response = NextResponse.json({ success: true })
  response.cookies.set('glf_admin_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 30, // 30 minutes, comme le backend
    path: '/',
  })

  return response
}
