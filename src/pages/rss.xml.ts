import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'

import { getPublishedPosts } from '../lib/blog'

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts()

  return rss({
    title: 'Blog | Carlos Gómez',
    description: 'Artículos de Carlos Gómez sobre desarrollo full stack, .NET, React y TypeScript.',
    site: site ?? 'https://carandev.me',
    customData: '<language>es</language>',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/blog/${post.id}/`
    }))
  })
}
