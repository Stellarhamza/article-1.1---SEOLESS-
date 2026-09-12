/**
 * Split sitemaps for The Isle Cheats (theislecheats.cc)
 * One English site, one purpose — no regional sitemap dance.
 *
 * - sitemap-pages.xml     → /, /articles, /reviews
 * - sitemap-products.xml  → /isle-cheats
 * - sitemap-blogs.xml     → /blog/*
 * - sitemap-images.xml    → image annotations for key URLs
 * - sitemap.xml           → index
 *
 * Run: npm run generate:sitemaps
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')

const SITE = (process.env.SITE_URL || 'https://theislecheats.cc').replace(/\/$/, '')
const TODAY = new Date().toISOString().slice(0, 10)

/** Honest hreflang for a single global English site. */
const HREFLANG = ['en', 'x-default']

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/articles', priority: '0.9', changefreq: 'weekly' },
  { path: '/reviews', priority: '0.85', changefreq: 'weekly' },
  { path: '/faq', priority: '0.9', changefreq: 'weekly' },
  { path: '/support', priority: '0.85', changefreq: 'weekly' },
]

const OG_IMAGE =
  'https://assets-prd.ignimgs.com/2023/09/12/library-600x900-1694540297721.jpg?width=1200&format=jpg&auto=webp&quality=80'

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function siteUrl(path) {
  if (!path || path === '/') return `${SITE}/`
  return `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function guidePath(slug) {
  return `/${slug}-cheats`
}

function loadGames() {
  const src = readFileSync(join(dataDir, 'games.ts'), 'utf8')
  // Only catalog entries: { slug: '...', name: '...'
  return [...src.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g)].map(
    (m) => ({ slug: m[1], name: m[2] }),
  )
}

function loadBlogs() {
  const src = readFileSync(join(dataDir, 'blogs.ts'), 'utf8')
  const blogs = []
  const blockRe =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],[\s\S]*?metaTitle:\s*['"]([^'"]+)['"],[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"]/g
  for (const m of src.matchAll(blockRe)) {
    blogs.push({
      slug: m[1],
      title: m[2],
      metaTitle: m[3],
      date: m[4],
    })
  }
  return blogs
}

function loadIsleCover() {
  const src = readFileSync(join(dataDir, 'images.ts'), 'utf8')
  const m = src.match(/"isle":\s*"(https?:[^"]+)"/)
  return m?.[1] || OG_IMAGE
}

function loadImageSeo() {
  const src = readFileSync(join(dataDir, 'images.ts'), 'utf8')
  const block = src.match(/isle:\s*\{([\s\S]*?)\n\s*\},/)
  if (!block) return null
  const pick = (key) => {
    const m = block[1].match(new RegExp(`${key}:\\s*'([^']*)'`))
    return m?.[1] || null
  }
  return {
    title: pick('title'),
    caption: pick('caption'),
    heroTitle: pick('heroTitle'),
    heroCaption: pick('heroCaption'),
  }
}

function hreflangLinks(loc) {
  return HREFLANG.map(
    (lang) =>
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(loc)}" />`,
  ).join('\n')
}

function urlEntry({ loc, priority, changefreq, lastmod = TODAY }) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks(loc)}
  </url>`
}

function urlset(body, { xhtml = false, image = false } = {}) {
  const attrs = [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    xhtml ? 'xmlns:xhtml="http://www.w3.org/1999/xhtml"' : null,
    image ? 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : null,
  ]
    .filter(Boolean)
    .join('\n        ')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${attrs}>
${body}
</urlset>
`
}

function imageBlock(imageLoc, title, caption) {
  return `    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
    </image:image>`
}

function buildPagesSitemap() {
  return urlset(
    STATIC_PAGES.map((p) =>
      urlEntry({
        loc: siteUrl(p.path),
        priority: p.priority,
        changefreq: p.changefreq,
        lastmod: TODAY,
      }),
    ).join('\n'),
    { xhtml: true },
  )
}

function buildProductsSitemap(games) {
  return urlset(
    games
      .map((g) =>
        urlEntry({
          loc: siteUrl(guidePath(g.slug)),
          priority: '1.0',
          changefreq: 'daily',
          lastmod: TODAY,
        }),
      )
      .join('\n'),
    { xhtml: true },
  )
}

function buildBlogsSitemap(blogs) {
  return urlset(
    blogs
      .map((b) =>
        urlEntry({
          loc: siteUrl(`/blog/${b.slug}`),
          priority: '0.85',
          changefreq: 'monthly',
          lastmod: b.date || TODAY,
        }),
      )
      .join('\n'),
    { xhtml: true },
  )
}

/**
 * One primary image per indexed URL — no near-duplicate crop variants,
 * no keyword stuffing in titles/captions.
 */
function buildImagesSitemap(games, blogs, cover, imageSeo) {
  const urls = []

  urls.push(`  <url>
    <loc>${escapeXml(siteUrl('/'))}</loc>
    <lastmod>${TODAY}</lastmod>
${imageBlock(
  OG_IMAGE,
  'The Isle Cheats',
  'Isle-only The Isle Cheats for Evrima — ESP, wallhack, radar, HWID spoofer',
)}
  </url>`)

  for (const game of games) {
    const pageUrl = siteUrl(guidePath(game.slug))
    const title =
      imageSeo?.heroTitle || `Buy The Isle Cheats | ${game.name} Evrima ESP & Wallhack`
    // Clean caption — do not import keyword-stuffed IMAGE_SEO captions into the sitemap.
    const caption =
      'Buy The Isle Cheats for Evrima — Entity ESP, World ESP, radar, HWID spoofer'
    urls.push(`  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <lastmod>${TODAY}</lastmod>
${imageBlock(cover, title, caption)}
  </url>`)
  }

  for (const b of blogs) {
    urls.push(`  <url>
    <loc>${escapeXml(siteUrl(`/blog/${b.slug}`))}</loc>
    <lastmod>${b.date || TODAY}</lastmod>
${imageBlock(
  cover,
  b.metaTitle || b.title,
  `${b.title} — The Isle Cheats guide for Evrima`,
)}
  </url>`)
  }

  return urlset(urls.join('\n'), { image: true })
}

function buildSitemapIndex() {
  const files = [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-blogs.xml',
    'sitemap-images.xml',
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files
  .map(
    (f) => `  <sitemap>
    <loc>${escapeXml(siteUrl(`/${f}`))}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>
`
}

/** Index only — children are discovered via sitemap.xml (no robots dance). */
function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl('/sitemap.xml')}
`
}

function assertPerfect({ games, blogs }) {
  const errors = []
  if (games.length !== 1 || games[0]?.slug !== 'isle') {
    errors.push(`Expected exactly 1 product (isle), got: ${JSON.stringify(games)}`)
  }
  if (blogs.length < 1) errors.push('No blogs parsed for sitemap-blogs.xml')
  const slugs = new Set(blogs.map((b) => b.slug))
  if (slugs.size !== blogs.length) errors.push('Duplicate blog slugs in sitemap data')
  for (const b of blogs) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date)) {
      errors.push(`Blog ${b.slug} missing valid date`)
    }
  }
  if (errors.length) {
    throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
  }
}

function main() {
  const games = loadGames()
  const blogs = loadBlogs()
  const cover = loadIsleCover()
  const imageSeo = loadImageSeo()

  assertPerfect({ games, blogs })

  writeFileSync(join(publicDir, 'sitemap-pages.xml'), buildPagesSitemap())
  writeFileSync(join(publicDir, 'sitemap-products.xml'), buildProductsSitemap(games))
  writeFileSync(join(publicDir, 'sitemap-blogs.xml'), buildBlogsSitemap(blogs))
  writeFileSync(
    join(publicDir, 'sitemap-images.xml'),
    buildImagesSitemap(games, blogs, cover, imageSeo),
  )
  writeFileSync(join(publicDir, 'sitemap.xml'), buildSitemapIndex())
  writeFileSync(join(publicDir, 'robots.txt'), buildRobotsTxt())

  const staleRegions = join(publicDir, 'sitemap-regions.xml')
  if (existsSync(staleRegions)) unlinkSync(staleRegions)

  console.log(`Sitemaps OK for ${SITE}`)
  console.log(`  pages:    ${STATIC_PAGES.length}  (/ /articles /reviews /faq /support)`)
  console.log(`  products: ${games.length}  (${games.map((g) => guidePath(g.slug)).join(', ')})`)
  console.log(`  blogs:    ${blogs.length}`)
  console.log(`  images:   ${1 + games.length + blogs.length} URLs × 1 image`)
  console.log(`  hreflang: ${HREFLANG.join(', ')}`)
  console.log(`  robots:   sitemap.xml index only`)
}

main()

