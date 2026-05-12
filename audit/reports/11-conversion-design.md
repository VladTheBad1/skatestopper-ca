---
type: audit-report
section: 11
title: Conversion UX + Design Checks
factory_master_refs: §B.5 + §5.x
mode: AUDIT (single-pass, no fixes)
date: 2026-05-04
site: skatestopper-ca
port: 3051
---

# Section 11 of 12 — Conversion UX + Design

## 11.1 Conversion Elements

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 11.1.1 | CTA above fold on homepage | Live: `<a class="btn btn-primary btn-pill" href="/contact">Request a Quote</a>` rendered in Header (sticky, always visible). Plus secondary CTAs in homepage hero/sections (`btn btn-outline`, `btn btn-primary mt-8 inline-flex` in CoverageMap section). | ✅ |
| 11.1.2 | Phone clickable (tel:) | 4 component sources: `Footer.tsx:71`, `FloatingCTA.tsx:31`, `Header.tsx:73`, `pages/ContactPage.tsx:78` — all `href={`tel:${siteConfig.phoneRaw}`}`. | ✅ |
| 11.1.3 | Phone visible in header | `Header.tsx:77` `<span className="font-semibold">{siteConfig.phone}</span>`. Live HTML shows **`(888) 663-2244`** in header with `href="tel:18886632244"`. | ✅ |
| 11.1.4 | Contact/quote form exists | `src/app/(en)/contact/page.tsx` exists. No separate `/get-quote` route — but the contact form's submit-label IS "Get my quote" (see 11.1.6), so contact = quote. | ✅ |
| 11.1.5 | Form ≤5-7 fields | `ContactForm.tsx`: 4 `<input>` (name, email, phone, city) + 1 `<textarea>` (message) = **5 fields**. Within recommended range. | ✅ |
| 11.1.6 | Action-verb CTAs (not "Submit") | Submit button text comes from `translations.ts`: EN `"submitCta": "Get my quote"`, FR `"submitCta": "Obtenir mon devis"`. **Action-verb style ✅** — but FR uses `devis` again (per F7.4-A theme). | ✅ (with NIT carryover to F7.4-A) |
| 11.1.7 | CTA contrast vs surroundings | Primary nav CTA: `btn btn-primary btn-pill` on dark Header (`--bg-dark #0A0B0D`) with white text inside accent pill. Form submit: `bg-[var(--primary)]` (#0A0B0D near-black) on white form background — high contrast, easy scan. Verified §10.5.7 colour ratios meet AA-AAA. | ✅ |

## 11.2 Design Sins (Instant Fails)

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 11.2.1 | No emoji in TSX components | Perl-regex grep on Unicode emoji ranges across `src/components/**/*.tsx` → **0 matches** | ✅ |
| 11.2.2 | No rainbow / ColourfulText / text-gradient | grep `ColourfulText\|rainbow\|text-gradient` → **0 matches** | ✅ |
| 11.2.3 | No hover-hides-products | grep matches reviewed:<br>• `(en)/blog/page.tsx:49` & `fr/blogue/page.tsx:48` — `hover:border-[var(--accent)]` (border-color change on card hover; nothing hidden) ✅<br>• `ContactForm.tsx:106` — `hover:opacity-90` on submit button (slight dim, accessibility OK) ✅<br>• `Header.tsx:91` — `group-hover:rotate-180` on dropdown chevron ✅<br>• `Header.tsx:97` — dropdown menu pattern: `invisible opacity-0` BY DEFAULT, becomes `group-hover:visible group-hover:opacity-100` on hover. **This REVEALS, not hides** — correct dropdown UX. | ✅ |

## 11.3 Animation Check

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 11.3.1 | framer-motion imports count | `grep -rl "from 'framer-motion'"` → **0 files**. Site has no JS animation library — pure CSS. | ✅ |
| 11.3.2 | CSS keyframes count | **9** keyframes in `src/app/globals.css`: `fadeInUp`, `fadeIn`, `scaleIn`, `slideInLeft`, `slideInRight`, `countPulse`, `shimmer`, `float`. Reasonable density (entry/idle effects only). | ✅ |
| 11.3.3 | Entry animations CSS-only (not framer on hero) | grep for `initial=.*opacity.*0|animate=.*opacity.*1` → **0 hits**. Hero uses CSS class `animate-fade-in` (per H1 markup observed in §4 sample). | ✅ |

## 11.4 Hydration Safety

| #     | Check | Evidence | Result |
|-------|-------|----------|--------|
| 11.4.1 | 'use client' component count | **5 files** | ✅ |
| 11.4.2 | List 'use client' components | `VisitTracker.tsx`, `FAQSection.tsx`, `ContactForm.tsx`, `FloatingCTA.tsx`, `Header.tsx`. All five have justified client interactivity (visit tracking, accordion state, form submission state, scroll-trigger CTA, mobile-menu state). No accidental client boundaries. | ✅ |
| 11.4.3 | No `typeof window` in render paths | grep in `src/components/**/*.tsx` → **0 matches** | ✅ |
| 11.4.4 | Logo has no 'use client' | `src/components/Logo.tsx` opens with the JSDoc + `import Link from 'next/link'` (no `'use client'` directive). Server component ✅ | ✅ |
| 11.4.5 | Logo has no framer-motion | `grep 'motion\|framer' src/components/Logo.tsx` → 0 matches | ✅ |

---

## Section 11 Findings

### F11.1-A — FR submit CTA uses `devis` instead of `soumission` (NIT)

`translations.ts`: FR `"submitCta": "Obtenir mon devis"` — same Canadian-French preference issue as F7.4-A. Both findings could be addressed in a single pass:
- "Obtenir mon devis" → "Obtenir ma soumission"
- The 8 boilerplate `devis` mentions in products.ts/industries.ts also rewritten as part of F7.7-A boilerplate fix.

### Strengths (no other findings — section is essentially clean)

- **Above-fold conversion path:** sticky Header with always-visible phone + Quote CTA + Contact link.
- **Mobile-friendly conversion:** `FloatingCTA.tsx` provides a scroll-triggered tel: link.
- **Form discipline:** 5 fields total, action-verb submit ("Get my quote"), high-contrast button, FR/EN labelled.
- **Zero design sins:** no emoji, no rainbow text, no hover-hides patterns. Dropdown menu pattern is correct (hidden by default, revealed on hover).
- **Animation hygiene:** zero framer-motion runtime weight; 9 CSS keyframes for idle/entry effects.
- **Hydration boundary discipline:** only 5 client components; each has clear interactive justification; no `typeof window` leaks; brand-signature `Logo` is server-rendered (correct per Phase 5.3 hydration rule).

## Section 11 Summary

| Severity | Count | Findings |
|----------|-------|----------|
| **P0** | 0 | — |
| **NIT** | 1 | F11.1-A (FR submit CTA "devis" — same theme as F7.4-A; single fix-pass with the boilerplate rewrite) |
| **PASS rows** | 18 | All conversion elements, design sin checks, animation hygiene, hydration safety |

**Verdict for Section 11:** **PASS.** Conversion architecture is
solid (visible phone + above-fold CTA + 5-field form with verb CTA),
zero design sins, no JS animation library overhead, hydration
boundaries minimal and justified. The single carry-along NIT is the
FR `devis` token in the submit CTA — the same finding as F7.4-A.

---

**STOP — awaiting `NEXT` for Section 12 (Consolidated Report + Final Verdict).**
