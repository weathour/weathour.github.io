# Site repository instructions

This repository is the Astro source for `https://weathour.github.io/`.

When this repository lives inside the canonical blog workspace, `../AGENTS.md` owns research, drafting, house style, and cumulative writing memory. This file owns site-specific content paths, checks, and publication. It does not duplicate the workspace's writing rules.

## Content paths

- Chinese article: `src/content/posts/<slug>.zh.md`
- English article: `src/content/posts/<slug>.en.md`
- Shared article assets: `src/content/posts/<slug>/`

## Writing and content

Use the parent workspace's current writing policy and `$reader-first-longform-writing` / `$yxj-chinese-expression`. When opened alone, follow the user's current article requirements and those skills. Earlier formal and stylistic prescriptions in this repository's history and old article packets are retired; they do not supply default openings, paragraph templates, sentence limits, prohibited constructions, or endings.

Organization, detail, voice, and rhythm follow the current article. Keep factual claims and quotations accurate, their attribution recoverable, and important inferences understandable. For Chinese expression, use the user's Lu Xun benchmark as appropriate to the genre and requested voice.

Keep the live packet and Chinese draft at the workspace's declared paths. For bilingual publication, check substantive meaning, terminology, notes, and shared media across both versions. Each public article uses a dedicated cover with its source and rights decision recorded. Verify changed routes and media through the publication protocol below.

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
