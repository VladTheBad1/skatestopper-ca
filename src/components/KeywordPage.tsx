import { cities } from '@/data/locations'
import { services } from '@/data/products'
import { industries } from '@/data/industries'
import { parseServiceSlug, getCityMaterialFAQs, getCityIndustryFAQs } from '@/data/geo-seo'
import { siteConfig } from '@/config/site-config'
import { t } from '@/lib/data'
import { contactUrl } from '@/lib/routes'
import { markdownToHtml, getFirstParagraph } from '@/lib/markdown'
import FAQSection from './FAQSection'
import RelatedCities from './RelatedCities'
import RelatedServices from './RelatedServices'
import PageHero from './PageHero'
import Link from 'next/link'

interface KeywordPageProps {
  slug: string
  locale: 'en' | 'fr'
}

/**
 * KeywordPage (Geo page component) — niche-neutral.
 * City-specific content driven by data fields. Labels from translations.
 * URLs from route helpers. Colors from CSS variables.
 */
export default function KeywordPage({ slug, locale }: KeywordPageProps) {
  const isEn = locale === 'en'
  const [citySlug, serviceSlug] = slug.split('/')
  const city = cities.find(c => c.slug === citySlug)
  if (!city) return null

  const parsed = parseServiceSlug(serviceSlug)
  if (!parsed) return null

  // Look up the actual material or industry record
  const material = services.find(m => m.slug === parsed.sourceSlug)
  const industry = industries.find(i => i.slug === parsed.sourceSlug)
  const record = material ?? industry

  const serviceName = isEn
    ? (record?.nameEn ?? parsed.sourceSlug)
    : (record?.nameFr ?? parsed.sourceSlug)
  const serviceDesc = isEn
    ? (record?.descriptionEn ?? '')
    : (record?.descriptionFr ?? '')

  // Get FAQs — functions expect strings
  const isService = parsed.type === 'material'
  const rawFaqs = isService
    ? getCityMaterialFAQs(city.name, parsed.sourceSlug, locale)
    : getCityIndustryFAQs(city.name, parsed.sourceSlug, locale)
  // Pre-render markdown server-side so the answer prop in the RSC payload is
  // HTML, not raw markdown. FAQSection's renderInlineMd path still safe.
  const faqItems = rawFaqs.map(f => ({ question: f.question, answer: markdownToHtml(f.answer) }))

  return (
    <main id="main-content">
      <PageHero
        title={`${serviceName} ${isEn ? 'in' : 'à'} ${city.name}, ${city.province}`}
        subtitle={`${siteConfig.brandName} — ${isEn ? 'Canadian-built skate stoppers, free site assessment' : 'bloque-skate fabriqués au Canada, évaluation gratuite'}`}
        breadcrumbs={[
          { label: city.name, href: isEn ? `/${citySlug}` : `/fr/${citySlug}` },
          { label: serviceName },
        ]}
        locale={locale}
      />

      {/* City-specific stats */}
      <section className="bg-[var(--bg-dark)] text-white py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {city.avgWinterTempC !== undefined && (
              <div>
                <span className="text-[var(--accent)] font-extrabold text-2xl">{city.avgWinterTempC}°C</span>
                <p className="text-white/80 text-xs mt-1 font-medium tracking-wide uppercase">{isEn ? 'Avg winter temp' : 'Temp. hiver moy.'}</p>
              </div>
            )}
            {city.frostDepthM !== undefined && (
              <div>
                <span className="text-[var(--accent)] font-extrabold text-2xl">{city.frostDepthM}m</span>
                <p className="text-white/80 text-xs mt-1 font-medium tracking-wide uppercase">{isEn ? 'Frost depth' : 'Profondeur gel'}</p>
              </div>
            )}
            {city.annualSnowfallCm !== undefined && (
              <div>
                <span className="text-[var(--accent)] font-extrabold text-2xl">{city.annualSnowfallCm}cm</span>
                <p className="text-white/80 text-xs mt-1 font-medium tracking-wide uppercase">{isEn ? 'Annual snowfall' : 'Chutes de neige annuelles'}</p>
              </div>
            )}
            {city.population && (
              <div>
                <span className="text-[var(--accent)] font-extrabold text-2xl">
                  {city.population > 1_000_000 ? `${(city.population / 1_000_000).toFixed(1)}M` : `${Math.round(city.population / 1000)}K`}
                </span>
                <p className="text-white/80 text-xs mt-1 font-medium tracking-wide uppercase">{isEn ? 'Population' : 'Population'}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* §2.11.10 City spec table for geo pages — comparison data tabular */}
      <section className="py-12 bg-[var(--bg-section)]">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="font-extrabold text-2xl mb-6 text-[var(--text)]">
            {isEn ? `${city.name} install spec at a glance` : `Spécif d’installation à ${city.name}`}
          </h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--text)]">
                <th className="text-left py-3 pr-4 font-bold">{isEn ? 'Parameter' : 'Paramètre'}</th>
                <th className="text-left py-3 pr-4 font-bold">{city.name}</th>
                <th className="text-left py-3 font-bold">{isEn ? 'Notes' : 'Notes'}</th>
              </tr>
            </thead>
            <tbody>
              {city.avgWinterTempC !== undefined && (
                <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">{isEn ? 'Average winter temp' : 'Temp. hiver moyenne'}</td><td className="py-3 pr-4">{city.avgWinterTempC} °C</td><td className="py-3 text-[var(--text-light)]">{isEn ? 'Drives stainless grade choice' : 'Détermine le grade d’inox'}</td></tr>
              )}
              {city.frostDepthM !== undefined && (
                <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">{isEn ? 'Frost depth (NBCC)' : 'Profondeur de gel (CNB)'}</td><td className="py-3 pr-4">{city.frostDepthM} m</td><td className="py-3 text-[var(--text-light)]">{isEn ? 'Concrete-set anchor minimum embedment' : 'Profondeur d’ancrage béton minimale'}</td></tr>
              )}
              {city.annualSnowfallCm !== undefined && (
                <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">{isEn ? 'Annual snowfall' : 'Chutes de neige'}</td><td className="py-3 pr-4">{city.annualSnowfallCm} cm</td><td className="py-3 text-[var(--text-light)]">{isEn ? 'Wear + freeze-thaw cycling' : 'Usure + cycles gel-dégel'}</td></tr>
              )}
              <tr><td className="py-3 pr-4">{isEn ? 'Recommended grade' : 'Grade recommandé'}</td><td className="py-3 pr-4">{(city.avgWinterTempC ?? 0) > -5 && (city as { coastal?: boolean }).coastal ? '316L marine' : (city.avgWinterTempC ?? 0) > 0 ? '316' : '304'}</td><td className="py-3 text-[var(--text-light)]">{isEn ? 'Per Canadian climate zone' : 'Selon zone climatique'}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Service description */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="font-extrabold text-3xl tracking-tight text-[var(--text)] mb-6">
            {isEn ? `Why ${serviceName} works in ${city.name}` : `Pourquoi ${serviceName} convient à ${city.name}`}
          </h2>
          <p className="text-[var(--text-light)] text-lg leading-relaxed mb-8">
            {/* Lead: just the FIRST paragraph (no Infinity — produced one
                 2.4 KB <p> with 16 sentences, failing §2.11.14). */}
            {getFirstParagraph(serviceDesc, 280)}
          </p>
          {serviceDesc && (
            <article
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(serviceDesc) }}
            />
          )}
        </div>
      </section>

      {/* What you get */}
      <section className="bg-[var(--bg-section)] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <h2 className="font-extrabold text-2xl text-[var(--text)] mb-8">
            {t('geoPage.whatYouGet', locale) || (isEn ? `What you get in ${city.name}` : `Ce que vous obtenez à ${city.name}`)}
          </h2>
          <div className="text-center mt-8">
            <Link
              href={contactUrl(locale)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:opacity-90 text-white font-bold rounded-lg transition-all"
            >
              {t('nav.getQuote', locale)}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && <FAQSection faqs={faqItems} locale={locale} />}
<RelatedServices currentCitySlug={citySlug} locale={locale} />
      <RelatedCities currentCitySlug={citySlug} locale={locale} />
    </main>
  )
}
