import Image from 'next/image'
import Link from 'next/link'
import { Landmark, Building2, TramFront, GraduationCap } from 'lucide-react'
import { industries } from '@/data/industries'

// Descriptive alts for the industry tile photos. Keys = industry slug.
// Used both EN and FR for now (photo content is universal); update with FR alts
// if photographers/captions diverge.
const INDUSTRY_PHOTO_ALT: Record<string, string> = {
  'municipalities-parks': 'Park bench with skate-deterrent studs along the seat front in a Canadian municipal plaza',
  'commercial-real-estate': 'Granite ledge with stainless skate stoppers protecting a commercial office tower entrance',
  'transit-authorities': 'Transit shelter bench with anti-skateboard hardware along the seat edge at a Canadian rapid-transit stop',
  'schools-universities': 'University campus handrail with stainless saddle skate-stop clamps along a granite staircase',
  'retail-storefronts': 'Retail storefront window ledge protected with discreet skateboard deterrent strips',
  'condominiums-hoas': 'Residential condominium courtyard bench with skate-deterrent studs along the front rail',
  'government-heritage': 'Heritage stone bench at a Canadian government building protected with low-profile skate stoppers',
}

interface Props { locale: 'en' | 'fr' }

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  'municipalities-parks': Landmark,
  'commercial-real-estate': Building2,
  'transit-authorities': TramFront,
  'schools-universities': GraduationCap,
  'retail-storefronts': Building2,
  'condominiums-hoas': Building2,
  'government-heritage': Landmark,
}

const PICK_SLUGS = ['municipalities-parks', 'commercial-real-estate', 'transit-authorities', 'schools-universities']

/**
 * ApplicationsSection — light band, intro left, 4 photo cards right.
 * Wired to industries data — picks 4 by slug to match the mockup composition.
 */
export default function ApplicationsSection({ locale }: Props) {
  const isEn = locale === 'en'
  const apps = PICK_SLUGS.map((s) => industries.find((i) => i.slug === s)).filter(Boolean) as typeof industries

  return (
    <section className="bg-[var(--bg-light)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start">
          {/* Intro */}
          <div>
            <div className="eyebrow mb-5">{isEn ? 'Applications' : 'Applications'}</div>
            <h2 className="font-display text-[36px] lg:text-[40px] leading-[1.05] text-[var(--text)]">
              {isEn ? <>Solutions for<br />every environment</> : <>Solutions pour<br />chaque environnement</>}
            </h2>
            <p className="mt-5 text-[14px] leading-[1.6] text-[var(--text-light)] max-w-[300px]">
              {isEn
                ? 'We help municipalities, property managers, transit authorities and businesses protect public spaces across Canada.'
                : 'Nous aidons les municipalités, gestionnaires immobiliers, autorités de transport et entreprises à protéger les espaces publics au Canada.'}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {apps.map((ind) => {
              const Icon = ICON_MAP[ind.slug] ?? Landmark
              return (
                <Link
                  key={ind.slug}
                  href={isEn ? `/${ind.slug}` : `/fr/${ind.slugFr ?? ind.slug}`}
                  className="group bg-white rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-shadow flex flex-col"
                >
                  {/* Photo — real <img> via next/image for SEO/Google Images + lazy loading. */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-slate-800">
                    <Image
                      src={`/images/industries/${ind.slug}.webp`}
                      alt={INDUSTRY_PHOTO_ALT[ind.slug] ?? (isEn ? ind.nameEn : ind.nameFr)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
                  </div>

                  {/* Footer with overlay icon */}
                  <div className="relative bg-white px-4 pt-9 pb-5 text-center flex-1">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_4px_12px_rgba(200,16,46,0.35)]">
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[12.5px] font-bold tracking-[0.06em] uppercase text-[var(--text)] leading-tight">
                      {isEn ? ind.nameEn : ind.nameFr}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
