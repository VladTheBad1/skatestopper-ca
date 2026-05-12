---
type: audit-report
section: 5
title: Per-Page Metadata — Detail & Static Pages
factory_master_refs: §B.2
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 5 of 12 — Per-Page Metadata: Detail Pages

> Sampled 2 per type EN+FR. All hreflang triplets verified present (3 alts: en-CA, fr-CA, x-default) on every detail page checked.

## 5.1 Product Detail Pages

| Page | title | desc | canonical | og:url | og:locale | og:image | H1/H2/strong |
|---|---|---|---|---|---|---|---|
| EN `/skate-stoppers` | "Skate Stoppers \| Skatestopper.ca" (32ch) | 143ch | self ✅ | self ✅ | en_CA ✅ | per-product webp ✅ | 1/3/7 ✅ |
| FR `/fr/bloque-skate` | "Bloque-skate \| Skatestopper.ca" (30ch) | 133ch FR | self ✅ | self ✅ | fr_CA ✅ | og-default.png ⚠️ | 1/3/6 ✅ |
| EN `/skateboard-deterrents-for-handrails` | (53ch) | **165ch** | self ✅ | self ✅ | en_CA ✅ | per-product webp ✅ | 1/3/4 ✅ |
| FR `/fr/dissuasifs-skateboard-pour-mains-courantes` | (60ch) | **164ch** | self ✅ | self ✅ | fr_CA ✅ | og-default.png ⚠️ | 1/2/4 ✅ |

Notes:
- All 4 product details: **canonical/og:url/og:locale correct** — the FR hub bug does NOT affect product details.
- 5.1.1/5.1.2 ✅ for both pairs.
- 5.1.3 Schema (from Section 3 matrix): `Service + BreadcrumbList`. Per FACTORY-MASTER §B.2, `Product` schema would be more semantically correct for catalog items. **F5.1-A (NIT)** — Service/Product hybrid is acceptable for "supplied + installed" model.
- 5.1.4 H1=1 ✅ on all
- 5.1.5 H2≥3: ✅ on 3 of 4 (FR mains courantes has H2=2, slightly below threshold) — **F5.1-B (NIT)**
- 5.1.6 strong≥5: ✅ /skate-stoppers (7); ⚠️ others 4-6 (one below threshold of 5)
- 5.1.7 No raw markdown leak: ✅
- 5.1.8 OG url page-specific: ✅
- 5.1.9 (2nd product) covered above
- **F5.1-C (NIT)**: FR product details fall back to `og-default.png` instead of using product-specific webp. EN uses correct per-product image. Asymmetric.
- **F5.1-D (NIT)**: 2 of 4 product descriptions exceed 160-char ceiling (164, 165).

## 5.2 Industry Detail Pages

| Page | title | desc | canonical | og:url | og:locale | og:image | H1/H2/strong |
|---|---|---|---|---|---|---|---|
| EN `/municipalities-parks` | (63ch raw / 60 rendered after `&amp;`) | 106ch | self ✅ | self ✅ | en_CA ✅ | per-industry webp ✅ | 1/2/4 ✅ |
| FR `/fr/municipalites-parcs` | (59ch) | 120ch | self ✅ | self ✅ | fr_CA ✅ | og-default.png ⚠️ | 1/2/4 ✅ |
| EN `/transit-authorities` | (56ch) | 99ch | self ✅ | self ✅ | en_CA ✅ | per-industry webp ✅ | 1/2/5 ✅ |
| FR `/fr/autorites-transport` | (59ch) | 120ch | self ✅ | self ✅ | fr_CA ✅ | og-default.png ⚠️ | 1/2/3 ⚠️ |

- 5.2.1/5.2.2 ✅ — canonicals correct on industry details.
- 5.2.3 Schema = `Service + BreadcrumbList`, NOT LocalBusiness ✅
- 5.2.4 H1=1 ✅, H2≥2 ✅ across all 4. strong≥3 ✅ on 3 of 4 (FR autorites has strong=3 — at threshold).
- **F5.1-C** repeats: FR industry details also fall back to og-default.png.
- **F5.2-A (NIT)**: EN industry desc 99-106ch is on the low side — could include more substance.

## 5.3 Material Detail Pages

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 5.3.1-5.3.4 | EN/FR material detail pages | **N/A** — this template treats materials as products (covered in 5.1). No separate `/materials/{slug}` route exists; sitemap does not publish any. | N/A |

## 5.4 City Pages

| Page | title | desc | canonical | og:url | og:locale | og:image | H1/H2/strong |
|---|---|---|---|---|---|---|---|
| EN `/toronto` | (47ch) | 122ch | self ✅ | self ✅ | en_CA ✅ | og-default.png ⚠️ | 1/2/6 ✅ |
| FR `/fr/toronto` | (45ch) | 126ch | self ✅ | self ✅ | fr_CA ✅ | og-default.png ⚠️ | 1/2/6 ✅ |
| EN `/montreal` | (49ch) | 123ch | self ✅ | self ✅ | en_CA ✅ | og-default.png ⚠️ | 1/2/6 ✅ |
| FR `/fr/montreal` | (47ch) | 127ch | self ✅ | self ✅ | fr_CA ✅ | og-default.png ⚠️ | 1/2/6 ✅ |

- 5.4.1/5.4.2 ✅ — canonicals correct on city pages.
- 5.4.3 City-specific content (NOT template swap):
  - **Toronto**: "Largest commercial real estate market in Canada; high downtown vandalism complaints; TTC and Metrolinx procurement"
  - **Montréal**: "Heritage stone hardscape requires conservation-grade discreet deterrents; STM procurement; FR-language compliance for all signage"
  - First paragraph IS identical across both ("Canadian-engineered skate stoppers — stamped engineering, climate-rated stainless, bylaw-compliant install."). That's the boilerplate intro. Second paragraph is meaningfully unique per city. ✅ — uniqueness intent satisfied per `geo-page-uniqueness` muscle (Jaccard test deferred to Section 8).
- 5.4.4 H1=1 ✅, H2≥1 ✅ (=2), strong≥2 ✅ (=6) — meets §2.4c.
- 5.4.5 (2nd city) covered above.
- **F5.4-A (NIT)**: City pages use `og-default.png` rather than city-specific imagery. Per-city OG (e.g., `/images/cities/toronto-og.webp`) would lift social-share quality.

## 5.5 Keyword Pages

| Page | title | desc | canonical | og:url | og:locale | H1/H2 |
|---|---|---|---|---|---|---|
| EN `/skate-deterrents` | (57ch) | 133ch | self ✅ | self ✅ | en_CA ✅ | 1/6 ✅ |
| FR `/fr/dissuasifs-de-skate` | (56ch) | 131ch | self ✅ | self ✅ | fr_CA ✅ | 1/6 ✅ |
| EN `/anti-skateboard-devices` | (51ch) | **227ch** | self ✅ | self ✅ | en_CA ✅ | 1/6 ✅ |
| FR `/fr/dispositifs-anti-planche` | **(62ch)** | 135ch | self ✅ | self ✅ | fr_CA ✅ | 1/6 ✅ |

- 5.5.1/5.5.2 ✅ — canonicals correct on keyword pages.
- 5.5.3 No `**markdown**` in og:description: confirmed empty for all 4 sampled keyword pages.
- 5.5.4 H1=1 ✅, H2≥2 ✅ (=6 on all).
- **F5.5-A (P0)**: `/anti-skateboard-devices` meta description = **227 characters** containing internal keyword-research language: *"…full hardware catalogue. 110 monthly searches across 'anti skate', 'anti skateboard', and 'anti skateboarding'. Climate-engineered, RFP-ready."* The "110 monthly searches across …" phrase is **internal SEO planning language**, not a customer-facing value proposition. Fix: rewrite to ≤155 chars without leaking search-volume numbers or keyword-list internals. Same pattern likely in other keyword-page descriptions — needs review of all 9.
- **F5.5-B (NIT)**: FR `/fr/dispositifs-anti-planche` rendered title 62 chars (over 60 ceiling). Brand template `' | Skatestopper.ca'` (18 chars) + data title "Dispositifs anti-planche à roulettes Canada" (44 chars) = 62. Trim data title to ≤42.

## 5.6 Static Pages

| Page | title | desc | canonical | og:url | og:locale | H1/H2/strong | Notes |
|---|---|---|---|---|---|---|---|
| EN `/about` | (62ch raw) | 118ch | self ✅ | self ✅ | en_CA ✅ | 1/1/1 ⚠️ | thin |
| FR `/fr/a-propos` | (61ch) | 158ch | **`https://skatestopper.ca/about` ❌** | **EN ❌** | **en_CA ❌** | 1/1/1 ⚠️ | **canonical bug** |
| EN `/contact` | "Contact — Skatestopper.ca \| Skatestopper.ca" (45ch) | 95ch | self ✅ | self ✅ | en_CA ✅ | 1/0/0 ⚠️ | **TITLE DOUBLING** |
| FR `/fr/nous-joindre` | "Nous joindre — Skatestopper.ca \| Skatestopper.ca" (50ch) | 119ch | self ✅ | self ✅ | fr_CA ✅ | 1/0/0 ⚠️ | **TITLE DOUBLING** |
| EN `/faq` | (58ch) | 135ch | self ✅ | self ✅ | en_CA ✅ | 1/1/9 ✅ | clean |
| FR `/fr/faq` | (60ch) | **169ch** | **`/faq` ❌** | **EN ❌** | **en_CA ❌** | 1/1/5 ✅ | **canonical bug** |
| EN `/privacy` | (32ch) | 95ch | self ✅ | self ✅ | en_CA ✅ | 1/1/0 ✅ | clean |
| FR `/fr/confidentialite` | (47ch) | 131ch | self ✅ | self ✅ | fr_CA ✅ | 1/1/0 ✅ | clean |
| EN `/terms` | (34ch) | 115ch | self ✅ | self ✅ | en_CA ✅ | 1/1/0 ✅ | clean |
| FR `/fr/conditions` | (47ch) | 141ch | self ✅ | self ✅ | fr_CA ✅ | 1/1/0 ✅ | clean |

### F5.6-A — Title doubling on `/contact` and `/fr/nous-joindre` (P0)

`src/app/(en)/contact/page.tsx:6` declares `title: 'Contact — Skatestopper.ca'`,
which already includes the brand. The root-layout brand template then
appends ` | Skatestopper.ca`, producing **"Contact — Skatestopper.ca |
Skatestopper.ca"** — brand printed twice. Same on FR. Violates
FACTORY-MASTER §3.5c (title-doubling-prevention) and §B.2.

Fix: change to `title: 'Contact'` (let the template append the brand).
Same change required in `src/app/fr/nous-joindre/page.tsx`.

### F5.6-B — `/fr/a-propos` and `/fr/faq` canonical to EN (P0, same root cause as F4.3-A)

Adds two more pages to the FR-canonical disaster from Section 4. Updated
list of FR pages with bad canonical/og:url/og:locale:

| FR page | canonical points to |
|---|---|
| `/fr/produits` | `/products` ❌ |
| `/fr/secteurs` | `/industries` ❌ |
| `/fr/villes` | `/cities` ❌ |
| `/fr/a-propos` | `/about` ❌ |
| `/fr/faq` | `/faq` ❌ |

**Pages where FR canonical is correct:** `/fr` (homepage), all detail pages
(`/fr/bloque-skate`, `/fr/municipalites-parcs`, `/fr/toronto`,
`/fr/dissuasifs-de-skate`), and `/fr/confidentialite`, `/fr/conditions`,
`/fr/nous-joindre`.

**Distinguishing pattern:** the bug hits FR pages whose route is a
**dedicated static page.tsx file in `src/app/fr/<slug>/`** that imports
or reuses metadata from the EN counterpart. Pages routed through
dynamic `[slug]` resolvers correctly switch locale. Pages with locale-aware
hand-written metadata (`/fr/confidentialite`, `/fr/conditions`,
`/fr/nous-joindre`) are correct. So 5 of 8 static FR routes are broken;
3 are correct — proving the fix is per-file and small.

### F5.6-C — Thin `/contact` and `/about` pages (NIT)

EN/FR `/contact` H2=0, strong=0 — pure form/quote-request page, no
written content. Acceptable for transactional intent but means the page
has no AI-citable Q&A or geo-context. EN/FR `/about` H2=1, strong=1 —
also light. NIT.

---

## Section 5 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 3 | F5.5-A (227ch desc with leaked internal SEO language on `/anti-skateboard-devices`), F5.6-A (title doubling on contact pages), F5.6-B (FR canonical bug — 2 more pages: `/fr/a-propos`, `/fr/faq`) |
| **NIT** | 8 | F5.1-A (Service vs Product schema choice), F5.1-B (1 product H2=2), F5.1-C (FR detail og:image fallback), F5.1-D (2 product descs >160), F5.2-A (industry desc <120), F5.4-A (no city OG), F5.5-B (FR keyword title 62ch), F5.6-C (thin contact/about) |
| **PASS rows** | 30+ | All EN canonicals; all city/industry/product detail FR canonicals; all hreflang triplets; H1=1 universally; markdown-leak checks; city uniqueness sample |
| **N/A** | 1 | 5.3 Materials hub (no separate route) |

**Cumulative FR canonical bug list (combining Sections 4+5):**
`/fr/produits`, `/fr/secteurs`, `/fr/villes`, `/fr/a-propos`, `/fr/faq`
— **5 pages.** All other FR pages correct.

**Verdict for Section 5:** **CONDITIONAL** — detail pages (products,
industries, cities, keyword pages) are largely clean on metadata.
Static-page bugs are real but bounded (5 FR routes for canonical, 2 for
title doubling, 1 keyword page for description leak). Detail pages also
suggest the FR canonical bug only hits hand-written static `page.tsx`
files that don't switch on locale.

---

**STOP — awaiting `NEXT` for Section 6 (Structure & Linking).**
