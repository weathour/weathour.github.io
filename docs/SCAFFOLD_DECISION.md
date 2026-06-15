# Scaffold Decision

## Repository location
`/home/weathour/programs/weathour-lab`

This is a clean new repository. The old GitHub Pages blog directories are left untouched because old posts are not being migrated.

## Why not clone an existing visual template
Existing blog templates tend to impose a traditional post-feed structure. The target is a cross-disciplinary personal lab and portfolio with blog capability, so the project starts from official Next.js plus owned components.

## Selected base
- `create-next-app@16.2.9`
- TypeScript
- App Router
- Tailwind CSS v4
- React Compiler
- pnpm
- shadcn/ui preset `nova`

## Added foundations
- MDX via `@next/mdx`
- shadcn/ui primitives
- Motion, GSAP, Lenis
- Shiki and KaTeX dependencies installed. MDX math is wired through `remark-math` and `rehype-katex` using serializable plugin names so it remains compatible with Next/Turbopack static export.
- Content directories for work and writing. Notes are folded into writing; Lab is not a primary section.
