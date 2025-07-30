// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import reactI18next from "astro-react-i18next";
import devtoolsJson from "vite-plugin-devtools-json";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    reactI18next({
      defaultLocale: "en-US",
      locales: ["en-US", "fr-FR", "zh-TW", "zh-CN"],
    }),
    sitemap(),
  ],
  vite: {
    plugins: [devtoolsJson()],
  },
});
