import { siteConfig } from '@/config/site-config'

interface LogoProps {
  variant?: 'light' | 'dark'
}

/**
 * Logo — brand name from siteConfig. Colors from CSS variables.
 * Icon is a simple shield — override per niche in Phase 5.
 * Pure server component. No 'use client'. No framer-motion.
 */
export default function Logo({ variant = 'dark' }: LogoProps) {
  const iconColor = variant === 'light' ? 'text-[var(--primary-light)]' : 'text-[var(--primary)]'
  const textColor = variant === 'light' ? 'text-white' : 'text-[var(--text)]'

  return (
    <span className="flex items-center gap-2 leading-none">
      {/* Default icon — override per niche */}
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={`w-7 h-7 ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
        <path d="M16 3L27 8V16C27 22 22 27 16 29C10 27 5 22 5 16V8L16 3Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 16L14 19L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-bold text-lg tracking-tight transition-colors duration-300 group-hover:text-[var(--primary)] ${textColor}`}>
        {siteConfig.brand.logoText || siteConfig.brandName}
      </span>
    </span>
  )
}
