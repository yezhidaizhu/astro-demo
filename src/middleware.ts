// src/middleware-static.ts
import i18n from "i18next";

import { i18nConfig } from "./i18n";

// src/middleware-static.ts
async function onRequest(context, next) {
  const { defaultLocale, locales } = i18nConfig;
  const localeFromPathname = context.url.pathname.split("/")[1];
  const nextLocale = [localeFromPathname, defaultLocale].find(
    (locale) => locale && locales.includes(locale)
  );

  await i18n.changeLanguage(nextLocale);
  return next();
}
export { onRequest };
