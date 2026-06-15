export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];
export type RoutePath = "/" | "/about" | "/work" | "/writing" | "/route" | "/contact";

export function pathFor(locale: Locale, path: RoutePath) {
  if (locale === "en") return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}

export const siteCopy = {
  en: {
    brand: "Weathour.Lab",
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      writing: "Writing",
      route: "Route",
    },
    utility: {
      contact: "Contact",
    },
    language: {
      current: "EN",
      alternate: "中文",
      label: "Switch to Chinese",
    },
    command: {
      button: "Search or jump",
      title: "Search Weathour Lab",
      description: "Jump to a section of the static site.",
      placeholder: "Search Home, Route, Writing, Work...",
      empty: "No route found.",
      navigate: "Navigate",
      common: "Common paths",
      readRoute: "Read the route",
      browseEssays: "Browse essays",
      openArchive: "Open work",
      contact: "Contact",
      hints: {
        home: "Index",
        about: "Identity",
        work: "Projects",
        writing: "Essays / notes / reading",
        route: "Path",
      },
    },
  },
  zh: {
    brand: "Weathour.Lab",
    nav: {
      home: "首页",
      about: "关于",
      work: "作品",
      writing: "写作",
      route: "路线",
    },
    utility: {
      contact: "联系",
    },
    language: {
      current: "中",
      alternate: "EN",
      label: "切换到英文",
    },
    command: {
      button: "搜索或跳转",
      title: "搜索 Weathour Lab",
      description: "跳转到这个静态站点中的页面。",
      placeholder: "搜索首页、路线、写作、工作...",
      empty: "没有找到路径。",
      navigate: "导航",
      common: "常用路径",
      readRoute: "阅读路线",
      browseEssays: "浏览文章",
      openArchive: "打开作品",
      contact: "联系",
      hints: {
        home: "索引",
        about: "身份",
        work: "项目与作品",
        writing: "文章 / 笔记 / 阅读",
        route: "路径",
      },
    },
  },
} as const;

export const navItems = [
  ["home", "/"],
  ["about", "/about"],
  ["work", "/work"],
  ["writing", "/writing"],
  ["route", "/route"],
] as const satisfies readonly (readonly [keyof typeof siteCopy.en.nav, RoutePath])[];
