import Link from 'next/link'
import { cities } from '@/data/locations'
import { geoUrl } from '@/lib/routes'
import { t } from '@/lib/data'

interface ServiceCitiesProps {
  serviceSlug: string
  serviceSlugFr?: string
  locale: 'en' | 'fr'
  limit?: number
}

/**
 * ServiceCities — shows which cities offer this service.
 * NO serviceSuffix. URL pattern from route helper.
 */
export default function ServiceCities({ serviceSlug, serviceSlugFr, locale, limit = 12 }: ServiceCitiesProps) {
  const displayCities = cities.slice(0, limit)
  const frSlug = serviceSlugFr || serviceSlug

  return (
    <section className="bg-[var(--bg-dark)] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <h3 className="text-white font-bold text-xl mb-8">
          {t('cityPage.availableMethods', locale) || (locale === 'en' ? 'Available In These Cities' : 'Disponible dans ces villes')}
        </h3>
        <div className="flex flex-wrap gap-3">
          {displayCities.map(city => (
            <Link
              key={city.slug}
              href={geoUrl(city.slug, serviceSlug, frSlug, locale)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
            >
              {city.name}
            </Link>
          ))}
          {cities.length > limit && (
            <span className="px-4 py-2 text-white/50 text-sm">
              +{cities.length - limit} {locale === 'en' ? 'more' : 'autres'} →
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
