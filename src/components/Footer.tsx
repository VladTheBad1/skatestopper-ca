import Link from 'next/link'
import { Phone, Mail, Clock, ShieldCheck, MapPin } from 'lucide-react'
import { siteConfig } from '@/config/site-config'
import { staticUrl, contactUrl, productUrl } from '@/lib/routes'
import { materials } from '@/data/products'
import { industries } from '@/data/industries'
import { keywordPages } from '@/data/keyword-pages'
import CTABanner from '@/components/CTABanner'
import Logo from '@/components/Logo'

interface FooterProps {
  locale: 'en' | 'fr'
}

/**
 * Footer — dark band with three zones:
 *  1. Red CTA card "Free site assessment" (pulled up over the band edge).
 *  2. Four columns: brand+identity, Solutions, Industries, Company+contact.
 *  3. Trust strip (response time / compliance / origin) above the legal line.
 *
 * No social-media icons — the brand sells direct through phone, email, and
 * the quote form. Anything else would be decoration the user does not want.
 */
export default function Footer({ locale }: FooterProps) {
  const isEn = locale === 'en'
  const products = materials.slice(0, 6)
  const apps = industries.slice(0, 4)

  return (
    <footer className="bg-[var(--bg-dark)] text-white animate-fade-in">
      {/* Red CTA band — "Free site assessment". Bridges the section above and the dark footer below. */}
      <CTABanner locale={locale} bridge />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        {/* Dark column area */}
        <div className="py-12 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Brand identity — signature element (Phase 5.3) */}
            <div className="col-span-2 lg:col-span-1">
              <Logo locale={locale} variant="light" />
              <p className="text-[13px] text-white/70 leading-[1.65] mt-5 max-w-[260px]">
                {isEn
                  ? 'Canadian-built skate stoppers, ledge deterrents, and handrail stops — engineered for our climate, shipped coast to coast.'
                  : 'Bloque-skate, dissuasifs de rebord et arrêts de main courante fabriqués au Canada — conçus pour notre climat, livrés d’un océan à l’autre.'}
              </p>
            </div>

            {/* Solutions */}
            <FooterCol title={isEn ? 'Solutions' : 'Solutions'}>
              {products.map((p) => (
                <FooterLink key={p.slug} href={productUrl(p.slug, p.slugFr ?? p.slug, locale)}>
                  {isEn ? p.nameEn : p.nameFr}
                </FooterLink>
              ))}
            </FooterCol>

            {/* Industries */}
            <FooterCol title={isEn ? 'Industries' : 'Secteurs'}>
              {apps.map((i) => (
                <FooterLink key={i.slug} href={isEn ? `/${i.slug}` : `/fr/${i.slugFr ?? i.slug}`}>
                  {isEn ? i.nameEn : i.nameFr}
                </FooterLink>
              ))}
            </FooterCol>

            {/* Company + contact */}
            <FooterCol title={isEn ? 'Company' : 'Société'}>
              <FooterLink href={staticUrl('about', locale)}>{isEn ? 'About Us' : 'À propos'}</FooterLink>
              <FooterLink href={staticUrl('blog', locale)}>{isEn ? 'Resources' : 'Ressources'}</FooterLink>
              <FooterLink href={contactUrl(locale)}>{isEn ? 'Contact Us' : 'Nous joindre'}</FooterLink>
              <div className="pt-5 space-y-2.5 border-t border-[var(--border-faint)] mt-5">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-2.5 text-[13px] font-medium text-white hover:text-[var(--accent)] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--accent)]" /> {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-[13px] text-white/85 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--accent)]" /> {siteConfig.email}
                </a>
                <div className="flex items-center gap-2.5 text-[12px] text-white/60 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                  {isEn ? 'Mon–Fri · 8:00–17:00 EST' : 'Lun–Ven · 8h00–17h00 HE'}
                </div>
              </div>
            </FooterCol>
          </div>

        {/* Popular topics — internal links that de-orphan the keyword landing
            pages (previously reachable only via the sitemap). Real <a href>
            on every page so Google discovers + flows equity to them. */}
        <div className="border-t border-[var(--border-faint)] py-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] mb-3">
            {isEn ? 'Popular Topics' : 'Sujets populaires'}
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {keywordPages.map((kp) => (
              <Link
                key={kp.slugEn}
                href={isEn ? `/${kp.slugEn}` : `/fr/${kp.slugFr}`}
                className="text-[12.5px] text-white/70 hover:text-white transition-colors leading-snug"
              >
                {isEn ? kp.nameEn : kp.nameFr}
              </Link>
            ))}
          </div>
        </div>

        {/* Trust strip — three signals, full-width, separates content from legal */}
        <div className="border-t border-[var(--border-faint)] py-5 grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-[12px] text-white/75">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
            <span>{isEn ? '1-business-day quote response' : 'Devis sous un jour ouvrable'}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
            <span>{isEn ? 'OBC 3.4.6.5 / CNB 9.8.7.4 compliant' : 'Conforme au CBO 3.4.6.5 / CNB 9.8.7.4'}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
            <span>{isEn ? 'Shipped to every Canadian province + territory' : 'Livré dans toutes les provinces et territoires'}</span>
          </div>
        </div>

        {/* Legal strip */}
        <div className="border-t border-[var(--border-faint)] py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11.5px] text-white/55">
          <div>
            © {new Date().getFullYear()} {siteConfig.brandName}.{' '}
            {isEn ? 'All rights reserved.' : 'Tous droits réservés.'}
          </div>
          <div className="flex gap-5">
            <Link href={staticUrl('privacy', locale)} className="hover:text-white transition-colors">
              {isEn ? 'Privacy' : 'Confidentialité'}
            </Link>
            <Link href={staticUrl('terms', locale)} className="hover:text-white transition-colors">
              {isEn ? 'Terms' : 'Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="block w-6 h-px bg-[var(--accent)]" />
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          {title}
        </h4>
      </div>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[13px] text-white/75 hover:text-white hover:translate-x-0.5 inline-block transition-all leading-snug"
      >
        {children}
      </Link>
    </li>
  )
}
