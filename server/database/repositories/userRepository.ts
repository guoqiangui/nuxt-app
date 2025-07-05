import type { Prisma } from '~/server/database/generated/prisma/client'
import prisma from '~/server/database/client'

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } })
}

export async function createUser(data: Prisma.userCreateInput) {
  return await prisma.user.create({
    data,
  })
}
