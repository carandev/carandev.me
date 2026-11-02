/**
 * GET /api/repos
 *
 * Devuelve los proyectos a mostrar en el portafolio. Se eligen desde GitHub
 * con topics del repositorio (sin redeploy):
 *   - `portfolio` → aparece en el portafolio
 *   - `featured`  → aparece como proyecto destacado (implica `portfolio`)
 *
 * Si ningún repo tiene esos topics, se usan como respaldo los repos que tienen
 * una URL de demo (homepage), igual que la versión anterior.
 */

const SHOW_TOPIC = 'portfolio'
const FEATURED_TOPIC = 'featured'
const HIDDEN_TOPICS = new Set([SHOW_TOPIC, FEATURED_TOPIC])

const QUERY = `
  query {
    viewer {
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          name
          description
          url
          homepageUrl
          isPrivate
          isFork
          isArchived
          stargazerCount
          pushedAt
          openGraphImageUrl
          usesCustomOpenGraphImage
          primaryLanguage { name color }
          repositoryTopics(first: 20) { nodes { topic { name } } }
        }
      }
    }
  }
`

interface GraphQLRepo {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  isPrivate: boolean
  isFork: boolean
  isArchived: boolean
  stargazerCount: number
  pushedAt: string
  openGraphImageUrl: string
  usesCustomOpenGraphImage: boolean
  primaryLanguage: { name: string, color: string | null } | null
  repositoryTopics: { nodes: { topic: { name: string } }[] }
}

export interface Project {
  name: string
  description: string | null
  repoUrl: string | null
  demoUrl: string | null
  imageUrl: string | null
  language: { name: string, color: string | null } | null
  topics: string[]
  stars: number
  pushedAt: string
  featured: boolean
}

function normalizeUrl (url: string | null): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (!trimmed) return null

  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`
}

function toProject (repo: GraphQLRepo, featured: boolean): Project {
  const topics = repo.repositoryTopics.nodes.map(n => n.topic.name)

  return {
    name: repo.name,
    description: repo.description,
    // Nunca enlazamos el código de un repo privado
    repoUrl: repo.isPrivate ? null : repo.url,
    demoUrl: normalizeUrl(repo.homepageUrl),
    // La imagen de un repo privado no es pública; la de uno público es su "social preview"
    imageUrl: repo.isPrivate ? null : repo.openGraphImageUrl,
    language: repo.primaryLanguage,
    topics: topics.filter(t => !HIDDEN_TOPICS.has(t)),
    stars: repo.stargazerCount,
    pushedAt: repo.pushedAt,
    featured
  }
}

export function selectProjects (repos: GraphQLRepo[]): Project[] {
  const hasTopic = (repo: GraphQLRepo, topic: string) =>
    repo.repositoryTopics.nodes.some(n => n.topic.name === topic)

  const chosen = repos.filter(r => hasTopic(r, SHOW_TOPIC) || hasTopic(r, FEATURED_TOPIC))

  if (chosen.length > 0) {
    const projects = chosen.map(r => toProject(r, hasTopic(r, FEATURED_TOPIC)))

    // Destacados primero; dentro de cada grupo, por última actividad (ya vienen ordenados)
    return [...projects.filter(p => p.featured), ...projects.filter(p => !p.featured)]
  }

  // Respaldo: repos públicos con demo; los 3 más recientes como destacados
  return repos
    .filter(r => !r.isPrivate && !r.isFork && !r.isArchived && normalizeUrl(r.homepageUrl))
    .map((r, i) => toProject(r, i < 3))
}

interface Res {
  status: (code: number) => Res
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
}

export default async function handler (_req: unknown, res: Res) {
  const token = process.env.GITHUB_API_KEY

  if (!token) {
    return res.status(500).json({ error: 'Falta la variable de entorno GITHUB_API_KEY' })
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'carandev.me'
    },
    body: JSON.stringify({ query: QUERY })
  })

  const body = await response.json().catch(() => null) as
    { data?: { viewer: { repositories: { nodes: GraphQLRepo[] } } }, errors?: unknown } | null

  if (!response.ok || !body?.data) {
    return res.status(502).json({ error: 'No se pudieron obtener los repositorios' })
  }

  // CDN de Vercel: 1 h fresco, hasta 1 día sirviendo la versión anterior mientras revalida
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.json(selectProjects(body.data.viewer.repositories.nodes))
}
