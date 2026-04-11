import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://c.clarity.ms https://static.clarity.ms https://scripts.clarity.ms https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://www.googleadservices.com; connect-src 'self' https://www.clarity.ms https://c.clarity.ms https://j.clarity.ms https://www.google-analytics.com https://pagead2.googlesyndication.com; img-src 'self' data: https: https://www.clarity.ms https://c.clarity.ms https://j.clarity.ms https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; object-src 'none'; base-uri 'self'; form-action 'self'"
  )

  return response
}

export const config = {
  matcher: '/:path*',
}