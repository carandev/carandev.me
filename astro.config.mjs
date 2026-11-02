import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://carandev.me',
  integrations: [react()],
  // Pages are prerendered by default; only routes with `prerender = false` (e.g. /api/repos) run on demand.
  adapter: vercel(),
  env: {
    schema: {
      // Read at runtime on the server and never bundled into client code.
      GITHUB_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true })
    }
  }
})
