import type { FaqItem } from '../data/faqs'
import {
  OG_IMAGE,
  SEO_REGIONS,
  SITE_ABOUT,
  SITE_NAME,
  SITE_PURPOSE,
  SITE_URL,
  absoluteUrl,
  type PageSeo,
} from '../data/site'

/** Stable Organization + WebSite identity for every page. */
export function siteIdentityGraph() {
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [
        'theisle cheats',
        'the isle cheats',
        'theislecheats',
        SITE_URL.replace('https://', ''),
      ],
      url: SITE_URL,
      description: SITE_PURPOSE,
      knowsAbout: [...SITE_ABOUT],
      brand: { '@type': 'Brand', name: SITE_NAME },
      subjectOf: [
        {
          '@type': 'WebPage',
          name: 'The Isle official website',
          url: 'https://www.survivetheisle.com/',
        },
        {
          '@type': 'WebPage',
          name: 'The Isle on Steam',
          url: 'https://store.steampowered.com/app/376210/The_Isle/',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_PURPOSE,
      inLanguage: 'en',
      about: {
        '@type': 'Thing',
        name: 'The Isle Cheats',
        description:
          'Cheats for The Isle Evrima only — ESP, wallhack, radar, HWID spoofer.',
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ]
}

export function webPageNode(seo: PageSeo) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(seo.path)}#webpage`,
    url: absoluteUrl(seo.path),
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
    primaryImageOfPage: seo.image || OG_IMAGE,
  }
}

/** Merge site identity + WebPage + optional extra nodes into FAQ/Product graph. */
export function buildPageJsonLd(seo: PageSeo, extra: unknown[] = []) {
  const cleaned = extra.filter((node) => {
    if (!node || typeof node !== 'object') return true
    const t = (node as { '@type'?: string })['@type']
    return t !== 'WebSite' && t !== 'Organization'
  })
  return {
    '@context': 'https://schema.org',
    '@graph': [...siteIdentityGraph(), webPageNode(seo), ...cleaned],
  }
}

/** Build FAQPage JSON-LD graph node from the same items shown in FaqSection. */
export function faqPageJsonLd(items: FaqItem[], pageUrl?: string) {
  return {
    '@type': 'FAQPage',
    ...(pageUrl ? { '@id': `${pageUrl}#faq`, url: pageUrl } : {}),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export { SEO_REGIONS, absoluteUrl, OG_IMAGE, SITE_NAME, SITE_URL }

