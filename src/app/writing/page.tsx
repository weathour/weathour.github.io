import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageFrame } from "@/components/site/site-shell";

const featuredEssay = {
  title: "Five dimensions and primitives: a coordinate system for traffic-process computation",
  body: "The first long essay is published in Chinese. It treats traffic modeling as an epistemological framework across objects, dynamics, objectives, architectures, algorithms, and mesoscopic primitives.",
  href: "/zh/writing/traffic-process-framework",
  kind: "Long essay",
  series: "Traffic-process computation",
  date: "2026-06-15",
  readingTime: "~25 min",
  tags: ["traffic process", "CPS", "mathematical modeling", "computational modeling", "primitives", "epistemology"],
} as const;

const writingLanes = [
  ["Essays", "Long-form arguments, public explanations, and conceptual work with a durable thesis."],
  ["Notes", "Short records, research fragments, technical observations, and ideas before they become essays."],
  ["Reading", "Books, papers, quotations, and reading trails that feed the larger route."],
] as const;

export default function WritingPage() {
  return (
    <PageFrame
      kicker="Writing"
      title="Writing should read like an index, not a card wall."
      description="Finished arguments, short fragments, research notes, and reading trails all live here. Categories organize text; tags connect problems."
      currentPath="/writing"
    >
      <section className="border-y border-white/12">
        <Link href={featuredEssay.href} hrefLang="zh-CN" className="group grid gap-6 py-8 transition hover:border-primary/40 md:grid-cols-[0.22fr_0.58fr_0.2fr] md:items-start">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary/90">
            <p>{featuredEssay.kind}</p>
            <p className="mt-2 text-muted-foreground">{featuredEssay.series}</p>
          </div>
          <div>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-pretty">
              {featuredEssay.title}
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">{featuredEssay.body}</p>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{featuredEssay.tags.join(" / ")}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary md:justify-end">
            <span>{featuredEssay.date}</span>
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </div>
        </Link>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Taxonomy</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em]">Categories place texts. Tags connect problems.</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/12">
          {writingLanes.map(([title, body], index) => (
            <article key={title} className="grid gap-4 py-6 sm:grid-cols-[0.14fr_0.24fr_0.62fr]">
              <span className="font-mono text-xs text-primary/80">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-3xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-8 max-w-3xl border-t border-white/10 pt-5 leading-8 text-muted-foreground">
        Tags are not the main navigation. The main structure stays by text type: essays, notes, and reading. Tags record topic, method, and problem domain.
      </p>
    </PageFrame>
  );
}
