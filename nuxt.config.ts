// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@bg-dev/nuxt-naiveui",
    "@pinia/nuxt",
  ],
  tailwindcss: { config: { darkMode: "selector" } },
  app: {
    head: {
      meta: [
        { name: "description", content: "前端技术" },
        { name: "keywords", content: "frontend,js,vue,nuxt" },
      ],
    },
  },
});
