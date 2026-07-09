'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureAttribution } from '@/lib/attribution-client'

export default function AttributionTracker() {
  const pathname = usePathname()
  useEffect(() => {
    captureAttribution()
  }, [pathname])
  return null
}
