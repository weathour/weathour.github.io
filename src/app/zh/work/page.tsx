import { PageFrame } from "@/components/site/site-shell";

const work = [
  {
    title: "CPS-Papers",
    body: "面向 CPS 与混合车队研究的论文写作和仿真工作空间。",
    type: "研究系统",
    status: "持续建设",
    tags: ["论文", "仿真", "CPS"],
  },
  {
    title: "知识系统",
    body: "用于文献、项目、记忆与综合的个人和研究 wiki。",
    type: "个人基础设施",
    status: "日常使用",
    tags: ["知识库", "文献", "长期记忆"],
  },
  {
    title: "Agent 工具",
    body: "本地 AI 工作流、Codex、OMX 与自动化界面。",
    type: "工具链",
    status: "迭代中",
    tags: ["自动化", "AI 工作流", "开发环境"],
  },
  {
    title: "仿真研究",
    body: "交通流、车辆编队、控制与安全感知评估。",
    type: "研究方向",
    status: "实验沉淀",
    tags: ["交通", "控制", "安全评估"],
  },
] as const;

export default function ZhWorkPage() {
  return (
    <PageFrame
      locale="zh"
      currentPath="/work"
      kicker="作品"
      title="作品不是展示卡片，而是可以追踪的产物。"
      description="这里放论文、工具、系统、仿真平台与代码产物。概念长文和研究札记进入写作系统。"
    >
      <section className="grid gap-8 border-y border-white/12 py-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Boundary</p>
        <div>
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.025em]">
            Work 记录做出来的东西，Writing 记录想清楚的东西。
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
            因此，交通过程五维框架这类文章归入 Writing；只有当它发展成论文、工具、仿真平台或公开项目时，才会在 Work 中出现对应条目。
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
