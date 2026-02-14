export interface GitHubRepository {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  pushed_at: string
  private: boolean
}

export interface GitHubUser {
  login: string
  avatar_url: string
  bio: string | null
  name: string
  location: string | null
  blog: string | null
}

export interface GitHubReadme {
  name: string
  content: string
  encoding: string
}
