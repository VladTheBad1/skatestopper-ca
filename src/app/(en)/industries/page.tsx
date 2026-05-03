import { Metadata } from 'next'
import { buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { getAllIndustries } from '@/lib/data'
import { industries as raw } from '@/data/industries'
import PageHero from '@/components/PageHero'
import IndustryCard from '@/components/IndustryCard'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = buildPageMeta({
  title: 'Industries — Skate Stopper Applications',
  description:
    'Skate stoppers for Canadian municipalities, transit, commercial real estate, schools, retail, hospitals, heritage sites. Bonded, AODA, RFP-ready.',
  path: '/industries',
  frPath: '/fr/secteurs',
  image: '/images/hero/hero.webp',
})

export default function IndustriesPage() {
  const items = getAllIndustries('en')
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Industries', url: '/industries' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Industries"
        title="Built for the spaces that take the most damage."
        subtitle="From Toronto Transit benches to Vancouver heritage plazas — we know how each industry buys, specifies, and installs skate deterrent hardware. Pick yours below."
        breadcrumbs={[{ label: 'Industries' }]}
        locale="en"
      />

      <section className="bg-[var(--bg-light)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <SectionHeader eyebrow="Industries Served" title="Where We Deploy" highlight="Deploy" description="Where we deploy across Canadian municipal, transit, education, and commercial real-estate portfolios." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((ind, i) => {
              const short = (raw[i] as { shortEn?: string })?.shortEn || ind.description
              return (
                <IndustryCard
                  key={ind.slug}
                  name={ind.name}
                  slug={ind.slug}
                  description={short}
                  image={ind.image}
                  locale="en"
                />
              )
            })}
          </div>
        </div>
      </section>
</main>
  )
}
