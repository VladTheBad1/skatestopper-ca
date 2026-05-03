import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cities } from '@/data/locations'
import { staticUrl } from '@/lib/routes'

interface Props { locale: 'en' | 'fr' }

/**
 * CoverageMap — dark "Coast to Coast" band with stylized Canada map of red pins.
 * Pins use real cities from data/locations.ts (lat/lng if present, else falls back to a
 * spread layout). Right side: eyebrow + headline + CTA.
 */
export default function CoverageMap({ locale }: Props) {
  const isEn = locale === 'en'
  // Map coordinates: rough lat 41-83, lng -141..-52. Project to viewBox 0..1000 x 0..520.
  const points = cities
    .map((c: any) => {
      const lat = Number(c.lat ?? c.latitude ?? 0)
      const lng = Number(c.lng ?? c.lon ?? c.longitude ?? 0)
      if (!lat || !lng) return null
      // Linear projection (good enough for a stylized map)
      const x = ((lng + 141) / (141 - 52)) * 1000
      const y = ((83 - lat) / (83 - 41)) * 520
      return { x, y, name: c.name ?? c.nameEn ?? c.slug }
    })
    .filter(Boolean) as { x: number; y: number; name: string }[]

  // Fallback: scatter pins evenly if no coords on data
  const haveCoords = points.length >= 6
  const fallback = Array.from({ length: 12 }).map((_, i) => ({
    x: 120 + (i * 73) % 760,
    y: 180 + ((i * 53) % 220),
    name: '',
  }))
  const pins = haveCoords ? points : fallback

  return (
    <section className="bg-[var(--bg-dark)] text-white">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Map: user-provided PNG, no overlays */}
          <div className="relative">
            <img
              src="/images/canada-map.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto"
            />
          </div>

          {/* Copy */}
          <div>
            <div className="eyebrow mb-5">{isEn ? 'Coast to Coast' : "D'un océan à l'autre"}</div>
            <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05]">
              {isEn ? <>We&apos;ve got Canada<br />covered.</> : <>Nous couvrons<br />tout le Canada.</>}
            </h2>
            <p className="mt-5 text-[14.5px] leading-[1.65] text-[var(--text-muted-on-dark)] max-w-[460px]">
              {isEn
                ? 'From coastal communities to northern cities, we deliver proven skate deterrent solutions across the country.'
                : 'Des communautés côtières aux villes nordiques, nous livrons des solutions éprouvées partout au pays.'}
            </p>
            <Link href={staticUrl('cities', locale)} className="btn btn-primary mt-8 inline-flex">
              {isEn ? 'Find Your Solution' : 'Trouver une solution'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
