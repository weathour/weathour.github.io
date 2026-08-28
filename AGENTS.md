# Site repository instructions

This repository is the Astro source for `https://weathour.github.io/`.

When this repository lives inside the canonical blog workspace, `../AGENTS.md` owns research, drafting, house style, and cumulative writing memory. This file keeps the site-specific copy of the rules needed when the repository is opened on its own.

## Content paths

- Chinese article: `src/content/posts/<slug>.zh.md`
- English article: `src/content/posts/<slug>.en.md`
- Shared article assets: `src/content/posts/<slug>/`

## Article production workflow

Scale the process to the article instead of creating the full research stack by default.

- Use the **standard lane** for a focused argument, a narrow evidence base, and little or no rights-sensitive media.
- Use the **flagship lane** when the article has a long argument chain, several primary sources, theory-heavy or contestable claims, bilingual publication, rights-sensitive media, or an expected Chinese length above roughly 5,000 characters.

### Cumulative writing memory

Before F1 on a flagship article, read the closest completed article packets under `../drafts/` and any relevant note under `../published-notes/`. `redemption-between-return-and-erasure` is the reference case for screen form, secondary agents, and image anchors. `when-credentials-live-for-us` is the reference case for long mechanism chains, evidence ceilings, theory allocation, bilingual stress tests, and rights-safe archival or original images. Reuse a lesson only when it addresses a live risk in the new article.

### Canonical process files

Keep one live article package under `../drafts/<slug>/`:

- `article-packet.md`: reader promise, central claim, section contracts, article-specific style decisions, bilingual terminology, open questions, and the claim/evidence/asset ledger. Keep any transition audit for a long causal argument here. Record an exclusion only when crossing it would materially change the argument.
- `draft.zh.md`: the only live Chinese working draft.
- `review-notes.md`: optional; keep only unresolved review items and delete or archive it when they close.
- `assets/manifest.json`: required when the article uses external images or other reusable media; record source, rights decision, checksum when useful, alt text, and caption.

Do not create separate theory maps, reference notes, image maps, voice guides, sectional `part-*` drafts, or complete `v2`/`v3` snapshots by default. Add one only when a real risk cannot be represented clearly in `article-packet.md`. Use Git history for ordinary versioning.

### Gates and freeze points

1. **F1 — scope:** define the target reader, one concrete central claim, expected length, and expected media. Add an exclusion or analogy boundary only for a live interpretive risk. Do not begin broad research while the claim remains a topic label.
2. **F2a — argument:** give every section a contract: concrete scene or fact, question, inference, and transition. Add a boundary only when omitting it would distort the argument. For a long argument, name the question that persists across sections. Audit every transition in a causal or mechanism chain: the enabling condition, actor or institutional operation, observable consequence, and a counter-case or interruption. An arrow in an outline is not a causal bridge. Each new scene or theorist must change the reader's provisional answer, and each section must advance the central claim rather than form a separate plot/theory/technology block.
3. **F2b — evidence and assets:** give every load-bearing claim a source level, precise locator, permitted wording, prohibited extrapolation, and target section. Classify its job as material fact, borrowed mechanism, scale or context, stated policy intent, or authorial inference. A scale statistic does not establish prevalence or causation, and a policy target does not establish an achieved effect. Before F3, assign each planned body image an anchor and an inferential job; do not add images to meet a count. Record the final public-use decision, alt text, and caption for every external asset. If a modern cover, portrait, or adaptation still lacks a reliable redistribution license, use an openly licensed archival object or original conceptual art and label it accurately.
4. **F3 — Chinese content:** write and revise only `draft.zh.md`. Run an argument/evidence review first and a prose/repetition review second. Freeze when there are no unresolved placeholders, unsupported key claims, missing citations, or structural repetitions.
5. **F4 — bilingual content:** adapt the English article only after F3. Check section order, claims, qualifications, numbers, footnote keys, images, alt text, captions, and terminology. Use translation as a stress test for agency, chronology, permanence, and responsibility. English may change syntax but must not introduce a substantive claim absent from Chinese. If translation reveals a conceptual problem, reopen F3 and update both languages.
6. **Publication:** move the frozen content into the Astro collection, run `pnpm verify`, confirm both routes in the build output, and inspect the target diff. Push only with explicit user authorization. After pushing, run `pnpm verify:push` for the exact commit SHA before calling the article published.

Research stops when every load-bearing claim is supported or clearly marked as inference and every planned section has enough evidence to perform its assigned task. If two focused searches do not produce reliable support, narrow, qualify, or remove the claim instead of expanding the research indefinitely.

After F2, a new core claim reopens argument and evidence review. After F3, any Chinese meaning change requires English resynchronization. After F4, limit direct fixes to metadata, spelling, broken links, or equivalent corrections; substantive revision reopens both language gates. An asset-only revision reopens F2b and bilingual asset alignment. It reopens F3 only when the image or caption changes the argument.

### House style for long-form criticism

- Start from a visible scene, object, action, interface state, or institutional mechanism. Introduce theory where the scene can no longer explain itself.
- Let examples perform an inference. Do not use plot details, technical facts, or citations as decoration.
- Give each retained theorist a distinct job. When several works appear, use them to test different parts of the same problem rather than assigning one self-contained theory block to each work.
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
