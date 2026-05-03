import Link from 'next/link'
import { services } from '@/data/products'
import { industries } from '@/data/industries'
import { geoUrl, productUrl } from '@/lib/routes'
import { t } from '@/lib/data'

interface RelatedServicesProps {
  currentCitySlug?: string
  locale: 'en' | 'fr'
}

/**
 * RelatedServices — services available in a city. URLs from route helpers.
 */
export default function RelatedServices({ currentCitySlug, locale }: RelatedServicesProps) {
  const items = [
    ...services.map(m => ({
      name: locale === 'en' ? m.nameEn : m.nameFr,
      href: currentCitySlug
        ? geoUrl(currentCitySlug, m.slug, m.slugFr, locale)
        : productUrl(m.slug, m.slugFr, locale),
    })),
    ...industries.map(i => ({
      name: locale === 'en' ? i.nameEn : i.nameFr,
      href: currentCitySlug
        ? geoUrl(currentCitySlug, i.slug, i.slugFr, locale)
        : productUrl(i.slug, i.slugFr, locale),
    })),
  ]

  return (
    <section className="bg-[var(--bg)] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <span className="eyebrow text-[var(--primary)] block mb-3">
          {t('related.servicesEyebrow', locale) || (locale === 'en' ? 'In this city' : 'Dans cette ville')}
        </span>
        <h3 className="font-bold text-2xl mb-8 text-[var(--text)]">
          {t('related.servicesTitle', locale) || (locale === 'en' ? 'Services available here.' : 'Services disponibles ici.')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-4 py-3 border border-[var(--line)] rounded-lg hover:border-[var(--primary)] transition-colors text-[var(--text)]"
            >
              <span className="text-sm">{item.name}</span>
              <span className="text-[var(--primary)]">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
