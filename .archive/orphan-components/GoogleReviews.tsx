import { siteConfig } from '@/config/site-config'
import { t } from '@/lib/data'

interface GoogleReviewsProps {
  locale: 'en' | 'fr'
}

/**
 * GoogleReviews — placeholder for Google reviews widget.
 * Only renders if googlePlaceId is configured. No hardcoded text.
 */
export default function GoogleReviews({ locale }: GoogleReviewsProps) {
  if (!siteConfig.googlePlaceId) return null

  return (
    <section className="py-16 bg-[var(--bg-section)]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 text-center">
        <h3 className="font-bold text-2xl text-[var(--text)] mb-8">
          {t('googleReviews.title', locale) || (locale === 'en' ? 'Reviews from Google' : 'Avis Google')}
        </h3>
        {/* Google reviews widget placeholder — integrate per site */}
        <p className="text-[var(--text-light)]">
          {locale === 'en' ? 'Google reviews will appear here when configured.' : 'Les avis Google apparaîtront ici une fois configurés.'}
        </p>
      </div>
    </section>
  )
}
