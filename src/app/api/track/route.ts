import { NextRequest, NextResponse } from 'next/server'
import { saveVisit } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { path, referrer, city, locale, userAgent: clientUA } = data

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = clientUA || request.headers.get('user-agent') || ''

    await saveVisit({
      path,
      referrer: referrer || '',
      city: city || '',
      locale: locale || 'en',
      userAgent,
      ip,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API /track] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
