import { getCoursesByUser } from '~/server/database/repositories/orderRepository'

export default defineEventHandler(async (e) => {
  const userInfo = getUserInfoFromToken(e)
  if (!userInfo)
    return createAuthError()

  const courses = await getCoursesByUser(userInfo.userId)

  return createSuccessResponse(courses)
})
