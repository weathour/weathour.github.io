import Link from "next/link";
import { ArrowLeft, CalendarBlank, Tag } from "@phosphor-icons/react/dist/ssr";
import { SiteShell } from "@/components/site/site-shell";
import { pathFor, type Locale } from "@/lib/i18n";

type ArticleShellProps = {
  locale?: Locale;
  title: string;
  eyebrow: string;
  description: string;
  date: string;
  tags: readonly string[];
  children: React.ReactNode;
};

export function ArticleShell({
  locale = "en",
  title,
  eyebrow,
  description,
  date,
  tags,
  children,
}: ArticleShellProps) {
  const backLabel = locale === "zh" ? "返回写作" : "Back to writing";

  return (
    <SiteShell locale={locale} currentPath="/writing">
      <article className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link
          href={pathFor(locale, "/writing")}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/45 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>

        <header className="mt-10 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-balance sm:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {description}
            </p>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 panel-edge">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <CalendarBlank className="size-4 text-primary/80" />
              {date}
            </div>
            <div className="mt-5 flex items-start gap-2">
              <Tag className="mt-1 size-4 shrink-0 text-primary/80" />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1 font-mono text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </header>

        <div className="prose-math mt-12 max-w-4xl text-pretty text-[1.02rem] leading-8 text-foreground/82">
          {children}
        </div>
      </article>
    </SiteShell>
  );
}
