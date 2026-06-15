import Link from "next/link";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { CommandMenu } from "@/components/site/command-menu";
import { alternateLocale, navItems, pathFor, siteCopy, type Locale, type RoutePath } from "@/lib/i18n";

export function SiteShell({
  children,
  locale = "en",
  currentPath = "/",
}: {
  children: React.ReactNode;
  locale?: Locale;
  currentPath?: RoutePath;
}) {
  const copy = siteCopy[locale];
  const otherLocale = alternateLocale(locale);

  return (
    <div className="relative min-h-dvh overflow-hidden" lang={locale === "zh" ? "zh-CN" : "en"}>
      <div className="grid-field pointer-events-none fixed inset-0 opacity-65" />
      <div className="noise-layer pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-screen" />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href={pathFor(locale, "/")} className="flex items-center gap-3 text-foreground" aria-label="Weathour Lab home">
            <span className="font-display text-3xl font-semibold leading-none text-primary">W</span>
            <span className="hidden font-display text-xl font-semibold tracking-tight sm:inline">
              {copy.brand}
            </span>
          </Link>
          <nav className="hidden min-w-0 items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map(([key, href]) => (
              <Link
                key={href}
                href={pathFor(locale, href)}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/[0.055] hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
              >
                {copy.nav[key]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 md:flex lg:hidden" aria-label="Compact navigation">
              {navItems.map(([key, href]) => (
                <Link
                  key={href}
                  href={pathFor(locale, href)}
                  className="rounded-full px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground"
                >
                  {copy.nav[key]}
                </Link>
              ))}
            </nav>
            <Link
              href={pathFor(locale, "/contact")}
              className="hidden h-9 items-center gap-2 rounded-full border border-white/14 bg-white/[0.045] px-3 text-xs text-muted-foreground transition hover:border-primary/45 hover:bg-primary/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none sm:inline-flex"
            >
              <EnvelopeSimple className="size-3.5 text-primary/80" />
              {copy.utility.contact}
            </Link>
            <Link
              href={pathFor(otherLocale, currentPath)}
              className="inline-flex h-9 items-center rounded-full border border-white/14 bg-white/[0.045] px-3 font-mono text-xs text-muted-foreground transition hover:border-primary/45 hover:bg-primary/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
              aria-label={copy.language.label}
              hrefLang={otherLocale === "zh" ? "zh-CN" : "en"}
            >
              {copy.language.alternate}
            </Link>
            <CommandMenu locale={locale} />
          </div>
        </div>
      </header>
      <main className="relative z-10">{children}</main>
    </div>
  );
}

export function PageFrame({
  title,
  kicker,
  description,
  children,
  locale = "en",
  currentPath = "/",
}: {
  title: string;
  kicker: string;
  description: string;
  children: React.ReactNode;
  locale?: Locale;
  currentPath?: RoutePath;
}) {
  return (
    <SiteShell locale={locale} currentPath={currentPath}>
      <section className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">{kicker}</p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.025em] text-balance sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-14">{children}</div>
      </section>
    </SiteShell>
  );
}
