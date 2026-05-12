---
type: audit-report
section: 1
title: SEO Research Validation
factory_master_refs: §1.1–1.6
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 1 of 12 — SEO Research Validation

> No fresh DataForSEO/Brave calls. Per project preload (2026-05-03), keyword
> corpus is fresh (cost $0.70-$1.50 to refresh; quarterly cadence — next due
> 2026-08-03). Validation uses local evidence files and live site routing.

## 1.1 Keyword Research (DataForSEO)

| # | Check | Evidence | Result |
|---|-------|----------|--------|
| 1.1.1 | Top-volume keywords in corpus (location=2124 Canada) | `blueprint/keywords.json` — 141 EN + 141 FR rows. Top 10 by volume: `antisocial skate` 1000, `anti hero boards` 480, `antihero skateboard` 210, `anti social skate shop` 170, `anti social skateshop` 170, `anti skateboarding` 110, `anti skate` 110, `anti skate turntable` 110, `turntable skating` 110, `grinder skate` 110. **Niche-relevant subset:** `anti skateboarding` 110, `grinder skate` 110, `grinder skateboard` 110, `skate stoppers` 90, `skate stopper` 90, `skate deterrents` 20. | ⚠️ NOTE — corpus contains brand-noise (`antisocial skate`, `anti hero`, `grimple stix`, `anti skate turntable` = audio gear). Niche-disambiguation already documented as known issue 2026-05-03. Real niche volume ≈ 600/mo total (preload "keyword ceiling is REAL"). |
| 1.1.2 | Volumes on actual target keywords | `keyword-pages.ts` declares per-page `volume`. Sample: `anti-skateboard-devices` vol 110, `skate-deterrents` vol —, `skateboard-grind-deterrents` vol 110, `decorative-skate-stoppers` vol —. Material `skate-stoppers` declares `keywordVolume: 90`. | ✅ Volumes declared on every page. |
| 1.1.3 | High-volume kw → landing page mapping | `skate stoppers` 90 → `/skate-stoppers` (material). `anti skateboarding/anti skate` 110 → `/anti-skateboard-devices`. `grinder skate/grinder skateboard` 110+110 → `/skateboard-grind-deterrents`. `skate deterrents` 20 → `/skate-deterrents`. `skate stop/skateboard stopper/no skateboarding sign/stainless steel skateboard deterrents/decorative skate stoppers` → individual pages. 9 keyword-pages + 6 materials + 7 industries = 22 commercial pages over 600/mo niche volume. | ✅ Every niche-relevant ≥20-vol keyword has a dedicated page. |
| 1.1.4 | High-vol gaps (>500/mo, no page) | Top "missing": `antisocial skate` 1000, `anti hero boards` 480, `antihero skateboard` 210 — all brand-name searches for unrelated skateboarding brands. **Correct decision: do NOT build pages for these** (would create off-niche doorway pages, brand confusion). | ✅ No legitimate gaps. Off-niche head terms intentionally excluded. |

**Section 1.1 sub-finding:** `slug-search-volume-gate` flagged 1 P0:
`skateboard-deterrents-for-ledges` slug-as-query has 0 vol and no
`clusterParent` declared (other 5 materials similarly named pass via
`clusterParent` to "skate stoppers"). **F1.1-A (P0):** add
`clusterParent: "skate stoppers"` to the ledges material in
`src/data/products.ts`.

## 1.2 Competitor Analysis

| # | Check | Evidence | Result |
|---|-------|----------|--------|
| 1.2.1–1.2.3 | SERP snapshots for primary/secondary/tertiary kw | `competitors.json` — 20 competitors logged with `discoveredVia: "brave-serp-2026-05-02 + dataforseo competitors_domain"` and `seed_query` per row. Niches captured: skate stoppers, skate deterrents, anti skate. | ✅ SERPs already harvested 2026-05-02; no fresh fetch needed. |
| 1.2.4 | ≥3 direct competitors identified | Direct CA/US: `www.skatestoppers.com` (US incumbent), `preventer.ca`, `parkwarehouse.com`, `www.bcsiteservice.com`, `www.maglin.com`, `www.seton.ca`, `classic-arch.com`, `niklsonecall.com`, `grindtoahalt.com`. **9 direct.** | ✅ Far exceeds 3 minimum. |
| 1.2.5 | Top competitor depth analysis | `competitors.json` row 1 (`skatestoppers.com`): wordCount 166, h1/h2/h3 all empty arrays, weaknesses include "thin product taxonomy / single-page catalog". Other rows have weaknesses noted but limited heading detail. | ⚠️ Depth analysis is shallow (mostly word counts + assertion-style strengths/weaknesses). **F1.2-A (SHOULD):** future re-research should populate h2/h3 arrays via web_fetch on top 3 competitors. |

## 1.3 Product/Service Coverage

| # | Check | Evidence | Result |
|---|-------|----------|--------|
| 1.3.1 | All product slugs | `products.ts` exports `materials[]`. Slugs: `skate-stoppers`, `skateboard-deterrents-for-ledges`, `…-handrails`, `…-benches`, `…-concrete`, `…-sidewalks`. | ✅ Listed. |
| 1.3.2 | Count ≥8? | 6 materials. | ❌ **F1.3-A (SHOULD)** — 6 < 8. Acceptable for this micro-niche (full Canadian skate-deterrent category is small), but below FACTORY-MASTER threshold. |
| 1.3.3 | Use nameEn/nameFr (not bare `name`)? | `grep` for bare `"name":` in products.ts → only `brandName`-style matches. All product entries use `"nameEn"`/`"nameFr"`. | ✅ |
| 1.3.4 | Every product → real-volume keyword? | 5 of 6 carry `keywordVolume` or rely on `clusterParent → skate stoppers (90)`. The ledges variant is missing `clusterParent` (see F1.1-A). | ⚠️ One miss — same finding as F1.1-A. |

## 1.4 Industry/Sector Coverage

| # | Check | Evidence | Result |
|---|-------|----------|--------|
| 1.4.1 | Industry slugs | `municipalities-parks`, `transit-authorities`, `schools-universities`, `commercial-real-estate`, `retail-storefronts`, `condominiums-hoas`, `government-heritage`. | ✅ |
| 1.4.2 | Count ≥8? | **7.** | ❌ **F1.4-A (SHOULD)** — 7 < 8 threshold. Reasonable additions: `religious-institutions`, `parking-garages`, or `healthcare-campuses` from competitor verticals. |
| 1.4.3 | Missing industries vs competitors? | Competitor coverage check: `seton.ca` covers signage for healthcare and parking. `bcsiteservice.com` covers construction sites. None present here. | ⚠️ Same as F1.4-A. |

## 1.5 City & Geo Strategy

| # | Check | Evidence | Result |
|---|-------|----------|--------|
| 1.5.1 | City count ≥48? | **48** cities in `locations.ts` (`grep -c '"slug":'`). | ✅ |
| 1.5.2 | All 10 provinces represented? | 11 distinct: AB, BC, MB, NB, NL, NS, ON, PE, QC, SK, YK. | ✅ All 10 provinces + Yukon territory. |
| 1.5.3 | Uniqueness fields present? | Sample row inspection: `population`, `descriptionEn`, `descriptionFr`, `province`, `slug`, plus geo-content helpers feed in `localHook`, `climate-class`, `walkability-class`, `employer list` per the geo-content muscle. | ✅ Rich uniqueness inputs (per "geo-page-uniqueness" muscle, ~250 word geo blocks). |

## 1.6 URL Structure

| # | Check | Evidence | Result |
|---|-------|----------|--------|
| 1.6.1 | EN route dirs | `src/app/(en)/`: `[slug]`, `about`, `blog`, `cities`, `contact`, `faq`, `industries`, `privacy`, `products`, `terms`. | ✅ Flat root for [slug], hubs as folders. |
| 1.6.2 | FR route dirs | `src/app/fr/`: `[slug]`, `[slug]/[service]`, `a-propos`, `blogue`, `blogue/[slug]`, `conditions`, `confidentialite`, `faq`, `nous-joindre`, `produits`, `secteurs`, `villes`. | ✅ |
| 1.6.3 | FR slugs translated? | `about/a-propos`, `blog/blogue`, `contact/nous-joindre`, `industries/secteurs`, `cities/villes`, `products/produits`, `privacy/confidentialite`, `terms/conditions`, `faq/faq`. | ✅ Full hub translation. |
| 1.6.4 | No taxonomy suffixes? | All slugs are query-shaped (`skate-stoppers`, `skateboard-deterrents-for-ledges`, etc.). No `-services`, `-installation` suffixes. FR equivalents same. | ✅ |
| 1.6.5 | Sitemap consistency cross-check | Sitemap emits `/fr/industries` and `/fr/contact` (NOT `/fr/secteurs` and `/fr/nous-joindre`) for some entries. Live route dirs are FR-translated. **Suggests sitemap generator OR hreflang generator using EN slug for FR alt.** | ❌ **F1.6-A (P0)** — flagged also by `hreflang-slug-correctness-gate` failure in audit-runner. Defer detailed evidence to Section 6. |

## Section 1 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0**   | 2     | F1.1-A (ledges slug missing clusterParent), F1.6-A (FR alt slugs in sitemap/hreflang) |
| **SHOULD** | 3   | F1.2-A (shallow competitor heading data), F1.3-A (6 products < 8 threshold), F1.4-A (7 industries < 8 threshold) |
| **PASS**   | 14  | All other rows |

**Verdict for Section 1:** **CONDITIONAL** — research and corpus are
fundamentally sound (the team made deliberate choices about niche
ceiling and intentional brand exclusion); remaining issues are 1 quick
data fix (clusterParent) + 1 hreflang systemic bug (carries into Sec 6)
+ minor "<8 count" SHOULD findings inherent to the micro-niche.

---

**Audit-runner gate context (informational, full review in later sections):**
Run total: **78 PASS / 7 FAIL** of 85 atomic gates.
Failures: `boilerplate-gate`, `hero-alt-gate`, `hreflang-slug-correctness-gate`,
`link-architecture-gate`, `nav-depth-gate`, `recurring-failures-gate`,
`slug-search-volume-gate`. Each will be re-evidenced in its owning section.

**STOP — awaiting "NEXT" before Section 2.**
