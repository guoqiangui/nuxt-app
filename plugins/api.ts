import { createDiscreteApi } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    onRequest({ options }) {
      const token = localStorage.getItem('token')
      if (token) {
        options.headers.set('token', token)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
      else {
        const { message } = createDiscreteApi(['message'])
        message.error(response._data?.message || '请求出错，请稍后重试')
      }
    },
  })

  // Expose to useNuxtApp().$api
  return { provide: { api } }
})
