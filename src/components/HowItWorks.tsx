/**
 * HowItWorks — 4-step procurement-to-install workflow. Used optionally
 * on landing pages and the about page. Most home/product/industry pages
 * surface this content inline via the page-template H2/H3 hierarchy.
 */
import { Mail, FileCheck2, Wrench, ShieldCheck } from 'lucide-react'

interface Props { locale?: 'en' | 'fr' }

const STEPS_EN = [
  { Icon: Mail, title: '1. Site assessment', body: 'Send a photo, sketch, or address. We spec the product, install method, and lead time.' },
  { Icon: FileCheck2, title: '2. Stamped quote', body: 'Returned in 24 hours with stamped engineering by climate zone, AODA conformance letter, and a CSA install method statement.' },
  { Icon: Wrench, title: '3. Bonded install', body: 'Bonded crews carry $5M general liability and are accredited for TTC, STM, GO, Metrolinx, and BC Transit properties.' },
  { Icon: ShieldCheck, title: '4. Warranty + support', body: '10 years on coatings, lifetime on 316L marine-grade structural elements. Annual inspection program available.' },
]

const STEPS_FR = [
  { Icon: Mail, title: '1. Évaluation du site', body: 'Envoyez photo, croquis ou adresse. Nous spécifions le produit, la méthode et le délai.' },
  { Icon: FileCheck2, title: '2. Devis estampillé', body: 'Retourné en 24 heures avec ingénierie estampillée par zone climatique, lettre LAPHO, et énoncé de méthode CSA.' },
  { Icon: Wrench, title: '3. Installation cautionnée', body: 'Équipes cautionnées avec 5 M$ de responsabilité civile, accréditées TTC, STM, GO, Metrolinx, BC Transit.' },
  { Icon: ShieldCheck, title: '4. Garantie + support', body: '10 ans sur revêtements, à vie sur éléments en inox 316L grade marin. Programme d\'inspection annuelle disponible.' },
]

export default function HowItWorks({ locale = 'en' }: Props) {
  const steps = locale === 'en' ? STEPS_EN : STEPS_FR
  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="mx-auto max-w-[1320px] px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map(({ Icon, title, body }, i) => (
          <div key={i} className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 animate-fade-in">
              <Icon className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <h3 className="font-bold text-base mb-2">{title}</h3>
            <p className="text-sm text-[var(--text-light)] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
