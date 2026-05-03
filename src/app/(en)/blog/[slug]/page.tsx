import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blog'
import { siteConfig } from '@/config/site-config'
import {
  buildPageMeta,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildSpeakableSchema,
} from '@/lib/seo'
import BlogPostPage from '@/components/pages/BlogPostPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return { title: siteConfig.brandName }

  return buildPageMeta({
    title: post.titleEn,
    description: post.descriptionEn,
    path: `/blog/${slug}`,
    frPath: `/fr/blogue/${slug}`,
    image: post.image ?? "",
  })
}

export default async function BlogPostRoute({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 3)
    .map(p => ({
      title: p.titleEn,
      slug: p.slug,
      image: p.image,
      publishedAt: p.publishedAt,
    }))

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titleEn,
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
      logo: {
        '@type': 'ImageObject',
        url: `https://${siteConfig.domain}/images/logo.png`,
      },
    },
    mainEntityOfPage: `https://${siteConfig.domain}/blog/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.titleEn, url: `/blog/${slug}` },
        ])
      ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        buildSpeakableSchema(['[data-speakable="true"]', 'h1', 'article .prose'])
      ) }} />

      <BlogPostPage
        post={{
          slug: post.slug,
          title: post.titleEn,
          content: post.contentEn,
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
        locale="en"
      />
    </>
  )
}
