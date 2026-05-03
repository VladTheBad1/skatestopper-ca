import { Metadata } from 'next'
import { buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { getAllProducts } from '@/lib/data'
import { materials } from '@/data/products'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = buildPageMeta({
  title: 'Skate Stoppers & Anti-Skate Hardware',
  description:
    'Canadian-engineered skate stoppers, dome studs, handrail clamps, bench studs, surface plates, edge strips. 316 marine + 304 stainless.',
  path: '/products',
  frPath: '/fr/produits',
  image: '/images/hero/hero.webp',
})

export default function ProductsPage() {
  const products = getAllProducts('en')
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Our Products"
        title="Skate stoppers, engineered for Canadian conditions."
        subtitle="Surface-mount studs, handrail clamps, bench inserts, and edge strips. Every product comes in 316 marine grade for coastal cities and 304 stainless for inland sites — both with a written corrosion warranty."
        breadcrumbs={[{ label: 'Products' }]}
        locale="en"
      />

      <section className="bg-[var(--bg-dark)] text-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <SectionHeader eyebrow="Solutions" title="All Products" highlight="Products" description="Engineered skate-deterrent hardware for Canadian conditions — surface-mount, concrete-set, and continuous-edge variants." variant="dark" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
            {products.map((p, i) => {
              const cat = materials[i]?.categoryEn
              const short = (materials[i] as { shortEn?: string })?.shortEn || p.description
              return (
                <ProductCard
                  key={p.slug}
                  name={p.name}
                  slug={p.slug}
                  description={short}
                  category={cat}
                  image={p.image}
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
