import {
  OFFICIAL_ISLE_LINKS,
  SITE_GUIDE_LINKS,
  SITE_PAGE_LINKS,
} from '../data/links'

type SiteLinkHubProps = {
  /** Hide the current path so we don't self-link. */
  currentPath?: string
  /** Compact = footer-friendly denser list; default = full section. */
  variant?: 'section' | 'compact'
}

function isCurrent(to: string, currentPath?: string) {
  if (!currentPath) return false
  if (to === '/') return currentPath === '/'
  return currentPath === to || currentPath.startsWith(`${to}/`)
}

/**
 * Internal + official The Isle links for crawl paths and topical SEO.
 * Place near the bottom of pages (before footer) or inside the footer.
 */
export function SiteLinkHub({ currentPath, variant = 'section' }: SiteLinkHubProps) {
  const pages = SITE_PAGE_LINKS.filter((l) => !isCurrent(l.to, currentPath))
  const guides = SITE_GUIDE_LINKS.filter((l) => !isCurrent(l.to, currentPath))

  if (variant === 'compact') {
    return (
      <nav aria-label="Site and official The Isle links" className="space-y-6 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Site pages
          </p>
          <ul className="mt-3 space-y-2 text-white/65">
            {pages.map((l) => (
              <li key={l.to}>
                <a href={l.to} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Cheat guides
          </p>
          <ul className="mt-3 space-y-2 text-white/65">
            {guides.map((l) => (
              <li key={l.to}>
                <a href={l.to} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Official The Isle
          </p>
          <ul className="mt-3 space-y-2 text-white/65">
            {OFFICIAL_ISLE_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  return (
    <section
      className="page-x border-t border-white/10 py-12 sm:py-14"
      aria-labelledby="site-link-hub-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
          Explore
        </p>
        <h2
          id="site-link-hub-heading"
          className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          The Isle Cheats pages & official The Isle
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          Jump to our product, guides, reviews, and support — plus the official The Isle
          website and Steam page for Evrima.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Site pages</h3>
            <ul className="mt-3 space-y-2.5">
              {pages.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="group block text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="font-medium underline-offset-2 group-hover:underline">
                      {l.label}
                    </span>
                    {l.description ? (
                      <span className="mt-0.5 block text-xs text-white/40">
                        {l.description}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Cheat guides</h3>
            <ul className="mt-3 space-y-2.5">
              {guides.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="text-sm text-white/70 underline-offset-2 transition-colors hover:text-white hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Official The Isle</h3>
            <ul className="mt-3 space-y-2.5">
              {OFFICIAL_ISLE_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="font-medium underline-offset-2 group-hover:underline">
                      {l.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/40">
                      {l.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/35">
              Official links are for the game itself. {` `}
              Cheats and loaders are only sold on this site.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
