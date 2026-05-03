import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/config/site-config'
import { cities } from '@/data/locations'
import { t } from '@/lib/data'
import { contactUrl, staticUrl } from '@/lib/routes'

interface HeroSectionProps {
  locale: 'en' | 'fr'
}

/**
 * HeroSection — niche-neutral shell.
 * ALL visible text from translations.ts or site-config.ts.
 * ALL colors from CSS variables. ALL URLs from route helpers.
 * Layout and font personality come from globals.css (generated per niche).
 */
export default function HeroSection({ locale }: HeroSectionProps) {
  const cityCount = cities.length

  return (
    <section className="relative pt-20 min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt={locale === 'en' ? siteConfig.nicheEn : siteConfig.nicheFr}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)]/90 via-[var(--primary-dark)]/80 to-[var(--bg-dark)]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Trust badge */}
          {t('hero.badge', locale) && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/10">
              <span>{t('hero.badge', locale)}</span>
            </div>
          )}

          {/* Heading — from translations */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]" data-speakable="true">
            {t('hero.headline1', locale) || (locale === 'en' ? siteConfig.taglineEn : siteConfig.taglineFr)}
          </h1>

          {/* Subtitle — from config */}
          <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl" data-speakable="true">
            {t('hero.subtitle', locale) || (locale === 'en' ? siteConfig.descriptionEn : siteConfig.descriptionFr)}
          </p>

          {/* CTA buttons — text from translations, URLs from route helpers */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href={contactUrl(locale)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] hover:opacity-90 text-white rounded-xl font-bold text-lg transition-all duration-200"
            >
              {t('hero.ctaPrimary', locale) || t('nav.getQuote', locale)}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            {t('hero.ctaSecondary', locale) && (
              <Link
                href={staticUrl('products', locale)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all border border-white/20"
              >
                {t('hero.ctaSecondary', locale)}
              </Link>
            )}
          </div>

          {/* Stats — from translations */}
          <div className="flex flex-wrap gap-8 text-white/70 text-sm">
            <span>{cityCount}+ {t('stats.cities', locale)}</span>
            <span>{t('stats.methods', locale)}</span>
            <span>{t('stats.response', locale)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
