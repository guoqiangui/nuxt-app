import { getCourseById, getCourses } from '~/server/database/repositories/courseRepository'

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')

  if (!id)
    return createValidationError()

  const course = await getCourseById(Number(id))

  const { list: recommend } = await getCourses(1, 2)

  return createSuccessResponse({ item: course, recommend })
})
