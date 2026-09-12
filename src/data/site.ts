/** Site identity for theislecheats.cc — one purpose, no topic dancing. */

export const SITE_URL = 'https://theislecheats.cc'
export const SITE_NAME = 'The Isle Cheats'
export const SITE_HOST = 'theislecheats.cc'

/**
 * Sole purpose Google should understand — used in schema + about copy.
 * This site sells / documents The Isle Cheats only (Evrima). Not a multi-game shop.
 */
export const SITE_PURPOSE =
  'The Isle Cheats is a single-product site for The Isle (Evrima): undetected ESP, wallhack, radar, and HWID spoofer with live patch status. We do not sell cheats for other games.'

export const SITE_ABOUT = [
  'The Isle Cheats',
  'The Isle Evrima cheats',
  'The Isle ESP',
  'The Isle wallhack',
] as const

/**
 * Full SEO vocabulary for The Isle Cheats.
 * Distribute across pages in copy + short keywords — never dump every term on one meta tag.
 */
export const ALL_SEO_TERMS = [
  'The Isle Cheats',
  'the isle cheats',
  'theisle cheats',
  'theislecheats',
  'theislecheats.cc',
  'The Isle Evrima cheats',
  'isle evrima cheats',
  'the isle evrima',
  'evrima cheats',
  'The Isle Horde cheats',
  'the isle cheat',
  'isle cheats',
  'undetected the isle cheats',
  'the isle undetected',
  'the isle cheats undetected',
  'safe the isle cheats',
  'best the isle cheats',
  'best The Isle Cheats 2026',
  'the isle ESP',
  'isle ESP',
  'the isle Entity ESP',
  'the isle World ESP',
  'the isle wallhack',
  'isle wallhack',
  'the isle radar',
  'the isle overlay',
  'the isle spoofer',
  'isle HWID spoofer',
  'the isle HWID spoofer',
  'buy the isle cheats',
  'the isle cheats for sale',
  'the isle cheats download',
  'cheap the isle cheats',
  'how to load the isle cheats',
  'inject the isle cheats',
  'the isle cheats menu',
  'the isle cheats guide',
  'the isle cheats blogs',
  'the isle cheats reviews',
  'the isle cheats setup',
  'the isle cheats config',
  'EAC the isle cheats',
  'private the isle cheats',
  'the isle cheats support',
] as const

/** Honest language tags for one global English site (no fake locale dance). */
export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE =
  'https://assets-prd.ignimgs.com/2023/09/12/library-600x900-1694540297721.jpg?width=1200&format=jpg&auto=webp&quality=80'

export type PageSeo = {
  title: string
  description: string
  path: string
  /** Short, page-intent only — never dump the whole site keyword list. */
  keywords?: string
  ogType?: 'website' | 'article' | 'product'
  image?: string
  robots?: string
}

/** Unique SEO per route — same brand purpose, different page intent. */
export const SEO = {
  home: {
    title: 'The Isle Cheats | Undetected Evrima ESP & Wallhack',
    description:
      'The Isle Cheats — Isle-only shop for Evrima. Undetected Entity ESP, World ESP, radar & HWID spoofer with live status on theislecheats.cc.',
    path: '/',
    keywords: 'The Isle Cheats, the isle cheats, The Isle Evrima cheats, the isle ESP',
    ogType: 'website',
    image: OG_IMAGE,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  articles: {
    title: 'The Isle Cheats Blogs | Guides for Evrima Players',
    description:
      'Guides for The Isle Cheats only: best setup 2026, ESP tips, undetected status, HWID spoofer, and how to load — no other games.',
    path: '/articles',
    keywords: 'The Isle Cheats blogs, the isle cheats guide, Evrima cheats guide',
    ogType: 'website',
    image: OG_IMAGE,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  reviews: {
    title: 'The Isle Cheats Reviews | ESP Wallhack Undetected Feedback',
    description:
      'The Isle Cheats reviews from Evrima players — Entity ESP, World ESP, wallhack, radar, Undetected vs EAC honesty, and HWID spoofer notes before you buy.',
    path: '/reviews',
    keywords:
      'the isle cheats reviews, the isle cheats review, undetected the isle cheats, the isle ESP, the isle wallhack, the isle radar, private the isle cheats',
    ogType: 'website',
    image: OG_IMAGE,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  faq: {
    title: 'The Isle Cheats FAQ | Undetected ESP Wallhack EAC Answers',
    description:
      'The Isle Cheats FAQ for Evrima — Undetected vs EAC, Entity ESP, World ESP, wallhack, radar, HWID spoofer, how to buy, how to load, support, and reviews.',
    path: '/faq',
    keywords:
      'The Isle Cheats FAQ, the isle cheats questions, undetected the isle cheats, how to load the isle cheats, EAC the isle cheats, the isle ESP, the isle wallhack',
    ogType: 'website',
    image: OG_IMAGE,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  support: {
    title: 'The Isle Cheats Support | Load, Inject, Spoofer & EAC Help',
    description:
      'The Isle Cheats support for Evrima — how to load and inject, Undetected vs Updating, HWID spoofer steps, menu setup, download help, and EAC patch questions.',
    path: '/support',
    keywords:
      'the isle cheats support, how to load the isle cheats, inject the isle cheats, the isle HWID spoofer, EAC the isle cheats, the isle cheats download, the isle cheats setup, the isle cheats menu, the isle cheats config',
    ogType: 'website',
    image: OG_IMAGE,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  product: {
    title: 'Buy The Isle Cheats | Evrima Entity ESP, World ESP & Radar',
    description:
      'Buy The Isle Cheats for Evrima — Entity ESP, World ESP, radar, HWID spoofer, stream-proof. Live Undetected vs EAC status. Instant delivery.',
    path: '/isle-cheats',
    keywords:
      'buy the isle cheats, the isle Entity ESP, the isle World ESP, the isle wallhack, the isle cheats for sale, cheap the isle cheats, The Isle Horde cheats, theislecheats.cc',
    ogType: 'product',
    image: OG_IMAGE,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
} as const satisfies Record<string, PageSeo>

export const HOME_META = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords,
} as const

export const HOME_HEADINGS = {
  h1: 'The Isle Cheats',
  h2Features: 'What you get with The Isle Cheats',
  h2Featured: 'The Isle Cheats for Evrima',
  h2About: 'Why use The Isle Cheats here',
  h2Access: 'Buy The Isle Cheats',
  h2Faq: 'The Isle Cheats FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

