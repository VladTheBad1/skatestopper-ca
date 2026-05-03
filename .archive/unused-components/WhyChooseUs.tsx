import { t } from '@/lib/data'
import SectionHeading from './SectionHeading'

interface WhyChooseUsProps {
  locale: 'en' | 'fr'
}

/**
 * WhyChooseUs — niche-neutral. Reasons come from translations.ts.
 */
export default function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const reasons = t('whyChooseUs.reasons', locale) as unknown as { n: string; label: string; body: string }[]

  if (!reasons || !Array.isArray(reasons) || reasons.length === 0) return null

  return (
    <section className="bg-[var(--bg)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <SectionHeading
          locale={locale}
          tag={t('whyChooseUs.eyebrow', locale)}
          title={t('whyChooseUs.title', locale)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {reasons.map((r, i) => (
            <div key={i} className="p-6 md:p-8 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
              <span className="text-[var(--primary)] font-extrabold text-3xl md:text-4xl block mb-3">{r.n}</span>
              <h3 className="font-bold text-lg mb-2 text-[var(--text)]">{r.label}</h3>
              <p className="text-[var(--text-light)] text-sm leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
