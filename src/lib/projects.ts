/**
 * Projects shown in the portfolio. They are chosen on GitHub with repository
 * topics, so no redeploy is needed:
 *   - `portfolio` → shown in the portfolio
 *   - `featured`  → shown as a featured project (implies `portfolio`)
 *
 * If no repository has those topics, public repositories with a homepage
 * (demo URL) are used as a fallback.
 */
import type { Project } from '../types/github'

export const GITHUB_OWNER = 'carandev'

const SHOW_TOPIC = 'portfolio'
const FEATURED_TOPIC = 'featured'
const HIDDEN_TOPICS = new Set([SHOW_TOPIC, FEATURED_TOPIC])

/**
 * Card image committed inside each repository. It works for private repos
 * because /api/repos/<name>/image fetches it with the token. SVG is not
 * accepted on purpose (it can carry scripts). First match wins.
 */
const IMAGE_DIR = '.github/portfolio'
const IMAGE_TYPES = [
  { alias: 'imagePng', ext: 'png', contentType: 'image/png' },
  { alias: 'imageJpg', ext: 'jpg', contentType: 'image/jpeg' },
  { alias: 'imageJpeg', ext: 'jpeg', contentType: 'image/jpeg' },
  { alias: 'imageWebp', ext: 'webp', contentType: 'image/webp' }
] as const
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

const IMAGE_FIELDS = IMAGE_TYPES
  .map(t => `${t.alias}: object(expression: "HEAD:${IMAGE_DIR}.${t.ext}") { ... on Blob { oid byteSize } }`)
  .join('\n          ')

type ImageBlob = { oid: string, byteSize: number } | null
type ImageAlias = typeof IMAGE_TYPES[number]['alias']
type ImageFields = { [K in ImageAlias]?: ImageBlob }

function findImage (repo: ImageFields) {
  for (const type of IMAGE_TYPES) {
    const blob = repo[type.alias]

    if (blob?.oid && blob.byteSize <= MAX_IMAGE_BYTES) return { ...type, oid: blob.oid }
  }

  return null
}

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
          ${IMAGE_FIELDS}
        }
      }
    }
  }
`

interface GraphQLRepo extends ImageFields {
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

function normalizeUrl (url: string | null): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (!trimmed) return null

  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`
}

/**
 * 1. An image file committed in the repo (served by our endpoint, works for private repos).
 * 2. The repo's GitHub "social preview" (public repos only; private ones are not publicly reachable).
 */
function imageUrlFor (repo: GraphQLRepo): string | null {
  const image = findImage(repo)

  if (image) return `/api/repos/${encodeURIComponent(repo.name)}/image?v=${image.oid}`

  return repo.isPrivate ? null : repo.openGraphImageUrl
}

function toProject (repo: GraphQLRepo, featured: boolean): Project {
  const topics = repo.repositoryTopics.nodes.map(n => n.topic.name)

  return {
    name: repo.name,
    description: repo.description,
    // Never link the code of a private repository
    repoUrl: repo.isPrivate ? null : repo.url,
    demoUrl: normalizeUrl(repo.homepageUrl),
    imageUrl: imageUrlFor(repo),
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

    // Featured first; each group keeps the latest-activity order from the query
    return [...projects.filter(p => p.featured), ...projects.filter(p => !p.featured)]
  }

  // Fallback: public repos with a demo; the 3 most recent become featured
  return repos
    .filter(r => !r.isPrivate && !r.isFork && !r.isArchived && normalizeUrl(r.homepageUrl))
    .map((r, i) => toProject(r, i < 3))
}

export class GitHubError extends Error {}

/** Fetches the owner's repositories with the given token and selects the ones to show. */
export async function fetchProjects (token: string): Promise<Project[]> {
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
    const details = body?.errors ? ` ${JSON.stringify(body.errors)}` : ''

    throw new GitHubError(`GitHub GraphQL request failed (${response.status})${details}`)
  }

  return selectProjects(body.data.viewer.repositories.nodes)
}

const IMAGE_QUERY = `
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      isPrivate
      repositoryTopics(first: 20) { nodes { topic { name } } }
      ${IMAGE_FIELDS}
    }
  }
`

export interface PortfolioImage {
  body: ArrayBuffer
  contentType: string
  oid: string
}

/**
 * Downloads the portfolio image of one repository, or null when there is none.
 * A private repository only exposes it when it is tagged `portfolio` or `featured`.
 */
export async function fetchPortfolioImage (token: string, name: string): Promise<PortfolioImage | null> {
  const headers = {
    Authorization: `Bearer ${token}`,
    'User-Agent': 'carandev.me'
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: IMAGE_QUERY, variables: { owner: GITHUB_OWNER, name } })
  })
  const body = await response.json().catch(() => null) as
    { data?: { repository: (ImageFields & { isPrivate: boolean, repositoryTopics: GraphQLRepo['repositoryTopics'] }) | null }, errors?: unknown } | null

  if (!response.ok || !body?.data) {
    const details = body?.errors ? ` ${JSON.stringify(body.errors)}` : ''

    throw new GitHubError(`GitHub GraphQL request failed (${response.status})${details}`)
  }

  const repo = body.data.repository

  if (!repo) return null

  const topics = repo.repositoryTopics.nodes.map(n => n.topic.name)

  if (repo.isPrivate && !topics.includes(SHOW_TOPIC) && !topics.includes(FEATURED_TOPIC)) return null

  const image = findImage(repo)

  if (!image) return null

  // Fetch by blob id: exactly the object GraphQL reported, as raw bytes.
  const blob = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${encodeURIComponent(name)}/git/blobs/${image.oid}`,
    { headers: { ...headers, Accept: 'application/vnd.github.raw+json' } }
  )

  if (!blob.ok) throw new GitHubError(`GitHub blob request failed (${blob.status})`)

  return { body: await blob.arrayBuffer(), contentType: image.contentType, oid: image.oid }
}
