import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blog'
import { siteConfig } from '@/config/site-config'
import {
  buildPageMeta,
  buildBreadcrumbSchema,
  buildSpeakableSchema,
} from '@/lib/seo'
import BlogPostPage from '@/components/pages/BlogPostPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // FR routes use slugFr (the French translation) so /fr/blogue/{slugFr} resolves.
  return blogPosts.map(p => ({ slug: p.slugFr ?? p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  // Look up by slugFr first (FR route), fall back to slug (EN compat).
  const post = blogPosts.find(p => p.slugFr === slug || p.slug === slug)
  if (!post) return { title: siteConfig.brandName }

  return buildPageMeta({
    title: post.titleFr,
    description: post.descriptionFr,
    path: `/fr/blogue/${post.slugFr ?? slug}`,
    enPath: `/blog/${post.slug}`,
    locale: 'fr',
    image: post.image ?? "",
  })
}

export default async function BlogPostRouteFr({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slugFr === slug || p.slug === slug)
  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 3)
    .map(p => ({
      title: p.titleFr,
      slug: p.slug,
      image: p.image,
      publishedAt: p.publishedAt,
    }))

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titleFr,
    image: post.image ? `https://${siteConfig.domain}${post.image}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      ...(post.authorRole && { jobTitle: post.authorRole }),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: `https://${siteConfig.domain}`,
    },
    mainEntityOfPage: `https://${siteConfig.domain}/fr/blogue/${slug}`,
    inLanguage: 'fr-CA',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildBreadcrumbSchema([
          { name: 'Accueil', url: '/fr' },
          { name: 'Blogue', url: '/fr/blogue' },
          { name: post.titleFr, url: `/fr/blogue/${slug}` },
        ])
      ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildSpeakableSchema(['[data-speakable="true"]', 'h1', 'article .prose'])
      ) }} />

      <BlogPostPage
        post={{
          slug: post.slug,
          title: post.titleFr,
          content: post.contentFr,
          author: post.author,
          authorRole: post.authorRole ?? "",
          image: post.image ?? "",
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt ?? "",
          category: post.category,
          tags: post.tags,
          readingTime: post.readingTime,
        }}
        relatedPosts={relatedPosts}
        locale="fr"
      />
    </>
  )
}
