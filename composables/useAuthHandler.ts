import { useUser } from '~/store/user'

function useAuthHandler() {
  const message = useMessage()

  const store = useUser()
  const { userInfo } = storeToRefs(store)

  function handleAuthResponse(res: { ok: boolean, data: unknown }, successMessage: string) {
    if (res.ok) {
      message.success(successMessage)
      userInfo.value = res.data.userInfo
      setToken(res.data.token)
      navigateTo('/')
    }
  }

  return { handleAuthResponse }
}

export default useAuthHandler
