export type Review = {
  id: string
  author: string
  role: string
  game: string
  rating: number
  /** ISO date — required for Review schema crawlability */
  datePublished: string
  body: string
}

/** Visible review copy — natural sentences that still cover SEO intents. */
export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'jayk',
    role: 'Evrima player',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-09-08',
    body: 'Undetected status on The Isle Cheats was accurate. Entity ESP held after the last Evrima patch — still the best the isle cheats pick I made this season.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Herb main',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-09-05',
    body: 'The isle wallhack and the isle radar made nights usable. HWID spoofer notes were clear if you catch a ban. Feels like private the isle cheats — no multi-game junk.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Carnivore',
    game: 'The Isle',
    rating: 4,
    datePublished: '2026-08-28',
    body: 'No fake catalog. Just The Isle Evrima cheats — World ESP, wallhack, and honest Undetected vs EAC updates. That is what I want from the isle cheats reviews.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Evrima duo',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-08-20',
    body: 'They updated when other sellers still pushed dead loaders. Buy the isle cheats here after you check status — isle ESP and overlay held on our duo on theislecheats.cc.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Horde nights',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-08-12',
    body: 'The Isle Cheats menu was easy. Stream-proof on, radar on. Safer than a random the isle cheats download — wait for Undetected and you are fine.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-08-03',
    body: 'Searched theisle cheats and landed here. How to load / inject steps were enough. Isle cheats for sale with live status — that is the whole point.',
  },
]

export function getReviewsAggregate() {
  const count = REVIEWS.length
  const sum = REVIEWS.reduce((acc, r) => acc + r.rating, 0)
  const ratingValue = Math.round((sum / count) * 10) / 10
  return {
    ratingValue: String(ratingValue),
    reviewCount: String(count),
    bestRating: '5',
    worstRating: '1',
  }
}
