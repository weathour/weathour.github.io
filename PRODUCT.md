# Weathour Lab Product Brief

## Product
A cross-disciplinary personal route, portfolio, and writing system for Weathour.

## Audience
Researchers, engineers, design-conscious technologists, collaborators, and readers interested in math, physics, transportation, philosophy, Marxism, AI tooling, writing systems, and code.

## Primary IA
- Home: premium public desk and personal route entrance, not a post feed.
- About: academic identity, research direction, technical stack, broad interests.
- Work: papers, projects, tools, research platforms, simulations, and code outputs.
- Writing: long-form essays, technical articles, research notes, short fragments, and reading records.
- Route: personal trajectory, study path, current questions, reading lines, and intellectual commitments.
- Contact: utility action for email, GitHub, and CV; not a primary navigation channel.

## Navigation principle

Primary navigation uses five entries: `Home / About / Work / Writing / Route`. `Notes` is folded into `Writing`; `Contact` is available through the header utility button, footer, and Command K.

## Design Read
Cross-disciplinary personal route for technical and intellectual audiences, with an editorial machine-room language, a restrained Field Atlas module, high-end portfolio craft, and calm motion.

## Non-goals
- Do not migrate old blog posts.
- Do not make the site look like a traditional academic homepage.
- Do not reduce the identity to transportation research.
- Do not add a primary Lab section.


## Internationalization

Use static URL-based bilingual routing for GitHub Pages compatibility. English remains on the original paths; Chinese lives under `/zh/...`. Do not depend on cookies, middleware, server redirects, or runtime locale negotiation for the static site.

## Replacement readiness

The new site is intended to replace the existing Astro-based `weathour/weathour.github.io` site. Old posts are intentionally not migrated. Current readiness criteria: static export succeeds, bilingual routes are generated, local static crawl passes, GitHub avatar is bundled, and a GitHub Pages Actions workflow is present.

## Published writing entries

- `五维和基元：我理解交通过程计算化的一套坐标系` at `/zh/writing/traffic-process-framework/`. This is the first long-form Writing entry and establishes the site's traffic-process modeling vocabulary. It is intentionally not listed as Work unless it later becomes a paper, tool, simulation platform, or public project.

## Tagging principle

Use page type for structure (`essay`, `note`, `reading`) and tags for topic/method/problem-domain connections. Avoid using type labels as topical tags.

## Inner page layout principle

The visual system should not turn every secondary page into a card grid. Use page-specific editorial structures instead:

- About: profile dossier with portrait, contact rows, narrative paragraphs, and coordinate rows.
- Work: artifact ledger with type, object, status, and tags.
- Writing: editorial index with a lead essay row, taxonomy rows, and topic tags.
- Route: chronology/map with route rows and a current-question statement.

Cards are reserved for moments where elevation or containment has real hierarchy. Default inner-page grouping should use whitespace, typography, border lines, and divided rows.
