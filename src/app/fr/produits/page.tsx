import { Metadata } from 'next'
import { buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { getAllProducts } from '@/lib/data'
import { materials } from '@/data/products'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = buildPageMeta({
  title: 'Bloque-skate et matériel anti-planche',
  description:
    'Gamme complète conçue au Canada — plots, dômes, plots de banc, plaques de surface, bandes. Inox 316 marin pour tous les climats.',
  path: '/products',
  frPath: '/fr/produits',
  image: '/images/hero/hero.webp',
})

export default function ProduitsPage() {
  const products = getAllProducts('fr')
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'Produits', url: '/fr/produits' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Nos produits"
        title="Bloque-skate, conçus pour le climat canadien."
        subtitle="Plots à fixation en surface, serrages de main courante, inserts de banc et bandes. Chaque produit existe en inox 316 marin pour les villes côtières et en 304 pour l'intérieur — garantie corrosion écrite."
        breadcrumbs={[{ label: 'Produits' }]}
        locale="fr"
      />
      <section className="bg-[var(--bg-dark)] text-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <SectionHeader eyebrow="Solutions" title="Tous nos produits" highlight="produits" description="Matériel anti-skate conçu pour les conditions canadiennes — fixation de surface, ancré au béton et bord continu." variant="dark" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
            {products.map((p, i) => {
              const cat = materials[i]?.categoryFr
              const short = (materials[i] as { shortFr?: string })?.shortFr || p.description
              return (
                <ProductCard
                  key={p.slug}
                  name={p.name}
                  slug={p.slug}
                  description={short}
                  category={cat}
                  image={p.image}
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
