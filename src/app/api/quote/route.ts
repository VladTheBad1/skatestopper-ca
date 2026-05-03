import { NextRequest, NextResponse } from 'next/server'
import { saveQuote } from '@/lib/db'
import { sendQuoteEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

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
