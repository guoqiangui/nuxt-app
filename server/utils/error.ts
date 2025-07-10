export function createAuthError(statusMessage = '用户名或密码错误') {
  return createError({ status: 401, statusMessage })
}

export function createValidationError(statusMessage = '缺少参数') {
  return createError({ statusCode: 400, statusMessage })
}

export function createConflictError(message = '用户名已存在') {
  return createError({ statusCode: 409, statusMessage: message })
}
