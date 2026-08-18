# Site repository instructions

This repository is the Astro source for `https://weathour.github.io/`.

## Content paths

- Chinese article: `src/content/posts/<slug>.zh.md`
- English article: `src/content/posts/<slug>.en.md`
- Shared article assets: `src/content/posts/<slug>/`

## Required verification

Run the single repository gate before declaring any change ready:

```bash
pnpm verify
```

Do not replace it with a hand-picked subset of lint, typecheck, or build commands. `pnpm lint` is read-only; use `pnpm lint:fix` only when an explicit source-changing cleanup is intended.

## Publishing

- Push only when the user explicitly asks to publish or sync.
- Never force-push `main`.
- After an authorized push, run `pnpm verify:push` and wait for the exact commit SHA.
- A successful `git push` is not proof that verification or Pages deployment completed.

The canonical procedure, incident history, and failure routing are in [`docs/WRITING_PUBLISHING.md`](docs/WRITING_PUBLISHING.md).
