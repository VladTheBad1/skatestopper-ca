# Product Rationale — skatestopper.ca

Per FACTORY-MASTER §1.3.10: every product MUST have evidence — competitor coverage OR keyword volume > 50.

## 6 products selected

| # | Product | Primary keyword | Vol | Competitors | Pass §1.3.10? |
|---|---|---|---|---|---|
| 1 | Pyramid Skate Stoppers | skate stoppers | 90 | skatestoppers.com, preventer.ca, parkwarehouse.com | ✅ vol+3 comps |
| 2 | Round-Top Ledge Stoppers | skate deterrent | 10 | skatestoppers.com, classic-arch.com | ✅ 2 comps |
| 3 | Handrail Skate Stoppers | handrail skate stoppers | 10 | skatestoppers.com, preventer.ca | ✅ 2 comps |
| 4 | Bench Skate Stoppers | skateboard deterrents for benches | 10 | skatestoppers.com, maglin.com | ✅ 2 comps |
| 5 | Concrete-Set Skate Deterrents | skateboard deterrents for concrete | 10 | skatestoppers.com, preventer.ca | ✅ 2 comps |
| 6 | Linear Edge Deterrent Strips | skateboard deterrents for sidewalks | 10 | preventer.ca, classic-arch.com | ✅ 2 comps |

All 6 pass — every product offered by ≥2 competitors **OR** has matching keyword volume.

## What we did NOT include and why

| Considered | Why excluded |
|---|---|
| Skate park ramps / equipment | Different niche (we sell DETERRENTS, not facilitate skating) |
| Anti-skateboard signage | Low margin, not core hardware |
| Bike racks / bollards | Adjacent product, dilutes brand focus |
| Custom architectural integrations | Bundled into "Round-Top" + "Linear Edge" — no separate product needed |

## Slug intent (FACTORY-MASTER §1.3.5)

All 6 product slugs read as natural search-intent phrases when prefixed with `/{city}/`:

- ✅ `/toronto/pyramid-skate-stoppers` — reads as "pyramid skate stoppers in toronto"
- ✅ `/vancouver/concrete-set-skate-deterrents` — reads naturally
- ❌ NOT `/products/pyramid-stoppers-installation` (taxonomy suffix banned)
- ❌ NOT `/products/skate-stoppers-pyramid-products` (suffix garbage banned)

Slug-intent gate: PASS expected.

## Slug uniqueness across data sources (FACTORY-MASTER §1.6.5)

Cross-source slug check:
- Products: pyramid-skate-stoppers, round-top-ledge-stoppers, handrail-skate-stoppers, bench-skate-stoppers, concrete-set-skate-deterrents, linear-edge-deterrent-strips
- Industries: municipalities-parks, transit-authorities, schools-universities, commercial-real-estate, retail-storefronts, condominiums-hoas, government-heritage
- Cities: toronto, montreal, calgary, ottawa, edmonton, mississauga, winnipeg, vancouver, brampton, hamilton, quebec-city, surrey, halifax, london, victoria

Zero collisions. Slug-collision gate: PASS expected.

## Field naming compliance (FACTORY-MASTER §1.3.6)

All product entries use `nameEn`/`nameFr` (not bare `name`). Verified by `grep -c '"name":' products.json` returning 0 (only `nameEn`, `nameFr`, `categoryEn`, `categoryFr` etc.).

---
*Generated 2026-04-26 inline by factory-master skill (Claude Code mode). Source data: existing competitors.json (15 domains) + keywords.json (30 verified KWs) from previous DataForSEO research.*
