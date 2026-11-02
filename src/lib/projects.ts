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
    // Never link the code of a private repository
    repoUrl: repo.isPrivate ? null : repo.url,
    demoUrl: normalizeUrl(repo.homepageUrl),
    // A private repo image is not public; a public repo uses its "social preview"
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
    { data?: { viewer: { repositories: { nodes: GraphQLRepo[] } } } } | null

  if (!response.ok || !body?.data) {
    throw new GitHubError(`GitHub GraphQL request failed (${response.status})`)
  }

  return selectProjects(body.data.viewer.repositories.nodes)
}
