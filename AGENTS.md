# Site repository instructions

This repository is the Astro source for `https://weathour.github.io/`.

## Content paths

- Chinese article: `src/content/posts/<slug>.zh.md`
- English article: `src/content/posts/<slug>.en.md`
- Shared article assets: `src/content/posts/<slug>/`

## Article production workflow

Scale the process to the article instead of creating the full research stack by default.

- Use the **standard lane** for a focused argument, a narrow evidence base, and little or no rights-sensitive media.
- Use the **flagship lane** when the article has a long argument chain, several primary sources, theory-heavy or contestable claims, bilingual publication, rights-sensitive media, or an expected Chinese length above roughly 5,000 characters.

### Canonical process files

Keep one live article package under `../drafts/<slug>/`:

- `article-packet.md`: reader promise, central claim, explicit exclusions, section contracts, article-specific style decisions, bilingual terminology, open questions, and the claim/evidence/asset ledger.
- `draft.zh.md`: the only live Chinese working draft.
- `review-notes.md`: optional; keep only unresolved review items and delete or archive it when they close.
- `assets/manifest.json`: required when the article uses external images or other reusable media; record source, rights decision, checksum when useful, alt text, and caption.

Do not create separate theory maps, reference notes, image maps, voice guides, sectional `part-*` drafts, or complete `v2`/`v3` snapshots by default. Add one only when a real risk cannot be represented clearly in `article-packet.md`. Use Git history for ordinary versioning.

### Gates and freeze points

1. **F1 — scope:** define the target reader, one falsifiable central claim, three to five exclusions or analogy boundaries, expected length, and expected media. Do not begin broad research while the claim remains a topic label.
2. **F2a — argument:** give every section a contract: concrete scene or fact, question, inference, boundary, and transition. Each section must advance the central claim rather than form a separate plot/theory/technology block.
3. **F2b — evidence and assets:** give every load-bearing claim a source level, precise locator, permitted wording, prohibited extrapolation, and target section. Mark authorial inference explicitly. Record the final public-use decision for every external asset so research notes and publication state cannot conflict.
4. **F3 — Chinese content:** write and revise only `draft.zh.md`. Run an argument/evidence review first and a prose/repetition review second. Freeze when there are no unresolved placeholders, unsupported key claims, missing citations, or structural repetitions.
5. **F4 — bilingual content:** adapt the English article only after F3. Check section order, claims, qualifications, numbers, footnote keys, images, alt text, captions, and terminology. English may change syntax but must not introduce a substantive claim absent from Chinese. If translation reveals a conceptual problem, reopen F3 and update both languages.
6. **Publication:** move the frozen content into the Astro collection, run `pnpm verify`, confirm both routes in the build output, and inspect the target diff. Push only with explicit user authorization. After pushing, run `pnpm verify:push` for the exact commit SHA before calling the article published.

Research stops when every load-bearing claim is supported or clearly marked as inference and every planned section has enough evidence to perform its assigned task. If two focused searches do not produce reliable support, narrow, qualify, or remove the claim instead of expanding the research indefinitely.

After F2, a new core claim reopens argument and evidence review. After F3, any Chinese meaning change requires English resynchronization. After F4, limit direct fixes to metadata, spelling, broken links, or equivalent corrections; substantive revision reopens both language gates.

### House style for long-form criticism

- Start from a visible scene, object, action, interface state, or institutional mechanism. Introduce theory where the scene can no longer explain itself.
- Let examples perform an inference. Do not use plot details, technical facts, or citations as decoration.
- Keep ontology, discourse position, lived experience, and political or economic arrangement distinct. State where an analogy stops.
- Return an abstract judgment to a character action, material arrangement, or checkable mechanism within the next two sentences.
- Avoid stock reversals such as `不是 X，而是 Y`, `我们以为……其实……`, equal-length three-part slogans, and conclusions produced mainly by rhetorical cadence.
- Name a theorist at the first substantive attribution. Thereafter, repeat the name only when the source, interpretation, or responsibility for the claim would otherwise become unclear.
- Preserve uncertainty where the evidence is limited. Never invent dialogue, scene details, quotations, locators, or future plot developments.

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
