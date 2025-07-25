import type { User } from '~/server/database/generated/prisma/client'

export const useUser = defineStore('user', () => {
  const userInfo = ref<User | null>(null)

  function logout() {
    userInfo.value = null
    removeToken()
  }

  return { userInfo, logout }
})
