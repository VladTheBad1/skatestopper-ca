'use client'

import { useState } from 'react'
import { siteConfig } from '@/config/site-config'
import { t } from '@/lib/data'

interface ContactFormProps {
  locale: 'en' | 'fr'
}

/**
 * ContactForm — niche-neutral. Labels from translations. Colors from CSS vars.
 */
export default function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const isEn = locale === 'en'

  // Form labels — generic enough to keep simple, but niche-specific
  // project description placeholder comes from translations
  const labels = {
    name: isEn ? 'Full Name' : 'Nom complet',
    nameHint: isEn ? 'John Smith' : 'Jean Tremblay',
    email: isEn ? 'Email' : 'Courriel',
    phone: isEn ? 'Phone' : 'Téléphone',
    city: isEn ? 'City' : 'Ville',
    cityHint: siteConfig.defaultCity || 'Toronto',
    project: t('contactForm.projectLabel', locale) || (isEn ? 'Tell us about your project' : 'Parlez-nous de votre projet'),
    projectHint: t('contactForm.projectHint', locale) || '',
    submit: t('nav.getQuote', locale) || (isEn ? 'Send Request' : 'Envoyer'),
    sending: isEn ? 'Sending...' : 'Envoi...',
    thanks: isEn ? 'Thank you!' : 'Merci!',
    thanksSub: t('contactForm.thanksSub', locale) || (isEn ? 'We\'ll respond within 24 hours.' : 'Nous répondrons dans les 24 heures.'),
    error: isEn ? 'Something went wrong. Please try again.' : 'Une erreur est survenue. Réessayez.',
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const form = new FormData(e.currentTarget)
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone'),
          city: form.get('city'),
          message: form.get('message'),
          locale,
          // window is always defined in form submit handler (client-only event)
          page: window.location.pathname,
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-16">
        <span className="text-[var(--primary)] text-5xl block mb-4">✓</span>
        <h3 className="text-2xl font-bold text-[var(--text)] mb-2">{labels.thanks}</h3>
        <p className="text-[var(--text-light)]">{labels.thanksSub}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">{labels.name} *</label>
          <input name="name" required placeholder={labels.nameHint}
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">{labels.email} *</label>
          <input name="email" type="email" required placeholder="email@example.com"
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">{labels.phone}</label>
          <input name="phone" type="tel" placeholder="(416) 555-0100"
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">{labels.city} *</label>
          <input name="city" required placeholder={labels.cityHint}
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-[var(--text)] mb-2">{labels.project}</label>
        <textarea name="message" rows={4} placeholder={labels.projectHint}
          className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors resize-none" />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">{labels.error}</p>
      )}

      <button type="submit" disabled={status === 'sending'}
        className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:opacity-90 text-white font-bold rounded-lg transition-all disabled:opacity-50">
        {status === 'sending' ? labels.sending : labels.submit}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </button>
    </form>
  )
}
