/**
 * Markdown helpers — strip markdown syntax and produce clean excerpts.
 *
 * Use these anywhere you need to render a markdown field as plain text
 * (card subtitles, meta descriptions, hero copy). Never use
 * `.substring(0, N)` on a markdown field — it leaks asterisks/underscores
 * into the UI.
 */

/**
 * Strip markdown syntax from a string, returning plain text.
 * Handles: headings, bold, italic, links, code, lists, blockquotes, images.
 */
export function stripMarkdown(md: string | null | undefined): string {
  if (!md) return ""
  let text = md

  // Remove code blocks (``` ... ```)
  text = text.replace(/```[\s\S]*?```/g, "")
  // Remove inline code (`code`)
  text = text.replace(/`([^`]+)`/g, "$1")
  // Remove images ![alt](url)
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
  // Remove links [text](url) — keep the text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  // Remove heading markers (# ## ###)
  text = text.replace(/^#{1,6}\s+/gm, "")
  // Remove bold/italic (**text**, __text__, *text*, _text_)
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1")
  text = text.replace(/__([^_]+)__/g, "$1")
  text = text.replace(/\*([^*]+)\*/g, "$1")
  text = text.replace(/_([^_]+)_/g, "$1")
  // Remove blockquote markers (> )
  text = text.replace(/^\s*>\s?/gm, "")
  // Remove list markers (- * +, numbered)
  text = text.replace(/^\s*[-*+]\s+/gm, "")
  text = text.replace(/^\s*\d+\.\s+/gm, "")
  // Remove horizontal rules
  text = text.replace(/^\s*[-*_]{3,}\s*$/gm, "")
  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim()

  return text
}

/**
 * Return a clean plain-text excerpt of a markdown string, truncated to
 * `maxLength` characters at a word boundary. Adds ellipsis if truncated.
 *
 * Use this for card subtitles, meta descriptions, and hero copy — anywhere
 * you need a short plain-text summary from a longer markdown field.
 */
export function excerpt(md: string | null | undefined, maxLength: number = 160): string {
  if (!md) return ''
  // Strip a leading Key Takeaways block (`> **Key takeaways**\n> - ...\n> - ...`)
  // before generating the excerpt — otherwise the excerpt opens with
  // "Key takeaways ..." run-on text instead of the lead paragraph.
  let cleaned = md.replace(/^(?:>\s?[^\n]*\n?)+\n*/, '')
  // Same pattern for FR "Points clés"
  cleaned = cleaned.replace(/^\s*\n+/, '')
  const plain = stripMarkdown(cleaned)
  if (plain.length <= maxLength) return plain

  // Truncate at the last space within maxLength
  const slice = plain.substring(0, maxLength)
  const lastSpace = slice.lastIndexOf(" ")
  const cut = lastSpace > maxLength * 0.6 ? lastSpace : maxLength
  return plain.substring(0, cut).trimEnd() + "…"
}

/**
 * Convert markdown to safe HTML. Minimal renderer: handles ##, **bold**,
 * paragraphs, lists, blockquotes. Returns HTML string for dangerouslySetInnerHTML.
 */
export function markdownToHtml(md: string | null | undefined): string {
  if (!md) return ""
  let html = md
  // Headings (## H2, ### H3) — emit slug `id` for anchor-link / GEO/LLM deep-link.
  // GEO/LLM optimization MUST: chunk-friendly headings with stable anchors so
  // models and search engines can cite specific sections.
  const slugify = (raw: string) => raw
    .replace(/<[^>]+>/g, '')         // strip any inline HTML
    .replace(/[*_`]/g, '')           // strip markdown decoration
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')  // normalize unicode dashes
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
  html = html.replace(/^### (.+)$/gm, (_m, t) => `<h3 id="${slugify(t)}">${t}</h3>`)
  html = html.replace(/^## (.+)$/gm, (_m, t) => `<h2 id="${slugify(t)}">${t}</h2>`)
  // Blockquotes (multi-line) — merge consecutive `> ...` lines, then process
  // bullet sub-items inside so a `> - item` produces a real <ul><li> inside
  // the <blockquote> instead of running everything together.
  html = html.replace(/(?:^|\n)((?:>\s?[^\n]*(?:\n|$))+)/g, (match: string, block: string) => {
    const lines = block.trim().split(/\n/).map(l => l.replace(/^>\s?/, ''))
    // Convert any bullet lines inside the blockquote to a list
    const out: string[] = []
    let inList = false
    for (const l of lines) {
      if (/^- /.test(l)) {
        if (!inList) { out.push('<ul>'); inList = true }
        out.push(`<li>${l.replace(/^- /, '')}</li>`)
      } else {
        if (inList) { out.push('</ul>'); inList = false }
        if (l.trim()) out.push(`<p>${l}</p>`)
      }
    }
    if (inList) out.push('</ul>')
    return `\n<blockquote>${out.join('')}</blockquote>\n`
  })
  // Bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // Italic *text*
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
  // Inline code `text`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  // Markdown tables: | h1 | h2 | ... |\n| --- | --- | ... |\n| c1 | c2 | ... |
  // Block must have at least 2 lines (header + separator) to qualify.
  html = html.replace(/(?:^|\n)((?:\|[^\n]+\|\s*\n?){2,})/g, (match: string, block: string) => {
    const lines = block.trim().split(/\n/).filter(Boolean)
    // Need separator line (---|---|...) on row 2
    if (lines.length < 2 || !/^\|\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|/.test(lines[1])) return match
    const header = lines[0].slice(1, -1).split('|').map(c => c.trim())
    const rows = lines.slice(2).map(line => line.slice(1, -1).split('|').map(c => c.trim()))
    const ths = header.map(h => `<th>${h}</th>`).join('')
    const trs = rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')
    return `\n<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>\n`
  })

  // Bullet lists (one level)
  html = html.replace(/(?:^|\n)((?:- .+(?:\n|$))+)/g, (match, list) => {
    const items = list.trim().split(/\n/).map((line: string) => `<li>${line.replace(/^- /, '')}</li>`).join('')
    return `\n<ul>${items}</ul>`
  })
  // Numbered lists
  html = html.replace(/(?:^|\n)((?:\d+\. .+(?:\n|$))+)/g, (match, list) => {
    const items = list.trim().split(/\n/).map((line: string) => `<li>${line.replace(/^\d+\. /, '')}</li>`).join('')
    return `\n<ol>${items}</ol>`
  })
  // Paragraphs (split on double newline, wrap if not already a block)
  html = html.split(/\n\n+/).map(block => {
    block = block.trim()
    if (!block) return ''
    if (/^<(h[1-6]|ul|ol|li|blockquote|p|table)/i.test(block)) return block
    return `<p>${block.replace(/\n/g, '<br>')}</p>`
  }).filter(Boolean).join('\n')
  return html
}

/**
 * Get the first paragraph (or sentence) of a markdown string as plain text.
 * Useful for excerpts and meta descriptions.
 */
export function getFirstParagraph(md: string | null | undefined, maxLen = 200): string {
  const stripped = stripMarkdown(md)
  if (!stripped) return ""
  // Take first paragraph (split on double newline)
  const firstPara = stripped.split(/\n\n+/)[0].trim()
  if (firstPara.length <= maxLen) return firstPara
  // Truncate at sentence boundary near maxLen
  const truncated = firstPara.slice(0, maxLen)
  const lastPeriod = truncated.lastIndexOf(". ")
  return lastPeriod > 50 ? truncated.slice(0, lastPeriod + 1) : truncated.trim() + "…"
}
