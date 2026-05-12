---
type: audit-report
section: 8
title: Content Quality — Cities, Geo, Blog, FAQ, Translations
factory_master_refs: §2.4-2.10, §2.12-2.13, §2.4b
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 8 of 12 — Cities, Geo Pages, Blog, FAQ, Translations

## 8.1 City Descriptions

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 8.1.1 | Word counts EN ≥150 / FR ≥120 | 48 cities. EN min=170 max=326 avg=237. FR min=204 max=342 avg=254. **0 fails.** | ✅ |
| 8.1.2 | Niche keyword present in every description | Strict literal-token grep (`skate stopp`, `deterren`, `bloque-skate`, `dissuasif`, `grind`, `vandal`) → 10 cities miss (edmonton, winnipeg, vancouver, halifax, windsor, saskatoon, regina, st-catharines, +2). On manual inspection these cities discuss skate-deterrent context using engineering vocabulary (`316 stainless mandate`, `2.4 m frost depth`, `salt-air corrosion`, `freeze-thaw cycle`) — niche-aligned but without the literal tokens. | ⚠️ **F8.1-A (NIT)** |
| 8.1.3 | ≥1 ## heading each (§2.4c) | All 48 cities have exactly 1 H2 (one section per city description). | ✅ |
| 8.1.4 | ≥2 bold each (§2.4c) | Bold density very high — sample: Toronto 29, Montréal 30, Calgary 32, Ottawa 29, Edmonton 28. **0 fails.** | ✅ |
| 8.1.5 | Descriptions unique (not template swap) | After stripping city/slug names, **0 duplicate descriptions** detected via hash-comparison. | ✅ |
| 8.1.6 | localHook uniqueness | All 48 cities have `localHookEn`. After city-name stripping, **0 duplicate hooks**. | ✅ |

## 8.2 Geo Page Uniqueness (§2.4b — doorway prevention) 🚨

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 8.2.1 | Geo page component uses ≥3 city-specific data fields | `(en)/[slug]/[service]/page.tsx` references `cityData.name`, `material.nameEn`/`industry.nameEn`, and `getCityMaterialFAQs(cityData.name, ...)` / `getCityIndustryFAQs(...)`. Looks correct at the page-component layer. | ✅ |
| 8.2.2 | Geo pages have city-specific content paragraph | **`/toronto/skate-stoppers` and `/montreal/skate-stoppers` are byte-identical after city-name normalization** (90647 vs 90636 bytes — 11-byte diff is just "Montréal"=8 vs "Toronto"=7 char count). `diff` of normalized rendered paragraphs returns **EMPTY**. | ❌ **F8.2-A (P0 BLOCKER)** |
| 8.2.3 | City data has uniqueness fields | `locations.ts` `Location` interface declares: `population`, `lat`, `lng`, `transitAuthority`, `transitShelterCount`, `climateZone`, `avgWinterTempC`, `annualSnowfallCm`, `frostDepthM`, `corrosionRisk`, `popularSkateZones`, `propertyMaintenanceContext`, `descriptionEn/Fr`, `localHookEn/Fr`. **Rich uniqueness data exists.** | ✅ data-side / ❌ render-side |

### F8.2-A — Geo cross-pages are technical doorway pages (P0 BLOCKER)

**Root cause:** field-name mismatch between `src/data/geo-seo.ts` and
`src/data/locations.ts`. The geo-FAQ generator reads city properties
that don't exist in the data file:

| geo-seo.ts reads | locations.ts has |
|---|---|
| `city.frostLine` | `frostDepthM` ❌ |
| `city.annualSnowfall` | `annualSnowfallCm` ❌ |
| `city.avgWinterTemp` | `avgWinterTempC` ❌ |
| `city.labourRateRange` | (does not exist) ❌ |
| `city.popularMaterials` | (does not exist) ❌ |
| `city.buildingSeason` | (does not exist) ❌ |
| `city.climateZone` | `climateZone` ✅ (only one matching) |

Result: every city's geo cross-page falls through to the **same
hardcoded defaults** (`'inland'`, `1500`, `'$45-65/hr'`, `200`, `-10`,
`['304 stainless']`, `'May to October'`). The 140 `/[city]/[service]`
URLs in sitemap render identical content with only the city-name
token swapped.

Live evidence (FR FAQ on /toronto/skate-stoppers):
> *"Montréal sits in the Zone 6 climate zone with ~200 mm annual
> snowfall and an average winter temperature of -10 °C…"*

But Toronto's actual data is `Zone 6 / 108 cm / -3.7 °C / 1.2 m frost`
(see `locations.ts` line ~70). Toronto is rendered with Montreal-like
fallbacks (which themselves are also wrong for Montreal — the
`-10 °C / 200mm / 1500mm frost` is the **default**, not Montreal's data).

**Doorway-detection-gate gave a false PASS** (its parser scanned 0
city descriptions per its log: "scanned 0 city descriptions / ✅ all
city description openings are unique"). Same parser-bug class as
boilerplate-gate. False-positive screening was correct that gates lie
— this time the gate lied with a **green** result.

**Fix (small):** rename three field references in `geo-seo.ts` to match
data-file names; add `labourRateRange`/`popularMaterials`/`buildingSeason`
to `locations.ts` (or derive defaults per climate zone). Re-build →
geo cross-pages will surface the city-specific specs that already
exist in data.

## 8.3 Blog Posts (§2.7)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 8.3.1 | Blog data file exists | `src/data/blog.ts` 54 KB | ✅ |
| 8.3.2 | Post count ≥3 | **4 posts**: `specifying-skate-stoppers-canadian-winter`, `handrail-stoppers-cnb-aoda-compliance`, `heritage-procurement-bronze-patina-approval`, `transit-shelter-bench-stopper-specifications`. | ✅ |
| 8.3.3 | Word count ≥800 per post | EN body counts: 1160, 964, 1056, 960. **All ≥800.** | ✅ |
| 8.3.4 | Author, category, tags present | `author: 'SkateStopper.ca Engineering'` ×4, `category` ×4, `tags: [...]` ×4. All 4 posts complete. | ✅ |

**Carryover from Section 7 reconciliation:** `boilerplate-gate.log`
flagged **6 duplicated paragraphs** in `blog.ts` — 3 EN FAQ-style
closing paragraphs ("How long do skate stoppers last in Canadian
winters?…", "What is the typical install spacing?…", "Are install
crews bonded for municipal work?…") + 3 FR equivalents, each duplicated
across all 4 blog posts. **F8.3-A (P0)** — same boilerplate-prevention
violation as F7.7-A but with corroborating gate evidence (gate caught
this set; missed the products/industries set).

## 8.4 FAQ Data (§2.5)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 8.4.1 | FAQ data exists | `src/data/faqs.ts` | ✅ |
| 8.4.2 | FAQ count ≥15 | **17** questionEn entries. Includes the disambiguation FAQ (per preload, last entry). | ✅ |
| 8.4.3 | EN answers ≥100 words | 17/17 pass. min=104 max=191 avg=126. FR answers: min=88 max=212 avg=120; 0 below 80-word loose threshold. | ✅ |

## 8.5 Translations (§2.10)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 8.5.1 | Translations file with EN + FR | `translations.ts` exports `Record<string, Record<string, any>>` with `en: {...}, fr: {...}` blocks (verified `head -30`). | ✅ |
| 8.5.2 | Key count ≥80 | **159 EN keys, 159 FR keys** (perfect parity, ~2× threshold). | ✅ |
| 8.5.3 | FR differs from EN | Sample: `cityPage.methodsTitle` EN="Skate stopper solutions" / FR="Solutions de bloque-skate"; `productPage.features` EN="Features" / FR="Caractéristiques"; `benefits.climate.title` EN="Climate-rated for Canadian winters" / FR="Conçu pour les hivers canadiens". All meaningfully translated. | ✅ |

## 8.6 FR Content Formatting Parity (§2.12)

Per-entry H2 count parity and bold-span count parity (allowing ±1 H2 / ±3 bold).

| File | Entry | EN-H2 | FR-H2 | EN-bold | FR-bold | Parity |
|---|---|---:|---:|---:|---:|:--|
| products | skate-stoppers | 5 | 4 | 25 | 22 | OK |
| products | …-ledges | 5 | 5 | 14 | 11 | OK |
| products | …-handrails | 5 | 5 | 14 | 12 | OK |
| products | …-benches | 5 | 5 | 23 | 18 | DIFF (-5) |
| products | …-concrete | 5 | 5 | 24 | 16 | DIFF (-8) |
| products | …-sidewalks | 5 | 5 | 25 | 23 | OK |
| industries | municipalities-parks | 5 | 5 | 26 | 22 | DIFF (-4) |
| industries | transit-authorities | 5 | 5 | 24 | 20 | DIFF (-4) |
| industries | schools-universities | 4 | 4 | 24 | 19 | DIFF (-5) |
| industries | commercial-real-estate | 5 | 5 | 23 | 17 | DIFF (-6) |
| industries | retail-storefronts | 4 | 4 | 25 | 22 | OK |
| industries | condominiums-hoas | 5 | 5 | 23 | 18 | DIFF (-5) |
| industries | government-heritage | 5 | 5 | 26 | 19 | DIFF (-7) |

**8.6.1/8.6.2/8.6.3** — H2 counts match perfectly (every entry within
±1). **Bold counts: FR consistently 4-8 below EN** in 8 of 13 entries.
The translator preserved heading structure but stripped some `**bold**`
emphasis when localizing. Pattern is systematic; not a per-entry typo.
**F8.6-A (NIT)**.

---

## Section 8 Findings

### F8.2-A — Geo cross-pages are technical doorway pages (P0 BLOCKER, NEW)

140 `/[city]/[service]` URLs in sitemap render byte-identical content
(only city-name token differs). Caused by **field-name mismatch in
`src/data/geo-seo.ts`** — geo-FAQ generator reads `frostLine`,
`annualSnowfall`, `avgWinterTemp`, `labourRateRange`,
`popularMaterials`, `buildingSeason` — none of which exist in
`locations.ts` (data file uses `frostDepthM`, `annualSnowfallCm`,
`avgWinterTempC`, etc.). All 48 cities × ~3 geo cross-pages each fall
through to identical hardcoded defaults. `doorway-detection-gate`
gave a false PASS (parser scanned 0 city descriptions). Fix is small:
rename 3 fields and add 3 missing ones.

### F8.3-A — Blog post boilerplate (P0)

3 EN + 3 FR FAQ-style closing paragraphs reused verbatim across all 4
blog posts. Caught by `boilerplate-gate`. Same §3.5e violation as
F7.7-A.

### F8.6-A — FR descriptions consistently lower bold density (NIT)

8 of 13 product/industry entries have FR bold count 4-8 below EN. H2
parity is perfect. Translator stripped some `**bold**` emphasis when
localizing — systematic pattern, not random typos.

### F8.1-A — 10 cities lack literal niche tokens (NIT, borderline)

Edmonton, Winnipeg, Vancouver, Halifax, Windsor, Saskatoon, Regina,
St-Catharines (+2 more) describe deployment context with engineering
vocabulary (frost depth, salt-air, stainless grade) but don't include
literal "skate stopper" / "deterrent" tokens. Niche-aligned but
keyword-sparse. Borderline finding — adding 1 niche-token sentence
per affected city description would close the gap (small fix).

## Section 8 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 2 | F8.2-A (geo cross-page doorway pattern, 140 URLs), F8.3-A (blog boilerplate ×6 paragraphs across 4 posts) |
| **NIT** | 2 | F8.6-A (FR bold density), F8.1-A (10 city descs without literal niche token) |
| **PASS rows** | 17 | All city word counts (48/48), uniqueness, headings, blog post counts/words/metadata, FAQ counts/words, translation parity |

**Verdict for Section 8:** **FAIL on geo cross-pages / PASS on cities,
FAQ, blog quality, translations.**

The single most consequential finding of the audit so far: **F8.2-A**.
A 3-line code fix in `geo-seo.ts` (field renames) eliminates 140
doorway pages. City detail pages, blog posts, FAQs, and the
translation layer are all production-quality.

---

**STOP — awaiting `NEXT` for Section 9 (Images).**
