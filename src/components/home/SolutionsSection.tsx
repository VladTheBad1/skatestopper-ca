import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { materials } from '@/data/products'
import { images } from '@/data/images'
import { staticUrl, productUrl } from '@/lib/routes'

interface Props { locale: 'en' | 'fr' }

/**
 * SolutionsSection — dark band, intro left, 5 product cards right.
 * Wired to research data: src/data/products.ts (6 materials).
 */
export default function SolutionsSection({ locale }: Props) {
  const isEn = locale === 'en'
  const products = materials // show all 6

  return (
    <section className="bg-[var(--bg-dark)] text-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20 lg:py-24">
        {/* Heading row — full-width above the cards */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-[600px]">
            <div className="eyebrow mb-4">{isEn ? 'Our Solutions' : 'Nos solutions'}</div>
            <h2 className="font-display text-[40px] lg:text-[52px] leading-[1.02]">
              {isEn ? <>Engineered to deter. Built to endure.</> : <>Conçus pour dissuader. Bâtis pour durer.</>}
            </h2>
          </div>
          <Link href={staticUrl('products', locale)} className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-semibold text-[var(--accent)] hover:text-white transition-colors self-start lg:self-end pb-1">
            {isEn ? 'View All Products' : 'Tous les produits'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards — full-width 6-col row */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={productUrl(p.slug, p.slug, locale)}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-deep)]">
                  <img
                    src={`/images/products/${p.slug}.webp`}
                    alt={images.products?.[p.slug]?.alt?.[locale] ?? (isEn ? p.nameEn : p.nameFr)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 text-[12.5px] font-bold tracking-[0.04em] uppercase leading-[1.25] group-hover:text-[var(--accent)] transition-colors">
                  {isEn ? p.nameEn : p.nameFr}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


