import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * En desarrollo, sirve /api/repos ejecutando la misma función serverless de
 * Vercel (api/repos.ts), así `npm run dev` funciona sin `vercel dev`.
 * Lee GITHUB_API_KEY de tu archivo .env.
 */
function devApi (env) {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer (server) {
      process.env.GITHUB_API_KEY ??= env.GITHUB_API_KEY

      server.middlewares.use('/api/repos', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/repos.ts')
        const shim = {
          status (code) { res.statusCode = code; return shim },
          setHeader (name, value) { res.setHeader(name, value) },
          json (body) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
          }
        }

        try {
          await handler(req, shim)
        } catch (err) {
          server.config.logger.error(String(err))
          shim.status(500).json({ error: 'Error en /api/repos' })
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), devApi(loadEnv(mode, process.cwd(), ''))]
}))
