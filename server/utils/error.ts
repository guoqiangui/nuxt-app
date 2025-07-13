export function createAuthError(message = '用户名或密码错误') {
  return createError({ status: 401, message })
}

export function createValidationError(message = '缺少参数') {
  return createError({ status: 400, message })
}

export function createConflictError(message = '用户名已存在') {
  return createError({ status: 409, message })
}
