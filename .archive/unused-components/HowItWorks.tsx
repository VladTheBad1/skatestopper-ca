import { t } from '@/lib/data'
import SectionHeading from './SectionHeading'

interface HowItWorksProps {
  locale: 'en' | 'fr'
}

/**
 * HowItWorks — niche-neutral. Steps come from translations.ts.
 */
export default function HowItWorks({ locale }: HowItWorksProps) {
  const steps = t('howItWorks.steps', locale) as unknown as { title: string; body: string; icon?: string }[]

  if (!steps || !Array.isArray(steps) || steps.length === 0) return null

  return (
    <section className="bg-[var(--bg-section)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <SectionHeading
          locale={locale}
          tag={t('howItWorks.eyebrow', locale)}
          title={t('howItWorks.title', locale)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-extrabold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              {s.icon && <span className="text-3xl mb-3 block">{s.icon}</span>}
              <h3 className="font-bold text-lg mb-2 text-[var(--text)]">{s.title}</h3>
              <p className="text-[var(--text-light)] text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
