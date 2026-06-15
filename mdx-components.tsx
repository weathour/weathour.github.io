import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mt-12 text-4xl font-semibold tracking-tight text-balance">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-14 font-display text-4xl font-semibold leading-tight tracking-[-0.02em] text-balance">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 text-2xl font-semibold tracking-tight text-balance">{children}</h3>,
    p: ({ children }) => <p className="my-6 leading-8 text-foreground/78">{children}</p>,
    ul: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6 text-foreground/78">{children}</ul>,
    ol: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6 text-foreground/78">{children}</ol>,
    li: ({ children }) => <li className="pl-1 leading-8">{children}</li>,
    a: ({ children, href }) => <a href={href} className="text-primary underline decoration-primary/35 underline-offset-4 transition hover:decoration-primary">{children}</a>,
    blockquote: ({ children }) => <blockquote className="my-8 border-l border-primary/45 pl-5 text-foreground/80">{children}</blockquote>,
    code: ({ children }) => <code className="rounded-md bg-foreground/8 px-1.5 py-0.5 font-mono text-sm">{children}</code>,
    ...components,
  };
}
