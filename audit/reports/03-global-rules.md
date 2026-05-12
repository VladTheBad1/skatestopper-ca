---
type: audit-report
section: 3
title: Site-Wide — Global Rules & Anti-Patterns
factory_master_refs: §B.1 (continued)
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 3 of 12 — Global Rules & Anti-Patterns

## 3.1 Positive Global Rules

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 3.1.1 | History API routing (no hash routing) | `grep window.location.hash` count = **0** | ✅ |
| 3.1.2 | Every link is `<a href>` (no onClick router pushes) | `grep onClick.*push|navigate|router\.` count = **0** | ✅ |
| 3.1.3 | JSON-LD server-rendered | 20 page files contain `application/ld+json` (in `src/app/**/page.tsx`, server components) | ✅ |
| 3.1.4 | Responsive (no UA branching) | Only `userAgent` matches are `src/app/robots.ts` (legitimate robots.txt config). No browser UA sniffing in components. | ✅ |
| 3.1.5 | No HowTo schema | grep count = **0** | ✅ |
| 3.1.6 | No `<meta name="keywords">` anywhere | grep in `src/app` = empty | ✅ |
| 3.1.7 | No LocalBusiness schema (Profile C — no verified address) | grep count = **0** | ✅ |

## 3.2 Anti-Patterns

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 3.2.1 | No cloaking / hidden text | After filtering legit (`sr-only`, modals, drawers, hover/focus, tooltips, transitions, etc.): **1** match — `src/components/PageHero.tsx:70` `<ChevronRight className="opacity-60" />` (decorative chevron, not hidden content). | ✅ |
| 3.2.2 | No keyword stuffing | Sample titles/descriptions: `/` "Skate Stoppers Engineered for Canada \| Skatestopper.ca", `/products` "Skate Stoppers & Anti-Skate Hardware \| Skatestopper.ca", `/skate-stoppers` "Skate Stoppers \| Skatestopper.ca", `/municipalities-parks` "Skate Stoppers for Municipalities & Parks \| Skatestopper.ca". Concise, varied, niche-aligned. | ✅ |
| 3.2.3 | No session IDs in URLs | grep `sessionId|session_id|sid=` in src = empty | ✅ |
| 3.2.4 | No redirect chains | `src/middleware.ts` is minimal — only `www.→non-www` 301 + `x-url` header injection. Documented inline that security headers belong in `next.config.ts`. No middleware-driven redirect chains. | ✅ |
| 3.2.5 | No duplicate titles across pages | 9 distinct hub/static titles in `src/app/(en)/**/page.tsx`; catch-all `[slug]/page.tsx` builds dynamic per-entity titles via `siteConfig.nicheShortEn` template. No duplicates. | ✅ |
| 3.2.6 | No untranslated FR slugs | All FR dirs use French: `a-propos`, `blogue`, `conditions`, `confidentialite`, `nous-joindre`, `produits`, `secteurs`, `villes`. (`faq` is intentional EN-cognate — same word in FR.) | ✅ |
| 3.2.7 | No orphan pages reachable only via sitemap | Header nav exposes Products, Industries, Cities, Resources/Blog, About, Contact (with Products + Industries dropdowns auto-populated from data). Footer adds Privacy, Terms, plus product/industry/about/blog/contact lists. **FAQ is reachable only via HomeHero inline link + sitemap** — not in Header or Footer nav. | ⚠️ **F3.2-A (NIT)** |
| 3.2.8 | No flat root namespace mixing entity types | Catch-all is `(en)/[slug]/page.tsx` → dispatches to material/industry/city/keyword-page/province via data lookup; sub-route `(en)/[slug]/[service]/page.tsx` handles geo cross-pages `/[city]/[service]`. This is FACTORY-MASTER's recommended flat-routing archetype. | ✅ |
| 3.2.9 | No soft-404 (200 on error page) | `/this-page-does-not-exist-xyz-zzz` → **404**; `/fr/page-inexistante-xyz` → **404**. `soft-404-gate` PASS in audit-runner. | ✅ |

## 3.3 Cross-Schema Patterns

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 3.3.1 | Max one FAQPage per page | Live counts: `/`=1, `/faq`=1, `/products`=0, `/skate-stoppers`=0, `/toronto`=0, `/skate-deterrents`=1. Code defines exactly one builder in `src/lib/seo.ts`. | ✅ |
| 3.3.2 | BreadcrumbList on non-home pages | Live coverage matrix (`@type` per page): see below. **Hubs and city pages: ✅. Geo cross-pages: ✅. Static pages: ✅. Keyword landing pages: ❌ MISSING.** | ❌ **F3.3-A** |
| 3.3.3 | JSON-LD valid JSON | Python `json.loads` on every block of /products, /about, /toronto, /skate-stoppers, /skate-deterrents — **0 invalid**. (Initial matrix run flagged `/about` "INVALID" — false positive: Organization wrapped in array `[{...}]`, my parser script choked but real JSON is valid.) | ✅ |

### Live JSON-LD Coverage Matrix

| Page                                            | HTTP | JSON-LD `@type`s |
|-------------------------------------------------|------|--------------------|
| `/`                                             | 200  | Organization, WebSite, FAQPage, WebPage |
| `/fr`                                           | 200  | Organization, FAQPage, WebPage |
| `/products`                                     | 200  | BreadcrumbList |
| `/industries`                                   | 200  | BreadcrumbList |
| `/cities`                                       | 200  | BreadcrumbList |
| `/blog`                                         | 200  | BreadcrumbList |
| `/faq`                                          | 200  | FAQPage, BreadcrumbList |
| `/about`                                        | 200  | Organization, BreadcrumbList |
| `/contact`                                      | 200  | Organization, BreadcrumbList |
| `/skate-stoppers` (material detail)             | 200  | Service, BreadcrumbList |
| `/municipalities-parks` (industry detail)       | 200  | Service, BreadcrumbList |
| `/toronto` (city detail)                        | 200  | Organization, WebPage, BreadcrumbList |
| `/ontario` (province detail)                    | 200  | BreadcrumbList |
| `/toronto/skate-stoppers` (geo material)        | 200  | Organization, BreadcrumbList, FAQPage |
| `/vancouver/transit-authorities` (geo industry) | 200  | Organization, BreadcrumbList, FAQPage |
| **Keyword pages (all 9 sampled)**               | 200  | **FAQPage only** — missing BreadcrumbList + Organization |
| Provinces (10/10 served)                        | 200  | BreadcrumbList only — missing Organization |
| Hubs (`/products`, `/industries`, `/cities`, `/blog`) | 200 | BreadcrumbList only — missing Organization |

## Section 3 Findings

### F3.3-A — Keyword pages missing BreadcrumbList AND Organization (SHOULD)

All 9 keyword landing pages emit **only** `FAQPage`. They lack:
- **BreadcrumbList** — hurts Google "breadcrumb-rich" SERP eligibility for these high-intent commercial pages.
- **Organization** — weakens the entity-trust signal that AI engines (Perplexity, ChatGPT) use to attribute citations to a verified brand. Per the project's GEO/AI-citation goal, this is the wrong tradeoff on the most-targeted pages.

Affected: `/skate-deterrents`, `/anti-skateboard-devices`,
`/skateboard-grind-deterrents`, `/skate-stops`, `/skateboard-stoppers`,
`/no-skateboarding-signs`, `/stainless-steel-skateboard-deterrents`,
`/skateboard-deterrents-for-walls`, `/decorative-skate-stoppers`.

### F3.3-B — Hub & province pages missing Organization (SHOULD)

`/products`, `/industries`, `/cities`, `/blog`, and all 10 province
pages (`/alberta`, `/british-columbia`, …, `/yukon`) emit **only**
`BreadcrumbList`. No Organization on these very-high-pagerank hub
pages.

**Root cause hypothesis:** Organization JSON-LD is built per-page in
templates (homepage, /toronto, /about, /contact, geo-cross), not
injected sitewide via root layout. Hubs and keyword pages were missed
during template assembly.

### F3.2-A — FAQ not reachable from Header or Footer nav (NIT)

`/faq` is sitemapped, indexed, and emits Service-grade JSON-LD, but:
- `src/components/Header.tsx` nav: **no FAQ link**
- `src/components/Footer.tsx` link list (lines 49-77, 113-116): **no FAQ link**
- Only entry point in UI: `src/components/home/HomeHero.tsx:56` inline `<Link href="/faq">FAQ</Link>`

Not technically orphaned, but underlinked for a page targeting "skate stopper FAQ" search.

## Section 3 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 0 | — |
| **SHOULD** | 2 | F3.3-A (keyword pages missing BreadcrumbList + Organization), F3.3-B (hubs + provinces missing Organization) |
| **NIT** | 1 | F3.2-A (FAQ not in Header/Footer nav) |
| **PASS rows** | 16 | All other checks |

**Verdict for Section 3:** **CONDITIONAL** — anti-patterns and global
rules are clean (no hash routing, no UA sniffing, no LocalBusiness, no
HowTo, no soft-404). Real issues are schema-coverage gaps on hub and
keyword pages — these are SHOULD-fixes that materially affect GEO/AI
citation quality, the project's explicit goal.

---

**STOP — awaiting `NEXT` for Section 4 (Per-Page Metadata: Homepage + Hubs).**
