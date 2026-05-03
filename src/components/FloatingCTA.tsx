'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site-config'
import { t } from '@/lib/data'
import { contactUrl } from '@/lib/routes'

interface FloatingCTAProps {
  locale: 'en' | 'fr'
}

/**
 * FloatingCTA — mobile floating bar. All text from translations. URLs from route helpers.
 */
export default function FloatingCTA({ locale }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[var(--bg-dark)] border-t border-white/10 px-4 py-3 flex items-center gap-3">
      {siteConfig.phone && (
        <a
          href={`tel:+1${siteConfig.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-lg font-bold text-sm"
        >
          {siteConfig.phone}
        </a>
      )}
      <Link
        href={contactUrl(locale)}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent)] text-white rounded-lg font-bold text-sm"
      >
        {t('nav.getQuote', locale) || (locale === 'en' ? 'Get a Quote' : 'Soumission')}
      </Link>
    </div>
  )
}
