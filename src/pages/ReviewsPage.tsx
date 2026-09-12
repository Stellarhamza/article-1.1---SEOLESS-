import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { LocalVideoStrip } from '../components/LocalVideoStrip'
import { getReviewsAggregate, REVIEWS } from '../data/reviews'
import { CheckoutLink } from '../components/CheckoutLink'
import { SEO, SITE_NAME, SITE_PURPOSE, SITE_URL } from '../data/site'
import { usePageSeo } from '../lib/seo'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-white text-white' : 'text-white/25'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export function ReviewsPage() {
  const aggregate = getReviewsAggregate()

  const jsonLd = useMemo(() => {
    const agg = getReviewsAggregate()
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          '@id': `${SITE_URL}/isle-cheats#product`,
          name: 'The Isle Cheats',
          description: SITE_PURPOSE,
          brand: { '@type': 'Brand', name: SITE_NAME },
          url: `${SITE_URL}/isle-cheats`,
          category: 'The Isle Evrima Cheats',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: agg.ratingValue,
            reviewCount: agg.reviewCount,
            bestRating: agg.bestRating,
            worstRating: agg.worstRating,
          },
          review: REVIEWS.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.author },
            datePublished: r.datePublished,
            reviewBody: r.body,
            name: `${r.author} The Isle Cheats review`,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(r.rating),
              bestRating: '5',
              worstRating: '1',
            },
            itemReviewed: {
              '@type': 'Product',
              name: 'The Isle Cheats',
              url: `${SITE_URL}/isle-cheats`,
            },
          })),
        },
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/reviews#webpage`,
          url: `${SITE_URL}/reviews`,
          name: SEO.reviews.title,
          description: SEO.reviews.description,
          about: { '@id': `${SITE_URL}/isle-cheats#product` },
          inLanguage: 'en',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Reviews',
              item: `${SITE_URL}/reviews`,
            },
          ],
        },
      ],
    }
  }, [])

  usePageSeo(SEO.reviews, jsonLd)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <div className="border-b border-white/10 bg-[#0e0e0e]/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body" itemScope itemType="https://schema.org/CollectionPage">
        <meta itemProp="name" content={SEO.reviews.title} />
        <meta itemProp="description" content={SEO.reviews.description} />

        <section className="page-x pt-12 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {SITE_NAME} · Community reviews
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              The Isle Cheats Reviews
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/55">
              Real the isle cheats reviews from Evrima players — Entity ESP, World ESP, the isle
              wallhack, the isle radar, Undetected vs EAC honesty, HWID spoofer notes, and whether
              private the isle cheats builds held after the last patch on theislecheats.cc. Read
              the{' '}
              <Link to="/isle-cheats" className="text-white/80 underline-offset-2 hover:underline">
                product page
              </Link>
              ,{' '}
              <Link to="/support" className="text-white/80 underline-offset-2 hover:underline">
                support
              </Link>
              , or{' '}
              <Link to="/articles" className="text-white/80 underline-offset-2 hover:underline">
                blogs
              </Link>
              . Play The Isle via{' '}
              <a
                href="https://store.steampowered.com/app/376210/The_Isle/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:underline"
              >
                Steam
              </a>
              .
            </p>
            <p className="mt-3 text-sm text-white/45" aria-label="Aggregate rating">
              Average {aggregate.ratingValue} / 5 from {aggregate.reviewCount} The Isle Cheats
              reviews
            </p>
          </div>
        </section>

        <section
          aria-hidden
          className="relative mt-10 border-y border-white/15 bg-[#0a0a0a] sm:mt-12"
        >
          <LocalVideoStrip
            src="/videos/reviews-neon.webm"
            startAt={5}
            className="video-strip--reviews"
          />
        </section>

        <section
          className="page-x py-14 sm:py-16"
          itemScope
          itemType="https://schema.org/Product"
          itemProp="about"
        >
          <meta itemProp="name" content="The Isle Cheats" />
          <meta itemProp="description" content={SITE_PURPOSE} />
          <link itemProp="url" href={`${SITE_URL}/isle-cheats`} />
          <div
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
            className="sr-only"
          >
            <meta itemProp="ratingValue" content={aggregate.ratingValue} />
            <meta itemProp="reviewCount" content={aggregate.reviewCount} />
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />
          </div>

          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-xl font-semibold tracking-tight text-white">
              Latest The Isle Cheats feedback
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="page-card flex h-full min-h-[220px] flex-col rounded-2xl p-6"
                  itemScope
                  itemProp="review"
                  itemType="https://schema.org/Review"
                >
                  <meta itemProp="datePublished" content={review.datePublished} />
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                      {review.game}
                    </span>
                    <div
                      itemProp="reviewRating"
                      itemScope
                      itemType="https://schema.org/Rating"
                    >
                      <meta itemProp="ratingValue" content={String(review.rating)} />
                      <meta itemProp="bestRating" content="5" />
                      <Stars rating={review.rating} />
                    </div>
                  </div>
                  <p
                    className="mt-4 flex-1 text-sm leading-relaxed text-white/70"
                    itemProp="reviewBody"
                  >
                    “{review.body}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                      {review.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div itemProp="author" itemScope itemType="https://schema.org/Person">
                      <p className="text-sm font-semibold text-white" itemProp="name">
                        {review.author}
                      </p>
                      <p className="text-xs text-white/45">{review.role}</p>
                      <time
                        className="mt-0.5 block text-[11px] text-white/35"
                        dateTime={review.datePublished}
                      >
                        {review.datePublished}
                      </time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-band page-x border-t border-white/10 py-16">
          <div className="page-card mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl p-6 sm:gap-8 sm:rounded-3xl sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Next step
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to buy The Isle Cheats?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Open the guide, confirm Undetected status, then checkout — or visit{' '}
                <Link to="/support" className="text-white underline-offset-2 hover:underline">
                  The Isle Cheats support
                </Link>{' '}
                for load and inject help.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Link
                to="/isle-cheats"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Open The Isle Cheats
              </Link>
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white">
                Buy now
              </CheckoutLink>
            </div>
          </div>
        </section>

        <noscript>
          <section>
            <h1>The Isle Cheats Reviews</h1>
            <p>
              Average {aggregate.ratingValue} / 5 from {aggregate.reviewCount} reviews.
            </p>
            {REVIEWS.map((r) => (
              <article key={r.id}>
                <h2>
                  {r.author} — {r.rating}/5 — {r.datePublished}
                </h2>
                <p>{r.body}</p>
              </article>
            ))}
          </section>
        </noscript>

        <SiteFooter />
      </main>
    </div>
  )
}

