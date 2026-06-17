import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Brain,
  CarProfile,
  Code,
  Compass,
  EnvelopeSimple,
  FileText,
  Folder,
  GithubLogo,
  GraduationCap,
  MapTrifold,
  PenNib,
  Question,
  Rss,
  Sigma,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";
import { SiteShell } from "@/components/site/site-shell";

const fieldNodes = [
  {
    name: "Mathematics",
    note: "Structure and proof",
    icon: Sigma,
    className: "left-[47%] top-[6%] -translate-x-1/2",
  },
  {
    name: "Physics",
    note: "Law and dynamics",
    icon: Atom,
    className: "right-[18%] top-[18%]",
  },
  {
    name: "Transportation Systems",
    note: "Mobility and networks",
    icon: CarProfile,
    className: "right-[8%] top-[48%] -translate-y-1/2",
  },
  {
    name: "Philosophy",
    note: "Meaning and inquiry",
    icon: Brain,
    className: "right-[18%] bottom-[16%]",
  },
  {
    name: "Marxism",
    note: "Critique and praxis",
    icon: TreeStructure,
    className: "left-[48%] bottom-[5%] -translate-x-1/2",
  },
  {
    name: "AI Systems",
    note: "Intelligence and tools",
    icon: Compass,
    className: "left-[12%] bottom-[18%]",
  },
  {
    name: "Writing",
    note: "Language and expression",
    icon: PenNib,
    className: "left-[7%] top-[48%] -translate-y-1/2",
  },
  {
    name: "Code",
    note: "Implementation and interfaces",
    icon: Code,
    className: "left-[17%] top-[18%]",
  },
] as const;

const primaryEntrances = [
  {
    title: "Work",
    label: "Outputs",
    body: "Papers, tools, systems, simulations, and code that can be inspected as durable research objects.",
    href: "/work",
    visual: "wave",
    icon: Folder,
    points: ["papers", "tools", "simulation"],
  },
  {
    title: "Writing",
    label: "Texts",
    body: "Essays, research notes, reading records, and fragments now live under one writing system.",
    href: "/writing",
    visual: "image-writing",
    icon: PenNib,
    points: ["essays", "notes", "reading"],
  },
  {
    title: "Route",
    label: "Direction",
    body: "The path behind the work: study lines, current questions, intellectual commitments, and future movement.",
    href: "/route",
    visual: "image-reading",
    icon: MapTrifold,
    points: ["trajectory", "questions", "commitments"],
  },
] as const;

const routeItems = [
  {
    title: "2023-2026",
    label: "PhD Candidate",
    body: "Doctoral study in Traffic Information Engineering and Control at Chang'an University.",
    icon: GraduationCap,
  },
  {
    title: "Research Direction",
    label: "Information, engineering, and control",
    body: "Modeling and simulation of mixed traffic flow in connected environments.",
    icon: Compass,
  },
  {
    title: "Current Questions",
    label: "Complex systems and cooperation",
    body: "How do cooperation, control, ideology, and automation emerge in open systems?",
    icon: Question,
  },
  {
    title: "Reading Line",
    label: "Marx, Hegel, Spinoza, Foucault, Bourdieu",
    body: "Classical political economy, continental philosophy, and contemporary AI criticism.",
    icon: BookOpen,
  },
  {
    title: "Writing Projects",
    label: "Systems, freedom, and common life",
    body: "Longform essays on systems, theory, society, technology, and conditions of freedom.",
    icon: PenNib,
  },
] as const;

function SurfaceStack() {
  return (
    <div className="relative mx-auto min-h-[330px] w-full max-w-[540px] lg:min-h-[540px] lg:max-w-[640px]">
      <Link
        href="/zh/writing/koi-wa-ameagari-rain-shelter"
        hrefLang="zh-CN"
        className="absolute right-4 top-0 block w-[58%] rounded-2xl border border-primary/35 bg-[#0d1715]/92 p-4 panel-edge backdrop-blur transition hover:-translate-y-1 hover:border-primary/60"
      >
        <div className="flex items-center justify-between font-mono text-[11px] text-primary/80">
          <span>Cultural essay</span>
          <span>···</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-[0.98] text-pretty">
          After the Rain
        </h2>
        <p className="mt-4 max-w-sm text-xs leading-6 text-muted-foreground">
          This romance is waiting for the rain to stop.
        </p>
        <div className="mt-5 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>~8 min</span>
          <span>Jun 17, 2026</span>
        </div>
      </Link>

      <div className="absolute right-0 top-20 w-[42%] rounded-xl border border-white/14 bg-[#0a1110]/95 p-4 panel-edge backdrop-blur transition hover:-translate-y-1 hover:border-primary/50">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>Code note</span>
          <span>Python</span>
        </div>
        <pre className="mt-4 overflow-hidden font-mono text-[11px] leading-5 text-primary/85">
          <code>{`// discrete dynamic system
state.update()
x[t+1] = A x[t] + B u[t]

for step in route:
  read()
  write()
  revise()`}</code>
        </pre>
        <p className="mt-3 truncate font-mono text-[10px] text-muted-foreground">
          systems/dynamics.md
        </p>
      </div>

      <div className="absolute bottom-10 left-[26%] w-[35%] rounded-xl border border-white/14 bg-[#0b1413]/96 p-5 panel-edge backdrop-blur transition hover:-translate-y-1 hover:border-primary/50">
        <div className="font-mono text-[10px] text-muted-foreground">Reading trail</div>
        <h3 className="mt-3 font-display text-xl font-semibold">Capital Volume I</h3>
        <div className="mt-6 grid grid-cols-4 gap-2" aria-hidden="true">
          {[0, 1, 2, 3].map((item) => (
            <span key={item} className="h-px bg-primary/55" />
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">On commodity and value</p>
      </div>

      <div className="absolute bottom-4 right-8 w-[38%] rounded-xl border border-white/14 bg-[#0b1413]/96 p-5 panel-edge backdrop-blur transition hover:-translate-y-1 hover:border-primary/50">
        <div className="font-mono text-[10px] text-muted-foreground">Work archive</div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-tight">
          Hybrid Traffic Flow Cooperative Simulation
        </h3>
        <p className="mt-5 text-xs leading-5 text-muted-foreground">Research project, 2025 to present</p>
        <Folder className="mt-5 size-6 text-primary/80" />
      </div>

      <div className="absolute inset-y-8 right-16 -z-10 w-[42%] rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}

function FieldAtlas() {
  return (
    <section className="rounded-3xl border border-white/12 bg-white/[0.035] p-4 panel-edge sm:p-5 lg:p-10">
      <div className="grid gap-8 md:grid-cols-[0.28fr_0.72fr] md:items-center">
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]">Field Atlas</h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
            An interdisciplinary map. Not boundaries, but a living constellation that shapes my route.
          </p>
          <p className="mt-8 hidden font-mono text-xs text-muted-foreground sm:block">
            Hover a node to read its line.
          </p>
        </div>
        <div className="relative mx-auto aspect-[1.5/1] w-full max-w-[820px] overflow-hidden rounded-2xl border border-white/10 bg-[#07100f]/70">
          <div className="absolute inset-8 rounded-full border border-primary/18" />
          <div className="absolute inset-16 rounded-full border border-dashed border-primary/18" />
          <div className="absolute inset-28 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35 bg-primary/8 p-3 shadow-[0_0_80px_rgba(72,255,205,0.14)]">
            <div className="flex size-full items-center justify-center rounded-full border border-primary/30 bg-[#0b1715] font-display text-3xl font-semibold">
              Route
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 h-px w-[78%] -translate-x-1/2 bg-primary/12" />
          <div className="absolute left-1/2 top-1/2 h-[78%] w-px -translate-y-1/2 bg-primary/12" />
          {fieldNodes.map((node) => {
            const Icon = node.icon;
            return (
              <Link
                key={node.name}
                href="/route"
                className={`group absolute ${node.className} max-w-44 rounded-2xl p-2 transition focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/8 text-primary transition group-hover:scale-105 group-hover:bg-primary/14">
                    <Icon className="size-4" />
                  </span>
                  <span className="hidden sm:block">
                    <span className="block font-display text-base font-semibold text-foreground group-hover:text-primary">
                      {node.name}
                    </span>
                    <span className="mt-1 block font-mono text-[9px] leading-3 text-muted-foreground">
                      {node.note}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VisualTile({ visual }: { visual: (typeof primaryEntrances)[number]["visual"] }) {
  if (visual === "image-writing") {
    return <Image fill src="/images/writing-desk.png" alt="Open notebook on a dark desk" className="object-cover opacity-55" sizes="(min-width: 1024px) 28vw, 100vw" />;
  }
  if (visual === "image-reading") {
    return <Image fill src="/images/reading-stack.png" alt="Stack of academic books" className="object-cover opacity-55" sizes="(min-width: 1024px) 22vw, 100vw" />;
  }
  if (visual === "wave") {
    return (
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(72,255,205,0.13),transparent_68%)]" />
    );
  }
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(72,255,205,0.14),transparent_26rem)]" />
  );
}

function PrimaryEntrances() {
  return (
    <section className="mt-10 lg:mt-14">
      <div className="mb-7 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Primary Entrances</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            The navigation is intentionally reduced: work is what is made, writing is what is argued or recorded, and route is why these lines belong together.
          </p>
        </div>
        <Link href="/contact" className="hidden items-center gap-2 text-sm text-muted-foreground transition hover:text-primary sm:flex">
          Contact <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-12 md:auto-rows-[142px] lg:auto-rows-[156px]">
        {primaryEntrances.map((tile, index) => {
          const Icon = tile.icon;
          const span =
            index === 0
              ? "md:col-span-4 md:row-span-2"
              : index === 1
                ? "md:col-span-5 md:row-span-2"
                : "md:col-span-3 md:row-span-2";
          return (
            <Link
              key={tile.title}
              href={tile.href}
              className={`group relative min-h-72 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.035] p-6 panel-edge transition hover:-translate-y-1 hover:border-primary/45 ${span}`}
            >
              <VisualTile visual={tile.visual} />
              <div className="absolute inset-0 bg-gradient-to-b from-[#08100f]/14 via-[#08100f]/58 to-[#08100f]/94" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-5 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-primary/80">
                    <span className="flex items-center gap-2">
                      <Icon className="size-4" />
                      {tile.label}
                    </span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3 className="font-display text-4xl font-semibold leading-[0.95] tracking-[-0.025em]">
                    {tile.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                    {tile.body}
                  </p>
                </div>
                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {tile.points.map((point) => (
                      <span key={point} className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 font-mono text-[10px] text-muted-foreground">
                        {point}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-primary">
                    Enter <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
function CurrentRoute() {
  return (
    <section className="mt-8 border-t border-white/10 pt-12">
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Current Route</h2>
          <p className="mt-3 text-sm text-muted-foreground">A living ledger of study, research, and becoming.</p>
        </div>
        <Link href="/route" className="hidden items-center gap-2 text-sm text-muted-foreground transition hover:text-primary sm:flex">
          View full route <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="rounded-3xl border border-white/12 bg-white/[0.035] p-4 panel-edge sm:p-5">
        <div className="grid gap-6 md:grid-cols-[0.28fr_0.72fr]">
          <div className="relative space-y-4 border-white/10 md:border-r md:pr-8">
            <div className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-white/14 sm:block" />
            {routeItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative flex gap-4">
                  <span className="relative z-10 hidden size-10 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-[#0c1715] text-primary sm:flex">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-mono text-sm text-primary/90">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-foreground/82">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-0">
            {routeItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="grid gap-4 border-b border-white/10 py-3 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{item.label}</h3>
                    <p className="mt-1 max-w-2xl text-xs leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                  <Icon className="size-6 text-muted-foreground" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const links = [
    ["GitHub", "https://github.com/weathour", GithubLogo],
    ["Email", "mailto:mr.weathour@gmail.com", EnvelopeSimple],
    ["RSS", "/writing", Rss],
    ["CV", "/about", FileText],
    ["Archive", "/work", Folder],
  ] as const;

  return (
    <footer className="mt-8 border-t border-white/10 py-10">
      <div className="grid gap-8 md:grid-cols-[0.32fr_0.68fr] md:items-start">
        <p className="max-w-sm font-display text-[1.08rem] font-semibold leading-tight text-primary/90">
          The point is not to have answers, but better questions, and systems that can evolve with them.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {links.map(([label, href, Icon]) => (
            <Link
              key={label}
              href={href}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-primary/45 hover:bg-primary/8"
            >
              <Icon className="size-5 text-primary/80" />
              <span className="mt-3 block text-sm text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Weathour.Lab</span>
        <span>Built with MDX, Next.js, and curiosity.</span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1380px] px-4 pb-14 sm:px-6 lg:px-8">
        <section className="grid min-h-[440px] items-center gap-8 py-6 md:grid-cols-[0.48fr_0.52fr] lg:min-h-[620px] lg:gap-10 lg:py-14">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-primary/90">
              A personal route, not a content feed.
            </p>
            <h1 className="mt-7 max-w-3xl font-display text-6xl font-semibold leading-[0.9] tracking-[-0.035em] text-balance sm:text-5xl lg:text-[6.25rem]">
              Research, theory, code, and expression in public.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              A cross-disciplinary route through mathematics, physics, transportation systems, philosophy, Marxism, AI, writing, and software.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/route"
                className="inline-flex h-11 items-center justify-center gap-3 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/85 active:translate-y-px"
              >
                Read the route <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/writing"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/16 bg-white/[0.035] px-5 text-sm font-medium text-foreground transition hover:border-primary/45 hover:bg-primary/8 active:translate-y-px"
              >
                Browse writing
              </Link>
            </div>
            <div className="mt-12 max-w-lg rounded-2xl border border-white/10 bg-white/[0.025] p-4 font-mono text-xs leading-6 text-muted-foreground">
              <span className="text-primary">$</span> weathour --route --status
              <br />
              curious · building · writing · seeking better questions
            </div>
          </div>
          <SurfaceStack />
        </section>

        <FieldAtlas />
        <PrimaryEntrances />
        <CurrentRoute />
        <SiteFooter />
      </div>
    </SiteShell>
  );
}
