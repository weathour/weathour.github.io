# Weathour Lab

A modern cross-disciplinary personal route, portfolio, and writing system for public thought.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui preset `nova`
- MDX base config
- Motion, GSAP, Lenis
- Shiki, KaTeX dependencies for future rich writing
- Static export for GitHub Pages

## Information architecture

Primary navigation is intentionally limited to five entries:

- Home
- About
- Work
- Writing, including essays, notes, and reading records
- Route

Contact is a utility action, not a primary content channel.

## Routes

- `/` Home
- `/about`
- `/work`
- `/writing`
- `/route`
- `/contact` utility page, linked from header/footer and Command K

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## Scaffold note

See `docs/SCAFFOLD_DECISION.md` for why this starts from official Next.js and owned components instead of cloning an existing blog template.


## Internationalization

English uses the original routes. Chinese uses the `/zh` route prefix.

Examples:

- English: `/`, `/about`, `/route`
- Chinese: `/zh`, `/zh/about`, `/zh/route`

The header language switch preserves the current semantic page path.

## Deployment

This repository is prepared for GitHub Pages static deployment.

- `next.config.ts` uses `output: "export"`, `trailingSlash: true`, and unoptimized images.
- `.github/workflows/deploy.yml` builds with pnpm, runs lint/typecheck/build, uploads `./out`, and deploys with GitHub Pages Actions.
- `public/.nojekyll` is included so exported `_next` assets remain safe for Pages-style static hosting.
- The About portrait is sourced from `https://github.com/weathour.png?size=512` and stored at `public/images/avatar.png`.


## Writing publishing protocol

Writing posts are published through a file route plus explicit index registration. A `page.mdx` creates a direct route, but it does not automatically appear in `/zh/writing` or `/writing`. See `docs/WRITING_PUBLISHING.md` before publishing or syncing a new article.

## Writing math in MDX

Mathematical writing is enabled for MDX pages. Use:

```mdx
Inline formula: $a^2 + b^2 = c^2$.

$$
\dot{x}=Ax+Bu,\qquad J=\int_0^T (x^\top Qx+u^\top Ru)\,dt
$$
```

The build uses `remark-math` and `rehype-katex` through serializable plugin names in `next.config.ts`, which keeps Next/Turbopack static export compatible.

## First writing entry

The first published writing entry is available at:

- Chinese: `/zh/writing/traffic-process-framework/`

It is a long-form epistemological essay for understanding traffic-process computation through objects, dynamics, objectives, architectures, algorithms, and mesoscopic primitives. It belongs to Writing rather than Work because it is a conceptual text, not yet a paper, tool, simulation platform, or code artifact.

## Inner page layout

Secondary pages intentionally avoid a uniform card-grid pattern:

- About uses a profile dossier layout.
- Work uses an artifact ledger.
- Writing uses an editorial index.
- Route uses a chronology/map structure.

This keeps the site from feeling like every page is the same component repeated with different copy.
