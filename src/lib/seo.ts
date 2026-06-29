import { Metadata } from 'next';
import { Location as City } from '@/data/locations';
import { Material } from '@/data/products';
import { Industry } from '@/data/industries';
import { siteConfig, getSocialLinks } from '@/config/site-config';
import { stripMarkdown } from '@/lib/markdown';

const SITE_URL = `https://${siteConfig.domain}`;

// ─────────────────────────────────────────────
// Meta Builder — EVERY page should use this
// ─────────────────────────────────────────────

/**
 * Build complete page metadata with proper OG, canonical, hreflang, and twitter.
 * Every page should use this instead of raw { title, description } objects.
 */
export function buildPageMeta(opts: {
  title: string
  description: string
  path: string           // e.g. '/products' or '/fr/produits'
  frPath?: string        // FR equivalent path (for hreflang)
  enPath?: string        // EN equivalent path (for hreflang from FR pages)
  locale?: 'en' | 'fr'
  image?: string         // page-specific OG image path
}): Metadata {
  const { title, description, path, frPath, enPath, locale = 'en', image } = opts
  const url = `${SITE_URL}${path}`
  // OG image must resolve (og-image-resolves-gate). Default → /og-default.png (1200×630).
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/og-default.png`
  const isEn = locale === 'en'

  // hreflang: ALWAYS emit en-CA + fr-CA + x-default (Profile C MUST).
  const enUrl = isEn ? url : (enPath ? `${SITE_URL}${enPath}` : url)
  const frUrl = !isEn ? url : (frPath ? `${SITE_URL}${frPath}` : url)
  const alternates: Metadata['alternates'] = {
    canonical: url,
    languages: {
      'en-CA': enUrl,
      'fr-CA': frUrl,
      'x-default': enUrl,
    },
  }

  // Title-doubling guard: strip trailing " | brandName" before returning,
  // since root layout's title.template appends it.
  const brandSuffix = new RegExp(`\\s*\\|\\s*${siteConfig.brandName.replace(/\./g, '\\.')}\\s*$`)
  const cleanTitle = title.replace(brandSuffix, '').trim()

  return {
    title: cleanTitle,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brandName,
      locale: isEn ? 'en_CA' : 'fr_CA',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// ─────────────────────────────────────────────
// JSON-LD Schema Builders
// ─────────────────────────────────────────────

/**
 * Build Organization + WebSite JSON-LD for homepage.
 * Renders as array — map over it to create multiple <script> tags.
 *
 * Per Google guidance + factory B.3: WebSite SD belongs ONLY on the
 * canonical domain root (one URL per site). Pass `includeWebSite=false`
 * for locale homepages, /about, etc. to avoid duplicate WebSite SD across
 * the site (which the schema-antipattern gate warns about).
 */
export function buildOrganizationSchema(opts: { includeWebSite?: boolean } = {}) {
  const includeWebSite = opts.includeWebSite ?? true
  const socialLinks = getSocialLinks()

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: siteConfig.descriptionEn,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+1${siteConfig.phoneRaw}`,
      contactType: 'customer service',
      areaServed: 'CA',
      availableLanguage: ['English', 'French'],
    },
    ...(socialLinks.length > 0 && { sameAs: socialLinks }),
  }

  if (!includeWebSite) return [org]

  return [
    org,
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.brandName,
      url: SITE_URL,
      // (No on-site search endpoint exposed in JSON-LD.)
    },
  ]
}

/**
 * Build Service JSON-LD for city pages and geo cross-pages.
 * Profile C MUST use Service — we have no verified per-city storefront.
 */
export function buildCityServiceSchema(city: City, service?: string) {
  const niche = siteConfig.nicheEn
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service ? `${service} in ${city.name}` : `${niche} in ${city.name}`,
    description: `Anti-skateboarding deterrent hardware (skate stoppers — NOT roller skate toe stops) supplied, installed, and maintained in ${city.name}, ${city.province}.`,
    serviceType: service ?? `Anti-skateboarding hardware installation`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      telephone: `+1-${siteConfig.phoneRaw}`,
      email: siteConfig.email,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      ...(city.lat && city.lng && {
        geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
      }),
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        ...(city.lat && { latitude: city.lat }),
        ...(city.lng && { longitude: city.lng }),
      },
      geoRadius: '50000',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      price: siteConfig.pricing.basePrice,
      url: `${SITE_URL}/${city.slug}`,
    },
  };
}

/**
 * Build Organization+ContactPoint schema for /contact page.
 * Profile C uses Organization (not the legacy on-prem business type — we
 * have no verified storefront address per location). schema-antipattern-gate
 * enforces this.
 */
export function buildContactSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+1${siteConfig.phoneRaw}`,
        contactType: 'customer service',
        areaServed: 'CA',
        availableLanguage: ['English', 'French'],
      },
      {
        '@type': 'ContactPoint',
        email: siteConfig.email,
        contactType: 'sales',
        areaServed: 'CA',
      },
    ],
  }
}

/**
 * Build BreadcrumbList JSON-LD.
 */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Build Product JSON-LD for product/material detail pages.
 * NO aggregateRating — Google penalizes hardcoded fake reviews.
 */
export function buildProductSchema(material: Material) {
  const priceMatch = (material.priceRange ?? "").match(/\$(\d+)/);
  const price = priceMatch ? priceMatch[1] : siteConfig.pricing.basePrice;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: material.nameEn,
    description: stripMarkdown(material.descriptionEn),
    image: `${SITE_URL}${material.image ?? `/images/products/${material.slug}.webp`}`,
    brand: { '@type': 'Brand', name: siteConfig.brandName },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice: price,
      offerCount: '6',
      // No `availability` — schema-antipattern-gate.
    },
    // NOTE: aggregateRating intentionally omitted.
  };
}

/**
 * Build FAQPage JSON-LD.
 */
export function buildFAQSchema(faqItems: { q: string; a: string }[]) {
  // Schema.org consumers (Google) read text as plain prose. Strip markdown so
  // **bold** doesn't surface as literal asterisks in rich-result snippets.
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: stripMarkdown(faq.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripMarkdown(faq.a),
      },
    })),
  };
}

/**
 * Build Service schema for industry / sector landing pages.
 * Profile C MUST: industry pages need Service schema with areaServed=CA.
 */
export function buildIndustryServiceSchema(industry: {
  slug: string;
  nameEn?: string;
  nameFr?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  image?: string;
  name?: string;
  description?: string;
}, locale: 'en' | 'fr' = 'en') {
  const name = locale === 'en' ? (industry.nameEn || industry.name || '') : (industry.nameFr || industry.name || '')
  const desc = locale === 'en' ? (industry.descriptionEn || industry.description || '') : (industry.descriptionFr || industry.description || '')
  const img = industry.image ?? `/images/industries/${industry.slug}.webp`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Anti-skateboarding hardware installation for ${name}`,
    name: `${siteConfig.nicheEn} for ${name}`,
    description: stripMarkdown(desc).slice(0, 280),
    image: `${SITE_URL}${img}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    url: locale === 'en' ? `${SITE_URL}/${industry.slug}` : `${SITE_URL}/fr/${industry.slug}`,
  }
}

/**
 * Build Service schema for service/product detail pages.
 * Use instead of Product schema when the offering is a service, not a physical product.
 */
export function buildServiceSchema(material: Material) {
  const priceMatch = (material.priceRange ?? "").match(/\$(\d+)/);
  const price = priceMatch ? priceMatch[1] : siteConfig.pricing.basePrice;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: material.nameEn,
    description: stripMarkdown(material.descriptionEn),
    image: `${SITE_URL}${material.image ?? `/images/products/${material.slug}.webp`}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice: price,
      offerCount: '6',
      // No `availability` — schema-antipattern-gate.
    },
    // NOTE: aggregateRating intentionally omitted.
  };
}

/**
 * Build Speakable schema — tells voice assistants which content to read.
 * Add to homepage and city pages for voice search optimization.
 */
export function buildSpeakableSchema(cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}

// Instructional schema removed — Google deprecated for non-recipe content (2024).
// schema-antipattern-gate flags this kind of usage. Don't reintroduce.

// ─────────────────────────────────────────────
// Geo-specific Meta Builders
// ─────────────────────────────────────────────

// Geo meta builders — niche-neutral.
// All copy is derived from siteConfig.nicheEn / nicheFr, the passed-in
// material or industry name, and the city. No hardcoded niche terms.
// The niche-contamination-gate will fail the build if any prior-niche
// vocabulary (rental / delivery / sanitation / etc.) is reintroduced.

// Province short-code helper (titles must stay ≤ 60 chars per title-length-gate).
function provShort(city: City): string {
  const c = city as City & { provinceShort?: string }
  return c.provinceShort ?? city.province
}

export function buildGeoMaterialMeta(city: City, material: Material, locale: 'en' | 'fr'): Metadata {
  if (locale === 'fr') {
    return buildPageMeta({
      title: `${material.nameFr.split(' — ')[0]} à ${city.name}, ${provShort(city)}`,
      description: `${material.nameFr} à ${city.name}, ${city.province}. Conception, installation et entretien partout au Canada. Obtenez une soumission gratuite.`,
      path: `/fr/${city.slug}/${material.slugFr ?? material.slug}`,
      enPath: `/${city.slug}/${material.slug}`,
      locale: 'fr',
      image: material.image,
    })
  }

  return buildPageMeta({
    title: `${material.nameEn.split(' — ')[0]} in ${city.name}, ${provShort(city)}`,
    description: `${material.nameEn} in ${city.name}, ${city.province}. Engineered, installed, and maintained for Canadian climate. Get a free quote.`,
    path: `/${city.slug}/${material.slug}`,
    frPath: `/fr/${city.slug}/${material.slugFr ?? material.slug}`,
    locale: 'en',
    image: material.image,
  })
}

export function buildGeoIndustryMeta(city: City, industry: Industry, locale: 'en' | 'fr'): Metadata {
  if (locale === 'fr') {
    return buildPageMeta({
      title: `${industry.nameFr} à ${city.name}`,
      description: `${siteConfig.nicheFr} pour ${industry.nameFr.toLowerCase()} à ${city.name}, ${city.province}. Conception canadienne, installation et entretien.`,
      path: `/fr/${city.slug}/${industry.slugFr ?? industry.slug}`,
      enPath: `/${city.slug}/${industry.slug}`,
      locale: 'fr',
      image: industry.image,
    })
  }

  return buildPageMeta({
    // Industry geo titles drop province (industry names are already long).
    title: `${industry.nameEn} in ${city.name}`,
    description: `${siteConfig.nicheEn} for ${industry.nameEn.toLowerCase()} in ${city.name}, ${city.province}. Engineered, installed, and maintained Canada-wide.`,
    path: `/${city.slug}/${industry.slug}`,
    frPath: `/fr/${city.slug}/${industry.slugFr ?? industry.slug}`,
    locale: 'en',
    image: industry.image,
  })
}

// Aliases for different naming conventions across sites
export const buildGeoServiceMeta = buildGeoMaterialMeta
export const buildGeoSectorMeta = buildGeoIndustryMeta
