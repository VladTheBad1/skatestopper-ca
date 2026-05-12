export interface BlogPost {
  slug: string
  slugFr: string
  titleEn: string
  titleFr: string
  descriptionEn: string
  descriptionFr: string
  contentEn: string       // Markdown or HTML content
  contentFr: string
  author: string
  authorRole?: string
  image?: string
  imageAlt?: string
  imageAltFr?: string
  publishedAt: string     // ISO date
  updatedAt?: string
  category: string
  tags: string[]
  readingTime: number     // minutes
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'specifying-skate-stoppers-canadian-winter',
    image: '/images/products/skate-stoppers.webp',
    slugFr: 'specifier-bloque-skate-hiver-canadien',
    titleEn: 'Skate Stoppers for Canadian Winters',
    titleFr: 'Bloque-skate pour les hivers canadiens',
    descriptionEn: 'Stainless grade, anchor depth and frost rating for skate stoppers across 7 Canadian climate zones — Victoria 0.45 m to Winnipeg 2.4 m frost depth.',
    descriptionFr: 'Grade d\'inox, profondeur d\'ancrage et résistance au gel pour bloque-skate par zone climatique — Victoria 0,45 m à Winnipeg 2,4 m.',
    author: 'SkateStopper.ca Engineering',
    authorRole: 'Engineering team',
    publishedAt: '2025-09-15',
    category: 'Specifications',
    tags: ['specifications', 'climate', 'stainless steel', 'frost depth', 'Canadian climate'],
    readingTime: 7,
    contentEn: `> **Key takeaways**
> - Canada spans **7 ASHRAE climate zones** — the right stainless grade and anchor depth depends on which zone your property is in.
> - **316 marine-grade stainless** is mandatory for coastal cities (Vancouver, Victoria, Halifax, Saint John). **304 stainless** is sufficient inland.
> - Frost depth ranges from **0.45 m in Victoria** to **2.4 m in Winnipeg** — anchor specifications must match your zone or studs will heave.

## Why Canadian climate matters for skate stopper selection

Most skate stopper vendors sell a single product specification across North America. That works in Los Angeles. It doesn't work in Winnipeg, where the ground freezes to **2.4 metres** and cycles through 30+ freeze-thaw events per winter.

The consequences of wrong specification are predictable: **stud heave** (anchors lifted by frost expansion), **crevice corrosion** (chloride attack on 304 stainless in salt-air), and **fastener seizure** (dissimilar metals in epoxy bond contracting at different rates). We've seen all three — mostly on US-spec installs shipped to Canadian properties by vendors who didn't ask the frost question.

## The 7 Canadian climate zones

**Zone 4 / Zone 5 (Victoria, Metro Vancouver, Fraser Valley):** Frost depth 0.45–0.75 m. Mild winters but aggressive Pacific salt air. **316 marine-grade stainless mandatory** at any location within 5 km of tidal water. Anchor depth 75 mm minimum.

**Zone 6 (Toronto, Ottawa, Montreal):** Frost depth 1.2–1.5 m. 25–40 freeze-thaw cycles per year. **304 stainless** acceptable for inland sites; 316 for anything within 2 km of Lake Ontario, St. Lawrence, or Ottawa River. Anchor depth 100 mm minimum with wedge anchor.

**Zone 7A (Edmonton, Saskatoon, Winnipeg):** Frost depth 1.8–2.4 m. 15–20 freeze-thaw cycles but extreme depth. **304 stainless** with expansion-joint detail at slab interface. Anchor depth 100–125 mm with 2-part epoxy, winter-grade formulation for installation below +5°C.

**Zone 7B (Churchill, MB; Whitehorse, YT):** Special-order only. Contact us for engineering assessment.

## Stainless grade decision tree

Use **316L low-carbon marine grade** when:
- Within 5 km of tidal water (Pacific, Atlantic, Bay of Fundy, Great Lakes)
- Transit station platform edges (de-icer salt spray)
- Pool deck surrounds
- Heritage sites with bronze or copper architectural elements nearby (galvanic risk)

Use **304 brushed satin** when:
- Inland urban property, no water proximity
- Indoor application (lobby, parkade)
- Budget-sensitive municipal procurement without heritage requirement

Use **Bronze patina (brass alloy, not stainless)** when:
- Heritage-designated property (Parks Canada, provincial conservation, municipal heritage register)
- UNESCO World Heritage Zone (Vieux-Québec, Lunenburg, NS)
- Architect-specified natural patina development required

## Anchor depth by frost zone — the non-negotiable number

| Climate Zone | City Example | Frost Depth | Min Anchor Depth |
|---|---|---|---|
| Zone 5 | Victoria, BC | 0.45 m | 75 mm |
| Zone 5 | Vancouver, BC | 0.75 m | 75 mm |
| Zone 6 | Toronto, ON | 1.2 m | 100 mm |
| Zone 6 | Montréal, QC | 1.5 m | 100 mm |
| Zone 7A | Calgary, AB | 1.8 m | 110 mm |
| Zone 7A | Winnipeg, MB | 2.4 m | 125 mm |

## Internal links for further reading

For specific product specifications by surface type, see our [Skate Stoppers](/skate-stoppers) and [Skateboard Deterrents for Concrete](/skateboard-deterrents-for-concrete) product pages. For heritage-specific procurement, see [How to Get Heritage-Designated Skate Stoppers Approved](/blog/heritage-procurement-bronze-patina-approval). For city-specific installation notes, visit our [cities page](/cities).

## Climate-zone matrix — every major Canadian city

| Zone | Cities | Frost depth | Avg winter | Stainless grade |
|---|---|---|---|---|
| 4 | Vancouver, Victoria, Tofino | 0.6 m | +4 °C | 316L marine |
| 5 | Toronto, Hamilton, Burlington | 1.2 m | -3 °C | 316 |
| 6 | Montreal, Ottawa, Québec | 1.5 m | -8 °C | 316 / bronze heritage |
| 7 | Calgary, Edmonton, Saskatoon | 2.0 m | -15 °C | 304 + cold-rated epoxy |
| 8 | Yellowknife, Iqaluit | 2.4 m | -28 °C | 316 (cold embrittlement) |



**Zone 4 (Pacific maritime)** Vancouver, Victoria, Tofino: 0.6 m frost depth, +4°C average winter, very high coastal corrosion. **Mandatory: 316L marine stainless or bronze patina.** No mechanical anchors near salt-water exposure.

**Zone 5 (low Prairie + GTA)** Toronto, Hamilton, Mississauga, Burlington: 1.2 m frost depth, -3 to -5°C, moderate corrosion (road salt only). **Recommended: 316 stainless** for visible installs, 304 brushed acceptable on indoor / sheltered sites.

**Zone 6 (Greater Montreal + Atlantic coast)** Montreal, Ottawa, Quebec City, Halifax: 1.5 m frost depth, -8 to -10°C, high corrosion on coastal sites. **316L mandatory in Halifax, St. John's, Sydney; 316 inland; bronze for heritage.**

**Zone 7 (Prairies)** Calgary, Edmonton, Saskatoon, Regina: 1.8-2.0 m frost depth, -12 to -15°C, low corrosion. **304 stainless suffices**, but cold-rated epoxy is mandatory (chinook freeze-thaw cycling fatigues standard concrete-set anchors in 3 winters).

**Zone 8 (Northern + Arctic)** Yellowknife, Whitehorse, Iqaluit: 2.4 m frost depth, -20 to -28°C, very low corrosion. **Stainless 316 recommended** for cold-temperature embrittlement resistance even though corrosion isn't the driver.

## Anchor selection by substrate

**Concrete substrates** (poured-in-place, precast pavers): chemical anchor with 75 mm minimum embedment, rapid-cure epoxy classified to -15°C for mid-winter installs. We do NOT mechanical-anchor into concrete substrates — freeze-thaw splits the concrete around mechanical anchors within 5-7 winters.

**Granite substrates** (heritage benches, monumental staircases): chemical anchor only with 50 mm embedment. Pre-drill with diamond bit to avoid spalling. Granite spec is strictest because heritage approvals reject any anchor that visible cracking on the surface.

**Limestone substrates** (Vieux-Montreal, Quebec City heritage): friction-fit pin only — chemical anchors stain limestone within 12 months. Pin diameter 8 mm, depth 30 mm, sealed with bronze-matched grout.

**Aluminum / steel substrates** (Maglin, Wishbone bench slats): mechanical bolt with 25 mm embedment plus chemical-thread-lock. Both grades together — mechanical alone vibrates loose in 18 months on cold-cycle benches.

## RFP technical-clause checklist

When drafting an RFP for skate-stopper supply + install, include: **(1)** climate-zone reference per NBCC 2020 with destination city; **(2)** stainless grade by site (316L marine / 316 / 304 brushed); **(3)** anchor method by substrate; **(4)** AODA / provincial accessibility-code conformance letter required; **(5)** bonded contractor with $5M general liability; **(6)** stamped engineering by provincial-licensed engineer; **(7)** patina / finish documentation if heritage; **(8)** spare-parts SLA in business days; **(9)** lifecycle-maintenance plan over 15-year service life. With those nine clauses, vendors will return apples-to-apples bids.


## FAQ

**How long do skate stoppers last in Canadian winters?**
316L marine-grade stainless skate stoppers carry a lifetime corrosion warranty across all 7 Canadian climate zones. 304 stainless carries 25 years for inland deployments where road-salt is the only chloride source. In Zone 7B (Winnipeg, north of 53° latitude), the freeze-thaw count matters more than absolute temperature — our anchor specifications account for both.

**What is the typical install spacing for winter-rated specs?**
150 mm centre-to-centre for ledges under 200 mm wide is standard; we tighten to 100 mm spacing for Zone 7B/Zone 8 climates where freeze-thaw cycling can flex a longer span. Spacing affects nothing about deterrent function once you're below 200 mm — it only matters for anchor stress distribution in extreme frost.

**Do I need different anchors for winter conditions?**
Yes. Standard 75 mm anchor depth is correct for Toronto (Zone 6, 1.2 m frost). Winnipeg requires 2.4 m frost-rated wedge anchors with expansion-joint detail. Calgary and Edmonton fall between the two — we ship climate-zone-specific anchor specs with every quote.`,
    contentFr: `> **Points clés**
> - Le Canada couvre **7 zones climatiques ASHRAE** — le bon grade d'inox et la profondeur d'ancrage dépendent de votre zone.
> - L'**inox 316 grade marin** est obligatoire pour les villes côtières (Vancouver, Victoria, Halifax, Saint John). L'**inox 304** est suffisant à l'intérieur.
> - La profondeur de gel varie de **0,45 m à Victoria** à **2,4 m à Winnipeg** — les spécifications d'ancrage doivent correspondre à votre zone.

## Pourquoi le climat canadien est important pour le choix des bloque-skate

La plupart des fournisseurs de bloque-skate vendent une seule spécification de produit pour toute l'Amérique du Nord. Cela fonctionne à Los Angeles. Pas à Winnipeg, où le sol gèle à **2,4 mètres** et traverse 30+ cycles gel-dégel par hiver.

Les conséquences d'une mauvaise spécification sont prévisibles : **soulèvement des plots** (ancrages soulevés par l'expansion du gel), **corrosion par crevasse** (attaque chlorurée sur l'inox 304 en air salin), et **grippage des fixations**. Nous avons observé les trois — principalement sur des installations aux spécifications américaines.

## Arbre de décision grade d'inox

Utilisez **316L bas carbone grade marin** quand :
- À moins de 5 km d'eau tidale (Pacifique, Atlantique, Baie de Fundy, Grands Lacs)
- Quais de stations de transit (projection de sel de dégivrage)
- Abords de piscine
- Sites patrimoniaux avec éléments en bronze ou cuivre à proximité

Utilisez **304 satiné brossé** quand :
- Propriété urbaine intérieure, sans proximité d'eau
- Application intérieure (hall, garage)
- Approvisionnement municipal soucieux du budget

Pour plus d'informations sur les produits, consultez nos [Bloque-skate](/fr/bloque-skate) et [Dissuasifs skateboard pour béton](/fr/dissuasifs-skateboard-pour-beton). Pour les propriétés patrimoniales, consultez notre article sur [l'approbation des bloque-skate patrimoniaux](/fr/blogue/heritage-procurement-bronze-patina-approval). Visitez également notre [page des villes](/fr/villes).

## La table de zones climatiques en pratique

| Zone | Villes | Profondeur de gel | Hiver moyen | Inox |
|---|---|---|---|---|
| 4 | Vancouver, Victoria, Tofino | 0,6 m | +4 °C | 316L marin |
| 5 | Toronto, Hamilton, Burlington | 1,2 m | -3 °C | 316 |
| 6 | Montréal, Ottawa, Québec | 1,5 m | -8 °C | 316 / bronze |
| 7 | Calgary, Edmonton, Saskatoon | 2,0 m | -15 °C | 304 époxy froid |
| 8 | Yellowknife, Iqaluit | 2,4 m | -28 °C | 316 |



Le Canada se divise en 8 zones climatiques selon le CNB 2020 — de la Zone 4 (Vancouver, Victoria) a la Zone 8 (Iqaluit, Inuvik). Chaque zone dicte trois parametres pour le materiel anti-skate: profondeur de gel, temperature de conception minimale, et facteur de chargement de neige sur les bancs.

Un deploiement Zone 4 (Vancouver) s'installe avec ancrages mecaniques a 600 mm de profondeur, en inox 316L marin pour resister aux embruns salins du Pacifique. Un deploiement Zone 6 (Toronto, Montreal) requiert 1 200 mm de profondeur d'ancrage et 316 standard suffit. Zone 7 (Edmonton, Calgary) impose 1 500 mm. Zone 8 (Yellowknife, Iqaluit) atteint 2 400 mm — la profondeur de gel d'Iqaluit est environ 4x celle de Vancouver.

## Cycles gel-degel et fatigue d'ancrage

Le nombre annuel de cycles gel-degel (temperatures traversant 0 degres C) est plus stressant que le froid extreme lui-meme. Toronto enregistre environ 60 cycles par an, Montreal 75, Calgary 90 — Calgary alterne quotidiennement entre froid arctique et redoux chinook. Cette alternance fatigue les ancrages betonises standards en 3-4 hivers. Notre specification Calgary utilise des epoxys a durcissement froid classes a -15 degres C avec joints d'expansion a double couche pour absorber le deplacement gel-degel.

## Corrosion par chlorures et inox 316 vs 304

L'inox 304 est suffisant pour les sites interieurs et les villes eloignees du sel. L'inox 316 est obligatoire pour toute ville a moins de 25 km d'exposition au sel: Vancouver, Halifax, Victoria, St. John's, Sydney, Charlottetown. Le 316L grade marin a faible carbone est requis pour l'exposition directe a l'air salin.


## Delais et approvisionnement

Les commandes standard expedient en 4-6 semaines depuis le bon de commande; les cycles d'appel d'offres municipal ajoutent 6-8 semaines pour la reponse de soumission et l'attribution. Les patines bronze sur mesure ajoutent 2-3 semaines pour le cycle echantillon-approbation. Nos equipes d'installation sont cautionnees pour le travail au taux prevalent partout au Canada.

## Garantie et service apres-vente

Garantie 15 ans sur la structure, 10 ans sur la finition (patine bronze) et a vie sur les elements en inox 316L. Pieces de rechange expediees le jour meme depuis notre centre de distribution de Brantford ON pour tout remplacement de vandalisme ou usure pendant la duree de vie de service.

## FAQ

**Combien de temps durent les bloque-skate dans les hivers canadiens ?**
Les bloque-skate en inox 316L grade marin portent une garantie corrosion à vie dans toutes les 7 zones climatiques canadiennes. L'inox 304 porte 25 ans pour les déploiements intérieurs où le sel de voirie est la seule source de chlorure. En Zone 7B (Winnipeg, nord du 53° de latitude), le compte de cycles gel-dégel importe plus que la température absolue.

**Quel est l'espacement d'installation standard pour spec hivernale ?**
150 mm de centre à centre pour rebords de moins de 200 mm de largeur est standard ; nous resserrons à 100 mm pour les climats Zone 7B/Zone 8 où le cyclage gel-dégel peut fléchir une portée plus longue.

**Faut-il des ancres différentes pour les conditions hivernales ?**
Oui. La profondeur d'ancre standard 75 mm est correcte pour Toronto (Zone 6, 1,2 m de gel). Winnipeg exige des chevilles à expansion 2,4 m résistantes au gel avec détail de joint d'expansion. Calgary et Edmonton se situent entre les deux — nous expédions des spécifications d'ancres adaptées à la zone climatique.`,
  },
  {
    slug: 'handrail-stoppers-cnb-aoda-compliance',
    image: '/images/products/skateboard-deterrents-for-handrails.webp',
    slugFr: 'bloque-skate-mains-courantes-cnb-lapho',
    titleEn: 'Skateboard Deterrents for Handrails — CNB & AODA Compliance',
    titleFr: 'Bloque-skate mains courantes — CNB & LAPHO',
    descriptionEn: 'How to specify skateboard deterrents for handrails that satisfy OBC/CNB continuous-grip requirements and AODA accessibility standards — with real code references.',
    descriptionFr: 'Comment spécifier des bloque-skate de mains courantes qui satisfont aux exigences de prise continue CBC/CNB et aux normes d\'accessibilité LAPHO — avec les références de codes réels.',
    author: 'SkateStopper.ca Engineering',
    authorRole: 'Engineering team',
    publishedAt: '2025-10-20',
    category: 'Code Compliance',
    tags: ['AODA', 'LAPHO', 'OBC', 'CNB', 'code compliance', 'handrails', 'accessibility'],
    readingTime: 8,
    contentEn: `> **Key takeaways**
> - OBC §3.4.6.5 and CNB §9.8.7.4 require **continuous graspable surface** along handrails — skate stoppers must be placed **outside the graspable zone** to comply.
> - The standard spacing is **600–900 mm between stoppers**, positioned at the **top dead-centre of the rail profile**, not on the graspable sides.
> - AODA s.80.21 requires that accessible paths remain unobstructed — properly spaced stoppers do not constitute an obstruction.

## The code conflict that isn't

When architects first encounter skateboard deterrents for handrails, the instinct is to assume a code conflict: "won't the stoppers interrupt the continuous grip?" The answer is no — but only if the stoppers are specified correctly.

**OBC §3.4.6.5** states that handrails must provide a continuous graspable surface. The key word is *graspable* — the surface a human hand contacts when using the rail as support. Skateboard trucks contact the **top face** of the rail, not the graspable sides. Our stoppers attach at the top-dead-centre of the rail profile, **outside the graspable zone entirely**.

## The 600–900 mm spacing standard

The standard installation pattern for **code-compliant handrail stoppers** is:
- **600 mm spacing** for high-exposure rails (school entrances, transit stations, government buildings)
- **900 mm spacing** for moderate-exposure rails (commercial office buildings, condo lobbies)

At 600 mm spacing, a skateboard truck cannot complete a grind — the deck contacts the stopper before the grind establishes. At 900 mm, an experienced rider could potentially grind between studs; this spacing is acceptable for lower-risk locations.

## AODA compliance — three specific requirements

**s.80.21(1)** — Accessible routes must remain unobstructed. Stoppers mounted at top-dead-centre of the rail profile add 0–2 mm to the rail's outside dimension and do not protrude into the path of travel.

**s.80.22** — Handrail graspability must be maintained. Our stoppers do not contact the graspable sides of the rail.

**s.80.23** — Handrail extensions must remain functional. Stoppers are not installed within 300 mm of rail ends.

## Submittal documentation we provide

Every SkateStopper.ca handrail installation quote includes:
- **OBC §3.4.6.5 compliance letter** confirming stopper placement is outside graspable zone
- **CNB §9.8.7.4 equivalent** for federal buildings
- **AODA ss.80.21–80.23 compliance matrix**
- **CAD details** showing stopper position on 38 mm round and 38×38 mm square rail profiles
- **Site-specific spacing plan** signed by our P.Eng.

For handrail stopper specifications, see our [Skateboard Deterrents for Handrails](/skateboard-deterrents-for-handrails). For city-specific installations, visit our [cities directory](/cities). For transit authority applications, see our [transit authorities industry page](/transit-authorities).

## Handrail-stopper geometry — what fits AODA

The core constraint: AODA / CSA B651-18 Section 4.3 requires a continuous graspable surface of 38-50 mm diameter. Our stopper-collar geometry is 65 mm axial length (the collar hugs the rail) with four anti-grind teeth projecting outward 6 mm from the rail surface — within the 12 mm projection limit. Spacing 180 mm centerline on linear sections, 120 mm on monumental staircases.

The teeth project radially OUT — they don't reduce the inner diameter or interfere with the user's grip. A skater attempting to grind catches the teeth before the rail itself, breaking the grind without affecting accessibility.

## CNB Part 3 implications

The National Building Code Part 3 (Use & Occupancy) classifies handrails as **safety-critical assemblies**. Any modification (adding stoppers) must preserve the original load rating: 0.7 kN downward + 1.0 kN horizontal at any point. Our stopper collars add zero structural load and bolt to the rail through chemical-anchored set screws — no welding, no rail penetration, no compromise of the original load path.

We provide an **engineering letter for each install** confirming the original rail load capacity is preserved, signed by a provincial-licensed engineer in the destination province.

## Real Canadian deployments

Place des Arts (Montreal) — bronze-patina collars on the monumental front-staircase handrails, dual-approved by Ville de Montreal patrimoine and Place des Arts safety officer 2024. Yonge-Dundas Square (Toronto) — brushed 316 collars on the central plaza staircase, AODA-compliant. BC Place plaza (Vancouver) — marine 316L on every exterior handrail, 2025.

## Common rejection patterns

Most handrail-stopper rejections come from: collar diameter exceeding the 12 mm projection limit (we stay at 6 mm); set screws penetrating the rail wall (we use external clamp pressure); finish not matching adjacent existing hardware (heritage sites). All three are pre-empted by sample submission before install.


## Lead times and procurement workflow

Standard handrail-stopper orders ship in 4-6 weeks from PO; municipal RFP cycles add 6-8 weeks for tender response and award. Custom-finish bronze patinas add 2-3 weeks for sample-and-approval. Our installation crews are bonded for prevailing-wage work in every Canadian province and travel to site for 50+ unit installs. For under 50 units, we ship pre-bracketed kits with installation drawings and the local handyman or facility crew can complete the install in 30 minutes per linear meter. Spare parts ship same-day from our Brantford ON distribution center for any vandalism or wear replacement throughout the 15-year service life.

## FAQ

**Do skate-stop clamps break CNB / AODA handrail compliance?**
No, when spaced correctly. CNB 9.8.7.4 and AODA require a continuous graspable surface along the rail. Our standard clamp spacing of 600-900 mm leaves the graspable zone intact — the clamps sit between graspable sections, not within them. Every quote ships with the spacing diagram for your code inspector.

**Are clamps removable for graspable-surface inspection?**
Stainless screw-on clamps yes (anti-tamper screws prevent unauthorized removal but maintenance can extract them). TIG-welded saddle stops no — they become part of the rail. We recommend screw-on for leased commercial buildings and welded for transit, schools, and government where permanence matters.

**Which rail diameters do you fit?**
Round 38-50 mm OD is our stock range; square 38×38 mm and 50×50 mm available. Larger transit handrails (60 mm round) require custom-machined clamps with 3-week lead time.`,
    contentFr: `> **Points clés**
> - CBC §3.4.6.5 et CNB §9.8.7.4 exigent une **surface préhensible continue** sur les mains courantes — les bloque-skate doivent être placés **hors de la zone préhensible**.
> - L'espacement standard est **600–900 mm entre les arrêts**, positionnés au **sommet du profil de rampe**.
> - La LAPHO art. 80.21 exige que les voies accessibles restent dégagées — des arrêts correctement espacés ne constituent pas un obstacle.

## La conformité CBC et LAPHO en détail

Le CBC §3.4.6.5 exige que les mains courantes fournissent une surface préhensible continue. Le mot clé est *préhensible* — la surface que la main humaine contact pour s'appuyer. Les trucks de skateboard contactent la **face supérieure** de la rampe, pas les côtés préhensibles. Nos arrêts s'attachent au sommet du profil de rampe, **entièrement hors de la zone préhensible**.

Pour les spécifications de produit, consultez notre page [Dissuasifs skateboard pour mains courantes](/fr/dissuasifs-skateboard-pour-mains-courantes). Pour les applications dans les villes, visitez notre [répertoire des villes](/fr/villes). Pour les autorités de transport, consultez notre page [autorités de transport en commun](/fr/autorites-transport).

## Les exigences dimensionnelles precises de B651-18 pour mains courantes

La norme CSA B651-18 section 4.3 fixe la geometrie des mains courantes: diametre de 38 a 50 mm, degagement mural de 50 mm minimum, prolongement horizontal de 300 mm minimum au-dela du sommet et du bas de l'escalier. Ces parametres dictent la geometrie disponible pour les bloque-skate de mains courantes — le materiel anti-grind ne doit pas reduire le diametre fonctionnel ni interrompre la prise continue.

Notre spec standard est un collier de serrage en acier inoxydable avec quatre dents anti-grind dirigees vers l'exterieur, formant un anneau qui n'altere pas le diametre interieur de la main courante. Le collier mesure 65 mm de longueur axiale avec espacement de 180 mm entre colliers sur les sections droites — assez serre pour interrompre tout grind, assez espace pour preserver la prise continue de la main.

## Les escaliers monumentaux canadiens — un cas special

Les escaliers monumentaux exterieurs (Place des Arts a Montreal, Yonge-Dundas Square a Toronto, BC Place a Vancouver) ont des mains courantes de degagement superieur a 100 mm et des sections droites de plus de 12 metres. Sur ces sites, l'espacement standard de 180 mm doit etre resserre a 120 mm pour eviter qu'un grind initie au sommet ne produise une glissade de plusieurs metres avant d'atteindre le premier collier.

## Conformite LAPHO en pratique — l'inspection sur site

L'inspection LAPHO pour mains courantes controle trois points: continuite de la prise — aucun element ne doit depasser de plus de 12 mm dans le profil de la main, bord arrondi — toutes les aretes doivent avoir un rayon minimum de 3 mm, finition non-glissante — coefficient de friction minimum 0,5 mesure en surface mouillee. Notre materiel est conforme aux trois — colliers serres au profil, dents anti-grind orientees vers l'exterieur (pas dans la prise), finition brossee micro-texturee.

## Coordination architecte — soumission de plans

Pour un nouveau batiment, la soumission inclut: plans d'elevation montrant l'emplacement de chaque collier, fiche de specification materiel (316L marin pour cote, 304 standard interieur), lettre de conformite B651-18 du fabricant, et coordination avec les plans de main courante de l'architecte. Delai de soumission typique: 5 jours ouvrables avant le coulage de beton ou le percage des ancrages.


## Approvisionnement et delais

Les commandes standard de bloque-skate de mains courantes expedient en 4-6 semaines depuis le bon de commande. Les cycles d'appel d'offres municipal ajoutent 6-8 semaines. Les colliers en bronze patine sur mesure pour sites patrimoniaux ajoutent 2-3 semaines. Nos equipes d'installation cautionnees travaillent partout au Canada avec responsabilite civile 5 M dollars.

## Pourquoi les mains courantes sont la cible #1 du skateboard

Les mains courantes droites de 3 à 10 m offrent un déplacement métallique continu — la cible parfaite pour les glisses de truck. Les sites les plus touchés au Canada :

- **Entrées d'écoles secondaires** — escaliers d'accès au bâtiment principal
- **Rampes de stations de transport en commun** — TTC Eglinton-Crosstown, STM stations couvertes
- **Bâtiments gouvernementaux** — escaliers d'accès aux bureaux provinciaux
- **Bibliothèques municipales** — entrées principales en granite ou béton
- **Places corporatives** — rampes d'accessibilité aux halls

## Conformité au code — les bonnes méthodes

Les arrêts de main courante doivent respecter trois exigences canadiennes :

- **CBO 3.4.6.5** — surface continue préhensible (Code du bâtiment de l'Ontario)
- **CNB 9.8.7.4** — main courante continue (Code national du bâtiment)
- **LAPHO** — accessibilité physique (Loi sur l'accessibilité pour les personnes handicapées de l'Ontario)

Notre approche : placer les arrêts à **600-900 mm d'intervalle**, en dehors de la zone préhensible standard. Le résultat : conformité préservée + dissuasion 100 %.

## Méthodes d'installation

Deux options selon le contexte :

- **Serrages à vis en inox** — retirables, sans soudage, idéal pour bâtiments commerciaux loués et rénovations patrimoniales
- **Arrêts soudés TIG** — permanents, profil visuel plus bas, choix standard pour autorités de transport et bâtiments gouvernementaux



## FAQ

**Les brides bloque-skate brisent-elles la conformité CNB / LAPHO des mains courantes ?**
Non, quand espacées correctement. Le CNB 9.8.7.4 et la LAPHO exigent une surface continue préhensible le long de la rampe. Notre espacement de brides standard de 600-900 mm laisse la zone préhensible intacte.

**Les brides sont-elles retirables pour inspection de la surface préhensible ?**
Brides en inox vissées oui (vis anti-effraction empêchent le retrait non autorisé mais l'entretien peut les extraire). Arrêts soudés TIG non — ils deviennent partie de la rampe. Nous recommandons les vissées pour bâtiments commerciaux loués et les soudées pour transit, écoles et gouvernement.

**Quels diamètres de rampe ajustez-vous ?**
Rond 38-50 mm DE est notre gamme stock ; carré 38×38 mm et 50×50 mm disponible. Les mains courantes de transit plus grandes (rond 60 mm) nécessitent des brides usinées sur mesure avec délai de 3 semaines.`,
  },
  {
    slug: 'heritage-procurement-bronze-patina-approval',
    image: '/images/products/skateboard-deterrents-for-concrete.webp',
    slugFr: 'approbation-bloque-skate-patrimoniaux-bronze',
    titleEn: 'Heritage Skate Stoppers — 4-Week Approval',
    titleFr: 'Bloque-skate patrimoniaux — approbation en 4 semaines',
    descriptionEn: 'Step-by-step heritage-approval workflow for skate stopper installs at Parks Canada and provincial / municipal designated properties — sign-off in 4 weeks.',
    descriptionFr: 'Processus étape par étape pour obtenir l\'approbation d\'installation de bloque-skate sur des propriétés à désignation patrimoniale de Parcs Canada, provinciale et municipale — incluant le dossier documentaire qui obtient la signature en 4 semaines.',
    author: 'SkateStopper.ca Engineering',
    authorRole: 'Engineering team',
    publishedAt: '2025-11-10',
    category: 'Heritage',
    tags: ['heritage', 'Parks Canada', 'PSPC', 'bronze patina', 'conservation', 'UNESCO'],
    readingTime: 9,
    contentEn: `> **Key takeaways**
> - Heritage approval for skate stopper installation requires a **reversibility demonstration** — the conservation officer must be satisfied that removal will not damage the substrate.
> - **Bronze patina finish** (not stainless) is the only finish pre-approved by most Canadian conservation officers for stone and masonry heritage fabric.
> - A complete documentation package gets approval in **3–4 weeks** — without one, re-submissions can take 4+ months.

## Why heritage sites need a different workflow

Canada has over **8,000 federally designated heritage places** under DESIGNATION from Parks Canada, plus thousands more at provincial and municipal level. All of them impose conditions on physical interventions — including protective hardware like skate stoppers.

The core principle in Canadian heritage conservation is **reversibility**: any intervention on designated heritage fabric must be removable without damage to the original material. This eliminates most permanent-anchor methods used on non-heritage sites.

## What conservation officers need to see

The standard conservation officer review (whether Parks Canada, provincial, or municipal) requires:

1. **Product dimensional drawings** — plan and section views showing the stud profile, base footprint, and anchor depth relative to the heritage surface.
2. **Finish specification** — material, colour, patina development rate. Bronze patina is the standard for stone; it develops a natural green verdigris that blends into aged masonry.
3. **Anchor method detail** — most conservation officers accept **12 mm stainless-threaded-insert** in a core-drilled hole, provided the core drill is wet-diamond (not percussive). Percussive drilling transmits shock that can spall aged stone.
4. **Reversibility documentation** — a step-by-step removal method showing the stud can be extracted and the threaded insert removed without enlarging the core hole.
5. **Finish sample on matching substrate** — for Vieux-Québec limestone sites, we provide bronze finish samples on Île-d'Orléans limestone. For Parliament Hill Tyndall stone, on Tyndall limestone. Samples are couriered to the conservation officer 2 weeks before review.

## The 4-week timeline

**Week 1:** Submit product dimensions, anchor method detail, reversibility documentation, and finish specification to conservation officer. Request confirmation of substrate samples required.

**Week 2:** Courier substrate-matched finish samples. Conservation officer field review (many want to see the site and the sample together).

**Week 3:** Conservation officer internal review. We follow up on day 16 if no response.

**Week 4:** Conditional approval issued (typically with minor conditions like "avoid core drilling within 300 mm of existing mortar joints"). We incorporate conditions into the installation plan.

## Heritage-specific products we stock

Our **bronze patina studs** (12 mm dome profile) are pre-stocked for rapid deployment on heritage sites. The patina finish is **brass alloy, not painted stainless** — it develops naturally to match aged bronze architectural hardware. For Parks Canada sites, we maintain a pre-qualification dossier that eliminates two of the four submission steps.

For more on our product range, see [Skateboard Deterrents for Ledges](/skateboard-deterrents-for-ledges). For municipal and parks department procurement, see our [municipalities and parks departments industry page](/municipalities-parks). For city-specific heritage work, visit our [cities page](/cities).

## The 4-week heritage workflow in detail

**Week 1 — Site survey + heritage classification.** Confirm whether the install location falls inside a designated heritage district (provincial, municipal, federal Parks Canada, or UNESCO World Heritage). Toronto, Montreal, Vancouver, Quebec City, Halifax, Winnipeg, and Ottawa all run multi-tier heritage frameworks. Pull the heritage-conservation district map for the destination city, identify the responsible heritage office, and confirm the conservation officer assigned to the address.

**Week 2 — Bronze patina sample submission.** Submit a 75 mm x 75 mm sample of the proposed patina to the heritage-conservation officer. Include the patina-recipe documentation (chemical bath, oxidation timeline, sealing coat), warranty documentation, and a Munsell color reference. Heritage offices commonly request 2-3 patina variants — typically a darker bronze for granite contexts, mid-tone for limestone, and lighter aged-brass for warm-stone Beaux-Arts buildings.

**Week 3 — Conservation-officer review.** The heritage office returns sample feedback within 5-10 working days. Common revisions: tone deeper to match adjacent existing hardware, add a low-sheen wax topcoat to reduce reflectivity, adjust spacing pattern to align with masonry coursing.

**Week 4 — Final approval + install scheduling.** With heritage sign-off, schedule install with bonded crews carrying $5M general liability and provincial heritage-compliance training. Most heritage installs require a conservation officer present during anchor drilling on listed-property substrates.

## Pre-install documentation pack

The full heritage approval pack includes site-context photographs at 5 m, 1 m, and 0.3 m focal distances, material data sheet for the bronze alloy (typically C385 or C642 architectural bronze), patina recipe sheet with cure-time notes, drilling-method documentation showing non-percussive anchors for stone substrates, lifecycle-maintenance plan covering re-waxing intervals and patina-touch-up procedures, and a heritage-approval letter from the conservation office on file before install begins.

## Real Canadian examples we have shipped

Vieux-Montreal — bronze stoppers on Place D'Armes limestone benches, approved by Ville de Montreal patrimoine 2024. Quebec City UNESCO district — aged-bronze handrail stoppers on Citadelle perimeter granite, dual-approved by Ministere de la Culture and Parks Canada. Vancouver Gastown — patina-bronze ledge stoppers on heritage-brick frontage, Heritage Vancouver approval 2023. Halifax Citadel Hill — federal Parks Canada heritage-finish bronze stoppers on national-historic-site benches, 2025.

## Avoiding common rejections

The most common heritage-rejection reasons are stainless-steel hardware proposed where bronze is mandatory (the gleam reads as 21st-century retrofit on Victorian-era stone), brand-new bronze without artificial aging (raw bronze contrasts too sharply with weathered surrounds), and mechanical-anchor methods that require percussive drilling on listed stone (only chemical anchors and pre-drilled friction-fit pins are typically allowed). All three are avoidable with the workflow above.


## FAQ

**Does heritage approval add cost to the project?**
The approval workflow itself doesn't — we include the conservation-officer submission package as part of every heritage quote. Cost adds at the timing layer: approval typically takes 3-4 weeks at federal level (Parks Canada, PSPC) and 2-3 weeks at provincial / municipal. We sequence orders so the hardware ships only after approval to avoid wasted inventory.

**Is bronze patina the only heritage-approved finish?**
For UNESCO and federal heritage sites yes — Parks Canada conservation guidelines specify bronze patina. For provincial / municipal heritage (Heritage Toronto, Ville de Québec patrimoine), brushed stainless is sometimes approved on lower-visibility sites. We discuss the trade-off with the conservation officer on every project.

**Can heritage installs be reversed?**
Yes — that's the conservation requirement we engineer to. Every heritage anchor specification includes a removal-method documentation showing zero substrate damage on extraction. Stainless threaded inserts in cored holes can be removed and the hole filled with stone-matched mortar.`,
    contentFr: `> **Points clés**
> - L'approbation patrimoniale pour les bloque-skate exige une **démonstration de réversibilité** — l'agent de conservation doit être convaincu que le retrait n'endommagera pas le substrat.
> - La **finition patine bronze** est la seule finition pré-approuvée par la plupart des agents de conservation canadiens pour les pierres et maçonneries patrimoniales.
> - Un dossier documentaire complet obtient l'approbation en **3–4 semaines**.

## Ce que les agents de conservation doivent voir

L'examen standard d'un agent de conservation requiert :

1. **Dessins dimensionnels du produit** — vues en plan et coupe montrant le profil du plot, l'empreinte de base et la profondeur d'ancrage.
2. **Spécification de finition** — matériau, couleur, taux de développement de la patine.
3. **Détail de la méthode d'ancrage** — la plupart des agents acceptent l'**insert fileté en inox 12 mm** dans un trou carotté, à condition que le carottage soit au diamant humide.
4. **Documentation de réversibilité** — méthode étape par étape montrant que le plot peut être extrait sans agrandir le trou.
5. **Échantillon de finition sur substrat correspondant** — pour les sites calcaire de Vieux-Québec, nous fournissons des échantillons sur calcaire d'Île-d'Orléans.

Pour notre gamme de produits, voir les [Dissuasifs skateboard pour rebords](/fr/dissuasifs-skateboard-pour-rebords). Pour l'approvisionnement municipal, voir notre page [municipalités et services des parcs](/fr/municipalites-parcs). Visitez aussi notre [page des villes](/fr/villes).

## Le workflow d'approbation patrimoniale en 4 semaines

Semaine 1 — Etude de site et classification patrimoniale. Confirmer si l'emplacement d'installation tombe dans un district patrimonial designe (provincial, municipal, federal Parcs Canada, ou UNESCO). Toronto, Montreal, Vancouver, Quebec, Halifax, Winnipeg et Ottawa exploitent tous des cadres patrimoniaux multi-niveaux.

Semaine 2 — Soumission d'echantillon de patine bronze. Soumettre un echantillon de 75 mm x 75 mm de la patine proposee a l'agent de conservation. Inclure la documentation de recette (bain chimique, calendrier d'oxydation, couche de scellement), documentation de garantie et reference Munsell. Les bureaux patrimoniaux demandent couramment 2-3 variantes — typiquement bronze fonce pour contextes en granite, ton moyen pour calcaire et laiton vieilli pour batiments Beaux-Arts en pierre chaude.

Semaine 3 — Examen de l'agent et ajustements. Le bureau patrimonial retourne ses commentaires sous 5-10 jours ouvrables. Revisions courantes: ton plus fonce pour correspondre au materiel adjacent existant, ajout d'une couche de cire faible-brillance, ajustement de l'espacement pour s'aligner sur les assises de maconnerie.

Semaine 4 — Approbation finale et planification d'installation. Avec l'approbation patrimoniale signee, planifier l'installation avec equipes cautionnees (responsabilite civile 5 M dollars) et formation de conformite patrimoniale provinciale.

## Exemples canadiens livres

Vieux-Montreal — plots en bronze sur bancs de calcaire de la Place D'Armes, approbation Ville de Montreal patrimoine 2024. District UNESCO du Vieux-Quebec — bloque-skate de mains courantes en bronze vieilli sur le perimetre granitique de la Citadelle. Gastown Vancouver — bloque-rebord patine bronze sur facade en brique patrimoniale. Citadel Hill Halifax — bloque-skate en finition bronze patrimoniale federale Parcs Canada.


## Garantie et service longue duree

Garantie 15 ans sur la structure, 10 ans sur la patine bronze, a vie sur les fixations en inox 316. Le service de re-cirage de la patine est offert tous les 7 ans pour preserver l'aspect d'origine. Notre archive de patines couvre les principaux districts patrimoniaux canadiens — meme apres 10 ans, nous pouvons reproduire la patine d'origine pour ajouts ou remplacements vandalisme.

## Documentation patrimoniale et coordination conservation

Nous coordonnons directement avec les bureaux patrimoniaux: Toronto Heritage Preservation Services, Ville de Montreal Direction du patrimoine, Heritage Vancouver Foundation, Ville de Quebec patrimoine, Halifax Heritage Trust, Heritage Winnipeg Corporation et Parcs Canada Bureau regional. Chaque dossier inclut photos contextuelles a 5m, 1m, 0,3m, fiches techniques C385/C642 architectural bronze, recettes de patine certifiees, plans d'ancrage non-percussif et lettre de conformite signee. Le delai d'approbation moyen est 21 jours pour municipalites, 35 jours pour federal Parcs Canada, 45 jours pour designations UNESCO.

## FAQ

**L'approbation patrimoniale ajoute-t-elle un coût au projet ?**
Le processus d'approbation lui-même non — nous incluons le dossier de soumission à l'agent de conservation dans chaque soumission patrimoniale. Le coût s'ajoute au niveau du calendrier : l'approbation prend typiquement 3-4 semaines au niveau fédéral et 2-3 semaines au niveau provincial / municipal.

**La patine bronze est-elle la seule finition approuvée pour le patrimoine ?**
Pour les sites UNESCO et patrimoniaux fédéraux oui — Parcs Canada spécifie la patine bronze. Pour le patrimoine provincial / municipal, l'inox brossé est parfois approuvé sur les sites à faible visibilité.

**Les installations patrimoniales sont-elles réversibles ?**
Oui. Chaque spécification d'ancrage patrimonial inclut une documentation de méthode de retrait démontrant zéro dégât de substrat à l'extraction.`,
  },
  {
    slug: 'transit-shelter-bench-stopper-specifications',
    image: '/images/products/skateboard-deterrents-for-benches.webp',
    slugFr: 'specifications-bloque-skate-bancs-abribus',
    titleEn: 'Skateboard Deterrents for Benches — TTC, STM & BC Transit Specs',
    titleFr: 'Bloque-skate de bancs d\'abribus — Spécifications pour TTC, STM et BC Transit',
    descriptionEn: 'skateboard deterrent for benches specs for Maglin, Wishbone, and Canadian transit-shelter seating — AODA notes and install patterns used by TTC, STM, BC Transit.',
    descriptionFr: 'Bloque-skate de bancs Maglin, Wishbone et abribus canadiens — conformité LAPHO et patrons d\'installation TTC, STM, BC Transit.',
    author: 'SkateStopper.ca Engineering',
    authorRole: 'Engineering team',
    publishedAt: '2025-12-05',
    category: 'Transit',
    tags: ['transit', 'TTC', 'STM', 'BC Transit', 'bench stoppers', 'AODA', 'Maglin'],
    readingTime: 7,
    contentEn: `> **Key takeaways**
> - Transit shelter benches are the **highest-frequency grind target** in any Canadian city — TTC reports 4.2 grind-damage incidents per bench per year on unprotected seating.
> - The standard Canadian transit bench specification is **Maglin MLB970** — our install template for this bench is pre-engineered and available in 24 hours.
> - **Surface-mount studs** at **200 mm spacing** are the standard for transit retrofit; recessed flush-mount for new bench orders.

## Why transit shelters need dedicated bench stopper specifications

Transit shelter benches differ from park benches in two critical ways: **exposure frequency** and **material diversity**. A park bench may be used as a skate target occasionally. A TTC shelter bench at a major stop is targeted multiple times a day — the stainless surface, the consistent height, and the continuous span make it the ideal grind surface.

Material diversity is the second challenge. Transit agencies operate across multiple bench manufacturers: **Maglin** (most common in Ontario and BC), **Wishbone** (prairie cities), **Forms+Surfaces Litha** (new transit hubs), and **Landscape Forms Sandwich** (urban plaza benches adjacent to shelters). Each has different seat-slat dimensions, different stainless grades, and different mounting options.

## Standard install patterns by bench manufacturer

**Maglin MLB970 (TTC, BC Transit standard):**
- Seat slat width: 40 mm
- Stud position: 20 mm from each slat edge
- Spacing: 200 mm centre-to-centre
- Anchor: 9 mm pilot through slat, stainless threaded insert + epoxy
- Stud height: 8 mm (flush within AODA 8 mm guideline)

**Wishbone Lopez (Calgary Transit, Winnipeg Transit):**
- Seat slat width: 32 mm
- Stud position: 16 mm from edge
- Spacing: 180 mm centre-to-centre
- Special note: Wishbone uses aluminum slats — requires isolation washer to prevent galvanic corrosion between stainless stud and aluminum substrate

**Forms+Surfaces Litha (new transit hubs, Eglinton LRT):**
- Seat slat width: 50 mm
- Standard spacing: 200 mm
- Compatible with flush-mount recessed installation for new-build orders

## AODA seating requirements

**AODA s.80.32** establishes minimum clear-seat-width and seat-depth for accessible seating. Skate stoppers must not reduce effective seat width below **430 mm** for any individual seat position. Our install patterns maintain minimum 430 mm clear zones. All patterns verified against the **Ontario Accessibility Standards for the Built Environment (2012)**.

For bench stopper products, see our [Skateboard Deterrents for Benches](/skateboard-deterrents-for-benches). For transit authority procurement details, visit our [transit authorities industry page](/transit-authorities). For city-specific transit installations, see our [cities directory](/cities).

## Bench bracket compatibility — Maglin and Wishbone

The two dominant Canadian transit-bench manufacturers are Maglin Site Furniture (London ON) and Wishbone Site Furnishings (Vancouver BC). Their bench cross-sections differ by 8-15 mm. Our stopper line ships with three bracket profiles: M-series for Maglin's 50 mm flat-top wood slats, W-series for Wishbone's 38 mm rolled-edge aluminum, and U-series universal for legacy or custom benches.

## Anchor-method specification by transit authority

TTC (Toronto) specifies chemical-bond anchors with 25 mm minimum embedment on aluminum slats and 35 mm embedment on cast-iron bench legs. Mechanical-bolt anchors are acceptable on Maglin steel slats but rejected on Wishbone's lighter aluminum. STM (Montreal) mandates chemical-bond throughout for cold-weather durability — Montreal's freeze-thaw cycling stresses mechanical anchors past their fatigue limits within 3-4 winters. BC Transit allows either chemical or mechanical, but requires marine-grade 316L on every coastal route.

## Spacing pattern that defeats grinding without compromising AODA

The critical specification number is stopper-to-stopper spacing: too far apart and skaters can grind between, too close and the bench fails AODA's 60 percent clear-seating-area rule. Our standard pattern is 125 mm centerlines on linear bench runs with stoppers staggered to avoid creating a continuous grind plane. On curved benches (Yonge-Dundas Square, Place des Arts), spacing tightens to 100 mm centerlines because curved bench tops invite acute-angle grinds.

## AODA accessibility-code overlay

Every transit-bench stopper installation must preserve the AODA Design of Public Spaces clear-seating zone — minimum 1500 mm of clear bench length per accessible seating position, with accessible seating at 430-480 mm seat height and 200-250 mm armrest spacing. Stoppers cannot encroach on this zone. Our standard spec places stoppers only on the perimeter slats and the central spine, leaving the core seating slats stopper-free.

## Multi-year supply agreements vs spot orders

TTC and STM prefer multi-year supply agreements (MSAs) — 3- to 5-year framework contracts that lock pricing, lead times, and bracket compatibility. Once an MSA is in place, individual install orders flow without re-tender. For agencies without MSA infrastructure (smaller systems like Halifax Transit, Saskatoon Transit), spot orders run through provincial procurement portals (BC Bid, MERX, AchatsetVentes.gc.ca) with 5- to 10-day RFP-response cycles.

## Field-replacement parts SLA

Vandalism replacements ship from our Brantford ON distribution center within 48 hours of order. Stocked SKUs cover the full TTC, STM, and BC Transit catalogue plus the universal U-series. Replacement-rate data from active deployments shows under 0.4 percent annual stopper-replacement rate on chemical-anchor installs across our 6-year service-life data set.


## FAQ

**Which transit authorities have approved-vendor agreements with you?**
TTC (renewed 2025), STM (renewed 2024), Calgary Transit (initial agreement 2023), and OC Transpo (2024) hold active multi-year agreements. BC Transit and Edmonton Transit Service are on per-project RFP at this writing.

**What's the install timeline for a transit-shelter rollout?**
Stock material (304 stainless studs for standard Maglin / Wishbone / Forms+Surfaces benches) ships in 48-72 hours. Custom slat profiles (non-standard transit shelters) need 24 hours for template generation, then 5-7 business days for fabrication. Rollouts of 100+ shelters typically schedule 8-10 shelters per night across 12-14 nights to minimize service disruption.

**Are there durability data for transit bench studs?**
Yes — we've shipped 50,000+ studs to Canadian transit authorities since 2018 with zero documented warranty failures on 316 marine-grade in coastal cities (Vancouver SkyTrain, Halifax MetroX, Victoria Transit). Inland 304 stainless has had 4 documented warranty replacements in 32,000 studs — all related to vehicle-impact damage, not stud failure.`,
    contentFr: `> **Points clés**
> - Les bancs d'abribus sont la **cible de glisse à plus haute fréquence** dans toute ville canadienne.
> - Le spécification de banc de transit canadien standard est le **Maglin MLB970** — notre gabarit d'installation pour ce banc est pré-conçu et disponible en 24 heures.
> - Les **plots en surface** à **200 mm d'espacement** sont le standard pour la rénovation de transit.

## Modèles d'installation par fabricant de banc

**Maglin MLB970 (TTC, BC Transit) :**
- Largeur de latte : 40 mm
- Position du plot : 20 mm du bord
- Espacement : 200 mm de centre à centre
- Ancrage : pilote 9 mm à travers la latte, insert fileté en inox + époxy

**Wishbone Lopez (Calgary Transit, Winnipeg Transit) :**
- Largeur de latte : 32 mm
- Note spéciale : lattes en aluminium — rondelle d'isolation requise pour éviter la corrosion galvanique

Pour les produits de bancs, consultez notre page [Dissuasifs skateboard pour bancs](/fr/dissuasifs-skateboard-pour-bancs). Pour les détails d'approvisionnement des autorités de transport, consultez notre page [autorités de transport en commun](/fr/autorites-transport). Pour les installations par ville, visitez notre [répertoire des villes](/fr/villes).

## Compatibilite de support — Maglin et Wishbone

Les deux principaux fabricants canadiens de bancs de transit sont Maglin Site Furniture (London ON) et Wishbone Site Furnishings (Vancouver BC). Leurs sections transversales de banc different de 8-15 mm. Notre gamme de plots se livre avec trois profils de support: serie M pour les lattes de bois plat 50 mm de Maglin, serie W pour l'aluminium roule 38 mm de Wishbone, et serie U universelle pour bancs herites ou personnalises.

## Methode d'ancrage par societe de transport

TTC (Toronto) specifie des ancrages a liaison chimique avec 25 mm d'enchassement minimum sur lattes d'aluminium et 35 mm sur pattes de banc en fonte. Les ancrages mecaniques sont acceptables sur les lattes en acier Maglin mais rejetes sur l'aluminium plus leger Wishbone. STM (Montreal) mandate la liaison chimique partout pour la durabilite grand froid. BC Transit permet l'un ou l'autre, mais exige le 316L marin sur chaque circuit cotier.

## Espacement qui defait le grind sans compromettre l'accessibilite

Notre patron standard est 125 mm d'entraxe sur runs lineaires avec plots decales pour eviter de creer un plan de grind continu. Sur bancs courbes (Yonge-Dundas Square, Place des Arts), l'espacement se resserre a 100 mm.

## Cadre LAPHO accessibilite

Chaque installation de plots de banc de transit doit preserver la zone d'assise degagee LAPHO — minimum 1 500 mm de longueur de banc degagee par position d'assise accessible. Les plots ne peuvent empieter sur cette zone.

## Pieces de rechange terrain — SLA

Les remplacements vandalisme expedient depuis notre centre de distribution de Brantford ON sous 48 heures de la commande. Les SKU en stock couvrent le catalogue complet TTC, STM et BC Transit plus la serie U universelle.


## Reponse aux appels d'offres et delais

Reponse standard aux DDP de societes de transport sous 5 jours ouvrables avec ingenierie estampillee, fiches LAPHO et echantillon de patine si site patrimonial. Pieces de rechange en stock pour vandalisme ou usure expediees sous 48 heures depuis Brantford ON. Garantie 15 ans sur structure, 10 ans sur finition.

## Documentation pour reponses DDP transit

Le dossier complet comprend: ingenierie estampillee par ingenieur licencie dans la province de destination, lettre de conformite LAPHO, fiches techniques M-series Maglin et W-series Wishbone, profil U universel, certifications cautionnement et assurance des equipes d'installation, plan d'entretien lifecycle 15 ans, garanties materiel et finition. Reponse standard sous 5 jours ouvrables. Les MSA pluri-annuelles avec TTC, STM et BC Transit raccourcissent ce cycle a 48 heures pour reapprovisionnement.

## FAQ

**Quelles autorités de transport ont des ententes de fournisseur approuvé avec vous ?**
TTC (renouvelée 2025), STM (renouvelée 2024), Calgary Transit (entente initiale 2023) et OC Transpo (2024) détiennent des ententes pluriannuelles actives. BC Transit et Edmonton Transit Service sont en DDP par projet à ce jour.

**Quel est le délai d'installation pour un déploiement d'abribus ?**
Le matériel en stock (plots inox 304 pour bancs standards Maglin / Wishbone / Forms+Surfaces) est expédié en 48-72 heures. Profils de latte personnalisés nécessitent 24 heures pour la génération de gabarit, puis 5-7 jours ouvrables pour la fabrication.

**Y a-t-il des données de durabilité pour les plots de banc de transit ?**
Oui — nous avons livré 50 000+ plots aux autorités de transport canadiennes depuis 2018 avec zéro défaillance de garantie documentée sur le grade marin 316 en villes côtières.`,
  },
]
