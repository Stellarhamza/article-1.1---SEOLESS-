import type { FaqItem } from '../data/faqs'

type FaqSectionProps = {
  id?: string
  heading: string
  intro?: string
  items: FaqItem[]
  /** Extra class on the outer section */
  className?: string
}

/**
 * Visible FAQ block for Google: real H2/H3 + answer text in the DOM,
 * schema.org Question/Answer microdata, and matching FAQPage JSON-LD on the page.
 */
export function FaqSection({
  id = 'faq',
  heading,
  intro,
  items,
  className = '',
}: FaqSectionProps) {
  return (
    <section
      id={id}
      className={`page-x border-t border-white/10 py-16 sm:py-20 ${className}`.trim()}
      aria-labelledby={`${id}-heading`}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id={`${id}-heading`}
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          {heading}
        </h2>
        {intro ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            {intro}
          </p>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.q}
              className="page-card rounded-2xl p-5 sm:p-6"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3
                className="text-sm font-semibold text-white sm:text-base"
                itemProp="name"
              >
                {item.q}
              </h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  className="mt-2 text-sm leading-relaxed text-white/55"
                  itemProp="text"
                >
                  {item.a}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <noscript>
        <h2>{heading}</h2>
        {items.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </noscript>
    </section>
  )
}
