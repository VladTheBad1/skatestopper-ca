#!/usr/bin/env python3
"""
Phase 1.1 refinement — clean seeds, drop skateboard-brand noise, real competitors.
Builds final keywords.json + competitors.json per FACTORY-MASTER §1.1.6–1.1.10.
"""
import json, sys, re
from pathlib import Path
sys.path.insert(0, "/Users/vladimirproskurov/beast/projects/business/websites/skatestopper-ca/scripts")
from phase1_research import (
    keywords_for_keywords, search_volume, competitors_domain, ranked_keywords,
    EVIDENCE, BLUEPRINT, COSTS_FILE,
)
sys.path.insert(0, "/Users/vladimirproskurov/beast/factory/audit/harness")
from dataforseo import _load_creds  # noqa

# Better, narrower seeds (no "anti skateboard" — pulls Antihero/Antisocial brands)
SEEDS = [
    "skate stoppers",
    "skatestoppers",
    "skate deterrent",
    "skateboard deterrent",
    "skate stopper installation",
]

# Brand & off-topic noise to filter from raw expansion
NOISE_RE = re.compile(
    r"\b(anti[\s\-]?hero|antihero|antisocial|anti[\s\-]?social|grimple|"
    r"grosso|cardiel|trujillo|julien stranger|pfanner|hewitt|"
    r"\d+\.\d+\s*deck|\d+\s*inch deck|skateboard deck|"
    r"hoodie|hat|cap|t[\s\-]?shirt|shirt|clothing|"
    r"shop|skateshop|store)\b",
    re.IGNORECASE,
)

# Seed-level positive filter — must contain at least one of these tokens
RELEVANCE_RE = re.compile(
    r"(skatestop|skate[\s\-]?stop|skate[\s\-]?deter|skateboard[\s\-]?deter|"
    r"skate[\s\-]?guard|skate[\s\-]?block|skate[\s\-]?proof|"
    r"skate[\s\-]?prevent|skateboard[\s\-]?prevent|"
    r"anti[\s\-]?grind|grind[\s\-]?guard|grind[\s\-]?stop|"
    r"ledge[\s\-]?guard|edge[\s\-]?guard|edge[\s\-]?protect|"
    r"bench[\s\-]?guard|wall[\s\-]?guard|"
    r"anti[\s\-]?skat)",
    re.IGNORECASE,
)


def is_clean(kw):
    if NOISE_RE.search(kw):
        return False
    if not RELEVANCE_RE.search(kw):
        return False
    return True


def main():
    login, pw = _load_creds()
    log = []

    # 1. Re-expand with cleaner seeds
    print(f"[1.1.1-v2] keywords_for_keywords — {len(SEEDS)} seeds")
    raw = keywords_for_keywords(login, pw, SEEDS, log)
    raw.sort(key=lambda x: (x["volume"] or 0), reverse=True)
    (EVIDENCE / "keywords_raw_v2.json").write_text(json.dumps(raw, indent=2))
    print(f"  raw: {len(raw)}")

    # 2. Merge with v1 raw + filter
    v1 = json.loads((EVIDENCE / "keywords_raw.json").read_text())
    merged = {k["keyword"]: k for k in v1}
    for k in raw:
        merged[k["keyword"]] = k
    all_kws = list(merged.values())
    relevant = [k for k in all_kws if is_clean(k["keyword"])]
    relevant.sort(key=lambda x: (x["volume"] or 0), reverse=True)
    (EVIDENCE / "keywords_filtered.json").write_text(json.dumps(relevant, indent=2))
    print(f"  merged: {len(all_kws)}  relevant after filter: {len(relevant)}")

    # 3. Verify volumes for top relevant keywords (some may need refresh)
    top_kws = [k["keyword"] for k in relevant[:60]]
    print(f"\n[1.1.2-v2] search_volume — {len(top_kws)} relevant keywords")
    verified = search_volume(login, pw, top_kws, log)
    # Tag with intent guess
    for k in verified:
        kw = k["keyword"].lower()
        intent = "informational"
        if any(t in kw for t in ["buy", "price", "cost", "for sale", "supplier", "installation", "install", "near me"]):
            intent = "commercial"
        elif any(t in kw for t in ["how", "what", "why", "diy"]):
            intent = "informational"
        elif any(t in kw for t in ["best", "review", "vs"]):
            intent = "commercial-investigation"
        k["intent"] = intent
        k["source"] = "dataforseo"
    verified.sort(key=lambda x: (x["volume"] or 0), reverse=True)

    # 4. SERP for additional competitor discovery — Canada-focused
    print(f"\n[1.1.3-v2] SERP discovery — Canadian commercial intent")
    extra_serps = ["skate deterrent canada", "skatestopper installation"]
    all_competitors = json.loads((EVIDENCE / "competitors_serp.json").read_text())
    seen = {c["domain"] for c in all_competitors}
    for q in extra_serps:
        more = competitors_domain(login, pw, q, log)
        for c in more:
            if c["domain"] not in seen:
                seen.add(c["domain"])
                c["seed_query"] = q
                all_competitors.append(c)
    (EVIDENCE / "competitors_serp.json").write_text(json.dumps(all_competitors, indent=2))
    print(f"  total domains discovered: {len(all_competitors)}")

    # 5. Filter to commercial competitors (manual curated allow-list logic)
    SKIP = {"wikipedia.org", "en.wikipedia.org", "reddit.com", "youtube.com",
            "facebook.com", "instagram.com", "pinterest.com", "x.com", "twitter.com",
            "amazon.com", "amazon.ca", "ebay.com", "ebay.ca",
            "homedepot.com", "homedepot.ca", "lowes.ca", "lowes.com",
            "rollergirl.ca", "skatesusa.com", "moxiroller.com"}  # roller skate stores
    commercial = [c for c in all_competitors if c["domain"] not in SKIP]
    print(f"  commercial: {len(commercial)}")
    for c in commercial[:8]:
        print(f"    #{c.get('rank','?'):>2} {c['domain']:<40} {(c.get('title') or '')[:50]}")

    # 6. ranked_keywords for top commercial competitors (max 5)
    top_comm = commercial[:5]
    comp_kws = {}
    for c in top_comm:
        d = c["domain"]
        print(f"\n[1.1.4-v2] ranked_keywords — {d}")
        kws = ranked_keywords(login, pw, d, log, limit=200)
        comp_kws[d] = kws
        # Also add their high-volume kws to our verified pool if relevant
        for kk in kws:
            kw = kk.get("keyword") or ""
            if is_clean(kw) and kk.get("volume") and kk["volume"] >= 10:
                # skip if already verified
                if not any(v["keyword"] == kw for v in verified):
                    verified.append({
                        "keyword": kw,
                        "volume": kk["volume"],
                        "cpc": kk.get("cpc"),
                        "competition": None,
                        "source": f"dataforseo:competitor:{d}",
                        "intent": "commercial",
                    })
        print(f"  → {len(kws)} ranked keywords")
    (EVIDENCE / "competitor_keywords.json").write_text(json.dumps(comp_kws, indent=2))

    # 7. Final keywords.json (relevant only, with intent)
    verified.sort(key=lambda x: (x["volume"] or 0), reverse=True)
    (BLUEPRINT / "keywords.json").write_text(json.dumps(verified, indent=2))

    # 8. competitors.json (curated commercial list)
    (BLUEPRINT / "competitors.json").write_text(json.dumps([
        {
            "domain": c["domain"],
            "url": c.get("url"),
            "title": c.get("title"),
            "rank": c.get("rank"),
            "seed_query": c.get("seed_query", "skate stoppers"),
            "country": "CA" if c["domain"].endswith(".ca") else "??",
        }
        for c in commercial
    ], indent=2))

    # 9. Append cost log
    prev = json.loads(COSTS_FILE.read_text()) if COSTS_FILE.exists() else {"calls": [], "total_cost_usd": 0}
    prev["calls"].extend(log)
    prev["total_cost_usd"] = round(sum(c["cost"] for c in prev["calls"]), 4)
    COSTS_FILE.write_text(json.dumps(prev, indent=2))

    # 10. Verification gates (1.1.6 / 1.1.7 / 1.1.8)
    print(f"\n{'='*60}")
    print(f"Phase 1.1 — Final Verification")
    print(f"  keywords.json entries:        {len(verified)}")
    print(f"  ≥50 entries (1.1.6):          {'✓' if len(verified) >= 50 else '✗'}")
    has_int = all(isinstance(k.get('volume'), int) and k['volume'] is not None for k in verified)
    has_src = all(k.get('source','').startswith('dataforseo') for k in verified)
    print(f"  all integer volume (1.1.6):   {'✓' if has_int else '✗'}")
    print(f"  all source=dataforseo (1.1.7): {'✓' if has_src else '✗'}")
    print(f"  competitors.json entries:     {len(commercial)}")
    print(f"  ≥5 competitors (1.1.3):       {'✓' if len(commercial) >= 5 else '✗'}")
    print(f"  total spent: ${prev['total_cost_usd']:.4f}  (<$5 = {'✓' if prev['total_cost_usd'] < 5 else '✗'})")

    print(f"\nTop 20 keywords:")
    for k in verified[:20]:
        print(f"  {(k['volume'] or 0):>6}  {k['intent']:<24}  {k['keyword']}")


if __name__ == "__main__":
    main()
