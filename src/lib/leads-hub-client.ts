/**
 * Leads Hub client — drop-in module for .ca sites.
 *
 * Responsibilities:
 *   1. Sign and POST a single lead to the Leads Hub ingest endpoint.
 *   2. If delivery fails (network / 5xx), append to a local JSONL outbox.
 *   3. Flush outbox on demand (cron / startup timer).
 *
 * Runtime: Node.js 18+ (needs built-in `fetch`). Zero external dependencies.
 *
 * Canonical source: https://github.com/tgsimdev-ai/sites-hub/blob/feat/crm/clients/leads-hub-client.ts
 * Copy into each site as `src/lib/leads-hub-client.ts` (or wherever convenient)
 * and do not hand-edit. Re-copy when the canonical version changes.
 */

import { createHmac } from "node:crypto"
import { promises as fs } from "node:fs"
import * as path from "node:path"

export interface LeadsHubConfig {
  readonly hubUrl: string
  readonly siteId: string
  readonly secret: string
  /** Absolute path to the JSONL outbox. Auto-created on first failure. */
  readonly outboxPath: string
  /** Hard timeout for a single POST attempt. Defaults to 5s. */
  readonly timeoutMs?: number
  /** Opaque logger. Defaults to console.warn. */
  readonly logger?: (msg: string, meta?: Record<string, unknown>) => void
}

export interface LeadPayload {
  readonly external_id: string
  readonly created_at: string
  readonly name?: string | null
  readonly email?: string | null
  readonly phone?: string | null
  readonly message?: string | null
  readonly city?: string | null
  readonly service?: string | null
  readonly utm?: Record<string, unknown> | null
  /** document.referrer of the visit (first-touch preferred) — the hub classifies it into a source (ChatGPT, Google, …). */
  readonly referrer?: string | null
  readonly page_url?: string | null
  readonly raw_payload: Record<string, unknown>
}

interface OutboxEntry {
  readonly ts: string
  readonly payload: LeadPayload
  readonly attempts: number
  readonly lastError: string
}

export type PushOutcome = "delivered" | "queued" | "dropped"

export interface PushResult {
  readonly outcome: PushOutcome
  readonly status?: number
  readonly error?: string
}

function defaultLogger(msg: string, meta?: Record<string, unknown>): void {
  // eslint-disable-next-line no-console
  console.warn(`[leads-hub] ${msg}`, meta ?? "")
}

function sign(secret: string, timestamp: string, body: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")
}

async function postSigned(
  cfg: LeadsHubConfig,
  payload: LeadPayload,
  path: string,
): Promise<{ status: number; body: string }> {
  const body = JSON.stringify(payload)
  const ts = String(Date.now())
  const controller = new AbortController()
  const to = setTimeout(() => controller.abort(), cfg.timeoutMs ?? 5_000)
  try {
    const res = await fetch(cfg.hubUrl.replace(/\/+$/, "") + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Site-Id": cfg.siteId,
        "X-Timestamp": ts,
        "X-Signature": sign(cfg.secret, ts, body),
      },
      body,
      signal: controller.signal,
    })
    const text = await res.text()
    return { status: res.status, body: text }
  } finally {
    clearTimeout(to)
  }
}

async function appendToOutbox(cfg: LeadsHubConfig, entry: OutboxEntry): Promise<void> {
  await fs.mkdir(path.dirname(cfg.outboxPath), { recursive: true })
  await fs.appendFile(cfg.outboxPath, JSON.stringify(entry) + "\n", { encoding: "utf8" })
}

/**
 * Fire-and-forget from the caller's POV: sends the lead, or queues it to the
 * local outbox for later retry. Never throws; callers should not await unless
 * they want delivery confirmation.
 */
export async function pushLead(
  cfg: LeadsHubConfig,
  payload: LeadPayload,
): Promise<PushResult> {
  const log = cfg.logger ?? defaultLogger
  try {
    const res = await postSigned(cfg, payload, "/api/ingest")
    if (res.status >= 200 && res.status < 300) {
      return { outcome: "delivered", status: res.status }
    }
    if (res.status >= 400 && res.status < 500) {
      // Configuration / payload error — do NOT retry; just log and drop.
      log(`dropping lead id=${payload.external_id} status=${res.status}`, { body: res.body })
      return { outcome: "dropped", status: res.status, error: res.body }
    }
    // 5xx — retry via outbox.
    await appendToOutbox(cfg, {
      ts: new Date().toISOString(),
      payload,
      attempts: 1,
      lastError: `http_${res.status}`,
    })
    return { outcome: "queued", status: res.status, error: res.body }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    // Network / timeout — queue for retry.
    await appendToOutbox(cfg, {
      ts: new Date().toISOString(),
      payload,
      attempts: 1,
      lastError: msg,
    })
    return { outcome: "queued", error: msg }
  }
}

export interface FlushReport {
  readonly sent: number
  readonly requeued: number
  readonly dropped: number
}

/**
 * Drains the outbox: for each queued entry, POSTs via /api/ingest/batch.
 * Entries that stay queued are written back; delivered / dropped are removed.
 * Safe to call concurrently only if the caller owns the file (e.g. single PM2
 * fork). For multi-fork setups, wrap in a cross-process lock.
 */
export async function flushOutbox(cfg: LeadsHubConfig): Promise<FlushReport> {
  const log = cfg.logger ?? defaultLogger
  let raw: string
  try {
    raw = await fs.readFile(cfg.outboxPath, "utf8")
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return { sent: 0, requeued: 0, dropped: 0 }
    throw e
  }
  const lines = raw.split("\n").filter(Boolean)
  if (lines.length === 0) return { sent: 0, requeued: 0, dropped: 0 }

  const entries: OutboxEntry[] = []
  for (const line of lines) {
    try {
      entries.push(JSON.parse(line) as OutboxEntry)
    } catch {
      log("skipping unparseable outbox line")
    }
  }

  const remaining: OutboxEntry[] = []
  let sent = 0
  let dropped = 0

  // Chunk into batches of 100 records.
  const chunkSize = 100
  for (let i = 0; i < entries.length; i += chunkSize) {
    const chunk = entries.slice(i, i + chunkSize)
    const body = JSON.stringify({ records: chunk.map((e) => e.payload) })
    const ts = String(Date.now())
    try {
      const res = await fetch(cfg.hubUrl.replace(/\/+$/, "") + "/api/ingest/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Site-Id": cfg.siteId,
          "X-Timestamp": ts,
          "X-Signature": sign(cfg.secret, ts, body),
        },
        body,
      })
      if (res.status >= 200 && res.status < 300) {
        sent += chunk.length
        continue
      }
      if (res.status >= 400 && res.status < 500) {
        log(`batch dropped status=${res.status}`)
        dropped += chunk.length
        continue
      }
      // 5xx — keep for next run with attempts++.
      for (const e of chunk) {
        remaining.push({ ...e, attempts: e.attempts + 1, lastError: `http_${res.status}` })
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      for (const it of chunk) {
        remaining.push({ ...it, attempts: it.attempts + 1, lastError: msg })
      }
    }
  }

  // Rewrite outbox with remaining.
  if (remaining.length === 0) {
    await fs.writeFile(cfg.outboxPath, "", { encoding: "utf8" })
  } else {
    await fs.writeFile(
      cfg.outboxPath,
      remaining.map((e) => JSON.stringify(e)).join("\n") + "\n",
      { encoding: "utf8" },
    )
  }

  return { sent, requeued: remaining.length, dropped }
}

/**
 * Starts a periodic flush loop. Returns a cleanup function.
 * Call from server startup. Usually `setInterval` every 5 minutes is enough.
 */
export function startFlushLoop(cfg: LeadsHubConfig, intervalMs = 5 * 60 * 1000): () => void {
  const log = cfg.logger ?? defaultLogger
  const tick = async () => {
    try {
      const r = await flushOutbox(cfg)
      if (r.sent > 0 || r.requeued > 0 || r.dropped > 0) {
        log(`flush: sent=${r.sent} requeued=${r.requeued} dropped=${r.dropped}`)
      }
    } catch (e) {
      log(`flush failed: ${(e as Error).message}`)
    }
  }
  const handle = setInterval(tick, intervalMs)
  // Fire once on startup too.
  void tick()
  return () => clearInterval(handle)
}
