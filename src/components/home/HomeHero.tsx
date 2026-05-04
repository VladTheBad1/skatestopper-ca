import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { staticUrl } from '@/lib/routes'

interface Props { locale: 'en' | 'fr' }

/**
 * HomeHero — full-bleed photo with a dark gradient overlay on the left
 * that fades into the photo on the right. Copy sits on top of the gradient.
 * Mockup: design/mockup-sections/hero-precise-thumb.png
 */
export default function HomeHero({ locale }: Props) {
  const isEn = locale === 'en'
  const headline = isEn ? (
    <>
      <span className="block">Design spaces.</span>
      <span className="block">Not skate spots.</span>
      <span className="block text-[var(--accent)]">We stop skating.</span>
    </>
  ) : (
    <>
      <span className="block">Concevez des espaces.</span>
      <span className="block">Pas des skateparks.</span>
      <span className="block text-[var(--accent)]">Nous arrêtons les glisses.</span>
    </>
  )
  const body = isEn
    ? 'Canada-wide supplier of anti-skateboarding hardware — the architectural deterrents that prevent skateboard grind damage on commercial and municipal street furniture. (We do not sell roller-skate toe stops.)'
    : 'Fournisseur pancanadien de matériel anti-planche à roulettes — les dissuasifs architecturaux qui empêchent les dégâts de glisse sur le mobilier urbain et commercial. (Nous ne vendons pas d’accessoires pour patins à roulettes.)'

  const heroAlt = isEn
    ? 'Stainless skate stoppers and skateboard deterrents installed on a granite ledge in a Canadian downtown plaza'
    : 'Bloque-skate en inox et dissuasifs anti-planche à roulettes installés sur un rebord en granite, place urbaine canadienne'
  return (
    <section
      className="relative bg-[var(--bg-deep)] text-white pt-[72px] overflow-hidden"
      aria-label={isEn ? 'Skate deterrent hardware in urban plaza' : 'Dissuasifs anti-planche en milieu urbain'}
    >
      {/* LCP hero image — real <img> for SEO/Google Images + responsive sizes. */}
      <Image
        src="/images/hero/hero.webp"
        alt={heroAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center -z-0"
      />
      {/* Crawlable quick-nav (sr-only) — exposes site architecture for crawlers and link-architecture-gate */}
      <nav aria-label="Site sections" className="sr-only">
        <Link href="/products">Products</Link>
        <Link href="/cities">Cities</Link>
        <Link href="/industries">Industries</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact">Contact</Link>
      </nav>


      {/* Mobile: near-solid scrim so headline + subtitle stay readable on busy photo. */}
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
            'linear-gradient(90deg, rgba(5,6,8,0.95) 0%, rgba(5,6,8,0.92) 28%, rgba(5,6,8,0.55) 48%, rgba(5,6,8,0.15) 65%, rgba(5,6,8,0) 80%)',
        }}
        aria-hidden="true"
      />

      {/* Copy column */}
      <div className="relative z-[2] mx-auto max-w-[1320px] px-6 lg:px-12 min-h-[520px] sm:min-h-[620px] flex items-center">
        <div className="max-w-[560px] py-14 sm:py-20 lg:py-24">
          <div className="eyebrow mb-6" aria-hidden="true" />
          <h1 className="font-display text-[34px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.05] sm:leading-[1.02] tracking-[-0.01em]">
            {headline}
          </h1>
          <p className="mt-7 text-[15px] leading-[1.65] text-[var(--text-muted-on-dark)] max-w-[440px]">
            {body}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href={staticUrl('products', locale)} className="btn btn-outline">
              {isEn ? 'Explore Solutions' : 'Voir les solutions'}
            </Link>
            <Link href={staticUrl('products', locale)} className="btn-ghost">
              {isEn ? 'View Products' : 'Voir les produits'}
              <ArrowRight className="w-4 h-4 arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
