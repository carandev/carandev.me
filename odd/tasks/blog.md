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
| T2 | S6 (home, navbar, RSS, sitemap, SEO) | inline | done | see L5 |
| T3 | S2, S3, S8 | inline | pending | |
| T4 | S2, S8 | independent verifier (Risk items 2, 5) | pending | |

## Log

- L1 (2026-11-27, user, verbatim): "Necesito agregar un sección de blog en mi portafolio, que me permita hacer el crud de cada artículo y que las personas ingresen y vean los últimos articulos, cómo se podría plantear?"
- L2 (user, verbatim, answers to the proposal's questions): "1. A; 2Si; 3. Si; 4. Inicialmente será en español"
- L3: Versions checked on npm: `@keystatic/astro` 6.0.0 (peer `astro` 5 || 6 || 7), `@keystatic/core` 0.6.10, `@astrojs/mdx` 8.1.6 (peer astro ^7.2.10), `@astrojs/rss` 4.0.19, `@astrojs/sitemap` 3.7.6. Engram mirror unavailable in this session (no memory tools).
- L4: T1 done (17ced54). `astro check` 0 errors; `astro build` Complete. Smoke with temporary content (2 posts + 1 draft, page size 1): /blog lists newest first, /blog/2/ shows the older one with prev link and "Página 2 de 2", the draft appears in no generated file; dev server: /, /blog/, /blog/hola-mundo/ → 200, /blog/2/ and unknown slug → 404 (no route clash between `[slug]` and `[...page]`). Screenshots desktop + mobile reviewed. Navbar links point to `/#section` outside the home.
- L5: T2 done. Home shows "04 · blog · Últimos artículos" (3 latest) before Contact (renumbered 05). `rss.xml` (language es, items newest first), `sitemap-index.xml` (home, /blog/, articles), RSS alternate link in head, `og:type=article` + `article:*` meta and a 1200 px JPEG `og:image` from the cover when present (checked with a temporary post with cover). Pre-existing, not changed: `/og-image.png` is referenced but `public/` only has `og-image.svg`.
