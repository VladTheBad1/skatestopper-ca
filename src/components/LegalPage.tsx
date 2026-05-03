import PageHero from './PageHero'

interface LegalPageProps {
  title: string
  breadcrumbLabel: string
  locale: 'en' | 'fr'
  children: React.ReactNode
}

/**
 * LegalPage — wrapper for privacy/terms. No hardcoded text. Colors from CSS vars.
 */
export default function LegalPage({ title, breadcrumbLabel, locale, children }: LegalPageProps) {
  return (
    <main>
      <PageHero
        title={title}
        breadcrumbs={[{ label: breadcrumbLabel }]}
        locale={locale}
      />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="prose prose-lg max-w-none text-[var(--text)] prose-headings:text-[var(--text)] prose-headings:font-extrabold prose-headings:font-display prose-headings:uppercase prose-headings:tracking-[0.02em] prose-h2:text-[22px] lg:prose-h2:text-[28px] prose-h2:mt-12 prose-h2:mb-4 prose-p:text-[var(--text-light)] prose-p:leading-[1.7] prose-a:text-[var(--accent)] prose-li:text-[var(--text-light)]">
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}
