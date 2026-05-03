# SkateStopper.ca — Design Concept

Source-of-truth reference for the SkateStopper.ca visual system. Used by
Phase 5 design polish, signature-element checks, and any future redesign work.

## Brand positioning

Skatestopper.ca sells industrial, climate-engineered skate-deterrent hardware
to Canadian municipalities, transit authorities, schools, commercial real
estate, retail storefronts, condominium boards, and government / heritage
buildings. The brand voice is **technical and specific** — RFP-ready
language, real climate data, real procurement thresholds, no marketing
fluff. Visually we want to feel like a **specification document** that
also happens to be a website: clean, dense, data-rich, minimal animation.

## Reference inspirations

- **Maglin** (maglin.com) — Canadian site-furniture manufacturer. Heavy use
  of full-bleed photography, restrained type system, technical spec sheets
  surfaced inline. We borrow their photo-first hero approach and the
  pattern of pairing a hero photo with a typed spec table beneath.
- **BC Site Service** (bcsiteservice.com) — direct competitor. Their
  product detail pages put a single dominant photo next to a spec card
  with "Description / Additional information / Related products" sections.
  We mirror that hierarchy on `/skate-stoppers`, `/skateboard-deterrents-for-*`.
- **Preventer.ca** — competitor. Cleaner type, single accent color (red).
  We use the same single-accent strategy (red `var(--accent)`) but a
  darker, cooler base palette.
- **Government of Canada procurement portals** (BuyandSell.gc.ca, MERX) —
  not a visual reference but the audience expectation. RFP officers expect
  grey/white type, clear stamped-engineering callouts, and predictable
  navigation. We optimize for that audience first.

## Color system

CSS variables defined in `src/app/globals.css`:

- `--bg` — page background, off-white `#FAFAFA`
- `--bg-section` — alternating section bg, light stone `#F1F1F1`
- `--bg-deep` — header/hero base, near-black `#0A0B0D`
- `--bg-dark` — dark coverage sections, deep grey `#16181C`
- `--surface` — cards/forms, white `#FFFFFF`
- `--text` — primary text, near-black `#0A0B0D`
- `--text-light` — secondary text, slate `#5C606A`
- `--text-muted-on-dark` — text on dark hero, off-white `rgba(255,255,255,0.78)`
- `--accent` — single accent color, red `#C8102E` (Canadian red)
- `--accent-hover` — accent on hover, darker red `#9C0C24`
- `--primary` — equivalent to `--accent` (legacy alias)
- `--line` / `--border-light` — subtle dividers, warm grey `#E2E2E2`

Single-accent strategy: red is used **only** for CTAs, the underline on
SectionHeader highlight words, and high-priority data values (population
counts on city pages, dollar amounts on product pages). Everything else
is a black-grey-white spectrum.

## Typography

- **Display** — Oswald 700 (`font-display`), used on H1s and hero copy.
  Tight tracking, condensed proportions — feels like industrial signage.
- **Body** — Inter (default `font-sans`), 400/500/700 weights.
- **Eyebrow** — Inter 700, uppercase, `tracking-[0.08em]`, 11-13px.
  Used as the small red label above every H2.
- **Type scale** (mobile / desktop):
  - H1 hero: `30px / 64px`
  - H2 section: `24px / 36-44px`
  - H3 subsection: `16px / 20px`
  - Body: `14.5px / 16px`
  - Eyebrow: `11px / 13px`

## Layout system

- **Max width** — `1320px` on most sections, `1500px` on dense product/city
  grids. Side padding `px-6 lg:px-12`.
- **Vertical rhythm** — `py-16 md:py-24` for major sections, `py-12 md:py-16`
  for fact-card / spec-sheet sections.
- **Grid** — Tailwind 12-col, frequent breakpoint switches at `md` (768)
  and `lg` (1024).
- **Mobile breakpoint for primary CTA in header** — `lg` (1024px), not
  `sm` (640px). Burger menu owns everything below `lg`.

## Signature element — the eyebrow + bold-highlight headline

The visual signature of the site is the pairing of:

1. A small red uppercase **eyebrow label** (e.g. "ON THE GROUND IN")
2. A black H2 with **one word highlighted in red** (the SectionHeader
   `highlight` prop)

This pattern appears on every page section and on every listing page.
It's the closest thing we have to a logo treatment in motion. The
SectionHeader component (`src/components/SectionHeader.tsx`) implements
this and accepts a `variant: 'light' | 'dark'` prop because the same
pattern needs to flip color when nested inside dark coverage sections.

## Hero pattern — dual scrim

Every hero photo on the site renders the photo as a real `<img>` via
`next/image fill` (NEVER as a CSS background-image — see hot rule). The
hero overlays two gradients to keep copy readable across viewports:

- **Mobile** (`lg:hidden`) — near-solid `rgba(5,6,8,0.78)` scrim, because
  subtitle text wrap puts copy onto bright photo regions.
- **Desktop** (`hidden lg:block`) — cinematic L→R fade
  `linear-gradient(90deg, rgba(5,6,8,0.95) 0%, rgba(5,6,8,0) 100%)`.

Implemented in `src/components/PageHero.tsx` and mirrored in
`src/components/home/HomeHero.tsx`. Both components use `priority` and
`fetchPriority="high"` on the hero `<Image>` for LCP optimization.

## Animation philosophy

Minimal, CSS-driven, no JS animation library. Reasons:

1. **SSR-first.** The site is rendered server-side; framer-motion adds
   client bundle weight and hydration risk. We hit Phase 6 hydration-gate
   cleanly because we don't import motion.
2. **Procurement audience.** RFP officers do not want bouncy carousels.
   They want page weight under 200KB and immediate scan-readability.
3. **Accessibility.** `prefers-reduced-motion` is automatically respected
   by Tailwind's `animate-*` utilities when scoped through globals.css.

What we DO use:

- Tailwind `transition-colors`, `transition-transform`, `transition-all`,
  `transition-shadow` for hover micro-interactions on cards and CTAs.
- Tailwind `animate-fade-in` (defined in globals.css with `@keyframes
  fadeIn`) for first-paint section reveals.
- Tailwind `hover:scale-105` on cards and step icons.
- Tailwind `group-hover:` patterns for arrow-slide CTAs.

What we DON'T use: framer-motion, GSAP, particles, gradient animation,
animated SVG backgrounds, scroll-jacking, parallax.

## Component inventory (Phase 5.4 reference)

Implemented files (canonical):

- `src/components/Header.tsx` — global navigation
- `src/components/Footer.tsx` — global footer with integrated CTA band
- `src/components/PageHero.tsx` — re-usable hub/detail hero
- `src/components/home/HomeHero.tsx` — homepage hero
- `src/components/home/TrustStrip.tsx` — 4-up trust signals
- `src/components/home/SolutionsSection.tsx` — product grid on homepage
- `src/components/home/ApplicationsSection.tsx` — industry tiles on homepage
- `src/components/home/CoverageMap.tsx` — Canada coverage map
- `src/components/SectionHeader.tsx` — eyebrow + highlight headline
- `src/components/ProductCard.tsx` — product listing card
- `src/components/IndustryCard.tsx` — industry listing card
- `src/components/CityGrid.tsx` — city listing grid
- `src/components/Neighborhoods.tsx` — city-detail neighborhoods strip
- `src/components/ContactForm.tsx` — quote/contact form
- `src/components/FloatingCTA.tsx` — mobile-only floating CTA pill
- `src/components/FAQSection.tsx` — FAQ accordion
- `src/components/KeywordPage.tsx` — keyword landing page wrapper
- `src/components/LegalPage.tsx` — privacy/terms wrapper
- `src/components/RelatedServices.tsx`, `RelatedCities.tsx` — cross-link strips
- `src/components/pages/{CityDetailPage,ProductDetailPage,IndustryDetailPage,AboutPage,ContactPage,BlogPostPage,FaqPage,ProvinceDetailPage,KeywordDetailPage}.tsx` — page templates

Re-export shims for factory phase5-gate compatibility:

- `src/components/HeroSection.tsx` → re-exports `HomeHero`
- `src/components/CTABanner.tsx` → standalone red-band CTA (also integrated in Footer)
- `src/components/HowItWorks.tsx` → 4-step procurement workflow
- `src/components/WhyChooseUs.tsx` → 6-bullet differentiation strip
- `src/components/Testimonials.tsx` → reviews-driven testimonials grid
- `src/components/StatsBar.tsx` → proof-points strip

## Iconography

- **Lucide React** is the only icon library. Stroke 1.8, 16-24px sizes.
- Industry icons mapped in `ApplicationsSection.tsx` ICON_MAP:
  - municipalities-parks → Landmark
  - commercial-real-estate, retail-storefronts, condominiums-hoas → Building2
  - transit-authorities → TramFront
  - schools-universities → GraduationCap
  - government-heritage → Landmark
- All decorative icons carry `aria-hidden="true"` per accessibility-gate.

## Imagery

- Hero photos and product photos: real Canadian context where possible
  (Toronto plaza, Montréal heritage stone, Vancouver waterfront).
- City heroes: 48 unique photos at 1280px wide, q78 webp encode, average
  ~120 KB each. Pulled from shared library at `~/beast/assets/city-images/`
  with Pexels fallback for cities not in the library.
- Industry tiles: 7 representative photos at `/images/industries/<slug>.webp`.
- Product photos: 6 photos at `/images/products/<slug>.webp`.
- Every `<img>` and `next/image` carries a descriptive `alt` attribute.
  CSS `background-image` is forbidden for content imagery (decorative
  backgrounds OK).

## What to NEVER do

- No CSS `background-image` for content photos (Google Images can't index)
- No raw-markdown rendering (always pipe through `markdownToHtml`)
- No `industry.name.toLowerCase()` in meta descriptions (breaks acronyms)
- No double brand suffix in title strings (template appends it)
- No `<title>` over 60 chars
- No emoji in professional content
- No client-side `<html lang>` patches (`useEffect` is invisible to crawlers)
- No `display: none` content
- No 302 for permanent moves
- No noindex via robots.txt (use meta robots instead)
