import { t } from '@/lib/data'
import { cities } from '@/data/locations'

interface StatsBarProps {
  locale: 'en' | 'fr'
}

/**
 * StatsBar — niche-neutral. All labels from translations.ts.
 */
export default function StatsBar({ locale }: StatsBarProps) {
  const cityCount = cities.length

  const stats = [
    { value: `${cityCount}+`, label: t('stats.cities', locale), sub: t('stats.citiesSub', locale) },
    { value: t('stats.methods', locale), label: t('stats.methodsSub', locale) },
    { value: t('stats.response', locale), label: t('stats.responseSub', locale) },
    { value: t('stats.trust', locale), label: t('stats.trustSub', locale) },
  ].filter(s => s.value && s.value !== 'stats.methods') // skip empty

  return (
    <div className="flex flex-wrap gap-8 md:gap-12 py-6 border-t border-[var(--line)]">
      {stats.map((s, i) => (
        <div key={i} className="flex items-baseline gap-3">
          <span className="text-[var(--primary)] font-extrabold text-2xl md:text-3xl tracking-tight">
            {s.value}
          </span>
          <div>
            <span className="font-bold text-sm block text-[var(--text)]">{s.label}</span>
            {s.sub && s.sub !== s.label && <span className="text-[var(--text-light)] text-xs">{s.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
