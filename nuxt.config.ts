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
})
