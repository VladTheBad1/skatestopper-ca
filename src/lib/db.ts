import Database from 'better-sqlite3'
import { join } from 'path'

export interface QuoteSubmission {
  id: string
  name: string
  email: string
  phone: string
  service: string
  lotSize: string
  message: string
  city: string
  page: string
  locale: string
  createdAt: string
  ip: string
  userAgent: string
}

export interface PageVisit {
  id: string
  path: string
  referrer: string
  city: string
  locale: string
  userAgent: string
  ip: string
  createdAt: string
}

// Singleton DB connection
let dbInstance: Database.Database | null = null

function getDb(): Database.Database {
  if (!dbInstance) {
    const dbPath = join(process.cwd(), 'data', 'site.db')
    
    // Ensure data directory exists
    const { mkdirSync, existsSync } = require('fs')
    const dataDir = join(process.cwd(), 'data')
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true })
    }

    dbInstance = new Database(dbPath)
    dbInstance.pragma('journal_mode = WAL')

    // Create tables if they don't exist
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS quotes (
        id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT DEFAULT '',
        service TEXT DEFAULT '',
        lot_size TEXT DEFAULT '',
        message TEXT DEFAULT '',
        city TEXT DEFAULT '',
        page TEXT DEFAULT '',
        locale TEXT DEFAULT 'en',
        ip TEXT DEFAULT '',
        user_agent TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS visits (
        id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
        path TEXT NOT NULL,
        referrer TEXT DEFAULT '',
        city TEXT DEFAULT '',
        locale TEXT DEFAULT 'en',
        user_agent TEXT DEFAULT '',
        ip TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS idx_visits_created ON visits(created_at);
      CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes(created_at);
    `)
  }

  return dbInstance
}

// === QUOTES ===

export async function saveQuote(
  data: Omit<QuoteSubmission, 'id' | 'createdAt'>
): Promise<QuoteSubmission> {
  const db = getDb()
  const stmt = db.prepare(`
    INSERT INTO quotes (name, email, phone, service, lot_size, message, city, page, locale, ip, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const id = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('hex')
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO quotes (id, name, email, phone, service, lot_size, message, city, page, locale, ip, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, data.name, data.email, data.phone, data.service, data.lotSize, data.message, data.city, data.page, data.locale, data.ip, data.userAgent, now)

  return {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    lotSize: data.lotSize,
    message: data.message,
    city: data.city,
    page: data.page,
    locale: data.locale,
    ip: data.ip,
    userAgent: data.userAgent,
    createdAt: now,
  }
}

export async function getQuotes(
  limit = 100,
  offset = 0
): Promise<{ quotes: QuoteSubmission[]; total: number }> {
  const db = getDb()

  const countRow = db.prepare('SELECT COUNT(*) as count FROM quotes').get() as { count: number }
  const rows = db.prepare('SELECT * FROM quotes ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset) as any[]

  return {
    quotes: rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      service: row.service,
      lotSize: row.lot_size,
      message: row.message,
      city: row.city,
      page: row.page,
      locale: row.locale,
      createdAt: row.created_at,
      ip: row.ip,
      userAgent: row.user_agent,
    })),
    total: countRow.count,
  }
}

// === VISITS ===

export async function saveVisit(
  data: Omit<PageVisit, 'id' | 'createdAt'>
): Promise<PageVisit> {
  const db = getDb()

  const id = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('hex')
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO visits (id, path, referrer, city, locale, user_agent, ip, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, data.path, data.referrer, data.city, data.locale, data.userAgent, data.ip, now)

  return {
    id,
    path: data.path,
    referrer: data.referrer,
    city: data.city,
    locale: data.locale,
    userAgent: data.userAgent,
    ip: data.ip,
    createdAt: now,
  }
}
