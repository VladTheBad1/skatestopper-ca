/**
 * Playwright SEO/Format audit per FACTORY-MASTER §2.11.
 * Crawls every page archetype, extracts structural metrics, and emits
 * a per-page conformance report.
 *
 * Usage: node seo-audit.js [port=3051]
 */
const { chromium } = require('playwright')
const fs = require('fs')

const PORT = process.argv[2] || 3051
const BASE = `http://localhost:${PORT}`

// Every archetype, EN + FR. Detail samples kept narrow but representative.
const ROUTES = [
  // homepage
  ['homepage-en', '/'],
  ['homepage-fr', '/fr'],
  // hubs
  ['products-hub-en', '/products'],
  ['products-hub-fr', '/fr/produits'],
  ['industries-hub-en', '/industries'],
  ['industries-hub-fr', '/fr/secteurs'],
  ['cities-hub-en', '/cities'],
  ['cities-hub-fr', '/fr/villes'],
  ['blog-hub-en', '/blog'],
  ['blog-hub-fr', '/fr/blogue'],
  // product detail samples (3 of 6)
  ['product-pyramid-en', '/pyramid-skate-stoppers'],
  ['product-pyramid-fr', '/fr/bloque-skate-pyramide'],
  ['product-handrail-en', '/handrail-skate-stoppers'],
  ['product-handrail-fr', '/fr/bloque-skate-main-courante'],
  ['product-bench-en', '/bench-skate-stoppers'],
  // industry detail samples (3 of 7)
  ['industry-transit-en', '/transit-authorities'],
  ['industry-transit-fr', '/fr/autorites-transport'],
  ['industry-municipalities-en', '/municipalities-parks'],
  ['industry-schools-en', '/schools-universities'],
  // city detail samples (4 of 17)
  ['city-toronto-en', '/toronto'],
  ['city-toronto-fr', '/fr/toronto'],
  ['city-montreal-en', '/montreal'],
  ['city-vancouver-en', '/vancouver'],
  // geo cross
  ['geo-toronto-pyramid-en', '/toronto/pyramid-skate-stoppers'],
  // blog posts (all 4)
  ['blog-winter-en', '/blog/specifying-skate-stoppers-canadian-winter'],
  ['blog-winter-fr', '/fr/blogue/specifier-bloque-skate-hiver-canadien'],
  ['blog-handrail-en', '/blog/handrail-stoppers-cnb-aoda-compliance'],
  ['blog-heritage-en', '/blog/heritage-procurement-bronze-patina-approval'],
  ['blog-transit-en', '/blog/transit-shelter-bench-stopper-specifications'],
  // static
  ['about-en', '/about'],
  ['about-fr', '/fr/a-propos'],
  ['faq-en', '/faq'],
  ['faq-fr', '/fr/faq'],
  ['contact-en', '/contact'],
  ['contact-fr', '/fr/nous-joindre'],
]

async function audit(page, route, slug) {
  const url = BASE + route
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {})

  const r = await page.evaluate(() => {
    // Strip header + footer + script/style for fair body content count
    const main = document.querySelector('main') || document.body
    const text = main.innerText.trim()

    const counts = {
      h1: document.querySelectorAll('h1').length,
      h2: main.querySelectorAll('h2').length,
      h3: main.querySelectorAll('h3').length,
      strong: main.querySelectorAll('strong, b').length,
      em: main.querySelectorAll('em, i').length,
      ul: main.querySelectorAll('ul').length,
      ol: main.querySelectorAll('ol').length,
      table: main.querySelectorAll('table').length,
      blockquote: main.querySelectorAll('blockquote').length,
      img: main.querySelectorAll('img').length,
      links: main.querySelectorAll('a[href]').length,
    }
    const h1Text = (document.querySelector('h1')?.innerText || '').trim()
    const h2Texts = [...main.querySelectorAll('h2')].map(h => h.innerText.trim().slice(0, 80))

    // Word count of visible content
    const words = text.split(/\s+/).filter(Boolean).length

    // Average paragraph length (sentences)
    const paragraphs = [...main.querySelectorAll('p')].map(p => p.innerText.trim()).filter(t => t.length > 30)
    const sentenceCounts = paragraphs.map(p => (p.match(/[.!?]+(?:\s|$)/g) || []).length)
    const avgSentences = sentenceCounts.length ? Math.round(10 * sentenceCounts.reduce((a, b) => a + b, 0) / sentenceCounts.length) / 10 : 0
    const longParas = sentenceCounts.filter(c => c > 5).length

    // Key Takeaways heuristic: any blockquote or div containing "Key takeaway" / "Points clés"
    const keyTakeaways = !!main.innerHTML.match(/Key\s+[Tt]akeaway|Points\s+cl[eé]s/)

    // Title + meta
    const title = document.title
    const desc = document.querySelector('meta[name="description"]')?.content || ''
    const ogImage = document.querySelector('meta[property="og:image"]')?.content || ''
    const lang = document.documentElement.lang
    const canonical = document.querySelector('link[rel="canonical"]')?.href || ''
    const hreflang = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].length
    const jsonld = document.querySelectorAll('script[type="application/ld+json"]').length

    // Raw markdown leak check
    const rawMd = (document.body.innerHTML.match(/\*\*[^*]+\*\*/g) || []).length

    // First 150 words of visible body — does it answer the page's intent?
    const firstWords = text.split(/\s+/).slice(0, 150).join(' ')

    return {
      title, desc, ogImage, lang, canonical, hreflang, jsonld,
      h1Text, h2Texts,
      counts, words, avgSentences, longParas, paragraphCount: paragraphs.length,
      keyTakeaways, rawMd,
      firstWords,
    }
  })

  // §2.11 conformance scoring
  const issues = []
  if (r.counts.h1 !== 1) issues.push(`§2.11.1 H1 count = ${r.counts.h1} (need 1)`)
  if (r.counts.h2 < 2 && r.words > 400) issues.push(`§2.11.2 H2 count = ${r.counts.h2} on ${r.words}w page (need ≥2 for >400w)`)
  if (r.words > 600 && !r.keyTakeaways) issues.push(`§2.11.5 missing Key Takeaways block on ${r.words}w long-form page`)
  if (r.words >= 500 && r.counts.strong < 5) issues.push(`§2.11.18 bold count = ${r.counts.strong} on ${r.words}w (need ≥5 per 500w)`)
  if (r.words >= 500 && (r.counts.ul + r.counts.ol) < 1) issues.push(`§2.11.11 list count = ${r.counts.ul + r.counts.ol} on ${r.words}w (need 1-2 per 500w)`)
  if (r.longParas > 0) issues.push(`§2.11.14 ${r.longParas} paragraph(s) > 5 sentences (avg=${r.avgSentences})`)
  if (r.words > 1000 && r.counts.table === 0) issues.push(`§2.11.10 zero tables on ${r.words}w page (need ≥1 per 1000w with comparison data)`)
  if (r.rawMd > 0) issues.push(`raw markdown leak: ${r.rawMd} occurrences of **bold**`)
  if (r.title.length > 60) issues.push(`title ${r.title.length}ch (Google 60 limit)`)
  if (r.desc.length > 160 || r.desc.length < 70) issues.push(`meta desc ${r.desc.length}ch (need 70-160)`)
  if (r.counts.h1 === 1 && r.h1Text.length < 15) issues.push(`H1 too short: "${r.h1Text}" (${r.h1Text.length}ch)`)
  if (r.lang !== 'en-CA' && r.lang !== 'fr-CA') issues.push(`html lang = "${r.lang}" (need en-CA / fr-CA)`)
  if (r.hreflang < 2) issues.push(`hreflang count = ${r.hreflang} (need ≥2: en-CA + fr-CA)`)
  if (r.jsonld < 1) issues.push(`zero JSON-LD schemas`)

  return { slug, route, ...r, issues }
}

;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  const results = []
  for (const [slug, route] of ROUTES) {
    process.stdout.write(`  ${slug.padEnd(35)} ${route.padEnd(50)} ... `)
    try {
      const result = await audit(page, route, slug)
      const status = result.issues.length === 0 ? '✓' : `✗ ${result.issues.length} issue(s)`
      console.log(status)
      results.push(result)
    } catch (e) {
      console.log('ERROR', e.message.slice(0, 80))
      results.push({ slug, route, error: e.message })
    }
  }
  await browser.close()

  fs.writeFileSync('seo-audit-report.json', JSON.stringify(results, null, 2))

  // Summary report
  console.log('\n=== SUMMARY ===')
  const clean = results.filter(r => r.issues && r.issues.length === 0).length
  const dirty = results.filter(r => r.issues && r.issues.length > 0).length
  const errors = results.filter(r => r.error).length
  console.log(`Clean: ${clean} / ${results.length}  Dirty: ${dirty}  Errors: ${errors}`)

  console.log('\n=== ISSUES BY PAGE ===')
  for (const r of results) {
    if (r.error) {
      console.log(`\n❌ ${r.slug}  ${r.route}  ERROR: ${r.error}`)
    } else if (r.issues.length > 0) {
      console.log(`\n❌ ${r.slug}  ${r.route}  (${r.words}w · H1:${r.counts.h1} H2:${r.counts.h2} strong:${r.counts.strong} list:${r.counts.ul + r.counts.ol} table:${r.counts.table} bq:${r.counts.blockquote})`)
      r.issues.forEach(i => console.log(`     - ${i}`))
    }
  }

  console.log('\n=== ISSUE FREQUENCY ===')
  const counter = {}
  for (const r of results) {
    if (!r.issues) continue
    for (const i of r.issues) {
      const key = i.split(' ').slice(0, 2).join(' ')  // first two tokens
      counter[key] = (counter[key] || 0) + 1
    }
  }
  Object.entries(counter).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`  ${v.toString().padStart(3)}× ${k}`)
  })
})()
