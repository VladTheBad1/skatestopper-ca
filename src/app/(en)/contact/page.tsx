import { Metadata } from 'next'
import { buildPageMeta } from '@/lib/seo'
import ContactPage from '@/components/pages/ContactPage'

export const metadata: Metadata = buildPageMeta({
  title: 'Contact',
  description: 'Quote requests, RFP submissions, and procurement enquiries for Canadian skate-stopper installs.',
  path: '/contact',
  frPath: '/fr/nous-joindre',
})

export default function Page() {
  return <ContactPage locale="en" />
}
