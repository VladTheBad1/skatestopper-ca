import { Metadata } from 'next'
import { buildPageMeta } from '@/lib/seo'
import { siteConfig } from '@/config/site-config'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = buildPageMeta({
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.brandName}. Rules and conditions for purchasing skate stoppers and installation services.`,
  path: '/terms',
  frPath: '/fr/conditions',
})

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" breadcrumbLabel="Terms of Service" locale="en">
      <p className="text-sm text-[#64748b]">Last updated: {new Date().toLocaleDateString('en-CA')}</p>
      <p>By using {siteConfig.brandName}, you agree to these terms of service. Please read them carefully before requesting a quote or purchasing hardware.</p>

      <h2>Service Description</h2>
      <p>{siteConfig.brandName} manufactures, supplies, and installs skate-deterrent hardware (skate stoppers, ledge deterrents, handrail stops, bench studs, and related products) for commercial, municipal, and institutional clients across Canada. We deliver hardware and installation services directly through our own production and bonded install crews.</p>

      <h2>User Responsibilities</h2>
      <p>Users must:</p>
      <ul>
        <li>Provide accurate information when requesting quotes (site address, surface type, quantity, finish requirements)</li>
        <li>Comply with all applicable laws, building codes, and heritage-conservation requirements at the install site</li>
        <li>Be authorized to commission work on the property identified in the quote request</li>
        <li>Not misuse or attempt to disrupt our website or quote system</li>
      </ul>

      <h2>Quotes, Orders, and Installation</h2>
      <p>Written quotes from {siteConfig.brandName} are valid for 30 days unless otherwise stated. Orders are confirmed once a purchase order or signed quote is received. Installation timing is confirmed during scheduling and depends on access, weather, and frost-line conditions. Where the client commissions installation, our crews carry $5M general liability insurance and applicable provincial trade certifications.</p>

      <h2>Warranty</h2>
      <p>Our hardware carries a 10-year coating warranty and a lifetime structural warranty on 316L marine-grade stainless components, subject to normal use and proper installation. Warranty claims must be submitted in writing within 30 days of the issue being identified, with photos and the original order reference. The warranty does not cover damage from impact, deliberate vandalism, unauthorized modification, or installation by a non-bonded third party.</p>

      <h2>Limitation of Liability</h2>
      <p>{siteConfig.brandName} provides hardware and installation services on the basis of the specifications confirmed at order time. We are not liable for indirect, incidental, or consequential damages, including loss of business, beyond the value of the order in question.</p>

      <h2>Modifications</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of our website or services after changes constitutes acceptance of the modified terms.</p>

      <h2>Contact</h2>
      <p>For questions about these terms, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call <a href={`tel:+1${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>.</p>
    </LegalPage>
  )
}
