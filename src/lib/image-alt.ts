/**
 * Image alt helpers — FACTORY-MASTER §4.7.11a.
 *
 * Never use slug-reformatted alt (alt={item.name}). Always reach for the
 * scene-descriptive alt that already lives in src/data/images.ts, with
 * a per-item imageHint fallback, and a niche-aware last-resort.
 */
import { images } from '@/data/images'
import { siteConfig } from '@/config/site-config'

type Locale = 'en' | 'fr'

/** Read scene-descriptive alt for a known image-namespace entry. */
function readAlt(ns: string, key: string, locale: Locale): string | undefined {
  const entry = (images as Record<string, Record<string, { alt?: { en?: string; fr?: string } }>>)
    ?.[ns]
    ?.[key]
  return entry?.alt?.[locale] || entry?.alt?.en
}

/** Alt for a product/material image (e.g. ProductCard, IndustryDetailPage related products). */
export function productImageAlt(
  slug: string,
  locale: Locale,
  imageHint?: string,
  productName?: string
): string {
  return (
    readAlt('products', slug, locale) ||
    imageHint ||
    (locale === 'en'
      ? `${productName || 'Skate stopper'} installed in a Canadian commercial setting`
      : `${productName || 'Bloque-skate'} installé dans un contexte commercial canadien`)
  )
}

/** Alt for an industry image. */
export function industryImageAlt(
  slug: string,
  locale: Locale,
  imageHint?: string,
  industryName?: string
): string {
  return (
    readAlt('industries', slug, locale) ||
    imageHint ||
    (locale === 'en'
      ? `${industryName || siteConfig.nicheShortEn} application in a Canadian setting`
      : `Application ${industryName || siteConfig.nicheShortFr} dans un contexte canadien`)
  )
}

/** Alt for a blog post hero/card image. Prefers post.imageAlt[locale] field. */
export function blogImageAlt(
  post: { title: string; imageAlt?: string; imageAltFr?: string },
  locale: Locale
): string {
  if (locale === 'fr' && post.imageAltFr) return post.imageAltFr
  if (post.imageAlt) return post.imageAlt
  return locale === 'en'
    ? `Editorial photo for the article "${post.title}" — skate stoppers and anti-skateboarding deterrents in Canadian commercial settings`
    : `Photo éditoriale de l'article « ${post.title} » — bloque-skate et dissuasifs anti-planche en contexte commercial canadien`
}
