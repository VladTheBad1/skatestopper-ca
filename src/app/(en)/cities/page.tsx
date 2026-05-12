import { Metadata } from 'next'
import { buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { getAllCities } from '@/lib/data'
import { provinces } from '@/data/locations'
import PageHero from '@/components/PageHero'
import CityGrid from '@/components/CityGrid'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = buildPageMeta({
  title: 'Skate Stoppers — Canada Coverage Map',
  description:
    'Skate stoppers supplied + installed in 17+ Canadian cities — Toronto, Montréal, Vancouver, Calgary, Ottawa, Halifax. Bonded, AODA-compliant.',
  path: '/cities',
  frPath: '/fr/villes',
  image: '/images/canada-map.webp',
})

export default function CitiesPage() {
  const cityList = getAllCities('en')
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Cities', url: '/cities' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Coast to coast"
        title="We've got Canada covered."
        subtitle="From the Inner Harbour in Victoria to Citadel Hill in Halifax — we ship and install in every major Canadian metro. Pick your city below for local crews, climate-matched specs, and lead times."
        breadcrumbs={[{ label: 'Cities' }]}
        locale="en"
      />

      <section className="bg-[var(--bg-dark)] text-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12 space-y-14">
        <SectionHeader eyebrow="Coverage" title="Canada-wide Service" highlight="Service" description="Service coverage across all 10 Canadian provinces — climate-engineered for local frost, snow, and salt-air conditions." variant="dark" />
          {provinces.map((prov) => {
            const provCities = cityList.filter((c) => c.provinceSlug === prov.slug)
            if (provCities.length === 0) return null
            return (
              <div key={prov.slug}>
                <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--border-faint)]">
                  <h2 className="font-display text-[22px] tracking-[0.02em] uppercase text-white">{prov.name}</h2>
                  <span className="text-[12px] tracking-[0.08em] uppercase text-white/50">
                    {provCities.length} {provCities.length === 1 ? 'city' : 'cities'}
                  </span>
                </div>
                <CityGrid cities={provCities} locale="en" showAll variant="dark" />
              </div>
            )
          })}
        </div>
      </section>
</main>
  )
}
