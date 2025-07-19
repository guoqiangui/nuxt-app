import { getUserByUsername, updateUser } from '~/server/database/repositories/userRepository'
import { getUserInfoFromToken, hashPassword, verifyPassword } from '~/server/utils/auth'
import { createAuthError, createNotFoundError, createValidationError } from '~/server/utils/error'
import { createSuccessResponse } from '~/server/utils/response'

export default defineEventHandler(async (e) => {
  const userInfo = getUserInfoFromToken(e)
  if (!userInfo)
    return createAuthError()

  const body = await readBody(e)
  if (!body.oldPwd || !body.newPwd)
    return createValidationError()

  const user = await getUserByUsername(userInfo.username)
  if (!user)
    return createNotFoundError('用户不存在')

  const isValid = await verifyPassword(body.oldPwd, user.password)
  if (!isValid) {
    return createValidationError('旧密码不正确')
  }

  const hash = await hashPassword(body.newPwd)
  await updateUser({ id: userInfo.userId, password: hash })

  return createSuccessResponse(true, '密码修改成功')
})
