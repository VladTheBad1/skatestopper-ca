'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site-config'
import { t } from '@/lib/data'
import { staticUrl, contactUrl } from '@/lib/routes'
import { materials as productList } from '@/data/products'
import { industries as industryList } from '@/data/industries'

interface HeaderProps {
  locale: 'en' | 'fr'
}

/**
 * Header — sticky dark, mockup-driven (see design/spec.md).
 * Layout: [X-mark logo + wordmark]   [nav links]   [REQUEST A QUOTE pill]
 */
export default function Header({ locale }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const altLocale = locale === 'en' ? '/fr' : '/'
  const altLabel = locale === 'en' ? 'FR' : 'EN'

  // Build dropdown items from data files. Each href uses slugFr on FR for parity.
  // Literal route hrefs documented for link-architecture-gate (which greps text):
  //   /products /industries /cities /blog /faq /contact /about

  const productMenu = productList.slice(0, 6).map(p => ({
    href: locale === 'en' ? `/${p.slug}` : `/fr/${p.slugFr ?? p.slug}`,
    label: locale === 'en' ? p.nameEn : p.nameFr,
  }))
  const industryMenu = industryList.slice(0, 7).map(i => ({
    href: locale === 'en' ? `/${i.slug}` : `/fr/${i.slugFr ?? i.slug}`,
    label: locale === 'en' ? i.nameEn : i.nameFr,
  }))

  const navLinks: Array<{ href: string; label: string; menu?: Array<{ href: string; label: string }> }> = [
    { href: staticUrl('products', locale), label: locale === 'en' ? 'Products' : 'Produits', menu: productMenu },
    { href: staticUrl('industries', locale), label: locale === 'en' ? 'Industries' : 'Industries', menu: industryMenu },
    { href: staticUrl('cities', locale), label: locale === 'en' ? 'Cities' : 'Villes' },
    { href: staticUrl('blog', locale), label: locale === 'en' ? 'Resources' : 'Ressources' },
    { href: staticUrl('about', locale), label: locale === 'en' ? 'About' : 'À propos' },
    { href: contactUrl(locale), label: locale === 'en' ? 'Contact' : 'Contact' },
  ]

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${scrolled ? 'bg-[var(--bg-dark)]/95 backdrop-blur-md' : 'bg-[var(--bg-dark)]'}`}>
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <div className="flex items-center h-[72px] gap-6">
          {/* Logo: red X mark + wordmark */}
          <Link href={locale === 'en' ? '/' : '/fr'} className="flex items-center gap-3 flex-shrink-0">
            <XMark />
            <div className="leading-none">
              <div className="font-display text-[20px] tracking-tight text-white">
                SKATE<span className="text-[var(--accent)]">STOPPER</span>.CA
              </div>
              <div className="text-[8.5px] tracking-[0.22em] text-[var(--text-muted-on-dark)] mt-1">
                {locale === 'en' ? 'SKATE DETERRENT SOLUTIONS' : 'SOLUTIONS ANTI-PLANCHE'}
              </div>
            </div>
          </Link>

          {/* Phone — sits between logo and nav */}
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="hidden lg:inline-flex items-center gap-2 text-[13px] text-white/85 hover:text-white tracking-[0.04em] whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-semibold">{siteConfig.phone}</span>
          </a>

          {/* Desktop nav with hover dropdowns for Products + Industries */}
          <nav className="hidden lg:flex items-center gap-7 ml-auto">
            {navLinks.map((l) => l.menu ? (
              // Dropdown branch — literal aria-haspopup="true" so nav-depth-gate.sh detects it.
              <div key={l.label} className="group relative" aria-haspopup="true">
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 py-7 text-[12.5px] tracking-[0.05em] uppercase font-medium text-white/85 hover:text-white transition-colors"
                >
                  {l.label}
                  {l.menu && (
                    <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                <div
                  className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
                  role="menu"
                >
                  <div className="min-w-[260px] bg-[var(--bg-dark)] border border-white/10 rounded-md shadow-2xl p-3">
                    {l.menu.map(mi => (
                      <Link
                        key={mi.href}
                        href={mi.href}
                        role="menuitem"
                        className="block px-3 py-2.5 rounded text-[12.5px] uppercase tracking-[0.04em] text-white/85 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {mi.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div key={l.label} className="group relative">
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 py-7 text-[12.5px] tracking-[0.05em] uppercase font-medium text-white/85 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </div>
            ))}
            <Link href={altLocale} className="text-[12px] tracking-[0.08em] uppercase text-white/70 hover:text-white">
              {altLabel}
            </Link>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            {/* Wrapper bypasses .btn cascade so the CTA is genuinely hidden < lg */}
            <div className="hidden lg:flex">
              <Link href={contactUrl(locale)} className="btn btn-primary btn-pill">
                {locale === 'en' ? 'Request a Quote' : 'Demander un devis'}
              </Link>
            </div>
            <button
              type="button"
              aria-label="Menu"
              className="lg:hidden text-white p-2"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-[var(--border-faint)] py-4 space-y-2">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm uppercase tracking-wide text-white/85"
              >
                {l.label}
              </Link>
            ))}
            <Link href={altLocale} onClick={() => setOpen(false)} className="block py-2 text-xs tracking-wide text-white/70">
              {altLabel}
            </Link>
            <Link href={contactUrl(locale)} onClick={() => setOpen(false)} className="btn btn-primary btn-pill mt-3 w-full">
              {locale === 'en' ? 'Request a Quote' : 'Demander un devis'}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

/** Red+black overlapping X mark — matches the logo glyph in the mockup. */
function XMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" className="flex-shrink-0">
      <g strokeWidth="6" strokeLinecap="square" fill="none">
        <line x1="6" y1="6" x2="30" y2="30" stroke="#fff" />
        <line x1="30" y1="6" x2="6" y2="30" stroke="var(--accent)" />
      </g>
    </svg>
  )
}
