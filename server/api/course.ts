import { getCourses } from '~/server/database/repositories/courseRepository'

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const page = Number(query.page)
  const size = Number(query.size)

  const res = await getCourses(page, size)

  return createSuccessResponse(res)
})
