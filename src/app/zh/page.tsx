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
    name: "数学",
    note: "结构与证明",
    icon: Sigma,
    className: "left-[47%] top-[6%] -translate-x-1/2",
  },
  {
    name: "物理",
    note: "规律与动力学",
    icon: Atom,
    className: "right-[18%] top-[18%]",
  },
  {
    name: "交通系统",
    note: "流动与网络",
    icon: CarProfile,
    className: "right-[8%] top-[48%] -translate-y-1/2",
  },
  {
    name: "哲学",
    note: "意义与追问",
    icon: Brain,
    className: "right-[18%] bottom-[16%]",
  },
  {
    name: "马克思主义",
    note: "批判与实践",
    icon: TreeStructure,
    className: "left-[48%] bottom-[5%] -translate-x-1/2",
  },
  {
    name: "AI 系统",
    note: "智能与工具",
    icon: Compass,
    className: "left-[12%] bottom-[18%]",
  },
  {
    name: "写作",
    note: "语言与表达",
    icon: PenNib,
    className: "left-[7%] top-[48%] -translate-y-1/2",
  },
  {
    name: "代码",
    note: "实现与界面",
    icon: Code,
    className: "left-[17%] top-[18%]",
  },
] as const;

const primaryEntrances = [
  {
    title: "作品",
    label: "做出的东西",
    body: "论文、工具、系统、仿真与代码，作为可以被检查和长期演化的研究对象。",
    href: "/zh/work",
    visual: "wave",
    icon: Folder,
    points: ["论文", "工具", "仿真"],
  },
  {
    title: "写作",
    label: "写出的东西",
    body: "长文、研究笔记、阅读记录与片段统一放入写作系统，不再单独拆出笔记频道。",
    href: "/zh/writing",
    visual: "image-writing",
    icon: PenNib,
    points: ["文章", "笔记", "阅读"],
  },
  {
    title: "路线",
    label: "为什么这样做",
    body: "作品背后的路径：学习线索、当前问题、思想承诺与未来移动方向。",
    href: "/zh/route",
    visual: "image-reading",
    icon: MapTrifold,
    points: ["轨迹", "问题", "承诺"],
  },
] as const;

const routeItems = [
  {
    title: "2023-2026",
    label: "博士研究生",
    body: "在长安大学攻读交通信息工程及控制方向博士。",
    icon: GraduationCap,
  },
  {
    title: "研究方向",
    label: "信息、工程与控制",
    body: "智能网联环境下混合交通流的建模与仿真。",
    icon: Compass,
  },
  {
    title: "当前问题",
    label: "复杂系统与协作",
    body: "协作、控制、意识形态与自动化如何在开放系统中生成？",
    icon: Question,
  },
  {
    title: "阅读线",
    label: "Marx, Hegel, Spinoza, Foucault, Bourdieu",
    body: "古典政治经济学、欧陆哲学与当代 AI 批判。",
    icon: BookOpen,
  },
  {
    title: "写作计划",
    label: "系统、自由与共同生活",
    body: "关于系统、理论、社会、技术与自由条件的长文写作。",
    icon: PenNib,
  },
] as const;

function SurfaceStack() {
  return (
    <div className="relative mx-auto min-h-[330px] w-full max-w-[540px] lg:min-h-[540px] lg:max-w-[640px]">
      <Link
        href="/zh/writing/koi-wa-ameagari-rain-shelter"
        className="absolute right-4 top-0 block w-[58%] rounded-2xl border border-primary/35 bg-[#0d1715]/92 p-4 panel-edge backdrop-blur transition hover:-translate-y-1 hover:border-primary/60"
      >
        <div className="flex items-center justify-between font-mono text-[11px] text-primary/80">
          <span>文艺评论</span>
          <span>···</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-[0.98] text-pretty">
          恋如雨止
        </h2>
        <p className="mt-4 max-w-sm text-xs leading-6 text-muted-foreground">
          这场恋从一开始就等着雨停。
        </p>
        <div className="mt-5 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>约 8 分钟</span>
          <span>2026-06-17</span>
        </div>
      </Link>

      <div className="absolute right-0 top-20 w-[42%] rounded-xl border border-white/14 bg-[#0a1110]/95 p-4 panel-edge backdrop-blur transition hover:-translate-y-1 hover:border-primary/50">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>代码笔记</span>
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
        <div className="font-mono text-[10px] text-muted-foreground">阅读线</div>
        <h3 className="mt-3 font-display text-xl font-semibold">《资本论》第一卷</h3>
        <div className="mt-6 grid grid-cols-4 gap-2" aria-hidden="true">
          {[0, 1, 2, 3].map((item) => (
            <span key={item} className="h-px bg-primary/55" />
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">商品与价值</p>
      </div>

      <div className="absolute bottom-4 right-8 w-[38%] rounded-xl border border-white/14 bg-[#0b1413]/96 p-5 panel-edge backdrop-blur transition hover:-translate-y-1 hover:border-primary/50">
        <div className="font-mono text-[10px] text-muted-foreground">工作档案</div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-tight">
          混合交通流协同仿真
        </h3>
        <p className="mt-5 text-xs leading-5 text-muted-foreground">研究项目，2025 至今</p>
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
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]">领域星图</h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
            一张跨学科地图。它不是边界，而是塑造路线的活星图。
          </p>
          <p className="mt-8 hidden font-mono text-xs text-muted-foreground sm:block">
            悬停节点，阅读线索。
          </p>
        </div>
        <div className="relative mx-auto aspect-[1.5/1] w-full max-w-[820px] overflow-hidden rounded-2xl border border-white/10 bg-[#07100f]/70">
          <div className="absolute inset-8 rounded-full border border-primary/18" />
          <div className="absolute inset-16 rounded-full border border-dashed border-primary/18" />
          <div className="absolute inset-28 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35 bg-primary/8 p-3 shadow-[0_0_80px_rgba(72,255,205,0.14)]">
            <div className="flex size-full items-center justify-center rounded-full border border-primary/30 bg-[#0b1715] font-display text-3xl font-semibold">
              路线
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 h-px w-[78%] -translate-x-1/2 bg-primary/12" />
          <div className="absolute left-1/2 top-1/2 h-[78%] w-px -translate-y-1/2 bg-primary/12" />
          {fieldNodes.map((node) => {
            const Icon = node.icon;
            return (
              <Link
                key={node.name}
                href="/zh/route"
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
    return <Image fill src="/images/writing-desk.png" alt="暗色书桌上的打开笔记本" className="object-cover opacity-55" sizes="(min-width: 1024px) 28vw, 100vw" />;
  }
  if (visual === "image-reading") {
    return <Image fill src="/images/reading-stack.png" alt="学术书籍叠放" className="object-cover opacity-55" sizes="(min-width: 1024px) 22vw, 100vw" />;
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
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">三个主入口</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            导航有意收敛：作品是做出的东西，写作是写出的东西，路线解释这些线索为什么属于同一条路径。
          </p>
        </div>
        <Link href="/zh/contact" className="hidden items-center gap-2 text-sm text-muted-foreground transition hover:text-primary sm:flex">
          联系 <ArrowRight className="size-4" />
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
                    进入 <ArrowRight className="size-4 transition group-hover:translate-x-1" />
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
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">当前路线</h2>
          <p className="mt-3 text-sm text-muted-foreground">学习、研究与生成中的活账本。</p>
        </div>
        <Link href="/zh/route" className="hidden items-center gap-2 text-sm text-muted-foreground transition hover:text-primary sm:flex">
          查看完整路线 <ArrowRight className="size-4" />
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
    ["邮箱", "mailto:mr.weathour@gmail.com", EnvelopeSimple],
    ["RSS", "/zh/writing", Rss],
    ["CV", "/zh/about", FileText],
    ["档案", "/zh/work", Folder],
  ] as const;

  return (
    <footer className="mt-8 border-t border-white/10 py-10">
      <div className="grid gap-8 md:grid-cols-[0.32fr_0.68fr] md:items-start">
        <p className="max-w-sm font-display text-[1.08rem] font-semibold leading-tight text-primary/90">
          重点不是拥有答案，而是提出更好的问题，并建立能随之演化的系统。
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
        <span>由 MDX、Next.js 与好奇心构建。</span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <SiteShell locale="zh" currentPath="/">
      <div className="mx-auto max-w-[1380px] px-4 pb-14 sm:px-6 lg:px-8">
        <section className="grid min-h-[440px] items-center gap-8 py-6 md:grid-cols-[0.48fr_0.52fr] lg:min-h-[620px] lg:gap-10 lg:py-14">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-primary/90">
              个人路线，不是内容流。
            </p>
            <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-balance sm:text-5xl lg:text-[5.4rem]">
              公开中的研究、理论、代码与表达。
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              一条穿过数学、物理、交通系统、哲学、马克思主义、AI、写作与软件的跨学科路线。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/zh/route"
                className="inline-flex h-11 items-center justify-center gap-3 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/85 active:translate-y-px"
              >
                阅读路线 <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/zh/writing"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/16 bg-white/[0.035] px-5 text-sm font-medium text-foreground transition hover:border-primary/45 hover:bg-primary/8 active:translate-y-px"
              >
                浏览写作
              </Link>
            </div>
            <div className="mt-12 max-w-lg rounded-2xl border border-white/10 bg-white/[0.025] p-4 font-mono text-xs leading-6 text-muted-foreground">
              <span className="text-primary">$</span> weathour --route --status
              <br />
              好奇 · 建造 · 写作 · 寻找更好的问题
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
