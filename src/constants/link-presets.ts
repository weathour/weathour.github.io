import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import type { SiteLocale } from "@i18n/locale";
import { LinkPreset, type NavBarLink } from "@/types/config";
import { url } from "@utils/url-utils";

export function getLinkPresets(locale: SiteLocale): {
	[key in LinkPreset]: NavBarLink;
} {
	return {
		[LinkPreset.Home]: {
			name: i18n(I18nKey.home, locale),
			url: url("/", locale),
		},
		[LinkPreset.About]: {
			name: i18n(I18nKey.about, locale),
			url: url("/about/", locale),
		},
		[LinkPreset.Archive]: {
			name: i18n(I18nKey.archive, locale),
			url: url("/archive/", locale),
		},
	};
}
