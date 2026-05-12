import { Shield, EyeOff, Clock } from 'lucide-react'
import { MapleLeaf } from './icons'

interface Props { locale: 'en' | 'fr' }

/**
 * TrustStrip — 4-column light band under hero.
 * Mockup: trust strip section, design/spec.md.
 */
export default function TrustStrip({ locale }: Props) {
  const isEn = locale === 'en'
  const items = isEn
    ? [
        { Icon: Shield,    title: 'Prevents Damage',     body: 'Protects public infrastructure from skate damage and costly repairs.' },
        { Icon: EyeOff,    title: 'Discreet & Effective', body: 'Low-profile solutions blend seamlessly into any environment.' },
        { Icon: MapleLeaf, title: 'Canada Wide',          body: 'Proudly Canadian. Trusted from coast to coast.', leaf: true },
        { Icon: Clock,     title: 'Built To Last',        body: 'High-quality materials engineered for long-term performance.' },
      ]
    : [
        { Icon: Shield,    title: 'Prévient les dégâts',  body: "Protège l'infrastructure publique des dégâts de planche et des réparations coûteuses." },
        { Icon: EyeOff,    title: 'Discret et efficace',  body: 'Des solutions discrètes qui se fondent dans tout environnement.' },
        { Icon: MapleLeaf, title: 'Partout au Canada',    body: 'Fièrement canadien. De confiance d\'un océan à l\'autre.', leaf: true },
        { Icon: Clock,     title: 'Conçu pour durer',     body: 'Matériaux de haute qualité pour une performance durable.' },
      ]

  return (
    <section className="bg-[var(--bg-light)] border-y border-[var(--border-light)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {items.map(({ Icon, title, body, leaf }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="w-9 h-px bg-[var(--accent)] mb-5" />
              {/* Leaf keeps its original visual size (w-14 h-9). Its tight
                  viewBox aspect (1.53:1) matches the container (1.56:1) so
                  it fills without clipping, and the column's items-center
                  centres it under the title. */}
              <Icon className={`text-[var(--accent)] ${leaf ? 'w-14 h-9' : 'w-8 h-8'}`} strokeWidth={1.6} />
              <h2 className="mt-4 text-[13px] font-bold tracking-[0.06em] uppercase text-[var(--text)]">{title}</h2>
              <p className="mt-2 text-[13px] leading-[1.55] text-[var(--text-light)] max-w-[220px]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
