import { notFound } from 'next/navigation'
import { cities } from '@/data/locations'
import { materials } from '@/data/products'
import { industries } from '@/data/industries'
import { generateAllGeoParams, parseServiceSlug, getCityMaterialFAQs, getCityIndustryFAQs } from '@/data/geo-seo'
import {
  buildGeoServiceMeta,
  buildGeoSectorMeta,
  buildContactSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '@/lib/seo'
import type { Metadata } from 'next'
import KeywordPage from '@/components/KeywordPage'

interface PageProps {
  params: Promise<{ slug: string; service: string }>
}

export async function generateStaticParams() {
  return generateAllGeoParams().map(p => ({ slug: p.slug, service: p.service }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: city, service } = await params
  const cityData = cities.find((c) => c.slug === city)
  if (!cityData) return {}

  const parsed = parseServiceSlug(service)
  if (!parsed) return {}

  if (parsed.type === 'material') {
    const materialData = materials.find((m) => m.slug === parsed.sourceSlug)
    if (materialData) return buildGeoServiceMeta(cityData, materialData, 'en')
  }

  if (parsed.type === 'industry') {
    const industryData = industries.find((i) => i.slug === parsed.sourceSlug)
    if (industryData) return buildGeoSectorMeta(cityData, industryData, 'en')
  }

  return {}
}

export default async function GeoPage({ params }: PageProps) {
  const { slug: city, service } = await params
  const cityData = cities.find((c) => c.slug === city)
  if (!cityData) notFound()

  const parsed = parseServiceSlug(service)
  if (!parsed) notFound()

  // Determine service name for schema
  let serviceName = ''
  let faqItems: { q: string; a: string }[] = []

  if (parsed.type === 'material') {
    const material = materials.find(m => m.slug === parsed.sourceSlug)
    if (!material) notFound()
    serviceName = material.nameEn
    const cityFaqs = getCityMaterialFAQs(cityData.name, material.nameEn, 'en')
    faqItems = cityFaqs.map(f => ({ q: f.question, a: f.answer }))
  } else {
    const industry = industries.find(i => i.slug === parsed.sourceSlug)
    if (!industry) notFound()
    serviceName = industry.nameEn
    const cityFaqs = getCityIndustryFAQs(cityData.name, industry.nameEn, 'en')
    faqItems = cityFaqs.map(f => ({ q: f.question, a: f.answer }))
  }

  return (
    <>
      {/* Contact schema with service */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildContactSchema()
      ) }} />

      {/* Breadcrumb schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: cityData.name, url: `/${city}` },
          { name: serviceName, url: `/${city}/${service}` },
        ])
      ) }} />

      {/* FAQ schema */}
      {faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          buildFAQSchema(faqItems)
        ) }} />
      )}

      <KeywordPage slug={`${city}/${service}`} locale="en" />
    </>
  )
}
