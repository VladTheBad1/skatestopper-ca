---
type: audit-report
section: 4
title: Per-Page Metadata — Homepage + Hubs
factory_master_refs: §B.2
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 4 of 12 — Per-Page Metadata: Homepage + Hubs

## 4.1 Homepage (EN) — `/`

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 4.1.1 | Unique title, ≤60 chars | `Skate Stoppers Engineered for Canada \| Skatestopper.ca` (**52 chars**) | ✅ |
| 4.1.2 | Title and H1 distinct but related | H1 = "Design spaces. / Not skate spots. / We stop skating." (3-span block H1). Distinct from title yet niche-aligned. | ✅ |
| 4.1.3 | Meta description 120-160 chars | **162 chars** — "Canadian-built skate stoppers and anti skateboard guards — ledge deterrents and handrail stops engineered for our climate, shipped and installed coast to coast." | ⚠️ **F4.1-A (NIT)** — 2 chars over recommended ceiling. Will likely be truncated to ~155 in SERP. |
| 4.1.4 | Canonical = self | `https://skatestopper.ca` | ✅ |
| 4.1.5 | og:title page-specific | `Skate Stoppers Engineered for Canada` | ✅ |
| 4.1.6 | og:description page-specific | matches meta description | ✅ |
| 4.1.7 | og:url page-specific | `https://skatestopper.ca` | ✅ |
| 4.1.8 | og:image present | `https://skatestopper.ca/og-default.png` (live 200) | ✅ |
| 4.1.9 | og:type / og:site_name / og:locale | `website` / `Skatestopper.ca` / `en_CA` | ✅ |
| 4.1.10 | twitter:card | `summary_large_image` | ✅ |
| 4.1.11 | Organization + WebSite @graph schema | Both present (verified Section 2.1.8/9) — emitted as separate top-level scripts (not @graph wrapper). Valid JSON. | ✅ |
| 4.1.12 | No title doubling | "Skatestopper.ca" appears once (via brand template). | ✅ |
| 4.1.13 | Content sections present | `<section>` count = 5 (hero, value props, products overview, industries overview, FAQ teaser likely) | ✅ |

## 4.2 Homepage (FR) — `/fr`

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 4.2.1 | Unique title ≤60 chars in French | `Bloque-skate conçus pour le Canada \| Skatestopper.ca` (**51 chars**) | ✅ |
| 4.2.2 | Meta description in French | **170 chars** — "Bloque-skate, dissuasifs de rebords et arrêts de mains courantes fabriqués au Canada. Conçus pour notre climat, livrés et installés d'un océan à l'autre." | ⚠️ **F4.2-A (NIT)** — 10 chars over 160 ceiling. |
| 4.2.3 | Canonical = `/fr` | `https://skatestopper.ca/fr` | ✅ |
| 4.2.4 | og:url = `/fr` | `https://skatestopper.ca/fr` | ✅ |
| 4.2.5 | og:locale = `fr_CA` | `fr_CA` | ✅ |
| 4.2.6 | Hreflang reciprocal | All 3 alternates: en-CA→`/`, fr-CA→`/fr`, x-default→`/` | ✅ |

H1 (FR): "Concevez des espaces. / Pas des skateparks. / Nous arrêtons les glisses." ✅

## 4.3 Products Hub (EN + FR)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 4.3.1 | EN `/products` complete metadata | title="Skate Stoppers & Anti-Skate Hardware \| Skatestopper.ca" (**56 chars**); desc=134 chars; canon=`/products`; og:url=`/products`; og:locale=`en_CA`; og:image=`/images/hero/hero.webp`; tw:card=summary_large_image; hreflang triplet present and points to `/products` ↔ `/fr/produits`. H1="Skate stoppers, engineered for Canadian conditions." | ✅ |
| 4.3.2 | FR `/fr/produits` complete metadata | title="Bloque-skate et matériel anti-planche \| Skatestopper.ca" (**56 chars**, French); desc=133 chars (French). **BUT:** canonical=`https://skatestopper.ca/products` (EN URL), og:url=`https://skatestopper.ca/products` (EN URL), og:locale=`en_CA` (wrong). H1="Bloque-skate, conçus pour le climat canadien." Hreflang triplet is correct. | ❌ **F4.3-A (P0)** |
| 4.3.3 | Schema on products hub | `BreadcrumbList` only (per Section 3 matrix) — no Product/ItemList/Service. | ⚠️ Same as F3.3-B (already filed) |
| 4.3.4 | No raw markdown `##` in cards | grep count = 0 | ✅ |
| 4.3.5 | No raw `**bold**` in cards | grep count = 0 | ✅ |

## 4.4 Industries Hub (EN + FR)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 4.4.1 | EN `/industries` complete metadata | title="Industries — Skate Stopper Applications \| Skatestopper.ca" (**60 chars**, at the ceiling); desc=145 chars; canon=`/industries`; og:url=`/industries`; og:locale=`en_CA`; og:image=`/images/hero/hero.webp`. H1="Built for the spaces that take the most damage." Hreflang triplet correct. | ✅ |
| 4.4.2 | FR equivalent | Live route is `/fr/secteurs` (not `/fr/industries` — that 404s; F2.4-A). title="Secteurs — Applications de bloque-skate \| Skatestopper.ca" (**56 chars**); desc=153 chars. **BUT:** canonical=`https://skatestopper.ca/industries` (EN URL), og:url=EN, og:locale=`en_CA`. H1="Conçus pour les espaces qui subissent le plus de dégâts." | ❌ **F4.4-A (P0)** — same root cause as F4.3-A. Plus dead `/fr/industries` URL in sitemap (F2.4-A). |
| 4.4.3 | No raw markdown in cards | `##` count=0, `**` count=0 | ✅ |

## 4.5 Materials Hub (EN + FR)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 4.5.1 | EN `/materials` | HTTP **404**. | N/A — this template treats materials as products. No separate `/materials` route exists; sitemap does not publish one. Defensible architectural choice. |
| 4.5.2 | FR `/fr/materiaux` | HTTP **404**. Same as above. | N/A |

## 4.6 Cities Hub (EN + FR)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 4.6.1 | EN `/cities` complete metadata | title="Skate Stoppers — Canada Coverage Map \| Skatestopper.ca" (**57 chars**); desc=143 chars; canon=`/cities`; og:url=`/cities`; og:locale=`en_CA`; og:image=`/images/canada-map.png`; H1="We've got Canada covered." Hreflang triplet correct. | ✅ |
| 4.6.2 | FR `/fr/villes` complete metadata | title="Bloque-skate — Carte de couverture Canada \| Skatestopper.ca" (**59 chars**, French); desc=151 chars (French); H1="Le Canada, d'un océan à l'autre." **BUT:** canonical=`https://skatestopper.ca/cities` (EN URL), og:url=EN, og:locale=`en_CA`. | ❌ **F4.6-A (P0)** — same root cause as F4.3-A. |

---

## Section 4 Findings

### F4.3-A / F4.4-A / F4.6-A — FR hub pages canonicalize to EN URLs (P0, systemic)

Every FR hub page (`/fr/produits`, `/fr/secteurs`, `/fr/villes`) ships with:

- `<link rel="canonical" href="https://skatestopper.ca/{EN-slug}">` — points at the EN equivalent, **not** at itself
- `<meta property="og:url" content="https://skatestopper.ca/{EN-slug}">` — points at EN
- `<meta property="og:locale" content="en_CA">` — wrong locale token

**Impact:**
1. Google will treat each FR hub as a non-canonical duplicate of its EN counterpart and **drop the FR hub from the index**.
2. AI engines that key on canonical for entity-page resolution will surface the EN page when users ask in French.
3. The hreflang triplet is technically correct, but **canonical overrides hreflang** for indexation when they conflict.

**Counterexample (working correctly):** `/fr` homepage canonical/og:url/og:locale are all correct (`/fr` + `fr_CA`). So the bug is in the hub-page metadata builder, not in the locale layout.

**Likely location:** the hub `page.tsx` files (e.g. `src/app/fr/produits/page.tsx`) probably import EN metadata directly or reuse a shared `buildHubMeta()` helper that doesn't switch on locale. Confirm in Section 5/6 work.

### F4.1-A / F4.2-A — Meta description 2-10 chars over 160 (NIT)

Homepage descriptions:
- EN: 162 chars (2 over)
- FR: 170 chars (10 over)

Will be truncated mid-sentence in SERP previews. Trim to ≤155 for safety.

### N/A — `/materials` hub

Not a finding. The template intentionally collapses materials into products. Sitemap does not publish a /materials URL. Defensible.

### Carryover

- F2.4-A — `/fr/industries` 404 (sitemap-published). Re-confirmed: live route is `/fr/secteurs`.
- F3.3-B — Hub schema = BreadcrumbList only (no Organization). Re-confirmed on /products /industries /cities.

## Section 4 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 3 | F4.3-A, F4.4-A, F4.6-A (all instances of one systemic FR-hub canonical bug; root cause likely in shared metadata builder) |
| **NIT** | 2 | F4.1-A (EN homepage desc 162ch), F4.2-A (FR homepage desc 170ch) |
| **PASS rows** | 28 | All EN-side checks; FR triplet hreflang; H1 presence; section count; no markdown leak; titles all in spec |
| N/A | 2 | 4.5.1, 4.5.2 (no /materials hub by design) |

**Verdict for Section 4:** **FAIL on FR hubs** — canonical/og:url/og:locale
all wrong on every FR hub page is a deindex-tier P0. EN side is clean.
FR homepage is correct (so the locale layout works), proving the bug
sits in the shared hub-page metadata builder, not in the locale chrome.

---

**STOP — awaiting `NEXT` for Section 5 (Per-Page Metadata: Detail Pages — products, industries, materials, cities, keyword pages, statics).**
