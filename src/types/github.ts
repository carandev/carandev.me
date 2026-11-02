/** Project as returned by /api/repos (see src/lib/projects.ts). */
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
