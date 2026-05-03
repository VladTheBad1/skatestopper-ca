import React from 'react'
import { autoBold } from './content-format'

interface ProseOpts {
  /** Optional H3 sub-heads injected between paragraph chunks (one per chunk after the first). */
  subheadings?: string[]
  /** Sentences per chunk (default 4). */
  sentencesPerChunk?: number
  /** Extra regex source threaded into autoBold (niche-specific tokens). */
  extraTokens?: string
  className?: string
}

/**
 * Render long-form markdown body as a series of clean paragraphs:
 *   1. Strip bold/italic/code/blockquote/heading markers (no `**` leaks).
 *   2. Chunk into N-sentence paragraphs.
 *   3. Inject optional H3 sub-heads between chunks.
 *   4. Run autoBold on each chunk.
 *
 * Niche-neutral. The page passes its own `extraTokens` for niche-specific
 * bolding (e.g. compliance codes, technical units).
 */
export function renderProse(markdown: string, opts: ProseOpts = {}): React.ReactNode {
  const {
    subheadings = [],
    sentencesPerChunk = 4,
    extraTokens,
    className = '',
  } = opts

  if (!markdown || markdown.trim().length === 0) return null

  // 1. strip markdown markers
  const cleaned = markdown
    .replace(/^#+\s.+$/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(?<![*])\*([^*\n]+)\*(?![*])/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // 2. chunk — split on whitespace preceded by sentence punctuation only.
  // Prevents "Skatestopper.ca" / "e.g." / "3.5m" being split mid-token (the period
  // there is not followed by whitespace, so the split skips it).
  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const chunks: string[] = []
  for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
    const chunk = sentences.slice(i, i + sentencesPerChunk).join(' ').trim()
    if (chunk.length > 0) chunks.push(chunk)
  }

  if (chunks.length === 0) {
    // fallback: render the cleaned text as a single paragraph
    return (
      <p className={`text-[var(--text-light)] leading-[1.8] text-[15px] md:text-base ${className}`}>
        {autoBold(cleaned, { extraTokens })}
      </p>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {chunks.map((chunk, i) => (
        <div key={i}>
          {i > 0 && i - 1 < subheadings.length && (
            <h3
              id={subheadings[i - 1]
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .slice(0, 60)}
              className="font-bold text-[var(--text)] text-lg mb-3 mt-4 scroll-mt-24"
            >
              {subheadings[i - 1]}
            </h3>
          )}
          <p className="text-[var(--text-light)] leading-[1.8] text-[15px] md:text-base">
            {autoBold(chunk, { extraTokens })}
          </p>
        </div>
      ))}
    </div>
  )
}

/**
 * First sentence (or first ~N chars) of a markdown body — used for hero
 * subtitles. Strips markers cleanly.
 */
export function firstSentence(markdown: string, maxLen = 220): string {
  if (!markdown) return ''
  const cleaned = markdown
    .replace(/^#+\s.+$/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(?<![*])\*([^*\n]+)\*(?![*])/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
  const para = cleaned.split(/\n\n+/).find((p) => p.trim().length > 40) || cleaned
  const sent = para.match(/[^.!?]+[.!?]+/g)
  const out = sent ? sent[0].trim() : para.slice(0, maxLen)
  return out.length > maxLen ? out.slice(0, maxLen).trim() + '…' : out
}
