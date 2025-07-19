import { getUserByUsername } from '~/server/database/repositories/userRepository'
import { generateToken, verifyPassword } from '~/server/utils/auth'
import { createAuthError, createValidationError } from '~/server/utils/error'
import { createSuccessResponse } from '~/server/utils/response'

export default defineEventHandler(async (e) => {
  const { username, password } = await readBody(e)

  if (!username || !password) {
    return createValidationError()
  }

  const user = await getUserByUsername(username)

  if (!user) {
    return createAuthError()
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    return createAuthError()
  }

  const token = generateToken(user)

  return createSuccessResponse({ userInfo: user, token }, '登录成功')
})
