import type { APIRoute } from 'astro'
import { GITHUB_API_KEY } from 'astro:env/server'

import { fetchPortfolioImage } from '../../../../lib/projects'

// Serves `.github/portfolio.{png,jpg,jpeg,webp}` from a repository, private ones included.
export const prerender = false

const REPO_NAME = /^[A-Za-z0-9._-]{1,100}$/

const text = (message: string, status: number) =>
  new Response(message, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

export const GET: APIRoute = async ({ params, url }) => {
  const name = params.name ?? ''

  if (!REPO_NAME.test(name)) return text('Nombre de repositorio inválido', 400)
  if (!GITHUB_API_KEY) return text('Falta la variable de entorno GITHUB_API_KEY', 500)

  try {
    const image = await fetchPortfolioImage(GITHUB_API_KEY, name)

    if (!image) return text('Imagen no encontrada', 404)

    // A URL carrying the current blob id never changes, so it can be cached for good.
    const versioned = url.searchParams.get('v') === image.oid

    return new Response(image.body, {
      headers: {
        'Content-Type': image.contentType,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': versioned
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error(error)

    return text('No se pudo obtener la imagen', 502)
  }
}
