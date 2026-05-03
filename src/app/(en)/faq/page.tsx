import { Metadata } from 'next'
import { buildPageMeta, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/seo'
import { faqs } from '@/data/faqs'
import { markdownToHtml } from '@/lib/markdown'
import PageHero from '@/components/PageHero'
import FAQSection from '@/components/FAQSection'
export const metadata: Metadata = buildPageMeta({
  title: 'Skate Stopper FAQ — Materials, Pricing',
  description:
    'Stainless grades, install spacing, freeze-thaw ratings, AODA compliance, RFP timelines, warranties, and Canadian municipal procurement.',
  path: '/faq',
  frPath: '/fr/faq',
})

export default function FAQPage() {
  const faqItems = faqs.map((f) => ({ q: f.questionEn, a: f.answerEn }))
  const schema = buildFAQSchema(faqItems)
  // Pre-render answer markdown to HTML server-side. If we pass raw markdown,
  // the **bold** survives in the RSC props payload (script tag) and string-grep
  // tests / Google's plain-text snippet extractor see literal asterisks.
  const formatted = faqs.map((f) => ({
    question: f.questionEn,
    answer: markdownToHtml(f.answerEn),
  }))
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'FAQ', url: '/faq' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Frequently asked"
        title="The questions buyers, specifiers, and city staff ask us most."
        subtitle="Materials, install, code compliance, lead times, warranties, and procurement — answered with the actual specs we ship in our Canadian deployments."
        breadcrumbs={[{ label: 'FAQ' }]}
        locale="en"
      />
      {/* §2.11.5 Key Takeaways for long-form FAQ */}
      <section className="py-10 bg-[var(--bg-section)]">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <blockquote className="border-l-4 border-[var(--accent)] pl-6 py-2 not-italic">
            <p className="font-extrabold uppercase tracking-wider text-sm text-[var(--accent)] mb-3">Key takeaways</p>
            <ul className="space-y-2 text-[var(--text)] text-base leading-relaxed">
              <li>Skate stoppers are <strong>permanent</strong> — typical service life <strong>15–25 years</strong> for stainless, <strong>30+ years</strong> for bronze patina.</li>
              <li>Installs on <strong>private property</strong> need no permit; heritage-designated and leased properties require <strong>2–4 week approval</strong>.</li>
              <li>Pricing runs <strong>$25–$120 per unit installed</strong> depending on product type, finish, and access conditions — itemised quotes only.</li>
              <li>Hardware: <strong>316L marine</strong> for coastal, <strong>304</strong> inland, <strong>bronze patina</strong> for heritage. Climate-rated to NBCC frost-depth tables.</li>
              <li>Procurement: direct purchase under <strong>$50K</strong>, public RFP/DDP above. We respond to RFPs in <strong>5 business days</strong>.</li>
            </ul>
          </blockquote>
        </div>
      </section>
      {/* §2.11.10 comparison table */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-extrabold text-2xl md:text-3xl mb-6 text-[var(--text)]">Pricing reference — typical CAD ranges</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--text)]">
                <th className="text-left py-3 pr-4 font-bold">Product</th>
                <th className="text-left py-3 pr-4 font-bold">304 stainless</th>
                <th className="text-left py-3 pr-4 font-bold">316 marine</th>
                <th className="text-left py-3 font-bold">Bronze patina</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Surface-mount stud</td><td className="py-3 pr-4">$35–55</td><td className="py-3 pr-4">$55–85</td><td className="py-3">$75–120</td></tr>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Architectural dome</td><td className="py-3 pr-4">$40–70</td><td className="py-3 pr-4">$60–95</td><td className="py-3">$85–140</td></tr>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Handrail clamp</td><td className="py-3 pr-4">$80–120</td><td className="py-3 pr-4">$140–180</td><td className="py-3">$180–240</td></tr>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Bench stud</td><td className="py-3 pr-4">$25–45</td><td className="py-3 pr-4">$40–65</td><td className="py-3">$60–100</td></tr>
              <tr><td className="py-3 pr-4">Edge strip /m</td><td className="py-3 pr-4">$180–220</td><td className="py-3 pr-4">$220–260</td><td className="py-3">$260–340</td></tr>
            </tbody>
          </table>
          <p className="text-sm text-[var(--text-light)] mt-4">CAD, hardware + install, before volume discounts and prevailing-wage premium. 50+ unit orders save 15–25%.</p>
        </div>
      </section>
      {/* Section H2 wrapper for accordion (§2.11.2 — page needs ≥2 H2 on 400w+) */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-extrabold text-2xl md:text-3xl mb-2 text-[var(--text)]">Common questions — detailed answers</h2>
          <p className="text-[var(--text-light)] mb-6">Tap any question to expand. Specs, install method, code references, lead times, and pricing context.</p>
        </div>
      </section>
      <FAQSection faqs={formatted} locale="en" showHeading={false} />
</main>
  )
}
