'use client'

import { useState } from 'react'
import { t } from '@/lib/data'

interface FAQSectionProps {
  faqs: { question: string; answer: string }[]
  locale: 'en' | 'fr'
  showHeading?: boolean
}

/**
 * FAQSection — accordion. Heading from translations. Content from data.
 */
export default function FAQSection({ faqs, locale, showHeading = true }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0)

  if (faqs.length === 0) return null

  return (
    <section className="bg-[var(--bg)] py-20 md:py-28">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        {showHeading && (
          <div className="mb-12">
            <span className="eyebrow text-[var(--primary)] block mb-3">
              {t('faq.eyebrow', locale)}
            </span>
            <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight text-[var(--text)]">
              {t('faq.title', locale) || (locale === 'en' ? 'Frequently asked questions.' : 'Questions fréquentes.')}
            </h2>
          </div>
        )}

        <ul className="divide-y divide-[var(--line)]">
          {faqs.map((faq, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full flex items-start justify-between gap-4 py-6 text-left"
                aria-expanded={i === openIndex}
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
              >
                {/* H3 for §2.11.2 hierarchy — each question is a heading
                    so /faq has H1 + H2 (page header) + H3 per question. */}
                <h3 className="font-bold text-lg text-[var(--text)] m-0">{faq.question}</h3>
                <span className="text-[var(--primary)] text-2xl flex-shrink-0 transition-transform duration-300"
                  style={{ transform: i === openIndex ? 'rotate(45deg)' : 'none' }}>
                  +
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${i === openIndex ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="prose prose-neutral max-w-none text-[var(--text-light)] text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
