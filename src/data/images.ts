/** Isle-only cover + hero images — no multi-game catalog. */

export const ISLE_COVER =
  'https://assets-prd.ignimgs.com/2023/09/12/library-600x900-1694540297721.jpg?width=800&format=jpg&auto=webp&quality=80'

export const ISLE_HERO =
  'https://assets-prd.ignimgs.com/2023/09/12/library-600x900-1694540297721.jpg?width=1440&crop=16%3A9%2Csmart&format=jpg&auto=webp&quality=80'

export const IGN_IMAGES: Record<string, string> = {
  isle: ISLE_COVER,
}

/** Keyworded image SEO for The Isle Cheats (IGN assets). */
export const IMAGE_SEO: Record<
  string,
  {
    alt: string
    title: string
    caption: string
    heroAlt: string
    heroTitle: string
    heroCaption: string
  }
> = {
  isle: {
    alt: 'The Isle Cheats cover art — The Isle Evrima ESP and wallhack guide',
    title: 'The Isle Cheats | Undetected Evrima Cover',
    caption:
      'The Isle Cheats IGN cover for theisle cheats, isle ESP, and isle wallhack on Evrima',
    heroAlt:
      'The Isle Cheats hero — buy undetected The Isle ESP wallhack and spoofer for Evrima',
    heroTitle: 'Buy The Isle Cheats | Evrima ESP & Wallhack',
    heroCaption:
      'The Isle Cheats product hero image — undetected ESP, wallhack, radar, HWID spoofer',
  },
}

export function getGameImage(slug: string): string {
  return IGN_IMAGES[slug] || ISLE_COVER
}

/** Product page hero: wide IGN crop for The Isle. */
export function getProductHeroImage(slug: string): string {
  return slug === 'isle' ? ISLE_HERO : getGameImage(slug)
}

export function getImageAlt(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroAlt : seo.alt
  return variant === 'product'
    ? `${name} Cheats — ESP, wallhack and features`
    : `${name} Cheats cover`
}

export function getImageTitle(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroTitle : seo.title
  return `${name} Cheats`
}
