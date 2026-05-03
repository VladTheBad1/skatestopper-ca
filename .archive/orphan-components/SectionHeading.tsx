interface SectionHeadingProps {
  locale: 'en' | 'fr'
  tag: string
  title: string
  subtitle?: string
  light?: boolean
}

/**
 * SectionHeading — reusable section header. No hardcoded text. No framer-motion.
 * Colors from CSS variables.
 */
export default function SectionHeading({ tag, title, subtitle, light }: SectionHeadingProps) {
  const textColor = light ? 'text-white' : 'text-[var(--text)]'
  const tagColor = light ? 'text-[var(--primary-light)]' : 'text-[var(--primary)]'
  const subColor = light ? 'text-white/60' : 'text-[var(--text-light)]'

  return (
    <div className="mb-12">
      {tag && (
        <span className={`eyebrow ${tagColor} block mb-3`}>{tag}</span>
      )}
      <h2 className={`font-extrabold tracking-tight ${textColor}`} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg max-w-[600px] ${subColor}`}>{subtitle}</p>
      )}
    </div>
  )
}
