import prisma from '~/server/database/client'

export async function getNewCourses() {
  return await prisma.course.findMany({ orderBy: { id: 'desc' }, take: 4 })
}

export async function getCourses(page: number, size: number) {
  const [list, total] = await Promise.all([
    prisma.course.findMany({ skip: (page - 1) * size, take: size }),
    prisma.course.count(),
  ])

  return { list, total }
}

export async function getCourseById(id: number) {
  return await prisma.course.findUnique({ where: { id }, include: { Catalogue: true } })
}
