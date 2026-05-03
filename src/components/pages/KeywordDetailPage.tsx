import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { t } from '@/lib/data'
import { contactUrl } from '@/lib/routes'
import { markdownToHtml } from '@/lib/markdown'

interface KeywordPage {
  slugEn: string
  slugFr: string
  titleEn: string
  titleFr: string
  descriptionEn: string
  descriptionFr: string
  contentEn: string
  contentFr: string
}

interface KeywordDetailPageProps {
  kp: KeywordPage
  locale: 'en' | 'fr'
}

export default function KeywordDetailPage({ kp, locale }: KeywordDetailPageProps) {
  const isEn = locale === 'en'
  const title = isEn ? kp.titleEn : kp.titleFr
  const content = isEn ? kp.contentEn : kp.contentFr

  return (
    <main>
      <PageHero
        title={title}
        subtitle={isEn ? kp.descriptionEn : kp.descriptionFr}
        breadcrumbs={[{ label: title }]}
        locale={locale}
      />

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg-section)] py-12">
        <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
          <Link
            href={contactUrl(locale)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:opacity-90 text-white font-bold rounded-lg transition-all"
          >
            {t('nav.getQuote', locale)}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </section>
</main>
  )
}
