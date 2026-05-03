import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { cityUrl } from '@/lib/routes'

interface City {
  slug: string
  name: string
  province?: string
  provinceShort?: string
  population?: number
  description?: string
  transitAuthority?: string
}

interface CityGridProps {
  cities: City[]
  locale: 'en' | 'fr'
  limit?: number
  showAll?: boolean
  variant?: 'light' | 'dark'
}

/**
 * CityGrid — image card grid (4:5 hero, dark caption block).
 * Hero photo from public/images/cities/{slug}-hero.webp, copied from the
 * shared library at ~/beast/assets/city-images.
 */
export default function CityGrid({ cities, locale, limit }: CityGridProps) {
  const display = limit ? cities.slice(0, limit) : cities
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {display.map((city) => (
        <Link
          key={city.slug}
          href={cityUrl(city.slug, locale)}
          className="group bg-[var(--surface)] rounded-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-[4/5] bg-[var(--bg-section)] overflow-hidden">
            <Image
              src={`/images/cities/${city.slug}-hero.webp`}
              alt={`${city.name}${city.provinceShort ? ', ' + city.provinceShort : ''} — ${locale === 'en' ? 'skate stopper deployments' : 'déploiements de bloque-skate'}`}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="bg-[var(--bg-dark)] text-white p-4 flex-1 min-h-[88px] flex flex-col justify-center">
            <p className="text-sm font-extrabold uppercase tracking-wide flex items-start gap-1.5 leading-tight">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{city.name}{city.provinceShort ? ', ' + city.provinceShort : ''}</span>
            </p>
            {city.transitAuthority && (
              <p className="text-xs text-white/70 mt-1 line-clamp-2">{city.transitAuthority}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
