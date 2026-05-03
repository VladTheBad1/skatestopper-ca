/**
 * Component Interface Contracts
 * 
 * Every theme must implement these prop interfaces.
 * Pixel has full creative freedom on HOW components look,
 * but they MUST accept these props and render the required data.
 * 
 * Structural components (RelatedCities, VisitTracker, etc.) are shared
 * across all themes — they live in components/structural/.
 * 
 * Visual components live in the theme folder and can be completely
 * different per site while maintaining the same data contract.
 */

// ─── Locale ───
export type Locale = 'en' | 'fr'

// ─── Hero ───
export interface HeroSectionProps {
  locale: Locale
}

export interface PageHeroProps {
  title: string
  subtitle?: string
  imageSrc?: string
  videoSrc?: string           // optional video background
  breadcrumbs: { label: string; href?: string }[]
  locale: Locale
  children?: React.ReactNode
}

// ─── Navigation ───
export interface HeaderProps {
  locale: Locale
}

export interface FooterProps {
  locale: Locale
}

// ─── Cards ───
export interface ProductCardProps {
  name: string
  slug: string
  description: string
  priceRange: string
  image?: string
  index: number
  locale: Locale
}

export interface IndustryCardProps {
  name: string
  slug: string
  description: string
  image?: string
  index: number
  locale: Locale
}

// ─── Sections ───
export interface StatsBarProps {
  locale: Locale
}

export interface CTABannerProps {
  locale: Locale
}

export interface HowItWorksProps {
  locale: Locale
}

export interface WhyChooseUsProps {
  locale: Locale
}

export interface TestimonialsSectionProps {
  locale: Locale
}

export interface FAQSectionProps {
  faqs: { question: string; answer: string }[]
  locale: Locale
  showHeading?: boolean
}

export interface SectionHeadingProps {
  locale: Locale
  tag?: string
  title: string
  subtitle?: string
}

// ─── Forms ───
export interface ContactFormProps {
  locale: Locale
}

// ─── Utility ───
export interface FloatingCTAProps {
  locale: Locale
}

export interface LogoProps {
  variant?: 'light' | 'dark'
}

export interface LegalPageProps {
  title: string
  breadcrumbLabel: string
  locale: Locale
  children: React.ReactNode
}

// ─── Grids ───
export interface CityGridProps {
  cities: { name: string; slug: string; province: string }[]
  locale: Locale
  limit?: number
  showAll?: boolean
}

// ─── Geo Page ───
export interface KeywordPageComponentProps {
  slug: string        // 'toronto/<service-slug>'
  locale: Locale
}

// ─── Page Components ───
export interface CityDetailPageProps {
  city: {
    name: string
    slug: string
    province: string
    population: number
    description: string
    neighborhoods?: string[]
    localHookEn?: string
    localHookFr?: string
  }
  products: { name: string; slug: string; image?: string; priceRange: string; description: string }[]
  locale: Locale
}

export interface ProductDetailPageProps {
  product: {
    name: string
    slug: string
    description: string
    image?: string
    features: string[]
    bestFor: string
    priceRange: string
  }
  relatedProducts: { name: string; slug: string; image?: string; priceRange: string }[]
  locale: Locale
}

export interface IndustryDetailPageProps {
  industry: {
    name: string
    slug: string
    description: string
    image?: string
    useCases: string[]
  }
  relatedProducts: { name: string; slug: string; image?: string; priceRange: string }[]
  locale: Locale
}

export interface BlogPostPageProps {
  post: {
    title: string
    description: string
    content: string
    author: string
    authorRole?: string
    image?: string
    publishedAt: string
    updatedAt?: string
    category: string
    tags: string[]
    readingTime: number
  }
  relatedPosts: { title: string; slug: string; image?: string; publishedAt: string }[]
  locale: Locale
}

export interface ProvinceDetailPageProps {
  province: {
    slug: string
    name: string
    nameFr: string
    abbr: string
  }
  cities: {
    name: string
    slug: string
    province: string
    population: number
    description: string
    provinceSlug: string
  }[]
  locale: Locale
}
