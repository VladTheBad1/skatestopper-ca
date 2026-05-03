import { Metadata } from 'next'
import { siteConfig } from '@/config/site-config'
import { buildPageMeta } from '@/lib/seo'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = buildPageMeta({
  title: 'Politique de Confidentialité',
  description: `Politique de confidentialité de ${siteConfig.brandName}. Comment nous recueillons, utilisons et protégeons vos renseignements personnels.`,
  path: '/fr/confidentialite',
  enPath: '/privacy',
  locale: 'fr',
})

export default function PrivacyPageFr() {
  return (
    <LegalPage title="Politique de Confidentialité" breadcrumbLabel="Confidentialité" locale="fr">
      <p className="text-sm text-[#64748b]">Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}</p>
      <p>{siteConfig.brandName} s&apos;engage à protéger votre vie privée. Cette politique décrit comment nous recueillons, utilisons et protégeons vos renseignements personnels lorsque vous utilisez notre site Web et nos services.</p>

      <h2>Renseignements que Nous Recueillons</h2>
      <p>Nous recueillons les renseignements que vous fournissez par nos formulaires de demande de soumission, y compris le nom, le courriel, le numéro de téléphone, la ville et les détails du projet. Nous recueillons également automatiquement certaines données telles que les adresses IP, le type de navigateur et les pages visitées.</p>

      <h2>Comment Nous Utilisons Vos Renseignements</h2>
      <p>Nous utilisons vos renseignements pour :</p>
      <ul>
        <li>Préparer et livrer des soumissions écrites pour le matériel anti-planche et l’installation</li>
        <li>Traiter et répondre à vos demandes de soumission</li>
        <li>Améliorer notre site Web et nos services</li>
        <li>Envoyer des communications pertinentes sur nos services</li>
        <li>Respecter nos obligations légales</li>
      </ul>

      <h2>Protection des Données</h2>
      <p>Nous employons des mesures de sécurité conformes aux normes de l&apos;industrie pour protéger vos renseignements personnels. Vos données sont chiffrées en transit et au repos, et l&apos;accès est limité au personnel autorisé uniquement.</p>

      <h2>Partage avec des Tiers</h2>
      <p>Nous partageons les informations de votre demande de soumission à l’interne avec nos équipes d’estimation, de fabrication et de planification d’installation pour répondre à la demande. Nous ne vendons pas vos renseignements personnels à des tiers à des fins de marketing. Lorsqu’un projet nécessite des sous-traitants (carottage de béton ou restauration de pierre, par exemple), nous ne partageons que les détails strictement nécessaires avec un sous-traitant cautionné lié par une obligation de confidentialité écrite.</p>

      <h2>Vos Droits</h2>
      <p>En vertu de la législation canadienne sur la protection de la vie privée (LPRPDE), vous avez le droit d&apos;accéder à vos renseignements personnels, de les corriger et d&apos;en demander la suppression. Vous pouvez également vous désabonner des communications marketing à tout moment.</p>

      <h2>Contactez-Nous</h2>
      <p>Pour toute question relative à la confidentialité, contactez-nous à <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ou appelez au <a href={`tel:+1${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>.</p>
    </LegalPage>
  )
}
