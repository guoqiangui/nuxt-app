import bcrypt from 'bcrypt'
import { createUser, getUserByUsername } from '~/server/database/repositories/userRepository'
import { generateToken } from '~/server/utils/auth'
import { createConflictError, createValidationError } from '~/server/utils/error'
import { createSuccessResponse } from '~/server/utils/response'

export default defineEventHandler(async (e) => {
  const { username, password } = await readBody(e)

  if (!username || !password) {
    return sendError(e, createValidationError())
  }

  let user = await getUserByUsername(username)
  if (user) {
    return sendError(e, createConflictError())
  }

  const hash = await bcrypt.hash(password, 10)

  user = await createUser({ username, password: hash })

  const token = generateToken(user)

  return createSuccessResponse({ userInfo: user, token }, '注册成功')
})
