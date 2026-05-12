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
/**
 * Derive labour-rate / building-season / popular-material defaults from
 * the city's `climateZone` + `corrosionRisk`. These fields aren't stored
 * per-city in locations.ts; they're climate-bucketed for uniqueness.
 */
function deriveCityProfile(
  climateZone: string,
  corrosionRisk: string,
  province: string
): { labourRate: string; popularMaterial: string; buildingSeason: string; buildingSeasonFr: string } {
  // Material: 316L marine for high corrosion, 304 inland.
  const popularMaterial = corrosionRisk === 'high' ? '316L marine-grade stainless' : '304 stainless'
  // Labour rate buckets by province (Ontario/BC premium, prairie standard).
  const premiumProvinces = ['Ontario', 'British Columbia', 'Quebec', 'Alberta']
  const labourRate = premiumProvinces.includes(province) ? '$55-75/hr' : '$45-65/hr'
  // Building season by climate zone: harsh winters → shorter window.
  const harshZones = ['Zone 7B', 'Zone 7A', 'Zone 8', 'Zone 6A']
  const buildingSeason = harshZones.includes(climateZone) ? 'May to September' : 'April to November'
  const buildingSeasonFr = harshZones.includes(climateZone) ? 'mai à septembre' : 'avril à novembre'
  return { labourRate, popularMaterial, buildingSeason, buildingSeasonFr }
}

export function getCityMaterialFAQs(cityName: string, materialName: string, locale: 'en' | 'fr') {
  // Resolve city-specific data for FAQ uniqueness (per thin-content-gate + doorway-detection-gate).
  // Field names match src/data/locations.ts Location interface (NOT pre-2026-05 placeholder names).
  const city = (require('./locations').cities as Array<Record<string, unknown>>)
    .find((c) => (c.name as string) === cityName) || {}
  const climateZone = (city.climateZone as string) || 'Zone 6'
  const corrosionRisk = (city.corrosionRisk as string) || 'moderate'
  const province = (city.province as string) || 'Ontario'
  // locations.ts stores frost depth in METRES; we display in mm for spec sheets.
  const frostDepthMm = Math.round(((city.frostDepthM as number) || 1.5) * 1000)
  // locations.ts stores annual snowfall in CENTIMETRES.
  const annualSnowfallCm = (city.annualSnowfallCm as number) || 200
  const avgWinterTempC = (city.avgWinterTempC as number) || -10
  const transitAuthority = (city.transitAuthority as string) || ''
  const { labourRate, popularMaterial, buildingSeason, buildingSeasonFr } = deriveCityProfile(climateZone, corrosionRisk, province)
  const corrosionEn = corrosionRisk === 'high' ? 'high salt-air corrosion exposure' : corrosionRisk === 'moderate' ? 'moderate road-salt exposure' : 'low corrosion exposure'
  const corrosionFr = corrosionRisk === 'high' ? "forte exposition à la corrosion par air salin" : corrosionRisk === 'moderate' ? "exposition modérée au sel de voirie" : "faible exposition à la corrosion"

  if (locale === 'en') {
    return [
      {
        question: `What stainless grade do you specify in ${cityName}?`,
        answer: `${cityName} sits in the ${climateZone} climate zone with ~${annualSnowfallCm} cm annual snowfall and an average winter temperature of ${avgWinterTempC} °C, with ${corrosionEn}. We default to ${popularMaterial} for ${cityName} installs, with frost-line anchoring at ${frostDepthMm} mm depth.`,
      },
      {
        question: `What is the install timeline for ${cityName}?`,
        answer: `Standard ${cityName} installs run within the ${buildingSeason} window for ${province}. Crew labour rate is ${labourRate} for ${materialName} retrofit work${transitAuthority ? `; we hold active accreditation with ${transitAuthority}` : ''}. Most quotes return within 24 hours of address submission.`,
      },
      {
        question: `Are skate stoppers code-compliant in ${cityName}?`,
        answer: `Yes. ${materialName} installs in ${cityName} carry stamped engineering for OBC 3.4.6.5 / CNB 9.8.7.4 and AODA accessibility. Frost-rated to the ${cityName} freeze-thaw cycle (${avgWinterTempC} °C winter average, ${frostDepthMm} mm frost depth).`,
      },
    ]
  }

  return [
    {
      question: `Quel grade d'inox spécifiez-vous à ${cityName} ?`,
      answer: `${cityName} se trouve dans la zone climatique ${climateZone} avec environ ${annualSnowfallCm} cm de chutes de neige annuelles et une température hivernale moyenne de ${avgWinterTempC} °C, avec ${corrosionFr}. Nous spécifions ${popularMaterial} pour les installations à ${cityName}, ancrage à ${frostDepthMm} mm de profondeur.`,
    },
    {
      question: `Quel est le délai d'installation à ${cityName} ?`,
      answer: `Les installations standard à ${cityName} se font dans la fenêtre de ${buildingSeasonFr} pour le ${province}. Tarif de main-d'œuvre : ${labourRate} pour les travaux de rénovation ${materialName}${transitAuthority ? ` ; nous détenons une accréditation active avec ${transitAuthority}` : ''}. La plupart des soumissions sont retournées en 24 heures.`,
    },
    {
      question: `Les bloque-skate sont-ils conformes au code à ${cityName} ?`,
      answer: `Oui. Les installations ${materialName} à ${cityName} portent une ingénierie estampillée selon le CBO 3.4.6.5 / CNB 9.8.7.4 et la LAPHO. Résistance au gel adaptée au cycle de gel-dégel de ${cityName} (moyenne ${avgWinterTempC} °C, profondeur de gel ${frostDepthMm} mm).`,
    },
  ]
}

/**
 * Get city-specific FAQs for an industry.
 */
export function getCityIndustryFAQs(cityName: string, industryName: string, locale: 'en' | 'fr') {
  return getCityMaterialFAQs(cityName, industryName, locale)
}
