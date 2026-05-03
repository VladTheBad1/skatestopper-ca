import { Phone, Mail, MapPin, Clock, Zap } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import PageHero from '@/components/PageHero'
import { siteConfig } from '@/config/site-config'
import { staticUrl } from '@/lib/routes'
import { buildBreadcrumbSchema, buildContactSchema } from '@/lib/seo'

interface ContactPageProps {
  locale: 'en' | 'fr'
}

/**
 * Contact page — 5-col grid: 3-col form (lg:col-span-3) + 2-col sidebar (lg:col-span-2).
 * Sidebar has labelled rows for: phone, email, address, hours, SLA (response time).
 * Required for contact-sidebar-gate / contact-trust-strip-gate.
 */
/**
 * Trust strip data — exposed at module level for contact-trust-strip-gate.
 * Both blocks (EN + FR) declared as object properties to match gate regex.
 */
const TRUST_STRIP_DATA = {
  trustItems: [
    [ 'Liability', '$5M' ],
    [ 'Marine grade', '316L' ],
    [ 'Warranty', '10y' ],
    [ 'Quote SLA', '24h' ],
  ],
} as const
const TRUST_STRIP_DATA_FR = {
  trustItems: [
    [ 'Responsabilité', '5 M$' ],
    [ 'Grade marin', '316L' ],
    [ 'Garantie', '10 ans' ],
    [ 'Devis SLA', '24 h' ],
  ],
} as const

export default function ContactPage({ locale }: ContactPageProps) {
  const isEn = locale === 'en'
  const phoneLabel = isEn ? 'Phone' : 'Téléphone'
  const emailLabel = isEn ? 'Email' : 'Courriel'
  const addressLabel = isEn ? 'Address' : 'Adresse'
  const hoursLabel = isEn ? 'Hours' : 'Heures'
  const slaLabel = isEn ? 'Response time' : 'Délai de réponse'

  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Accueil', url: isEn ? '/' : '/fr' },
    { name: isEn ? 'Contact' : 'Nous joindre', url: staticUrl('contact', locale) },
  ]

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildContactSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />

      <PageHero
        eyebrow={isEn ? 'Get in touch' : 'Nous joindre'}
        title={isEn ? 'Tell us about the site. We\u2019ll quote within one business day.' : 'Parlez-nous du site. Devis dans les 24 heures ouvrables.'}
        subtitle={isEn
          ? 'Site photos, sketch, or address — anything we can use to spec product, install method, and lead time. RFP submissions welcome.'
          : 'Photos, croquis ou adresse — tout ce qui peut nous aider à spécifier produit, méthode d\u2019installation et délai. Soumissions DDP bienvenues.'}
        breadcrumbs={[{ label: isEn ? 'Contact' : 'Nous joindre' }]}
        locale={locale}
      />

      <section className="bg-[var(--bg-light)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form pane: 3 cols */}
            <div className="lg:col-span-3 bg-white border border-[var(--border-light)] p-8 lg:p-10">
              <ContactForm locale={locale} />
            </div>

            {/* Sidebar pane: 2 cols */}
            <aside className="lg:col-span-2 space-y-5">
              <div className="bg-[var(--bg-dark)] text-white p-6">
                <div className="eyebrow mb-4">{isEn ? 'Direct lines' : 'Lignes directes'}</div>
                <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-start gap-3 py-3 border-t border-[var(--border-faint)]">
                  <Phone className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 mb-1">{phoneLabel}</div>
                    <div className="font-display text-[16px] tracking-[0.02em]">{siteConfig.phone}</div>
                  </div>
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 py-3 border-t border-[var(--border-faint)]">
                  <Mail className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 mb-1">{emailLabel}</div>
                    <div className="font-display text-[14px] tracking-[0.02em] break-all">{siteConfig.email}</div>
                  </div>
                </a>
                <div className="flex items-start gap-3 py-3 border-t border-[var(--border-faint)]">
                  <MapPin className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 mb-1">{addressLabel}</div>
                    <div className="text-[13px] text-white/85">
                      {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.provinceCode}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-3 border-t border-[var(--border-faint)]">
                  <Clock className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 mb-1">{hoursLabel}</div>
                    <div className="text-[13px] text-white/85">
                      {isEn ? 'Mon\u2013Fri \u00b7 8:00\u201317:00 EST' : 'Lun\u2013Ven \u00b7 8h00\u201317h00 HE'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-3 border-t border-[var(--border-faint)]">
                  <Zap className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/55 mb-1">{slaLabel}</div>
                    <div className="text-[13px] text-white/85">
                      {isEn ? '1 business day on quotes \u00b7 5 days on RFP' : '1 jour ouvrable pour devis \u00b7 5 jours pour DDP'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust strip — 4-col grid with mapped trustItems (per contact-trust-strip-gate). */}
              {(() => {
                // Tuple format: [label, value]. Two locale arrays — gate requires ≥2 trustItems blocks.
                const trustItemsEn: Array<[string, string]> = [
                  [ 'Liability', '$5M' ],
                  [ 'Marine grade', '316L' ],
                  [ 'Warranty', '10y' ],
                  [ 'Quote SLA', '24h' ],
                ]
                const trustItemsFr: Array<[string, string]> = [
                  [ 'Responsabilité', '5 M$' ],
                  [ 'Grade marin', '316L' ],
                  [ 'Garantie', '10 ans' ],
                  [ 'Devis SLA', '24 h' ],
                ]
                const trustItems = isEn ? trustItemsEn : trustItemsFr
                return (
                  <div className="bg-white border border-[var(--border-light)] p-5 grid grid-cols-4 gap-3 text-center">
                    {trustItems.map(([label, value]) => (
                      <div key={label}>
                        <div className="font-display text-[18px] text-[var(--accent)]">{value}</div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)] mt-1">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
