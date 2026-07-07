import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { siteConfig } from '@/config/site-config'

/**
 * Middleware — keep this MINIMAL.
 *
 * IMPORTANT: Do NOT add security headers here with `NextResponse.next()` +
 * `response.headers.set(...)`. In Next 16+, this clobbers the HTTP status
 * code of `notFound()` on dynamic routes (they return 200 instead of 404).
 *
 * Security headers live in `next.config.ts` under `async headers()`.
 * That's the correct place — Next applies them without breaking status codes.
 *
 * Only use middleware for:
 *   - Redirects (www → non-www, legacy URL → new URL)
 *   - Auth checks
 *   - Locale detection (when NOT using app/[locale])
 *
 * DO NOT use middleware for: security headers, 404 handling, caching headers.
 */
export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl

  // Redirect www to non-www
  if (hostname === `www.${siteConfig.domain}`) {
    return NextResponse.redirect(
      new URL(`https://${siteConfig.domain}${pathname}${search}`),
      301
    )
  }

  // Pass through — headers handled in next.config.ts.
  // <html lang> is static per-locale in the (en)/fr root layouts — no x-url
  // header needed (reading headers() in a root layout forces dynamic rendering).
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.png|images/).*)'],
}
