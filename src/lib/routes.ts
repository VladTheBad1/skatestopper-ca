import { siteConfig } from '@/config/site-config'

type Locale = 'en' | 'fr'

/**
 * URL construction helpers. ALL components use these — never build URLs inline.
 * Routes are defined in site-config.ts so they're niche-specific.
 */

/** Static route URL (e.g. staticUrl('products', 'fr') → '/fr/produits') */
export function staticUrl(key: string, locale: Locale): string {
  const route = (siteConfig.routes as Record<string, { en: string; fr: string }>)[key]
  if (!route) return locale === 'en' ? `/${key}` : `/fr/${key}`
  return route[locale]
}

/** Product/service detail URL */
export function productUrl(slug: string, slugFr: string, locale: Locale): string {
  return locale === 'en' ? `/${slug}` : `/fr/${slugFr}`
}

/** City hub URL */
export function cityUrl(citySlug: string, locale: Locale): string {
  return locale === 'en' ? `/${citySlug}` : `/fr/${citySlug}`
}

/** Geo page URL (city × service) — NO suffix, just slug */
export function geoUrl(citySlug: string, serviceSlug: string, serviceSlugFr: string, locale: Locale): string {
  const svc = locale === 'en' ? serviceSlug : serviceSlugFr
  return locale === 'en' ? `/${citySlug}/${svc}` : `/fr/${citySlug}/${svc}`
}

/** Blog post URL */
export function blogUrl(slug: string, slugFr: string, locale: Locale): string {
  return locale === 'en' ? `/blog/${slug}` : `/fr/blogue/${slugFr}`
}

/** Contact/quote URL */
export function contactUrl(locale: Locale): string {
  return staticUrl('contact', locale)
}

/** FR prefix helper */
export function localePrefix(locale: Locale): string {
  return locale === 'en' ? '' : '/fr'
}
