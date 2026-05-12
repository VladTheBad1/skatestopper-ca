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
  const slugs: { slug: string }[] = []
  for (const m of materials) slugs.push({ slug: m.slug })
  for (const i of industries) slugs.push({ slug: i.slug })
  for (const c of cities) slugs.push({ slug: c.slug })
  for (const kp of keywordPages) slugs.push({ slug: kp.slugEn })
  for (const p of provinces) slugs.push({ slug: p.slug })
  return slugs
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug, 'en')
  if (product) {
    return buildPageMeta({
      title: product.name,
      description: `${product.name} engineered for Canadian conditions. ${product.priceRange}. Bonded install crews, AODA-compliant, RFP-ready across Canada.`,
      path: `/${slug}`,
      frPath: `/fr/${product.slugFr ?? slug}`,
      image: product.image,
    })
  }
  const industry = getIndustry(slug, 'en')
  if (industry) {
    const indRec = (industry as { slugFr?: string })
    return buildPageMeta({
      title: `${siteConfig.nicheShortEn} for ${industry.name}`,
      description: `Skate stoppers and anti-skateboard deterrents for ${industry.name} across Canada — stamped engineering, AODA-compliant, bonded install crews, RFP-ready procurement.`,
      path: `/${slug}`,
      frPath: `/fr/${indRec.slugFr ?? slug}`,
      image: industry.image,
    })
  }
  const city = getCity(slug, 'en')
  if (city) {
    return buildPageMeta({
      title: `${siteConfig.nicheShortEn} in ${city.name}, ${city.provinceShort ?? city.province}`,
      description: `${siteConfig.nicheShortEn} supplied + installed in ${city.name}, ${city.province}. Climate-engineered for local conditions, bonded crews, RFP-ready.`,
      path: `/${slug}`,
      frPath: `/fr/${slug}`,
      image: `/images/cities/${slug}-hero.webp`,
    })
  }
  const kp = keywordPages.find(k => k.slugEn === slug)
  if (kp) {
    return buildPageMeta({
      title: kp.titleEn,
      description: kp.descriptionEn,
      path: `/${slug}`,
      frPath: `/fr/${kp.slugFr}`,
    })
  }
  const province = getProvince(slug)
  if (province) {
    const provCities = getAllCities('en').filter(c => c.provinceSlug === province.slug)
    return buildPageMeta({
      title: `${siteConfig.nicheShortEn} in ${province.name}`,
      description: `${siteConfig.nicheShortEn} supplied + installed across ${provCities.length} cities in ${province.name}. Climate-engineered, bonded crews, RFP-ready.`,
      path: `/${slug}`,
      frPath: `/fr/${slug}`,
    })
  }
  return { title: siteConfig.brandName }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params

  // ── Product Page ──
  const product = getProduct(slug, 'en')
  if (product) {
    const material = materials.find(m => m.slug === slug)
    const allProducts = getAllProducts('en').filter(p => p.slug !== slug).slice(0, 3)
    return (
      <>
        {material && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(material)) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' },
            { name: product.name, url: `/${slug}` },
          ])
        ) }} />
        <ProductDetailPage product={product} relatedProducts={allProducts} locale="en" />
      </>
    )
  }

  // ── Industry Page ──
  const industry = getIndustry(slug, 'en')
  if (industry) {
    const allProducts = getAllProducts('en').slice(0, 3)
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryServiceSchema(industry, 'en')) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Industries', url: '/industries' },
            { name: industry.name, url: `/${slug}` },
          ])
        ) }} />
        <IndustryDetailPage industry={industry} relatedProducts={allProducts} locale="en" />
      </>
    )
  }

  // ── City Page ──
  const city = getCity(slug, 'en')
  if (city) {
    const cityData = cities.find(c => c.slug === slug)!
    const allProducts = getAllProducts('en').slice(0, 4)
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildContactSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildSpeakableSchema(['[data-speakable="true"]', 'h1', '.prose'])
        ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Cities', url: '/cities' },
            { name: city.name, url: `/${slug}` },
          ])
        ) }} />
        <CityDetailPage city={city} products={allProducts} locale="en" />
      </>
    )
  }

  // ── Keyword Page ──
  const kp = keywordPages.find(k => k.slugEn === slug)
  if (kp) {
    const keywordFaqs = faqs.slice(0, 5).map(f => ({ q: f.questionEn, a: f.answerEn }))
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(keywordFaqs)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' },
            { name: kp.nameEn, url: `/${kp.slugEn}` },
          ])
        ) }} />
        <KeywordDetailPage kp={kp} locale="en" />
      </>
    )
  }

  // ── Province Page ──
  const province = getProvince(slug)
  if (province) {
    const provCities = getAllCities('en').filter(c => c.provinceSlug === province.slug)
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Cities', url: '/cities' },
            { name: province.name, url: `/${slug}` },
          ])
        ) }} />
        <ProvinceDetailPage province={province} cities={provCities} locale="en" />
      </>
    )
  }

  notFound()
}
