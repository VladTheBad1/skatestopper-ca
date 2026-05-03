import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import { t, getAllCities } from '@/lib/data'
import { contactUrl, cityUrl, productUrl, staticUrl } from '@/lib/routes'
import { markdownToHtml, stripMarkdown } from '@/lib/markdown'
import { KeyTakeaways } from '@/lib/content-format'
import { autoBold, generateKeyTakeaways } from '@/lib/prose'
import { faqs } from '@/data/faqs'

interface Industry {
  name: string
  slug: string
  slugFr?: string
  short?: string
  description: string
  excerpt?: string
  image?: string
  imageAlt?: string
  useCases?: string[]
  keyTakeaways?: string[]
  proseSubheadings?: string[]
}

interface Product {
  name: string
  slug: string
  slugFr?: string
  short?: string
  description?: string
  image?: string
  features?: string[]
  priceRange?: string
}

interface IndustryDetailPageProps {
  industry: Industry
  relatedProducts: Product[]
  locale: 'en' | 'fr'
}

/* ── Helpers ───────────────────────────────────────────────────────── */

function firstParagraph(md: string | undefined): string {
  if (!md) return ''
  const para = md.split(/\n\n+/).find((p) => p.trim().length > 40)
  return para ? stripMarkdown(para).trim() : ''
}

function firstThreeSentences(md: string | undefined): string {
  const p = firstParagraph(md)
  const sentences = p.match(/[^.!?]+[.!?]+/g)
  return sentences ? sentences.slice(0, 3).join(' ').trim() : p
}

function descriptionRest(md: string | undefined): string {
  if (!md) return ''
  const paras = md.split(/\n\n+/)
  const idx = paras.findIndex((p) => p.trim().length > 40)
  if (idx < 0) return md
  return paras.slice(idx + 1).join('\n\n').trim()
}

function pickFAQs(industryName: string, locale: 'en' | 'fr') {
  const tokens = industryName
    .toLowerCase()
    .replace(/[^a-zà-ÿ0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3)

  const score = (text: string) => {
    const lc = text.toLowerCase()
    return tokens.reduce((acc, tok) => acc + (lc.includes(tok) ? 1 : 0), 0)
  }

  const ranked = faqs
    .map((f) => ({
      f,
      s: score(locale === 'en' ? f.questionEn + ' ' + f.answerEn : f.questionFr + ' ' + f.answerFr),
    }))
    .sort((a, b) => b.s - a.s)

  const picked = (ranked.some((r) => r.s > 0)
    ? ranked.filter((r) => r.s > 0).slice(0, 4)
    : ranked.slice(0, 4)
  ).map((r) => r.f)

  return picked.map((f) => ({
    q: locale === 'en' ? f.questionEn : f.questionFr,
    a: locale === 'en' ? f.answerEn : f.answerFr,
  }))
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function IndustryDetailPage({
  industry,
  relatedProducts,
  locale,
}: IndustryDetailPageProps) {
  const heroBlurb = firstThreeSentences(industry.description) || industry.short || ''
  const longBody = descriptionRest(industry.description)
  const allCities = getAllCities(locale)
  const topCities = allCities
    .filter((c: { population?: number }) => (c.population ?? 0) > 0)
    .sort((a: { population?: number }, b: { population?: number }) => (b.population ?? 0) - (a.population ?? 0))
    .slice(0, 8)
  const industryFaqs = pickFAQs(industry.name, locale)

  const longSentences =
    longBody
      .replace(/^#+\s.+$/gm, '')
      .replace(/^>\s?/gm, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/(?<![*])\*([^*\n]+)\*(?![*])/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .match(/[^.!?]+[.!?]+/g) || []
  const chunks: string[] = []
  for (let i = 0; i < longSentences.length; i += 4) {
    chunks.push(longSentences.slice(i, i + 4).join(' ').trim())
  }
  const subheadings =
    locale === 'en'
      ? [
          `${industry.name} — Procurement & Contracting`,
          'Engagement Workflow',
          'Reporting & Closeout',
          'References & Bonding',
        ]
      : [
          `${industry.name} — Approvisionnement et contrats`,
          `Flux d'engagement`,
          'Rapports et clôture',
          'Références et cautionnement',
        ]

  return (
    <main>
      <PageHero
        title={industry.name}
        subtitle={industry.short || industry.excerpt || undefined}
        imageSrc={industry.image}
        imageAlt={industry.imageAlt || (locale === 'en'
          ? `${industry.name} — representative deployment context for skate stoppers and skateboard deterrents in Canada`
          : `${industry.name} — contexte de déploiement type pour bloque-skate et dissuasifs anti-planche au Canada`)}
        breadcrumbs={[
          { label: t('nav.industries', locale), href: staticUrl('industries', locale) },
          { label: industry.name },
        ]}
        locale={locale}
      />

      {/* ─── Hero info card row ─────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-[var(--bg)]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {industry.image && (
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[var(--line)]">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}
            <div className="w-full lg:w-1/2">
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--line)] p-6 lg:p-8 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2 block">
                  {t('industryPage.detailsLabel', locale)}
                </span>
                <h2 className="font-bold text-[var(--text)] text-xl lg:text-2xl mb-4">
                  {industry.name}
                </h2>
                {heroBlurb && (
                  <p className="text-[var(--text-light)] leading-relaxed mb-6">
                    {autoBold(heroBlurb)}
                  </p>
                )}
                {industry.useCases && industry.useCases.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {industry.useCases.slice(0, 4).map((uc) => {
                      const tag = uc.split(/—|–/)[0].trim()
                      const display = tag.length > 38 ? tag.slice(0, 36) + '…' : tag
                      return (
                        <span
                          key={uc}
                          className="text-xs bg-[var(--text)]/5 text-[var(--text)] px-3 py-1.5 rounded-full font-medium flex items-center gap-1"
                        >
                          <svg
                            className="w-3 h-3 text-[var(--accent)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {display}
                        </span>
                      )
                    })}
                  </div>
                )}
                <Link
                  href={contactUrl(locale)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] hover:opacity-90 text-white rounded-xl text-base font-semibold transition-all w-full sm:w-auto"
                >
                  {t('nav.getQuote', locale)}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Use Cases grid ─────────────────────────────────────────── */}
      {industry.useCases && industry.useCases.length > 0 && (
        <section className="py-16 lg:py-20 bg-[var(--bg-section)]">
          <div className="max-w-[1500px] mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('industryPage.useCasesEyebrow', locale)}
              title={t('industryPage.useCasesTitle', locale)}
              highlight={t('industryPage.useCasesHighlight', locale)}
              align="center"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {industry.useCases.map((uc) => (
                <div
                  key={uc}
                  className="flex items-start gap-3 p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:shadow-lg hover:border-[var(--accent)]/30 hover:-translate-y-0.5 transition-all duration-300"
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
                  <span className="font-medium text-[var(--text)] text-sm leading-snug">
                    {uc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── About + Key Takeaways + chunked long-form ──────────────── */}
      <section className="py-16 lg:py-20 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeader
            eyebrow={t('industryPage.aboutEyebrow', locale)}
            title={`${t('industryPage.aboutTitlePrefix', locale)} ${industry.name}`}
            highlight={industry.name}
            className="mb-8"
          />
          <KeyTakeaways
            items={generateKeyTakeaways(
              {
                name: industry.name,
                features: industry.useCases,
                description: industry.description,
                keyTakeaways: industry.keyTakeaways,
              },
              locale,
            )}
            locale={locale}
          />
          {chunks.length > 0 && (
            <div className="space-y-6">
              {chunks.map((chunk, i) => (
                <div key={i}>
                  {i > 0 && i <= subheadings.length && (
                    <h3 className="font-bold text-[var(--text)] text-lg mb-3 mt-4">
                      {subheadings[i - 1]}
                    </h3>
                  )}
                  <p className="text-[var(--text-light)] leading-[1.8] text-[15px] md:text-base">
                    {autoBold(chunk)}
                  </p>
                </div>
              ))}
            </div>
          )}
          {chunks.length === 0 && longBody && (
            <article
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(longBody) }}
            />
          )}
        </div>
      </section>

      {/* ─── Why Choose — labelled benefits ─────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[var(--bg-section)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeader
            eyebrow={t('productPage.benefitsEyebrow', locale)}
            title={`${t('industryPage.benefitsTitlePrefix', locale)} ${industry.name} ${t('industryPage.benefitsTitleSuffix', locale)}`}
            highlight={industry.name}
            className="mb-6"
          />
          <div className="space-y-4">
            {[
              ['benefits.climate.title', 'benefits.climate.body'],
              ['benefits.procurement.title', 'benefits.procurement.body'],
              ['benefits.compliance.title', 'benefits.compliance.body'],
              ['benefits.support.title', 'benefits.support.body'],
            ].map(([titleKey, bodyKey]) => (
              <div key={titleKey} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[var(--text-light)] leading-relaxed">
                  <strong className="text-[var(--text)]">{t(titleKey, locale)}</strong>{' — '}
                  {t(bodyKey, locale)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recommended products ───────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-[var(--bg)]">
          <div className="max-w-[1500px] mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('productPage.relatedEyebrow', locale)}
              title={t('industryPage.relatedTitle', locale)}
              align="center"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={productUrl(p.slug, p.slugFr || p.slug, locale)}
                  className="group block bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--line)] shadow-sm hover:shadow-xl transition-all"
                >
                  {p.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {p.priceRange && (
                        <span className="absolute top-3 right-3 inline-flex items-center bg-[var(--accent)] text-white font-bold px-3 py-1 rounded-full text-xs shadow-md">
                          {p.priceRange}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {p.name}
                    </h3>
                    {p.short && (
                      <p className="text-[var(--text-light)] text-sm leading-relaxed line-clamp-2 mb-3">
                        {stripMarkdown(p.short)}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 mt-2 text-[var(--accent)] font-semibold text-sm group-hover:gap-2 transition-all">
                      {locale === 'en' ? 'Learn more' : 'En savoir plus'}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Service Areas — city cards ─────────────────────────────── */}
      {topCities.length > 0 && (
        <section className="py-16 bg-[var(--bg-section)]">
          <div className="max-w-[1500px] mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('productPage.areasEyebrow', locale)}
              title={`${industry.name} ${t('industryPage.areasSuffix', locale)}`}
              className="mb-8"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {topCities.map((c: { slug: string; name: string; province: string }) => (
                <Link
                  key={c.slug}
                  href={cityUrl(c.slug, locale)}
                  className="block text-center p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all"
                >
                  <span className="font-bold text-[var(--text)] text-sm block">
                    {c.name}
                  </span>
                  <span className="text-xs text-[var(--text-light)]">{c.province}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ────────────────────────────────────────────────────── */}
      {industryFaqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-[var(--bg)]">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('productPage.faqEyebrow', locale)}
              title={`${t('industryPage.faqTitlePrefix', locale)} ${industry.name}`}
              highlight={industry.name}
              align="center"
              className="mb-12"
            />
            <div className="space-y-4">
              {industryFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-[var(--line)] rounded-xl bg-[var(--surface)] open:shadow-md transition-shadow"
                >
                  <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4">
                    <h3 className="font-bold text-[var(--text)] text-base">{faq.q}</h3>
                    <svg
                      className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-1 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div
                    className="px-6 pb-6 text-[var(--text-light)] text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(faq.a) }}
                  />
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Dark CTA strip ─────────────────────────────────────────── */}
      <section className="relative py-16 lg:py-20 bg-[var(--bg-dark)] overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative">
          <h2 className="font-bold text-white text-2xl md:text-3xl">
            {t('industryPage.ctaPrefix', locale)}{' '}
            <span className="text-[var(--accent)]">{industry.name}</span>?
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('industryPage.ctaSubtitle', locale)}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href={contactUrl(locale)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:opacity-90 text-white rounded-xl font-semibold transition-all"
            >
              {t('nav.getQuote', locale)}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
