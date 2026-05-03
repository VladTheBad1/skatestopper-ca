/**
 * CTABanner — the red "Free site assessment" call-to-action band that
 * sits between the page content and the dark footer columns. Extracted
 * from Footer.tsx so the CTA logic is testable in isolation and the
 * factory phase5-gate `CTA*` filename check passes.
 *
 * Used in: Footer.tsx (the only consumer — embedded as the integrated
 * footer band on every page). Do not render this twice on the same
 * page — cta-density-gate flags duplicate CTAs.
 */
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { contactUrl } from '@/lib/routes'

interface CTABannerProps {
  locale: 'en' | 'fr'
  /** When true, applies the negative top margin that bridges into a
   *  preceding light section. Footer sets this. Standalone usage leaves false. */
  bridge?: boolean
  /** Visual variant. 'accent' (default) renders the bright red brand band
   *  used in the integrated footer. 'dark' renders a near-black band
   *  with red accent text — used on heavy-content landing pages where the
   *  bright red would compete with content. The dark variant uses the
   *  `bg-[var(--bg-dark)]` token consumed by `dark-cta-strip-gate.sh`. */
  variant?: 'accent' | 'dark'
}

export default function CTABanner({ locale, bridge = false, variant = 'accent' }: CTABannerProps) {
  const isEn = locale === 'en'
  const bg = variant === 'dark' ? 'bg-[var(--bg-dark)] border-y border-[var(--accent)]' : 'bg-[var(--accent)]'
  return (
    <div className={`${bg} ${bridge ? 'lg:-mt-8' : ''}`}>
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12 py-6 lg:py-7 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-[20px] lg:text-[22px] leading-tight text-white">
              {isEn ? 'Free site assessment.' : 'Évaluation de site gratuite.'}
            </div>
            <p className="text-[13px] text-white/90 mt-1 leading-snug">
              {isEn
                ? 'Send us your address — we reply with specs, install method, and lead time. No obligation.'
                : 'Envoyez-nous votre adresse — nous répondons avec spécifications, méthode et délai. Sans engagement.'}
            </p>
          </div>
        </div>
        <Link
          href={contactUrl(locale)}
          className="inline-flex items-center justify-center gap-2 bg-white text-[var(--accent)] font-semibold text-[13px] px-5 py-3 rounded-sm hover:bg-white/90 transition-colors flex-shrink-0 self-start lg:self-auto"
        >
          {isEn ? 'Get my assessment →' : 'Obtenir mon évaluation →'}
        </Link>
      </div>
    </div>
  )
}
