import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import VisitTracker from '@/components/VisitTracker'
import { siteConfig } from '@/config/site-config'
import { buildOrganizationSchema } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} | ${siteConfig.taglineEn ?? siteConfig.nicheEn}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.descriptionEn,
  // Keywords come from site-config.ts (populated in Phase 3.2.23 from
  // blueprint keyword research). Never hardcode niche terms here — the
  // niche-contamination-gate will fail the build.
  metadataBase: new URL(`https://${siteConfig.domain}`),
  // NOTE: OG, canonical, alternates, and twitter are set PER-PAGE via buildPageMeta().
  // Only set metadataBase here — pages override everything else.
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(siteConfig.googleVerification && {
    verification: { google: siteConfig.googleVerification },
  }),
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-side <html lang> based on URL. Middleware injects `x-url`.
  // FR routes get lang="fr-CA", everything else en-CA. Crawlers see this in SSR HTML;
  // a client-side useEffect patch is invisible to Google.
  const h = await headers()
  const url = h.get('x-url') || '/'
  const htmlLang = url.startsWith('/fr') ? 'fr-CA' : 'en-CA'
  return (
    <html lang={htmlLang}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Sitewide Organization JSON-LD — FACTORY-MASTER §B.1. */}
        {/* WebSite SD is emitted on the homepage only (avoid duplication). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema({ includeWebSite: false })),
          }}
        />
      </head>
      <body className={`${inter.variable} ${oswald.variable} bg-white text-[var(--text)] antialiased overflow-x-hidden`} style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
        {/* A/B + CTR experiment engine (sites-hub). Render-blocking (no async)
            so an assigned variant applies before paint. No-op unless an
            experiment is active for the page. See sites-hub public/xp.js. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src={process.env.NEXT_PUBLIC_XP_SRC ?? "https://app.anydomain.ca/xp.js"} data-site="skatestopper" />
        {/* Skip to content — accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded focus:text-sm focus:font-semibold">
          Skip to main content
        </a>
        <VisitTracker />
        {children}
        {/* Heatmap + Session Replay tracker (sites-hub). Override host via NEXT_PUBLIC_HM_SRC for dev/staging. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src={process.env.NEXT_PUBLIC_HM_SRC ?? "https://app.anydomain.ca/hm.js?p=skatestopper"} />
      </body>
    </html>
  )
}
