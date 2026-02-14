import { GitHubRepository, GitHubReadme } from "../types/github";

const BASE_URL = "/api";
const USERNAME = "carandev";

async function fetchWithAuth(endpoint: string): Promise<Response> {
  return fetch(`${BASE_URL}${endpoint}`, {});
}

export async function getRepositories(): Promise<GitHubRepository[]> {
  const response = await fetchWithAuth(`/repos?sort=pushed&per_page=100`);

  if (!response.ok) {
    throw new Error(`Error al obtener repositorios: ${response.status}`);
  }

  const data: GitHubRepository[] = await response.json();

  const filtered = data.filter(
    (repo) => repo.homepage && repo.homepage.startsWith("http"),
  );

  return filtered.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );
}
