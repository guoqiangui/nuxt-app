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

export async function getCoursesByUser(userId: number) {
  const orders = await prisma.order.findMany({ where: { userId }, include: { course: true } })

  const courses = orders.map(item => item.course)
  // 根据课程id去重
  const uniqueCoursesMap = new Map()
  for (const course of courses) {
    if (course && !uniqueCoursesMap.has(course.id)) {
      uniqueCoursesMap.set(course.id, course)
    }
  }
  return Array.from(uniqueCoursesMap.values())
}
