import { NextRequest, NextResponse } from 'next/server'
import { saveQuote } from '@/lib/db'
import { sendQuoteEmail } from '@/lib/email'
import { pushLead } from '@/lib/leads-hub'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (typeof data.website === 'string' && data.website.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    const { name, email, phone, service, lotSize, message, city, page, locale } = data

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Get client info
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || ''

    // Save to database
    const quote = await saveQuote({
      name,
      email,
      phone: phone || '',
      service: service || '',
      lotSize: lotSize || '',
      message: message || '',
      city: city || '',
      page: page || '',
      locale: locale || 'en',
      ip,
      userAgent,
    })

    // Push to Leads Hub (fire-and-forget, queues to outbox on failure)
    void pushLead({
      external_id: String(quote.id),
      created_at: quote.createdAt ?? new Date().toISOString(),
      name,
      email,
      phone: phone || null,
      message: message || null,
      city: city || null,
      service: service || null,
      page_url: page || null,
      raw_payload: {
        id: quote.id,
        name,
        email,
        phone: phone || '',
        service: service || '',
        lot_size: lotSize || '',
        message: message || '',
        city: city || '',
        page: page || '',
        locale: locale || 'en',
        ip,
        user_agent: userAgent,
      },
    })

    // Send email notification (non-blocking)
    sendQuoteEmail({
      name,
      email,
      phone: phone || '',
      service: service || '',
      lotSize: lotSize || '',
      message: message || '',
      city: city || '',
      page: page || '',
      locale: locale || 'en',
    }).catch(err => console.error('[Quote Email] Failed:', err))

    return NextResponse.json({ success: true, id: quote.id })
  } catch (error) {
    console.error('[API /quote] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
