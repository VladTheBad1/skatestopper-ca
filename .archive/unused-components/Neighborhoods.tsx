interface Neighborhood {
  name: string
  slug: string
}

interface NeighborhoodsProps {
  neighborhoods: Neighborhood[]
  citySlug: string
  locale: 'en' | 'fr'
}

/**
 * Neighborhoods — optional neighborhood listing for city pages.
 * No hardcoded colors. URLs from route helpers.
 */
export default function Neighborhoods({ neighborhoods, citySlug, locale }: NeighborhoodsProps) {
  if (!neighborhoods || neighborhoods.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-[var(--text)] mb-4">
        {locale === 'en' ? 'Neighborhoods' : 'Quartiers'}
      </h3>
      <div className="flex flex-wrap gap-2">
        {neighborhoods.map(n => (
          <span key={n.slug} className="px-3 py-1 bg-[var(--bg-section)] text-[var(--text-light)] text-sm rounded-full">
            {n.name}
          </span>
        ))}
      </div>
    </div>
  )
}
