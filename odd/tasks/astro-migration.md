# Astro migration
Objective: move the portfolio from a Vite React SPA to Astro so a blog can be added later, keeping the current page identical.
Branch: `astro-migration` (from `redesign-trazos`) · Delivery: `ask-on-risk` · Test runner: none (checks: `astro check`, `astro build`, dev server smoke test + screenshots)

## Specs

- S1. Migrate the site to Astro. User: "Crees que sería mejor migrarlo a astro para que en un futuro exista una sección de blog?" → "Si" (agreed plan: "Migrar a Astro en otra rama, con la página igual a la actual").
- S2. The rendered page keeps the current sections, content, styles and micro-interactions (scroll reveal, hover effects, mobile menu, scroll spy, copy email).
- S3. Values derived from dates stay dynamic: "que cosas como tengo x años de experiencia también sea dinámico según la fecha en la que empecé a trabajar, igual con el estudio y trabajo actual". In a prerendered page they must not freeze at build time.
- S4. Projects stay dynamic and chosen from GitHub topics (`portfolio`, `featured`) via `/api/repos`, rendered on demand on Vercel; the GitHub token never reaches the client bundle.
- S5. Static sections ship no client JavaScript; only interactive parts hydrate.
- Out of scope (assumption): the blog itself (collection, routes, RSS) is a later feature.

## Tasks

| ID | Specs | Route | Status | Commit |
|----|-------|-------|--------|--------|
| T1 | S1, S2, S3, S5 | inline | done | see L4 |
| T2 | S4 | inline | done | see L4 |
| T3 | S1–S5 | independent verifier (Risk item 5) | pending | — |

## Log

- L1 (2026-11-02, user, verbatim): "Crees que sería mejor migrarlo a astro para que en un futuro exista una sección de blog?" — then "Si".
- L2: Astro 7.4.5, @astrojs/react 7.1.2, @astrojs/vercel 11.0.18 (Node 26 locally; Astro requires >=22.23.4). Astro 7 uses Vite 8; `import.meta.env` is always inlined, so the token goes through `astro:env/server` (secret, read at runtime).
- L3: Routes inline; no writer trigger (single coupled unit). Risk item 5 (dependencies, deploy) → independent verifier after own checks.
- L4: T1+T2 committed together (one Risk-item-5 unit: removing Vite also removes the dev API middleware). Checks: `astro check` → 0 errors, 0 warnings, 6 hints (pre-existing deprecated lucide brand icons); `astro build` → OK, `/index.html` prerendered, `/api/repos` bundled as a Vercel function, 172 KB client JS (React islands: Navbar, Projects, Contact); `astro dev` smoke test → `/api/repos` 200 with real GitHub data, desktop screenshot matches the previous design. Date-derived text carries `data-live-*` and is recomputed client-side (`src/scripts/live-dates.ts`). Note: current-job/studies status only changes when profile dates change, which triggers a rebuild.
