export interface Language { name: string, color: string | null }

/** Project as returned by /api/repos (see src/lib/projects.ts). */
export interface Project {
  name: string
  description: string | null
  repoUrl: string | null
  demoUrl: string | null
  imageUrl: string | null
  language: Language | null
  /** Every language GitHub detects, largest first. */
  languages: Language[]
  topics: string[]
  stars: number
  pushedAt: string
  featured: boolean
}
