export type SiteLocale = "zh_CN" | "en";

export const DEFAULT_LOCALE: SiteLocale = "zh_CN";
export const EN_LOCALE: SiteLocale = "en";

export function normalizeLocale(locale?: string | null): SiteLocale {
	if (!locale) return DEFAULT_LOCALE;
	const normalized = locale.toLowerCase();
	if (normalized.startsWith("en")) return EN_LOCALE;
	return DEFAULT_LOCALE;
}

export function getLocaleFromPath(pathname: string): SiteLocale {
	return pathname === "/en" || pathname.startsWith("/en/")
		? EN_LOCALE
		: DEFAULT_LOCALE;
}

export function getLocalePrefix(locale: SiteLocale): string {
	return locale === EN_LOCALE ? "/en" : "";
}

export function stripLocaleFromPath(pathname: string): string {
	if (pathname === "/en") return "/";
	if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "");
	return pathname;
}

export function switchLocalePath(
	pathname: string,
	targetLocale: SiteLocale,
): string {
	const stripped = stripLocaleFromPath(pathname);
	const normalized = stripped.startsWith("/") ? stripped : `/${stripped}`;
	return targetLocale === EN_LOCALE
		? `${getLocalePrefix(targetLocale)}${normalized}`.replace(/\/+/g, "/")
		: normalized;
}

export function getLocaleSubtitle(locale: SiteLocale): string {
	return locale === EN_LOCALE
		? "PhD Student / Researcher / Developer"
		: "博士生 · 研究者 · 开发者";
}
