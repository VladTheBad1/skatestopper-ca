---
type: audit-report
section: 9
title: Images
factory_master_refs: §4.6-4.8, §5.6
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 9 of 12 — Images

## 9.1 Image File Integrity

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 9.1.1 | Total image count | **64 images** in `public/images/`: 63 .webp + 1 .png. Folders: `cities/`, `hero/`, `industries/`, `products/`. | ✅ |
| 9.1.2 | Zero 0-byte images | `find -empty` count = **0** | ✅ |
| 9.1.3 | No images <10 KB | count = **0** | ✅ |
| 9.1.4 | No images >500 KB | **3 hits**: `canada-map.png` (1.44 MB), `skateboard-deterrents-for-concrete.webp`, `skateboard-deterrents-for-handrails.webp` (both 1600×2134 tall-aspect). | ⚠️ **F9.1-A (NIT)** |
| 9.1.5 | Product/industry images ≥1200 px wide | All product webps: **1600 px** wide. All industry webps: 1600-1880 px. **All ≥1200.** | ✅ |

## 9.2 Image Coverage

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 9.2.1 | `images.ts` exists with entries | 4556 bytes; declares `Record<string, Record<string, ImageData>>` with `hero`, `products`, `industries` namespaces; each entry has `src`, `alt: {en, fr}`, `width`, `height`. | ✅ |
| 9.2.2 | Every referenced /images/ path resolves | 11 unique `/images/...` strings in `images.ts`; **0 missing** on disk. | ✅ |
| 9.2.3 | Every product has an image | 6/6 products have `public/images/products/{slug}.webp`. | ✅ |
| 9.2.4 | Every industry has an image | 7/7 industries have `public/images/industries/{slug}.webp`. | ✅ |

## 9.3 City Images

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 9.3.1 | City images in site | `public/images/cities/` contains **48 `<slug>-hero.webp` files** (abbotsford-hero.webp, barrie-hero.webp, …, winnipeg-hero.webp). | ✅ |
| 9.3.2 | Shared cities DB available | `~/beast/projects/business/websites/shared/images/cities/` exists with **137 entries** (large catalog reservoir). | ✅ |
| 9.3.3 | Site's 48 cities — image coverage | Initial check missed because filename pattern is `{slug}-hero.webp` not `{slug}.webp`. After re-check: **48/48 cities have a hero webp**. 100% coverage. | ✅ |
| 9.3.4 | City images ≥1200 px wide | Sample of 5: all **1280×~850 px**. Above 1200 px threshold but smaller than product images (1600 px). Acceptable. | ✅ |

## 9.4 Alt Text Quality (§4.7)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 9.4.1 | Alt texts descriptive (not just slug) | Sample 5 from images.ts: *"Granite ledge along a Canadian downtown plaza — the kind of edge skate stoppers protect from grind damage"*; *"Stainless saddle-stop skateboard deterrents clamped on round handrails along a granite staircase in Canada"*. Real scene-descriptive prose. | ✅ |
| 9.4.2 | Alt texts include niche keyword | **11/11 EN alts** in images.ts contain a niche term (skate stopp / deterrent / anti-skate / grind). | ✅ |
| 9.4.3 | Alt texts include country/Canada | **7/11 EN alts** mention "Canada/Canadian". | ✅ |
| 9.4.4 | FR alt texts exist | **11/11** entries in images.ts have `alt.fr` populated with French scene description. | ✅ |
| 9.4.5 | City image alt = city + niche | Live HTML sample (8 cities): *"Downtown {City}, {Province} — commercial plaza context where stainless skate stoppers and skateboard deterrents are installed on ledges, benches, and handrails"*. **Same template for all 48** — only `{City}, {Province}` token varies. | ⚠️ Acceptable per spec (every alt has city + niche), but template-uniformity weakens image-SEO uniqueness. |
| 9.4.6 | No duplicate alt texts | images.ts: **0 duplicate EN alts**. Live city alts: 48 distinct (because city name varies). | ✅ |

### F9.4-A — `hero-alt-gate` FAIL: slug-reformatted alt antipattern (P0)

`audit/logs/hero-alt-gate.log` flags 4 component files using bare data
field as alt (FACTORY-MASTER §4.7.11a violation):

| File | Line | Pattern |
|---|---:|---|
| `src/components/pages/IndustryDetailPage.tsx` | 163 | `alt={industry.name}` |
| `src/components/pages/IndustryDetailPage.tsx` | 365 | `alt={p.name}` |
| `src/components/pages/BlogPostPage.tsx` | 97 | `alt={rp.title}` |
| `src/components/pages/CityDetailPage.tsx` | 214 | `alt={p.name}` |

These render alts like `alt="Skate Stoppers"` instead of the scene-
descriptive prose stored in `images.ts` (e.g., *"Skate stoppers
installed on a granite planter wall…"*). Fix per gate guidance:

```ts
const productAlt = (slug, locale, fallback) =>
  images.products[slug]?.alt[locale] ?? fallback
<Image alt={productAlt(service.slug, locale, service.name)} ... />
```

Reference: `~/beast/.soma/amps/muscles/geo-page-uniqueness.md`.

## 9.5 next/image Usage (§5.6)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 9.5.1 | Uses `next/image`, not raw `<img>` | grep for `<img ` in src/ excluding next/image and comments → **0 matches**. | ✅ |
| 9.5.2 | Hero images have `priority` | `src/components/PageHero.tsx:41 priority` and `src/components/home/HomeHero.tsx:45 priority`. Both LCP candidates. | ✅ |
| 9.5.3 | Below-fold images lazy loaded | `loading="lazy"` set explicitly on 5 components: `(en)/blog/page.tsx:57`, `fr/blogue/page.tsx:56`, `home/SolutionsSection.tsx:48`, `ProductCard.tsx:34`, `IndustryCard.tsx:28`. (Default next/image behavior is lazy unless `priority`.) | ✅ |

## 9.6 Placeholder Detection (§4.8b)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 9.6.1 | No CSS gradient heroes substituting real images | grep `gradient.*hero|hero.*gradient` in components → **0 matches**. | ✅ |
| 9.6.2 | No placeholder/stock indicators | All `placeholder=` matches are legitimate input-form attributes in `ContactForm.tsx` (`placeholder={labels.nameHint}`, `placeholder="email@example.com"`, etc.). No `unsplash`/`stock` references. | ✅ |

---

## Section 9 Findings

### F9.4-A — hero-alt-gate fail: 4 components use slug as alt text (P0)

`IndustryDetailPage.tsx` (×2), `BlogPostPage.tsx`, `CityDetailPage.tsx`
use `alt={industry.name}` / `alt={p.name}` / `alt={rp.title}` patterns.
Per FACTORY-MASTER §4.7.11a, alt text MUST come from `images.ts`
(scene-descriptive) and never be slug-reformatted. The data file
already contains rich alts; the components just don't read them.

Fix is ~5 lines per component (helper + reference). Re-link to
`images.products[slug]?.alt[locale]` with the existing `<name>` as
fallback.

### F9.1-A — Three oversized images (NIT)

- `canada-map.png` 1.44 MB → convert to WebP/AVIF (target <250 KB).
- `skateboard-deterrents-for-concrete.webp` and `…-handrails.webp`
  both 1600×2134 (tall-aspect product shots) push past 500 KB. Consider
  serving at 1200×1600 for hero use, or accept as-is given they're
  detail-product images that need resolution.

### F9.4-B — City image alts are templated (NIT, observation)

All 48 city pages render `alt="Downtown {City}, {Province} —
commercial plaza context where stainless skate stoppers…"`. Spec is
satisfied (every alt has city + niche), and uniqueness is technically
preserved by the city/province token. But for image-SEO maximum
strength, ideally each city's alt mentions a city-specific landmark
or hardscape style (e.g., *"Toronto's Yonge-Dundas Square ledges
where stainless skate stoppers prevent grind damage"*). Borderline
finding — defer to growth backlog.

## Section 9 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 1 | F9.4-A (hero-alt-gate fail: 4 components use slug as alt; bypasses scene-descriptive alts in images.ts) |
| **NIT** | 2 | F9.1-A (3 oversized images), F9.4-B (templated city alts) |
| **PASS rows** | 18 | All file integrity, coverage, dimensions, FR alts, niche-keyword density, no duplicates, next/image discipline, no gradient/stock placeholders |

**Verdict for Section 9:** **CONDITIONAL.** Image inventory is
production-quality: 64 webp files, 100% coverage of products/industries
/cities, all dimensions ≥1200 px wide, scene-descriptive alts (with
niche keywords + Canada mentions) authored in `images.ts`. **The one
real defect is the components don't actually read those alts** — they
fall back to slug names. Fix is small but ship-blocking per §4.7.11a.

---

**STOP — awaiting `NEXT` for Section 10 (Performance & Build).**
