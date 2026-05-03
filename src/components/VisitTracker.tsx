'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function VisitTracker() {
  const pathname = usePathname()
  const trackedRef = useRef<string | null>(null)

  useEffect(() => {
    if (trackedRef.current === pathname) return
    trackedRef.current = pathname

    const locale = pathname.startsWith('/fr') ? 'fr' : 'en'

    let city: string | undefined
    const cityMatchEn = pathname.match(/^\/([^/]+)\//)
    const cityMatchFr = pathname.match(/^\/fr\/([^/]+)\//)
    if (cityMatchFr) {
      city = cityMatchFr[1]
    } else if (cityMatchEn) {
      city = cityMatchEn[1]
    }

    const payload: Record<string, string> = {
      path: pathname,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent || '',
      locale,
    }

    if (city) {
      payload.city = city
    }

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silently ignore tracking failures
    })
  }, [pathname])

  return null
}
