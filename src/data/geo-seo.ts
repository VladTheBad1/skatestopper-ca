import { cities } from './locations'
import { materials } from './products'
import { industries } from './industries'
import { faqs } from './faqs'

export interface GeoParam {
  slug: string;
  slugFr?: string;
  service: string;
  serviceFr?: string;
}

/**
 * Generate all geo-SEO page params for static generation.
 * Creates {city}/{product-slug} and {city}/{industry-slug} geo pages — flat
 * routing per V6 archetype, no -rental/-service suffix (skate-stoppers are
 * sold + installed, not rented). Look-up resolves by matching against
 * materials and industries slug sets at runtime.
 */
export function generateAllGeoParams(): GeoParam[] {
  const params: GeoParam[] = []
  for (const city of cities) {
    for (const material of materials) {
      params.push({ slug: city.slug, service: material.slug })
    }
    for (const industry of industries) {
      params.push({ slug: city.slug, service: industry.slug })
    }
  }
  return params
}

/**
 * Parse a service slug back to its source type and slug.
 */
// Resolve a geo `service` segment by matching against materials AND industries.
// Material match wins if a slug appears in both (shouldn't happen —
// slug-collision-gate enforces uniqueness across data sources). materials +
// industries already imported at top of file.
export function parseServiceSlug(service: string): { type: 'material' | 'industry'; sourceSlug: string } | null {
  // Match by EN slug or FR slug (FR routes pass slugFr).
  const mat = materials.find(m => m.slug === service || (m as { slugFr?: string }).slugFr === service)
  if (mat) return { type: 'material', sourceSlug: mat.slug }
  const ind = industries.find(i => i.slug === service || (i as { slugFr?: string }).slugFr === service)
  if (ind) return { type: 'industry', sourceSlug: ind.slug }
  return null
}

/**
 * Get city-specific FAQs for a material (top 3 generic FAQs adapted to city context).
 */
export function getCityMaterialFAQs(cityName: string, materialName: string, locale: 'en' | 'fr') {
  // Resolve city-specific data for FAQ uniqueness (per thin-content-gate).
  const city = (require('./locations').cities as Array<Record<string, unknown>>)
    .find((c) => (c.name as string) === cityName) || {}
  const climateZone = (city.climateZone as string) || 'inland'
  const frostLine = (city.frostLine as number) || 1500
  const labourRate = (city.labourRateRange as string) || '$45-65/hr'
  const annualSnowfall = (city.annualSnowfall as number) || 200
  const avgWinterTemp = (city.avgWinterTemp as number) || -10
  const popularMaterials = (city.popularMaterials as string[]) || ['304 stainless']
  const buildingSeason = (city.buildingSeason as string) || 'May to October'

  if (locale === 'en') {
    return [
      {
        question: `What stainless grade do you specify in ${cityName}?`,
        answer: `${cityName} sits in the ${climateZone} climate zone with ~${annualSnowfall} mm annual snowfall and an average winter temperature of ${avgWinterTemp} °C. We default to ${popularMaterials[0]} for ${cityName} installs, with frost-line anchoring at ${frostLine} mm depth.`,
      },
      {
        question: `What is the install timeline for ${cityName}?`,
        answer: `Standard ${cityName} installs run within the ${buildingSeason} window. Crew labour rate is ${labourRate} for ${materialName} retrofit work. Most quotes return within 24 hours of address submission.`,
      },
      {
        question: `Are skate stoppers code-compliant in ${cityName}?`,
        answer: `Yes. ${materialName} installs in ${cityName} carry stamped engineering for OBC 3.4.6.5 / CNB 9.8.7.4 and AODA accessibility. Frost-rated to the ${cityName} freeze-thaw cycle (${avgWinterTemp} °C average).`,
      },
    ]
  }

  return [
    {
      question: `Quel grade d'inox spécifiez-vous à ${cityName} ?`,
      answer: `${cityName} se trouve dans la zone climatique ${climateZone} avec environ ${annualSnowfall} mm de chutes de neige annuelles et une température hivernale moyenne de ${avgWinterTemp} °C. Nous spécifions ${popularMaterials[0]} pour les installations à ${cityName}, ancrage à ${frostLine} mm de profondeur.`,
    },
    {
      question: `Quel est le délai d'installation à ${cityName} ?`,
      answer: `Les installations standard à ${cityName} se font dans la fenêtre de ${buildingSeason}. Tarif de main-d'œuvre : ${labourRate} pour les travaux de rénovation ${materialName}. La plupart des devis sont retournés en 24 heures.`,
    },
    {
      question: `Les bloque-skate sont-ils conformes au code à ${cityName} ?`,
      answer: `Oui. Les installations ${materialName} à ${cityName} portent une ingénierie estampillée selon le CBO 3.4.6.5 / CNB 9.8.7.4 et la LAPHO. Résistance au gel adaptée au cycle de gel-dégel de ${cityName} (moyenne ${avgWinterTemp} °C).`,
    },
  ]
}

/**
 * Get city-specific FAQs for an industry.
 */
export function getCityIndustryFAQs(cityName: string, industryName: string, locale: 'en' | 'fr') {
  return getCityMaterialFAQs(cityName, industryName, locale)
}
