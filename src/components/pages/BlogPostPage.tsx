import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { blogImageAlt } from '@/lib/image-alt'
import { t } from '@/lib/data'
import { staticUrl, blogUrl } from '@/lib/routes'
import { markdownToHtml } from '@/lib/markdown'
interface BlogPost {
  title: string
  slug: string
  slugFr?: string
  content: string
  image?: string
  imageAlt?: string
  author: string
  authorRole: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  readingTime: number
}

interface RelatedPost {
  title: string
  slug: string
  slugFr?: string
  image?: string
  publishedAt: string
}

interface BlogPostPageProps {
  post: BlogPost
  relatedPosts: RelatedPost[]
  locale: 'en' | 'fr'
}

export default function BlogPostPage({ post, relatedPosts, locale }: BlogPostPageProps) {
  const isEn = locale === 'en'

  return (
    <main>
      <PageHero
        title={post.title}
        subtitle={`${post.author} · ${post.readingTime} ${isEn ? 'min read' : 'min de lecture'}`}
        imageSrc={post.image}
        imageAlt={post.imageAlt || (isEn
          ? `Editorial photo for the article “${post.title}” — skate stoppers and anti-skateboarding deterrents in Canadian commercial settings`
          : `Photo éditoriale de l’article « ${post.title} » — bloque-skate et dissuasifs anti-planche en contexte commercial canadien`)}
        breadcrumbs={[
          { label: t('nav.blog', locale), href: staticUrl('blog', locale) },
          { label: post.title },
        ]}
        locale={locale}
      />

      {/* Article */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-[var(--text-light)] text-sm mb-8 pb-8 border-b border-[var(--line)]">
            <span>{isEn ? 'Published' : 'Publié'}: {new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-CA' : 'fr-CA')}</span>
            {post.updatedAt && (
              <span>{isEn ? 'Updated' : 'Mis à jour'}: {new Date(post.updatedAt).toLocaleDateString(locale === 'en' ? 'en-CA' : 'fr-CA')}</span>
            )}
            <span>{post.category}</span>
          </div>

          {/* Content */}
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[var(--line)] flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[var(--bg-section)] text-[var(--text-light)] text-xs rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[var(--bg-section)] py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="font-extrabold text-2xl text-[var(--text)] text-center mb-8">
              {isEn ? 'Related articles' : 'Articles connexes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={blogUrl(rp.slug, rp.slugFr || rp.slug, locale)} className="group block bg-[var(--surface)] rounded-xl overflow-hidden border border-[var(--line)] hover:shadow-lg transition-all">
                  {rp.image && (
                    <div className="relative h-40 overflow-hidden">
                      <Image src={rp.image} alt={blogImageAlt(rp as { title: string; imageAlt?: string; imageAltFr?: string }, locale)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-sm">{rp.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
</main>
  )
}
