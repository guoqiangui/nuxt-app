import { createSuccessResponse } from '~/server/utils/response'

export default defineEventHandler(() => {
  return createSuccessResponse({ foo: 'Hello Server' })
})
