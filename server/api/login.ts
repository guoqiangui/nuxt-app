import bcrypt from 'bcrypt'
import { getUserByUsername } from '~/server/database/repositories/userRepository'
import { generateToken } from '~/server/utils/auth'
import { createAuthError, createValidationError } from '~/server/utils/error'
import { createSuccessResponse } from '~/server/utils/response'

export default defineEventHandler(async (e) => {
  const { username, password } = await readBody(e)

  if (!username || !password) {
    return sendError(e, createValidationError())
  }

  const user = await getUserByUsername(username)

  if (!user) {
    return sendError(e, createAuthError())
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return sendError(e, createAuthError())
  }

  const token = generateToken(user)

  return createSuccessResponse({ userInfo: user, token }, '登录成功')
})
