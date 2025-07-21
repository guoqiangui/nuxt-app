import { getUserByUsername } from '~/server/database/repositories/userRepository'

export default defineEventHandler(async (e) => {
  const userInfo = getUserInfoFromToken(e)
  if (!userInfo)
    return createAuthError()

  const user = await getUserByUsername(userInfo.username)
  return createSuccessResponse(user)
})
