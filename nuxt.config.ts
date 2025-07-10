// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@bg-dev/nuxt-naiveui', '@pinia/nuxt', '@unocss/nuxt'],
  app: {
    head: {
      meta: [
        { name: 'description', content: '前端技术' },
        { name: 'keywords', content: 'frontend,js,vue,nuxt' },
      ],
    },
  },
  vite: {
    // server: { proxy: { '/api': 'http://127.0.0.1:4523/m1/6700463-6410204-default' } },
  },
  runtimeConfig: {
    JWT_SECRET: 'e_sPI~PwUn+soYI(2QrLI@0HI+9OHUKf',
  },
})
