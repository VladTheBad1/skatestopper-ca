---
type: audit-report
section: 6
title: Structure & Linking
factory_master_refs: §B.3
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 6 of 12 — Structure & Linking

## 6.1 Route Map & Locale Parity

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 6.1.1 | EN page.tsx count | **13** files: `[slug]/[service]`, `[slug]`, `about`, `blog/[slug]`, `blog`, `cities`, `contact`, `faq`, `industries`, `(home) page.tsx`, `privacy`, `products`, `terms` | ✅ |
| 6.1.2 | FR page.tsx count | **13** files: `[slug]/[service]`, `[slug]`, `a-propos`, `blogue/[slug]`, `blogue`, `conditions`, `confidentialite`, `faq`, `nous-joindre`, `(home) page.tsx`, `produits`, `secteurs`, `villes` | ✅ |
| 6.1.3 | Parity gap ≤2 | EN−FR = **0** | ✅ |
| 6.1.4 | EN routes missing FR mirror | 1:1 mapping verified — `about↔a-propos`, `blog↔blogue`, `blog/[slug]↔blogue/[slug]`, `cities↔villes`, `contact↔nous-joindre`, `industries↔secteurs`, `privacy↔confidentialite`, `products↔produits`, `terms↔conditions`. `faq` is intentional EN-cognate. Catch-alls `[slug]` and `[slug]/[service]` mirrored. | ✅ |
| 6.1.5 | FR routes use French slugs | All top-level FR dirs are French words; no untranslated EN slugs. | ✅ |

## 6.2 Orphan & Link Equity

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 6.2.1 | Homepage links to all major sections | 28 unique `/...` hrefs. Includes all 6 product slugs, all 6 industry slugs, `/cities`, `/blog`, `/about`, `/contact`, `/faq`, `/products`, `/industries`, `/privacy`, `/terms`, `/fr`. | ✅ |
| 6.2.2 | Header nav links | Code: `navLinks` array → Products, Industries, Cities, Resources/Blog, About, Contact + dropdowns (top 6 products, top 7 industries) + altLocale FR/EN + tel-link + REQUEST A QUOTE. `link-architecture-gate` counts **22** rendered links. **Missing FAQ link.** | ⚠️ F3.2-A (already filed) |
| 6.2.3 | Footer nav links | Code in `Footer.tsx`: top-N products, top-N industries, About, Resources/Blog, Contact, Privacy, Terms + tel/mailto. Gate counts **11**. **No FAQ link.** | ⚠️ Same F3.2-A |
| 6.2.4 | Every major section in header AND footer | Coverage matrix from live homepage: `/products` 5 hrefs, `/industries` 2, `/cities` 3, `/blog` 3, `/about` 2, `/contact` 5, `/faq` 1 (only HomeHero). All sections present somewhere on homepage; FAQ is the only minimally-linked one. | ⚠️ FAQ underlinked |
| 6.2.5 | Product pages link to cities/geo? | Live `/skate-stoppers` page hrefs include `/cities` (hub link) and all 6 industries — **but no specific city pages**. Source greps show city links go via `<Link href="/cities">` (HomeHero, CoverageMap, Header) and `cityList` arrays in cities/villes pages. **Geo cross-pages `/[city]/[service]` (140 URLs in sitemap) are only linked from city detail pages.** Product/industry pages do not link to top-N cities for that service. | ⚠️ **F6.2-A (NIT)** |

### Audit-runner gate evidence

**link-architecture-gate FAIL** — log says "Homepage missing 3 section links: /about, /privacy, /terms". **VERIFIED FALSE POSITIVE**: live homepage has 1 href to each (`/about`, `/privacy`, `/terms`), all routed through the Footer's `staticUrl('about'|'privacy'|'terms', locale)` helper. The gate parses raw `href="..."` strings in source files and misses helper-wrapped links. Real link architecture is healthy. **F6-runner-fp1**.

**nav-depth-gate FAIL** — log says "Faq MISSING" from header nav AND data-category "cities: 2" (clearly a parser bug — locations.ts has 48 cities). The FAQ-missing finding is **real** (re-confirms F3.2-A). The cities=2 count is a **false positive** in the gate's data parser. **F6-runner-real-FAQ-confirmed**.

## 6.3 URL Hygiene

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 6.3.1 | All sitemap URLs lowercase | grep `[A-Z]` against `<loc>` lines = **0** | ✅ |
| 6.3.2 | Hyphens not underscores | grep `_` = **0** | ✅ |
| 6.3.3 | No URL fragments for routing | grep `href="#` (excluding skip/anchor/scroll/sr-only) = empty | ✅ |
| 6.3.4 | Real 404 on bogus URL | `/totally-fake-page-12345` → **404**; `/fr/page-bidon-99` → **404** | ✅ |

## 6.4 Broken Link Spot Check

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 6.4.1 | 12 internal links from EN homepage | All 200: `/about`, `/blog`, `/cities`, `/commercial-real-estate`, `/condominiums-hoas`, `/contact`, `/faq`, `/fr`, `/government-heritage`, `/industries`, `/municipalities-parks`, `/privacy`. | ✅ 12/12 |
| 6.4.2 | 8 internal links from FR homepage | All 200: `/fr/a-propos`, `/fr/autorites-transport`, `/fr/blogue`, `/fr/bloque-skate`, `/fr/commerces-detail`, `/fr/conditions`, `/fr/confidentialite`, `/fr/coproprietes`. | ✅ 8/8 |

**Note:** the live-link spot check is clean. The dead `/fr/industries` and `/fr/contact` URLs from F2.4-A do **not** appear as outbound `<a href>` from any rendered page — they are emitted **only by the sitemap generator**. So crawlers will hit 404s, but human/internal nav won't.

---

## Section 6 Findings

### F6.2-A — Geo cross-pages under-linked from product/industry pages (NIT)

The site emits **140 `/[city]/[service]` geo cross-URLs** in sitemap.
These are linked only from city detail pages (e.g. `/toronto` → 6 geo
sub-pages). Product detail pages (`/skate-stoppers`,
`/skateboard-deterrents-for-handrails`) and industry detail pages
(`/municipalities-parks`) currently link to `/cities` hub but not to
specific cities for that service. Adding a "Available in these
Canadian cities" block to each product/industry page (5-10 top-pop
cities → `/[city]/[product-slug]`) would:

1. Distribute internal pagerank to geo pages (currently they receive
   pagerank only from sitemap + city pages).
2. Help Google/Bing surface geo-modifier queries.
3. Help AI engines understand the service-area model.

Effort: small — render a `<CityServiceLinks city-list>` component on
material/industry pages.

### F6-runner-fp1 — `link-architecture-gate` false-positive on `/about /privacy /terms`

The gate reports 3 missing homepage section links. Live HTML has all 3
(via Footer `staticUrl()` helper). Gate parses raw `href="..."` strings
in source files and doesn't follow helper functions. **No site fix
needed**; gate parser improvement candidate (out of scope for AUDIT).

### F6-runner-fp2 — `nav-depth-gate` data-size parser bug

Gate reports "cities: 2" while `locations.ts` actually has 48 cities. Doesn't
affect verdict (the gate's FAQ-missing finding stands), but is a parser
bug worth noting for the gate maintainer.

### Re-confirmations

- **F2.4-A** (sitemap publishes dead `/fr/industries` + `/fr/contact`) — the only sitemap-only URLs without rendered hrefs anywhere on the site. Crawlers will hit 404.
- **F3.2-A** (FAQ not in Header/Footer nav) — confirmed by independent gate.

## Section 6 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 0 | — |
| **NIT** | 1 | F6.2-A (geo cross-pages under-linked) |
| **PASS rows** | 14 | All routing parity, URL hygiene, broken-link spot checks |
| **Re-confirm** | 2 | F2.4-A (sitemap dead URLs), F3.2-A (FAQ orphaned from chrome nav) |
| **Gate FPs** | 2 | F6-runner-fp1 (helper-link parser), F6-runner-fp2 (cities count parser) |

**Verdict for Section 6:** **PASS-with-NIT** — perfect EN/FR locale
parity (13=13), all FR slugs French, clean URL hygiene (no uppercase,
no underscores, no hash routing), 20/20 spot-checked links return 200,
proper 404s on bogus URLs. The audit-runner failures on
`link-architecture` and `nav-depth` are 50/50: the FAQ-from-nav
finding is real (already filed as F3.2-A); the rest are gate parser
false positives. Real new finding is F6.2-A — under-linked geo
network (NIT, growth opportunity).

---

**STOP — awaiting `NEXT` for Section 7 (Content Quality — Products & Industries).**
