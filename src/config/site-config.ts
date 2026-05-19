export const siteConfig = {
  domain: 'skatestopper.ca',
  brandName: 'Skatestopper.ca',
  nicheEn: 'skate stoppers and anti-skateboarding deterrents',
  nicheFr: 'bloque-skate et dissuasifs anti-planche à roulettes',
  // Short forms for <title> templates — keeps geo / city / industry titles
  // under Google’s 60-char limit even after the ` | brandName` suffix appends.
  nicheShortEn: 'Skate Stoppers',
  nicheShortFr: 'Bloque-skate',
  taglineEn: 'Skate Stoppers Engineered for Canada',
  taglineFr: 'Bloque-skate conçus pour le Canada',
  descriptionEn: "Canadian-built skate stoppers and anti skateboard guards — ledge deterrents and handrail stops engineered for our climate, shipped and installed coast to coast.",
  descriptionFr: "Bloque-skate, dissuasifs de rebords et arr\u00eats de mains courantes fabriqu\u00e9s au Canada. Con\u00e7us pour notre climat, livr\u00e9s et install\u00e9s d'un oc\u00e9an \u00e0 l'autre.",
  phone: '(888) 663-2244',
  phoneRaw: '18886632244',
  email: 'info@skatestopper.ca',
  city: 'Toronto',
  province: 'Ontario',
  locale: 'en-CA',
  defaultCity: 'toronto',
  marketScope: 'country' as const,
  locales: ['en-CA', 'fr-CA'],
  address: {
    street: '100 King Street West',
    city: 'Toronto',
    province: 'Ontario',
    provinceCode: 'ON',
    country: 'Canada',
    countryCode: 'CA',
    postalCode: 'M5V 2H1',
    serviceArea: 'Canada-wide',
  },
  brand: {
    primary: '#1a1a1a',
    secondary: '#c8102e',
    accent: '#7d8085',
    bg: '#FAFAFA',
    text: '#1e293b',
    logoText: 'Skatestopper.ca',
  },
  pricing: {
    basePrice: '24',
    priceRange: '$24-$180 per unit installed',
    currency: 'CAD',
  },
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
  routes: {
    products: { en: '/products', fr: '/fr/produits' },
    industries: { en: '/industries', fr: '/fr/secteurs' },
    cities: { en: '/cities', fr: '/fr/villes' },
    blog: { en: '/blog', fr: '/fr/blogue' },
    about: { en: '/about', fr: '/fr/a-propos' },
    contact: { en: '/contact', fr: '/fr/nous-joindre' },
    faq: { en: '/faq', fr: '/fr/faq' },
    privacy: { en: '/privacy', fr: '/fr/confidentialite' },
    terms: { en: '/terms', fr: '/fr/conditions' },
  },
  keywords: ['skate stoppers', 'anti-skateboard devices', 'skate deterrents', 'ledge stoppers', 'handrail skate stoppers'],
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
  ],
  googleVerification: 'DvE73FGekoJ8FnmbZNst3MfSm-ZopRURtnLJ1bqgrlY',
  googleMapsApiKey: '',
  googlePlaceId: '',
}

/**
 * Returns array of social link objects for footer/header rendering.
 * Reads siteConfig.social if present, returns empty array otherwise.
 */
export function getSocialLinks(): Array<{ platform: string; url: string; label: string }> {
  const social = (siteConfig as any).social ?? {}
  const links: Array<{ platform: string; url: string; label: string }> = []
  if (social.linkedin) links.push({ platform: 'linkedin', url: social.linkedin, label: 'LinkedIn' })
  if (social.twitter) links.push({ platform: 'twitter', url: social.twitter, label: 'Twitter' })
  if (social.facebook) links.push({ platform: 'facebook', url: social.facebook, label: 'Facebook' })
  if (social.instagram) links.push({ platform: 'instagram', url: social.instagram, label: 'Instagram' })
  if (social.youtube) links.push({ platform: 'youtube', url: social.youtube, label: 'YouTube' })
  return links
}
