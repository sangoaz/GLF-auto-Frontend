import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('glf_admin_token')

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

// S'applique à toutes les routes /admin/* sauf /admin/login
export const config = {
  matcher: ['/admin/((?!login).*)'],
}
