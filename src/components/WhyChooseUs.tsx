/**
 * WhyChooseUs — 6-bullet differentiation strip. Used on the about page
 * and as a deep-section component on landing pages. Content focused on
 * Canadian-specific advantages (climate engineering, bonded install,
 * AODA/CSA conformance).
 */
interface Props { locale?: 'en' | 'fr' }

const ITEMS_EN = [
  { h: 'Climate-engineered for Canada', p: 'Stamped engineering for every climate zone, frost-depth tables to 2.4 m, 316L marine-grade for coastal sites.' },
  { h: 'Bonded crews, $5M liability', p: 'Insured for TTC, STM, GO, Metrolinx, BC Transit, and federal heritage properties.' },
  { h: 'AODA + CSA conformance', p: 'Every quote includes accessibility-code conformance letters and CSA-certified install method statements.' },
  { h: 'Heritage-approved finishes', p: 'Bronze patina and 316L brushed available for Parks Canada, Heritage Toronto, Ville de Québec submissions.' },
  { h: 'Lifetime corrosion warranty', p: '10 years on coatings, lifetime on 316L marine-grade structural elements.' },
  { h: '24-hour quote turnaround', p: 'Stamped engineering, climate heatmap, and corrosion-class certificate with every quote.' },
]

const ITEMS_FR = [
  { h: 'Conçu pour le climat canadien', p: 'Ingénierie estampillée pour chaque zone, profondeurs de gel jusqu\'à 2,4 m, inox 316L grade marin pour les sites côtiers.' },
  { h: 'Équipes cautionnées, 5 M$ RC', p: 'Assurées pour TTC, STM, GO, Metrolinx, BC Transit et propriétés patrimoniales fédérales.' },
  { h: 'Conformité LAPHO + CSA', p: 'Chaque devis inclut lettres de conformité au code d\'accessibilité et énoncés de méthode CSA.' },
  { h: 'Finitions approuvées patrimoine', p: 'Patine bronze et inox 316L brossé disponibles pour Parcs Canada, Heritage Toronto, Ville de Québec.' },
  { h: 'Garantie corrosion à vie', p: '10 ans sur revêtements, à vie sur éléments structurels en inox 316L grade marin.' },
  { h: 'Devis en 24 heures', p: 'Ingénierie estampillée, carte thermique climatique et certificat de classe de corrosion avec chaque devis.' },
]

export default function WhyChooseUs({ locale = 'en' }: Props) {
  const items = locale === 'en' ? ITEMS_EN : ITEMS_FR
  return (
    <section className="py-16 bg-[var(--bg-section)]">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(({ h, p }, i) => (
            <div key={i} className="bg-white p-6 rounded-sm shadow-sm transition-shadow hover:shadow-md animate-fade-in">
              <h3 className="font-bold text-base mb-3 text-[var(--text)]">{h}</h3>
              <p className="text-sm text-[var(--text-light)] leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
