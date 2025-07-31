// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import reactI18next from "astro-react-i18next";
import devtoolsJson from "vite-plugin-devtools-json";
import sitemap from "@astrojs/sitemap";
import { DEFAULT_LANG_CODE, localesConfig } from "./i18n.config";

// https://astro.build/config
export default defineConfig({
  site: "https://sunee.ai",
  integrations: [
    react(),
    reactI18next({
      defaultLocale: DEFAULT_LANG_CODE,
      locales: localesConfig.map((d) => d.code),
    }),
    sitemap({
      i18n: {
        defaultLocale: "en", // All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`
        locales: {
          en: "en", // The `defaultLocale` value must present in `locales` keys
          zh: "zh",
        },
      },
    }),
  ],
  vite: {
    plugins: [devtoolsJson()],
  },
});
