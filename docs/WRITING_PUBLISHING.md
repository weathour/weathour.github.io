# Writing publishing protocol

This site uses a **file route + explicit index registration** model for writing. It is not a CMS, and it does not automatically scan every `page.mdx` under `src/app/**/writing/` into the visible writing archive.

## 1. Core principle

A writing post is only fully published when it has all three layers it needs:

1. **Detail page** — the actual article route exists.
2. **Index registration** — the Writing page links to it.
3. **Deployment** — the committed change is pushed and built by GitHub Pages.

Adding only the detail page creates a valid direct URL, but it can still be invisible from `/zh/writing` or `/writing`.

## 2. Information architecture

The site separates Writing from Work:

- **Writing** records clarified thought: essays, cultural criticism, theory notes, public arguments, research explanations, reading trails.
- **Work** records built artifacts: papers, tools, simulations, systems, project outputs, code deliverables.

A conceptual article belongs under Writing even if it may later become a paper, tool, or public project.

## 3. Detail page locations

### Chinese long-form

```text
src/app/zh/writing/<slug>/page.mdx
```

Route:

```text
/zh/writing/<slug>
```

### English long-form

```text
src/app/writing/<slug>/page.mdx
```

Route:

```text
/writing/<slug>
```

If an article is written in Chinese, keep the full article under `/zh/writing/...`. The English `/writing` index may still include an English summary card that links to the Chinese article with `hrefLang="zh-CN"`.

## 4. MDX article shell

Every long-form MDX page should use `ArticleShell`:

```mdx
import { ArticleShell } from "@/components/site/article-shell";

<ArticleShell
  locale="zh"
  eyebrow="Writing / 文艺评论"
  title="文章标题"
  description="一句话说明文章论点。"
  date="YYYY-MM-DD"
  tags={["标签一", "标签二"]}
>

正文

</ArticleShell>
```

Rules:

- Keep the title in `ArticleShell`; do not duplicate a top-level `#` heading unless there is a deliberate reason.
- Use `locale="zh"` for Chinese articles.
- Use a durable `description`: it should state the thesis, not just tease the topic.
- Tags connect problems and methods; they are not the main navigation structure.

## 5. Required index registration

A new article must be registered manually in the visible Writing pages.

### Chinese Writing index

Update:

```text
src/app/zh/writing/page.tsx
```

Add the article to the `essays` list. The newest or currently featured article should be first. This makes it visible at:

```text
/zh/writing
```

### English Writing index

Update:

```text
src/app/writing/page.tsx
```

For a Chinese-only article, add an English summary card that links to the Chinese route:

```tsx
href: "/zh/writing/<slug>"
```

and use `hrefLang="zh-CN"` on the `Link` where applicable.

This makes it discoverable from:

```text
/writing
```

## 6. Optional homepage promotion

The homepage feature card is also manual.

Chinese homepage:

```text
src/app/zh/page.tsx
```

English homepage:

```text
src/app/page.tsx
```

Update these only when the article should be the current front-page feature. Do not assume every new article should replace the homepage feature; this is an editorial decision.

## 7. Visibility levels

A post may exist at different visibility levels:

| Level | What exists | User can find it how? | Required files |
| --- | --- | --- | --- |
| Direct route only | `page.mdx` | Only by exact URL | `src/app/.../writing/<slug>/page.mdx` |
| Writing-index visible | Detail page + writing index | `/zh/writing` or `/writing` | plus `src/app/zh/writing/page.tsx` and/or `src/app/writing/page.tsx` |
| Homepage featured | Detail page + writing index + homepage card | home page and writing page | plus `src/app/zh/page.tsx` and/or `src/app/page.tsx` |
| Deployed | committed and pushed | public website after GitHub Pages deploy | Git commit + push |

The common mistake is stopping at “direct route only.” The build will show the route, but the article will not appear in the Writing archive.

## 8. Writing-agent relationship

The local writing workflow is separate from the public site:

```text
writing-agent/articles/<project>/     # production workflow artifacts
/drafts/<article-slug>/               # personal process notes and evidence
weathour.github.io/src/app/...        # public site source
```

Use writing-agent for production, revision, review, and clean copy. The public article still has to be copied or transformed into the site’s MDX route and then registered in the indexes.

## 9. Publish checklist

Before saying an article is published, verify all of this:

- [ ] Final article source exists in writing-agent or drafts.
- [ ] Chinese article MDX exists at `src/app/zh/writing/<slug>/page.mdx`, or English article MDX exists at `src/app/writing/<slug>/page.mdx`.
- [ ] MDX uses `ArticleShell` and has title, description, date, tags, and locale.
- [ ] `/zh/writing/page.tsx` registers Chinese articles in `essays`.
- [ ] `/writing/page.tsx` registers a cross-language summary when useful.
- [ ] Homepage cards are updated if the article should be featured.
- [ ] `pnpm lint` passes.
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm build` passes.
- [ ] Build output includes the article route.
- [ ] `git status --short` shows only intended changes.
- [ ] Commit message describes the article/index update.
- [ ] Push only when publication/sync is explicitly requested.

## 10. Verification commands

Run inside `weathour.github.io/`:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

After build, confirm the route appears in the output, for example:

```text
/zh/writing/<slug>
```

For direct local inspection:

```bash
pnpm dev
```

then open:

```text
http://localhost:3000/zh/writing
http://localhost:3000/zh/writing/<slug>
```

## 11. Git protocol

- Commit site changes in `weathour.github.io/`.
- Push to GitHub only when the user explicitly asks to publish or sync.
- If the article detail page was already pushed but the index was forgotten, make a follow-up commit that registers it in the Writing indexes and homepage if needed.

Example follow-up commit:

```text
Register <article> in writing indexes
```

## 12. Current example

The 《恋如雨止》 article required two steps:

1. Detail page commit:

```text
src/app/zh/writing/koi-wa-ameagari-rain-shelter/page.mdx
```

2. Index/homepage registration commit:

```text
src/app/zh/writing/page.tsx
src/app/writing/page.tsx
src/app/zh/page.tsx
src/app/page.tsx
```

The lesson: a valid MDX route is not the same as a visible archive entry.
