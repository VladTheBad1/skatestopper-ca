/**
 * Logo — the SkateStopper.ca signature mark. Used in the Header and
 * Footer. The visual signature is the red dot stop-sign motif paired
 * with the SKATESTOPPER wordmark in display type — communicates
 * "stop the skating" at-a-glance.
 *
 * This component is the brand's signature element per Phase 5.3 — the
 * one custom-built piece of the visual identity that's not copy-able
 * from a stock UI library.
 */
import Link from 'next/link'

interface LogoProps {
  locale?: 'en' | 'fr'
  /** Compact variant for the mobile header (mark only, no wordmark text below). */
  compact?: boolean
  /** Light variant for use on dark backgrounds. */
  variant?: 'light' | 'dark'
}

export default function Logo({ locale = 'en', compact = false, variant = 'light' }: LogoProps) {
  const homeHref = locale === 'en' ? '/' : '/fr'
  const textColor = variant === 'light' ? 'text-white' : 'text-[var(--text)]'
  const tagColor = variant === 'light' ? 'text-white/65' : 'text-[var(--text-light)]'

  return (
    <Link href={homeHref} className="inline-flex items-center gap-3 group" aria-label="SkateStopper.ca home">
      {/* Mark: red dot inside an outline circle — stop-sign motif. */}
      <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-full border-2 border-[var(--accent)] transition-transform group-hover:scale-105">
        <span className="w-3.5 h-3.5 rounded-full bg-[var(--accent)] block" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[15px] tracking-[0.04em] uppercase ${textColor}`}>
            Skate<span className="text-[var(--accent)]">Stopper</span>
            <span className={tagColor}>.ca</span>
          </span>
          <span className={`text-[9px] tracking-[0.18em] uppercase mt-1 ${tagColor}`}>
            {locale === 'en' ? 'Skate deterrent solutions' : 'Solutions anti-planche'}
          </span>
        </span>
      )}
    </Link>
  )
}
