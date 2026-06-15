import { PageFrame } from "@/components/site/site-shell";

const work = [
  {
    title: "CPS-Papers",
    body: "A paper-writing and simulation workspace for CPS and mixed-platoon research.",
    type: "Research system",
    status: "Ongoing",
    tags: ["papers", "simulation", "CPS"],
  },
  {
    title: "Knowledge systems",
    body: "Personal and research wikis for literature, projects, memory, and synthesis.",
    type: "Personal infrastructure",
    status: "Daily use",
    tags: ["knowledge base", "literature", "memory"],
  },
  {
    title: "Agent tooling",
    body: "Local AI workflows, Codex, OMX, and automation surfaces.",
    type: "Toolchain",
    status: "Iterating",
    tags: ["automation", "AI workflow", "dev environment"],
  },
  {
    title: "Simulation studies",
    body: "Traffic flow, vehicle platoons, control, and safety-aware evaluation.",
    type: "Research line",
    status: "Experiment archive",
    tags: ["traffic", "control", "safety evaluation"],
  },
] as const;

export default function WorkPage() {
  return (
    <PageFrame
      kicker="Work"
      title="Work as traceable artifacts, not display cards."
      description="This section is for papers, tools, systems, simulations, and code outputs. Conceptual essays and research notes belong to Writing."
      currentPath="/work"
    >
      <section className="grid gap-8 border-y border-white/12 py-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Boundary</p>
        <div>
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.025em]">
            Work records built objects. Writing records clarified thought.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
            The traffic-process framework essay therefore lives under Writing. If it later becomes a paper, tool, simulation platform, or public project, the resulting artifact can get a Work entry.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-[0.18fr_0.32fr_0.22fr_0.28fr] border-b border-white/12 pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground max-md:hidden">
          <span>Type</span>
          <span>Object</span>
          <span>Status</span>
          <span>Tags</span>
        </div>
        <div className="divide-y divide-white/10">
          {work.map((item) => (
            <article key={item.title} className="grid gap-4 py-7 md:grid-cols-[0.18fr_0.32fr_0.22fr_0.28fr] md:items-start">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary/80">{item.type}</p>
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{item.body}</p>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{item.status}</p>
              <p className="text-sm leading-7 text-muted-foreground">{item.tags.join(" / ")}</p>
            </article>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
