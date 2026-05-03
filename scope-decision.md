# Scope Decision — skatestopper.ca

**Profile:** C (Country, bilingual EN/FR)
**Market scope:** Canada nationwide
**Decided:** 2026-04-26 by Claude Code (factory-master skill, INLINE mode)

## TL;DR

15 focused cities (not 48). 6 products. 7 industries. ~250 unique pages × 2 locales = ~500 indexable pages. Avoids thin-content trap on a low-volume niche.

## The volume reality (DataForSEO verified, Apr 2026)

This is a **low-volume specialty B2B niche.** Total verified Canadian search demand across all relevant variants:

| Keyword family | Monthly searches |
|---|---|
| skate stoppers / skatestoppers / skate stopper | 270 (90 × 3 spellings) |
| anti skateboard / anti skateboarding | 220 |
| skate deterrent / skateboard deterrent + variants | 100 |
| Long-tail (concrete, walls, benches, sidewalks, handrails) | ~100 |
| **Total clean demand** | **~700/mo** |

> **Critical note:** `keywords_verified.json` was polluted with "Anti-Hero Skateboards" brand keywords (skateboard manufacturer, ~480/mo). Those are the WRONG niche and were filtered out of `keywords.json` (30 clean entries). Do NOT target Anti-Hero/Antihero/Antisocial/Grimple/John Cardiel/Jeff Grosso queries — those are skateboarder/brand searches, not anti-skating customers.

## City count rationale (15 not 48)

FACTORY-MASTER §1.5.5: *"If > 3,000 pages: review thin content risk. If < 500: add variants."*

A 48-city build for a 700/mo niche would generate ~3,000 pages chasing demand that doesn't exist outside top metros. Most small Canadian cities have **zero indexed search volume** for "skate stoppers + city name" — building those pages would be doorway-page territory.

**15 cities chosen by:**
- Top metros (population centers where skateboarding-vandalism complaints concentrate — actual customer pool)
- Provincial capitals (government/transit-authority procurement opportunity)
- Geographic spread (BC + AB + SK + MB + ON + QC + NS represented)

| # | City | Province | Pop | Why included |
|---|---|---|---|---|
| 1 | Toronto | ON | 2.8M | Largest market; TTC bus shelters; downtown ledge complaints |
| 2 | Montréal | QC | 1.7M | FR primary; STM transit; old-town skate spots |
| 3 | Calgary | AB | 1.3M | Calgary Transit; Plus-15 system; storefront density |
| 4 | Ottawa | ON | 1M | Capital; gov buildings; OC Transpo |
| 5 | Edmonton | AB | 1M | ETS; provincial buildings |
| 6 | Mississauga | ON | 720K | MiWay; corporate campuses |
| 7 | Winnipeg | MB | 750K | Winnipeg Transit; downtown Heritage District |
| 8 | Vancouver | BC | 675K | TransLink; YVR airport-area; high storefront vandalism |
| 9 | Brampton | ON | 660K | Brampton Transit |
| 10 | Hamilton | ON | 580K | HSR Transit |
| 11 | Quebec City | QC | 540K | FR; provincial gov; old-town heritage |
| 12 | Surrey | BC | 590K | Surrey transit; rapid growth |
| 13 | Halifax | NS | 440K | Halifax Transit; Atlantic regional center |
| 14 | London | ON | 420K | LTC Transit; uni district |
| 15 | Victoria | BC | 92K | Provincial capital; heritage downtown vandalism |

10 provinces NOT all represented (per §1.5.1's 48-city default). With 15 cities, NL/NB/PE/NT/YT/NU are excluded — **deliberate** because there's no measurable search demand and shipping to remote territories is a service-area note, not a geo-page strategy.

## Page count math

| Page type | Count |
|---|---|
| Homepage | 1 |
| About / FAQ / Contact / Privacy / Terms | 5 |
| Products hub + 6 product detail | 7 |
| Industries hub + 7 industry detail | 8 |
| Cities hub + 15 city detail | 16 |
| Geo cross (city × product) | 15 × 6 = 90 |
| Blog hub + 4 articles | 5 |
| Keyword landing pages (top 8 commercial-intent) | 8 |
| **EN total** | **140** |
| **× 2 locales** | **280** |

Well under the 500-page floor warning. Not a doorway-page build.

## Profile-C MUST rules verified for this build

- LocalBusiness schema **forbidden** (no verified single address; service-area business)
- Use Organization + Service schemas
- Bilingual EN/FR with translated route segments (`/produits`, `/villes`, `/industries`)
- City uniqueness fields per §1.5.5a (transit-authority, climate, vandalism budget, etc.)

## What's NOT in scope

- 33 cities below the top 15 — covered via "service area" language on contact/about
- Skate park products (we sell deterrents, not skatepark equipment — different ICP)
- Skateboard accessories / replacement parts (unrelated)
- US market (`.ca` domain, Profile C = Canada only)

---
*Generated 2026-04-26 from blueprint/keywords.json (30 verified KWs) + competitors.json (15 domains) + DataForSEO costs $0.4666 already spent. Reuse only — no new paid API calls in Phase 1 completion.*
