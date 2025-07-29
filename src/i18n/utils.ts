import { i18nConfig } from ".";

export function buildStaticPaths() {
  const { defaultLocale, locales } = i18nConfig;

  return locales.map((locale) => ({
    params: {
      lang: locale !== defaultLocale ? locale : void 0,
    },
  }));
}
