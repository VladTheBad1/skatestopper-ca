import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/_next'] },

      // AI crawler rules (per public-assets-gate). Allow indexing but
      // prevent training-data scraping where possible. Open to standard
      // search engines + LLM retrieval, blocked from generative training.
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/admin', '/api'] },
    ],
    sitemap: `https://${siteConfig.domain}/sitemap.xml`,
  }
}
