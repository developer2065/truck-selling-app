import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages } from './i18n/settings'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // اگر مسیر اصلی بود (مثلاً فقط /)، ریدایرکت کن به زبان پیش‌فرض (/fa)
  // if (pathname === '/') {
  //   return NextResponse.redirect(new URL('/fa', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|icons|.*\\..*).*)'],
}
