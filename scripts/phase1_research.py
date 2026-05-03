#!/usr/bin/env python3
"""
Phase 1 — Keyword Research for SkateStopper CA
Runs DataForSEO calls per FACTORY-MASTER.md §1.1:
  1.1.1 keywords_for_keywords (3-5 seeds → 200+ raw)
  1.1.2 search_volume (top 50)
  1.1.3 competitors_domain (5+ competitors)
  1.1.4 ranked_keywords (top 3 competitors)
  1.1.5 log every call with cost
Outputs:
  evidence/keywords_raw.json
  evidence/keywords_verified.json
  evidence/competitors.json
  evidence/competitor_keywords.json
  blueprint/api-costs.json
"""

import json
import os
import sys
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path

# Locate harness (for credential loading)
HARNESS = Path("/Users/vladimirproskurov/beast/factory/audit/harness")
sys.path.insert(0, str(HARNESS))
from dataforseo import DataForSEO, _load_creds, API_BASE  # noqa: E402

PROJECT = Path("/Users/vladimirproskurov/beast/projects/business/websites/skatestopper-ca")
EVIDENCE = PROJECT / "evidence"
BLUEPRINT = PROJECT / "blueprint"
COSTS_FILE = BLUEPRINT / "api-costs.json"

SEEDS = [
    "skate stoppers",
    "skatestoppers",
    "skate deterrent",
    "anti skateboard",
    "skateboard prevention",
]
COMPETITOR_SEED_KEYWORD = "skate stoppers"  # for competitor discovery
LOCATION = "Canada"
LANG = "en"


def _api_post(login, pw, endpoint, payload, log):
    url = f"{API_BASE}{endpoint}"
    body = json.dumps(payload)
    t0 = time.time()
    r = subprocess.run(
        ["curl", "-s", "-X", "POST", url,
         "-u", f"{login}:{pw}",
         "-H", "Content-Type: application/json",
         "-d", body, "--max-time", "120"],
        capture_output=True, text=True,
    )
    dt = int((time.time() - t0) * 1000)
    if r.returncode != 0:
        raise RuntimeError(f"curl failed: {r.stderr[:300]}")
    data = json.loads(r.stdout)
    cost = sum((t.get("cost") or 0) for t in data.get("tasks", []))
    log.append({
        "ts": datetime.now(timezone.utc).isoformat(),
        "endpoint": endpoint,
        "cost": cost,
        "duration_ms": dt,
        "status": data.get("status_message"),
    })
    if data.get("status_code") != 20000:
        raise RuntimeError(f"{endpoint}: {data.get('status_message')}")
    return data


def keywords_for_keywords(login, pw, seeds, log):
    """1.1.1 — Expand seeds into related keywords."""
    payload = [{
        "keywords": seeds,
        "location_name": LOCATION,
        "language_code": LANG,
        "limit": 700,
        "include_seed_keyword": True,
    }]
    data = _api_post(login, pw, "/keywords_data/google_ads/keywords_for_keywords/live", payload, log)
    out = []
    for task in data.get("tasks", []):
        for r in (task.get("result") or []):
            kw = r.get("keyword")
            if not kw:
                continue
            out.append({
                "keyword": kw,
                "volume": r.get("search_volume"),
                "cpc": r.get("cpc"),
                "competition": r.get("competition"),
                "source": "dataforseo",
            })
    return out


def search_volume(login, pw, keywords, log):
    """1.1.2 — Verify exact volumes."""
    payload = [{
        "keywords": keywords[:1000],
        "location_name": LOCATION,
        "language_code": LANG,
    }]
    data = _api_post(login, pw, "/keywords_data/google_ads/search_volume/live", payload, log)
    out = []
    for task in data.get("tasks", []):
        for r in (task.get("result") or []):
            kw = r.get("keyword")
            if not kw:
                continue
            out.append({
                "keyword": kw,
                "volume": r.get("search_volume"),
                "cpc": r.get("cpc"),
                "competition": r.get("competition"),
                "source": "dataforseo",
            })
    return out


def competitors_domain(login, pw, keyword, log):
    """1.1.3 — Find competitor domains for our seed."""
    payload = [{
        "keyword": keyword,
        "location_name": LOCATION,
        "language_code": LANG,
        "limit": 20,
    }]
    # Endpoint: SERP organic to discover ranking domains (cheap + reliable)
    data = _api_post(login, pw, "/serp/google/organic/live/regular", payload, log)
    domains = []
    for task in data.get("tasks", []):
        for r in (task.get("result") or []):
            for item in (r.get("items") or []):
                if item.get("type") != "organic":
                    continue
                d = item.get("domain")
                if d and d not in [x["domain"] for x in domains]:
                    domains.append({
                        "domain": d,
                        "url": item.get("url"),
                        "title": item.get("title"),
                        "rank": item.get("rank_absolute"),
                    })
    return domains


def ranked_keywords(login, pw, domain, log, limit=100):
    """1.1.4 — Keywords a competitor ranks for."""
    payload = [{
        "target": domain,
        "location_name": LOCATION,
        "language_code": LANG,
        "limit": limit,
        "filters": [["ranked_serp_element.serp_item.rank_absolute", "<=", 20]],
    }]
    data = _api_post(login, pw, "/dataforseo_labs/google/ranked_keywords/live", payload, log)
    out = []
    for task in data.get("tasks", []):
        for r in (task.get("result") or []):
            for item in (r.get("items") or []):
                kd = item.get("keyword_data", {})
                kwinfo = kd.get("keyword_info", {})
                rank = item.get("ranked_serp_element", {}).get("serp_item", {}).get("rank_absolute")
                out.append({
                    "keyword": kd.get("keyword"),
                    "volume": kwinfo.get("search_volume"),
                    "cpc": kwinfo.get("cpc"),
                    "rank": rank,
                })
    return out


def main():
    login, pw = _load_creds()
    print(f"✓ creds loaded ({login[:3]}***)")
    log = []

    # ── 1.1.1 keywords_for_keywords ────────────────────────────────────────
    print(f"\n[1.1.1] keywords_for_keywords — seeds: {SEEDS}")
    raw = keywords_for_keywords(login, pw, SEEDS, log)
    raw.sort(key=lambda x: (x["volume"] or 0), reverse=True)
    (EVIDENCE / "keywords_raw.json").write_text(json.dumps(raw, indent=2))
    print(f"  → {len(raw)} keywords; top 5:")
    for k in raw[:5]:
        print(f"    {k['volume']:>6}  {k['keyword']}")

    # ── 1.1.2 search_volume on top 50 ──────────────────────────────────────
    top50 = [k["keyword"] for k in raw[:50]]
    print(f"\n[1.1.2] search_volume — top {len(top50)}")
    verified = search_volume(login, pw, top50, log)
    verified.sort(key=lambda x: (x["volume"] or 0), reverse=True)
    (EVIDENCE / "keywords_verified.json").write_text(json.dumps(verified, indent=2))
    print(f"  → {len(verified)} verified")

    # ── 1.1.3 competitors via SERP ─────────────────────────────────────────
    print(f"\n[1.1.3] competitor discovery — SERP for '{COMPETITOR_SEED_KEYWORD}'")
    competitors = competitors_domain(login, pw, COMPETITOR_SEED_KEYWORD, log)
    (EVIDENCE / "competitors_serp.json").write_text(json.dumps(competitors, indent=2))
    print(f"  → {len(competitors)} domains; top 5:")
    for c in competitors[:5]:
        print(f"    #{c['rank']:>2}  {c['domain']}  — {c['title'][:60] if c['title'] else ''}")

    # Pick top 3 commercial competitors (skip wikipedia/reddit/youtube/etc.)
    SKIP = {"wikipedia.org", "reddit.com", "youtube.com", "facebook.com",
            "instagram.com", "pinterest.com", "amazon.com", "amazon.ca",
            "ebay.com", "ebay.ca", "homedepot.com", "homedepot.ca", "lowes.ca"}
    commercial = [c for c in competitors if c["domain"] not in SKIP][:3]

    # ── 1.1.4 ranked_keywords for top 3 ────────────────────────────────────
    comp_kws = {}
    for c in commercial:
        d = c["domain"]
        print(f"\n[1.1.4] ranked_keywords — {d}")
        kws = ranked_keywords(login, pw, d, log)
        comp_kws[d] = kws
        print(f"  → {len(kws)} keywords")
    (EVIDENCE / "competitor_keywords.json").write_text(json.dumps(comp_kws, indent=2))

    # ── 1.1.5 cost log ─────────────────────────────────────────────────────
    total_cost = sum(e["cost"] for e in log)
    BLUEPRINT.mkdir(exist_ok=True)
    COSTS_FILE.write_text(json.dumps({
        "phase": "1.1",
        "calls": log,
        "total_cost_usd": round(total_cost, 4),
    }, indent=2))

    print(f"\n{'='*60}")
    print(f"Phase 1.1 complete")
    print(f"  raw keywords:        {len(raw)}")
    print(f"  verified (top 50):   {len(verified)}")
    print(f"  competitor domains:  {len(competitors)}")
    print(f"  competitors w/ kws:  {len(commercial)}")
    print(f"  total API cost:      ${total_cost:.4f}")
    print(f"  budget guard (1.1.8) <$5.00:  {'✓ PASS' if total_cost < 5.0 else '✗ FAIL'}")


if __name__ == "__main__":
    main()
