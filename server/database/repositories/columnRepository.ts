import prisma from '~/server/database/client'

export async function getNewColumns() {
  return await prisma.column.findMany({ orderBy: [{ id: 'desc' }], take: 4 })
}

export async function getColumns(page: number, size: number) {
  const [list, total] = await Promise.all([
    prisma.column.findMany({ skip: (page - 1) * size, take: size }),
    prisma.column.count(),
  ])

  return { list, total }
}
