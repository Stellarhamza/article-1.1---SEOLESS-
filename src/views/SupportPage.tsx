import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { FaqSection } from '../components/FaqSection'
import { CheckoutLink } from '../components/CheckoutLink'
import { guidePath } from '../data/games'
import { SITE_HOST, SITE_NAME } from '../data/site'
import { SUPPORT_FAQS, SUPPORT_INTRO, SUPPORT_TOPICS } from '../data/support'

export function SupportPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <div className="border-b border-white/10 bg-[#0e0e0e]/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x pt-12 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {SITE_NAME} · Help · {SITE_HOST}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              The Isle Cheats Support
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/55">
              {SUPPORT_INTRO} Play The Isle from the{' '}
              <a
                href="https://www.survivetheisle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:underline"
              >
                official site
              </a>{' '}
              or{' '}
              <a
                href="https://store.steampowered.com/app/376210/The_Isle/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:underline"
              >
                Steam
              </a>
              . Product help stays on{' '}
              <a href="/isle-cheats" className="text-white/80 underline-offset-2 hover:underline">
                Buy The Isle Cheats
              </a>
              ,{' '}
              <a href="/articles" className="text-white/80 underline-offset-2 hover:underline">
                blogs
              </a>
              , and{' '}
              <a href="/reviews" className="text-white/80 underline-offset-2 hover:underline">
                reviews
              </a>
              , and the{' '}
              <a href="/faq" className="text-white/80 underline-offset-2 hover:underline">
                full FAQ
              </a>
              .
            </p>
          </div>
        </section>

        <section className="page-x py-12 sm:py-14">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {SUPPORT_TOPICS.map((topic) => (
              <article key={topic.heading} className="page-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {topic.heading}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
                  {topic.body.map((line) => (
                    <li key={line.slice(0, 48)}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <FaqSection
          id="faq"
          heading="The Isle Cheats support FAQ"
          intro="Load, inject, download, menu, setup, config, spoofer, and EAC answers for Evrima — visible on-page for Google."
          items={SUPPORT_FAQS}
        />

        <section className="page-band page-x border-t border-white/10 py-16">
          <div className="page-card mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl p-6 sm:gap-8 sm:rounded-3xl sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Need help now
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Open The Isle Cheats or checkout support
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Confirm Undetected status on the product page, then buy or reopen your order for
                delivery and support.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <a
                href={guidePath('isle')}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Open The Isle Cheats
              </a>
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white">
                Buy The Isle Cheats
              </CheckoutLink>
            </div>
          </div>
        </section>

        {/* Noscript: full text for non-JS crawlers */}
        <noscript>
          <section>
            <h1>The Isle Cheats Support</h1>
            <p>{SUPPORT_INTRO}</p>
            {SUPPORT_TOPICS.map((t) => (
              <div key={t.heading}>
                <h2>{t.heading}</h2>
                {t.body.map((line) => (
                  <p key={line.slice(0, 40)}>{line}</p>
                ))}
              </div>
            ))}
            <h2>FAQ</h2>
            {SUPPORT_FAQS.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>
        </noscript>

        <SiteFooter />
      </main>
    </div>
  )
}
