---
type: audit-report
section: 2
title: Site-Wide — Root Layout & Locale
factory_master_refs: §B.1
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 2 of 12 — Site-Wide: Root Layout & Locale

> All checks executed against `http://localhost:3051` (live `next start` build).

## 2.1 Root Layout (EN) — `/`

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 2.1.1 | `<html lang="en-CA">` | `lang="en-CA"` | ✅ |
| 2.1.2 | viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1"/>` | ✅ |
| 2.1.3 | NO `meta name="keywords"` | grep returns nothing | ✅ |
| 2.1.4 | robots meta has `max-image-preview:large, max-snippet:-1, max-video-preview:-1` | Actual: `<meta name="robots" content="index, follow"/>` | ❌ **F2.1-A (SHOULD)** |
| 2.1.5 | No `<iframe>`/`<img>` inside `<head>` | Head bytes 0–3755; regex `<(img\|iframe)\b` → 0 matches | ✅ |
| 2.1.6 | No noarchive / nositelinkssearchbox / revisit-after | grep returns nothing | ✅ |
| 2.1.7 | Favicon link present | `<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>` | ✅ |
| 2.1.8 | Organization JSON-LD on homepage | `"@type":"Organization"` present | ✅ |
| 2.1.9 | WebSite JSON-LD on homepage | `"@type":"WebSite"` present | ✅ |
| 2.1.10 | Hreflang en-CA | `<link rel="alternate" hrefLang="en-CA" href="https://skatestopper.ca"/>` | ✅ |
| 2.1.11 | Hreflang fr-CA | `<link rel="alternate" hrefLang="fr-CA" href="https://skatestopper.ca/fr"/>` | ✅ |
| 2.1.12 | x-default hreflang | `<link rel="alternate" hrefLang="x-default" href="https://skatestopper.ca"/>` | ✅ |
| 2.1.13 | BCP-47 codes (en-CA not en) | `en-CA`, `fr-CA`, `x-default` — all valid BCP-47 | ✅ |

**JSON-LD inventory on homepage (8 blocks):** Organization, WebSite,
WebPage, FAQPage, Question, Answer, ContactPoint, SpeakableSpecification.

## 2.2 Locale Layout (FR) — `/fr`

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 2.2.1 | `<html lang="fr-CA">` on FR | `lang="fr-CA"` | ✅ |
| 2.2.2 | FR canonical to FR path | `<link rel="canonical" href="https://skatestopper.ca/fr"/>` | ✅ |
| 2.2.3 | FR hreflang reciprocal with EN | All 3 alternates present (en-CA→`/`, fr-CA→`/fr`, x-default→`/`) | ✅ |
| 2.2.4 | FR OG locale = `fr_CA` | `<meta property="og:locale" content="fr_CA"/>` | ✅ |
| 2.2.5 | NO separate WebSite JSON-LD on FR | `"@type":"WebSite"` count = **0** on `/fr` | ✅ |

**FR JSON-LD inventory (7 blocks):** Organization, WebPage, FAQPage,
Question, Answer, ContactPoint, SpeakableSpecification — same set as EN
minus WebSite. ✅ Matches commercialdoors-ca lesson from `mode-audit.md`.

## 2.3 robots.txt

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 2.3.1 | Returns 200 | HTTP 200 | ✅ |
| 2.3.2 | Contains `Sitemap:` directive | `Sitemap: https://skatestopper.ca/sitemap.xml` | ✅ |
| 2.3.3 | Blocks `/api/`, `/admin/` | `Disallow: /admin`, `Disallow: /api`, `Disallow: /_next` | ✅ |
| 2.3.4 | Does NOT block CSS/JS/images | No Disallow on `*.css`, `*.js`, `/images/`, `/_next/static` content paths | ✅ |
| 2.3.5 | AI crawlers allowed (GPTBot, Claude-User, PerplexityBot) | Explicit Allow blocks for: GPTBot ✅, ClaudeBot ✅, PerplexityBot ✅, Google-Extended ✅, anthropic-ai ✅, Applebot-Extended ✅. CCBot blocked (intentional). | ⚠️ **F2.3-A (NIT)** — `Claude-User` (user-triggered fetch UA) not separately listed. ClaudeBot covers the crawler; current setup is acceptable but explicit `Claude-User` block would be more thorough. |

## 2.4 sitemap.xml

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 2.4.1 | Returns 200 | HTTP 200 | ✅ |
| 2.4.2 | All URLs absolute https://. Non-https count = 0 | All 1438 `<loc>` start `https://skatestopper.ca` | ✅ |
| 2.4.3 | NO `<priority>` tags | grep count = 0 | ✅ |
| 2.4.4 | NO `<changefreq>` tags | grep count = 0 | ✅ |
| 2.4.5 | URL count | **1438 URLs** (sane — 48 cities × ~6 services × 2 locales + hubs/products/industries/keyword pages × 2 locales + statics) | ✅ |
| 2.4.6 | FR URLs use translated slugs | Hubs translated correctly: `/fr/a-propos`, `/fr/produits`, `/fr/villes`, `/fr/blogue`, etc. **HOWEVER:** sitemap also emits `/fr/industries` (1×) and `/fr/contact` (1×) — neither is a real FR route. Live: `/fr/industries` → **404**, `/fr/contact` → **404**. Real routes: `/fr/secteurs` ✅ 200, `/fr/nous-joindre` ✅ 200. `/fr/faq` ✅ 200 (English-cognate, intentional). | ❌ **F2.4-A (P0)** — sitemap publishes 2 dead URLs. Same root cause as F1.6-A. |

## 2.5 Public Assets

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 2.5.1 | Favicon loads | `/favicon.ico` → 200; `/favicon.svg` → 200 | ✅ |
| 2.5.2 | Default OG image exists | og:image = `https://skatestopper.ca/og-default.png`; `/og-default.png` → 200 | ✅ |
| 2.5.3 | `/llms.txt` exists | 200; first lines lead with niche disambiguation (anti-skateboarding hardware vs roller-skate toe stops) — matches preload's "disambiguation in machine channels only" lesson | ✅ |

## Section 2 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 1 | F2.4-A (sitemap publishes 2 dead `/fr/industries` + `/fr/contact` URLs that 404 — same root cause as F1.6-A) |
| **SHOULD** | 1 | F2.1-A (robots meta = `index, follow` only; missing `max-image-preview:large, max-snippet:-1, max-video-preview:-1` directives recommended by FACTORY-MASTER §B.1 for rich-result eligibility) |
| **NIT** | 1 | F2.3-A (robots.txt has no explicit `Claude-User` block; ClaudeBot covers crawler) |
| **PASS rows** | 30 | All other checks |

**Verdict for Section 2:** **CONDITIONAL** — root layout, hreflang,
JSON-LD, robots.txt, OG image, llms.txt are all clean. Two real issues:
1 P0 dead-URL bug in sitemap generator (mirrors Section 1 finding,
points at the FR-alt-slug derivation logic), and 1 SHOULD-fix on robots
meta directives.

---

**STOP — awaiting `NEXT` for Section 3 (Site-Wide Global Rules & Anti-Patterns).**
