import { updateOrder } from '~/server/database/repositories/orderRepository'

export default defineEventHandler(async (e) => {
  const body = await readBody(e)

  const order = await updateOrder(body)

  return createSuccessResponse(order)
})
