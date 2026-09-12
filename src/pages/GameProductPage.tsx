import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, Shield } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { GameCover } from '../components/GameCover'
import {
  GUIDE_FEATURES,
  getGame,
  guidePath,
  parseGuideSlug,
  type Game,
} from '../data/games'
import { getGameImage } from '../data/images'
import { PRODUCT_PAGE_FAQS } from '../data/faqs'
import { SEO, SITE_HOST, SITE_NAME, SITE_URL } from '../data/site'
import { usePageSeo } from '../lib/seo'
import { FaqSection, faqPageJsonLd } from '../components/FaqSection'
import { CheckoutLink } from '../components/CheckoutLink'
import { NotFoundPage } from './NotFoundPage'
import { blogPath } from '../data/blogs'

function ProductPurchaseCard({ game }: { game: Game }) {
  return (
    <div className="page-card overflow-hidden rounded-2xl sm:rounded-3xl">
      <CheckoutLink className="block" aria-label="Buy The Isle Cheats">
        <GameCover slug={game.slug} name={game.name} aspect="square" className="rounded-none" />
      </CheckoutLink>
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="icon-well shrink-0 text-sm font-bold">TI</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">The Isle Cheats</p>
            <p className="text-xs text-white/45">
              Status: {game.status} · Evrima · Instant delivery
            </p>
          </div>
        </div>

        <CheckoutLink className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-6">
          Buy The Isle Cheats
        </CheckoutLink>
        <p className="mt-3 text-center text-[11px] text-white/40">
          Instant delivery · Check Undetected first
        </p>
      </div>
    </div>
  )
}

export function GameProductPage() {
  const { guideSlug = '' } = useParams()
  const slug = parseGuideSlug(guideSlug)
  const game = getGame(slug)

  const jsonLd = useMemo(() => {
    if (!game) return undefined
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          name: 'The Isle Cheats',
          description: SEO.product.description,
          brand: { '@type': 'Brand', name: SITE_NAME },
          url: `${SITE_URL}${SEO.product.path}`,
          image: getGameImage('isle'),
          category: 'The Isle Evrima Cheats',
          about: {
            '@type': 'VideoGame',
            name: 'The Isle',
            alternateName: 'The Isle Evrima',
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Scope',
              value: 'The Isle only — no other games',
            },
          ],
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}${SEO.product.path}`,
            availability: 'https://schema.org/InStock',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blogs',
              item: `${SITE_URL}/articles`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'The Isle Cheats',
              item: `${SITE_URL}/isle-cheats`,
            },
          ],
        },
        {
          ...faqPageJsonLd(PRODUCT_PAGE_FAQS, `${SITE_URL}/isle-cheats`),
        },
      ],
    }
  }, [game])

  usePageSeo(
    game
      ? SEO.product
      : {
          title: `Page Not Found | ${SITE_NAME}`,
          description: `This page was not found on ${SITE_HOST}. Browse The Isle Cheats guides instead.`,
          path: '/',
          keywords: 'The Isle Cheats, the isle cheats',
        },
    game ? jsonLd : undefined,
  )

  if (!guideSlug.endsWith('-cheats')) {
    const maybe = getGame(guideSlug)
    if (maybe) return <Navigate to={guidePath(maybe.slug)} replace />
    return <NotFoundPage />
  }

  if (!game) return <NotFoundPage />

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <div className="border-b border-white/10 bg-[#0e0e0e]/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x py-8 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="shrink-0 hover:text-white/70">
                Home
              </Link>
              <span className="shrink-0">/</span>
              <Link to="/articles" className="shrink-0 hover:text-white/70">
                Blogs
              </Link>
              <span className="shrink-0">/</span>
              <span className="min-w-0 text-white/70">The Isle Cheats</span>
            </nav>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 sm:mt-8">
              <CheckoutLink className="block" aria-label="Buy The Isle Cheats">
                <GameCover slug={game.slug} name={game.name} aspect="hero" variant="product" />
              </CheckoutLink>
            </div>

            <div className="mt-5 sm:mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                <Shield className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                {game.status} · Evrima / Horde · EAC-aware · {SITE_HOST}
              </span>

              <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
                Buy The Isle Cheats for Evrima
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-base">
                Private The Isle Cheats with Entity ESP, World ESP, radar, and HWID spoofer.
                Faster pages than bloated multi-cheat shops — check Undetected status, then
                buy.
              </p>
              <CheckoutLink className="cta-gradient mt-5 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Buy The Isle Cheats
              </CheckoutLink>
            </div>

            <div className="mt-6 lg:hidden">
              <ProductPurchaseCard game={game} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-7 space-y-10">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    The Isle Cheats features
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {GUIDE_FEATURES.map((f) => (
                      <div key={f.name} className="page-card rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                            <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-white">{f.name}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-white/50">{f.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Entity ESP, World ESP & radar
                  </h2>
                  <p>
                    Ranking pages for the isle cheats talk about growth ESP, wallhack, and
                    world radar — not filler. Our The Isle Cheats kit leads with Entity ESP /
                    wallhack (players + dinos), World ESP for food/water/corpses, and a 2D
                    radar so you rotate before they scent you.
                  </p>
                  <p>
                    Optional aim assist stays optional. If you want the lowest footprint
                    playstyle, run ESP + radar + stream-proof and leave combat extras off.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    The Isle Undetected status (EAC)
                  </h2>
                  <p>
                    The Isle uses Easy Anti-Cheat. After an Evrima or Horde patch, builds can
                    flip to Updating until tested. {SITE_NAME} shows live Undetected status so
                    you are not buying a dead loader from a screenshot farm.
                  </p>
                  <p>
                    Rule: status first, inject second. That beats every “lifetime undetected”
                    claim on competing shops.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    How to buy The Isle Cheats in 2026
                  </h2>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>Open the The Isle Cheats page on {SITE_HOST}.</li>
                    <li>Confirm status is Undetected (or accept Updating risk).</li>
                    <li>Scan Entity ESP / World ESP / radar / spoofer features.</li>
                    <li>Checkout for instant loader delivery.</li>
                    <li>Read{' '}
                      <Link to={blogPath('how-to-load')} className="text-white/80 underline-offset-2 hover:underline">
                        how to load
                      </Link>{' '}
                      before you inject.
                    </li>
                  </ol>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Evrima, Horde & why we stay Isle-only
                  </h2>
                  <p>
                    Competitors bury The Isle under hundreds of titles. We don’t. {SITE_NAME}
                    is built for The Isle Evrima (and Horde when the build includes it) so
                    pages stay fast, keywords stay clean, and status updates are obvious.
                  </p>
                  <p>
                    Play the game from the{' '}
                    <a
                      href="https://www.survivetheisle.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 underline-offset-2 hover:underline"
                    >
                      official The Isle website
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://store.steampowered.com/app/376210/The_Isle/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 underline-offset-2 hover:underline"
                    >
                      The Isle on Steam
                    </a>
                    . For cheats, stay on {SITE_HOST}:{' '}
                    <Link to="/reviews" className="text-white/80 underline-offset-2 hover:underline">
                      reviews
                    </Link>
                    ,{' '}
                    <Link to="/support" className="text-white/80 underline-offset-2 hover:underline">
                      support
                    </Link>
                    , and{' '}
                    <Link to="/articles" className="text-white/80 underline-offset-2 hover:underline">
                      blogs
                    </Link>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    More help
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    Full answers live in the FAQ section below and on the{' '}
                    <Link to="/faq" className="text-white/80 underline-offset-2 hover:underline">
                      The Isle Cheats FAQ
                    </Link>{' '}
                    page. For load issues open{' '}
                    <Link to="/support" className="text-white/80 underline-offset-2 hover:underline">
                      support
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <aside className="hidden lg:col-span-5 lg:block lg:sticky lg:top-8">
                <ProductPurchaseCard game={game} />
              </aside>
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          heading="Frequently asked questions about The Isle Cheats"
          intro="Visible answers for EAC, ESP, Evrima, buy steps, and HWID spoofer — same text as our FAQ schema."
          items={PRODUCT_PAGE_FAQS}
        />

        <SiteFooter />
      </main>
    </div>
  )
}
