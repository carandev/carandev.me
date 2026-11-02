import type { APIRoute } from 'astro'
import { GITHUB_API_KEY } from 'astro:env/server'

import { fetchProjects } from '../../lib/projects'

// Rendered on demand (Vercel function) so topic changes on GitHub show up without a rebuild.
export const prerender = false

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers }
  })

export const GET: APIRoute = async () => {
  if (!GITHUB_API_KEY) {
    return json({ error: 'Falta la variable de entorno GITHUB_API_KEY' }, { status: 500 })
  }

  try {
    const projects = await fetchProjects(GITHUB_API_KEY)

    // Vercel CDN: fresh for 1 h, then serve the previous copy for up to a day while revalidating.
    return json(projects, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
    })
  } catch (error) {
    console.error(error)

    return json({ error: 'No se pudieron obtener los repositorios' }, { status: 502 })
  }
}
