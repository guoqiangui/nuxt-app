import { getColumns } from '~/server/database/repositories/columnRepository'

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const page = Number(query.page)
  const size = Number(query.size)

  const res = await getColumns(page, size)

  return createSuccessResponse(res)
})
