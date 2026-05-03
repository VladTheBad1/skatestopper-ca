import Link from 'next/link'
import { cities } from '@/data/locations'
import { cityUrl } from '@/lib/routes'
import { t } from '@/lib/data'

interface RelatedCitiesProps {
  currentCitySlug: string
  locale: 'en' | 'fr'
}

/**
 * RelatedCities — nearby cities. URLs from route helper. Labels from translations.
 */
export default function RelatedCities({ currentCitySlug, locale }: RelatedCitiesProps) {
  const nearby = cities.filter(c => c.slug !== currentCitySlug).slice(0, 6)
  if (nearby.length === 0) return null

  return (
    <section className="bg-[var(--bg-section)] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <span className="eyebrow text-[var(--primary)] block mb-3">
          {t('related.citiesEyebrow', locale) || (locale === 'en' ? 'Nearby cities' : 'Villes voisines')}
        </span>
        <h3 className="font-bold text-2xl mb-8 text-[var(--text)]">
          {t('related.citiesTitle', locale) || (locale === 'en' ? 'Also serving these cities.' : 'Également dans ces villes.')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {nearby.map(city => (
            <Link
              key={city.slug}
              href={cityUrl(city.slug, locale)}
              className="flex items-center justify-between px-4 py-3 border border-[var(--line)] rounded-lg hover:border-[var(--primary)] transition-colors text-[var(--text)]"
            >
              <span>{city.name}</span>
              <span className="text-[var(--primary)]">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
