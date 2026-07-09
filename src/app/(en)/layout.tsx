import { Inter, Oswald } from 'next/font/google'
import '../globals.css'
import { rootMetadataEn, rootViewport } from '@/lib/root-metadata'
import VisitTracker from '@/components/VisitTracker'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { buildOrganizationSchema } from '@/lib/seo'
import AttributionTracker from '@/components/AttributionTracker'

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

// EN root layout. This is a ROOT layout (renders <html>/<body>) — there is no
// shared app/layout.tsx. Keeping <html lang> static here (instead of reading
// it from headers() in one shared root layout) is what lets the whole app
// render statically: a dynamic root layout forced every page to render per
// request (Cache-Control: no-store) and can turn notFound() into a streamed
// HTTP 200 soft-404. Same pattern as commercialdoors-ca / porta-potty-ca.
export const metadata = rootMetadataEn
export const viewport = rootViewport

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
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
        <AttributionTracker />
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
        <div className="min-h-screen flex flex-col">
          <Header locale="en" />
          <div id="main-content" className="flex-1">{children}</div>
          <Footer locale="en" />
          <FloatingCTA locale="en" />
        </div>
        {/* Heatmap + Session Replay tracker (sites-hub). Override host via NEXT_PUBLIC_HM_SRC for dev/staging. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src={process.env.NEXT_PUBLIC_HM_SRC ?? "https://app.anydomain.ca/hm.js?p=skatestopper"} />
      </body>
    </html>
  )
}
