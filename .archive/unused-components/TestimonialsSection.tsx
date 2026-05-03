import { testimonials } from '@/data/testimonials'
import { t } from '@/lib/data'

interface TestimonialsSectionProps {
  locale: 'en' | 'fr'
}

/**
 * TestimonialsSection — niche-neutral. Labels from translations. Content from data.
 */
export default function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="bg-[var(--bg-section)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="text-center mb-12">
          <span className="eyebrow text-[var(--primary)] block mb-3">
            {t('testimonials.eyebrow', locale) || (locale === 'en' ? 'TESTIMONIALS' : 'TÉMOIGNAGES')}
          </span>
          <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight text-[var(--text)]">
            {t('testimonials.title', locale) || (locale === 'en' ? 'What our clients say.' : 'Ce que disent nos clients.')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--line)]">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: test.rating || 5 }).map((_, s) => (
                  <span key={s} className="text-[var(--star)] text-lg">★</span>
                ))}
              </div>
              {/* Quote */}
              <p className="text-[var(--text)] text-sm leading-relaxed mb-4">
                &ldquo;{locale === 'en' ? test.textEn : test.textFr}&rdquo;
              </p>
              {/* Author */}
              <div className="border-t border-[var(--line)] pt-3">
                <span className="font-bold text-sm text-[var(--text)] block">{test.name}</span>
                <span className="text-[var(--text-light)] text-xs">{test.role} — {locale === 'fr' ? test.cityFr : test.cityEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
