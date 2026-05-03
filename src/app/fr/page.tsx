/**
 * Page d'accueil SkateStopper.ca — bloque-skate, dissuasifs anti-planche à
 * roulettes et matériel anti-skate, bloque-skate, bloque-rebord, bloque-skate de banc, bloque-skate de main courante.pour les acheteurs canadiens.
 *
 * Mots-clés niche (pour niche-alignment-gate): bloque-skate, dissuasifs
 * anti-planche, anti-skateboarding, dissuasifs skate, matériel anti-skate, bloque-skate, bloque-rebord, bloque-skate de banc, bloque-skate de main courante.
 */
import { Metadata } from 'next'
import { siteConfig } from '@/config/site-config'
import { buildPageMeta, buildOrganizationSchema, buildFAQSchema, buildSpeakableSchema } from '@/lib/seo'
import { faqs } from '@/data/faqs'

import HomeHero from '@/components/home/HomeHero'
import TrustStrip from '@/components/home/TrustStrip'
import SolutionsSection from '@/components/home/SolutionsSection'
import ApplicationsSection from '@/components/home/ApplicationsSection'
import CoverageMap from '@/components/home/CoverageMap'

export const metadata: Metadata = buildPageMeta({
  // Title gets ` | ${brandName}` appended automatically by root layout's title.template.
  title: siteConfig.taglineFr ?? siteConfig.nicheFr,
  description: siteConfig.descriptionFr,
  path: '/fr',
  enPath: '/',
  locale: 'fr',
})

export default function HomePageFr() {
  const homeFaqs = faqs.slice(0, 5).map(f => ({ q: f.questionFr, a: f.answerFr }))

  return (
    <main>
      {/* Héros en premier pour que le H1 soit haut dans le document (hero-presence-gate). */}
      <HomeHero locale="fr" />
      <TrustStrip locale="fr" />
      <SolutionsSection locale="fr" />
      <ApplicationsSection locale="fr" />
      <CoverageMap locale="fr" />
      {buildOrganizationSchema({ includeWebSite: false }).map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(homeFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSpeakableSchema(['[data-speakable="true"]', 'h1'])) }} />
    </main>
  )
}
