import { useState, useEffect, useCallback } from "react";
import { getRepositories, getReadme } from "../services/github";
import { GitHubRepository } from "../types/github";

export function useGitHub() {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const repos = await getRepositories();
      setRepositories(repos);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch repositories",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  return { repositories, loading, error, fetchRepositories };
}
