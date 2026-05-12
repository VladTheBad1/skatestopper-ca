import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { materials } from '@/data/products'
import { industries } from '@/data/industries'
import { cities } from '@/data/locations'
import { keywordPages } from '@/data/keyword-pages'
import { faqs } from '@/data/faqs'
import { getProduct, getIndustry, getCity, getProvince, getAllProducts, getAllCities } from '@/lib/data'
import { provinces } from '@/data/locations'
import { siteConfig } from '@/config/site-config'
import {
  buildPageMeta,
  buildContactSchema,
  buildBreadcrumbSchema,
  buildProductSchema,
  buildServiceSchema,
  buildIndustryServiceSchema,
  buildSpeakableSchema,
  buildFAQSchema,
} from '@/lib/seo'
import ProductDetailPage from '@/components/pages/ProductDetailPage'
import IndustryDetailPage from '@/components/pages/IndustryDetailPage'
import CityDetailPage from '@/components/pages/CityDetailPage'
import KeywordDetailPage from '@/components/pages/KeywordDetailPage'
import ProvinceDetailPage from '@/components/pages/ProvinceDetailPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // FR routes use slugFr where available so /fr/bloque-skate resolves.
  const slugs: { slug: string }[] = []
  for (const m of materials) slugs.push({ slug: m.slugFr ?? m.slug })
  for (const i of industries) slugs.push({ slug: i.slugFr ?? i.slug })
  for (const c of cities) slugs.push({ slug: c.slug })
  for (const kp of keywordPages) slugs.push({ slug: kp.slugFr })
  for (const p of provinces) slugs.push({ slug: p.slug })
  return slugs
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug, 'fr')
  if (product) {
    return buildPageMeta({
      title: product.name,
      description: `${product.name} conçu pour les conditions canadiennes. ${product.priceRange}. Équipes cautionnées, LAPHO, prêt DDP au Canada.`,
      path: `/fr/${slug}`,
      enPath: `/${product.slug ?? slug}`,
      locale: 'fr',
    })
  }
  const industry = getIndustry(slug, 'fr')
  if (industry) {
    const indRec = (industry as { slug?: string })
    return buildPageMeta({
      title: `${siteConfig.nicheShortFr} pour ${industry.name}`,
      description: `Bloque-skate et dissuasifs anti-planche pour ${industry.name} au Canada — ingénierie estampillée, conformité LAPHO, équipes cautionnées, soumissions DDP.`,
      path: `/fr/${slug}`,
      enPath: `/${indRec.slug ?? slug}`,
      locale: 'fr',
    })
  }
  const city = getCity(slug, 'fr')
  if (city) {
    return buildPageMeta({
      title: `${siteConfig.nicheShortFr} à ${city.name}, ${city.provinceShort ?? city.province}`,
      description: `${siteConfig.nicheShortFr} fournis et installés à ${city.name}, ${city.province}. Conçus pour les conditions locales, équipes cautionnées, prêt DDP.`,
      path: `/fr/${slug}`,
      enPath: `/${slug}`,
      locale: 'fr',
      image: `/images/cities/${slug}-hero.webp`,
    })
  }
  const kp = keywordPages.find(k => k.slugFr === slug)
  if (kp) {
    return buildPageMeta({
      title: kp.titleFr,
      description: kp.descriptionFr,
      path: `/fr/${slug}`,
      enPath: `/${kp.slugEn}`,
      locale: 'fr',
    })
  }
  const province = getProvince(slug)
  if (province) {
    const provCities = getAllCities('fr').filter(c => c.provinceSlug === province.slug)
    return buildPageMeta({
      title: `${siteConfig.nicheShortFr} en ${province.nameFr}`,
      description: `${siteConfig.nicheShortFr} fournis et installés dans ${provCities.length} villes en ${province.nameFr}. Conçus pour les conditions locales, équipes cautionnées, prêt DDP.`,
      path: `/fr/${slug}`,
      enPath: `/${slug}`,
      locale: 'fr',
    })
  }
  return { title: siteConfig.brandName }
}

export default async function SlugPageFr({ params }: PageProps) {
  const { slug } = await params

  // ── Product Page ──
  const product = getProduct(slug, 'fr')
  if (product) {
    const material = materials.find(m => m.slug === slug)
    const allProducts = getAllProducts('fr').filter(p => p.slug !== slug).slice(0, 3)
    return (
      <>
        {material && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(material)) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Produits', url: '/fr/produits' },
            { name: product.name, url: `/fr/${slug}` },
          ])
        ) }} />
        <ProductDetailPage product={product} relatedProducts={allProducts} locale="fr" />
      </>
    )
  }

  // ── Industry Page ──
  const industry = getIndustry(slug, 'fr')
  if (industry) {
    const allProducts = getAllProducts('fr').slice(0, 3)
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryServiceSchema(industry, 'fr')) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Secteurs', url: '/fr/secteurs' },
            { name: industry.name, url: `/fr/${slug}` },
          ])
        ) }} />
        <IndustryDetailPage industry={industry} relatedProducts={allProducts} locale="fr" />
      </>
    )
  }

  // ── City Page ──
  const city = getCity(slug, 'fr')
  if (city) {
    const cityData = cities.find(c => c.slug === slug)!
    const allProducts = getAllProducts('fr').slice(0, 4)
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildContactSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildSpeakableSchema(['[data-speakable="true"]', 'h1', '.prose'])
        ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Villes', url: '/fr/villes' },
            { name: city.name, url: `/fr/${slug}` },
          ])
        ) }} />
        <CityDetailPage city={city} products={allProducts} locale="fr" />
      </>
    )
  }

  // ── Keyword Page ──
  const kp = keywordPages.find(k => k.slugFr === slug)
  if (kp) {
    const keywordFaqs = faqs.slice(0, 5).map(f => ({ q: f.questionFr, a: f.answerFr }))
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(keywordFaqs)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Produits', url: '/fr/produits' },
            { name: kp.nameFr, url: `/fr/${kp.slugFr}` },
          ])
        ) }} />
        <KeywordDetailPage kp={kp} locale="fr" />
      </>
    )
  }

  // ── Province Page ──
  const province = getProvince(slug)
  if (province) {
    const provCities = getAllCities('fr').filter(c => c.provinceSlug === province.slug)
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Villes', url: '/fr/villes' },
            { name: province.nameFr, url: `/fr/${slug}` },
          ])
        ) }} />
        <ProvinceDetailPage province={province} cities={provCities} locale="fr" />
      </>
    )
  }

  notFound()
}
