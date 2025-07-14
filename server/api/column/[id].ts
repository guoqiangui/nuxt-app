import { getColumnById, getColumns } from '~/server/database/repositories/columnRepository'

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')

  if (!id)
    return createValidationError()

  const column = await getColumnById(Number(id))

  const { list: recommend } = await getColumns(1, 2)

  return createSuccessResponse({ item: column, recommend })
})
