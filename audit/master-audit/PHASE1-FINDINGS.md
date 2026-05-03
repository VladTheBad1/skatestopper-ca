# FACTORY-MASTER Audit — skatestopper-ca

**Audit date:** 2026-05-02
**FACTORY-MASTER version:** v1.3 (1900 lines)
**Site state:** Phases 1-3 = done in STATUS.json; Phases 4-7 = pending
**Mode:** AUDIT (existing built site)
**Profile:** C (nation-wide bilingual EN/FR — Organization + Service)

---

## 0. Headline scoreboard

| Source | Result |
|--------|--------|
| `audit-runner.sh` (75 individual gates) | **75 pass / 0 fail** |
| `phase1-gate.sh` (composite) | **34 pass / 17 fail** |
| `slug-search-volume-gate.sh` (P0) | ✅ PASS — 6/6 product slugs validated |
| `slug-intent-gate.sh` | ✅ PASS |
| `slug-collision-gate.sh` | ✅ PASS — 63 slugs, 0 collisions |
| `slug-fr-completeness-gate.sh` | ✅ PASS |
| `dataforseo-research-gate.sh` | ✅ PASS — $0.16 spend logged |

**Bottom line:** the runtime site passes every individual quality gate. The Phase 1 fails are real but mostly fall into two buckets:
1. **Blueprint-vs-runtime drift** (gates read stale stub files; runtime has the full data)
2. **Genuine research depth gaps** that will hurt SEO/GEO at scale

---

## 1. Phase 1 (Research) — gap detail

### 1A. Blueprint-vs-runtime drift (lower priority — fix during Phase 7 ship)

| Check | Blueprint shows | Runtime shows | Note |
|-------|-----------------|---------------|------|
| 1.1.6 | 35 keywords w/ volume | 47 verified (`evidence/keywords_verified.json`) | runtime OK |
| 1.1.7 | 0/133 have `source: dataforseo` | n/a | annotation gap only |
| 1.5.1 (cities) | 15 in `cities.json` | 45 in `src/data/locations.ts` | **still under 48** |
| 1.5.3 (provinces) | 6 | 11 (incl. Yukon) | runtime OK |
| 1.8.3-4 (translation keys) | 12 each in JSON | 200+ in `src/data/translations.ts` | runtime OK |

### 1B. Genuine research depth gaps (P1 — fill before claiming Phase 1 complete)

| ID | MUST | Status | Action |
|----|------|--------|--------|
| 1.2.2 / 1.2.3 | Yes | ❌ 0/15 competitors have `wordCount/strengths/weaknesses` | Enrich top 5 from `evidence/competitor-extract.json` (already fetched) |
| 1.2b.1 / 1.2b.2 / 1.2b.3 | Yes | ❌ No `services[]`, no matrix file | BC Site Service has 6+ products extracted → write matrix |
| 1.3.1 / 1.3.5 | Yes | ❌ 6 products, need 8+ | Add 2 from validated list below |
| 1.4.1 | Yes | ❌ 7 industries, need 8+ | Add 1 (recommendation: `airports-rail-stations` or `colleges-cegeps-fr`) |
| 1.5.1 | Yes | ❌ 45 cities, need 48+ | Add 3 — recommend Whitehorse already there, add Iqaluit/Yellowknife/Charlottetown-PE check |
| 1.8.9 | Yes | ❌ Only 1 Canadian-FR marker | Add 2nd of {soumission, courriel, magasiner} to FR translations |

### 1C. Brave SERP enrichment (executed this audit)

8 SERP queries executed (5 EN + 3 FR, country=CA), 53 unique non-junk domains discovered.
Files: `evidence/brave/*.json`, merged: `evidence/brave/_merged-domains.json`.

**Real Canadian/EU competitors not in `competitors.json`:**

| Domain | Hits | Type | Page extracted |
|--------|------|------|---------------|
| seton.ca | 4 | CA reseller — handrail prevention devices | (page is JS-rendered, 768B static — needs Brave/Playwright fetch) |
| maglin.com | 4 | CA — Series 300 anti-skate device, bench-mount | URL pattern needs adjustment |
| bcsiteservice.com | 2 | **CA — strongest direct competitor** — 6 product variants extracted | ✅ `evidence/competitor-pages-v2/bcsite.html` (127KB) |
| preventer.ca | 2 | CA — already in competitors.json | ✅ extracted |
| grindtoahalt.com | 2 | US — GrinderMinders product line | ✅ extracted |
| openspace-urbain.fr, normequip.com, gtsm.ch, urbastyle.com, design-espaces.fr | FR/EU site furniture w/ anti-skate | reference for FR copy |

**BC Site Service product taxonomy** (from H2/H3 extraction):
- Flat Radius Anti-Skateboard Guards
- Raised Diamondback Handrail Guards
- Raised Block Anti-Skateboard Guards
- 45 Degree Chamfer Anti-Skateboard Guards
- Rounded Radius (0.5″) Anti-Skateboard Guards
- Rounded Bullnose (1″) Anti-Skateboard Guards
- "No Skateboarding Allowed" 12″ × 18″ Safety Sign

### 1D. DataForSEO keyword expansion (executed this audit)

`keywords_for_keywords` on 5 seeds → 106 keywords returned, 97 with vol ≥ 10. Cost: **$0.075**.
Saved: `evidence/dfs/kw-expand-2026-05-02.json`.

**New product slug candidates (validated by DFS volume):**

| Candidate slug | Search query | Vol/mo | Verdict |
|---------------|-------------|--------|---------|
| `skateboard-deterrents-for-walls` | "skateboard deterrents for walls" | 10 | ✅ ADD — fills gap |
| `stainless-steel-skateboard-deterrents` | "stainless steel skateboard deterrents" | 10 | ✅ ADD — material variant |
| `skate-deterrents-canada` | "skate deterrents" | 20 | ⚠ HEAD term — better as keyword landing page than product |
| `anti-skate-deterrents` | "anti skate deterrents" | 10 | ⚠ overlaps existing — use as alias/canonical |

Adding **walls** + **stainless-steel** brings products to 8 → satisfies 1.3.1 MUST.

---

## 2. Image audit (Phase 4 + B.4 preview)

### 2A. City heroes — coverage

- **45/45 cities have `<slug>-hero.webp` on disk** (`public/images/cities/`) ✅
- Shared library: 52 webp files at `~/beast/assets/city-images/`
- 39/45 of our cities match shared-library names directly; 6 (greater-sudbury, prince-george, richmond-bc, saguenay, st-johns-nl, whitehorse) sourced separately
- Dimensions: 1280×854 typical, largest 1600×937
- Sizes: 51KB (toronto, whitehorse) — 502KB (mississauga). **Mississauga + Richmond-BC + Kitchener at ~500KB are ~10× the median** → re-encode at quality 78–82 to land in 80–150KB band
- Images on ship-pending cities (3+ to be added to hit 48): need to verify they exist in shared library

### 2B. Image rendering — **P0 finding**

**City hero is a CSS `background-image`, NOT an `<img>` / `next/image`.**

```
GET /toronto:
  img-like total: 0
  background-image els: [{ tag: SECTION, bg: url(".../toronto-hero.webp") }]
```

Implications:
- ❌ Zero `<img alt>` on city pages → invisible to Google Images
- ❌ No `next/image` responsive sizes → wastes ~400KB on mobile (serves 1280px to 375px viewport)
- ❌ Not part of crawlable content; no schema ImageObject signal
- ❌ Loses LCP optimization (background-image is not LCP-eligible without preload)

This was confirmed only on city pages in this pass. Product/industry/blog/home pages all use real `<img>` with `next/image`. The PageHero component renders `<img>` elsewhere — **city template is the outlier**. Likely a stale variant of PageHero or inline implementation.

**Action:** rewrite city hero rendering to use `next/image fill` + `priority` + descriptive alt — same pattern PageHero uses on `/skate-stoppers`, `/condominiums-hoas`, etc. Add specific city alt: `"Anti-skateboard deterrent installation site context: <City Name>, <Province> downtown core"`.

### 2C. Alt-text quality audit (rendered DOM scan)

| Route | imgs | missingAlt | genericAlt | Verdict |
|-------|------|------------|------------|---------|
| `/` | 7 | 1 | 0 | 1 missing — likely logo or decorative |
| `/toronto` | **0** | n/a | n/a | **P0 — see 2B** |
| `/skate-stoppers` | 1 | 0 | 0 | ✅ great alt: "Skate stoppers installed on a granite planter wall…" |
| `/condominiums-hoas` | 1 | 0 | 1 | ⚠ alt is just "Condominiums & HOAs" — should describe the photo |
| `/blog` | 4 | **4** | 0 | **P0 — every blog card image missing alt** |
| `/cities` | (not measured) | | | run next pass |

### 2D. Other image quality concerns to verify next pass

- Product images: `1600×1200` and `1600×2134` served — verify `next/image sizes=` is set so mobile gets ≤640px variant, not full 1600
- Industry images: 5 authentic, 2 placeholders (government-heritage, transit-authorities) per prior session log
- Sitemap.xml entries for `/images/sitemap-images.xml` (Image SEO) — verify exists

---

## 3. Other gates spot-checked clean (no action)

- typography-gate ✅ (`@tailwindcss/typography` installed; prose plumbed)
- rsc-markdown-leak-gate ✅ (no `**bold**` literals in HTML/RSC payload/JSON-LD)
- title-length-gate ✅
- nav-completeness, hero-presence, hamburger-ssr, mobile-viewport-audit, locale-lang-attr, og-image-resolves, schema, schema-antipattern, sitemap-hygiene — all ✅

---

## 4. Recommended fix order (priority queue)

| # | Fix | Effort | Phase | Source |
|---|-----|--------|-------|--------|
| 1 | Convert city hero from CSS background-image to `next/image` + descriptive alt | 30min | 3.5b2 + 4.7 | this audit, 2B |
| 2 | Add alt text to 4 blog card images | 15min | 4.7 | this audit, 2C |
| 3 | Add 2 new products: walls + stainless-steel; data + content + slug-volume validate | 1.5hr | 1.3 + 2.2 | this audit, 1D |
| 4 | Add 1 new industry to hit 8+ | 30min | 1.4 + 2.3 | phase1-gate 1.4.1 |
| 5 | Add 3 new cities to hit 48+; ensure hero images sourced | 1hr | 1.5 + 4.6 | phase1-gate 1.5.1 |
| 6 | Re-encode 3 oversized city heroes (Mississauga, Richmond-BC, Kitchener) at q78 | 10min | 5.6 + B.4 | this audit, 2A |
| 7 | Enrich `competitors.json` with `wordCount/strengths/services[]` for top 5 (data already in `evidence/competitor-extract.json`) + write `competitor-services-matrix.json` | 45min | 1.2 + 1.2b | phase1-gate 1.2.2/1.2b.1-3 |
| 8 | Improve industry-card alt: "Condominiums & HOAs" → photo description | 15min | 4.7 | this audit, 2C |
| 9 | Add 2nd Canadian-FR marker word to translations | 15min | 1.8 | phase1-gate 1.8.9 |

**Total: ~5–6 hours of focused work** before Phase 4/5/7 can ship cleanly.

---

## 5. Next phases of THIS audit (not yet executed)

- [ ] **B.1 Site-Wide Checks** (root layout, locale layout, robots.txt, sitemap.xml, public assets, global rules, schema cross-checks, GEO/LLM optimization, Search Console)
- [ ] **B.2 Per-Page-Type Checks** (homepage, product, city hub, geo, blog, contact — each archetype's universal template)
- [ ] **B.3 Structure & Linking** (route map + locale parity, orphan/link equity, URL hygiene, redirects, sitemap ↔ HTML cross-check)
- [ ] **B.4 Performance & Accessibility** (Core Web Vitals via Lighthouse, image optimization deep-dive, WCAG 2.1 AA)
- [ ] **B.5 Conversion UX** (CTA placement, forms, phone, trust)
- [ ] **B.6 Quality Gate Composite** (final verdict)
- [ ] Phase-by-phase composite gates (`phase2-gate.sh` … `phase7-gate.sh`)

This document is the live audit ledger. Append; don't rewrite.

---

## 6. Fixes shipped (this audit pass)

| # | Fix | Files | Result |
|---|-----|-------|--------|
| 1 | PageHero: CSS background-image → next/image fill + alt | src/components/PageHero.tsx | ✅ /toronto now has 1 real `<img>` with descriptive alt |
| 2 | HomeHero: same conversion + `priority` + `fetchPriority="high"` | src/components/home/HomeHero.tsx | ✅ LCP-eligible hero |
| 3 | ApplicationsSection: per-industry photo with content-describing alt | src/components/home/ApplicationsSection.tsx | ✅ 7 industry tiles render real `<img>` |
| 4 | City PageHero: city-specific descriptive alt | src/components/pages/CityDetailPage.tsx | ✅ "Downtown {City}, {Province}…" |
| 5 | Product PageHero: product-context alt | src/components/pages/ProductDetailPage.tsx | ✅ |
| 6 | Industry PageHero: industry-context alt | src/components/pages/IndustryDetailPage.tsx | ✅ |
| 7 | About PageHero: descriptive alt | src/components/pages/AboutPage.tsx | ✅ |
| 8 | Blog PageHero: post-context alt | src/components/pages/BlogPostPage.tsx | ✅ |
| 9 | Blog listing cards: alt={post.imageAlt or post.title} | src/app/(en)/blog/page.tsx + src/app/fr/blogue/page.tsx | ✅ /blog 4/4 alts present |
| 10 | IndustryCard listing: descriptive alt | src/components/IndustryCard.tsx | ✅ |
| 11 | Re-encoded 8 oversized city heroes at q78/1280px | public/images/cities/*-hero.webp | ✅ saved ~1.7MB total (502K→160K Mississauga; 8 cities optimized) |
| 12 | Enriched competitors.json with wordCount/headings/services from extracted data | competitors.json (15→23) | ✅ + brave-discovered domains added |
| 13 | Generated competitor-services-matrix.json | evidence/competitor-services-matrix.json | ✅ 7 unique services mapped |
| 14 | Added new keyword landing page: stainless-steel-skateboard-deterrents | src/data/keyword-pages.ts | ✅ /stainless-steel-skateboard-deterrents (10/mo) live, FR alternate /fr/dissuasifs-anti-planche-en-inox |
| 15 | Verified /skateboard-deterrents-for-walls (10/mo) already live | (existing) | ✅ HTTP 200 |

**Per user direction:** no new products, no new industries added.
**Validated keywords now in SEO surfaces:**
- "stainless steel skateboard deterrents" (10/mo) → new dedicated landing page + 304 vs 316L H2 + product cross-links
- "skateboard deterrents for walls" (10/mo) → already had landing page

**Image performance recap (top 5 city heroes after re-encode):**
- Charlottetown 245K · London 239K · Abbotsford 227K · Kelowna 227K · Hamilton 206K
- All others <200K. Average city hero now ~120K (was ~250K)

**Audit-runner re-run after all fixes: 75 pass / 0 fail.**


---

## 7. B.1 Site-Wide Checks — RESULTS

| Check | Verdict |
|-------|---------|
| `<html lang>` server-rendered (en-CA / fr-CA) | ✅ |
| viewport meta correct | ✅ |
| Forbidden meta tags (keywords, noarchive, etc.) | ✅ none |
| Robots meta with `max-image-preview:large` etc. | ✅ via googlebot-specific tag |
| Favicon | ⚠ Was 404 on `/favicon.ico` → ✅ FIXED (added .ico in addition to .svg) |
| Organization + WebSite JSON-LD on homepage | ✅ |
| WebSite SD only on canonical root | ⚠ Was on /fr too → ✅ FIXED (`includeWebSite: false`) |
| Hreflang `<link>` tags (all locales + x-default) | ✅ |
| robots.txt — Sitemap directive, allow CSS/JS, allow GPTBot | ✅ |
| sitemap.xml — UTF-8, absolute https, no priority/changefreq | ✅ 1350 URLs |
| llms.txt at root with structured site summary | ✅ 34 lines, what/who/procurement/contact |

## 8. Schema validation (per-page-type)

| Page | Before | After |
|------|--------|-------|
| `/` | Org + WebSite + WebPage + FAQPage | (unchanged) ✅ |
| `/fr` | Org + WebSite (DUP) + … | Org + WebPage + FAQPage (no WebSite dup) ✅ |
| `/toronto` (city) | BreadcrumbList + Org + WebPage | (unchanged) ✅ |
| `/skate-stoppers` (product) | Service + AggregateOffer + Breadcrumb | ✅ |
| `/condominiums-hoas` (industry) | **Breadcrumb only** | **Service + Org + Country + Breadcrumb** ✅ NEW |
| `/fr/coproprietes` etc. | Breadcrumb only | Service + Org + Country + Breadcrumb ✅ NEW |

Industries previously had no Service schema → added `buildIndustryServiceSchema(industry, locale)` to `src/lib/seo.ts` and wired into `(en)/[slug]/page.tsx` + `fr/[slug]/page.tsx`. Profile C MUST satisfied.

## 9. Title / meta length scan (post-fix)

All 7 keyword landing pages had **double brand suffix** (`| SkateStopper.ca | Skatestopper.ca`) and titles 73–104 chars. Fixed:
- Stripped redundant brand from data file (12 string replacements)
- Trimmed long titles so final rendered title ≤60 chars (5 of 7 needed trim)
- Industry meta description bug: `industry.name.toLowerCase()` was lowercasing acronyms ("Condominiums & HOAs" → "condominiums & hoas") → fixed to preserve casing in EN + FR
- New stainless-steel keyword page title/desc trimmed: 104→55 chars title, 197→150 chars desc

## 10. GEO / LLM optimization

| Check | Verdict |
|-------|---------|
| llms.txt present + structured | ✅ |
| Entity-first paragraph on key pages | ✅ (H1 contains entity) |
| FAQPage schema on home + faq + relevant pages | ✅ |
| Anchor IDs on h2/h3 for chunk-friendly deep-linking | ⚠ Markdown-rendered headings ✅ added; page-template H2s (SectionHeader) still no IDs |
| Country-specific data + bilingual variants | ✅ |

`src/lib/markdown.ts` and `src/lib/prose-renderer.tsx` now slugify headings and emit `id="…"`. Blog posts, keyword pages, and city/product description sections now have anchor IDs.

## 11. B.3 Structure & Linking — RESULTS

- Total URLs in sitemap: **1350** (1 EN home + 1 FR home + 9 EN static + 7 FR static + 661 EN city/product/etc. + 663 FR + 4 EN blog + 4 FR blog)
- Locale parity: balanced ✅
- Sample of 30 sitemap URLs all returned 200 ✅
- Sample of 12 homepage internal links all 200 ✅
- Canonical tags present and self-referencing on every spot-checked page ✅

## 12. B.4 Performance & Accessibility — RESULTS

- HTML page sizes: 66–143 KB (well under 2 MB cap)
- JS chunks: 794 KB total (largest single 221 KB)
- 61 image files / 13 MB total in `public/images/`
- `mobile-viewport-audit-gate`: ✅ PASS
- `accessibility-gate`: ✅ PASS (lang, skip link, landmarks, form labels, decorative aria-hidden, no outline:none)
- `alt-text-gate`: ✅ PASS

## 13. B.5 Conversion UX — RESULTS

- 5–7 contact CTAs per page (good range)
- 3 `tel:` links per page (header + body + footer)
- Contact form: name, email, phone, city, message
- Trust signals: AODA, bonded, stamped engineering visible
- `floating-cta-style-gate`: ✅
- `contact-trust-strip-gate`: ✅
- `cta-density-gate`: ✅

## 14. Phase composite gate scoreboard (post-fix)

| Phase | Pass | Fail | Notes |
|-------|------|------|-------|
| 1 Research | 34 | 17 | Mostly blueprint-vs-runtime drift (cities.json stub vs locations.ts runtime). Real gaps: city/industry counts, competitor enrichment depth |
| 2 Content | 38 | 18 | Word-count thinness on 4 industries, 3+ cities, 16 FAQs, 8 keyword pages. Sampled blueprint files, not runtime which is richer |
| 3 Assembly | 53 | **1** | Was 4. Fixed: package name + 12 TS errors. Remaining = template-validation meta-gate |
| 4 Images | 20 | 8 | Real: 7 duplicate-image slots (same photo in multiple slots); 2 city alts without province name. Rest = missing image-plan tracking files |
| 5 Design | 23 | 15 | False positives — looks for legacy template components (HeroSection, CTABanner, etc.) we replaced with our own (HomeHero, integrated footer band) |
| 6 QA | 44 | 4 | False positives on JSON-LD count regex (gate sees 1 block, real count is 4) and hreflang count |
| 7 Ship | 4 | 5 | Expected — site not live yet, no DNS, 118 uncommitted files |

**`audit-runner.sh` (75 individual gates): 75 / 0 ✅**

