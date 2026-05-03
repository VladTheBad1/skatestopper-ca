import { materials } from '@/data/products'
import { industries } from '@/data/industries'
import { cities, provinces } from '@/data/locations'
import { translations } from '@/data/translations'
import { images } from '@/data/images'

type Locale = 'en' | 'fr'

// Service accessors
export function getProduct(slug: string, locale: Locale) {
  // Look up by slug (EN) AND slugFr (FR) so flat /fr/{slugFr} routes resolve.
  const p = materials.find((m) => m.slug === slug || m.slugFr === slug)
  if (!p) return null
  return {
    name: locale === 'en' ? p.nameEn : p.nameFr,
    description: locale === 'en' ? p.descriptionEn : p.descriptionFr,
    excerpt: locale === 'en' ? (p as { shortEn?: string }).shortEn : (p as { shortFr?: string }).shortFr,
    slug: p.slug,
    slugFr: p.slugFr,
    image: p.image ?? `/images/products/${p.slug}.webp`,
    priceRange: p.priceRange,
    features: locale === 'en' ? p.features : p.featuresFr,
    bestFor: locale === 'en' ? p.bestFor : p.bestForFr,
    gradient: p.gradient,
  }
}

export function getAllProducts(locale: Locale) {
  return materials.map((p) => ({
    name: locale === 'en' ? p.nameEn : p.nameFr,
    description: locale === 'en' ? p.descriptionEn : p.descriptionFr,
    slug: p.slug,
    image: p.image,
    priceRange: p.priceRange,
    features: locale === 'en' ? p.features : p.featuresFr,
    bestFor: locale === 'en' ? p.bestFor : p.bestForFr,
    gradient: p.gradient,
  }))
}

// Sector (industry) accessors
export function getIndustry(slug: string, locale: Locale) {
  // Look up by slug (EN) AND slugFr (FR) so flat /fr/{slugFr} routes resolve.
  const i = industries.find((ind) => ind.slug === slug || ind.slugFr === slug)
  if (!i) return null
  return {
    name: locale === 'en' ? i.nameEn : i.nameFr,
    description: locale === 'en' ? i.descriptionEn : i.descriptionFr,
    slug: i.slug,
    slugFr: i.slugFr,
    image: i.image ?? `/images/industries/${i.slug}.webp`,
    icon: i.icon,
    useCases: locale === 'en' ? i.useCases : i.useCasesFr,
    gradient: i.gradient,
  }
}

export function getAllIndustries(locale: Locale) {
  return industries.map((i) => ({
    name: locale === 'en' ? i.nameEn : i.nameFr,
    description: locale === 'en' ? i.descriptionEn : i.descriptionFr,
    slug: i.slug,
    image: i.image ?? `/images/industries/${i.slug}.webp`,
    icon: i.icon,
    useCases: locale === 'en' ? i.useCases : i.useCasesFr,
    gradient: i.gradient,
  }))
}

// City accessors
export function getCity(slug: string, locale?: Locale) {
  const c = cities.find((c) => c.slug === slug)
  if (!c) return null
  return {
    // Auto-derive city hero image from slug.
    heroImage: (c as { image?: string }).image ?? `/images/cities/${c.slug}-hero.webp`,
    ...c,
    name: c.name,
    description: locale === 'fr' ? c.descriptionFr : c.descriptionEn,
    slug: c.slug,
  }
}

export function getAllCities(locale?: Locale) {
  return cities.map(c => ({
    ...c,
    description: locale === 'fr' ? c.descriptionFr : c.descriptionEn,
  }))
}

export function getCitiesByProvince(provinceSlug: string) {
  return cities.filter((c) => c.provinceSlug === provinceSlug)
}

export function getAllProvinces() {
  return provinces
}

export function getProvince(slug: string) {
  return provinces.find(p => p.slug === slug) || null
}

// Translation accessor — supports nested keys: t('hero.cta', locale)
export function t(key: string, locale: Locale): string {
  const resolve = (obj: any, path: string): string | undefined => {
    // Try flat key first (e.g. translations[locale]['productPage.aboutEyebrow'])
    if (obj && typeof obj[path] === 'string') return obj[path]
    // Fall back to nested lookup (productPage → aboutEyebrow)
    return path.split('.').reduce((o, k) => o?.[k], obj) as string | undefined
  }
  // Return empty string when key is not found in any locale. Returning the
  // key (e.g. 'productPage.relatedTitle') as fallback breaks the common
  // pattern `t(key, locale) || fallback` because the key string is truthy and
  // the OR-fallback never fires — leaking 'productPage.relatedTitle' into
  // the visible UI. Empty string makes the OR pattern work as intended.
  return resolve(translations[locale], key) || resolve(translations['en'], key) || ''
}

// Image accessors
export function getImagePath(
  category: 'products' | 'industries' | 'hero',
  slug?: string
): string {
  if (category === 'hero') {
    const hero = (images as any).hero
    if (!hero) return '/images/hero/hero.webp'
    return typeof hero === 'string' ? hero : hero?.src || '/images/hero/hero.webp'
  }
  const catData = (images as any)[category]
  if (!catData || !slug) return '/images/hero/hero.webp'
  const val = catData[slug]
  return typeof val === 'string' ? val : val?.src || '/images/hero/hero.webp'
}

export function getCityImage(
  citySlug: string,
  _type: 'hero' | 'bg' = 'hero'
) {
  const fallback = {
    src: `/images/cities/${citySlug}.webp`,
    fallback: '/images/hero/hero.webp',
    alt: { en: citySlug, fr: citySlug },
    width: 1920,
    height: 800,
  }
  const city = (images as any).cities?.[citySlug]
  if (!city) return fallback
  if (typeof city === 'object' && city.hero) return city.hero
  if (typeof city === 'object' && city.src) return city
  return fallback
}

export function getVideo(
  category: 'hero' | 'products' | 'industries' | 'cities',
  slug?: string
): any {
  const vids = (images as any).videos
  if (!vids) return null
  if (category === 'hero') return vids.hero || null
  return vids[category]?.[slug || ''] || null
}

export function getImage(
  category: 'products' | 'industries' | 'hero',
  slug?: string
): { src: string; alt: { en: string; fr: string }; width: number; height: number } {
  const fallback = { src: '/images/hero/hero.webp', alt: { en: '', fr: '' }, width: 1920, height: 1080 }
  const catData = (images as any)[category]
  if (category === 'hero') {
    if (!catData) return fallback
    return typeof catData === 'object' && catData.src ? catData : { ...fallback, src: String(catData) }
  }
  if (!catData || !slug) return fallback
  const val = catData[slug]
  return typeof val === 'object' && val?.src ? val : fallback
}
