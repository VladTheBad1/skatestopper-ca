import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config/site-config'

// Shared root metadata/viewport for the per-locale root layouts. Page-level
// buildPageMeta() still overrides title/description/canonical per route;
// this is only the fallback + the site-wide robots/verification/metadataBase.
export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

function build(locale: 'en' | 'fr'): Metadata {
  const isEn = locale === 'en'
  const tagline = isEn
    ? (siteConfig.taglineEn ?? siteConfig.nicheEn)
    : (siteConfig.taglineFr ?? siteConfig.nicheFr)
  return {
    title: {
      default: `${siteConfig.brandName} | ${tagline}`,
      template: `%s | ${siteConfig.brandName}`,
    },
    description: isEn ? siteConfig.descriptionEn : siteConfig.descriptionFr,
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
}

export const rootMetadataEn = build('en')
export const rootMetadataFr = build('fr')
