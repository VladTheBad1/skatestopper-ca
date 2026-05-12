---
type: audit-report
section: final
title: FACTORY-MASTER Full Audit — Skatestopper.ca
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
factory_master_version: v1.3
profile: C (Country — Canada)
domain: skatestopper.ca
audit_runner: 78 pass / 7 fail (of 85 atomic gates)
---

# FACTORY-MASTER Full Audit — Skatestopper.ca

**Date:** 2026-05-04
**Profile:** **C — Country (Canada)** — national service across all 10 provinces; no single verified street address; LocalBusiness schema correctly absent.
**Domain:** `skatestopper.ca` (live on GitHub `VladTheBad1/skatestopper-ca`, commit `b184d38`; not yet deployed to Vercel)
**Tooling:** `audit-runner.sh` (85 atomic gates) + 12-section AUDIT-CHECKLIST walkthrough (~270 evidence-backed checks across 11 sub-reports).

---

## SCORE SUMMARY

| Category | MUST Pass | MUST Fail | SHOULD Pass | SHOULD Fail | NIT |
|----------|----------:|----------:|------------:|------------:|----:|
| SEO Research (§1)                | 14 | 2 | 0 | 3 | 0 |
| B.1 Site-Wide (§2-3)             | 46 | 1 | 0 | 1 | 4 |
| B.2 Per-Page-Type (§4-5)         | 58 | 4 | 0 | 0 | 8 |
| B.3 Structure & Linking (§6)     | 14 | 0 | 0 | 0 | 1 |
| Content Quality (§7-8)           | 36 | 2 | 0 | 0 | 4 |
| Images (§9)                      | 18 | 1 | 0 | 0 | 2 |
| B.4 Performance + a11y (§10)     | 17 | 0 | 0 | 2 | 1 |
| B.5 Conversion UX (§11)          | 18 | 0 | 0 | 0 | 1 |
| **TOTAL**                        | **221** | **10** | **0** | **6** | **21** |

**MUST-pass rate:** 221 / (221 + 10) = **95.7 %** atomic checks pass.
**MUST failures:** **10 distinct findings (≈ 6 root-cause bugs)** — see §🔴 below.

## VERDICT: **FAIL → CONDITIONAL-FIXABLE**

Per FACTORY-MASTER scoring matrix:
- **PASS** = 0 MUST fails + ≥90 % SHOULDs pass
- **CONDITIONAL** = 0 MUST fails + 70–89 % SHOULDs pass
- **FAIL** = any MUST fail

**Strict verdict:** FAIL (10 MUST fails).

**Pragmatic verdict:** **CONDITIONAL-FIXABLE.** The 10 MUST findings
collapse to **~6 root-cause edits** (≈ 2-4 hours of work). The product
is fundamentally well-built — content quality, accessibility, JSON-LD
coverage on non-hub pages, image inventory, conversion architecture,
hydration discipline, locale parity, and overall audit-runner score
(78/85 = 92 %) are all production-grade. The MUST failures are
**bounded, identifiable, and largely surface-instances of single bugs.**

---

## 🔴 MUST FAILURES (10) — grouped by root cause

### RC1 — FR-canonical bug (5 surface instances, 1 root cause)

Hand-written static FR page files don't switch metadata on locale —
they emit the EN canonical/og:url and `og:locale=en_CA`. Google will
treat these FR hubs as duplicates of EN and likely deindex them.

| Finding | Page | canonical points to | og:locale |
|---|---|---|---|
| **F4.3-A** | `/fr/produits` | `…/products` | `en_CA` |
| **F4.4-A** | `/fr/secteurs` | `…/industries` | `en_CA` |
| **F4.6-A** | `/fr/villes` | `…/cities` | `en_CA` |
| **F5.6-B** | `/fr/a-propos` | `…/about` | `en_CA` |
| **F5.6-B** | `/fr/faq` | `…/faq` | `en_CA` |

Counterexamples (FR locale-aware code works elsewhere): `/fr` homepage,
all `/fr/[product]`/`/fr/[industry]`/`/fr/[city]` dynamic routes,
`/fr/confidentialite`, `/fr/conditions`, `/fr/nous-joindre` — all correct.

**Fix:** in each of the 5 broken `src/app/fr/<slug>/page.tsx` files,
the exported `metadata` (or `generateMetadata`) needs:
```ts
alternates: { canonical: `${siteConfig.url}/fr/<slug>` },
openGraph: { url: `${siteConfig.url}/fr/<slug>`, locale: 'fr_CA', ... }
```
≈ 30 min total.

### RC2 — Geo cross-pages are doorway pages (1 finding, 140 surface URLs)

**F8.2-A.** `src/data/geo-seo.ts` reads field names that don't exist on
the `Location` interface in `src/data/locations.ts`:

| geo-seo.ts reads | locations.ts has |
|---|---|
| `frostLine`, `annualSnowfall`, `avgWinterTemp` | `frostDepthM`, `annualSnowfallCm`, `avgWinterTempC` |
| `labourRateRange`, `popularMaterials`, `buildingSeason` | (don't exist) |
| `climateZone` | `climateZone` ✅ |

Result: all 140 `/[city]/[service]` URLs fall through to **identical
hardcoded defaults** (`Zone 6 / 200 mm / -10 °C / 1500 mm / $45-65/hr
/ May to October / 304 stainless`). Toronto and Montreal pages are
byte-identical after city-name strip; `diff` is empty. The
audit-runner's `doorway-detection-gate` gave a **false PASS** — its
parser scanned 0 city descriptions.

**Fix:** rename 3 fields in `geo-seo.ts`; add 3 missing fields (or
derive defaults per climateZone). ≈ 45 min.

### RC3 — Boilerplate "Procurement and warranty" paragraph (2 findings, 14 surface entries)

| Finding | File | Affected entries |
|---|---|---|
| **F7.7-A** | `src/data/products.ts` | 5 of 6 (all except `skate-stoppers`) — EN + FR boilerplate |
| **F7.7-A** | `src/data/industries.ts` | 5 of 7 (all except schools & retail) — EN + FR boilerplate |
| **F8.3-A** | `src/data/blog.ts` | 3 FAQ-style closing paragraphs reused across all 4 posts, EN + FR (6 total) |

`boilerplate-gate` caught the blog set; **missed** the products + industries set (parser-bug, same class as doorway-detection-gate).

**Fix:** rewrite each duplicate paragraph per-entry. ≈ 90 min (longest single fix).

### RC4 — Sitemap publishes 2 dead URLs (2 findings, 1 root cause)

**F1.6-A / F2.4-A.** Sitemap emits `/fr/industries` and `/fr/contact`;
both return 404 live. Real routes are `/fr/secteurs` and `/fr/nous-joindre`.
Same FR-slug-derivation bug in sitemap generator that the
`hreflang-slug-correctness-gate` already failed on. Internal nav doesn't
hit these (they don't appear as `<a href>` anywhere) — only crawlers will.

**Fix:** sitemap generator should read `slugFr` from page metadata or a
locale-route mapping. ≈ 20 min.

### RC5 — Slug-search-volume gate fail (1 finding)

**F1.1-A.** Material `skateboard-deterrents-for-ledges` has no
`clusterParent`; slug-as-query has 0 volume. Other 5 deterrent-* materials
either cluster to `skate stoppers` (90/mo) or pass directly.

**Fix:** add `clusterParent: "skate stoppers"` to the ledges material.
≈ 2 min.

### RC6 — Defensive image alt antipattern (1 finding, 4 components)

**F9.4-A.** 4 components use `alt={industry.name}` / `alt={p.name}` /
`alt={p.title}` instead of reading `images.ts` for the rich
scene-descriptive alts the project already authored (and that pass
F9.4.1-F9.4.4 in `images.ts` itself).

| Component | Line |
|---|---|
| `IndustryDetailPage.tsx` | 163, 365 |
| `BlogPostPage.tsx` | 97 |
| `CityDetailPage.tsx` | 214 |

**Fix:** add helper, route through `images.products[slug]?.alt[locale]`.
≈ 30 min.

### Standalone P0s

- **F5.5-A.** `/anti-skateboard-devices` meta description = 227 chars and contains internal SEO language *"110 monthly searches across 'anti skate', 'anti skateboard'…"*. Customer-facing meta should not leak search volume. ≈ 5 min (likely needs check across all 9 keyword pages).
- **F5.6-A.** Title doubling: `/contact` renders *"Contact — Skatestopper.ca | Skatestopper.ca"* (brand twice). Same on `/fr/nous-joindre`. Fix: drop the brand from the data-side title (`title: 'Contact'`, not `'Contact — Skatestopper.ca'`); the layout template will append it. ≈ 5 min × 2 files.

---

## 🟡 SHOULD FAILURES (6)

| ID | Section | Description | Effort |
|---|---|---|---|
| **F2.1-A** | §2.1.4 | Robots meta = `index, follow` only — missing `max-image-preview:large, max-snippet:-1, max-video-preview:-1` recommended by FACTORY-MASTER §B.1 for rich-result eligibility | 5 min |
| **F3.3-A** | §3.3 | All 9 keyword landing pages emit only `FAQPage` — missing `BreadcrumbList` AND `Organization` (weakens AI-citation entity-trust signal — directly hurts the project's GEO goal) | 30 min |
| **F3.3-B** | §3.3 | Hub pages (`/products`, `/industries`, `/cities`, `/blog`) and all 10 province pages emit only `BreadcrumbList` — missing `Organization` | 30 min |
| **F1.2-A** | §1.2.5 | `competitors.json` heading arrays empty for top competitor; depth analysis shallow | (deferred — re-run during next quarterly research pass) |
| **F10.1-A** | §10.1.2 | `npx tsc --noEmit` → 2 errors: `clusterParent` field used on `KeywordPage` objects but interface doesn't declare it (masked by `typescript.ignoreBuildErrors: true`) | 2 min |
| **F10.5-A** | §10.5.4 | Homepage heading hierarchy: `H1 → H3 → H3 → H3 → H3 → H2 → H3…` — 4 H3s appear before first H2. WCAG 1.3.1 violation. | 15 min |

### SHOULD-counts (informational, not verdict-breaking per Profile-C)

- **F1.3-A** — 6 products < FACTORY threshold of 8 (defensible for micro-niche; keyword corpus is small)
- **F1.4-A** — 7 industries < threshold of 8

---

## 🔵 NIT (21 — backlog, not ship-blocking)

Selected highlights (full list across sub-reports):
- **F4.1-A / F4.2-A** — Homepage descriptions 162/170 chars (2-10 over 160 SERP ceiling)
- **F5.1-C** — FR detail pages use `og-default.png`; EN uses per-product webp (asymmetric)
- **F5.4-A** — All city pages use `og-default.png`; no per-city OG image
- **F5.5-B** — `/fr/dispositifs-anti-planche` title 62ch (brand-template trap: data-title >42ch)
- **F6.2-A** — Geo cross-pages under-linked from product/industry pages
- **F7.4-A + F11.1-A** — `devis` used 8 times where `soumission` is the preferred Canadian-French token (8 in boilerplate; 1 in FR submit CTA)
- **F8.1-A** — 10 cities discuss niche context (frost depth, salt-air, stainless grade) without literal "skate stopper" tokens
- **F8.6-A** — FR bold density 4-8 below EN on 8 of 13 product/industry entries (translator stripped emphasis)
- **F9.1-A** — 3 images > 500 KB (`canada-map.png` 1.44 MB; 2 tall-aspect product webps)
- **F9.4-B** — Templated city image alts (all 48 use *"Downtown {City}, {Prov} — commercial plaza context where stainless skate stoppers…"*)
- **F10.1-B** — Turbopack workspace-root inference warning during build
- **F3.2-A** — FAQ not in Header/Footer nav (reachable only via HomeHero inline link + sitemap)

---

## ✅ PASSING HIGHLIGHTS (221 atomic checks)

### Per-page metadata (28 / 33 on Section 4; 30+ / 35+ on Section 5)
- 13 EN page.tsx + 13 FR page.tsx (perfect locale parity)
- All EN canonicals self-referential; **all FR product/industry/city/keyword detail canonicals correct** (only static hub & static-page subset is broken)
- All hreflang triplets present (en-CA / fr-CA / x-default, BCP-47) on every sampled page
- All H1=1 verified on 6/6 sampled pages; H2≥3 on products, H2≥2 on industries, H2≥1 on cities
- All sampled meta descriptions in spec range except 2 NITs and 1 P0 (F5.5-A)
- twitter:card / og:type / og:site_name / og:image present sitewide
- 8 JSON-LD blocks on homepage (Organization, WebSite, WebPage, FAQPage, Question, Answer, ContactPoint, SpeakableSpecification); 7 on FR home (no duplicate WebSite — correct per commercialdoors-ca lesson); product details emit Service + BreadcrumbList; geo cross-pages emit Organization + BreadcrumbList + FAQPage

### Site-wide infrastructure
- `<html lang="en-CA">` / `lang="fr-CA"` correct
- 1438 sitemap URLs — all absolute https, all lowercase, no underscores, no `<priority>` / `<changefreq>` cruft
- robots.txt: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai, Applebot-Extended explicitly allowed; CCBot blocked; CSS/JS/images not blocked
- `/llms.txt` 200, leads with niche disambiguation (anti-skateboarding vs roller-skate toe stops) — matches preload's "disambiguation in machine channels only" lesson
- Favicon 200; OG default image 200
- Soft-404 gate PASS (proper 404 on bogus URLs, EN + FR)
- Middleware minimal (www→non-www only; security headers correctly in `next.config.ts`)

### Content quality
- **Products:** 6/6 EN word counts 478-532 (≥400); FR 406-510 (≥350); 5 H2 + 14-26 bold per entry
- **Industries:** 7/7 EN 381-459; FR 363-436; 4-5 H2 + 23-26 bold
- **Cities:** 48/48 EN 170-326 words (≥150); FR 204-342 (≥120); 0 duplicate descriptions and 0 duplicate localHooks after city-name normalization
- **Blog:** 4 posts × 960-1160 words EN, full author/category/tags metadata
- **FAQ:** 17 entries, EN answers avg 126 words (min 104, max 191)
- **Translations:** 159 EN keys / 159 FR keys (perfect parity); all meaningfully translated (not copy-paste)
- **Banned phrases:** 0 hits sitewide ("premier provider", "best-in-class", "world-class", "industry-leading", "we are dedicated/committed", etc.)
- **Generic phrases:** 0 hits ("many years experience", "experienced team", "high quality", "great service", "best results", "dedicated to", "committed to")
- **Specificity:** 43 numeric/standards markers in products+industries (CBC 3.4.6.5, CNB 9.8.7.4, AODA, OBC, mm/kg/$/%)
- **No emoji** in data files or components
- **No HowTo schema, no LocalBusiness schema** (correct for Profile C)
- **No `<meta keywords>` anywhere**

### Images & next/image discipline
- 64 images (98.4 % webp), 100 % coverage (6/6 products, 7/7 industries, 48/48 cities)
- Zero 0-byte, zero <10 KB
- All product/industry images ≥1600 px wide
- `images.ts`: 11/11 EN alts contain niche keyword; 7/11 mention Canada; 0 duplicates; 11/11 FR alts present
- Zero raw `<img>` tags in src; all next/image; priority on hero, lazy on below-fold

### Accessibility (10.5)
- Skip-to-content link in `layout.tsx`
- 1 `<header>` / 2 `<nav>` / 1 `<main>` / 1 `<footer>` landmarks
- Single H1 verified on 6/6 sampled pages
- 5 form labels for 5 form inputs
- No `outline:none` misuse
- Color contrast: brand tokens **AA-AAA** (white-on-black ≈ 20.6:1; accent-red on white ≈ 5.36:1; muted-on-dark ≈ 8.5:1)

### Conversion UX
- Above-fold CTA + visible phone (`(888) 663-2244`) + scroll-triggered FloatingCTA
- 5-field contact form, action-verb submit ("Get my quote" / "Obtenir mon devis")
- 0 emoji / 0 rainbow-text / 0 hover-hides-products design sins
- **0 framer-motion files** — pure CSS animation (9 keyframes); minimal client hydration boundary (5 `'use client'` components, all justified)
- `Logo.tsx` correctly server-rendered (no `'use client'`, no framer)

---

## FIX PRIORITY ORDER

| # | Finding | Group | Surface count | Est. time | Cumulative |
|--:|---|---|---:|---:|---:|
| 1 | F1.1-A — Add `clusterParent: "skate stoppers"` to ledges material | RC5 | 1 | 2 min | 0:02 |
| 2 | F10.1-A — Add `clusterParent?: string` (+ siblings) to `KeywordPage` interface | — | 1 | 2 min | 0:04 |
| 3 | F5.5-A — Rewrite `/anti-skateboard-devices` description (and audit other 8 keyword pages) | — | 1-9 | 15 min | 0:19 |
| 4 | F5.6-A — Drop brand from `/contact` + `/fr/nous-joindre` data-titles | — | 2 | 5 min | 0:24 |
| 5 | F2.1-A — Set robots meta `max-image-preview/snippet/video-preview` directives in root layout | — | 1 | 5 min | 0:29 |
| 6 | RC4: F2.4-A / F1.6-A — Fix sitemap FR-slug derivation (read `slugFr` from metadata) | RC4 | 2 dead URLs | 20 min | 0:49 |
| 7 | RC1: F4.3-A + F4.4-A + F4.6-A + F5.6-B — Fix canonical/og:url/og:locale on 5 FR page.tsx files | RC1 | 5 pages | 30 min | 1:19 |
| 8 | RC6: F9.4-A — Add `imageAlt(slug, locale, fallback)` helper; route 4 components through it | RC6 | 4 files | 30 min | 1:49 |
| 9 | F3.3-A + F3.3-B — Emit Organization JSON-LD globally (via root layout) + BreadcrumbList on keyword pages | — | 9 KW pages + 14 hubs/provinces | 30 min | 2:19 |
| 10 | F10.5-A — Promote 4 leading H3s on homepage to H2 (semantic correction) | — | 1 | 15 min | 2:34 |
| 11 | RC2: F8.2-A — Rename 3 fields in `geo-seo.ts`; add 3 missing fields to `Location` interface + `locations.ts` data | RC2 | 140 doorway URLs | 45 min | 3:19 |
| 12 | RC3: F7.7-A + F8.3-A — Rewrite procurement boilerplate per-entry (products + industries + blog) | RC3 | 5+5+4 entries | 90 min | 4:49 |

**Total to clear all 10 MUST findings + 2 critical SHOULD: ≈ 4 hours 49 minutes.**

After that work, the site should score **PASS** under the FACTORY-MASTER matrix (0 MUST fails + ≥90 % SHOULDs).

---

## Audit-runner reconciliation

`audit-runner.sh` reported **78 pass / 7 fail** of 85 atomic gates.
The 12-section walkthrough confirms how each runner-fail maps to a real
finding plus finds gaps the runner missed:

| Gate | Result | Reality |
|---|---|---|
| `boilerplate-gate` | FAIL | **Real** — caught 6 paragraphs in blog.ts (F8.3-A). **Missed** 4 paragraphs in products.ts + industries.ts (F7.7-A — parser bug, "0 paragraphs ≥30 words" in those files). |
| `hero-alt-gate` | FAIL | **Real** — 4 components use slug-as-alt (F9.4-A). |
| `hreflang-slug-correctness-gate` | FAIL | **Real** — 2 sitemap URLs use EN slugs for FR alternates (F1.6-A / F2.4-A). |
| `link-architecture-gate` | FAIL | **False positive** — gate said `/about` `/privacy` `/terms` missing from homepage; live HTML has all 3 (via Footer's `staticUrl()` helper). Gate parser doesn't follow helper functions. |
| `nav-depth-gate` | FAIL | **Half-real** — FAQ-missing-from-header is real (F3.2-A); "cities: 2" data-count is parser bug (locations.ts has 48). |
| `recurring-failures-gate` | FAIL | Internal slug collision check — passed on slugs (63 unique). The FAIL signal pertains to a meta-gate that didn't apply here. |
| `slug-search-volume-gate` | FAIL | **Real** — ledges material missing `clusterParent` (F1.1-A). |
| `doorway-detection-gate` | **PASS** (false) | **Critical false-PASS** — its log says "scanned 0 city descriptions" then reports clean. Hid F8.2-A (140 doorway URLs). |
| `metadata-template-niche-contamination-gate` | PASS | Real PASS. |
| `schema-field-content-gate` | PASS | Real PASS. |
| `soft-404-gate` | PASS | Real PASS. |
| `boss-policy-gate` | PASS | No `boss-policy.json` at site → effectively no-op for this site. |
| Other 73 gates | PASS | 70+ real PASSes (locale-lang-attr, sitemap-hygiene, slug-collision, schema-gate, og-image-resolves, public-assets, robots, …). |

**Lesson preserved** from `mode-audit.md` / commercialdoors-ca lesson:
audit-runner.sh is necessary but not sufficient. The 12-section
walkthrough caught 2 P0 issues the runner missed entirely (F7.7-A
products/industries boilerplate, F8.2-A geo doorway pages), and
properly classified 1 runner FAIL as false-positive (link-architecture)
and 1 runner PASS as false-PASS (doorway-detection).

---

## Decision deferred to user

The session preload notes a pending decision: **deploy to Vercel now,
or fix Action 4 (`/skate-stoppers` comparison section) first.**

This audit suggests a **third option**, which I would not implement
without explicit instruction:

1. **Fix the 10 MUST findings (≈ 5 hours) before deploying.** Two of them
(RC1 FR-canonical bug and RC2 geo-doorway) materially affect what Google
indexes on day-1. Deploying with them in place means re-indexation work
after the fixes ship, plus risk of FR pages being merged-duplicate by
Google's first crawler pass.

Or stay with the existing two options. **Awaiting direction — audit
report only, no fixes applied.**

---

## All 11 sub-reports

- `audit/reports/01-seo-research.md` — Section 1 (SEO Research Validation) — CONDITIONAL
- `audit/reports/02-sitewide.md` — Section 2 (Root Layout & Locale) — CONDITIONAL
- `audit/reports/03-global-rules.md` — Section 3 (Global Rules & Anti-Patterns) — CONDITIONAL
- `audit/reports/04-page-meta-hubs.md` — Section 4 (Homepage + Hubs) — **FAIL on FR hubs**
- `audit/reports/05-page-meta-details.md` — Section 5 (Detail & Static Pages) — CONDITIONAL
- `audit/reports/06-structure-linking.md` — Section 6 (Structure & Linking) — PASS-with-NIT
- `audit/reports/07-content-products-industries.md` — Section 7 (Products & Industries) — CONDITIONAL (boilerplate P0)
- `audit/reports/08-content-cities-geo-blog.md` — Section 8 (Cities, Geo, Blog, FAQ, Translations) — **FAIL on geo cross-pages**
- `audit/reports/09-images.md` — Section 9 (Images) — CONDITIONAL
- `audit/reports/10-performance-build.md` — Section 10 (Performance & Build) — PASS-with-SHOULDs
- `audit/reports/11-conversion-design.md` — Section 11 (Conversion UX + Design) — PASS

**Audit-runner artifacts:** `audit/AUDIT-RUNNER.md`, `audit/logs/*.log`.

---

*End of audit. No fixes applied. Mode: AUDIT (read-only).*
