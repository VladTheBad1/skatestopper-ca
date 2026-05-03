import { Metadata } from 'next'
import { siteConfig } from '@/config/site-config'
import { buildPageMeta } from '@/lib/seo'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = buildPageMeta({
  title: "Conditions d'Utilisation",
  description: `Conditions d'utilisation de ${siteConfig.brandName}. Règles et conditions pour l'achat de bloque-skate et de services d'installation.`,
  path: '/fr/conditions',
  enPath: '/terms',
  locale: 'fr',
})

export default function TermsPageFr() {
  return (
    <LegalPage title="Conditions d'Utilisation" breadcrumbLabel="Conditions" locale="fr">
      <p className="text-sm text-[#64748b]">Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}</p>
      <p>En utilisant {siteConfig.brandName}, vous acceptez ces conditions d&apos;utilisation. Veuillez les lire attentivement avant de demander une soumission ou d&apos;acheter du matériel.</p>

      <h2>Description du Service</h2>
      <p>{siteConfig.brandName} fabrique, fournit et installe du matériel anti-planche (bloque-skate, dissuasifs de rebord, arrêts de main courante, plots de banc et produits connexes) pour des clients commerciaux, municipaux et institutionnels partout au Canada. Nous livrons le matériel et les services d&apos;installation directement, par notre propre production et nos équipes d&apos;installation cautionnées.</p>

      <h2>Responsabilités de l&apos;Utilisateur</h2>
      <p>Les utilisateurs doivent :</p>
      <ul>
        <li>Fournir des informations exactes lors des demandes de soumission (adresse du site, type de surface, quantité, exigences de finition)</li>
        <li>Se conformer à toutes les lois, codes du bâtiment et exigences patrimoniales applicables au site d&apos;installation</li>
        <li>Être autorisés à commander des travaux sur la propriété identifiée dans la demande de soumission</li>
        <li>Ne pas abuser du site Web ou du système de soumission ni tenter de les perturber</li>
      </ul>

      <h2>Soumissions, Commandes et Installation</h2>
      <p>Les soumissions écrites de {siteConfig.brandName} sont valides 30 jours sauf indication contraire. Les commandes sont confirmées dès réception d&apos;un bon de commande ou d&apos;une soumission signée. Le calendrier d&apos;installation est confirmé lors de la planification et dépend de l&apos;accès au site, des conditions météo et de la profondeur de gel. Lorsque le client commande l&apos;installation, nos équipes portent une responsabilité civile générale de 5 M$ et les certifications professionnelles provinciales applicables.</p>

      <h2>Garantie</h2>
      <p>Notre matériel est couvert par une garantie de 10 ans sur les revêtements et une garantie à vie sur les composants structuraux en inox 316L marin, sous réserve d&apos;un usage normal et d&apos;une installation conforme. Les réclamations doivent être soumises par écrit dans les 30 jours suivant la constatation du problème, avec photos et référence de commande. La garantie ne couvre pas les dommages causés par impact, vandalisme délibéré, modification non autorisée ou installation par un tiers non cautionné.</p>

      <h2>Limitation de Responsabilité</h2>
      <p>{siteConfig.brandName} fournit le matériel et les services d&apos;installation selon les spécifications confirmées au moment de la commande. Nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs, y compris la perte de revenus, au-delà de la valeur de la commande concernée.</p>

      <h2>Modifications</h2>
      <p>Nous nous réservons le droit de modifier ces conditions à tout moment. L&apos;utilisation continue du site Web ou des services après modification constitue l&apos;acceptation des conditions modifiées.</p>

      <h2>Contactez-Nous</h2>
      <p>Pour toute question sur ces conditions, contactez-nous à <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ou appelez au <a href={`tel:+1${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>.</p>
    </LegalPage>
  )
}
