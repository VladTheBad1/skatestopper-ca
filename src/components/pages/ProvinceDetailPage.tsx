import PageHero from '@/components/PageHero'
import CityGrid from '@/components/CityGrid'
import { t } from '@/lib/data'
import { staticUrl } from '@/lib/routes'
import { siteConfig } from '@/config/site-config'

interface Province {
  slug: string
  name: string
  nameFr?: string
}

interface City {
  slug: string
  name: string
  province: string
  population?: number
  description?: string
}

interface ProvinceDetailPageProps {
  province: Province
  cities: City[]
  locale: 'en' | 'fr'
}

export default function ProvinceDetailPage({ province, cities, locale }: ProvinceDetailPageProps) {
  const isEn = locale === 'en'
  const provinceName = isEn ? province.name : (province.nameFr || province.name)
  const sortedCities = [...cities].sort((a, b) => (b.population || 0) - (a.population || 0))

  return (
    <main>
      <PageHero
        title={`${siteConfig.nicheEn} ${isEn ? 'in' : 'en'} ${provinceName}`}
        subtitle={isEn
          ? `Canadian-engineered skate stoppers, installed across ${cities.length} ${provinceName} cities.`
          : `Bloque-skate conçus au Canada, installés dans ${cities.length} villes du ${provinceName}.`}
        breadcrumbs={[
          { label: t('nav.cities', locale), href: staticUrl('cities', locale) },
          { label: provinceName },
        ]}
        locale={locale}
      />

      {/* Stats */}
      <div className="bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-6 flex flex-wrap gap-8">
          <div>
            <span className="text-[var(--primary)] font-extrabold text-2xl">{cities.length}</span>
            <p className="eyebrow text-[var(--text-light)] mt-1">{isEn ? 'Cities' : 'Villes'}</p>
          </div>
        </div>
      </div>

      {/* Province description */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="font-extrabold text-3xl tracking-tight text-[var(--text)] mb-6">
            {siteConfig.nicheEn} {isEn ? 'across' : 'en'} {provinceName}.
          </h2>
          <p className="text-[var(--text-light)] text-lg leading-relaxed">
            {isEn
              ? `${siteConfig.brandName} ships and installs skate-deterrent hardware across ${cities.length} ${provinceName} cities. Whether the install site is in ${sortedCities[0]?.name || 'the capital'}${sortedCities[1] ? `, ${sortedCities[1].name}` : ''}${sortedCities[2] ? `, or ${sortedCities[2].name}` : ''}, our bonded crews and stamped engineering deploy on schedule.`
              : `${siteConfig.brandName} fournit et installe du matériel anti-planche dans ${cities.length} villes du ${provinceName}. Que le site soit à ${sortedCities[0]?.name || 'la capitale'}${sortedCities[1] ? `, ${sortedCities[1].name}` : ''}${sortedCities[2] ? ` ou ${sortedCities[2].name}` : ''}, nos équipes cautionnées et notre ingénierie estampillée respectent les délais.`}
          </p>
        </div>
      </section>

      {/* City grid */}
      <section className="bg-[var(--bg-section)] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <h2 className="font-extrabold text-2xl text-[var(--text)] mb-8">
            {isEn ? `Cities in ${provinceName}` : `Villes en ${provinceName}`}
          </h2>
          <CityGrid cities={sortedCities} locale={locale} />
        </div>
      </section>
</main>
  )
}
