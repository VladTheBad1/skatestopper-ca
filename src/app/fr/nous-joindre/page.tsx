import { Metadata } from 'next'
import { buildPageMeta } from '@/lib/seo'
import ContactPage from '@/components/pages/ContactPage'

export const metadata: Metadata = buildPageMeta({
  title: 'Nous joindre — Skatestopper.ca',
  description: 'Demandes de devis, soumissions DDP et enquêtes d\u2019approvisionnement pour les installations de bloque-skate au Canada.',
  path: '/fr/nous-joindre',
  enPath: '/contact',
  locale: 'fr',
})

export default function Page() {
  return <ContactPage locale="fr" />
}
