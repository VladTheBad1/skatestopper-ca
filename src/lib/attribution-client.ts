/**
 * First-touch attribution capture — drop-in browser module for .ca sites.
 *
 * Records where the visitor originally came from (document.referrer + UTM /
 * click-id params) in localStorage on their first page view, so the quote
 * form can attach it to the lead even if it is submitted many pages (or days)
 * later. The hub classifies the data into a source label: ChatGPT,
 * Perplexity, Google, Google Ads, Facebook, Direct, …
 *
 * Runtime: browser only. Zero dependencies.
 *
 * Canonical source: https://github.com/tgsimdev-ai/sites-hub/blob/feat/crm/clients/attribution-client.ts
 * Copy into each site as `src/lib/attribution-client.ts` and do not hand-edit.
 *
 * Wire-up:
 *   1. Call `captureAttribution()` on every page view — e.g. in a tiny
 *      "use client" component mounted from the root layout:
 *        useEffect(() => { captureAttribution() }, [pathname])
 *   2. On quote-form submit, include `getAttribution()` in the POST body.
 *   3. In the site's /api/quote, forward it to the hub via pushLead:
 *        referrer: body.attribution?.referrer ?? null,
 *        utm:      body.attribution?.utm ?? null,
 *        raw_payload: { ...rest, landing_page: body.attribution?.landing_page }
 */

export interface Attribution {
  /** External referrer of the first visit (null = direct / same-site). */
  readonly referrer: string | null
  /** First page seen, path + query. */
  readonly landing_page: string | null
  /** utm_* and ad click-id params seen on the first visit. */
  readonly utm: Record<string, string> | null
}

const STORAGE_KEY = "lh_attr"
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "msclkid",
  "fbclid",
  "ref",
] as const

function readParams(search: string): Record<string, string> | null {
  const params = new URLSearchParams(search)
  const out: Record<string, string> = {}
  for (const key of TRACKED_PARAMS) {
    const v = params.get(key)
    if (v) out[key] = v.slice(0, 500)
  }
  return Object.keys(out).length > 0 ? out : null
}

function externalReferrer(): string | null {
  const ref = document.referrer
  if (!ref) return null
  try {
    const host = new URL(ref).hostname
    return host && host !== window.location.hostname ? ref.slice(0, 2000) : null
  } catch {
    return null
  }
}

function snapshot(): Attribution {
  return {
    referrer: externalReferrer(),
    landing_page: (window.location.pathname + window.location.search).slice(0, 2000),
    utm: readParams(window.location.search),
  }
}

/**
 * Persists first-touch attribution. Call on every page view; only the first
 * one (per browser) writes. A later visit that arrives with fresh UTM params
 * or an external referrer overwrites a stored plain-direct record, so a
 * "came back via ChatGPT" visit isn't lost behind an old direct landing.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return
  try {
    const current = snapshot()
    const storedRaw = window.localStorage.getItem(STORAGE_KEY)
    if (storedRaw) {
      const stored = JSON.parse(storedRaw) as Attribution
      const storedIsDirect = !stored.referrer && !stored.utm
      const currentHasSignal = Boolean(current.referrer || current.utm)
      if (!storedIsDirect || !currentHasSignal) return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    /* storage unavailable (private mode etc.) — attribution degrades to live values */
  }
}

/**
 * Attribution to attach to a lead. Falls back to live page values when
 * nothing was captured (e.g. captureAttribution was never wired).
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { referrer: null, landing_page: null, utm: null }
  }
  try {
    const storedRaw = window.localStorage.getItem(STORAGE_KEY)
    if (storedRaw) return JSON.parse(storedRaw) as Attribution
  } catch {
    /* fall through to live snapshot */
  }
  return snapshot()
}
