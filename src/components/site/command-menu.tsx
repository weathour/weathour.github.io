"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Article,
  BookOpen,
  Compass,
  EnvelopeSimple,
  FileText,
  Folder,
  House,
  MagnifyingGlass,
  MapTrifold,
  UserCircle,
} from "@phosphor-icons/react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { navItems, pathFor, siteCopy, type Locale } from "@/lib/i18n";

const icons = {
  home: House,
  about: UserCircle,
  work: Folder,
  writing: Article,
  route: MapTrifold,
} as const;

export function CommandMenu({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const copy = siteCopy[locale].command;
  const navCopy = siteCopy[locale].nav;

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex h-9 items-center gap-2 rounded-full border border-white/14 bg-white/[0.045] px-3 text-xs text-muted-foreground transition hover:border-primary/45 hover:bg-primary/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
        aria-label={copy.title}
      >
        <MagnifyingGlass className="size-3.5 text-primary/80" />
        <span className="hidden sm:inline">{copy.button}</span>
        <span className="rounded-full border border-white/12 px-1.5 py-0.5 font-mono text-[10px] text-foreground/70">
          ⌘ K
        </span>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={copy.title}
        description={copy.description}
        className="border-white/14 bg-[#08100f]/96 text-foreground shadow-2xl shadow-black/60 sm:max-w-xl"
      >
        <Command className="bg-transparent">
          <CommandInput placeholder={copy.placeholder} />
          <CommandList className="max-h-[420px] p-1">
            <CommandEmpty>{copy.empty}</CommandEmpty>
            <CommandGroup heading={copy.navigate}>
              {navItems.map(([key, href]) => {
                const Icon = icons[key];
                const label = navCopy[key];
                const hint = copy.hints[key];
                const localizedHref = pathFor(locale, href);
                return (
                  <CommandItem
                    key={href}
                    value={`${label} ${hint}`}
                    onSelect={() => go(localizedHref)}
                    className="gap-3 py-2.5"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="flex flex-col">
                      <span>{label}</span>
                      <span className="text-xs text-muted-foreground">{hint}</span>
                    </span>
                    <CommandShortcut>↵</CommandShortcut>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup heading={copy.common}>
              <CommandItem value={copy.readRoute} onSelect={() => go(pathFor(locale, "/route"))}>
                <Compass className="text-primary" />
                {copy.readRoute}
              </CommandItem>
              <CommandItem value={copy.browseEssays} onSelect={() => go(pathFor(locale, "/writing"))}>
                <BookOpen className="text-primary" />
                {copy.browseEssays}
              </CommandItem>
              <CommandItem value={copy.openArchive} onSelect={() => go(pathFor(locale, "/work"))}>
                <FileText className="text-primary" />
                {copy.openArchive}
              </CommandItem>
              <CommandItem value={copy.contact} onSelect={() => go(pathFor(locale, "/contact"))}>
                <EnvelopeSimple className="text-primary" />
                {copy.contact}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
