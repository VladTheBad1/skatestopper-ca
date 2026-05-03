'use client'
import { siteConfig } from '@/config/site-config'

interface GoogleMapProps {
  city?: string
  province?: string
  lat?: number
  lng?: number
  height?: string
  className?: string
}

/**
 * Google Maps embed — uses free Embed API (no key required for basic place embeds).
 * Falls back to static link if no coordinates available.
 */
export default function GoogleMap({ city, province, lat, lng, height = '400px', className = '' }: GoogleMapProps) {
  const query = city && province
    ? `${city},+${province},+Canada`
    : `${siteConfig.address.city},+${siteConfig.address.province},+Canada`

  // If Google Maps API key is configured, use Embed API
  if (siteConfig.googleMapsApiKey) {
    const src = lat && lng
      ? `https://www.google.com/maps/embed/v1/view?key=${siteConfig.googleMapsApiKey}&center=${lat},${lng}&zoom=12`
      : `https://www.google.com/maps/embed/v1/place?key=${siteConfig.googleMapsApiKey}&q=${query}`

    return (
      <div className={`rounded-2xl overflow-hidden shadow-md border border-gray-100 ${className}`}>
        <iframe
          src={src}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${city || siteConfig.address.city}`}
        />
      </div>
    )
  }

  // Fallback: free embed (no API key)
  const embedSrc = `https://maps.google.com/maps?q=${query}&t=&z=12&ie=UTF8&iwloc=&output=embed`

  return (
    <div className={`rounded-2xl overflow-hidden shadow-md border border-gray-100 ${className}`}>
      <iframe
        src={embedSrc}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title={`Map of ${city || siteConfig.address.city}`}
      />
    </div>
  )
}
