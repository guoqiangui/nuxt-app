import { getOrderById } from '~/server/database/repositories/orderRepository'

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')
  if (!id)
    return createValidationError()

  const order = await getOrderById(Number(id))

  return createSuccessResponse(order)
})
