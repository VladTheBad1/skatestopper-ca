import { Metadata } from 'next'
import { buildPageMeta, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/seo'
import { faqs } from '@/data/faqs'
import { markdownToHtml } from '@/lib/markdown'
import PageHero from '@/components/PageHero'
import FAQSection from '@/components/FAQSection'
export const metadata: Metadata = buildPageMeta({
  title: 'FAQ Bloque-skate — Matériaux & prix',
  description:
    "Réponses sur les grades d'inox, l'espacement d'installation, la résistance gel-dégel, la conformité LAPHO et les délais d'approvisionnement DDP.",
  path: '/faq',
  frPath: '/fr/faq',
})

export default function FAQFrPage() {
  const faqItems = faqs.map((f) => ({ q: f.questionFr, a: f.answerFr }))
  const schema = buildFAQSchema(faqItems)
  const formatted = faqs.map((f) => ({
    question: f.questionFr,
    answer: markdownToHtml(f.answerFr),
  }))
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Accueil', url: '/fr' },
            { name: 'FAQ', url: '/fr/faq' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Questions fréquentes"
        title="Les questions les plus posées par acheteurs, spécificateurs et personnel municipal."
        subtitle="Matériaux, installation, conformité, délais, garanties et approvisionnement — répondues avec les vraies spécifications de nos déploiements canadiens."
        breadcrumbs={[{ label: 'FAQ' }]}
        locale="fr"
      />
      {/* §2.11.5 Points clés pour FAQ longue */}
      <section className="py-10 bg-[var(--bg-section)]">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <blockquote className="border-l-4 border-[var(--accent)] pl-6 py-2 not-italic">
            <p className="font-extrabold uppercase tracking-wider text-sm text-[var(--accent)] mb-3">Points clés</p>
            <ul className="space-y-2 text-[var(--text)] text-base leading-relaxed">
              <li>Les bloque-skate sont <strong>permanents</strong> — durée de vie typique <strong>15–25 ans</strong> pour l’inox, <strong>30+ ans</strong> pour la patine bronze.</li>
              <li>Installations sur <strong>propriété privée</strong> sans permis ; propriétés patrimoniales et louées exigent <strong>2–4 semaines d’approbation</strong>.</li>
              <li>Prix : <strong>25 à 120 $ par unité installée</strong> selon le type de produit, la finition et l’accès — devis ventilés.</li>
              <li>Matériel : <strong>316L marin</strong> pour la côte, <strong>304</strong> intérieur, <strong>patine bronze</strong> pour le patrimoine. Conforme aux tables CNB de profondeur de gel.</li>
              <li>Approvisionnement : achat direct sous <strong>50 K $</strong>, DDP public au-delà. Réponse aux DDP en <strong>5 jours ouvrables</strong>.</li>
            </ul>
          </blockquote>
        </div>
      </section>
      {/* §2.11.10 tableau comparatif */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-extrabold text-2xl md:text-3xl mb-6 text-[var(--text)]">Prix de référence — plages typiques CAD</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--text)]">
                <th className="text-left py-3 pr-4 font-bold">Produit</th>
                <th className="text-left py-3 pr-4 font-bold">Inox 304</th>
                <th className="text-left py-3 pr-4 font-bold">Inox 316 marin</th>
                <th className="text-left py-3 font-bold">Patine bronze</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Plot de surface</td><td className="py-3 pr-4">35–55 $</td><td className="py-3 pr-4">55–85 $</td><td className="py-3">75–120 $</td></tr>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Dôme à profil bas</td><td className="py-3 pr-4">40–70 $</td><td className="py-3 pr-4">60–95 $</td><td className="py-3">85–140 $</td></tr>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Serrage main courante</td><td className="py-3 pr-4">80–120 $</td><td className="py-3 pr-4">140–180 $</td><td className="py-3">180–240 $</td></tr>
              <tr className="border-b border-[var(--line)]"><td className="py-3 pr-4">Plot de banc</td><td className="py-3 pr-4">25–45 $</td><td className="py-3 pr-4">40–65 $</td><td className="py-3">60–100 $</td></tr>
              <tr><td className="py-3 pr-4">Bande / mètre</td><td className="py-3 pr-4">180–220 $</td><td className="py-3 pr-4">220–260 $</td><td className="py-3">260–340 $</td></tr>
            </tbody>
          </table>
          <p className="text-sm text-[var(--text-light)] mt-4">CAD, matériel + installation, avant remises de volume et prime taux prévalent. Commandes 50+ unités : 15–25 % de remise.</p>
        </div>
      </section>
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-extrabold text-2xl md:text-3xl mb-2 text-[var(--text)]">Questions courantes — réponses détaillées</h2>
          <p className="text-[var(--text-light)] mb-6">Cliquez une question pour développer. Spécifications, méthode d’installation, codes, délais et prix.</p>
        </div>
      </section>
      <FAQSection faqs={formatted} locale="fr" showHeading={false} />
</main>
  )
}
