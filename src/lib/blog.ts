import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'blog'>

const WORDS_PER_MINUTE = 200

/** Articles per page on /blog. */
export const POSTS_PER_PAGE = 10

/** Published articles (drafts excluded), newest first. */
export async function getPublishedPosts (): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft)

  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
}

/** "5 min de lectura", from the raw MDX body. */
export function readingTime (body: string = ''): string {
  const words = body
    .replace(/^(import|export) .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min de lectura`
}

// Frontmatter dates are calendar days (YYYY-MM-DD → UTC midnight), so format them in UTC.
const dateFormat = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/** "27 de noviembre de 2026". */
export function formatPostDate (date: Date): string {
  return dateFormat.format(date)
}

/** "2026-11-27", for `<time datetime>`. */
export function isoDay (date: Date): string {
  return date.toISOString().slice(0, 10)
}
