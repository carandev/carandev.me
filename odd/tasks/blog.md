# Blog section
Objective: add a blog to the portfolio with CRUD for articles and public pages where visitors read the latest articles.
Branch: `20261127-blog` · Delivery: work-unit commits, push/PR by the user · Test runner: none (checks: `astro check`, `astro build`, dev server smoke test)

## Specs

- S1. User request: "Necesito agregar un sección de blog en mi portafolio, que me permita hacer el crud de cada artículo y que las personas ingresen y vean los últimos articulos".
- S2. Storage and CRUD: option A of the proposal — "Archivos en el repo + CMS basado en Git (Keystatic, recomendado...)": articles live as files in the repo, managed from a `/keystatic` panel that commits to GitHub; Vercel redeploys. User: "1. A".
- S3. Publishing delay of ~1 minute (redeploy) is accepted. User: "2Si".
- S4. Articles are MDX. User: "3. Si".
- S5. Language: "Inicialmente será en español" — single language, Spanish routes and copy, no i18n routing.
- S6. Public side (from the agreed proposal): `/blog` lists articles newest first without drafts, paginated; `/blog/[slug]` shows the article with reading time, date and tags; the home shows the 3 latest articles; "Blog" link in the navbar; `rss.xml`, sitemap and SEO/OG per article.
- S7. Content schema (from the agreed proposal): `title`, `description`, `pubDate`, `updatedDate?`, `tags[]`, `cover?`, `draft`.
- S8. Admin access only through GitHub sign-in (Keystatic GitHub mode); its secrets are server-only env vars.
- Assumption: in local development Keystatic uses `local` storage (edits files on disk); production uses `github` storage.

## Tasks

| ID | Specs | Route | Status | Commit |
|----|-------|-------|--------|--------|
| T1 | S4, S5, S6 (list + article), S7 | inline | done | 17ced54 |
| T2 | S6 (home, navbar, RSS, sitemap, SEO) | inline | done | a898566 |
| T3 | S2, S3, S8 | inline | done | bcd1065 |
| T4 | S2, S8 | independent verifier (Risk items 2, 5) | done | see L8 |

## Log

- L1 (2026-11-27, user, verbatim): "Necesito agregar un sección de blog en mi portafolio, que me permita hacer el crud de cada artículo y que las personas ingresen y vean los últimos articulos, cómo se podría plantear?"
- L2 (user, verbatim, answers to the proposal's questions): "1. A; 2Si; 3. Si; 4. Inicialmente será en español"
- L3: Versions checked on npm: `@keystatic/astro` 6.0.0 (peer `astro` 5 || 6 || 7), `@keystatic/core` 0.6.10, `@astrojs/mdx` 8.1.6 (peer astro ^7.2.10), `@astrojs/rss` 4.0.19, `@astrojs/sitemap` 3.7.6. Engram mirror unavailable in this session (no memory tools).
- L4: T1 done (17ced54). `astro check` 0 errors; `astro build` Complete. Smoke with temporary content (2 posts + 1 draft, page size 1): /blog lists newest first, /blog/2/ shows the older one with prev link and "Página 2 de 2", the draft appears in no generated file; dev server: /, /blog/, /blog/hola-mundo/ → 200, /blog/2/ and unknown slug → 404 (no route clash between `[slug]` and `[...page]`). Screenshots desktop + mobile reviewed. Navbar links point to `/#section` outside the home.
- L5: T2 done. Home shows "04 · blog · Últimos artículos" (3 latest) before Contact (renumbered 05). `rss.xml` (language es, items newest first), `sitemap-index.xml` (home, /blog/, articles), RSS alternate link in head, `og:type=article` + `article:*` meta and a 1200 px JPEG `og:image` from the cover when present (checked with a temporary post with cover). Pre-existing, not changed: `/og-image.png` is referenced but `public/` only has `og-image.svg`.
- L6: T3 done. Keystatic (`keystatic.config.ts`, `@keystatic/astro` integration) injects `/keystatic/[...params]` and `/api/keystatic/[...params]` (on demand). Keystatic's local-mode API has no environment guard, so storage is `local` only when `import.meta.env.DEV` (and `PUBLIC_KEYSTATIC_STORAGE !== 'github'`, an opt-in to run the GitHub App setup wizard locally); every other build is `github` (repo carandev/carandev.me) — confirmed in the production server chunk. Secrets declared in `env.schema` (server/secret, optional). Content schema now maps `null` optional fields (as Keystatic may write) to undefined. Dev: /keystatic and /keystatic/collection/blog → 200; the existing article opens in the editor with every field populated (screenshots). `astro check` 0 errors; `astro build` Complete. Docs: `docs/blog.md`. Not done here: `.env.example` (blocked for the agent by the safety policy) — the user should add the 4 KEYSTATIC vars there. Risk: items 2 (admin auth, secrets, unauthenticated local write API) and 5 (new dependencies) → T4 independent verifier.
- L7: First T4 verifier run (mwz7c77l-1-nf0v) was interrupted by a memory incident before any step (0 tool calls); relaunched as mwz7klmo-1-cqit with sequential, memory-bounded steps (~1.8 GiB free).
- L8: T4 verifier (mwz7klmo-1-cqit) → no blockers. S8 PASS: build with PUBLIC_KEYSTATIC_STORAGE=local still ships only `github` storage (server and client bundles), no secret values or getSecret in client output. Production without secrets fails closed (missing-config throw, `@keystatic/core` api-generic.node.js:320-323; local writer only at :305 branch; `.env` writer only in dev :557), confirmed by running the handler. S2 PASS end to end in dev through the /keystatic UI (headless chromium via CDP): create → .mdx written without `updatedDate`, edit saved, build shows it on /blog/, its page, home latest, rss, sitemap; draft → absent from all output; hand-written `updatedDate: null`/`cover: null` builds with no 1970 date; delete → file gone, build OK. Local API rejects paths outside the collection, `../`, and requests without the `no-cors` header. Docs claims match the package source. `npm ls` clean. Parent follow-up: `npm audit --omit=dev` → 13 issues, 12 pre-existing on the base commit (Vercel adapter chain, zod, glob, astro…); the only new one, js-yaml 4.1.1 (high, DoS; via @keystatic/core), updated to 4.3.2 with `npm update js-yaml` (lockfile only) → 12, all pre-existing. Docs updated with verifier advisories: `npm run dev` uses `--host` (pre-existing script) so the local write API is reachable from the LAN without login (limited to content/image dirs); callback step only when not set in the wizard; missing slug var only affects UI links; fork offer for users without write access. Scratch dir removed.
- L9 (user, verbatim): "En keystatic me dice esto: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'digest') y no me cargan los artículos, intenté crear uno y tampoco". Reproduced with `npm run dev` (--host): http://192.168.101.6:4402/keystatic/collection/blog → "Unable to load collection" + that console error; http://127.0.0.1:4402 and http://localhost:4402 → list loads, no error. Cause: Keystatic needs `crypto.subtle`, only available in secure contexts (HTTPS, localhost, 127.0.0.1). Documented in docs/blog.md; no code change.
- L10 (user, verbatim): "Ya hice las pruebas y funciona, entonces qué debo ajustar para desplegarlo? Además ajusta el favicon para que sea la imagen del hero". Favicon: generated favicon-32.png, favicon-192.png and apple-touch-icon.png (180) from public/avatar.webp with sharp; Layout.astro head now links them (replaces the GitHub avatar URL declared as image/svg+xml). astro check 0 errors; build OK; 3 icon links on /, /blog/, article; 32 px preview reviewed.
