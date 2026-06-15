import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageFrame } from "@/components/site/site-shell";

const routeSections = [
  ["学术路线", "长安大学博士研究，专业基础是交通信息工程及控制。", "2023 至今"],
  ["研究线索", "混合交通流、智能网联环境、协同仿真、系统控制与不确定性下的评估。", "持续推进"],
  ["思想线索", "数学、物理、哲学、马克思主义、政治经济学、AI 系统和解释语言。", "长期阅读"],
  ["写作线索", "把散落的问题转化为可持续的公开论证、文章和笔记。", "公开表达"],
] as const;

export default function ZhRoutePage() {
  return (
    <PageFrame
      locale="zh"
      currentPath="/route"
      kicker="路线"
      title="路线页应该像年表和地图，而不是功能卡片。"
      description="这里是站点背后的路线图：学术轨迹、研究承诺、阅读线、当前问题与公开写作方向。"
    >
      <section className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
        <div className="border-t border-primary/45 pt-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Route logic</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em]">不是频道集合，而是一条不断加深的路径。</h2>
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
          如何跨越交通系统、社会理论、软件和政治经济学来理解协作、控制与自主？
        </h2>
        <Link href="/zh/writing" className="mt-7 inline-flex items-center gap-2 text-sm text-primary transition hover:text-primary/80">
          进入写作 <ArrowRight className="size-4" />
        </Link>
      </section>
    </PageFrame>
  );
}
