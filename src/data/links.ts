import { blogPath } from './blog-paths'

/** Official The Isle game destinations (authority / topical relevance). */
export const OFFICIAL_ISLE_LINKS = [
  {
    label: 'The Isle official website',
    href: 'https://www.survivetheisle.com/',
    description: 'Official Survive The Isle site from the developers',
  },
  {
    label: 'The Isle on Steam',
    href: 'https://store.steampowered.com/app/376210/The_Isle/',
    description: 'Buy The Isle and switch to the Evrima branch on Steam',
  },
] as const

/** Primary internal routes for crawl equity. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'The Isle Cheats homepage' },
  {
    label: 'Buy The Isle Cheats',
    to: '/isle-cheats',
    description: 'Product page — ESP, wallhack, radar, spoofer',
  },
  {
    label: 'The Isle Cheats blogs',
    to: '/articles',
    description: 'All Evrima cheat guides',
  },
  {
    label: 'The Isle Cheats reviews',
    to: '/reviews',
    description: 'Player reviews and ratings',
  },
  {
    label: 'The Isle Cheats FAQ',
    to: '/faq',
    description: 'Frequently asked questions — Google-readable answers',
  },
  {
    label: 'The Isle Cheats support',
    to: '/support',
    description: 'Load, inject, spoofer and EAC help',
  },
] as const

/** Deep links into blog posts — keeps guide equity circulating. */
export const SITE_GUIDE_LINKS = [
  { label: 'Best The Isle Cheats 2026', to: blogPath('best-2026') },
  { label: 'The Isle Cheats menu', to: blogPath('cheat-menu') },
  { label: 'The Isle ESP cheat guide', to: blogPath('esp-cheat') },
  { label: 'Undetected status guide', to: blogPath('undetected') },
  { label: 'HWID spoofer guide', to: blogPath('hwid-spoofer') },
  { label: 'How to load The Isle Cheats', to: blogPath('how-to-load') },
  { label: 'Best Evrima setup', to: blogPath('best-setup') },
] as const

/**
 * External checkout go-link → The Isle product.
 * Always pair with rel=nofollow so crawlers do not index the redirect.
 */
const CHECKOUT_HOST = ['za', 'deyo', '.com'].join('')
const CHECKOUT_REF = ['Q', 'R', 'H'].join('')
const CHECKOUT_PRODUCT = '/products/the-isle-novaxware-cheats'

export const CHECKOUT_URL = `https://${CHECKOUT_HOST}/go/${CHECKOUT_REF}?to=${encodeURIComponent(CHECKOUT_PRODUCT)}`

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_URL
}

/** Outbound checkout: nofollow so redirect targets are not indexed via our links. */
export const CHECKOUT_REL = 'nofollow noopener noreferrer'
