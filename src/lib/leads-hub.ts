/**
 * Per-site helper around leads-hub-client.
 * Copy this into each .ca site as `src/lib/leads-hub.ts`.
 *
 * Reads config from env:
 *   LEADS_HUB_URL       e.g. https://hub.numu.ca
 *   LEADS_HUB_SITE_ID   e.g. bestdecks
 *   LEADS_HUB_SECRET    32-byte hex from register-site CLI
 */
import * as path from "node:path"
import {
  pushLead as _pushLead,
  flushOutbox as _flushOutbox,
  startFlushLoop as _startFlushLoop,
  type LeadsHubConfig,
  type LeadPayload,
} from "./leads-hub-client"

let cachedCfg: LeadsHubConfig | null = null
let loopStarted = false

function resolveCfg(): LeadsHubConfig | null {
  if (cachedCfg) return cachedCfg
  const hubUrl = process.env.LEADS_HUB_URL
  const siteId = process.env.LEADS_HUB_SITE_ID
  const secret = process.env.LEADS_HUB_SECRET
  if (!hubUrl || !siteId || !secret) {
    return null
  }
  cachedCfg = {
    hubUrl,
    siteId,
    secret,
    outboxPath: path.join(process.cwd(), "data", "leads_outbox.jsonl"),
  }
  return cachedCfg
}

/**
 * Fire-and-forget push to the hub. Safe to call from any API route — never
 * throws, never blocks the response for more than ~5s (client timeout).
 * Returns void so callers can `void pushLead(payload)` without awaiting.
 */
export async function pushLead(payload: LeadPayload): Promise<void> {
  const cfg = resolveCfg()
  if (!cfg) {
    console.warn("[leads-hub] not configured (env missing); dropping lead")
    return
  }
  try {
    const r = await _pushLead(cfg, payload)
    if (r.outcome !== "delivered") {
      console.warn(`[leads-hub] push outcome=${r.outcome} status=${r.status ?? "n/a"}`)
    }
  } catch (e) {
    console.error(`[leads-hub] unexpected error: ${(e as Error).message}`)
  }
}

/** Start the background outbox flusher. Idempotent — safe to call multiple times. */
export function initLeadsHubFlusher(): void {
  if (loopStarted) return
  const cfg = resolveCfg()
  if (!cfg) return
  _startFlushLoop(cfg, 5 * 60 * 1000)
  loopStarted = true
}

export async function flushOutboxOnce(): Promise<void> {
  const cfg = resolveCfg()
  if (!cfg) return
  await _flushOutbox(cfg)
}

export type { LeadPayload }
