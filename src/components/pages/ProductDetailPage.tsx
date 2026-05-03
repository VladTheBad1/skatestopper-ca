import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import { t, getAllCities } from '@/lib/data'
import { contactUrl, geoUrl, productUrl, staticUrl } from '@/lib/routes'
import { markdownToHtml, stripMarkdown } from '@/lib/markdown'
import { KeyTakeaways } from '@/lib/content-format'
import { autoBold, generateKeyTakeaways } from '@/lib/prose'
import { faqs } from '@/data/faqs'
import { images } from '@/data/images'

interface Product {
  name: string
  slug: string
  slugFr?: string
  short?: string
  description: string
  excerpt?: string
  image?: string
  imageAlt?: string
  features?: string[]
  bestFor?: string
  priceRange?: string
  gradient?: string
  /** Optional pre-authored Key Takeaways (returned verbatim if present). */
  keyTakeaways?: string[]
  /** Optional H3 sub-heads injected between long-form paragraph chunks. */
  proseSubheadings?: string[]
}

interface ProductDetailPageProps {
  product: Product
  relatedProducts: Product[]
  locale: 'en' | 'fr'
}

/* ── Helpers ───────────────────────────────────────────────────────── */

/** First markdown paragraph as plain text (used for hero info-card blurb). */
function firstParagraph(md: string | undefined): string {
  if (!md) return ''
  const para = md.split(/\n\n+/).find((p) => p.trim().length > 40)
  return para ? stripMarkdown(para).trim() : ''
}

/** Returns first ~3 sentences of the first paragraph. */
function firstThreeSentences(md: string | undefined): string {
  const p = firstParagraph(md)
  const sentences = p.match(/[^.!?]+[.!?]+/g)
  return sentences ? sentences.slice(0, 3).join(' ').trim() : p
}

/** Markdown after the first paragraph — used for the chunked About body. */
function descriptionRest(md: string | undefined): string {
  if (!md) return ''
  const paras = md.split(/\n\n+/)
  const idx = paras.findIndex((p) => p.trim().length > 40)
  if (idx < 0) return md
  return paras.slice(idx + 1).join('\n\n').trim()
}

/** Pick 4 FAQs most relevant to this product (loose name match), else first 4. */
function pickFAQs(productName: string, locale: 'en' | 'fr') {
  const tokens = productName
    .toLowerCase()
    .replace(/[^a-zà-ÿ0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['bus', 'abribus', 'shelters', 'shelter'].includes(w))

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

export default function ProductDetailPage({
  product,
  relatedProducts,
  locale,
}: ProductDetailPageProps) {
  const isEn = locale === 'en'
  const heroBlurb = firstThreeSentences(product.description) || product.short || ''
  const longBody = descriptionRest(product.description)
  const allCities = getAllCities(locale)
  const topCities = allCities
    .filter((c: { population?: number }) => (c.population ?? 0) > 0)
    .sort((a: { population?: number }, b: { population?: number }) => (b.population ?? 0) - (a.population ?? 0))
    .slice(0, 8)
  const productFaqs = pickFAQs(product.name, locale)

  // Chunk long body into sentence groups for the About section H3s.
  // Strip markdown emphasis (** *), block quotes (>), and headings — autoBold
  // will re-bold meaningful tokens, and we render our own H3s.
  const longSentences =
    longBody
      .replace(/^#+\s.+$/gm, '') // drop markdown headings
      .replace(/^>\s?/gm, '') // drop block quote markers
      .replace(/\*\*(.+?)\*\*/g, '$1') // unwrap **bold**
      .replace(/(?<![*])\*([^*\n]+)\*(?![*])/g, '$1') // unwrap *italic*
      .replace(/`([^`]+)`/g, '$1') // unwrap `code`
      .match(/[^.!?]+[.!?]+/g) || []
  const chunks: string[] = []
  for (let i = 0; i < longSentences.length; i += 4) {
    chunks.push(longSentences.slice(i, i + 4).join(' ').trim())
  }
  const subheadings =
    locale === 'en'
      ? [
          `${product.name} — Engineering & Construction`,
          'Installation & Compliance',
          'Warranty & Support',
          'Procurement & Lead Time',
        ]
      : [
          `${product.name} — Ingénierie et construction`,
          'Installation et conformité',
          'Garantie et soutien',
          'Approvisionnement et délais',
        ]

  return (
    <main>
      <PageHero
        title={product.name}
        subtitle={product.short || product.excerpt || undefined}
        imageSrc={product.image}
        imageAlt={product.imageAlt || (isEn
          ? `${product.name} installed in a Canadian commercial setting — stainless skateboard deterrent hardware`
          : `${product.name} installé en contexte commercial canadien — dissuasif anti-planche à roulettes en inox`)}
        breadcrumbs={[
          { label: t('nav.products', locale), href: staticUrl('products', locale) },
          { label: product.name },
        ]}
        locale={locale}
      />

      {/* ─── Hero info card row ─────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-[var(--bg)]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {product.image && (
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[var(--line)]">
                  <Image
                    src={product.image}
                    alt={images.products?.[product.slug]?.alt?.[locale] ?? product.name}
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
                  {locale === 'en' ? 'Product Details' : 'Détails du produit'}
                </span>
                <h2 className="font-bold text-[var(--text)] text-xl lg:text-2xl mb-4">
                  {product.name}
                </h2>
                {heroBlurb && (
                  <p className="text-[var(--text-light)] leading-relaxed mb-6">
                    {autoBold(heroBlurb)}
                  </p>
                )}
                {product.priceRange && (
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center bg-[var(--accent)] text-white font-bold px-4 py-2 rounded-full text-sm">
                      {product.priceRange}
                    </span>
                    <span className="text-sm text-[var(--text-light)]">
                      {locale === 'en'
                        ? 'Volume discounts on 20+ unit orders'
                        : 'Rabais de volume sur 20+ unités'}
                    </span>
                  </div>
                )}
                {product.bestFor && (
                  <p className="text-sm text-[var(--text-light)] mb-6">
                    <strong className="text-[var(--text)]">
                      {t('productPage.bestFor', locale) ||
                        (locale === 'en' ? 'Best for:' : 'Idéal pour :')}
                    </strong>{' '}
                    {product.bestFor}
                  </p>
                )}
                {product.features && product.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
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
                        {f.length > 38 ? f.slice(0, 36) + '…' : f}
                      </span>
                    ))}
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

      {/* ─── Features & Specifications grid ─────────────────────────── */}
      {product.features && product.features.length > 0 && (
        <section className="py-16 lg:py-20 bg-[var(--bg-section)]">
          <div className="max-w-[1500px] mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('productPage.specsEyebrow', locale)}
              title={t('productPage.specsTitle', locale)}
              highlight={t('productPage.specsHighlight', locale)}
              align="center"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.features.map((feat) => (
                <div
                  key={feat}
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
                    {feat}
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
            eyebrow={t('productPage.aboutEyebrow', locale)}
            title={`${t('productPage.aboutTitlePrefix', locale)} ${product.name}`}
            highlight={product.name}
            className="mb-8"
          />
          <KeyTakeaways
            items={generateKeyTakeaways(
              {
                name: product.name,
                priceRange: product.priceRange,
                features: product.features,
                description: product.description,
                keyTakeaways: product.keyTakeaways,
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

      {/* ─── Specifications table ───────────────────────────────────── */}
      <section className="py-16 bg-[var(--bg-section)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeader
            eyebrow={t('productPage.compareEyebrow', locale)}
            title={t('productPage.compareTitle', locale)}
            className="mb-6"
          />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-[var(--surface)] rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[var(--bg-dark)] text-white text-left">
                  <th className="px-5 py-3 font-semibold text-sm">
                    {locale === 'en' ? 'Specification' : 'Spécification'}
                  </th>
                  <th className="px-5 py-3 font-semibold text-sm">
                    {locale === 'en' ? 'Details' : 'Détails'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {(
                  [
                    ['specTable.product', product.name],
                    ['specTable.priceRange', product.priceRange],
                    ['specTable.bestFor', product.bestFor],
                    ['specTable.material', t('specTable.materialValue', locale)],
                    ['specTable.installation', t('specTable.installationValue', locale)],
                    ['specTable.warranty', t('specTable.warrantyValue', locale)],
                    ['specTable.compliance', t('specTable.complianceValue', locale)],
                    ['specTable.shipping', t('specTable.shippingValue', locale)],
                  ] as Array<[string, string | undefined]>
                )
                  .filter((row): row is [string, string] => !!row[1] && row[1].trim().length > 0)
                  .map(([k, v], i) => (
                  <tr
                    key={k}
                    className={`border-b border-[var(--line)] ${
                      i % 2 === 1 ? 'bg-[var(--bg-section)]/40' : ''
                    }`}
                  >
                    <td className="px-5 py-3 font-medium text-[var(--text)] align-top w-1/3">
                      {t(k, locale)}
                    </td>
                    <td className="px-5 py-3 text-[var(--text-light)]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Why Choose — labelled benefit bullets ──────────────────── */}
      <section className="py-16 lg:py-20 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeader
            eyebrow={t('productPage.benefitsEyebrow', locale)}
            title={`${t('productPage.benefitsTitlePrefix', locale)} ${product.name}?`}
            highlight={product.name}
            className="mb-6"
          />
          <p className="text-[var(--text-light)] leading-relaxed mb-6">
            {locale === 'en'
              ? `${product.name} from Skatestopper.ca are engineered for Canadian transit conditions — climate-rated, accessibility-compliant, and shipped with full procurement documentation so AHJ review is single-pass.`
              : `Les ${product.name.toLowerCase()} de Skatestopper.ca sont conçus pour les conditions de transport canadiennes — adaptés au climat, conformes à l'accessibilité et livrés avec une documentation d'approvisionnement complète.`}
          </p>
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

      {/* ─── Service Areas — city cards ─────────────────────────────── */}
      {topCities.length > 0 && (
        <section className="py-16 bg-[var(--bg-section)]">
          <div className="max-w-[1500px] mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('productPage.areasEyebrow', locale)}
              title={`${product.name} ${t('productPage.areasSuffix', locale)}`}
              description={
                locale === 'en'
                  ? `We design, supply, and install ${product.name.toLowerCase()} in major cities across all 10 provinces and 3 territories.`
                  : `Nous concevons, fournissons et installons les ${product.name.toLowerCase()} dans les principales villes des 10 provinces et 3 territoires.`
              }
              className="mb-8"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {topCities.map((c: { slug: string; name: string; province: string }) => (
                <Link
                  key={c.slug}
                  href={geoUrl(c.slug, product.slug, product.slugFr || product.slug, locale)}
                  className="block text-center p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all"
                >
                  <span className="font-bold text-[var(--text)] text-sm block">
                    {product.name}
                  </span>
                  <span className="text-xs text-[var(--text-light)]">
                    {locale === 'en' ? 'in' : 'à'} {c.name}, {c.province}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ────────────────────────────────────────────────────── */}
      {productFaqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-[var(--bg)]">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('productPage.faqEyebrow', locale)}
              title={`${t('productPage.faqTitlePrefix', locale)} ${product.name}`}
              highlight={product.name}
              align="center"
              className="mb-12"
            />
            <div className="space-y-4">
              {productFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-[var(--line)] rounded-xl bg-[var(--surface)] open:shadow-md transition-shadow"
                >
                  <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4">
                    <h3 className="font-bold text-[var(--text)] text-base">
                      {faq.q}
                    </h3>
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

      {/* ─── Related products ───────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-[var(--bg-section)]">
          <div className="max-w-[1500px] mx-auto px-6 md:px-8">
            <SectionHeader
              eyebrow={t('productPage.relatedEyebrow', locale)}
              title={t('productPage.relatedTitle', locale)}
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
                        alt={images.products?.[p.slug]?.alt?.[locale] ?? p.name}
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
                    {p.features && p.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {p.features.slice(0, 2).map((f) => (
                          <span
                            key={f}
                            className="text-[11px] bg-[var(--text)]/5 text-[var(--text-light)] px-2 py-1 rounded-md"
                          >
                            {f.length > 28 ? f.slice(0, 26) + '…' : f}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1 mt-4 text-[var(--accent)] font-semibold text-sm group-hover:gap-2 transition-all">
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

      {/* ─── Dark CTA strip ─────────────────────────────────────────── */}
      <section className="relative py-16 lg:py-20 bg-[var(--bg-dark)] overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative">
          <h2 className="font-bold text-white text-2xl md:text-3xl">
            {t('productPage.ctaPrefix', locale)}{' '}
            <span className="text-[var(--accent)]">{product.name}</span>?
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('productPage.ctaSubtitle', locale)}
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
