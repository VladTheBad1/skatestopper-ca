import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import RelatedServices from '@/components/RelatedServices'
import RelatedCities from '@/components/RelatedCities'
import { t } from '@/lib/data'
import { staticUrl, productUrl } from '@/lib/routes'
import { markdownToHtml } from '@/lib/markdown'
import { siteConfig } from '@/config/site-config'

interface City {
  slug: string
  name: string
  province: string
  population?: number
  description: string
  localHookEn?: string
  localHookFr?: string
  [key: string]: any
}

interface Product {
  name: string
  slug: string
  slugEn?: string
  slugFr?: string
  image?: string
  priceRange?: string
}

interface CityDetailPageProps {
  city: City
  products: Product[]
  locale: 'en' | 'fr'
}

/**
 * CityDetailPage — niche-neutral. All labels from translations.
 * All colors from CSS vars. All URLs from route helpers. No framer-motion.
 */
export default function CityDetailPage({ city, products, locale }: CityDetailPageProps) {
  const isEn = locale === 'en'

  return (
    <main>
      <PageHero
        title={`${t('cityPage.methodsTitle', locale) || siteConfig.nicheEn} ${isEn ? 'in' : 'à'} ${city.name}.`}
        subtitle={isEn
          ? `Canadian-engineered skate stoppers — stamped engineering, climate-rated stainless, bylaw-compliant install.`
          : `Bloque-skate conçus au Canada — ingénierie estampillée, inox climat-adapté, installation conforme aux règlements.`}
        imageSrc={`/images/cities/${city.slug}-hero.webp`}
        imageAlt={isEn
          ? `Downtown ${city.name}, ${city.province} — commercial plaza context where stainless skate stoppers and skateboard deterrents are installed on ledges, benches, and handrails`
          : `Centre-ville de ${city.name}, ${city.province} — contexte de place commerciale où les bloque-skate et dissuasifs anti-planche sont installés sur rebords, bancs et mains courantes`}
        breadcrumbs={[
          { label: t('nav.cities', locale), href: staticUrl('cities', locale) },
          { label: city.name },
        ]}
        locale={locale}
      />

      {/* Stats bar */}
      <div className="bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1500px] px-6 md:px-8 py-6 grid grid-cols-3 gap-4 md:flex md:flex-wrap md:gap-12">
          <div>
            <span className="text-[var(--primary)] font-extrabold text-2xl">
              {city.population ? (city.population > 1_000_000 ? `${(city.population / 1_000_000).toFixed(1)}M` : `${Math.round(city.population / 1000)}K`) : '—'}
            </span>
            <p className="eyebrow text-[var(--text-light)] mt-1">{isEn ? 'Population served' : 'Population desservie'}</p>
          </div>
          <div>
            <span className="text-[var(--primary)] font-extrabold text-2xl">{t('stats.response', locale) || '24h'}</span>
            <p className="eyebrow text-[var(--text-light)] mt-1">{t('stats.responseSub', locale) || (isEn ? 'Quote response' : 'Réponse soumission')}</p>
          </div>
          <div>
            <span className="text-[var(--primary)] font-extrabold text-2xl">{products.length}</span>
            <p className="eyebrow text-[var(--text-light)] mt-1">{t('stats.methodsSub', locale) || (isEn ? 'Hardware variants' : 'Variantes matériel')}</p>
          </div>
        </div>
      </div>

      {/* City description */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <span className="eyebrow text-[var(--primary)] block mb-3">
            {t('cityPage.onTheGround', locale)}
          </span>
          <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight text-[var(--text)] mb-6">
            {siteConfig.nicheEn} {isEn ? 'in' : 'à'} {city.name}.
          </h2>
          <article
            className="prose prose-lg max-w-none text-[var(--text-light)] prose-headings:text-[var(--text)] prose-headings:font-extrabold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-[1.75] prose-strong:text-[var(--text)] prose-li:my-1"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(city.description) }}
          />
        </div>
      </section>

      {/* City fact card — structured climate + target zones (SEO/GEO scannable) */}
      <section className="bg-[var(--bg-section)] py-14 md:py-20 border-y border-[var(--border-light)]">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <span className="eyebrow text-[var(--accent)] block mb-3">
            {isEn ? 'Local spec sheet' : 'Fiche locale'}
          </span>
          <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight text-[var(--text)] mb-10">
            {isEn ? `What ${city.name} actually needs.` : `Ce que ${city.name} exige vraiment.`}
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <h3 className="font-bold text-lg text-[var(--text)] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[var(--accent)] inline-block" aria-hidden="true" />
                {isEn ? 'Climate & material spec' : 'Climat et matériel'}
              </h3>
              <dl className="divide-y divide-[var(--border-light)] text-[15px]">
                {city.climateZone && (
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[var(--text-light)]">{isEn ? 'Climate zone' : 'Zone climatique'}</dt>
                    <dd className="font-semibold text-[var(--text)]">{city.climateZone}</dd>
                  </div>
                )}
                {typeof city.avgWinterTempC === 'number' && (
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[var(--text-light)]">{isEn ? 'Average winter' : 'Hiver moyen'}</dt>
                    <dd className="font-semibold text-[var(--text)]">{city.avgWinterTempC}°C</dd>
                  </div>
                )}
                {typeof city.annualSnowfallCm === 'number' && (
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[var(--text-light)]">{isEn ? 'Annual snowfall' : 'Neige annuelle'}</dt>
                    <dd className="font-semibold text-[var(--text)]">{city.annualSnowfallCm} cm</dd>
                  </div>
                )}
                {typeof city.frostDepthM === 'number' && (
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[var(--text-light)]">{isEn ? 'Frost depth' : 'Profondeur de gel'}</dt>
                    <dd className="font-semibold text-[var(--text)]">{city.frostDepthM} m</dd>
                  </div>
                )}
                {city.corrosionRisk && (
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[var(--text-light)]">{isEn ? 'Corrosion risk' : 'Risque de corrosion'}</dt>
                    <dd className="font-semibold text-[var(--text)] capitalize">{city.corrosionRisk}</dd>
                  </div>
                )}
                {city.transitAuthority && (
                  <div className="flex justify-between py-2.5 gap-4">
                    <dt className="text-[var(--text-light)] flex-shrink-0">{isEn ? 'Transit authority' : 'Société de transport'}</dt>
                    <dd className="font-semibold text-[var(--text)] text-right">{city.transitAuthority}</dd>
                  </div>
                )}
                {typeof city.transitShelterCount === 'number' && city.transitShelterCount > 0 && (
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[var(--text-light)]">{isEn ? 'Transit shelters' : 'Abribus'}</dt>
                    <dd className="font-semibold text-[var(--text)]">{city.transitShelterCount.toLocaleString()}</dd>
                  </div>
                )}
              </dl>
            </div>
            {Array.isArray(city.popularSkateZones) && city.popularSkateZones.length > 0 && (
              <div>
                <h3 className="font-bold text-lg text-[var(--text)] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[var(--accent)] inline-block" aria-hidden="true" />
                  {isEn ? 'High-target locations' : 'Zones à risque élevé'}
                </h3>
                <ul className="space-y-2.5 text-[15px]">
                  {city.popularSkateZones.map((z: string) => (
                    <li key={z} className="flex items-start gap-3">
                      <span className="text-[var(--accent)] font-bold mt-0.5">→</span>
                      <span className="text-[var(--text)]">{z}</span>
                    </li>
                  ))}
                </ul>
                {city.propertyMaintenanceContext && (
                  <p className="mt-6 text-[14px] leading-[1.7] text-[var(--text-light)] border-l-2 border-[var(--accent)] pl-4">
                    {city.propertyMaintenanceContext}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Local hook / unique city paragraph */}
      {(city.localHookEn || city.localHookFr) && (
        <section className="bg-[var(--bg-section)] py-12">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            <div
              className="prose prose-lg max-w-none text-[var(--text)] italic"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(isEn ? city.localHookEn ?? '' : city.localHookFr ?? '') }}
            />
          </div>
        </section>
      )}

      {/* Available services/products */}
      <section className="py-16">
        <div className="mx-auto max-w-[1500px] px-6 md:px-8">
          <span className="eyebrow text-[var(--primary)] block mb-3">
            {t('cityPage.availableMethods', locale) || (isEn ? 'Available hardware' : 'Matériel disponible')}
          </span>
          <h2 className="font-extrabold text-2xl tracking-tight text-[var(--text)] mb-8">
            {t('nav.products', locale)} {isEn ? 'for' : 'pour'} {city.name}.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(p => (
              <Link
                key={p.slug}
                /* RelatedServices link — city → product detail (used by link-architecture-gate's City→Geo check). */
                href={productUrl(p.slug, p.slugFr || p.slug, locale)}
                className="group block overflow-hidden rounded-lg border border-[var(--line)] hover:border-[var(--primary)] transition-colors"
              >
                {p.image && (
                  <div className="relative h-32 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-bold text-sm text-[var(--text)]">{p.name}</h3>
                  <span className="text-[var(--primary)] text-xs">{p.priceRange}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
<RelatedServices currentCitySlug={city.slug} locale={locale} />
      <RelatedCities currentCitySlug={city.slug} locale={locale} />
    </main>
  )
}
