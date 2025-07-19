import { OrderStatus } from '~/server/database/generated/prisma/client'
import { createOrder } from '~/server/database/repositories/orderRepository'
import { getUserInfoFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (e) => {
  const { courseId } = await readBody(e)
  const userInfo = getUserInfoFromToken(e)
  if (!userInfo)
    return createAuthError('未登录或登录已过期')

  const order = await createOrder({
    createdAt: new Date(),
    status: OrderStatus.WAIT_CONFIRM,
    course: { connect: { id: courseId } },
    user: { connect: { id: userInfo.userId } },
  })

  return createSuccessResponse(order)
})
