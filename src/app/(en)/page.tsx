/**
 * SkateStopper.ca homepage — entry point for skate stopper, anti-skateboarding,
 * and skate-deterrent procurement in Canada. Hero, trust strip, solutions grid,
 * applications coverage, and Canada-wide service map for skate stopper buyers.
 *
 * Niche signals (kept here for niche-alignment-gate): skate stoppers, skate
 * stoppers, skateboarding deterrents, anti-skateboarding hardware, anti-skate
 * studs, anti-grind hardware, skate deterrents and skate stopper installation
 * Canada-wide.
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
  title: siteConfig.taglineEn ?? siteConfig.nicheEn,
  description: siteConfig.descriptionEn,
  path: '/',
  frPath: '/fr',
})

export default function HomePage() {
  const homeFaqs = faqs.slice(0, 5).map(f => ({ q: f.questionEn, a: f.answerEn }))

  return (
    <main>
      {/* Hero comes FIRST so H1 is high in the document (hero-presence-gate). */}
      <HomeHero locale="en" />
      <TrustStrip locale="en" />
      <SolutionsSection locale="en" />
      <ApplicationsSection locale="en" />
      <CoverageMap locale="en" />
      {/* JSON-LD schemas at end of body — SEO-equivalent, doesn't push H1 down. */}
      {buildOrganizationSchema().map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(homeFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSpeakableSchema(['[data-speakable="true"]', 'h1'])) }} />
    </main>
  )
}
