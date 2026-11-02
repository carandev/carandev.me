import type { Project } from '../types/github'

export async function getProjects (signal?: AbortSignal): Promise<Project[]> {
  const response = await fetch('/api/repos', { signal })

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los proyectos (${response.status})`)
  }

  return response.json()
}
