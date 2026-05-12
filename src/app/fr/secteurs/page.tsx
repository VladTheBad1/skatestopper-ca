import { Metadata } from 'next'
import { buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { getAllIndustries } from '@/lib/data'
import { industries as raw } from '@/data/industries'
import PageHero from '@/components/PageHero'
import IndustryCard from '@/components/IndustryCard'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = buildPageMeta({
  title: 'Secteurs — Applications de bloque-skate',
  description:
    'Bloque-skate pour municipalités, sociétés de transport, immobilier commercial, écoles, hôpitaux et sites patrimoniaux. Cautionné, LAPHO, prêt DDP.',
  path: '/fr/secteurs',
  enPath: '/industries',
  locale: 'fr',
  image: '/images/hero/hero.webp',
})

export default function SecteursPage() {
  const items = getAllIndustries('fr')
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Secteurs', url: '/fr/secteurs' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Secteurs"
        title="Conçus pour les espaces qui subissent le plus de dégâts."
        subtitle="Des bancs de la TTC aux places patrimoniales de Vancouver — nous savons comment chaque secteur achète, spécifie et installe le matériel anti-planche."
        breadcrumbs={[{ label: 'Secteurs' }]}
        locale="fr"
      />
      <section className="bg-[var(--bg-light)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <SectionHeader eyebrow="Industries servies" title="Où nous déployons" highlight="déployons" description="Où nous déployons à travers les portefeuilles municipaux, transit, éducation et immobilier commercial canadiens." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((ind, i) => {
              const short = (raw[i] as { shortFr?: string })?.shortFr || ind.description
              return (
                <IndustryCard
                  key={ind.slug}
                  name={ind.name}
                  slug={ind.slug}
                  description={short}
                  image={ind.image}
                  locale="fr"
                />
              )
            })}
          </div>
        </div>
      </section>
</main>
  )
}
