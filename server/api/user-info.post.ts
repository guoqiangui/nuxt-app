import { updateUser } from '~/server/database/repositories/userRepository'

export default defineEventHandler(async (e) => {
  const userInfo = getUserInfoFromToken(e)
  if (!userInfo)
    return createAuthError()

  const body = await readBody(e)

  const res = await updateUser({ id: userInfo.userId, ...body })

  return createSuccessResponse(res)
})
