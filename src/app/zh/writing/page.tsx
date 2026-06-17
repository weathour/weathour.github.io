import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageFrame } from "@/components/site/site-shell";

const essays = [
  {
    title: "〈恋如雨止〉：这场恋从一开始就等着雨停",
    body: "这不是一场禁忌恋的辩护，而是一场避雨结构的分析：雨让两个停滞的人短暂亲密，也规定了他们必须离开屋檐。",
    href: "/zh/writing/koi-wa-ameagari-rain-shelter",
    kind: "文艺评论",
    series: "精神分析与作品结构",
    date: "2026-06-17",
    readingTime: "约 8 分钟",
    tags: ["恋如雨止", "动画评论", "精神分析", "雨宿り", "文艺评论"],
  },
  {
    title: "五维和基元：我理解交通过程计算化的一套坐标系",
    body: "这不是一个具体模型，而是一套面对交通问题时使用的认识论坐标系：先判断对象、动力学、目标、架构、算法，再决定是否需要中尺度基元。",
    href: "/zh/writing/traffic-process-framework",
    kind: "理论长文",
    series: "交通过程计算化",
    date: "2026-06-15",
    readingTime: "约 25 分钟",
    tags: ["交通过程", "CPS", "数学建模", "计算建模", "基元化", "认识论"],
  },
] as const;

const [featuredEssay, ...archiveEssays] = essays;

const writingLanes = [
  ["文章", "有明确论题的长文、公开解释、研究阐述与概念工作。"],
  ["笔记", "短记录、研究片段、技术观察，以及尚未成为文章的问题和种子。"],
  ["阅读", "书、论文、摘录和阅读线索，作为路线背后的材料来源。"],
] as const;

export default function ZhWritingPage() {
  return (
    <PageFrame
      locale="zh"
      currentPath="/writing"
      kicker="写作"
      title="写作页应该像目录，而不是文章卡片墙。"
      description="完成的论证、短片段、研究笔记与阅读线都放在这里。分类用于组织文本，标签用于连接问题。"
    >
      <section className="border-y border-white/12">
        <Link href={featuredEssay.href} className="group grid gap-6 py-8 transition hover:border-primary/40 md:grid-cols-[0.22fr_0.58fr_0.2fr] md:items-start">
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Index</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em]">文章按明确论题登记，最新文章置顶。</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/12">
          {archiveEssays.map((essay) => (
            <Link key={essay.href} href={essay.href} className="group grid gap-4 py-6 transition hover:text-primary sm:grid-cols-[0.18fr_0.62fr_0.2fr] sm:items-start">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary/80">
                <p>{essay.kind}</p>
                <p className="mt-2 text-muted-foreground">{essay.date}</p>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] text-foreground transition group-hover:text-primary">{essay.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{essay.body}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{essay.tags.join(" / ")}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary sm:justify-end">
                <span>{essay.readingTime}</span>
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">Taxonomy</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em]">栏目用于放置文本，标签用于连接问题。</h2>
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
        标签不作为导航主结构。主结构按文本类型分为文章、笔记和阅读；标签只记录主题、方法和问题域，避免每篇文章都被塞进过多栏目。
      </p>
    </PageFrame>
  );
}
