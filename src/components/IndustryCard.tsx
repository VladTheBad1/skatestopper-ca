import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface IndustryCardProps {
  name: string
  slug: string
  description: string
  image?: string
  locale: 'en' | 'fr'
}

/**
 * IndustryCard — light card with photo header + dark text body. Used on the
 * industries hub and as cross-links from product detail pages.
 */
export default function IndustryCard({ name, slug, description, image, locale }: IndustryCardProps) {
  // Flat routing: industries live at /${slug} (catch-all [slug] route).
  const href = locale === 'en' ? `/${slug}` : `/fr/${slug}`
  const cta = locale === 'en' ? 'Explore' : 'Explorer'
  const imgSrc = image || `/images/industries/${slug}.webp`
  return (
    <Link href={href} className="group block bg-white border border-[var(--border-light)] hover:border-[var(--accent)] transition-colors overflow-hidden">
      <div className="aspect-[4/3] bg-[var(--bg-light)] overflow-hidden">
        <img
          src={imgSrc}
          alt={`${name} — representative skate-deterrent installation context in Canada`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-[16px] tracking-[0.04em] uppercase text-[var(--text)] leading-[1.2]">{name}</h3>
        <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--text-light)] line-clamp-3">{description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[var(--accent)]">
          {cta}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
