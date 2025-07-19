import type { Prisma, User } from '~/server/database/generated/prisma/client'
import prisma from '~/server/database/client'

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } })
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({ where: { username } })
}

export async function createUser(data: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data,
  })
}

export async function updateUser(data: Partial<User>) {
  return await prisma.user.update({ where: { id: data.id }, data })
}
