# Portfolio images from repository files
Objective: let each project define its card image as a file inside its own GitHub repository, so private repositories can show an image too.
Branch: `astro-migration` · Delivery: `ask-on-risk` · Test runner: none (checks: `astro check`, `astro build`, dev smoke test with real GitHub data)

## Specs

- S1. User: "No sería mejor que sea una imagen que se coloque en github directamente para que los privados también tengan?" → "Sí, impleméntalo así" (agreed design: fixed path `.github/portfolio.png` in each repo, detected in the existing GraphQL query, served by a server endpoint `/api/repos/<nombre>/image` using the token, falling back to the Social preview for public repos or the handwritten name).
- S2. The endpoint only serves that fixed file path; the token never reaches the client; responses are cached on the CDN and versioned by the blob id.
- S3. Repos without the file keep the current behavior (public: Social preview; private: handwritten name).
- Assumption: besides `.png`, `.jpg`/`.jpeg` and `.webp` at the same path are accepted (first match wins: png, jpg, jpeg, webp).

## Tasks

| ID | Specs | Route | Status | Commit |
|----|-------|-------|--------|--------|
| T1 | S1, S2, S3 | inline | done | see L4 |
| T2 | S1–S3 | independent verifier (Risk item 2) | pending | — |

## Log

- L1 (2026-11-02, user, verbatim): "No sería mejor que sea una imagen que se coloque en github directamente para que los privados también tengan?" — then "Sí, impleméntalo así".
- L2: Verified in GitHub docs: REST `GET /repos/{owner}/{repo}/contents/{path}` with `application/vnd.github.raw+json` returns raw bytes (files up to 100 MB); GraphQL `Repository.object(expression: "HEAD:<path>")` returns a `Blob` with `oid` and `byteSize`.
- L3: Risk item 2 (a server credential is used to publish content from private repos) → independent verifier.
- L4: T1 done. `astro check` → 0 errors, 0 warnings; `astro build` → Complete. Dev smoke test with real GitHub data: the extended GraphQL query succeeds; no repo has the file yet, so `imageUrl` keeps Social preview (public) / null (private); `/api/repos/lazytsql/image` → 404, `/api/repos/FlatBrutal/image` → 404, invalid name → 400, unknown repo → 404. The positive path (file present) needs mocked GitHub responses (T2). Private repos only expose the image when tagged `portfolio`/`featured`; the blob is fetched by the oid GraphQL reported; SVG excluded; 5 MB cap.
