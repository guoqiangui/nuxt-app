import { getUserByEmail } from '~/server/database/repositories/userRepository'

export default defineEventHandler(async (e) => {
  const { email } = await readBody(e)

  if (!email) {
    return sendError(e, createError('需要email'))
  }

  const user = await getUserByEmail(email)

  if (!user) {
    return sendError(e, createError({ status: 401, statusMessage: 'email not exist' }))
  }

  return user
})
