import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type AboutCopy = {
  portraitAlt: string;
  eyebrow: string;
  name: string;
  location: string;
  roles: string[];
  intro: string[];
  focusTitle: string;
  focus: Array<{ title: string; body: string }>;
  writingTitle: string;
  writing: string[];
  contactTitle: string;
  githubLabel: string;
  emailLabel: string;
};

const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    portraitAlt: "Weathour avatar from GitHub",
    eyebrow: "About Weathour",
    name: "Weathour",
    location: "Xi'an, Shaanxi, China · Chang'an University",
    roles: ["PhD student", "Researcher", "Developer"],
    intro: [
      "I am currently a doctoral student at Chang'an University, with the second year of the PhD nearing completion. My formal discipline is transportation information engineering and control, but the work has gradually become a wider route through research systems, simulation tools, writing infrastructure, and theory.",
      "The old blog described me simply as a student, researcher, and developer. That still feels accurate: I read, experiment, build tools, write notes, and use software as a way to keep difficult ideas operational rather than ornamental.",
    ],
    focusTitle: "Current coordinates",
    focus: [
      {
        title: "Academic route",
        body: "Research foundations in intelligent transportation, autonomous driving, mixed traffic flow, control, and collaborative simulation.",
      },
      {
        title: "Tool route",
        body: "Local AI tooling, knowledge-management workflows, writing systems, automation, Python, Next.js, and simulation infrastructure.",
      },
      {
        title: "Intellectual route",
        body: "A broad reading field across mathematics, physics, transportation, philosophy, Marxism, film, and social phenomena.",
      },
      {
        title: "Community route",
        body: "An ongoing interest in communities built around new modes of distribution, collaboration, and collective production.",
      },
    ],
    writingTitle: "What may appear here",
    writing: [
      "Research notes, experiments, and methodological summaries.",
      "Development tools, automation workflows, and personal infrastructure.",
      "Study notes across mathematics, physics, philosophy, Marxism, and transportation.",
      "Film notes, ideological analysis, social observations, and personal reflections.",
    ],
    contactTitle: "Direct lines",
    githubLabel: "GitHub",
    emailLabel: "Email",
  },
  zh: {
    portraitAlt: "Weathour 的 GitHub 头像",
    eyebrow: "关于 Weathour",
    name: "Weathour",
    location: "中国陕西西安 · 长安大学",
    roles: ["博士生", "研究者", "开发者"],
    intro: [
      "我目前在长安大学攻读博士，第二年即将结束，专业方向是交通信息工程及控制。形式上的学科是交通，但实际展开的路线已经延伸到研究系统、仿真工具、写作基础设施与理论问题之间。",
      "旧博客里对自己的描述很简单：学生、研究者、开发者。这个判断现在仍然成立：我阅读、实验、开发工具、整理笔记，也试图让软件成为保存复杂思想和推进长期工作的基础设施。",
    ],
    focusTitle: "当前坐标",
    focus: [
      {
        title: "学术路线",
        body: "研究基础集中在智能交通、无人驾驶、混合交通流、控制与协同仿真等方向。",
      },
      {
        title: "工具路线",
        body: "长期关注本地 AI 工具、知识管理工作流、写作系统、自动化、Python、Next.js 与仿真基础设施。",
      },
      {
        title: "思想路线",
        body: "阅读范围横跨数学、物理、交通、哲学、马克思主义、电影与社会现象分析。",
      },
      {
        title: "社群路线",
        body: "持续关注围绕新的分配模式、协作方式与集体生产方式形成的社群可能性。",
      },
    ],
    writingTitle: "这里可能会写什么",
    writing: [
      "科研阅读、实验记录与方法总结。",
      "开发工具、自动化工作流与个人基础设施。",
      "数学、物理、哲学、马克思主义与交通相关的学习笔记。",
      "电影笔记、意识形态分析、社会观察与个人思考。",
    ],
    contactTitle: "直接入口",
    githubLabel: "GitHub",
    emailLabel: "邮箱",
  },
};

export function AboutContent({ locale = "en" }: { locale?: Locale }) {
  const copy = aboutCopy[locale];

  return (
    <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
      <aside className="lg:sticky lg:top-24">
        <div className="relative max-w-[320px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-primary/8">
          <Image
            src="/images/avatar.png"
            alt={copy.portraitAlt}
            width={512}
            height={512}
            sizes="(min-width: 1024px) 320px, 80vw"
            priority
            className="aspect-square w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/75 to-transparent" />
        </div>

        <div className="mt-8 max-w-sm border-y border-white/12 py-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/85">{copy.eyebrow}</p>
          <h2 className="mt-3 font-display text-5xl font-semibold tracking-[-0.03em]">{copy.name}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.location}</p>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {copy.roles.join(" / ")}
          </p>
        </div>

        <div className="max-w-sm divide-y divide-white/10 border-b border-white/12">
          <p className="py-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{copy.contactTitle}</p>
          <Link
            href="https://github.com/weathour"
            className="flex items-center justify-between gap-4 py-4 text-sm text-muted-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
          >
            <span>{copy.githubLabel}</span>
            <span className="font-mono">@weathour</span>
          </Link>
          <Link
            href="mailto:mr.weathour@gmail.com"
            className="flex items-center justify-between gap-4 py-4 text-sm text-muted-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
          >
            <span>{copy.emailLabel}</span>
            <span className="font-mono">mr.weathour@gmail.com</span>
          </Link>
        </div>
      </aside>

      <div>
        <section className="border-y border-white/12 py-8">
          <div className="space-y-6 text-lg leading-9 text-foreground/82 sm:text-xl sm:leading-10">
            {copy.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="grid gap-4 border-b border-white/12 pb-5 sm:grid-cols-[0.32fr_0.68fr] sm:items-end">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]">{copy.focusTitle}</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {locale === "zh"
                ? "这些不是互相隔开的卡片，而是同一条路线上的几个坐标。"
                : "These are coordinates on the same route, not isolated profile cards."}
            </p>
          </div>
          <div className="divide-y divide-white/10">
            {copy.focus.map((item, index) => (
              <article key={item.title} className="grid gap-4 py-7 sm:grid-cols-[0.16fr_0.28fr_0.56fr]">
                <span className="font-mono text-xs text-primary/80">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                <p className="leading-7 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-white/12 pt-7">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em]">{copy.writingTitle}</h2>
          <ol className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {copy.writing.map((item, index) => (
              <li key={item} className="flex gap-4 border-t border-white/10 pt-4 leading-7 text-muted-foreground">
                <span className="font-mono text-xs text-primary/80">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
