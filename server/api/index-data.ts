import { getNewColumns } from '~/server/database/repositories/columnRepository'
import { getNewCourses } from '~/server/database/repositories/courseRepository'
import { createSuccessResponse } from '~/server/utils/response'

export default defineEventHandler(async () => {
  const columns = await getNewColumns()
  const courses = await getNewCourses()

  return createSuccessResponse({ columns, courses })
})
