import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brandName,
    short_name: siteConfig.brandName,
    description: siteConfig.descriptionEn,
    start_url: '/',
    display: 'standalone',
    background_color: siteConfig.brand.bg,
    theme_color: siteConfig.brand.primary,
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
