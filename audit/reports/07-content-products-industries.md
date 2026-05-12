---
type: audit-report
section: 7
title: Content Quality — Products & Industries
factory_master_refs: §2.2-2.3, §2.11-2.15, §3.5e
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 7 of 12 — Content Quality: Products & Industries

> Code-level analysis of `src/data/products.ts` (6 materials) and `src/data/industries.ts` (7 industries) using a custom Python pass.

## 7.1 Product Word Counts

| Slug | EN words | FR words | EN ≥400 | FR ≥350 |
|---|---:|---:|:-:|:-:|
| skate-stoppers | 505 | 406 | ✅ | ✅ |
| skateboard-deterrents-for-ledges | 478 | 461 | ✅ | ✅ |
| skateboard-deterrents-for-handrails | 516 | 493 | ✅ | ✅ |
| skateboard-deterrents-for-benches | 526 | 476 | ✅ | ✅ |
| skateboard-deterrents-for-concrete | 532 | 503 | ✅ | ✅ |
| skateboard-deterrents-for-sidewalks | 504 | 510 | ✅ | ✅ |

7.1.1 ✅ all products ≥400 EN words. 7.1.2 ✅ all products ≥350 FR words.

## 7.2 Industry Word Counts

| Slug | EN words | FR words | EN ≥350 | FR ≥300 |
|---|---:|---:|:-:|:-:|
| municipalities-parks | 409 | 422 | ✅ | ✅ |
| transit-authorities | 429 | 424 | ✅ | ✅ |
| schools-universities | 381 | 412 | ✅ | ✅ |
| commercial-real-estate | 459 | 436 | ✅ | ✅ |
| retail-storefronts | 404 | 363 | ✅ | ✅ |
| condominiums-hoas | 441 | 426 | ✅ | ✅ |
| government-heritage | 436 | 403 | ✅ | ✅ |

7.2.1 ✅ all industries ≥350 EN words. 7.2.2 ✅ all industries ≥300 FR words.

## 7.3 Banned Phrases

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 7.3.1 | Banned phrases in products.ts | grep `premier provider\|state-of-the-art\|your trusted partner\|second to none\|best-in-class\|one-stop shop\|cutting-edge\|world-class\|industry-leading\|we are dedicated\|we are committed` → **0 hits** | ✅ |
| 7.3.2 | Banned phrases in industries.ts | **0 hits** | ✅ |
| 7.3.3 | Banned phrases across all `src/data/*.ts` | **0 hits** sitewide | ✅ |

## 7.4 Canadian French Quality

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 7.4.1 | Canadian markers (`soumission`/`courriel`/`magasiner`) present | products.ts: 1 line, industries.ts: 2 lines, translations.ts: 1 (`Courriel professionnel`). Total **4** instances. | ✅ |
| 7.4.2 | European markers absent | `\bdevis\b`: **6 hits in products.ts, 2 in industries.ts** (all inside the duplicated procurement paragraph "La plupart des devis sont retournés en 24 heures"). `faire du shopping`: 0. | ⚠️ **F7.4-A (NIT)** |

**Note on `devis`:** Used in Quebec procurement vocabulary too (it's not strictly EU-only), but FACTORY-MASTER §2.13 prefers `soumission` for stronger CA-FR signal. All 8 instances live inside the same boilerplate paragraph (see F7.7-A) — fixing the boilerplate will likely also reduce the `devis` count.

## 7.5 Specificity

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 7.5.1 | Generic phrases (`many years experience\|experienced team\|high quality\|great service\|best results\|dedicated to\|committed to`) | **0 hits** in products.ts and industries.ts | ✅ |
| 7.5.2 | Specific markers (`ASTM\|ISO\|certified\|standard\|N%\|N kg\|N mm\|N inch`) | products.ts: **28** matches; industries.ts: **15** matches. Strong density of numeric/standards specificity (mm, $, %, code citations like CBC 3.4.6.5, CNB 9.8.7.4, AODA, OBC). | ✅ |

## 7.6 Content Formatting (§2.11)

| Slug (product) | EN H2 ≥3 | FR H2 ≥3 | EN bold | FR bold | longest-paragraph sentences (≤5) |
|---|:-:|:-:|---:|---:|---:|
| skate-stoppers | ✅ 5 | ✅ 4 | 25 | 22 | 5 ✅ |
| …-ledges | ✅ 5 | ✅ 5 | 14 | 11 | 5 ✅ |
| …-handrails | ✅ 5 | ✅ 5 | 14 | 12 | 5 ✅ |
| …-benches | ✅ 5 | ✅ 5 | 23 | 18 | 5 ✅ |
| …-concrete | ✅ 5 | ✅ 5 | 24 | 16 | 5 ✅ |
| …-sidewalks | ✅ 5 | ✅ 5 | 25 | 23 | 5 ✅ |

| Slug (industry) | EN H2 ≥2 | FR H2 ≥2 | EN bold | FR bold | longest-paragraph sentences (≤5) |
|---|:-:|:-:|---:|---:|---:|
| municipalities-parks | ✅ 5 | ✅ 5 | 26 | 22 | 5 ✅ |
| transit-authorities | ✅ 5 | ✅ 5 | 24 | 20 | 4 ✅ |
| schools-universities | ✅ 4 | ✅ 4 | 24 | 19 | 4 ✅ |
| commercial-real-estate | ✅ 5 | ✅ 5 | 23 | 17 | 4 ✅ |
| retail-storefronts | ✅ 4 | ✅ 4 | 25 | 22 | 4 ✅ |
| condominiums-hoas | ✅ 5 | ✅ 5 | 23 | 18 | 4 ✅ |
| government-heritage | ✅ 5 | ✅ 5 | 26 | 19 | 4 ✅ |

7.6.1 ✅ every product has ≥3 H2. 7.6.2 ✅ every industry has ≥2 H2. 7.6.3 ✅ bold density very high (14-26 EN, 11-23 FR per entry — well above CORE-EEAT minimum). 7.6.4 ✅ no walls of text — every entry's longest paragraph is 4-5 sentences (5 is the §2.11 ceiling, never exceeded).

## 7.7 Boilerplate Detection (§3.5e)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 7.7.1 | No shared paragraphs (≥30 words) across products | Python pass over 6 materials × 2 locales: **2 paragraphs duplicated across 5/6 product entries each.** Each is the "Procurement and warranty" closing block (EN + FR). The original `skate-stoppers` material has unique procurement language; the other 5 materials reuse identical text verbatim. | ❌ **F7.7-A (P0)** |
| 7.7.2 | No shared paragraphs across industries | Python pass over 7 industries × 2 locales: **2 paragraphs duplicated across 5/7 industry entries each.** Each is the "Procurement timeline for Canadian municipalities" closing block (EN + FR). | ❌ **F7.7-A (P0, same)** |

**Sample duplicated EN paragraph (products):**
> *"We respond to public RFP and DDP requests within 5 business days
> with stamped engineering, AODA / OBC code-conformance letters,
> climate-zone heatmaps for the destination city, and bonded-contractor
> accreditation for prevailing-wage municipal work. Install crews carry
> $5M general liability and are insured to work on TTC, STM, GO Transit,
> Metrolinx, and BC Transit properties. Warranty is 10 years on coatings
> and lifetime on 316L marine-grade structural elements. Volume pricing
> applies on orders of 20+ studs; bulk municipal orders typically land
> in the $24-32 per-stud installed range with quantity discounts. Most
> quotes return within 24 hours of address submission."*

**Sample duplicated EN paragraph (industries):**
> *"Most Canadian municipal procurement cycles run on a 3-year capital
> plan, with skate-deterrent installs typically scheduled in the
> spring/fall window…"*

**Audit-runner reconciliation:** `boilerplate-gate.log` reports `0 paragraphs ≥30 words` scanned in `products.ts` and `industries.ts` — the gate's parser is silently extracting nothing from these files (likely the apostrophe / multi-line-string class of bug noted in `false-positive-screening.md`). The gate **did** correctly catch 6 duplicates in `blog.ts` (Section 8 territory). So the gate's overall FAIL is real — but it under-reports. F7.7-A is a real P0 finding the gate missed.

## 7.8 No Emoji in Content (§2.15)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 7.8.1 | No emoji in data files | Perl-regex grep on Unicode ranges `\x{1F300}-\x{1F9FF}` and `\x{2600}-\x{27BF}` against products.ts + industries.ts → **0 matches** | ✅ |

---

## Section 7 Findings

### F7.7-A — Boilerplate procurement paragraph reused across 5 of 6 products and 5 of 7 industries (P0)

The "Procurement and warranty" paragraph (~110 EN words / ~95 FR
words) is reproduced verbatim in:
- 5 product descriptions: ledges, handrails, benches, concrete, sidewalks (`skate-stoppers` is the unique original).
- 5 industry descriptions: municipalities-parks, transit-authorities, commercial-real-estate, condominiums-hoas, government-heritage (`schools-universities` and `retail-storefronts` are the unique ones).

This violates FACTORY-MASTER §3.5e (boilerplate-detection-gate) and
weakens uniqueness for both Google duplicate-content scoring and AI
verbatim-citation quality. Per-page rewrite needed: each product's
procurement block should be tailored to that product's procurement
nuance (volume pricing per unit type, installer count, warranty
specifics for that material grade, etc.). Same for industries.

### F7.4-A — `devis` used 8× instead of `soumission` (NIT)

8 instances of `devis` (6 products / 2 industries), all inside the
F7.7-A boilerplate paragraph. `devis` is acceptable in Canadian French
but `soumission` is the preferred CA-FR procurement term. Fix piggy-
backs onto F7.7-A: when rewriting boilerplate, swap to `soumission`.

## Section 7 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 1 (×2 instances) | F7.7-A (boilerplate procurement paragraph in products + industries) |
| **NIT** | 1 | F7.4-A (`devis` → `soumission` swap) |
| **PASS rows** | 19 | All word counts (13/13), all banned-phrase checks (3/3), generic-phrase check, specificity, formatting (H2 + bold + paragraph length), emoji |

**Verdict for Section 7:** **CONDITIONAL** — content meets all word
counts (every product 478-532 EN / 406-510 FR; every industry
381-459 EN / 363-436 FR), formatting is excellent (5 H2 per entry,
14-26 bold spans EN, paragraphs ≤5 sentences), zero banned phrases,
zero generic phrases, strong specificity (28+15 numeric/standards
markers), no emojis. **The single real problem is the boilerplate
procurement paragraph** that ships verbatim across 5+5 entries — a
P0 §3.5e violation the audit-runner's parser missed.

---

**STOP — awaiting `NEXT` for Section 8 (Content Quality — Cities, Geo, Blog, Translations).**
