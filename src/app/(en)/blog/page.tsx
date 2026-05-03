import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { blogPosts } from '@/data/blog'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = buildPageMeta({
  title: 'Skate Stopper Guides — Specs & Climate',
  description:
    'Skate stopper buying guides for Canadian climate zones, RFP-ready procurement docs, install how-tos, and case studies from transit authorities.',
  path: '/blog',
  frPath: '/fr/blogue',
})

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Resources', url: '/blog' },
          ])),
        }}
      />
      <PageHero
        eyebrow="Resources"
        title="Buying guides, climate notes, and case studies."
        subtitle="Specification advice, procurement playbooks, and field reports from Canadian cities, transit authorities, schools, and heritage sites."
        breadcrumbs={[{ label: 'Resources' }]}
        locale="en"
      />

      <section className="bg-[var(--bg-light)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <SectionHeader eyebrow="Resources" title="Articles & Guides" highlight="Guides" description="Articles on procurement, code compliance, climate engineering, and field-tested install patterns." />
          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-light)] py-20">No articles published yet — check back shortly.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-[var(--border-light)] hover:border-[var(--accent)] transition-colors overflow-hidden"
                >
                  {post.image && (
                    <div className="aspect-[16/9] overflow-hidden bg-[var(--bg-light)]">
                      <img
                        src={post.image}
                        alt={post.imageAlt || `Editorial photo for the article “${post.titleEn}” — skate stoppers and skateboard deterrents in Canada`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && <div className="eyebrow mb-3">{post.category}</div>}
                    <h2 className="font-display text-[18px] tracking-[0.02em] leading-[1.25] text-[var(--text)]">{post.titleEn}</h2>
                    <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--text-light)] line-clamp-3">{post.descriptionEn}</p>
                    <div className="mt-5 flex items-center gap-4 text-[12px] text-[var(--text-light)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} min
                      </span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[var(--accent)]">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
</main>
  )
}
