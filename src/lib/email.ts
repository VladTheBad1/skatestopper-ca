import nodemailer from 'nodemailer'
import { siteConfig } from '@/config/site-config'

interface QuoteEmailData {
  name: string
  email: string
  phone: string
  service: string
  lotSize: string
  message: string
  city: string
  page: string
  locale: string
}

function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function sendQuoteEmail(data: QuoteEmailData): Promise<boolean> {
  const transporter = createTransporter()
  const emailTo = process.env.EMAIL_TO || siteConfig.email
  const emailFrom = process.env.EMAIL_FROM || `noreply@${siteConfig.domain}`

  if (!transporter) {
    console.log('[Email] SMTP not configured. Quote data:', JSON.stringify(data))
    return false
  }

  try {
    await transporter.sendMail({
      from: `"${siteConfig.brandName}" <${emailFrom}>`,
      to: emailTo,
      replyTo: data.email,
      subject: `New Quote Request from ${data.name}${data.city ? ` (${data.city})` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: ${siteConfig.brand.primary}; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">New Quote Request</h1>
            <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">${siteConfig.brandName} - ${new Date().toLocaleDateString('en-CA')}</p>
          </div>

          <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px; width: 130px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${data.phone || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px;"><strong>Service:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${data.service || 'Any'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px;"><strong>Lot Size:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${data.lotSize || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px;"><strong>City:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${data.city || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px;"><strong>Page:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${data.page}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 14px;"><strong>Language:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${data.locale === 'fr' ? 'French' : 'English'}</td>
              </tr>
            </table>

            ${
              data.message
                ? `
              <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px;">
                <p style="margin: 0 0 4px; color: #475569; font-size: 13px;"><strong>Message:</strong></p>
                <p style="margin: 0; font-size: 14px; line-height: 1.5;">${data.message}</p>
              </div>
            `
                : ''
            }
          </div>

          <div style="background: #f8fafc; padding: 16px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: 0;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px; text-align: center;">
              This email was sent from the ${siteConfig.brandName} website quote form.
            </p>
          </div>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error('[Email] Failed to send:', error)
    return false
  }
}
