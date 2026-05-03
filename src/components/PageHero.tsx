import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb { label: string; href?: string }
interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  imageSrc?: string
  /**
   * Descriptive alt for the hero image. MUST describe the photo, not just the page topic.
   * SEO/A11y critical — every hero image renders a real <img> via next/image.
   */
  imageAlt?: string
  breadcrumbs?: Crumb[]
  locale: 'en' | 'fr'
}

/**
 * Dark-theme page hero — used by every hub and detail page that isn't the home.
 * Mockup-aligned: optional photo with left-fading dark gradient, eyebrow strip,
 * Oswald display headline, muted subtitle, breadcrumb trail.
 */
export default function PageHero({ eyebrow, title, subtitle, imageSrc, imageAlt, breadcrumbs, locale }: PageHeroProps) {
  const homeHref = locale === 'en' ? '/' : '/fr'
  const homeLabel = locale === 'en' ? 'Home' : 'Accueil'
  // Fallback alt: derive from page title — never leave empty if an image is present.
  // Empty alt on a content image is an a11y/SEO P0 fail. If the image is purely decorative,
  // pass `imageAlt=""` explicitly (presentational role).
  const resolvedAlt = imageAlt ?? title
  return (
    <section className="relative bg-[var(--bg-deep)] text-white pt-[72px] overflow-hidden">
      {imageSrc && (
        <>
          {/* Real <img> for SEO/a11y/Google Images + LCP optimization (priority + responsive sizes). */}
          <Image
            src={imageSrc}
            alt={resolvedAlt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1320px"
            className="object-cover object-center -z-0"
          />
          {/* Mobile: near-solid scrim so subtitle stays readable on busy photos. */}
          <div
            className="absolute inset-0 pointer-events-none lg:hidden z-[1]"
            style={{ background: 'rgba(5,6,8,0.78)' }}
            aria-hidden="true"
          />
          {/* Desktop: cinematic left-to-right fade. */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block z-[1]"
            style={{
              background:
                'linear-gradient(90deg, rgba(5,6,8,0.95) 0%, rgba(5,6,8,0.88) 35%, rgba(5,6,8,0.55) 60%, rgba(5,6,8,0.2) 80%, rgba(5,6,8,0) 100%)',
            }}
            aria-hidden="true"
          />
        </>
      )}
      {!imageSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-deep)] via-[var(--bg-dark)] to-[var(--bg-deep)]" aria-hidden="true" />
      )}
      <div className="relative z-[2] mx-auto max-w-[1320px] px-6 lg:px-12 py-12 sm:py-16 lg:py-28">
        <nav aria-label="breadcrumb" className="mb-5 text-[12px] tracking-[0.05em] uppercase text-white/55 flex items-center gap-2 flex-wrap">
          <Link href={homeHref} className="hover:text-white">{homeLabel}</Link>
          {breadcrumbs?.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/85">{c.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
        <h1 className="font-display animate-fade-in text-[30px] sm:text-[44px] lg:text-[64px] leading-[1.08] sm:leading-[1.05] tracking-[-0.01em] max-w-[820px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] leading-[1.6] sm:leading-[1.65] text-[var(--text-muted-on-dark)] max-w-[640px]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
