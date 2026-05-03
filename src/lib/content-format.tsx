import React from 'react'

/**
 * Universal auto-bold patterns — match across any niche.
 * Catches: $ amounts, $ ranges, percentages, time spans, year/week/day
 * counts, year/week/day ranges, year-prefixed labels (e.g. "10-year"),
 * and bare 4-digit year tokens followed by "(", "standard", or "spec".
 */
const BASE_TOKEN_SOURCE =
  '\\$[\\d,]+(?:\\.\\d{2})?(?:\\s*[\u2013\u2014-]\\s*\\$?[\\d,]+(?:\\.\\d{2})?)?' +
  '|\\d+(?:[.,]\\d+)?\\s*(?:%|hours?|days?|weeks?|months?|years?|business\\s*days?)' +
  '|\\d+-(?:year|month|day|hour|week)' +
  '|\\d+\\s*[\u2013\u2014-]\\s*\\d+\\s*(?:weeks?|days?|months?|hours?|years?|units?)' +
  '|\\b\\d{4}\\b(?=\\s*\\(|\\s*standard|\\s*spec)'

interface AutoBoldOpts {
  /**
   * Extra regex source to OR into the base pattern. Use this to add
   * niche-specific tokens (e.g. compliance codes, units of measure).
   * The string is treated as a regex source — escape your literals.
   */
  extraTokens?: string
}

/**
 * Auto-bold meaningful tokens inside a paragraph of plain text. Returns
 * React nodes. Niche-neutral by default; pass `extraTokens` to extend.
 *
 * Example: autoBold(text, { extraTokens: 'kPa|NBCC|AODA' })
 */
export function autoBold(text: string, opts?: AutoBoldOpts): React.ReactNode[] {
  const pattern = opts?.extraTokens
    ? `${BASE_TOKEN_SOURCE}|${opts.extraTokens}`
    : BASE_TOKEN_SOURCE
  const re = new RegExp(pattern, 'g')

  const result: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) result.push(text.slice(lastIndex, match.index))
    result.push(
      <strong key={match.index} className="text-[var(--text)] font-semibold">
        {match[0]}
      </strong>,
    )
    lastIndex = re.lastIndex
  }
  if (lastIndex < text.length) result.push(text.slice(lastIndex))
  return result.length > 0 ? result : [text]
}

/**
 * Generate Key Takeaways from an entity's data fields. Niche-neutral —
 * uses ONLY values supplied in `data`; emits no canned closers.
 *
 * If the entity supplies its own `keyTakeaways` array, that is returned
 * verbatim. Otherwise the function derives 1–4 bullets from price,
 * features, and a warranty regex match.
 */
export function generateKeyTakeaways(
  data: {
    name: string
    priceRange?: string
    features?: string[]
    description?: string
    /** Pre-authored bullets — if present, returned as-is. */
    keyTakeaways?: string[]
  },
  locale: 'en' | 'fr' = 'en',
): string[] {
  if (data.keyTakeaways && data.keyTakeaways.length > 0) {
    return data.keyTakeaways.slice(0, 5)
  }

  const out: string[] = []
  const desc = data.description || ''
  const ft = data.features || []

  if (data.priceRange) {
    out.push(
      locale === 'en'
        ? `${data.name} pricing: ${data.priceRange}`
        : `Tarification ${data.name} : ${data.priceRange}`,
    )
  }

  if (ft.length >= 2) {
    out.push(
      (locale === 'en' ? 'Key features: ' : 'Caractéristiques clés : ') +
        ft.slice(0, 3).join(', '),
    )
  }

  const warMatch =
    desc.match(/(\d+)[- ]year(?:s)?\s+(?:[\w-]+\s+)?warranty/i) ||
    desc.match(/garantie\s+(?:[\w-]+\s+)?de\s+(\d+)\s*ans/i)
  if (warMatch) {
    out.push(
      locale === 'en'
        ? `Backed by a ${warMatch[1]}-year warranty`
        : `Garantie de ${warMatch[1]} ans`,
    )
  }

  return out.slice(0, 5)
}

/**
 * Key Takeaways callout — accent-bordered tinted box at the top of
 * long-form copy. Visually neutral; works for any niche.
 */
export function KeyTakeaways({
  items,
  locale = 'en',
}: {
  items: string[]
  locale?: 'en' | 'fr'
}) {
  if (!items || items.length === 0) return null
  const title = locale === 'fr' ? 'Points clés' : 'Key Takeaways'
  return (
    <div className="bg-[var(--accent)]/5 border-l-4 border-[var(--accent)] rounded-r-xl p-6 mb-8">
      <h3 className="font-bold text-[var(--text)] text-lg mb-3">{title}</h3>
      <ul className="space-y-2 list-none p-0 m-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[var(--text-light)] text-sm leading-relaxed"
          >
            <span className="text-[var(--accent)] font-bold mt-0.5 flex-shrink-0">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
