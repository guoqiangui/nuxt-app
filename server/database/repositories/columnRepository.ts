import prisma from '~/server/database/client'

export async function getNewColumns() {
  return await prisma.column.findMany({ orderBy: [{ id: 'desc' }], take: 4 })
}
