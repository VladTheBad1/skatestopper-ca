import React from 'react'

interface SectionHeaderProps {
  /** Small uppercase eyebrow above the headline (e.g. "SPECIFICATIONS"). */
  eyebrow: string
  /** Headline. The `highlight` substring (if present) is rendered in accent. */
  title: string
  /** Optional substring of `title` to color in accent. Case-sensitive match. */
  highlight?: string
  /** Optional supporting paragraph below the headline. */
  description?: string
  /** Center vs left align (default left). */
  align?: 'left' | 'center'
  /** 'dark' variant for use over --bg-dark backgrounds (white H2 text). */
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * Section header: small uppercase accent eyebrow, bold H2 with the
 * product/section noun highlighted in accent red. Used by ProductDetailPage,
 * IndustryDetailPage, and any future detail-page section.
 */
export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  variant = 'light',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  let titleNode: React.ReactNode = title
  if (highlight && title.includes(highlight)) {
    const idx = title.indexOf(highlight)
    titleNode = (
      <>
        {title.slice(0, idx)}
        <span className="text-[var(--accent)]">{highlight}</span>
        {title.slice(idx + highlight.length)}
      </>
    )
  }

  return (
    <div className={`${alignClass} ${className}`}>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3 block">
        {eyebrow}
      </span>
      <h2
        className={`font-bold tracking-tight ${variant === 'dark' ? 'text-white' : 'text-[var(--text)]'}`}
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
      >
        {titleNode}
      </h2>
      {description && (
        <p
          className={`mt-3 leading-relaxed ${variant === 'dark' ? 'text-white/80' : 'text-[var(--text-light)]'} ${
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
