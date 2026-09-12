import { useEffect } from 'react'

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



function upsertMeta(attr: 'name' | 'property', key: string, content: string) {

  let el = document.querySelector(`meta[${attr}="${key}"]`)

  if (!el) {

    el = document.createElement('meta')

    el.setAttribute(attr, key)

    document.head.appendChild(el)

  }

  el.setAttribute('content', content)

}



function removeMeta(attr: 'name' | 'property', key: string) {

  document.querySelector(`meta[${attr}="${key}"]`)?.remove()

}



function upsertLink(rel: string, href: string, extra?: Record<string, string>) {

  const selector = extra?.hreflang

    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`

    : `link[rel="${rel}"]:not([hreflang])`

  let link = document.querySelector(selector) as HTMLLinkElement | null

  if (!link) {

    link = document.createElement('link')

    link.rel = rel

    document.head.appendChild(link)

  }

  link.href = href

  if (extra) {

    for (const [k, v] of Object.entries(extra)) link.setAttribute(k, v)

  }

}



function clearHreflang() {

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove())

}



function upsertJsonLd(id: string, data: unknown) {

  let script = document.getElementById(id) as HTMLScriptElement | null

  if (!script) {

    script = document.createElement('script')

    script.id = id

    script.type = 'application/ld+json'

    document.head.appendChild(script)

  }

  script.textContent = JSON.stringify(data)

}



/** Stable site identity — never rewrite WebSite purpose from page-specific copy. */

function siteIdentityGraph() {

  return [

    {

      '@type': 'Organization',

      '@id': `${SITE_URL}/#organization`,

      name: SITE_NAME,

      alternateName: ['theisle cheats', 'the isle cheats', 'theislecheats', SITE_URL.replace('https://', '')],

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

        description: 'Cheats for The Isle Evrima only — ESP, wallhack, radar, HWID spoofer.',

      },

      publisher: { '@id': `${SITE_URL}/#organization` },

    },

  ]

}



function mergeJsonLd(seo: PageSeo, jsonLd?: unknown) {

  const page = {

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



  let extra: unknown[] = []

  if (jsonLd && typeof jsonLd === 'object') {

    const obj = jsonLd as { '@graph'?: unknown[]; '@type'?: string }

    if (Array.isArray(obj['@graph'])) {

      // Drop page-level WebSite/Organization so purpose never dances per route.

      extra = obj['@graph'].filter((node) => {

        if (!node || typeof node !== 'object') return true

        const t = (node as { '@type'?: string })['@type']

        return t !== 'WebSite' && t !== 'Organization'

      })

    } else {

      extra = [jsonLd]

    }

  }



  return {

    '@context': 'https://schema.org',

    '@graph': [...siteIdentityGraph(), page, ...extra],

  }

}



/** Clean per-page SEO: unique title/description, stable site purpose, honest hreflang. */

export function usePageSeo(seo: PageSeo, jsonLd?: unknown) {

  useEffect(() => {

    const url = absoluteUrl(seo.path)

    const image = seo.image || OG_IMAGE

    const robots =

      seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1'



    document.title = seo.title

    document.documentElement.lang = 'en'



    upsertMeta('name', 'description', seo.description)

    if (seo.keywords) upsertMeta('name', 'keywords', seo.keywords)

    else removeMeta('name', 'keywords')

    upsertMeta('name', 'robots', robots)

    upsertMeta('name', 'author', SITE_NAME)



    // Strip legacy “dancing” SEO metas if present from older builds / index.html.

    for (const key of [

      'geo.region',

      'geo.placename',

      'coverage',

      'distribution',

      'rating',

      'revisit-after',

      'language',

    ]) {

      removeMeta('name', key)

    }



    upsertLink('canonical', url)



    clearHreflang()

    for (const region of SEO_REGIONS) {

      upsertLink('alternate', url, { hreflang: region.hreflang })

    }



    upsertMeta('property', 'og:type', seo.ogType || 'website')

    upsertMeta('property', 'og:site_name', SITE_NAME)

    upsertMeta('property', 'og:locale', 'en_US')

    removeMeta('property', 'og:locale:alternate')

    upsertMeta('property', 'og:url', url)

    upsertMeta('property', 'og:title', seo.title)

    upsertMeta('property', 'og:description', seo.description)

    upsertMeta('property', 'og:image', image)

    upsertMeta('property', 'og:image:alt', `${SITE_NAME} — The Isle Evrima cheats`)



    upsertMeta('name', 'twitter:card', 'summary_large_image')

    upsertMeta('name', 'twitter:title', seo.title)

    upsertMeta('name', 'twitter:description', seo.description)

    upsertMeta('name', 'twitter:image', image)



    upsertJsonLd('page-jsonld', mergeJsonLd(seo, jsonLd))



    return () => {

      const script = document.getElementById('page-jsonld')

      if (script) script.remove()

      clearHreflang()

    }

  }, [seo, jsonLd])

}


