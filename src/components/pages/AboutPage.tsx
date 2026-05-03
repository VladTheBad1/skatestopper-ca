import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import { siteConfig } from '@/config/site-config'
import { renderProse } from '@/lib/prose'
import about from '@/data/about.json'

interface AboutPageProps {
  locale: 'en' | 'fr'
}

const T = {
  en: {
    aboutTitle: `About ${siteConfig.brandName}`,
    breadcrumb: 'About Us',
    storyEyebrow: 'Our Story',
    storyTitle: 'How we got here',
    storyHighlight: 'here',
    valueEyebrow: 'Why Choose Us',
    valueTitle: `Why ${siteConfig.brandName}`,
    valueHighlight: siteConfig.brandName,
    serviceEyebrow: 'Coverage',
    serviceTitle: 'Where we deliver',
    serviceHighlight: 'deliver',
    credEyebrow: 'Credentials',
    credTitle: 'Certifications & Memberships',
    credHighlight: 'Certifications',
  },
  fr: {
    aboutTitle: `À Propos de ${siteConfig.brandName}`,
    breadcrumb: 'À Propos',
    storyEyebrow: 'Notre Histoire',
    storyTitle: 'Comment nous en sommes arrivés là',
    storyHighlight: 'là',
    valueEyebrow: 'Pourquoi Nous',
    valueTitle: `Pourquoi ${siteConfig.brandName}`,
    valueHighlight: siteConfig.brandName,
    serviceEyebrow: 'Couverture',
    serviceTitle: 'Où nous livrons',
    serviceHighlight: 'livrons',
    credEyebrow: 'Accréditations',
    credTitle: 'Certifications et adhésions',
    credHighlight: 'Certifications',
  },
} as const

export default function AboutPage({ locale }: AboutPageProps) {
  const tt = T[locale]
  const story = locale === 'en' ? about.companyStoryEn : about.companyStoryFr
  const value = locale === 'en' ? about.valuePropositionEn : about.valuePropositionFr
  const area = locale === 'en' ? about.serviceAreaEn : about.serviceAreaFr
  const creds: string[] =
    locale === 'en' ? (about.credentialsEn as string[]) : (about.credentialsFr as string[])

  return (
    <main>
      <PageHero
        title={tt.aboutTitle}
        subtitle={locale === 'en' ? siteConfig.descriptionEn : siteConfig.descriptionFr}
        breadcrumbs={[{ label: tt.breadcrumb }]}
        locale={locale}
        imageSrc="/images/hero/hero.webp"
        imageAlt={locale === 'en'
          ? 'Stainless skate stoppers and skateboard deterrents installed on a granite ledge in a Canadian downtown plaza'
          : 'Bloque-skate en inox et dissuasifs anti-planche à roulettes installés sur un rebord en granite, place urbaine canadienne'}
      />

      {/* Our Story */}
      <section className="py-16 lg:py-20 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeader
            eyebrow={tt.storyEyebrow}
            title={tt.storyTitle}
            highlight={tt.storyHighlight}
            className="mb-8"
          />
          {renderProse(story, { sentencesPerChunk: 5 })}
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 lg:py-20 bg-[var(--bg-section)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeader
            eyebrow={tt.valueEyebrow}
            title={tt.valueTitle}
            highlight={tt.valueHighlight}
            className="mb-8"
          />
          {renderProse(value, { sentencesPerChunk: 4 })}
        </div>
      </section>

      {/* Service area */}
      <section className="py-16 lg:py-20 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeader
            eyebrow={tt.serviceEyebrow}
            title={tt.serviceTitle}
            highlight={tt.serviceHighlight}
            className="mb-8"
          />
          {renderProse(area, { sentencesPerChunk: 3 })}
        </div>
      </section>

      {/* Credentials grid */}
      {creds && creds.length > 0 && (
        <section className="py-16 lg:py-20 bg-[var(--bg-section)]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={tt.credEyebrow}
              title={tt.credTitle}
              highlight={tt.credHighlight}
              align="center"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creds.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:shadow-lg hover:border-[var(--accent)]/30 transition-all"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[var(--accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="font-medium text-[var(--text)] text-sm leading-snug">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
</main>
  )
}
