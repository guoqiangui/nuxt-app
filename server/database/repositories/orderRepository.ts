import type { Order } from '~/server/database/generated/prisma/client'
import type { OrderCreateInput } from '~/server/database/generated/prisma/models'
import prisma from '~/server/database/client'

export async function createOrder(data: OrderCreateInput) {
  return await prisma.order.create({ data })
}

export async function getOrderById(id: number) {
  return await prisma.order.findUnique({
    where: { id: Number(id) },
    include: { course: true },
  })
}

export async function updateOrder({ id, status }: Order) {
  return await prisma.order.update({
    where: { id },
    data: { status },
  })
}
