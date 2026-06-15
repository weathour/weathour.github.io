import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageFrame } from "@/components/site/site-shell";

const routeSections = [
  ["Academic route", "PhD study at Chang'an University, rooted in Traffic Information Engineering and Control.", "2023 onward"],
  ["Research line", "Mixed traffic flow, connected environments, cooperative simulation, system control, and evaluation under uncertainty.", "Ongoing"],
  ["Intellectual line", "Mathematics, physics, philosophy, Marxism, political economy, AI systems, and the language of explanation.", "Long reading"],
  ["Writing line", "Essays and notes that turn scattered questions into durable public arguments.", "Public expression"],
] as const;

export default function RoutePage() {
  return (
    <PageFrame
      kicker="Route"
      title="Route as chronology and map, not feature cards."
      description="This page is the durable route map behind the site: academic trajectory, research commitments, reading lines, questions, and public writing direction."
      currentPath="/route"
    >
      <section className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
        <div className="border-t border-primary/45 pt-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Route logic</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em]">Not a set of channels, but a path that keeps gaining depth.</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/12">
          {routeSections.map(([title, body, time], index) => (
            <article key={title} className="grid gap-4 py-7 sm:grid-cols-[0.14fr_0.22fr_0.64fr]">
              <span className="font-mono text-xs text-primary/80">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-[-0.02em]">{title}</h2>
                <p className="mt-2 font-mono text-xs text-muted-foreground">{time}</p>
              </div>
              <p className="leading-8 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-l border-primary/45 pl-6 sm:pl-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Current question</p>
        <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.02em]">
          How can cooperation, control, and autonomy be understood across traffic systems, social theory, software, and political economy?
        </h2>
        <Link href="/writing" className="mt-7 inline-flex items-center gap-2 text-sm text-primary transition hover:text-primary/80">
          Continue into writing <ArrowRight className="size-4" />
        </Link>
      </section>
    </PageFrame>
  );
}
