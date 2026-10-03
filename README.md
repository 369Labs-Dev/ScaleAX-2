# ScaleAX — website frontend workspace

This repository holds the **public marketing website** of ScaleAX only (`apps/website`,
Next.js 15, React 19, Tailwind CSS 4). It is a self-contained pnpm workspace: no backend
services, databases or environment variables are needed to run it. The lead/consultation
API routes under `src/app/api` are local stubs that log to the console.

Requirements: Node >= 20, pnpm 9.1.0 (`corepack enable && corepack prepare pnpm@9.1.0 --activate`).

```bash
pnpm install              # install (lockfile is committed; keep it in sync)
pnpm dev                  # http://localhost:3200
pnpm build && pnpm start  # production build, port 3200
pnpm lint                 # next lint
pnpm test:unit            # vitest
pnpm test                 # smoke test against a built site
pnpm test:e2e             # Playwright (apps/e2e, website config) — run `pnpm exec playwright install chromium` once
```

## Layout

| Path                                         | What                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------ |
| `apps/website/src/app`                       | App Router pages, layouts and API route stubs                                        |
| `apps/website/src/components`                | UI components (site design system — tokens live here, not shared with any other app) |
| `apps/website/src/lib`                       | Helpers (analytics, planner engine, content)                                         |
| `apps/website/public`                        | Static assets                                                                        |
| `apps/e2e/e2e-website`                       | Playwright specs for the website                                                     |
| `docs/product/website-brief-v3-full-site.md` | The website brief — the product source of truth for this site                        |

## Working agreements

- Keep all changes inside `apps/website` (and `apps/e2e/e2e-website` for tests). Paths are
  identical to the main ScaleAX monorepo, so your commits can be cherry-picked back as-is.
- Conventional commits are enforced on commit (commitlint + husky), e.g.
  `feat(website): add pricing page`, `fix(website): hero CTA contrast`.
- Do not add `@playwright/test` to `apps/website` and do not remove the `pnpm.overrides`
  entry in the root `package.json` — that peer edge breaks `next build` under pnpm.
- Do not commit `.env*` files or credentials. The site needs no secrets.
- Lint, unit tests and `pnpm build` must pass before you hand work over for review.
