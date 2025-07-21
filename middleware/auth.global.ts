const whiteList = ['index', 'login', 'register', 'type-detail-id', 'list-type']

export default defineNuxtRouteMiddleware((to) => {
  // token存在localStorage，服务端直接放行
  if (import.meta.server)
    return

  if (!whiteList.includes(to.name as string) && !getToken()) {
    return navigateTo('/login')
  }
})
