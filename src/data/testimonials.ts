export interface Testimonial {
  name: string
  role: string
  cityEn: string
  cityFr: string
  textEn: string
  textFr: string
  rating: number      // 1-5
  image?: string      // optional avatar
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah MacDonald',
    role: 'Facilities Director',
    cityEn: 'Halifax',
    cityFr: 'Halifax',
    rating: 5,
    textEn: 'We were repairing the same three handrails every year — same schools, same grind damage, same maintenance budget hit. SkateStopper.ca\'s 316L stoppers went in over a summer recess in 2024. Two winters later, zero handrail repair calls at those locations. Their AODA documentation made the facilities-and-accessibility sign-off straightforward.',
    textFr: 'Nous réparions les mêmes trois mains courantes chaque année — mêmes écoles, mêmes dégâts de glisse, même impact budget. Les arrêts 316L de SkateStopper.ca ont été installés pendant une relâche d\'été en 2024. Deux hivers plus tard, zéro appel de réparation à ces emplacements. Leur documentation LAPHO a rendu l\'approbation simple.',
  },
  {
    name: 'Marcus Chen',
    role: 'Property Manager',
    cityEn: 'Toronto',
    cityFr: 'Toronto',
    rating: 5,
    textEn: 'Our flagship retail tenant on King West was about to invoke the rent-abatement clause for property condition. SkateStopper.ca did a Saturday-overnight install on the granite display ledge — 14 studs, brushed-stainless finish to match the tenant\'s brand. Tenant withdrew the abatement notice. Quoted, scheduled, installed, invoiced — no surprises.',
    textFr: 'Notre locataire commercial phare sur King West était sur le point d\'invoquer la clause de remise de loyer. SkateStopper.ca a fait une installation samedi soir sur le rebord en granite — 14 plots, finition inox brossé. Le locataire a retiré l\'avis. Devis, planification, installation, facturation — aucune surprise.',
  },
  {
    name: 'Jean-François Lévesque',
    role: 'Conservateur du patrimoine',
    cityEn: 'Quebec City',
    cityFr: 'Ville de Québec',
    rating: 5,
    textEn: 'Heritage-stone deterrent installs are notoriously difficult — most vendors don\'t understand the conservation review process. SkateStopper.ca submitted a complete heritage-approval package in French, with artificially-aged bronze finish samples on Quebec limestone substrate. UNESCO World Heritage compliance, on time.',
    textFr: 'Les installations dissuasives sur pierre patrimoniale sont notoirement difficiles. SkateStopper.ca a soumis un dossier d\'approbation patrimoniale complet en français, avec des échantillons de finition bronze vieillie artificiellement sur substrat de calcaire de Québec. Conformité au patrimoine mondial UNESCO, à temps.',
  },
  {
    name: 'Priya Sharma',
    role: 'Procurement Lead',
    cityEn: 'Vancouver',
    cityFr: 'Vancouver',
    rating: 5,
    textEn: 'We standardize on 316L low-carbon stainless for SkyTrain station hardware because of Pacific salt-air pitting. SkateStopper.ca was the only Canadian vendor with that grade in stock and field-proven on coastal transit. Multi-year supply agreement signed in 2024 — they\'ve shipped to 6 SkyTrain stations and 40+ shelter benches with zero warranty claims.',
    textFr: 'Nous standardisons sur l\'inox 316L à faible carbone pour le matériel des stations SkyTrain. SkateStopper.ca était le seul fournisseur canadien avec ce grade en stock et éprouvé sur le transit côtier. Entente d\'approvisionnement pluriannuelle signée en 2024 — zéro réclamation de garantie.',
  },
  {
    name: 'Robert McKinnon',
    role: 'Condo Board President',
    cityEn: 'Calgary',
    cityFr: 'Calgary',
    rating: 5,
    textEn: 'Our lobby plaza ledge was getting hit weekly. SkateStopper.ca\'s board-presentation deck made the conversation with our 7-member board easy — photos, lifecycle costs, install timeline, resident-communication template all in one document. Saturday morning install, no resident complaints, lobby stays clean.',
    textFr: 'Notre rebord de place de hall était frappé chaque semaine. La présentation au conseil de SkateStopper.ca a rendu la conversation avec notre conseil de 7 membres facile — photos, coûts du cycle de vie, calendrier d\'installation en un document. Installation samedi matin, aucune plainte.',
  },
]
