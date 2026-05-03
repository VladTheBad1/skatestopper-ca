import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  locale: 'en' | 'fr'
}

/**
 * Breadcrumb — niche-neutral. No hardcoded colors.
 */
export default function Breadcrumb({ items, locale }: BreadcrumbProps) {
  const homeHref = locale === 'en' ? '/' : '/fr'

  return (
    <nav className="flex items-center gap-2 text-sm text-[var(--text-light)] py-4 overflow-x-auto" aria-label="Breadcrumb">
      <Link href={homeHref} className="hover:text-[var(--primary)] transition-colors flex-shrink-0">
        {locale === 'en' ? 'Home' : 'Accueil'}
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[var(--text-light)]">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--primary)] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[var(--text)] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
