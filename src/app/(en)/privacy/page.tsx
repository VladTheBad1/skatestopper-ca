import { Metadata } from 'next'
import { buildPageMeta } from '@/lib/seo'
import { siteConfig } from '@/config/site-config'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = buildPageMeta({
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.brandName}. How we collect, use, and protect your personal information.`,
  path: '/privacy',
  frPath: '/fr/confidentialite',
})

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" breadcrumbLabel="Privacy Policy" locale="en">
      <p className="text-sm text-[#64748b]">Last updated: {new Date().toLocaleDateString('en-CA')}</p>
      <p>{siteConfig.brandName} is committed to protecting your privacy. This policy describes how we collect, use, and safeguard your personal information when you use our website and services.</p>

      <h2>Information We Collect</h2>
      <p>We collect information you provide through our quote request forms, including name, email, phone number, city, and project details. We also automatically collect certain data such as IP addresses, browser type, and pages visited through cookies and analytics tools.</p>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Prepare and deliver written quotes for skate-deterrent hardware and installation</li>
        <li>Process and respond to your quote requests</li>
        <li>Improve our website and services</li>
        <li>Send relevant communications about our services</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Data Protection</h2>
      <p>We employ industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest, and access is limited to authorized personnel only.</p>

      <h2>Third-Party Sharing</h2>
      <p>We share your quote-request information internally with our estimating, manufacturing, and install-scheduling teams to fulfill the request. We do not sell your personal information to third parties for marketing purposes. Where a project requires sub-trades (e.g. concrete coring or stone restoration), we share only the strictly necessary site details with the bonded sub-trade under a written confidentiality obligation.</p>

      <h2>Your Rights</h2>
      <p>Under Canadian privacy legislation (PIPEDA), you have the right to access, correct, and request deletion of your personal information. You may also opt out of marketing communications at any time.</p>

      <h2>Contact</h2>
      <p>For privacy inquiries, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call <a href={`tel:+1${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>.</p>
    </LegalPage>
  )
}
