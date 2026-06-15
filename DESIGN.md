# Weathour Lab Design Direction

## Positioning
A personal operating system for research, writing, code, theory, and experiments.

## Visual language
- Dark graphite shell by default.
- Dense but precise component registry layout inspired by 21st.dev.
- High contrast typography, restrained accent color, mono details.
- Motion used for navigation feedback, command palette, hover previews, page transitions, and lab demos.
- No generic blog template, no centered article-feed homepage.

## Reference mix
- 21st.dev: AI-native registry and component browsing.
- Rauno Freiberg and Emil Kowalski: refined personal site craft.
- Linear, Vercel, Resend, Raycast: modern technical brand quality.
- Josh Comeau, Distill, Observable: interactive writing and explainable research.

## Stack
Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, MDX, Motion, GSAP, Lenis, Shiki, KaTeX.

## Design dials
- DESIGN_VARIANCE: 8
- MOTION_INTENSITY: 7
- VISUAL_DENSITY: 5


## Deployment constraint
The site targets GitHub Pages (`github.io`) as a static export. Design and implementation must remain compatible with `output: "export"`: static routes, build-time MDX/content indexes, client-side interaction/search, and no required Node runtime. Concept 2 (Atlas) and Concept 3 (Editorial Machine Room) are both feasible under this constraint; Concept 3 is operationally safer, Concept 2 is more distinctive but needs careful responsive/performance handling.

## Selected visual direction

Direction: **Editorial Machine Room + Field Atlas**.

- Primary structure comes from Concept 3: an editorial personal knowledge studio, not a traditional blog feed.
- Concept 2 is retained as a supporting **Field Atlas** module: a restrained constellation map of the fields that shape the user's route.
- `Lab` is removed from the primary navigation. The site is less about public experiments and more about personal route, intellectual expression, writing, research, reading, and work archive.
- Navigation becomes: `Home`, `About`, `Work`, `Writing`, `Route`. `Contact` is a utility action; `Notes` is folded into `Writing`.
- `Route` means personal trajectory, study path, research commitments, reading lines, current questions, and evolving intellectual direction.

### Home page composition

1. **Hero / public desk**
   - Headline: “Research, theory, code, and expression in public.”
   - Sub-label: “A personal route, not a content feed.”
   - Split composition: left editorial statement, right layered surfaces for essay, code note, reading trail, and work archive.

2. **Field Atlas**
   - A compact, elegant knowledge constellation around `Route`.
   - Fields: Mathematics, Physics, Transportation Systems, Philosophy, Marxism, AI Systems, Writing, Code.
   - It should support the identity, not dominate the whole page.

3. **Primary Entrances**
   - Work, Writing, Route as the three primary homepage entrances.
   - Three large editorial panels clarify the site boundaries: outputs, texts, and direction.

4. **Current Route**
   - A route ledger/timeline: doctoral study, research direction, current questions, reading line, writing projects.
   - Tone: personal and expressive, not a corporate résumé.

5. **Footer**
   - GitHub, Email, RSS, CV, Archive.
   - Closing line: “The point is not to have answers, but better questions, and systems that can evolve with them.”

### Implementation implications

- The site remains compatible with GitHub Pages static export.
- Use static MDX/content indexes and client-side command/search.
- Atlas can be SVG/Canvas/React client component fed by static JSON.
- Avoid server actions, runtime API dependencies, cookies, rewrites, ISR, and default server image optimization.
