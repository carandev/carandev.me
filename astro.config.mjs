import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import keystatic from '@keystatic/astro'
import vercel from '@astrojs/vercel'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://carandev.me',
  // Keystatic serves the blog admin at /keystatic and its API at /api/keystatic (both on demand)
  integrations: [react(), mdx(), sitemap(), keystatic()],
  markdown: {
    // Code blocks follow the site's light/dark theme (see global.css)
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } }
  },
  // Pages are prerendered by default; only routes with `prerender = false` (e.g. /api/repos) run on demand.
  adapter: vercel(),
  env: {
    schema: {
      // Read at runtime on the server and never bundled into client code.
      GITHUB_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Blog admin (Keystatic GitHub mode). Created by the /keystatic setup flow; see docs/blog.md.
      KEYSTATIC_GITHUB_CLIENT_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      KEYSTATIC_GITHUB_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      KEYSTATIC_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: envField.string({ context: 'client', access: 'public', optional: true })
    }
  }
})
