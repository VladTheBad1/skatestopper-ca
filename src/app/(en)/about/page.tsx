import { Metadata } from 'next'
import { buildPageMeta, buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/seo'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = buildPageMeta({
  title: 'About Us — Canadian Skate-Stopper Hardware',
  description: 'Skatestopper.ca supplies + installs skate stoppers across Canada. Engineered for our climate, RFP-ready, bonded crews.',
  path: '/about',
  frPath: '/fr/a-propos',
})

export default function AboutEn() {
  const orgJsonLd = buildOrganizationSchema({ includeWebSite: false })
  const crumbsJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsJsonLd) }}
      />
      <AboutPage locale="en" />
    </>
  )
}
