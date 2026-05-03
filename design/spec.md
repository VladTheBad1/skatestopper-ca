---
type: design-spec
status: active
created: 2026-04-29
updated: 2026-04-29
source: ~/Downloads/skatestopper-web.png (1024×1536)
mode: pixel-perfect copy (spec mode)
---

# skatestopper.ca — Design Spec

Reference mockup: `design/mockup-full.png` (1024×1536). Sections cropped to `design/mockup-sections/section-{0,1,2,3}.png` for review.

## Palette (sampled from source)

| Token        | Hex       | Usage |
|--------------|-----------|-------|
| `--bg-dark`  | `#08090B` | Header, hero, solutions section, map section, footer |
| `--bg-deep`  | `#040506` | Hero left panel (slightly darker) |
| `--bg-light` | `#EFEFEF` | Trust strip, applications section |
| `--bg-card`  | `#FFFFFF` | Application photo cards |
| `--accent`   | `#C0212A` | Logo "STOPPER", eyebrows, CTAs, icons, footer CTA |
| `--accent-hover` | `#A01820` | Button hover |
| `--text-on-dark` | `#FFFFFF` | Headlines on dark sections |
| `--text-muted-on-dark` | `#9A9A9A` | Body copy on dark hero |
| `--text-on-light` | `#0A0A0C` | Headlines on light sections |
| `--text-muted-on-light` | `#5A5A5A` | Body copy on light sections |
| `--border-faint` | `#1A1B1D` | Subtle dividers on dark |

Notes:
- Site is dominantly dark — alternating `--bg-dark` and `--bg-light` bands.
- Single accent: red. No secondary brand color. Maple leaf in trust strip is the only place a second hue (Canadian flag white) appears, and that's white-on-red.

## Typography

Headline family: heavy condensed display sans, ALL CAPS, tight tracking. Use **Oswald 700** (Google Fonts) — closest free match to the mockup's industrial wordmark feel. Fallback `'Barlow Condensed', system-ui, sans-serif`.

Body family: **Inter 400/500/600**. Fallback `system-ui, -apple-system, sans-serif`.

Eyebrow labels: Inter 600, ALL CAPS, tracking `0.12em`, color `--accent`, ~12px, preceded by a 24px red dash on a separate line above (`<div className="eyebrow-rule" />` rendering `─`).

Type scale (desktop):
| Role | Size | Weight | Family | Tracking |
|------|------|--------|--------|----------|
| Hero H1 | 56px / 1.05 | 700 | Oswald | `-0.01em` |
| Section H2 | 40px / 1.1 | 700 | Oswald | `-0.01em` |
| Card title | 14px / 1.3 | 700 | Inter, UPPERCASE | `0.06em` |
| Eyebrow | 12px / 1 | 600 | Inter, UPPERCASE | `0.12em` |
| Body | 15px / 1.55 | 400 | Inter | normal |
| Body small (cards) | 13px / 1.5 | 400 | Inter | normal |
| Nav link | 13px / 1 | 500 | Inter | `0.04em` |
| Button | 13px / 1 | 700 | Inter, UPPERCASE | `0.08em` |

## Iconography

Library: **Lucide** (`lucide-react`). Stroke 1.5–2.

Trust strip icons (line, red, ~36px):
- Shield (PreventsDamage) → `Shield`
- Eye-off (Discreet & Effective) → `EyeOff`
- Maple leaf (Canada Wide) → custom SVG path (Lucide has no maple); render filled red maple leaf
- Clock (Built To Last) → `Clock`

Applications photo-card overlay icons (white pictogram inside solid red circle, ~56px):
- Municipalities → `Landmark`
- Commercial Properties → `Building2`
- Transit Authorities → `TramFront` (or `Train`)
- Schools & Campuses → `GraduationCap`

Inline arrow CTA: `ArrowRight` 16px, red.

Footer phone/email: `Phone`, `Mail` 16px red.

## Spacing & Radius

- Container max-width: 1280px (`max-w-7xl`), 32px gutters mobile, 64px desktop.
- Section vertical padding: 80px desktop, 56px mobile.
- Border radius: **4px** on cards & buttons (industrial, sharp). Pill button uses fully rounded (`rounded-full`).
- Button height: 48px desktop, 44px mobile. Horizontal padding 24px.

## Components

### Header (sticky, dark)
Layout: `[X-logo]  SKATESTOPPER.CA / SKATE DETERRENT SOLUTIONS  ............  [nav links]  [REQUEST A QUOTE pill]`
- Logo X is a custom red+black overlapping X mark (~32px), wordmark to its right; "STOPPER" in red, rest white.
- Strapline "SKATE DETERRENT SOLUTIONS" in 9px tracked uppercase grey under wordmark.
- Nav: SOLUTIONS▾, PRODUCTS▾, APPLICATIONS▾, RESOURCES, ABOUT, CONTACT.
- CTA: solid red pill `REQUEST A QUOTE`.

### Hero (dark, two-column)
- Left 50%: deep-dark panel with copy, padded 80px.
- Right 50%: full-bleed photo (concrete edge with metal pyramid skate stoppers).
- H1: "DESIGN SPACES." / "NOT SKATE SPOTS." (white) / "WE STOP SKATING." (red).
- Body 3 lines, muted grey.
- Two CTAs side-by-side: white-bordered ghost rect "EXPLORE SOLUTIONS" + text-only "VIEW PRODUCTS →".

### Trust strip (light, 4-up)
4 columns, centered icon (red, line) + UPPERCASE 14px title + 13px muted body.
A short red horizontal rule appears above each column's content (matches eyebrow rule).

### Solutions section (dark)
Layout: left intro column (~30%), right 5-card horizontal scroll/grid (~70%).
- Left: red eyebrow "OUR SOLUTIONS" + H2 "Engineered to deter. Built to endure." + body + "VIEW ALL PRODUCTS →" red link.
- Right: 5 cards. Each card: dark bg with photo of product centered (white-cut-out), bottom: UPPERCASE white title, 2-line muted body, red `→` button.
- Cards: 1px subtle border `--border-faint`, 4px radius, ~200px wide.

### Applications section (light, photo cards)
Same intro-left + cards-right pattern.
- Left: red eyebrow "APPLICATIONS" + H2 "SOLUTIONS FOR EVERY ENVIRONMENT" + body.
- Right: 4 photo cards. Each: building photo, bottom-center white badge with red circular icon overlay (icon sits at the seam between photo and white footer), then UPPERCASE label.

### Coast-to-Coast / Map section (dark)
Full-width dark band with stylized Canada outline map peppered with red pin dots on left ~60%. Right ~40% has eyebrow "COAST TO COAST", H2 "WE'VE GOT CANADA COVERED.", body, red CTA "FIND YOUR SOLUTION →".

### Footer
Two-row dark structure:
- **Row 1 (left):** red card "Let's protect your space." with chat-bubble icon + body + white outlined "REQUEST A QUOTE" button. Width ~30%.
- **Row 1 (right, dark):** logo + social icons (LinkedIn, Instagram circles) | SOLUTIONS column | APPLICATIONS column | COMPANY column | contact column (phone, email, "Proudly Canadian 🍁").
- All column headers in red UPPERCASE 12px; links in white 13px.

## Build order

1. Generate `globals.css` with these tokens (`Phase 3.1c`).
2. Install Oswald + Inter via `next/font/google`.
3. Install `lucide-react` (already present likely).
4. Build components in this order, screenshot-diff each before next: Header → Hero → TrustStrip → SolutionsSection → ApplicationsSection → CoverageMap → Footer.
5. Wire each to existing data files (`products.ts`, `industries.ts` for applications, `cities.json` for map pins, `config.json` for brand).

## Pixel-diff workflow

After each component: render at 1280×900, screenshot, place beside cropped reference at same width, eyeball diff. Adjust until match is "same pixel grid", not "looks close". Do NOT downgrade to "inspired by" because faithful is harder.
