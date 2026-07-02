import { MetadataRoute } from 'next'
import { materials } from '@/data/products'
import { industries } from '@/data/industries'
import { cities, provinces } from '@/data/locations'
import { keywordPages } from '@/data/keyword-pages'
import { blogPosts } from '@/data/blog'
import { siteConfig } from '@/config/site-config'

const BASE_URL = `https://${siteConfig.domain}`

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable content-modification date for pages without their own date.
  // Bump this ONLY when core page content meaningfully changes — do NOT use
  // `new Date()`, which stamps every URL "changed today" on each deploy and
  // trains Google to distrust our lastmod (Search Central lastmod guidance).
  // Blog posts below still use their own real publish/update dates.
  const now = new Date('2026-07-01')
  const entries: MetadataRoute.Sitemap = []

  // ── Homepage ──
  entries.push({ url: BASE_URL, lastModified: now })
  entries.push({ url: `${BASE_URL}/fr`, lastModified: now })

  // ── About ──
  entries.push({ url: `${BASE_URL}/about`, lastModified: now })
  entries.push({ url: `${BASE_URL}/fr/a-propos`, lastModified: now })

  // ── Legal ──
  for (const [en, fr] of [['privacy', 'confidentialite'], ['terms', 'conditions']]) {
    entries.push({ url: `${BASE_URL}/${en}`, lastModified: now })
    entries.push({ url: `${BASE_URL}/fr/${fr}`, lastModified: now })
  }

  // ── Category pages ──
  for (const [en, fr] of [['products', 'produits'], ['industries', 'secteurs'], ['cities', 'villes'], ['contact', 'nous-joindre'], ['faq', 'faq'], ['blog', 'blogue']]) {
    entries.push({ url: `${BASE_URL}/${en}`, lastModified: now })
    entries.push({ url: `${BASE_URL}/fr/${fr}`, lastModified: now })
  }

  // ── Product detail pages ──
  for (const m of materials) {
    entries.push({ url: `${BASE_URL}/${m.slug}`, lastModified: now })
    entries.push({ url: `${BASE_URL}/fr/${m.slugFr ?? m.slug}`, lastModified: now })
  }

  // ── Industry detail pages ──
  for (const i of industries) {
    entries.push({ url: `${BASE_URL}/${i.slug}`, lastModified: now })
    entries.push({ url: `${BASE_URL}/fr/${i.slugFr ?? i.slug}`, lastModified: now })
  }

  // ── Province pages ──
  for (const p of provinces) {
    // Only include provinces that have cities
    const hasCities = cities.some(c => c.provinceSlug === p.slug)
    if (hasCities) {
      entries.push({ url: `${BASE_URL}/${p.slug}`, lastModified: now })
      entries.push({ url: `${BASE_URL}/fr/${p.slugFr ?? p.slug}`, lastModified: now })
    }
  }

  // ── City pages ──
  for (const c of cities) {
    entries.push({ url: `${BASE_URL}/${c.slug}`, lastModified: now })
    entries.push({ url: `${BASE_URL}/fr/${c.slug}`, lastModified: now })
  }

  // ── Keyword pages ──
  for (const kp of keywordPages) {
    entries.push({ url: `${BASE_URL}/${kp.slugEn}`, lastModified: now })
    entries.push({ url: `${BASE_URL}/fr/${kp.slugFr}`, lastModified: now })
  }

  // ── Blog posts ──
  for (const bp of blogPosts) {
    entries.push({ url: `${BASE_URL}/blog/${bp.slug}`, lastModified: new Date(bp.updatedAt || bp.publishedAt) })
    entries.push({ url: `${BASE_URL}/fr/blogue/${bp.slugFr ?? bp.slug}`, lastModified: new Date(bp.updatedAt || bp.publishedAt) })
  }

  // ── Geo-SEO pages (city × service matrix) — INTENTIONALLY EXCLUDED ──
  // The {city}/{service} matrix (~1256 EN+FR URLs) is near-duplicate
  // programmatic content. On a low-authority domain Google marks these
  // "Discovered/Crawled – currently not indexed" and they dilute crawl
  // budget away from the core pages above. Keep them out of the sitemap so
  // Google focuses on the strong core (homepage, products, industries,
  // cities, keyword pages, blog). The routes still exist and stay reachable
  // via internal links; re-add here once the domain has crawl authority.

  return entries
}
