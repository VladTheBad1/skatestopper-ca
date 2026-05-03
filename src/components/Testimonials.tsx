/**
 * Testimonials — pulls verified procurement reviews from src/data/reviews.ts.
 * Sample seed entries until real Google Business Profile reviews flow in.
 */
import { reviews } from '@/data/reviews'

interface Props { locale?: 'en' | 'fr'; max?: number }

export default function Testimonials({ locale = 'en', max = 3 }: Props) {
  const items = (reviews as any[]).slice(0, max)
  if (items.length === 0) return null
  const isEn = locale === 'en'
  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="mx-auto max-w-[1320px] px-6">
        <h2 className="font-display text-2xl mb-8 text-center">
          {isEn ? 'What Canadian buyers say' : 'Ce que les acheteurs canadiens disent'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((r, i) => (
            <blockquote key={i} className="bg-white border border-[var(--border-light)] p-6 rounded-sm transition-all hover:border-[var(--accent)] animate-fade-in">
              <p className="text-sm text-[var(--text-light)] leading-relaxed italic">&ldquo;{isEn ? r.quoteEn : r.quoteFr}&rdquo;</p>
              <footer className="mt-4 text-xs text-[var(--text)]">
                <strong>{r.author}</strong> · {r.role} · {r.org}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
