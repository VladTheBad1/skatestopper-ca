/**
 * Site-local prose configuration for SkateStopper.ca.
 *
 * Auto-bolds niche-specific tokens in body copy: compliance codes (CSA,
 * AODA / LAPHO, CNB), Canadian-procurement frameworks, accessibility
 * standards, and units of measure relevant to skate-stopper specification.
 */
export const SITE_AUTOBOLD_TOKENS =
  'CSA(?:\\s*B?\\d+(?:\\.\\d+)?(?:-\\d+)?)?' +
  '|AODA|LAPHO' +
  '|NBCC(?:\\s*\\d{4})?' +
  '|CNB(?:\\s*\\d{4})?' +
  '|CCDC(?:\\s*\\d+[A-Z]?)?' +
  '|RBQ|WSIB|CNESST|WCB|PIPEDA' +
  '|ASTM|ISO\\s*\\d+|LEED|WCAG' +
  '|316L?(?:\\s+marine[- ]grade)?|304\\s+stainless' +
  '|bronze\\s+patina' +
  '|\\$\\d+(?:[.,]\\d+)?(?:[KkMm])?(?:\\s*[-\\u2013]\\s*\\$?\\d+(?:[.,]\\d+)?(?:[KkMm])?)?' +
  '|\\d+(?:[.,]\\d+)?\\s*(?:kPa|mm|cm|m|km|kg|lbs?|°C|W\\/m²K|kWh|V|A|W|lm)' +
  '|\\d{2,}\\+?\\s*(?:units?|cities|provinces|locations|stoppers|installs?|deployments?|agencies|properties)'
