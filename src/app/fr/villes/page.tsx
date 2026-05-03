import { Metadata } from 'next'
import { buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { getAllCities } from '@/lib/data'
import { provinces } from '@/data/locations'
import PageHero from '@/components/PageHero'
import CityGrid from '@/components/CityGrid'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = buildPageMeta({
  title: 'Bloque-skate — Carte de couverture Canada',
  description:
    'Bloque-skate fournis et installés dans 17+ villes canadiennes — Toronto, Montréal, Vancouver, Calgary, Ottawa, Edmonton, Winnipeg, Halifax et plus.',
  path: '/cities',
  frPath: '/fr/villes',
  image: '/images/canada-map.png',
})

export default function VillesPage() {
  const cityList = getAllCities('fr')
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Villes', url: '/fr/villes' },
          ])),
        }}
      />
      <PageHero
        eyebrow="D'un océan à l'autre"
        title="Le Canada, d'un océan à l'autre."
        subtitle="De l'Inner Harbour à Victoria à la Citadelle de Halifax — nous expédions et installons dans toutes les grandes métropoles canadiennes. Choisissez votre ville ci-dessous."
        breadcrumbs={[{ label: 'Villes' }]}
        locale="fr"
      />
      <section className="bg-[var(--bg-dark)] text-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12 space-y-14">
        <SectionHeader eyebrow="Couverture" title="Service pancanadien" highlight="pancanadien" description="Couverture de service à travers les 10 provinces canadiennes — adapté aux conditions locales de gel, neige et sel." variant="dark" />
          {provinces.map((prov) => {
            const provCities = cityList.filter((c) => c.provinceSlug === prov.slug)
            if (provCities.length === 0) return null
            return (
              <div key={prov.slug}>
                <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--border-faint)]">
                  <h2 className="font-display text-[22px] tracking-[0.02em] uppercase text-white">{prov.nameFr}</h2>
                  <span className="text-[12px] tracking-[0.08em] uppercase text-white/50">
                    {provCities.length} {provCities.length === 1 ? 'ville' : 'villes'}
                  </span>
                </div>
                <CityGrid cities={provCities} locale="fr" showAll variant="dark" />
              </div>
            )
          })}
        </div>
      </section>
</main>
  )
}
