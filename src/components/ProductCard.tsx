import Link from 'next/link'
import { images } from '@/data/images'

interface ProductCardProps {
  name: string
  slug: string
  description?: string  // accepted for backwards-compat but unused
  category?: string     // unused — image-dominant minimal style
  image?: string
  locale: 'en' | 'fr'
  index?: number
}

/**
 * ProductCard — image-dominant tile. Large 4:5 photo fills the card, product
 * name sits below in a tight caption. No description, no CTA arrow — the
 * listing reads like an editorial gallery, not a feature comparison.
 * Used on the products hub and as related-product chips on detail pages.
 */
export default function ProductCard({ name, slug, image, locale }: ProductCardProps) {
  const href = locale === 'en' ? `/${slug}` : `/fr/${slug}`
  const imgSrc = image || `/images/products/${slug}.webp`
  const altText = images.products?.[slug]?.alt?.[locale] ?? name
  return (
    <Link
      href={href}
      className="group animate-fade-in block animate-fade-in transition-transform"
    >
      <div className="aspect-[4/5] bg-[var(--bg-deep)] overflow-hidden">
        <img
          src={imgSrc}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 font-display text-[14px] sm:text-[15px] tracking-[0.02em] uppercase text-white leading-[1.2] group-hover:text-[var(--accent)] transition-colors">
        {name}
      </h3>
    </Link>
  )
}
