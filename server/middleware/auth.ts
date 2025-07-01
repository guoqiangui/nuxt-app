export default defineEventHandler((e) => {
  const protectedRoutes = ['/api/post/']

  const token = getHeader(e, 'token')

  if (protectedRoutes.some(route => e.path.startsWith(route)) && !token) {
    sendError(
      e,
      createError({ statusCode: 401, statusMessage: 'Hey! Unauthorized!!!' }),
    )
  }
})
