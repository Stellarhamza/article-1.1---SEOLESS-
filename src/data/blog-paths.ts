/** Lightweight blog path helpers — keep full post bodies out of shared chunks. */

export function blogPath(slug: string) {
  return `/blog/${slug}`
}
