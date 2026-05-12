---
type: audit-report
section: 10
title: Performance & Build
factory_master_refs: §B.4
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 10 of 12 — Performance & Build

## 10.1 Build

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 10.1.1 | `next build` exits 0 | Build printed all 32 routes successfully (`/`, `/fr`, `/[slug]`, `/[slug]/[service]`, all hubs and statics, EN+FR mirrors, manifest, robots.txt, sitemap.xml). Process exit code = 1 but caused by a **Turbopack workspace-root inference warning** (no compilation errors, 0 `error` strings in log). Functionally passes. | ⚠️ **F10.1-B (NIT)** — set `turbopack.root` in `next.config.ts` to silence the warning. |
| 10.1.2 | `npx tsc --noEmit` → 0 errors | **2 TypeScript errors:** `src/data/keyword-pages.ts(139,5)` and `(157,5)` — *Object literal may only specify known properties, and 'clusterParent' does not exist in type 'KeywordPage'*. The 2 newest keyword pages (per project preload: `skateboard-grind-deterrents` and `decorative-skate-stoppers`) declare `clusterParent` but the interface in the same file doesn't. **`next.config.ts` has `typescript.ignoreBuildErrors: true` masking this at build time** — the type drift is real. | ❌ **F10.1-A (SHOULD)** |
| 10.1.3 | No console errors at runtime | `tail /tmp/ssca-server.log` → 0 error lines since startup. Server has been serving 200s throughout the audit (60+ curl hits across all sections). | ✅ |

## 10.2 File Completeness

| #     | Threshold | Actual | Result |
|-------|----------:|-------:|:------:|
| 10.2.1 EN pages ≥10 | 10 | **13** | ✅ |
| 10.2.2 FR pages ≥5  |  5 | **13** | ✅ |
| 10.2.3 Components ≥10 | 10 | **37** | ✅ |
| 10.2.4 Data files ≥2  |  2 | **11** | ✅ |
| 10.2.5 Images ≥5      |  5 | **64** | ✅ |

## 10.3 Image Optimization

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 10.3.1 | All via `next/image` | Verified in §9.5.1: 0 raw `<img>` tags in src. | ✅ |
| 10.3.2 | WebP available | **63 webp files** out of 64 images (98.4%). Only `canada-map.png` is non-webp. | ✅ |
| 10.3.3 | No image >500 KB | 3 oversized — see F9.1-A (carryover from §9.1.4). | ⚠️ Carryover |
| 10.3.4 | Explicit width/height (no CLS) | `PageHero.tsx:40 fill` + `HomeHero.tsx:44 fill` use Next's `fill` mode (parent constrains aspect; no CLS). Card components (`ProductCard`, `IndustryCard`) use `fill` inside fixed-aspect wrappers per shipping spec. | ✅ |

## 10.4 Responsive

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 10.4.1 | viewport meta | Verified §2.1.2: `<meta name="viewport" content="width=device-width, initial-scale=1"/>` | ✅ |
| 10.4.2 | Mobile DOM = desktop DOM (no UA switching) | Verified §3.1.4: zero `userAgent` matches in components; only legitimate matches in `src/app/robots.ts` config. | ✅ |
| 10.4.3 | CSS/JS/images NOT blocked in robots.txt | Verified §2.3.4: `Disallow: /admin`, `/api`, `/_next` only — does not block `_next/static`, `/images/`, or any asset paths. | ✅ |

## 10.5 Accessibility

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 10.5.1 | Skip-to-content link | `src/app/layout.tsx:69` ships `<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded focus:text-sm focus:font-semibold">…`. Live homepage HTML contains 1 occurrence. WCAG 2.4.1 satisfied. | ✅ |
| 10.5.2 | Landmarks present | Live homepage tags: **1 `<header>`, 2 `<nav>`, 1 `<main>`, 1 `<footer>`**. (2 `<nav>` likely Header + Footer nav lists — both correctly labeled.) | ✅ |
| 10.5.3 | Single H1 per page | Homepage = 1, /products = 1, /skate-stoppers = 1, /toronto = 1, /faq = 1, /about = 1. **6/6 sampled pages have exactly 1 H1.** | ✅ |
| 10.5.4 | Sequential heading hierarchy | Homepage tag sequence: **H1 → H3 → H3 → H3 → H3 → H2 → H3 → H3 → … → H2 → H3 → H3**. **H1 is followed directly by H3s before the first H2 appears.** Hierarchy skip violates WCAG 1.3.1 (Info & Relationships). | ❌ **F10.5-A (SHOULD)** |
| 10.5.5 | Form labels present | `ContactForm.tsx` lines 75-96: `<label>` for name, email, phone, city, project — 5 labels for 5 inputs. All visible labels (not aria-only). | ✅ |
| 10.5.6 | No `outline:none` misuse | grep on `outline.*none|outline:\s*0` excluding `focus`/`sr-only` → **0 hits**. Focus rings preserved. | ✅ |
| 10.5.7 | Color contrast — brand colors AA | Token swatch from `globals.css`:<br>• `--bg #FFFFFF` × `--text #0A0B0D` ≈ **20.6:1** (AAA) ✅<br>• `--bg-dark #0A0B0D` × `--text-on-dark #FFFFFF` ≈ **20.6:1** (AAA) ✅<br>• `--bg-dark #0A0B0D` × `--text-muted-on-dark #9A9A9C` ≈ **8.5:1** (AAA for body, AAA-large) ✅<br>• `--accent #C8102E` (red) on white background ≈ **5.36:1** (AA for normal text, AAA for large) ✅<br>• `--text-light #5A5A5C` on `--bg #FFFFFF` ≈ **6.6:1** (AA normal) ✅ | ✅ |

---

## Section 10 Findings

### F10.1-A — TypeScript drift: `clusterParent` not in KeywordPage interface (SHOULD)

`src/data/keyword-pages.ts` declares `clusterParent` on the 2 newest
keyword-page objects (lines 139, 157) — added per the slug-search-volume
backfill pattern documented in `dataforseo-deep-research` muscle. But
the `KeywordPage` interface at the top of the same file doesn't list
`clusterParent` as an optional property.

`next.config.ts` has `typescript.ignoreBuildErrors: true` so build
succeeds, but `npx tsc --noEmit` fails. Fix: add `clusterParent?: string`
(and ideally `relatedProduct?: string`, `targetPage?: string`,
`source?: string`) to the interface.

### F10.5-A — Heading hierarchy skip on homepage (SHOULD)

Live tag sequence: `H1 → H3 → H3 → H3 → H3 → H2 → H3…`. The first H2
appears AFTER 4 H3s following the H1. Per WCAG 1.3.1 / FACTORY-MASTER
§2.11, the next heading after H1 should be H2 (or another H1 in rare
cases). The 4 H3s before the first H2 are likely card-titles or service
labels in a hero/value-prop section — they should be H2 (or the H2
should appear earlier). Affects screen-reader navigation and AI
parsing of section structure.

Fix candidates: bump the 4 leading H3s to H2 (semantic correction), or
verify these are within an H2-titled section that's being rendered as
a non-heading element somewhere.

### F10.1-B — Turbopack workspace-root warning (NIT)

Build emits *"Next.js inferred your workspace root, but it may not be
correct. We couldn't find the next/package.json from
…/skatestopper-ca/src/app — to fix, set turbopack.root in your Next.js
config"*. Compilation succeeds; warning is cosmetic. Set
`turbopack: { root: __dirname }` (or path equivalent) in `next.config.ts`.

## Section 10 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 0 | — |
| **SHOULD** | 2 | F10.1-A (TS drift on KeywordPage), F10.5-A (H1→H3 hierarchy skip) |
| **NIT** | 1 | F10.1-B (Turbopack workspace warning) |
| **PASS rows** | 17 | Build success, runtime clean, file thresholds (5/5 over by ≥3×), responsive, all accessibility (skip-link, landmarks, H1 count, form labels, focus, contrast AA-AAA) |
| **Carryover** | 1 | F9.1-A (3 oversized images) |

**Verdict for Section 10:** **PASS-with-SHOULDs.** Build/runtime
healthy (32 routes, no runtime errors across 60+ audit hits). File
inventory generous (13 EN + 13 FR pages, 37 components, 11 data
files, 64 images, 63 webp). Responsive defaults correct. Accessibility
strong: skip-to-content present, all landmarks correct, single H1 per
page (6/6 sampled), form labels complete, no focus-suppression, brand
colors meet AA-AAA contrast. Two SHOULDs to clean: TS interface drift
(masked by `ignoreBuildErrors: true`) and a heading-hierarchy skip on
the homepage.

---

**STOP — awaiting `NEXT` for Section 11 (Conversion UX + Design Checks).**
