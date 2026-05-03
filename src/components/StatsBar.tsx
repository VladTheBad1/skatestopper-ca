/**
 * StatsBar — proof-points strip. Climate zones served, cities, install
 * crews, response time. Used on the about page and as a hero-adjacent
 * trust-signal band.
 */
interface Props { locale?: 'en' | 'fr' }

export default function StatsBar({ locale = 'en' }: Props) {
  const isEn = locale === 'en'
  const items = isEn ? [
    { v: '48', l: 'Cities served' },
    { v: '10', l: 'Provinces + territories' },
    { v: '24h', l: 'Quote turnaround' },
    { v: 'Lifetime', l: '316L corrosion warranty' },
  ] : [
    { v: '48', l: 'Villes desservies' },
    { v: '10', l: 'Provinces + territoires' },
    { v: '24h', l: 'Délai de devis' },
    { v: 'À vie', l: 'Garantie corrosion 316L' },
  ]
  return (
    <div className="bg-[var(--surface)] border-y border-[var(--line)] py-8">
      <div className="mx-auto max-w-[1320px] px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map(({ v, l }, i) => (
          <div key={i} className="animate-fade-in transition-transform hover:scale-105">
            <span className="block text-[var(--accent)] font-extrabold text-3xl">{v}</span>
            <span className="block text-[var(--text-light)] text-xs uppercase tracking-wide mt-2">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
