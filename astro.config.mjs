import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://carandev.me',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    // Code blocks follow the site's light/dark theme (see global.css)
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } }
  },
  // Pages are prerendered by default; only routes with `prerender = false` (e.g. /api/repos) run on demand.
  adapter: vercel(),
  env: {
    schema: {
      // Read at runtime on the server and never bundled into client code.
      GITHUB_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true })
    }
  }
})
