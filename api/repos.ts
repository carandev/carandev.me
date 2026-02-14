export default async function handler(req: any, res: any) {
  const GITHUB_TOKEN = process.env.GITHUB_API_KEY;

  const response = await fetch(
    "https://api.github.com/user/repos?sort=pushed&per_page=100",
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: "Failed to fetch repositories" });
  }

  const data = await response.json();

  const filtered = data.filter((repo: any) =>
    repo.homepage?.startsWith("http"),
  );

  const sorted = filtered.sort(
    (a: any, b: any) =>
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );

  res.json(sorted);
}
