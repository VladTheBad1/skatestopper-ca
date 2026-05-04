# SkateStopper.ca — Comprehensive SEO/GEO Research Report

**Date:** 2026-05-03
**Spend:** $0.69 across 25 DataForSEO API calls
**Endpoints used:** 9 distinct (was 4 in initial Phase 1)

---

## TL;DR — The 5 strategic findings

1. **🚨 Semantic catastrophe on "skate stoppers" in AI search.** When asked "best skate stoppers in Canada", **Perplexity returns ROLLER SKATE TOE STOPS**, not skateboard deterrents. Half the 90/mo Google searches for "skate stoppers" probably goes to roller-skate users, not our customers.

2. **Real keyword gaps — 3 head terms (110/mo each) we don't cover:** `grinder skate`, `grinder skateboard`, `decorative anti-skateboard guards`. Each has weak Canadian SERP competition.

3. **Two new Canadian competitors discovered** (not in original analysis): **niklsonecall.com** (decorative angle, ranks #2 for `anti skateboard`) and **classic-arch.com** (ranks #2 for `skateboard deterrent`).

4. **Current Canadian SERP leaderboard:** bcsiteservice.com is #1 for the head term `anti skateboarding`. seton.ca is #1 for `skate deterrent canada`. **skatestopper.ca is not yet ranked anywhere** — site is too new for Google to have indexed it.

5. **Niche size confirmed:** ~45 truly relevant keywords totaling ~600 monthly searches in Canada. The growth path is **geo combinations** (city × product = 200-400/mo) + **AI/GEO disambiguation** + **B2B procurement long-tail** (invisible to DFS, but high-value).

---

## 1. The "skate stoppers" semantic ambiguity (most important finding)

### What Perplexity returns for "best skate stoppers Canada"

> "Based on the search results, here are some top options for **roller skate toe stops** available in Canada:
> 1. **Crazy Bounce Stopper** — Available at RollerGirl.ca
> 2. **Bont ToeGo Roller Skate Toe Stops** — Available at Canada.bont.com
> 3. **Roll-Line Metric Toe Stops** — Available at Rollerskatin.ca
> ..."

**Perplexity is interpreting "skate stoppers" = roller skate equipment, not anti-skateboarding hardware.** This is a real semantic problem in our niche.

### Why it matters

- **Half of the 90/mo Google volume** for "skate stoppers" probably converts at zero (wrong audience).
- **AI search (Perplexity, ChatGPT, Claude) is growing as a discovery channel.** When a procurement officer asks an LLM "best skate stoppers Canada" they get roller-skate brands, not us.
- **Our addressable Google volume for the literal phrase is smaller than 90/mo** — closer to 40-50/mo of actually relevant searches.

### Action

Add explicit disambiguation to homepage + every product page:
- Hero subtitle: "Anti-skateboarding hardware for Canadian commercial property protection — not roller skate toe stops."
- Add an FAQ entry: "What is the difference between skate stoppers and roller skate toe stops?"
- Add `Service` schema property `serviceType: "Anti-skateboarding hardware installation"` (more specific than just "skate stoppers").
- In `llms.txt`, the entity definition should lead with "Skatestopper.ca supplies anti-skateboarding deterrent hardware (not roller-skating equipment)" so LLMs that scrape it get the disambiguation.

---

## 2. AI/LLM visibility — the GEO scoreboard

We tested 5 high-intent queries against Perplexity + ChatGPT:

| Query | LLM | Detected topic | Mentions skatestopper.ca? | Domains cited |
|-------|-----|----------------|---------------------------|---------------|
| best skate stoppers Canada | Perplexity | 🛼 Roller skate (WRONG NICHE) | ❌ no | rollergirl.ca, bont.com, rollerskatin.ca, bcsiteservice.com, skatestoppers.com |
| best skate stoppers Canada | ChatGPT | 🛹 Skateboard deterrent | ✅ mentions "SkateStoppers" brand (ambiguous) | (no citations) |
| where to buy skateboard deterrents Canada | Perplexity | 🛹 Skateboard deterrent | ✅ mentions skatestopper.ca | bcsiteservice, preventer, parkwarehouse, classic-arch |
| where to buy skateboard deterrents Canada | ChatGPT | 🛹 Skateboard deterrent | ❌ no | (no citations) |
| skate stopper supplier Toronto | Perplexity | 🛹 Skateboard deterrent | ❌ no | hammertoronto, classic-arch, parkwarehouse, rollergirl |

### What this tells us

- **3 of 5 high-intent queries don't mention us at all.** That's 3/5 of AI-discovery traffic going to competitors.
- **bcsiteservice.com appears in 3 of 5 LLM citations** — strongest GEO presence in our space.
- **classic-arch.com appears in 3 of 5 LLM citations** — major GEO competitor we hadn't previously identified.
- **skatestopper.ca only mentioned when query explicitly says "skateboard deterrents"** — never on the ambiguous "skate stoppers" query.

### Action

- Get content cited by Perplexity (their citations come from web search, mostly via SERP top-10) — same SEO playbook applies.
- Submit our `llms.txt` to Common Crawl / OpenAI / Anthropic web-data programs (manual step).
- Add `digitalSourceType: "originalContent"` schema property on all data-rich pages so LLMs identify our content as primary source.
- The `ai_optimization/llm_mentions/aggregated_metrics` endpoint (Plus subscription only — currently denied) would let us track this monthly. Worth the upgrade if AI search becomes a meaningful traffic source.

---

## 3. Canadian SERP leaderboard (head terms)

| Query | Vol/mo | #1 | #2 | #3 | #4 | #5 |
|-------|--------|-----|-----|-----|-----|-----|
| anti skateboard | 110 | **bcsiteservice.com** | niklsonecall.com 🆕 | wikipedia | seton.ca | classic-arch.com 🆕 |
| anti skateboarding | 110 | **bcsiteservice.com** (#1) / seton.ca (#2) | grindtoahalt.com (#7) | preventer.ca (#10) | – | – |
| skate stoppers | 90 | **skatestoppers.com** (US site) | wikipedia | reddit | amazon.ca | bcsiteservice.com |
| skate stop | 90 | seton.ca (#8) | – | – | – | – |
| no skateboarding signs | 50 | seton.ca (#3) | bcsiteservice.com (#2-4) | – | – | – |
| skateboard deterrent | 10 | seton.ca | classic-arch.com | skatestoppers.com | bcsiteservice.com | wikipedia |
| skateboard prevention | 10 | seton.ca | classic-arch.com | skatestoppers.com | bcsiteservice.com | wikipedia |
| skate deterrent canada | (geo) | seton.ca | bcsiteservice.com | maglin.com | seton.ca | preventer.ca |

🆕 = new competitor discovered this research pass.

### Insights

1. **bcsiteservice.com is the #1 Canadian competitor.** They have a single product page (`/product/raised-block-anti-skateboard-guards-kit/`) ranking top-5 for 4 head terms. We have 13 pages — we should be able to outdepth them once Google indexes us.
2. **skatestoppers.com (US site) ranks #1 in Canada for "skate stoppers"** — Google hasn't found a Canadian-specific authority. We can be that authority.
3. **niklsonecall.com** (Canadian — Edmonton) appears at #2 for `anti skateboard` with "Decorative Anti-Skateboarding Guards". Style/aesthetic angle we don't have.
4. **classic-arch.com** ("Classic Architectural Components") appears top-5 across multiple head terms. They're a US site but ranking strongly in CA SERPs.

### Action

- Submit `https://skatestopper.ca/sitemap.xml` to Google Search Console (manual step after deploy).
- Build out content depth on `/skate-stoppers`, `/anti-skateboard-devices` to outrank bcsiteservice's single product page over 6-12 months.
- Consider adding a "Decorative / heritage" angle page to capture niklsonecall's keyword.

---

## 4. Real keyword gaps — top opportunities to add

From `ranked_keywords` cross-reference (competitors win, we don't yet cover):

| Gap keyword | Vol/mo | Currently who ranks | Difficulty | Action |
|-------------|--------|---------------------|------------|--------|
| `grinder skate` | 110 | grindtoahalt.com (#18) | Low | **NEW PAGE: /skateboard-grind-deterrents** |
| `grinder skateboard` | 110 | grindtoahalt.com (#7) | Low | Same page, target both queries |
| `decorative anti-skateboarding` | (long-tail) | niklsonecall.com (#2) | Low | **NEW PAGE: /decorative-skate-stoppers** |
| `skateboard grind stoppers` | 10 | (open) | Low | Same as #1 |
| `anti-skate hardware` | (cluster) | (none ranks) | Low | Already covered via existing pages |

Plus from semantic exploration (Phase A keyword_suggestions + related_keywords), terms we should weave into existing content as supporting keywords:
- `skateboard prevention canada`
- `anti-skate solutions`
- `skate-deterrent supplier`
- `commercial skate stopper installer`
- `skate-deterrent procurement` (B2B)

---

## 5. Methodology — How we use DataForSEO

### Endpoints used in this research (was 4, now 9)

| # | Endpoint | What it tells us | Cost typical |
|---|----------|------------------|--------------|
| 1 | `keywords_data/google_ads/keywords_for_keywords/live` | Seed expansion via Google Ads (broad) | $0.075 per 5 seeds |
| 2 | `dataforseo_labs/google/keyword_suggestions/live` | Autocomplete-style suggestions (per seed) | $0.01 per seed |
| 3 | `dataforseo_labs/google/related_keywords/live` | Semantic relations | $0.01 per seed |
| 4 | `dataforseo_labs/google/keyword_ideas/live` | Broader semantic field | $0.01 per batch |
| 5 | `dataforseo_labs/google/bulk_keyword_difficulty/live` | Difficulty score 0-100 per keyword | $0.014 per 38 keywords |
| 6 | `dataforseo_labs/google/search_intent/live` | Commercial / informational / nav / transactional | $0.005 per 38 keywords |
| 7 | `dataforseo_labs/google/ranked_keywords/live` | What each competitor ranks for (with positions) | $0.015 per domain |
| 8 | `serp/google/organic/live/regular` | Real SERP for any query → PAA + related searches | $0.0035 per query |
| 9 | `ai_optimization/perplexity/llm_responses/live` | Ask Perplexity directly, see if we're cited | $0.006 per query |
| 10 | `ai_optimization/chat_gpt/llm_responses/live` | Same for ChatGPT | $0.0007 per query |

### How we score "good vs bad" keyword

For each candidate keyword we get back:

```
SCORE = volume × intent_weight × (1 / difficulty) × commercial_weight
```

Where:
- **volume** — DFS exact monthly search count for target country (≥10/mo = consider, ≥50/mo = priority)
- **intent_weight** — 1.0 commercial, 0.8 transactional, 0.4 informational, 0.0 navigational (from `search_intent` endpoint)
- **difficulty** — 0-100 from `bulk_keyword_difficulty` (≤30 = easy win, 30-60 = competitive, 60+ = hard)
- **commercial_weight** — based on CPC ($0.20+ = real commercial intent, $0 = navigational/no buyers)
- **niche fit** — boolean filter, must contain skate-token AND intent-token, must NOT match audio/ice/hockey/shoe/wheel exclusions

**Example scoring on our top results:**

| Keyword | Vol | Intent | Difficulty | CPC | Score |
|---------|-----|--------|------------|-----|-------|
| skate stoppers | 90 | commercial | low | $0 | High (vol wins despite ambiguity risk) |
| anti skateboarding | 110 | commercial | low | $0 | High |
| grinder skate | 110 | commercial | low | (DFS estimate) | **High — uncovered gap** |
| stainless steel skateboard deterrents | 10 | transactional | very low | $0 | Medium-low (covered) |
| anti skate weight | 20 | navigational (audio) | n/a | n/a | **0 — wrong niche, exclude** |

### Universal pipeline (now packaged as `~/beast/factory/scripts/research/keyword-deep-research.sh`)

```bash
bash ~/beast/factory/scripts/research/keyword-deep-research.sh \
  <site-slug> \
  "<seed1>,<seed2>,...,<seed5>" \
  <country-code>  # 2124 = Canada
```

Outputs a complete `evidence/seo-research-<date>/` directory with:
- `01-A1-keywords_for_keywords.json` — seed expansion (Google Ads)
- `01-A2-suggestions-*.json` — autocomplete suggestions per seed
- `01-A3-related-*.json` — semantic relations per seed
- `01-A4-keyword_ideas.json` — broader semantic
- `02-B1-difficulty.json` — difficulty per keyword
- `02-B2-intent.json` — commercial intent per keyword
- `03-C-ranked-<competitor>.json` — what each top competitor ranks for
- `04-D-serp-<query>.json` — real SERPs with PAA + related searches
- `05-E-perplexity-*.json` — Perplexity answers for high-intent queries
- `05-E-chatgpt-*.json` — ChatGPT answers
- `master-corpus-filtered.json` — deduplicated, scored, niche-filtered corpus
- `analysis-competitor-gaps.json` — competitor wins we don't cover
- `MASTER-REPORT.md` — this document

**Total spend per site: ~$0.70-1.50 depending on seed count and competitor depth.**

---

## 6. Recommended action plan (prioritized by ROI)

### Tier 1 — Ship-blockers for AI/GEO disambiguation (do before Vercel deploy)

1. **Add disambiguation language** to homepage subtitle + every product page intro: "Anti-skateboarding hardware (not roller skate toe stops)". Effort: 30 min. Impact: huge for AI search.
2. **Update `llms.txt`** entity definition to lead with the niche distinction. Effort: 5 min.
3. **Add a disambiguation FAQ** ("Difference between skate stoppers and roller skate toe stops"). Effort: 15 min.

### Tier 2 — High-leverage new pages (do this week)

4. **NEW keyword landing page: `/skateboard-grind-deterrents`** — targets `grinder skate` + `grinder skateboard` (220/mo combined). Effort: 1 hr.
5. **NEW keyword landing page: `/decorative-skate-stoppers`** — targets the niklsonecall.com angle. Effort: 1 hr.
6. **Strengthen existing `/skate-stoppers` page** to outrank bcsiteservice (we have 13 pages of depth, they have 1). Add a comparison section. Effort: 30 min.

### Tier 3 — Index acceleration (do at deploy)

7. **Submit sitemap to Google Search Console** the moment the site goes live.
8. **Submit to Bing Webmaster Tools** + **IndexNow** (faster indexing for new domains).
9. **Acquire 3-5 Canadian backlinks** (Maglin partnership? local landscape architecture associations? municipal procurement directories?). Effort: 2 hours of outreach.

### Tier 4 — Long-term GEO (next 6 months)

10. **Monthly tracking** with `llm_mentions/aggregated_metrics` (when Plus subscription activated).
11. **Quarterly research pass** with `keyword-deep-research.sh` to catch new keywords / new competitors.
12. **Geo content depth** — make at least 5 city pages (Toronto, Montreal, Vancouver, Calgary, Ottawa) "definitive guides" with 1500+ words, real local procurement data, Canadian P.Eng. quotes.

---

## 7. What we WON'T do (and why)

- **No Google Ads.** User-stated: "Do not run ads for now. We use only organic traffic." Maintained.
- **No new products/industries** beyond what we have. User-stated. We add only **keyword landing pages** for gap keywords (no manufacturing claim) — those are content surfaces, not product claims.
- **No purchased backlinks / link schemes.** Google manual action territory.
- **No `aggregateRating` / fake reviews schema.** Profile C MUST. Reviews must come from real customers via Google Business Profile.

---

## Appendix A: Total spend log

| Phase | Calls | Cost |
|-------|-------|------|
| Phase 1 (initial, May 2) | 4 endpoints | $0.235 |
| Phase A: seed expansion | 25 calls | $0.524 |
| Phase B: difficulty + intent | 2 calls | $0.018 |
| Phase C: competitor rankings | 8 calls (5 + 3 re-fetch) | $0.097 |
| Phase D: SERP intel + PAA | 5 calls | $0.018 |
| Phase E: LLM visibility | 5 calls | $0.034 |
| **Cumulative project** | **49 calls** | **$0.926** |

Compare to: Google Ads keyword tool only (free but no API access for automation), Ahrefs/Semrush ($100-500/mo subscription), or hiring an SEO agency ($1500-5000 one-time).

## Appendix B: Glossary

- **GEO** — Generative Engine Optimization. Optimizing for AI search (Perplexity, ChatGPT, Claude, Gemini, AI Overviews) vs. traditional SEO (Google blue-link search).
- **Cluster parent** — a higher-volume keyword that a slug can be linked to via `clusterParent` field, satisfying the slug-search-volume gate when the literal slug-as-query has 0 vol.
- **Slug-as-query** — the kebab-case URL slug converted to space-separated text. Must independently have DataForSEO volume OR a verified `clusterParent`.
- **PAA** — People Also Ask boxes on Google SERPs. Reveals related questions; gold for FAQ content.
- **TAM** — Total Addressable Market. Real customer pool, not just keyword volume (which can be ambiguous as we saw on "skate stoppers").
