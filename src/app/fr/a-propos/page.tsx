import { Metadata } from 'next'
import { buildPageMeta, buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/seo'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = buildPageMeta({
  title: 'À propos — Matériel anti-skate canadien',
  description:
    "Bloque-skate fournis, livrés et installés au Canada — municipalités, autorités de transport, écoles, immobilier commercial. LAPHO, RC 5 M $, prêt DDP.",
  path: '/fr/a-propos',
  enPath: '/about',
  locale: 'fr',
})

export default function AProposPage() {
  const orgJsonLd = buildOrganizationSchema({ includeWebSite: false })
  const crumbsJsonLd = buildBreadcrumbSchema([
    { name: 'Accueil', url: '/fr' },
    { name: 'À propos', url: '/fr/a-propos' },
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
      <AboutPage locale="fr" />
    </>
  )
}
