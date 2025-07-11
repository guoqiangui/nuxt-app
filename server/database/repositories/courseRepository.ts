import prisma from '~/server/database/client'

export async function getNewCourses() {
  return await prisma.course.findMany({ orderBy: { id: 'desc' }, take: 4 })
}
